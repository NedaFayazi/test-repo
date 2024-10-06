import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    '[tabIndex]': '1',
  }
})
export class AppComponent {
  title = 'golab';

}
