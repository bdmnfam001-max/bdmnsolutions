import { useCallback, useEffect, useRef } from 'react';

type TurnstileOptions = {
  sitekey: string;
  action: 'contact';
  execution: 'execute';
  appearance: 'interaction-only';
  callback: (token: string) => void;
  'expired-callback': () => void;
  'error-callback': (errorCode?: string) => void;
};

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileOptions) => string;
  execute: (widgetId: string) => void;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let turnstileScriptPromise: Promise<TurnstileApi> | null = null;

type PendingExecution = {
  resolve: (token: string) => void;
  reject: (error: Error) => void;
  timeoutId: number;
};

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (turnstileScriptPromise) return turnstileScriptPromise;

  const existingScript = document.querySelector<HTMLScriptElement>('script[data-turnstile-api="true"]');
  const script = existingScript ?? document.createElement('script');

  turnstileScriptPromise = new Promise<TurnstileApi>((resolve, reject) => {
    const timer: { id?: number } = {};

    const cleanup = () => {
      if (timer.id !== undefined) window.clearTimeout(timer.id);
      script.removeEventListener('load', onLoad);
      script.removeEventListener('error', onError);
    };
    const fail = (message: string) => {
      cleanup();
      if (!window.turnstile) script.remove();
      reject(new Error(message));
    };
    const onLoad = () => {
      script.dataset.turnstileLoaded = 'true';
      if (!window.turnstile) {
        fail('The security check script loaded, but the Turnstile API did not initialize. Refresh and try again.');
        return;
      }
      cleanup();
      resolve(window.turnstile);
    };
    const onError = () =>
      fail('The security check script could not be loaded. Check your connection or content restrictions and retry.');

    script.addEventListener('load', onLoad, { once: true });
    script.addEventListener('error', onError, { once: true });
    timer.id = window.setTimeout(
      () => fail('The security check script timed out while loading. Please try again.'),
      15_000,
    );

    if (existingScript) {
      if (existingScript.dataset.turnstileLoaded === 'true') onLoad();
      return;
    }

    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.dataset.turnstileApi = 'true';
    document.head.append(script);
  }).catch((error: unknown) => {
    turnstileScriptPromise = null;
    throw error;
  });

  return turnstileScriptPromise;
}

export function useTurnstile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const pendingRef = useRef<PendingExecution | null>(null);

  const settle = useCallback((token?: string, error?: Error) => {
    const pending = pendingRef.current;
    if (!pending) return;
    pendingRef.current = null;
    window.clearTimeout(pending.timeoutId);
    if (error) pending.reject(error);
    else if (token) pending.resolve(token);
    else pending.reject(new Error('The security check expired. Please try again.'));
  }, []);

  const reset = useCallback(() => {
    const widgetId = widgetIdRef.current;
    if (widgetId && window.turnstile) window.turnstile.reset(widgetId);
  }, []);

  const execute = useCallback(
    async (siteKey: string): Promise<string> => {
      const turnstile = await loadTurnstile();
      const container = containerRef.current;
      if (!container) throw new Error('The security check is unavailable. Please try again.');
      if (pendingRef.current) throw new Error('A security check is already in progress.');

      if (!widgetIdRef.current) {
        try {
          const widgetId = turnstile.render(container, {
            sitekey: siteKey,
            action: 'contact',
            execution: 'execute',
            appearance: 'interaction-only',
            callback: (token) => settle(token),
            'expired-callback': () => settle(undefined, new Error('The security check expired. Please try again.')),
            'error-callback': (errorCode) => {
              const reason =
                errorCode === '110200'
                  ? 'This hostname is not authorized for the configured site key.'
                  : errorCode
                    ? `Cloudflare reported error ${errorCode}.`
                    : 'Please retry the challenge.';
              settle(undefined, new Error(`The security check could not be completed. ${reason}`));
            },
          });
          if (!widgetId) throw new Error('A Turnstile widget ID was not returned.');
          widgetIdRef.current = widgetId;
        } catch {
          throw new Error(
            'The security check widget could not be initialized. Check the site key and allowed hostname configuration, then try again.',
          );
        }
      }

      return new Promise<string>((resolve, reject) => {
        const timeoutId = window.setTimeout(
          () => settle(undefined, new Error('The security check timed out. Please try again.')),
          30_000,
        );
        pendingRef.current = { resolve, reject, timeoutId };
        try {
          turnstile.execute(widgetIdRef.current!);
        } catch {
          settle(undefined, new Error('The security check could not be started. Please try again.'));
        }
      });
    },
    [settle],
  );

  useEffect(
    () => () => {
      const pending = pendingRef.current;
      if (pending) {
        window.clearTimeout(pending.timeoutId);
        pending.reject(new Error('The security check was cancelled.'));
        pendingRef.current = null;
      }
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    },
    [],
  );

  return { containerRef, execute, reset };
}
