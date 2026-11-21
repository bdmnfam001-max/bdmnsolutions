import {
  LayoutGrid,
  MousePointerClick,
  RefreshCw,
  Code2,
  ShieldCheck,
  MessageSquareText,
  UserRound,
  PenTool,
  Send,
  PackageCheck,
  Users,
  Mail,
  Workflow,
  Blocks,
  Bot,
  Gauge,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Service = {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    id: 'business-website',
    title: 'Business Websites',
    description:
      'Professional multi-page websites that showcase your company, services, and expertise.',
    features: [
      'Custom design',
      'Multiple pages',
      'Service presentation',
      'Contact forms',
      'Responsive layouts',
    ],
    icon: LayoutGrid,
  },
  {
    id: 'landing-page',
    title: 'Landing Pages',
    description:
      'Focused, persuasive pages designed around one clear goal: turning visitors into inquiries.',
    features: [
      'Clear messaging',
      'Strong calls to action',
      'Conversion-focused structure',
      'Mobile optimization',
      'Contact forms',
    ],
    icon: MousePointerClick,
  },
  {
    id: 'website-redesign',
    title: 'Website Redesign',
    description: 'Transform an outdated website into a modern, professional experience.',
    features: [
      'Modern visual design',
      'Improved navigation',
      'Responsive redesign',
      'Better content structure',
      'Improved usability',
    ],
    icon: RefreshCw,
  },
  {
    id: 'website-development',
    title: 'Website Development',
    description:
      'From initial concept to a complete, working website tailored to your business.',
    features: [
      'Frontend development',
      'Responsive implementation',
      'Interactive elements',
      'Testing',
      'Launch preparation',
    ],
    icon: Code2,
  },
];

export type AutomationService = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const automationServices: AutomationService[] = [
  {
    id: 'lead-management',
    title: 'Lead Management Automation',
    description:
      'Every inquiry is captured, organized, and routed to the right place — so no potential customer slips through.',
    icon: Users,
  },
  {
    id: 'customer-follow-ups',
    title: 'Automated Customer Follow-Ups',
    description:
      'Timely, consistent follow-ups that keep conversations moving without manual effort.',
    icon: Mail,
  },
  {
    id: 'workflow-automation',
    title: 'Workflow Automation',
    description:
      'Repetitive multi-step tasks handled automatically, from data entry to notifications.',
    icon: Workflow,
  },
  {
    id: 'crm-integrations',
    title: 'CRM & Tool Integrations',
    description:
      'Your website, CRM, email, and other business tools connected so information flows between them.',
    icon: Blocks,
  },
  {
    id: 'ai-automation',
    title: 'AI-Powered Automation',
    description:
      'Smarter automations that can categorize inquiries, draft responses, and assist with routine decisions.',
    icon: Bot,
  },
  {
    id: 'process-optimization',
    title: 'Process Optimization',
    description:
      'We review how your business works day to day and identify where time is being lost.',
    icon: Gauge,
  },
];

export type ValueProp = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const valueProps: ValueProp[] = [
  {
    title: 'Build Trust',
    description:
      'Create a professional online presence that gives potential customers confidence in your business.',
    icon: ShieldCheck,
  },
  {
    title: 'Get More Inquiries',
    description:
      'Make it easy for visitors to explore your services, contact you, and request a quote.',
    icon: MessageSquareText,
  },
  {
    title: 'Reduce Repetitive Work',
    description:
      'Automate routine tasks, customer follow-ups, and information handling to free up valuable time.',
    icon: Workflow,
  },
  {
    title: 'Connect Your Business',
    description:
      'Connect website inquiries, notifications, and business tools into more efficient workflows.',
    icon: Blocks,
  },
];

