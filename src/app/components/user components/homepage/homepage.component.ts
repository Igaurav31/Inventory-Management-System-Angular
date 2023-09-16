import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  constructor(private route: ActivatedRoute) {}

  isHomeRoute() {
    return this.route.snapshot.routeConfig?.path?.endsWith('home');
  }
}
