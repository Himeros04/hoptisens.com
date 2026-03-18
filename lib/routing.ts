import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  pathnames: {
    '/': '/',
    '/a-propos': {
      fr: '/a-propos',
      en: '/about'
    },
    '/offres': {
      fr: '/offres',
      en: '/services'
    },
    '/offres/sprint': {
      fr: '/offres/sprint',
      en: '/services/sprint'
    },
    '/offres/leads': {
      fr: '/offres/leads',
      en: '/services/leads'
    },
    '/contact': {
      fr: '/contact',
      en: '/contact'
    },
    '/diagnostic': {
      fr: '/diagnostic',
      en: '/diagnostic'
    }
  }
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