export type WhyChoose = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const whyChooseUs: WhyChoose[] = [
  {
    title: 'Personal Approach',
    description: 'Work directly with the person responsible for understanding and delivering your project.',
    icon: UserRound,
  },
  {
    title: 'Custom Website Design',
    description:
      'Websites designed around your business, audience, and goals.',
    icon: PenTool,
  },
  {
    title: 'Workflow Automation',
    description:
      'Practical automations that reduce repetitive tasks and improve everyday operations.',
    icon: Workflow,
  },
  {
    title: 'Clear Communication',
    description: 'Straightforward collaboration, clear project stages, and transparent communication.',
    icon: MessageSquareText,
  },
  {
    title: 'Connected Solutions',
    description:
      'Websites and business systems designed to work together where it makes sense.',
    icon: Blocks,
  },
  {
    title: 'Complete Handover',
    description:
      'Receive your completed solution with the relevant files, configuration details, and usage instructions.',
    icon: PackageCheck,
  },
];

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Discovery',
    description:
      'We learn about your business, challenges, processes, and goals.',
  },
  {
    step: '02',
    title: 'Strategy & Solution',
    description:
      'We plan the right website, automation, or combined digital solution for your needs.',
  },
  {
    step: '03',
    title: 'Build & Integrate',
    description:
      'We develop, connect, and test your solution to ensure everything works together.',
  },
  {
    step: '04',
    title: 'Launch & Handover',
    description:
      'We deliver your solution, verify its functionality, and guide you through the next steps.',
  },
];

export type ApproachPrinciple = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const approachPrinciples: ApproachPrinciple[] = [
  {
    title: 'Clear Communication',
    description:
      'Straightforward conversations, honest timelines, and updates you can rely on.',
    icon: MessageSquareText,
  },
  {
    title: 'Thoughtful Design',
    description:
      'Every layout decision serves your business and your customers — not just aesthetics.',
    icon: PenTool,
  },
  {
    title: 'Reliable Delivery',
    description:
      'A defined process from first concept to final handover, with nothing left unfinished.',
    icon: Send,
  },
];

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: 'What types of businesses do you work with?',
    answer:
      'We work with entrepreneurs, small businesses, and growing companies across all industries — service businesses, online stores, and everything in between.',
  },
  {
    question: 'What is business process automation?',
    answer:
      'It means setting up systems that handle repetitive tasks for you — capturing leads, sending follow-ups, moving information between tools, and notifying the right person at the right time. You keep oversight while the routine work runs itself.',
  },
  {
    question: 'Which industries can benefit from automation?',
    answer:
      'Almost any business that handles inquiries, bookings, quotes, or customer communication manually. We start by mapping how your business works and identify where automation will save the most time.',
  },
  {
    question: 'Can you build a website and automation together?',
    answer:
      'Yes — and it is often the best combination. Your website captures inquiries, and the automation behind it organizes, follows up, and keeps your tools in sync automatically.',
  },
  {
    question: 'What types of websites do you create?',
    answer:
      'We create multi-page business websites, landing pages, website redesigns, and custom website solutions.',
  },
  {
    question: 'Will my website work on mobile devices?',
    answer:
      'Yes. Every project is designed to work smoothly across smartphones, tablets, and desktop computers.',
  },
  {
    question: 'How does the process work?',
    answer:
      'We start by understanding your business and goals, then create a design concept, develop the website, test it, and prepare it for launch.',
  },
  {
    question: 'Do you offer website redesigns?',
    answer:
      'Yes. We can help modernize an existing website and improve its structure, appearance, and usability.',
  },
  {
    question: 'How much does a website cost?',
    answer:
      'Every project is different. Contact us with a short description of your requirements, and we will discuss a suitable solution and provide a quote.',
  },
  {
    question: 'Do you work with businesses outside your country?',
    answer: 'Yes. We collaborate remotely and work with businesses worldwide.',
  },
  {
    question: 'Do you only work with the industries shown in your portfolio?',
    answer:
      'No. Our portfolio concepts demonstrate different design directions, not industry limitations. We welcome inquiries from businesses across industries and of different sizes.',
  },
];

export type NavItem = {
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Automation', href: '#automation' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];
