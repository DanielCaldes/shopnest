import { Component , ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, MatButtonModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email="";
  password="";

  constructor(private router:Router, private authService:AuthService){}

  onLoginSubmit(){
    this.authService.login(this.email);
    console.log(`Usuario ${this.email} logeado correctamente!`);
    this.router.navigate(['/home']);
  }
}