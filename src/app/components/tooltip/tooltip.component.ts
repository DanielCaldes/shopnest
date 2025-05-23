import { NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css'
})
export class TooltipComponent {
  isMobile = false;
  isMenuOpen = false;
  isLoggedIn = false;

  constructor(private router:Router, private authService: AuthService){
    this.authService.isLoggedIn$.subscribe(status =>{
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

  login(){
    console.log("Login!");
    this.router.navigate(['/login']);
  }

  logout(){
    this.authService.logout();
  }

  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }
}
