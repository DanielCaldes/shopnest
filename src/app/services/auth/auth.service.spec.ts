import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    sessionStorage.clear(); // Limpiar antes de cada prueba
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería estar deslogueado por defecto si no hay usuario', (done) => {
    service.isLoggedIn$.subscribe(isLoggedIn => {
      expect(isLoggedIn).toBeFalse();
      done();
    });
  });

  it('debería hacer login y emitir true', (done) => {
    service.login('test@example.com');
    expect(sessionStorage.getItem('user')).toBe('test@example.com');

    service.isLoggedIn$.subscribe(isLoggedIn => {
      expect(isLoggedIn).toBeTrue();
      done();
    });
  });

  it('debería hacer logout y emitir false', (done) => {
    service.login('test@example.com');
    service.logout();

    expect(sessionStorage.getItem('user')).toBeNull();

    service.isLoggedIn$.subscribe(isLoggedIn => {
      expect(isLoggedIn).toBeFalse();
      done();
    });
  });

  it('debería reconocer sesión iniciada si hay un usuario en sessionStorage', () => {
    sessionStorage.setItem('user', 'persisted@example.com');

    // Se necesita crear una nueva instancia del servicio para que lea sessionStorage de nuevo
    const newService = TestBed.inject(AuthService);

    newService.isLoggedIn$.subscribe(isLoggedIn => {
      expect(isLoggedIn).toBeTrue();
    });
  });
});
