import { fr } from '@/i18n/fr/locale';
import { en } from '@/i18n/en/locale';

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    fr,
    en
  },
}));
