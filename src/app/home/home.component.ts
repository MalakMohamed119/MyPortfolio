import { Component, AfterViewInit, HostListener, computed, inject, signal } from '@angular/core';
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
  private readonly languageService = inject(LanguageService);

  readonly filters: Array<ProjectCategory | 'All'> = ['All', 'Angular', 'JavaScript', 'UI'];

  readonly selectedCertificate = signal<Certificate | null>(null);

  readonly activeFilter = signal<ProjectCategory | 'All'>('All');
  readonly language = this.languageService.language;

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

  readonly copy = {
    en: {
      name: 'Malak Mohamed Mostafa',
      heroAvailable: 'Available for Angular frontend roles',
      heroEyebrow: 'Front-End Developer & Software Engineer',
      heroTitle: 'I build Angular interfaces that feel fast, sharp, and trusted.',
      heroIntro: 'I am Malak Mohamed Mostafa, a frontend developer turning product ideas into polished, responsive, API-driven web experiences with strong component architecture.',
      viewWork: 'Projects',
      downloadCv: 'Download CV',
      socials: 'Social profiles',
      summary: 'Professional summary',
      githubProfile: 'GitHub profile',
      linkedinProfile: 'LinkedIn profile',
      core: 'Core',
      coreValue: 'Angular, TypeScript, RxJS',
      focus: 'Focus',
      focusValue: 'Responsive product UI',
      strength: 'Strength',
      strengthValue: 'API-driven frontend flows',
      profile: 'Profile summary',
      badgeRole: 'Angular Developer',
      contactRole: 'Front-End Developer & Software Engineer',
      completedProjects: 'completed projects',
      proofCertificates: 'certificates',
      proofGraduate: 'graduated software engineer',
      proofLocation: 'Cairo',
      proofCairo: 'open to frontend work',
      aboutEyebrow: 'About',
      aboutTitle: 'Frontend developer focused on Angular interfaces.',
      aboutP1: 'I care about the full interface: the data flow behind it, the accessibility around it, the responsive behavior under pressure, and the tiny transitions that make it feel alive.',
      aboutP2: 'My strongest work combines Angular, TypeScript, SCSS, API integration, and practical UI judgment. I am building a portfolio that proves I can think, design, debug, and ship.',
      strengthsAria: 'Professional strengths',
      productInstinct: 'Product Instinct',
      productInstinctText: 'I shape interfaces around clarity, hierarchy, and useful user flow.',
      frontendSystems: 'Frontend Systems',
      frontendSystemsText: 'I build with reusable components, clean styles, and maintainable structure.',
      visualPolish: 'Visual Polish',
      visualPolishText: 'I refine spacing, motion, responsive states, and the feel of interaction.',
      educationEyebrow: 'Education',
      educationTitle: "Graduated with a Bachelor's degree in Software Engineering.",
      graduatedShort: 'Graduated in June 2026',
      degree: 'Bachelor of Software Engineering',
      faculty: 'Faculty of Computers and Artificial Intelligence, Capital University (formerly Helwan) | Cairo',
      educationText: 'Academic study focused on software engineering fundamentals, problem solving, and building reliable software systems.',
      coursework: 'Relevant coursework',
      academicDetails: 'Academic details',
      gpa: 'GPA',
      overallGrade: 'Overall grade',
      veryGood: 'Very Good',
      graduated: 'Graduated',
      june2026: 'in June 2026',
      experienceEyebrow: 'Experience',
      experienceTitle: 'Work experience and practical training.',
      work: 'Work',
      presentDate: 'Oct 2024 - Present',
      instructor: 'Programming Instructor',
      instructorPlace: '3C - Creative Children Community | Part-time | Cairo, Egypt',
      instructorText: 'Teach Scratch, Python, HTML, CSS, and App Inventor through interactive lessons, project-based learning, and personalized student support.',
      experienceFocus: 'Experience focus',
      teaching: 'Teaching',
      kidsCoding: 'Kids coding',
      projectLearning: 'Project-based learning',
      course: 'Course',
      meanDate: 'Aug 2025',
      meanTitle: 'MEAN Stack Development',
      meanText: 'Completed a MEAN Stack course focused on Angular, TypeScript, and MongoDB.',
      routeDate: 'Mar 2025 - Sep 2025',
      routeTitle: 'Front-End Development Course',
      routeText: 'Completed structured frontend training covering Angular, JavaScript, TypeScript, SASS, Bootstrap, Tailwind, APIs, Git, hosting, and async workflows.',
      selectedWork: 'Selected Work',
      selectedTitle: 'Selected Frontend Projects',
      allProjects: 'All Projects',
      tools: 'Tools',
      techStack: 'Technology stack',
      liveDemo: 'Live Demo',
      skillsEyebrow: 'Skills',
      skillsTitle: 'Technologies and tools I work with.',
      skillAria: 'Skills for',
      certificatesEyebrow: 'Certificates',
      certificatesTitle: 'Certificates from completed learning programs.',
      certificatesAria: 'Certificates',
      openCertificate: 'Open certificate',
      communityEyebrow: 'Community',
      communityTitle: 'Community activities.',
      community: 'Community',
      icpcText: 'Competitive programming practice using C++.',
      campText: 'Algorithmic challenges using C.',
      mindersText: 'Mentorship workshop in HTML, CSS, and JavaScript.',
      closeCertificate: 'Close certificate',
      certificateDetails: 'Certificate Details',
      skillsTech: 'Skills & Technologies',
    },
    ar: {
      name: 'ملك محمد مصطفى',
      heroAvailable: 'متاحة لفرص عمل في واجهات Angular',
      heroEyebrow: 'مهندسة برمجيات ومطورة واجهات أمامية',
      heroTitle: 'أبني واجهات Angular سريعة، أنيقة، وسهلة الاستخدام.',
      heroIntro: 'أنا ملك محمد مصطفى، مطورة واجهات أمامية أساعد في تحويل أفكار المنتجات إلى تجارب ويب متجاوبة، منظمة، ومتصلة بالـ APIs بكود قابل للتطوير.',
      viewWork: 'المشاريع',
      downloadCv: 'تحميل السيرة الذاتية',
      socials: 'حسابات التواصل',
      summary: 'ملخص مهني',
      githubProfile: 'حساب GitHub',
      linkedinProfile: 'حساب LinkedIn',
      core: 'الأساس',
      coreValue: 'Angular, TypeScript, RxJS',
      focus: 'أهتم بـ',
      focusValue: 'واجهات سهلة ومتجاوبة',
      strength: 'أتميز بـ',
      strengthValue: 'ربط البيانات والـ APIs',
      profile: 'ملخص الملف الشخصي',
      badgeRole: 'مطورة Angular',
      contactRole: 'مطورة واجهات أمامية ومهندسة برمجيات',
      completedProjects: 'مشاريع مكتملة',
      proofCertificates: 'شهادات',
      proofGraduate: 'خريجة هندسة برمجيات',
      proofLocation: 'القاهرة',
      proofCairo: 'متاحة لفرص تطوير الواجهات',
      aboutEyebrow: 'نبذة',
      aboutTitle: 'مطورة واجهات أمامية متخصصة في بناء واجهات Angular.',
      aboutP1: 'أهتم بتجربة المستخدم كاملة: تدفق البيانات، سهولة الوصول، الاستجابة على مختلف الشاشات، والتفاصيل الصغيرة التي تجعل الواجهة مريحة في الاستخدام.',
      aboutP2: 'أقوى شغلي يجمع بين Angular وTypeScript وSCSS وربط الـ APIs مع حس عملي في ترتيب الواجهة وتبسيطها. أركز على كتابة كود منظم وتسليم تجربة متقنة.',
      strengthsAria: 'نقاط القوة المهنية',
      productInstinct: 'فهم تجربة المستخدم',
      productInstinctText: 'أرتب الواجهة حول الوضوح، الأولويات، وتجربة استخدام مفهومة.',
      frontendSystems: 'أنظمة الواجهات الأمامية',
      frontendSystemsText: 'أبني بمكونات قابلة لإعادة الاستخدام، تنسيقات منظمة، وهيكل سهل الصيانة.',
      visualPolish: 'اهتمام بالتفاصيل البصرية',
      visualPolishText: 'أهتم بالمسافات، الحركة، توافق الشاشات المختلفة، وإحساس التفاعل.',
      educationEyebrow: 'التعليم',
      educationTitle: 'تخرجت بدرجة بكالوريوس في هندسة البرمجيات.',
      graduatedShort: 'تخرجت في يونيو ٢٠٢٦',
      degree: 'بكالوريوس هندسة البرمجيات',
      faculty: 'كلية الحاسبات والذكاء الاصطناعي، جامعة العاصمة - حلوان سابقًا | القاهرة',
      educationText: 'دراسة أكاديمية ركزت على أساسيات هندسة البرمجيات، حل المشكلات، وبناء أنظمة برمجية موثوقة وقابلة للتطوير.',
      coursework: 'المقررات ذات الصلة',
      academicDetails: 'التفاصيل الأكاديمية',
      gpa: 'المعدل',
      overallGrade: 'التقدير العام',
      veryGood: 'جيد جدًا',
      graduated: 'تخرجت',
      june2026: 'في يونيو ٢٠٢٦',
      experienceEyebrow: 'الخبرة',
      experienceTitle: 'خبرة عملية وتدريبات متخصصة.',
      work: 'خبرة',
      presentDate: 'أكتوبر ٢٠٢٤ - حتى الآن',
      instructor: 'مدربة برمجة للأطفال',
      instructorPlace: '3C - Creative Children Community | دوام جزئي | القاهرة، مصر',
      instructorText: 'أدرّس Scratch وPython وHTML وCSS وApp Inventor بأسلوب تفاعلي يعتمد على المشاريع، مع متابعة فردية تساعد الطلاب على الفهم والتطبيق.',
      experienceFocus: 'محاور الخبرة',
      teaching: 'تدريس',
      kidsCoding: 'برمجة للأطفال',
      projectLearning: 'تعلم قائم على المشاريع',
      course: 'تدريب',
      meanDate: 'أغسطس ٢٠٢٥',
      meanTitle: 'تطوير MEAN Stack',
      meanText: 'أكملت تدريب MEAN Stack ركز على بناء تطبيقات باستخدام Angular وTypeScript وMongoDB.',
      routeDate: 'مارس ٢٠٢٥ - سبتمبر ٢٠٢٥',
      routeTitle: 'تدريب تطوير الواجهات الأمامية',
      routeText: 'أكملت تدريبًا منظمًا في تطوير الواجهات الأمامية شمل Angular وJavaScript وTypeScript وSASS وBootstrap وTailwind وربط الـ APIs وGit والاستضافة والتعامل مع العمليات غير المتزامنة.',
      selectedWork: 'نماذج من أعمالي',
      selectedTitle: 'مشاريع واجهات أمامية مميزة',
      allProjects: 'كل المشاريع',
      tools: 'الأدوات',
      techStack: 'التقنيات المستخدمة',
      liveDemo: 'عرض مباشر',
      skillsEyebrow: 'المهارات',
      skillsTitle: 'التقنيات والأدوات التي أستخدمها في بناء الواجهات.',
      skillAria: 'مهارات',
      certificatesEyebrow: 'الشهادات',
      certificatesTitle: 'شهادات من برامج تدريبية وتعليمية مكتملة.',
      certificatesAria: 'الشهادات',
      openCertificate: 'فتح الشهادة',
      communityEyebrow: 'المجتمع',
      communityTitle: 'مشاركات وأنشطة مجتمعية.',
      community: 'مجتمع',
      icpcText: 'ممارسة البرمجة التنافسية وحل المشكلات باستخدام C++.',
      campText: 'تدريب على تحديات الخوارزميات وحل المشكلات باستخدام C.',
      mindersText: 'ورشة إرشادية في HTML وCSS وJavaScript.',
      closeCertificate: 'إغلاق الشهادة',
      certificateDetails: 'تفاصيل الشهادة',
      skillsTech: 'المهارات والتقنيات',
    },
  };

  t() {
    return this.copy[this.language()];
  }

  number(value: string | number): string {
    if (this.language() !== 'ar') {
      return String(value);
    }

    return String(value)
      .replace(/\d/g, (digit) => '٠١٢٣٤٥٦٧٨٩'[Number(digit)])
      .replace(/\./g, '٫');
  }

  paddedNumber(value: number): string {
    if (this.language() === 'ar') {
      return `${this.number(value)}.`;
    }

    return this.number(value.toString().padStart(2, '0'));
  }

  readonly skillGroups = computed<SkillGroup[]>(() => this.language() === 'ar' ? [
    { title: 'هندسة الواجهات', description: 'بناء واجهات قابلة للتوسع بمكونات منظمة وتدفقات واضحة.', skills: ['Angular', 'TypeScript', 'JavaScript ES6+', 'RxJS', 'HTML5', 'SCSS'] },
    { title: 'تصميم واجهات المنتجات', description: 'تحويل هدف المنتج إلى تجربة متجاوبة، سهلة الوصول، ومرتبة بصريًا.', skills: ['Responsive UI', 'Accessibility', 'Figma', 'Design Systems', 'Bootstrap 5', 'Tailwind CSS'] },
    { title: 'ممارسات التطوير', description: 'تسليم كود قابل للصيانة مع مهارات قوية في التصحيح، ربط الـ APIs، والنشر.', skills: ['API Integration', 'Async Flows', 'Git & GitHub', 'Clean Components', 'Deployment', 'Chrome DevTools'] },
    { title: 'أساسيات علوم الحاسب', description: 'أساس قوي في هندسة البرمجيات وحل المشكلات بطريقة منظمة.', skills: ['OOP', 'Data Structures', 'Algorithms', 'C++', 'Python', 'Problem Solving'] },
  ] : [
    { title: 'Frontend Engineering', description: 'Building scalable interfaces with component architecture and clean stateful flows.', skills: ['Angular', 'TypeScript', 'JavaScript ES6+', 'RxJS', 'HTML5', 'SCSS'] },
    { title: 'Product UI', description: 'Translating product intent into responsive, accessible, polished experiences.', skills: ['Responsive UI', 'Accessibility', 'Figma', 'Design Systems', 'Bootstrap 5', 'Tailwind CSS'] },
    { title: 'Engineering Practices', description: 'Shipping maintainable work with strong debugging, API, and deployment habits.', skills: ['API Integration', 'Async Flows', 'Git & GitHub', 'Clean Components', 'Deployment', 'Chrome DevTools'] },
    { title: 'CS Foundation', description: 'Grounded in software engineering fundamentals and structured problem solving.', skills: ['OOP', 'Data Structures', 'Algorithms', 'C++', 'Python', 'Problem Solving'] },
  ]);

  readonly certificates = computed<Certificate[]>(() => this.language() === 'ar' ? [
    {
      title: 'تدريب MEAN Stack',
      issuer: 'معهد تكنولوجيا المعلومات (ITI)',
      year: 'أغسطس ٢٠٢٥',
      imageSrc: 'Screenshot 2026-05-20 185157.png',
      skills: ['Angular', 'TypeScript', 'MongoDB'],
    },
    {
      title: 'شهادة تطوير الواجهات الأمامية',
      issuer: 'Route Academy',
      year: 'سبتمبر ٢٠٢٥',
      imageSrc: 'Screenshot 2026-05-20 184836.png',
      skills: [
        'HTML 5', 'CSS3', 'SASS', 'Bootstrap 5', 'Tailwind 4', 'Web Accessibility', 'JavaScript',
        'DOM & BOM', 'Async Programming', 'Regular expressions', 'ECMAScript 6+',
        'TypeScript', 'JQuery', 'SASS', 'Hosting and Domain', 'Git', 'Figma', 'Angular',
      ],
    },
    {
      title: 'تطوير الواجهات الأمامية',
      issuer: 'Minders',
      year: 'سبتمبر ٢٠٢٣',
      imageSrc: 'Screenshot 2026-05-20 185110.jpg',
      skills: ['HTML5', 'CSS', 'JavaScript'],
    },
  ] : [
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
  ]);

  readonly projects = computed<Project[]>(() => this.language() === 'ar' ? [
    { title: 'LoCum', type: 'منصة عمل حر في المجال الصحي', category: 'Angular', description: 'منصة متجاوبة تساعد دور الرعاية والمنشآت التمريضية على طلب مساعدين مؤهلين من خلال واجهة Angular نظيفة وقابلة للتوسع.', stack: ['Angular', 'TypeScript', 'SCSS', 'API Integration'], link: 'https://lo-cum.vercel.app/', featured: true },
    { title: 'EvoShop', type: 'مشروع تدريبي من Route Academy', category: 'Angular', description: 'تجربة متجر إلكتروني متكاملة تشمل تسجيل الدخول، إدارة السلة، عرض بيانات ديناميكية من API، ومحاكاة عملية الدفع.', stack: ['Angular', 'TypeScript', 'RxJS', 'Tailwind CSS'], link: 'https://e-commerce-five-kappa-11.vercel.app' },
    { title: 'Movie Night', type: 'مشروع تدريبي في ITI', category: 'Angular', description: 'تطبيق لاكتشاف الأفلام يعتمد على APIs خارجية، مع عرض واضح لحالة التحميل وتصميم Bootstrap متجاوب.', stack: ['Angular', 'TypeScript', 'Bootstrap', 'API Integration'], link: 'https://movie-night-seven.vercel.app' },
    { title: 'Q&A Platform', type: 'مشروع مراجعة شخصي', category: 'Angular', description: 'منصة أسئلة وأجوبة للتدريب والمراجعة على Angular وموضوعات الواجهات الأمامية من خلال أسئلة منظمة حسب الموضوع.', stack: ['Angular Topics', 'واجهات أمامية', 'JavaScript', 'Practice'], link: 'https://malakmohamed119.github.io/Q-A-/' },
    { title: 'Weather App', type: 'مشروع تدريبي من Route Academy', category: 'JavaScript', description: 'تطبيق طقس تفاعلي يجلب تحديثات الطقس الحية ويعرضها حسب بيانات الموقع.', stack: ['JavaScript', 'Bootstrap', 'Async API'], link: 'https://malakmohamed119.github.io/WeatherApp/' },
    { title: 'Smart Login System', type: 'مشروع تدريبي من Route Academy', category: 'JavaScript', description: 'تدفق تسجيل دخول على جانب العميل باستخدام التخزين المحلي والتحقق من المدخلات عبر Regex.', stack: ['JavaScript', 'التخزين المحلي', 'Regex'], link: 'https://malakmohamed119.github.io/Smart-LOGIN-System/' },
    { title: 'Bookmark App', type: 'مشروع تدريبي من Route Academy', category: 'JavaScript', description: 'تطبيق لإدارة الروابط يتيح الحفظ، التحقق، الفهرسة، والتعديل باستخدام التخزين المحلي.', stack: ['JavaScript', 'CRUD', 'Bootstrap'], link: 'https://malakmohamed119.github.io/Bookmark/' },
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
      title: 'Smart Login System',
      type: 'Route Academy course project',
      category: 'JavaScript',
      description: 'Client-side authentication flow using LocalStorage persistence and Regex validation for strict form inputs.',
      stack: ['JavaScript', 'LocalStorage', 'Regex'],
      link: 'https://malakmohamed119.github.io/Smart-LOGIN-System/',
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
