import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  showOpenButton: boolean = true;

  private router = inject(Router);

  constructor() {}
  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.updateOpenButtonVisibility());
  }

  updateOpenButtonVisibility(): void {
    const url = this.router.url;
    this.showOpenButton = !url.includes('company-registration');
  }

  openForm(): void {
    this.router.navigate(['/company-registration']);
  }
}
