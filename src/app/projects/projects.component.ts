import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECTS_BY_LANGUAGE } from '../data/projects.data';
import { LanguageService } from '../language.service';
import type { ProjectCategory, Project } from '../models/project.model';
import { AosService } from '../services/aos.service';

@Component({
  selector: 'app-projects',
  imports: [RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class ProjectsComponent implements OnInit {
  private readonly languageService = inject(LanguageService);
  private readonly aos = inject(AosService);

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

  readonly projects = computed<Project[]>(() => PROJECTS_BY_LANGUAGE[this.language()]);

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

    this.aos.init();
  }
}
