import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { FooterComponent } from './components/footer/footer.component';
import { Store } from '@ngrx/store';
import { saveState } from './store/localstorage';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TooltipComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'shopnest';
  private store = inject(Store);

  ngOnInit(): void {
    this.store.subscribe(state =>{
      saveState(state);
    })
  }
}
