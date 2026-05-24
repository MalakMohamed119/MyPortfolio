import { Component, AfterViewInit, HostListener, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import AOS from 'aos';

type ProjectCategory = 'Angular' | 'JavaScript' | 'UI';

interface Project {
  title: string;
  type: string;
  category: ProjectCategory;
  description: string;
  stack: string[];
  link: string;
  featured?: boolean;
}

interface SkillGroup {
  title: string;
  description: string;
  skills: string[];
}

type Certificate = {
  title: string;
  imageSrc: string;
  issuer: string;
  year: string;
  skills?: string[];
};

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements AfterViewInit {
  readonly filters: Array<ProjectCategory | 'All'> = ['All', 'Angular', 'JavaScript', 'UI'];

  readonly selectedCertificate = signal<Certificate | null>(null);

  readonly activeFilter = signal<ProjectCategory | 'All'>('All');

  readonly contact = {
    name: 'Malak Mohamed Mostafa',
    role: 'Front-End Developer & Software Engineer',
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

  readonly skillGroups: SkillGroup[] = [
    {
      title: 'Frontend Engineering',
      description: 'Building scalable interfaces with component architecture and clean stateful flows.',
      skills: [
        'Angular',
        'TypeScript',
        'JavaScript ES6+',
        'RxJS',
        'HTML5',
        'SCSS',
      ],
    },
    {
      title: 'Product UI',
      description: 'Translating product intent into responsive, accessible, polished experiences.',
      skills: [
        'Responsive UI',
        'Accessibility',
        'Figma',
        'Design Systems',
        'Bootstrap 5',
        'Tailwind CSS',
      ],
    },
    {
      title: 'Engineering Practices',
      description: 'Shipping maintainable work with strong debugging, API, and deployment habits.',
      skills: [
        'API Integration',
        'Async Flows',
        'Git & GitHub',
        'Clean Components',
        'Deployment',
        'Chrome DevTools',
      ],
    },
    {
      title: 'CS Foundation',
      description: 'Grounded in software engineering fundamentals and structured problem solving.',
      skills: [
        'OOP',
        'Data Structures',
        'Algorithms',
        'C++',
        'Python',
        'Problem Solving',
      ],
    },
  ];

  readonly certificates: Certificate[] = [
    {
      title: 'MEAN Stack Development',
      issuer: 'Information Technology Institute (ITI)',
      year: 'Aug 2025',
      imageSrc: 'Screenshot 2026-05-20 185157.png',
      skills: ['Angular', 'TypeScript', 'MongoDB'],
    },
    {
      title: 'Front-End Development Certificate',
      issuer: 'Route',
      year: 'Sep 2025',
      imageSrc: 'Screenshot 2026-05-20 184836.png',
      skills: [
        'HTML 5', 'CSS3', 'SASS', 'Bootstrap 5', 'Tailwind 4', 'Web Accessibility', 'JavaScript',
        'DOM & BOM', 'Async Programming', 'Regular expressions', 'ECMAScript 6+',
        'TypeScript', 'JQuery', 'SASS', 'Hosting and Domain', 'Git', 'Figma', 'Angular',
      ],
    },
    {
      title: 'Front-End Web Development',
      issuer: 'Minders',
      year: 'Sep 2023',
      imageSrc: 'Screenshot 2026-05-20 185110.jpg',
      skills: ['HTML5', 'CSS', 'JavaScript'],
    },
  ];

  readonly projects: Project[] = [
    {
      title: 'LoCum',
      type: 'Freelance healthcare staffing platform',
      category: 'Angular',
      description: 'Responsive platform for care homes and nursing facilities to request qualified PSWs through a clean, scalable Angular interface.',
      stack: ['Angular', 'TypeScript', 'SCSS', 'API Integration'],
      link: 'https://lo-cum.vercel.app/',
      featured: true,
    },
    {
      title: 'EvoShop',
      type: 'Route Academy project',
      category: 'Angular',
      description: 'Full e-commerce experience with authentication, cart management, dynamic API data, and payment workflow simulation.',
      stack: ['Angular', 'TypeScript', 'RxJS', 'Tailwind CSS'],
      link: 'https://e-commerce-five-kappa-11.vercel.app',
    },
    {
      title: 'Movie Night',
      type: 'ITI project',
      category: 'Angular',
      description: 'Movie discovery app integrated with external APIs, asynchronous loading states, and responsive Bootstrap layouts.',
      stack: ['Angular', 'TypeScript', 'Bootstrap', 'API Integration'],
      link: 'https://movie-night-seven.vercel.app',
    },
    {
      title: 'Q&A Platform',
      type: 'Personal revision project',
      category: 'Angular',
      description: 'Self-built Q&A review project for practicing and revising Angular and frontend topics through focused topic-based questions.',
      stack: ['Angular Topics', 'Frontend', 'JavaScript', 'Practice'],
      link: 'https://malakmohamed119.github.io/Q-A-/',
    },
    {
      title: 'Weather App',
      type: 'Route Academy project',
      category: 'JavaScript',
      description: 'Interactive weather experience that fetches and renders live weather updates based on location data.',
      stack: ['JavaScript', 'Bootstrap', 'Async API'],
      link: 'https://malakmohamed119.github.io/WeatherApp/',
    },
    {
      title: 'Smart Login System',
      type: 'Route Academy project',
      category: 'JavaScript',
      description: 'Client-side authentication flow using LocalStorage persistence and Regex validation for strict form inputs.',
      stack: ['JavaScript', 'LocalStorage', 'Regex'],
      link: 'https://malakmohamed119.github.io/Smart-LOGIN-System/',
    },
    {
      title: 'Bookmark App',
      type: 'Route Academy project',
      category: 'JavaScript',
      description: 'CRUD bookmark manager for saving, validating, indexing, and managing browser links in LocalStorage.',
      stack: ['JavaScript', 'CRUD', 'Bootstrap'],
      link: 'https://malakmohamed119.github.io/Bookmark/',
    },
    {
      title: 'Trendify',
      type: 'Route Academy project',
      category: 'UI',
      description: 'Responsive e-commerce landing page focused on polished product layout, fluid sections, and Tailwind utilities.',
      stack: ['HTML5', 'Tailwind CSS', 'Responsive Design'],
      link: 'https://malakmohamed119.github.io/TreNdiFy/',
    },
    {
      title: 'Mealify',
      type: 'Route Academy project',
      category: 'UI',
      description: 'Creative restaurant landing page with CSS keyframe motion, responsive grids, and dark mode switching.',
      stack: ['HTML5', 'CSS3', 'Keyframes', 'Dark Mode'],
      link: 'https://malakmohamed119.github.io/Mealify/',
    },
    {
      title: 'Bakery',
      type: 'Route Academy project',
      category: 'UI',
      description: 'Professional bakery catalogue website structured with Bootstrap responsive layout and grid utilities.',
      stack: ['HTML5', 'CSS3', 'Bootstrap 5'],
      link: 'https://bakery-roan-seven.vercel.app',
    },
  ];

  readonly filteredProjects = computed(() => {
    const filter = this.activeFilter();
    return filter === 'All'
      ? this.projects
      : this.projects.filter((project) => project.category === filter);
  });

  readonly previewProjects = computed(() => {
    return this.filteredProjects().slice(0, 4);
  });

  setFilter(filter: ProjectCategory | 'All'): void {
    this.activeFilter.set(filter);
  }

  openCertificate(cert: Certificate): void {
    this.selectedCertificate.set(cert);
  }

  closeCertificateModal(): void {
    this.selectedCertificate.set(null);
  }

  ngAfterViewInit(): void {
    AOS.init({
      duration: 650,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeCertificateModal();
    }
  }
}
