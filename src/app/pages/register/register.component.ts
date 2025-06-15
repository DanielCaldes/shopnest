import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name='';
  surname='';
  email='';
  password='';

  constructor(private router:Router){}

  onFormSubmit(){
    sessionStorage.setItem('email', this.email);
    sessionStorage.setItem('password', this.password);
    console.log(`Usuario ${this.email} registrado correctamente!`);
    this.router.navigate(['/home']);
  }
}
