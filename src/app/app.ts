import { AfterViewInit, Component, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterOutlet, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit, OnDestroy {
  readonly isMenuOpen = signal(false);
  readonly activeNav = signal('about');

  private readonly sectionIds = [
    'about',
    'projects',
    'skills',
    'experience',
    'education',
    'certificates',
    'contact',
  ];
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

  constructor(private readonly router: Router) {}

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

  sendContactMessage(event: Event): void {
    event.preventDefault();

    const subject = 'Portfolio message';
    const body = [
      `Sender email: ${this.contactForm.email}`,
      '',
      'Message:',
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
}
