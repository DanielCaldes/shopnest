import { Component , ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
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