import { Component } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth-services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  loginForm!: FormGroup;

  constructor(
    private AuthService: AuthService,
    private Router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    //null signifies initial value
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}'
        ),
      ]),
    });
  }

  onSubmit() {
    this.AuthService.login(
      this.loginForm.value.username,
      this.loginForm.value.password
    );
    if (this.AuthService.getUserRole(this.loginForm.value.username) == false) {
      this.Router.navigate(['home']);
    } else {
      this.toastr.success('', 'logged in as admin');
      this.Router.navigate(['dashboard']); //dashboard
    }
  }
}
