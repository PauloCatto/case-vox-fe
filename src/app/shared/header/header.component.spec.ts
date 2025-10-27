import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

import { HeaderComponent } from './header.component';

@Component({ template: '' })
class DummyComponent {}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        RouterTestingModule.withRoutes([
          { path: '', component: DummyComponent },
          { path: 'company-registration', component: DummyComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the "Abrir Solicitação" button on the root URL', fakeAsync(() => {
    router.navigate(['/']);
    tick();
    expect(component.showOpenButton).toBe(true);
  }));

  it('should hide the "Abrir Solicitação" button on the registration page', fakeAsync(() => {
    router.navigate(['/company-registration']);
    tick();
    expect(component.showOpenButton).toBe(false);
  }));

  it('should navigate to /company-registration when openForm is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.openForm();
    expect(navigateSpy).toHaveBeenCalledWith(['/company-registration']);
  });
});
