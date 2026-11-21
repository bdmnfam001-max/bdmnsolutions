import type { LucideIcon } from 'lucide-react';
import {
  Car,
  Wind,
  Trees,
  Wrench,
  ShieldCheck,
  Sparkles,
  Clock,
  PhoneCall,
  Droplets,
  Snowflake,
  Flame,
  Leaf,
  Flower2,
  Ruler,
  Thermometer,
} from 'lucide-react';

export type ProjectService = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Project = {
  id: string;
  category: string;
  label: string;
  businessName?: string;
  businessType: string;
  icon: LucideIcon;
  headline: string;
  description: string;
  heroImage: string;
  previewImage: string;
  services: ProjectService[];
  aboutTitle: string;
  aboutBody: string;
  ctaHeadline: string;
  ctaSubtext: string;
};

export const projects: Project[] = [
  {
    id: 'auto-detailing',
    category: 'Premium Auto Detailing',
    label: 'Auto Detailing',
    businessName: 'Obsidian Detailing',
    businessType: 'Automotive Detailing & Ceramic Coating',
    icon: Droplets,
    headline: 'Protect Your Investment. Elevate Your Drive.',
    description:
      'A premium website concept for an automotive detailing studio specializing in ceramic coating and paint protection services.',
    heroImage:
      'https://images.pexels.com/photos/26954168/pexels-photo-26954168.jpeg?auto=compress&cs=tinysrgb&w=1600',
    previewImage:
      'https://images.pexels.com/photos/5288728/pexels-photo-5288728.jpeg?auto=compress&cs=tinysrgb&w=1200',
    services: [
      {
        title: 'Ceramic Coating',
        description: 'Long-lasting protection with a deep, glass-like finish.',
        icon: ShieldCheck,
      },
      {
        title: 'Paint Correction',
        description: 'Remove swirl marks and restore clarity to your paint.',
        icon: Sparkles,
      },
      {
        title: 'Full Detailing',
        description: 'Interior and exterior detailing tailored to your vehicle.',
        icon: Car,
      },
      {
        title: 'Maintenance Plans',
        description: 'Keep your vehicle looking its best year-round.',
        icon: Clock,
      },
    ],
    aboutTitle: 'Craftsmanship On Every Vehicle',
    aboutBody:
      'Our detailing studio treats every vehicle with precision and care. From paint correction to ceramic coating, each service is performed by trained specialists using professional-grade products and equipment.',
    ctaHeadline: 'Book Your Detailing Appointment',
    ctaSubtext: 'Request a quote and discover what professional care can do for your vehicle.',
  },
  {
    id: 'hvac-services',
    category: 'HVAC Services',
    label: 'HVAC Services',
    businessType: 'Heating, Ventilation & Air Conditioning',
    icon: Snowflake,
    headline: 'Comfort You Can Count On.',
    description:
      'A clean, trustworthy website concept for a local HVAC company serving residential and commercial customers.',
    heroImage:
      'https://images.pexels.com/photos/7347538/pexels-photo-7347538.jpeg?auto=compress&cs=tinysrgb&w=1600',
    previewImage:
      'https://images.pexels.com/photos/5463575/pexels-photo-5463575.jpeg?auto=compress&cs=tinysrgb&w=1200',
    services: [
      {
        title: 'Air Conditioning',
        description: 'Installation, repair, and maintenance for AC systems.',
        icon: Snowflake,
      },
      {
        title: 'Heating Systems',
        description: 'Reliable furnace and heat pump services for every season.',
        icon: Flame,
      },
      {
        title: 'Indoor Air Quality',
        description: 'Solutions for cleaner, healthier air in your home.',
        icon: Wind,
      },
      {
        title: 'Emergency Repairs',
        description: 'Fast response when your system needs attention most.',
        icon: PhoneCall,
      },
    ],
    aboutTitle: 'Trusted Home Comfort Experts',
    aboutBody:
      'Our licensed technicians deliver dependable heating and cooling services with transparent pricing and honest recommendations. We help you maintain a comfortable, efficient home all year long.',
    ctaHeadline: 'Request a Service Quote',
    ctaSubtext: 'Tell us about your needs and our team will get back to you promptly.',
  },
  {
    id: 'landscaping',
    category: 'Landscaping Services',
    label: 'Landscaping Services',
    businessType: 'Professional Landscaping & Outdoor Maintenance',
    icon: Leaf,
    headline: 'Outdoor Spaces Designed to Inspire.',
    description:
      'An elegant website concept for a landscaping company offering design, installation, and maintenance services.',
    heroImage:
      'https://images.pexels.com/photos/8143668/pexels-photo-8143668.jpeg?auto=compress&cs=tinysrgb&w=1600',
    previewImage:
      'https://images.pexels.com/photos/18074245/pexels-photo-18074245.jpeg?auto=compress&cs=tinysrgb&w=1200',
    services: [
      {
        title: 'Landscape Design',
        description: 'Custom outdoor designs tailored to your property.',
        icon: Ruler,
      },
      {
        title: 'Garden Maintenance',
        description: 'Regular care to keep your grounds looking immaculate.',
        icon: Leaf,
      },
      {
        title: 'Planting & Hardscaping',
        description: 'From flower beds to patios and pathways.',
        icon: Flower2,
      },
      {
        title: 'Seasonal Cleanups',
        description: 'Prepare your outdoor space for every season.',
        icon: Trees,
      },
    ],
    aboutTitle: 'Bringing Outdoor Visions To Life',
    aboutBody:
      'Our team blends horticultural knowledge with design sensibility to create outdoor spaces that are both beautiful and functional. Every project is planned around your property, your lifestyle, and the local climate.',
    ctaHeadline: 'Start Your Landscape Project',
    ctaSubtext: 'Share your ideas and receive a tailored proposal for your property.',
  },
  {
    id: 'plumbing',
    category: 'Home Services / Plumbing',
    label: 'Plumbing Services',
    businessType: 'Residential Plumbing & Home Maintenance',
    icon: Wrench,
    headline: 'Reliable Service. Done Right.',
    description:
      'A trust-focused website concept for a residential plumbing company serving local homeowners.',
    heroImage:
      'https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&w=1600',
    previewImage:
      'https://images.pexels.com/photos/7859953/pexels-photo-7859953.jpeg?auto=compress&cs=tinysrgb&w=1200',
    services: [
      {
        title: 'Repairs & Fixes',
        description: 'Leak detection, pipe repairs, and fixture replacements.',
        icon: Wrench,
      },
      {
        title: 'Drain Cleaning',
        description: 'Clear stubborn blockages and restore proper flow.',
        icon: Droplets,
      },
      {
        title: 'Water Heaters',
        description: 'Installation and maintenance for reliable hot water.',
        icon: Thermometer,
      },
      {
        title: 'Emergency Service',
        description: 'Prompt response for urgent plumbing issues.',
        icon: PhoneCall,
      },
    ],
    aboutTitle: 'Plumbing You Can Rely On',
    aboutBody:
      'Our experienced plumbers deliver clean, professional work on every job — big or small. We communicate clearly, respect your home, and stand behind the quality of every repair and installation.',
    ctaHeadline: 'Request a Plumbing Quote',
    ctaSubtext: 'Describe your issue and our team will respond with next steps.',
  },
];
