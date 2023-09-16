import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormControl,
  MaxLengthValidator,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth-services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  registerForm!: FormGroup;
  genderOptions: string[] = ['Male', 'Female'];
  constructor(
    private AuthService: AuthService,
    private Router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}'
        ),
      ]),
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        Validators.minLength(10),
        Validators.required,
      ]),
      address: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      pincode: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
      ]),
    });
  }

  onSubmit() {
    this.AuthService.register(
      this.registerForm.value.username,
      this.registerForm.value.password,
      this.registerForm.value.name,
      this.registerForm.value.gender,
      this.registerForm.value.phone,
      this.registerForm.value.address,
      this.registerForm.value.city,
      this.registerForm.value.pincode
    );
    this.toastr.success('Registered!');
    this.Router.navigate(['login']);
  }
}
