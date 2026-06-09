import { Injectable } from '@angular/core';
import AOS from 'aos';

@Injectable({ providedIn: 'root' })
export class AosService {
  private initialized = false;

  init(): void {
    if (this.initialized) {
      AOS.refreshHard();
      return;
    }

    AOS.init({
      duration: 650,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
    });
    this.initialized = true;
  }
}
