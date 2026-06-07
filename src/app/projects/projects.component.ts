import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import AOS from 'aos';
import { LanguageService } from '../language.service';

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

@Component({
  selector: 'app-projects',
  imports: [RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class ProjectsComponent implements OnInit {
  private readonly languageService = inject(LanguageService);

  readonly filters: Array<ProjectCategory | 'All'> = ['All', 'Angular', 'JavaScript', 'UI'];

  readonly activeFilter = signal<ProjectCategory | 'All'>('All');
  readonly language = this.languageService.language;

  readonly copy = {
    en: {
      back: 'Back',
      backAria: 'Back to home',
      eyebrow: 'Featured Work',
      title: 'Frontend Projects',
      desc: 'A focused collection of Angular, JavaScript, and UI projects showing API integration, responsive implementation, component thinking, and polished frontend delivery.',
      focusAreas: 'Project focus areas',
      responsiveUi: 'Responsive UI',
      liveDemos: 'Live demos',
      filters: 'Project filters',
      all: 'All',
      tools: 'Tools',
      techStack: 'Technology stack',
      liveDemo: 'Live Demo',
    },
    ar: {
      back: 'رجوع',
      backAria: 'الرجوع للصفحة الرئيسية',
      eyebrow: 'أعمال مميزة',
      title: 'مشاريع الواجهات الأمامية',
      desc: 'مجموعة مختارة من مشاريع Angular وJavaScript وواجهات المستخدم، تعرض ربط الـ APIs، التصميم المتجاوب، بناء الواجهة بمكونات منظمة، وتسليم واجهات متقنة.',
      focusAreas: 'مجالات تركيز المشاريع',
      responsiveUi: 'واجهات متجاوبة',
      liveDemos: 'روابط مباشرة',
      filters: 'تصفية المشاريع',
      all: 'الكل',
      tools: 'الأدوات',
      techStack: 'التقنيات المستخدمة',
      liveDemo: 'عرض مباشر',
    },
  };

  t() {
    return this.copy[this.language()];
  }

  filterLabel(filter: ProjectCategory | 'All'): string {
    return filter === 'All' ? this.t().all : filter;
  }

  projectNumber(index: number): string {
    const value = index + 1;

    if (this.language() !== 'ar') {
      return value.toString().padStart(2, '0');
    }

    return `${value.toString().replace(/\d/g, (digit) => '٠١٢٣٤٥٦٧٨٩'[Number(digit)])}.`;
  }

  readonly projects = computed<Project[]>(() => this.language() === 'ar' ? [
    { title: 'LoCum', type: 'منصة عمل حر في المجال الصحي', category: 'Angular', description: 'منصة متجاوبة تساعد دور الرعاية والمنشآت التمريضية على طلب مساعدين مؤهلين من خلال واجهة Angular نظيفة وقابلة للتوسع.', stack: ['Angular', 'TypeScript', 'SCSS', 'API Integration'], link: 'https://lo-cum.vercel.app/', featured: true },
    { title: 'EvoShop', type: 'مشروع تدريبي من Route Academy', category: 'Angular', description: 'تجربة متجر إلكتروني متكاملة تشمل تسجيل الدخول، إدارة السلة، عرض بيانات ديناميكية من API، ومحاكاة عملية الدفع.', stack: ['Angular', 'TypeScript', 'RxJS', 'Tailwind CSS'], link: 'https://e-commerce-five-kappa-11.vercel.app' },
    { title: 'Movie Night', type: 'مشروع تدريبي في ITI', category: 'Angular', description: 'تطبيق لاكتشاف الأفلام يعتمد على APIs خارجية، مع عرض واضح لحالة التحميل وتصميم Bootstrap متجاوب.', stack: ['Angular', 'TypeScript', 'Bootstrap', 'API Integration'], link: 'https://movie-night-seven.vercel.app' },
    { title: 'Q&A Platform', type: 'مشروع مراجعة شخصي', category: 'Angular', description: 'منصة أسئلة وأجوبة للتدريب والمراجعة على Angular وموضوعات الواجهات الأمامية من خلال أسئلة منظمة حسب الموضوع.', stack: ['Angular Topics', 'واجهات أمامية', 'JavaScript', 'Practice'], link: 'https://malakmohamed119.github.io/Q-A-/' },
    { title: 'Weather App', type: 'مشروع تدريبي من Route Academy', category: 'JavaScript', description: 'تطبيق طقس تفاعلي يجلب تحديثات الطقس الحية ويعرضها حسب بيانات الموقع.', stack: ['JavaScript', 'Bootstrap', 'Async API'], link: 'https://malakmohamed119.github.io/WeatherApp/' },
    { title: 'Bookmark App', type: 'مشروع تدريبي من Route Academy', category: 'JavaScript', description: 'تطبيق لإدارة الروابط يتيح الحفظ، التحقق، الفهرسة، والتعديل باستخدام التخزين المحلي.', stack: ['JavaScript', 'CRUD', 'Bootstrap'], link: 'https://malakmohamed119.github.io/Bookmark/' },
    { title: 'Smart Login System', type: 'مشروع تدريبي من Route Academy', category: 'JavaScript', description: 'تدفق تسجيل دخول على جانب العميل باستخدام التخزين المحلي والتحقق من المدخلات عبر Regex.', stack: ['JavaScript', 'التخزين المحلي', 'Regex'], link: 'https://malakmohamed119.github.io/Smart-LOGIN-System/' },
    { title: 'Trendify', type: 'صفحة تعريفية لمتجر إلكتروني', category: 'UI', description: 'صفحة متجر متجاوبة تركز على عرض المنتجات بشكل منظم واستخدام Tailwind لتجربة سلسة.', stack: ['HTML5', 'Tailwind CSS', 'Responsive Design'], link: 'https://malakmohamed119.github.io/TreNdiFy/' },
    { title: 'Mealify', type: 'صفحة تعريفية لمطعم', category: 'UI', description: 'صفحة مطعم بتصميم حيوي، حركات CSS، شبكات متجاوبة، وتبديل بين الوضع الفاتح والداكن.', stack: ['HTML5', 'CSS3', 'Keyframes', 'Dark Mode'], link: 'https://malakmohamed119.github.io/Mealify/' },
    { title: 'Bakery', type: 'صفحة تعريفية لمخبز', category: 'UI', description: 'صفحة مخبز بتصميم بسيط ومنظم مبنية باستخدام Bootstrap وتخطيط متجاوب.', stack: ['HTML5', 'CSS3', 'Bootstrap 5'], link: 'https://bakery-roan-seven.vercel.app' },
  ] : [
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
      type: 'Route Academy course project',
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
      type: 'Route Academy course project',
      category: 'JavaScript',
      description: 'Interactive weather experience that fetches and renders live weather updates based on location data.',
      stack: ['JavaScript', 'Bootstrap', 'Async API'],
      link: 'https://malakmohamed119.github.io/WeatherApp/',
    },
    {
      title: 'Bookmark App',
      type: 'Route Academy course project',
      category: 'JavaScript',
      description: 'CRUD bookmark manager for saving, validating, indexing, and managing browser links in LocalStorage.',
      stack: ['JavaScript', 'CRUD', 'Bootstrap'],
      link: 'https://malakmohamed119.github.io/Bookmark/',
    },
    {
      title: 'Smart Login System',
      type: 'Route Academy course project',
      category: 'JavaScript',
      description: 'Client-side authentication flow using LocalStorage persistence and Regex validation for strict form inputs.',
      stack: ['JavaScript', 'LocalStorage', 'Regex'],
      link: 'https://malakmohamed119.github.io/Smart-LOGIN-System/',
    },
    {
      title: 'Trendify',
      type: 'E-commerce landing page',
      category: 'UI',
      description: 'Responsive e-commerce landing page focused on polished product layout, fluid sections, and Tailwind utilities.',
      stack: ['HTML5', 'Tailwind CSS', 'Responsive Design'],
      link: 'https://malakmohamed119.github.io/TreNdiFy/',
    },
    {
      title: 'Mealify',
      type: 'Restaurant landing page',
      category: 'UI',
      description: 'Creative restaurant landing page with CSS keyframe motion, responsive grids, and dark mode switching.',
      stack: ['HTML5', 'CSS3', 'Keyframes', 'Dark Mode'],
      link: 'https://malakmohamed119.github.io/Mealify/',
    },
    {
      title: 'Bakery',
      type: 'Bakery landing page',
      category: 'UI',
      description: 'Professional bakery landing page structured with Bootstrap responsive layout and grid utilities.',
      stack: ['HTML5', 'CSS3', 'Bootstrap 5'],
      link: 'https://bakery-roan-seven.vercel.app',
    },
  ]);

  readonly filteredProjects = computed(() => {
    const filter = this.activeFilter();
    return filter === 'All'
      ? this.projects()
      : this.projects().filter((project) => project.category === filter);
  });

  setFilter(filter: ProjectCategory | 'All'): void {
    this.activeFilter.set(filter);
  }

  ngOnInit(): void {
    queueMicrotask(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      if (typeof location !== 'undefined') location.hash = '';
    });

    AOS.init({
      duration: 650,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
    });
  }
}
