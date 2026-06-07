import { AfterViewInit, Component, OnDestroy, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterOutlet, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { LanguageService } from './language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit, OnDestroy {
  private readonly languageService = inject(LanguageService);

  readonly isMenuOpen = signal(false);
  readonly activeNav = signal('about');
  readonly isDarkMode = signal(false);
  readonly language = this.languageService.language;

  private readonly sectionIds = [
    'about',
    'education',
    'experience',
    'projects',
    'skills',
    'certificates',
    'community',
    'contact',
  ];
  private readonly themeStorageKey = 'portfolio-theme';
  private routerSubscription?: Subscription;
  private scrollFrame = 0;

  readonly contact = {
    name: 'Malak Mohamed Mostafa',
    role: 'Software Engineer | Front-End & Angular Developer',
    location: '15 May City, Helwan, Cairo',
    email: 'malk.mohmed211@gmail.com',
    phone: '01148403342 / 01126746232',
    linkedin: 'https://www.linkedin.com/in/malak-mohamed-mostafa-762996275/',
    github: 'https://github.com/MalakMohamed119',
    avatar: 'malak-profile.jpg',
  };

  readonly gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    this.contact.email,
  )}`;
  readonly whatsappUrl = 'https://wa.me/201148403342';
  readonly contactForm = {
    email: '',
    message: '',
  };

  readonly copy = {
    en: {
      name: 'Malak Mohamed Mostafa',
      homeAria: 'Go to home',
      navAria: 'Main navigation',
      nav: {
        about: 'About',
        education: 'Education',
        experience: 'Experience',
        projects: 'Projects',
        skills: 'Skills',
        certificates: 'Certificates',
        community: 'Community',
        contact: 'Contact',
      },
      menuToggle: 'Toggle navigation menu',
      languageToggle: 'Switch website to Arabic',
      languageTitle: 'Arabic',
      lightMode: 'Light mode',
      darkMode: 'Dark mode',
      switchToLight: 'Switch to light mode',
      switchToDark: 'Switch to dark mode',
      whatsapp: 'Contact on WhatsApp',
      footerEyebrow: 'Contact',
      footerTitle: "Let's build something great.",
      footerButton: 'Get in Touch',
      quickTitle: 'Send a quick message',
      quickText: 'Leave your email and message, and it will open as a ready-to-send email.',
      emailLabel: 'Your email',
      emailPlaceholder: 'you@example.com',
      messageLabel: 'Message',
      messagePlaceholder: 'Tell me what you want to build...',
      sendButton: 'Send Message',
      footerLinks: 'Footer links',
      contactInfo: 'Contact Info',
      email: 'Email',
      phone: 'Phone',
      contactPhone: '01148403342',
      location: 'Location',
      contactLocation: '15 May City, Helwan, Cairo',
      social: 'Social',
      focus: 'Focus',
      focusText: 'Angular frontend work, responsive product UI, API integration, and polished delivery.',
      copyright: '(c) 2026 Malak Mohamed Mostafa',
      built: 'Built with Angular',
      subject: 'Portfolio message',
      senderEmail: 'Sender email',
      formMessage: 'Message:',
    },
    ar: {
      name: 'ملك محمد مصطفى',
      homeAria: 'الذهاب للصفحة الرئيسية',
      navAria: 'التنقل الرئيسي',
      nav: {
        about: 'نبذة',
        education: 'التعليم',
        experience: 'الخبرة',
        projects: 'المشاريع',
        skills: 'المهارات',
        certificates: 'الشهادات',
        community: 'المجتمع',
        contact: 'تواصل',
      },
      menuToggle: 'فتح وإغلاق قائمة التنقل',
      languageToggle: 'تحويل الموقع إلى الإنجليزية',
      languageTitle: 'English',
      lightMode: 'الوضع الفاتح',
      darkMode: 'الوضع الداكن',
      switchToLight: 'التبديل إلى الوضع الفاتح',
      switchToDark: 'التبديل إلى الوضع الداكن',
      whatsapp: 'تواصل عبر واتساب',
      footerEyebrow: 'تواصل',
      footerTitle: 'هيا نبني تجربة ويب مميزة.',
      footerButton: 'تواصل معي',
      quickTitle: 'أرسل رسالة سريعة',
      quickText: 'اكتب بريدك ورسالتك، وسيتم فتحها كإيميل جاهز للإرسال.',
      emailLabel: 'بريدك الإلكتروني',
      emailPlaceholder: 'you@example.com',
      messageLabel: 'الرسالة',
      messagePlaceholder: 'احكي لي عن الفكرة أو المشروع...',
      sendButton: 'إرسال الرسالة',
      footerLinks: 'روابط الفوتر',
      contactInfo: 'بيانات التواصل',
      email: 'الإيميل',
      phone: 'رقم الهاتف',
      contactPhone: '٠١١٤٨٤٠٣٣٤٢',
      location: 'الموقع',
      contactLocation: 'مدينة ١٥ مايو، حلوان، القاهرة',
      social: 'مواقع التواصل الاجتماعي',
      focus: 'الهدف',
      focusText: 'واجهات Angular، تصميمات متجاوبة، ربط APIs، وتسليم تجربة متقنة.',
      copyright: '(c) 2026 ملك محمد مصطفى',
      built: 'تم بناؤه باستخدام Angular',
      subject: 'رسالة من البورتفوليو',
      senderEmail: 'بريد المرسل',
      formMessage: 'الرسالة:',
    },
  };

  constructor(private readonly router: Router) {
    this.initializeTheme();
  }

  ngAfterViewInit(): void {
    this.routerSubscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.queueActiveNavUpdate());

    window.addEventListener('scroll', this.queueActiveNavUpdate, { passive: true });
    window.addEventListener('resize', this.queueActiveNavUpdate, { passive: true });
    this.queueActiveNavUpdate();
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    window.removeEventListener('scroll', this.queueActiveNavUpdate);
    window.removeEventListener('resize', this.queueActiveNavUpdate);
    if (this.scrollFrame) {
      window.cancelAnimationFrame(this.scrollFrame);
    }
  }

  isNavActive(navItem: string): boolean {
    return this.activeNav() === navItem;
  }

  toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  toggleTheme(): void {
    this.applyTheme(!this.isDarkMode(), true);
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
    this.closeMenu();
  }

  t() {
    return this.copy[this.language()];
  }

  sendContactMessage(event: Event): void {
    event.preventDefault();

    const text = this.t();
    const subject = text.subject;
    const body = [
      `${text.senderEmail}: ${this.contactForm.email}`,
      '',
      text.formMessage,
      this.contactForm.message,
    ].join('\n');
    const composeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      this.contact.email,
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(composeUrl, '_blank', 'noopener');
  }

  private readonly queueActiveNavUpdate = (): void => {
    if (this.scrollFrame) {
      return;
    }

    this.scrollFrame = window.requestAnimationFrame(() => {
      this.scrollFrame = 0;
      this.updateActiveNav();
    });
  };

  private updateActiveNav(): void {
    const currentPath = this.router.url.split('#')[0].split('?')[0];
    const viewportAnchor = window.innerHeight * 0.36;

    const visibleSection = this.sectionIds
      .map((id) => {
        const element = document.getElementById(id);

        if (!element) {
          return null;
        }

        const rect = element.getBoundingClientRect();
        return {
          id,
          distance: Math.abs(rect.top - viewportAnchor),
          isNearViewport: rect.top <= viewportAnchor && rect.bottom >= 90,
        };
      })
      .filter((section): section is { id: string; distance: number; isNearViewport: boolean } =>
        Boolean(section),
      )
      .filter((section) => section.isNearViewport)
      .sort((a, b) => a.distance - b.distance)[0];

    if (visibleSection) {
      this.activeNav.set(visibleSection.id);
      return;
    }

    this.activeNav.set(currentPath.startsWith('/projects') ? 'projects' : 'about');
  }

  private initializeTheme(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const savedTheme = window.localStorage.getItem(this.themeStorageKey);
    this.applyTheme(savedTheme === 'dark', false);
  }

  private applyTheme(isDark: boolean, shouldPersist: boolean): void {
    this.isDarkMode.set(isDark);

    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark-theme', isDark);
      document.body.classList.toggle('dark-theme', isDark);
      document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
    }

    if (shouldPersist && typeof window !== 'undefined') {
      window.localStorage.setItem(this.themeStorageKey, isDark ? 'dark' : 'light');
    }
  }
}
