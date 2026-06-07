import { Injectable, signal } from '@angular/core';

export type PortfolioLanguage = 'en' | 'ar';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly language = signal<PortfolioLanguage>('en');

  private readonly storageKey = 'portfolio-language';

  constructor() {
    this.initializeLanguage();
  }

  toggleLanguage(): void {
    this.applyLanguage(this.language() === 'ar' ? 'en' : 'ar', true);
  }

  private initializeLanguage(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const savedLanguage = window.localStorage.getItem(this.storageKey);
    this.applyLanguage(savedLanguage === 'ar' ? 'ar' : 'en', false);
  }

  private applyLanguage(language: PortfolioLanguage, shouldPersist: boolean): void {
    this.language.set(language);

    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.body.classList.toggle('arabic-language', language === 'ar');
    }

    if (shouldPersist && typeof window !== 'undefined') {
      window.localStorage.setItem(this.storageKey, language);
    }
  }
}
