import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    sessionStorage.clear(); // Clear before each test
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be logged out by default if no user', (done) => {
    service.isLoggedIn$.subscribe(isLoggedIn => {
      expect(isLoggedIn).toBeFalse();
      done();
    });
  });

  it('should log in and emit true', (done) => {
    service.login('test@example.com');
    expect(sessionStorage.getItem('user')).toBe('test@example.com');

    service.isLoggedIn$.subscribe(isLoggedIn => {
      expect(isLoggedIn).toBeTrue();
      done();
    });
  });

  it('should log out and emit false', (done) => {
    service.login('test@example.com');
    service.logout();

    expect(sessionStorage.getItem('user')).toBeNull();

    service.isLoggedIn$.subscribe(isLoggedIn => {
      expect(isLoggedIn).toBeFalse();
      done();
    });
  });

  it('should recognize active session if user is in sessionStorage', (done) => {
    sessionStorage.setItem('user', 'persisted@example.com');

    // Create a new instance manually to re-check sessionStorage
    const newService = new AuthService();

    newService.isLoggedIn$.subscribe(isLoggedIn => {
      expect(isLoggedIn).toBeTrue();
      done();
    });
  });
});
