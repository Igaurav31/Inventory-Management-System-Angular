import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
})
export class AdminHeaderComponent {
  user = JSON.parse(sessionStorage.getItem('currentuser')!);
  username = this.user.username;

  logout() {
    sessionStorage.removeItem('currentuser');
    location.reload();
  }
}
