import { Component, OnInit, computed, signal } from '@angular/core';
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

@Component({
  selector: 'app-projects',
  imports: [RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class ProjectsComponent implements OnInit {
  readonly filters: Array<ProjectCategory | 'All'> = ['All', 'Angular', 'JavaScript', 'UI'];

  readonly activeFilter = signal<ProjectCategory | 'All'>('All');

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
      type: 'Route Academy course project',
      category: 'UI',
      description: 'Responsive e-commerce landing page focused on polished product layout, fluid sections, and Tailwind utilities.',
      stack: ['HTML5', 'Tailwind CSS', 'Responsive Design'],
      link: 'https://malakmohamed119.github.io/TreNdiFy/',
    },
    {
      title: 'Mealify',
      type: 'Route Academy course project',
      category: 'UI',
      description: 'Creative restaurant landing page with CSS keyframe motion, responsive grids, and dark mode switching.',
      stack: ['HTML5', 'CSS3', 'Keyframes', 'Dark Mode'],
      link: 'https://malakmohamed119.github.io/Mealify/',
    },
    {
      title: 'Bakery',
      type: 'Route Academy course project',
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
