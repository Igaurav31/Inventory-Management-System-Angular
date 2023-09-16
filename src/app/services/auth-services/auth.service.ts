import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { CustomerService } from '../customer-services/customer.service';
import { Cart } from 'src/app/models/cart';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private CustomerService: CustomerService) {}

  register(
    username: string,
    password: string,
    name: string,
    gender: string,
    phoneNo: number,
    address: string,
    city: string,
    pinCode: number
  ) {
    const userToAdd = new User();
    userToAdd.username = username;
    userToAdd.password = password;
    userToAdd.isAdmin = false;
    userToAdd.name = name;
    userToAdd.gender = gender;
    userToAdd.phoneNo = phoneNo;
    userToAdd.address = address;
    userToAdd.city = city;
    userToAdd.pinCode = pinCode;
    (userToAdd.tempCart = new Cart()),
      (userToAdd.purchaseHistoryCartArray = []);
    this.CustomerService.addUser(userToAdd);
    console.log(username + 'registered');
  }
  login(username: string, password: string) {
    if (this.CustomerService.searchCustomer(username)) {
      if (this.CustomerService.authenticateUser(password)) {
        if (this.CustomerService.getUserRoleByMail(username)) {
          //if true => admin else user
          console.log('logged in as admin');
        } else {
          console.log('logged in as customer');
        }
        const userToAdd = new User();
        userToAdd.username = username;
        userToAdd.password = password;
        userToAdd.isAdmin = this.CustomerService.getUserRoleByMail(username);
        sessionStorage.setItem('currentuser', JSON.stringify(userToAdd));
        console.log(JSON.stringify(sessionStorage.getItem('currentuser')));
      } else {
        console.log('wrong password');
      }
    } else {
      console.log('wrong username');
    }
  }

  getUserRole(username: string) {
    return this.CustomerService.getUserRoleByMail(username);
  }
}
