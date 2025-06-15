import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { provideRouter } from '@angular/router';

import { routes } from '../../app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthService } from '../../services/auth/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, BrowserAnimationsModule],
      providers: [
        provideRouter(routes)
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable submit button when form is invalid', () => {
    component.email = '';
    component.password = '';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const submitButton = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;

    expect(submitButton.disabled).toBeTrue();
  });
});
