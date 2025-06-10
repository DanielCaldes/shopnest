import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [NgIf, RouterLink, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css'
})
export class TooltipComponent {
  isMobile = false;
  isMenuOpen = false;
  isLoggedIn = false;

  private dialog = inject(MatDialog);

  constructor(private router: Router, private authService: AuthService) {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth <= 768;
  }

  ngOnInit() {
    this.onResize();
  }

  login() {
    this.router.navigate(['/login']);
    this.isMenuOpen = false;
  }

  logout() {
    const dialogRef = this.dialog.open(ConfirmLogoutInlineDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.logout();
      }
    });
    this.isMenuOpen = false;
  }

  basket(){
    this.router.navigate(['/basket']);
    this.isMenuOpen = false;
  }
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

@Component({
  standalone: true,
  template: `
    <div style="display: flex; justify-content:center; align-items: center; gap: 1rem; padding: 1rem 1.5rem;">
      <div>
        <h2 mat-dialog-title style="margin: 0 0 0.3rem;">Confirmar cierre de sesión</h2>
        <mat-dialog-content style="font-size: 1rem; color: rgba(0,0,0,0.7);">
          ¿Estás seguro de que deseas salir de tu cuenta?
        </mat-dialog-content>
      </div>
    </div>

    <mat-dialog-actions align="end" style="padding: 0 1.5rem 1rem;">
      <button mat-raised-button color="primary" [mat-dialog-close]="false">Cancelar</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">Salir</button>
    </mat-dialog-actions>
  `,
  imports: [MatButtonModule, MatDialogModule, MatIconModule]
})
class ConfirmLogoutInlineDialog {}