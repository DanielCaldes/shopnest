import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
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
