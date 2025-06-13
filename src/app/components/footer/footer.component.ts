import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ RouterModule, MatIconModule ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(private router : Router){}

  basket(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigateByUrl("/basket");
  }

  home(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigateByUrl("/home");
  }
}
