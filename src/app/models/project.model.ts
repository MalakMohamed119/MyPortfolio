export type ProjectCategory = 'Angular' | 'JavaScript' | 'UI';

export interface Project {
  title: string;
  type: string;
  category: ProjectCategory;
  description: string;
  stack: string[];
  link: string;
  featured?: boolean;
}
