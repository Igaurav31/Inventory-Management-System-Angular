import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  selectedMethod: string = '';

  upiId: string = '';

  ccNumber: string = '';

  ccExpiry: string = '';

  ccCVC: string = '';

  loginForm!: FormGroup;

  constructor(private router: Router) {}

  selectPaymentMethod(method: string) {
    this.selectedMethod = method;
  }

  processPayment(method: string) {
    // if (method === 'UPI') {

    // } else if (method === 'CC') {

    // }
    this.router.navigate(['home/success']);
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      ccNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\d{16}$/),
      ]),
      ccExpiry: new FormControl(null, [
        Validators.required,
        this.expiryDateValidator,
      ]),
      cvv: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\d{3}$/),
      ]),
    });
  }
  onSubmit() {}

  expiryDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const currDate = new Date();
    const enteredDate = new Date(control.value);
    if (isNaN(enteredDate.getTime()) || enteredDate < currDate) {
      return { expired: true };
    }
    return null;
  }
}
