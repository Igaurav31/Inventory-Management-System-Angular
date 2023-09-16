import { Injectable } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { productAndQuantity } from 'src/app/models/product-and-quantity';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  registeredUserArray: User[] = [];
  ordersArchieveArray: Cart[] = [];
  localStorageKey = 'registeredUserArray';
  keyForOrdersArchieve = 'orderArchieve';

  dummyOrder: Cart[] = [];
  defaultUsers: User[] = [
    {
      username: 'gss@google.com',
      password: 'BruceWayne@123',
      isAdmin: true,
    },
    {
      username: 'test@gmail.com',
      password: 'BruceWayne@123',
      isAdmin: false,
      tempCart: new Cart(),
      purchaseHistoryCartArray: [],
    },
  ];

  constructor() {
    this.initUsers();
    this.initOrderArchieve();
  }

  initUsers() {
    if (JSON.parse(localStorage.getItem(this.localStorageKey)!)) {
      this.registeredUserArray = JSON.parse(
        localStorage.getItem(this.localStorageKey) || '[]'
      );
      // this.tempCart = (JSON.parse(localStorage.getItem(this.localStorageKey)))
    } else {
      this.registeredUserArray = this.defaultUsers;
      localStorage.setItem(
        this.localStorageKey,
        JSON.stringify(this.defaultUsers)
      );
    }
  }

  initOrderArchieve() {
    if (JSON.parse(localStorage.getItem(this.keyForOrdersArchieve)!)) {
      this.ordersArchieveArray = JSON.parse(
        localStorage.getItem(this.keyForOrdersArchieve) || '[]'
      );
      // this.tempCart = (JSON.parse(localStorage.getItem(this.localStorageKey)))
    } else {
      this.ordersArchieveArray = this.dummyOrder;
      localStorage.setItem(
        this.keyForOrdersArchieve,
        JSON.stringify(this.dummyOrder)
      );
    }
  }

  //auth functions

  addUser(user: User) {
    // this.registeredUserArray.push(user);
    console.log(JSON.parse(localStorage.getItem(this.localStorageKey)!));
    console.log('log from addUser: ' + this.registeredUserArray);
    this.registeredUserArray.push(user);
    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify(this.registeredUserArray)
    );
  }

  checkIfAdmin(user: User) {
    const users = this.getRegisteredUsers();
    const currentUserIndex = users.findIndex(
      (p: User) => p.username == user.username
    );
    if (users[currentUserIndex].isAdmin == true) {
      return true;
    } else return false;
  }

  makeUserAdmin(user: User) {
    const users = this.getRegisteredUsers();
    const currentUserIndex = users.findIndex(
      (p: User) => p.username == user.username
    );
    if (users[currentUserIndex].isAdmin == true) {
      users[currentUserIndex].isAdmin = false;
    } else if (users[currentUserIndex].isAdmin == false) {
      users[currentUserIndex].isAdmin = true;
    }
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }

  removeUser(user: User) {
    // this.registeredUserArray.push(user);
    console.log(JSON.parse(localStorage.getItem(this.localStorageKey)!));
    console.log('log from addUser: ' + this.registeredUserArray);
    const userToDelete = this.registeredUserArray.findIndex(
      (p) => p.username === user.username
    );
    this.registeredUserArray.splice(userToDelete, 1);
    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify(this.registeredUserArray)
    );
  }

  getRegisteredUsers() {
    return JSON.parse(localStorage.getItem(this.localStorageKey)!);
  }

  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('currentuser')!);
  }

  getOrdersArchieve() {
    return JSON.parse(localStorage.getItem(this.keyForOrdersArchieve)!);
  }

  getTotalUsers() {
    let users = this.getRegisteredUsers();
    return users.length;
  }

  getTotalOrders() {
    let orders = this.getOrdersArchieve();
    return orders.length;
  }

  getCartLength() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentuser')!);
    const users = this.getRegisteredUsers();
    const currentUserIndex = users.findIndex(
      (p: User) => p.username == currentUser.username
    );
    return users[currentUserIndex].tempCart.productAndQuantity.length;
  }
  getPurchaseHistory() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentuser')!);
    const users = this.getRegisteredUsers();
    const currentUserIndex = users.findIndex(
      (p: User) => p.username == currentUser.username
    );
    return users[currentUserIndex].purchaseHistoryCartArray;
  }
  searchCustomer(username: string) {
    // return true;
    console.log(this.registeredUserArray);
    return this.registeredUserArray.find((p) => p.username === username);
  }

  authenticateUser(password: string) {
    // if(this.registeredUserArray.find((p) => p.password == password)) return true;
    // else return false;
    return this.registeredUserArray.some((p) => p.password === password);
  }

  getUserRoleByMail(username: string) {
    let index = this.registeredUserArray.findIndex(
      (p) => p.username == username
    );
    return this.registeredUserArray[index].isAdmin;
  }
  //cart functions
  addToCart(quantity: number, product: Product) {
    const currentUser = JSON.parse(sessionStorage.getItem('currentuser')!);
    const users = this.getRegisteredUsers();
    const currentUserIndex = users.findIndex(
      (p: User) => p.username == currentUser.username
    );
    var productToAddToCart = new productAndQuantity();
    productToAddToCart.product = product;
    productToAddToCart.quantity = quantity;
    productToAddToCart.subtotal = product.sellingPrice * quantity;
    if (
      users[currentUserIndex].tempCart.productAndQuantity.find(
        (p: productAndQuantity) => p.product.name === product.name
      )
    ) {
      console.log('Product already in the cart');
    } else {
      users[currentUserIndex].tempCart.productAndQuantity.push(
        productToAddToCart
      );
      users[currentUserIndex].tempCart.totalBill +=
        product.sellingPrice * quantity;
      localStorage.setItem(this.localStorageKey, JSON.stringify(users));
    }
  }

  async updateTotalBill() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentuser')!);

    let users = await this.getRegisteredUsers();

    const currentUserIndex = users.findIndex(
      (p: User) => p.username == currentUser.username
    );

    let tempTotal = 0;

    for (
      let i = 0;
      i < users[currentUserIndex].tempCart.productAndQuantity.length;
      i++
    ) {
      console.log(tempTotal);
      tempTotal +=
        users[currentUserIndex].tempCart.productAndQuantity[i].subtotal;
    }
    console.log(tempTotal);
    users[currentUserIndex].tempCart.totalBill = tempTotal;

    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }

  updateQuantityInCart(product: Product, quantity: number) {
    const currentUser = JSON.parse(sessionStorage.getItem('currentuser')!);
    let users = this.getRegisteredUsers();
    const currentUserIndex = users.findIndex(
      (p: User) => p.username == currentUser.username
    );
    console.log('index of this user: ' + currentUserIndex);
    const index = users[currentUserIndex].tempCart.productAndQuantity.findIndex(
      (p: productAndQuantity) => p.product.name === product.name
    );
    if (index !== -1) {
      users[currentUserIndex].tempCart.productAndQuantity[index].quantity =
        quantity;
      users[currentUserIndex].tempCart.productAndQuantity[index].subtotal =
        users[currentUserIndex].tempCart.productAndQuantity[index].product
          .sellingPrice * quantity;
      users[currentUserIndex].tempCart.totalBill;
      localStorage.setItem(this.localStorageKey, JSON.stringify(users));
      this.updateTotalBill();
    }
  }
  getTotalBillOfCart() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentuser')!);
    const users = this.getRegisteredUsers();
    const currentUserIndex = users.findIndex(
      (p: User) => p.username == currentUser.username
    );

    return users[currentUserIndex].tempCart.totalBill;
  }

  getCart() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentuser')!);
    const users = this.getRegisteredUsers();
    const currentUserIndex = users.findIndex(
      (p: User) => p.username == currentUser.username
    );
    return users[currentUserIndex].tempCart;
  }

  getProductsInCart() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentuser')!);
    const users = this.getRegisteredUsers();
    const currentUserIndex = users.findIndex(
      (p: User) => p.username == currentUser.username
    );
    return users[currentUserIndex].tempCart.productAndQuantity;
  }

  buyProductsInCart() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentuser')!);
    const users = this.getRegisteredUsers();
    const currentUserIndex = users.findIndex(
      (p: User) => p.username == currentUser.username
    );
    let clone = structuredClone(users[currentUserIndex].tempCart);
    clone.date = Date.now();
    users[currentUserIndex].purchaseHistoryCartArray.push(clone);
    this.ordersArchieveArray.push(clone);
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
    localStorage.setItem(
      this.keyForOrdersArchieve,
      JSON.stringify(this.ordersArchieveArray)
    );
  }

  makeCartEmpty() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentuser')!);
    const users = this.getRegisteredUsers();
    const currentUserIndex = users.findIndex(
      (p: User) => p.username == currentUser.username
    );
    users[currentUserIndex].tempCart.productAndQuantity = [];
    users[currentUserIndex].tempCart.totalBill = 0;
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }

  removeProductFromCart(product: Product) {
    const currentUser = JSON.parse(sessionStorage.getItem('currentuser')!);
    const users = this.getRegisteredUsers();
    const currentUserIndex = users.findIndex(
      (p: User) => p.username == currentUser.username
    );
    var index = users[currentUserIndex].tempCart.productAndQuantity.findIndex(
      (p: productAndQuantity) => p.product.name === product.name
    )!;
    var currentProductAndQuantity =
      users[currentUserIndex].tempCart.productAndQuantity[index];
    var updatedBill =
      currentProductAndQuantity.product.sellingPrice *
      currentProductAndQuantity.quantity;
    users[currentUserIndex].tempCart.totalBill -= updatedBill;
    users[currentUserIndex].tempCart.productAndQuantity.splice(index, 1);
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
    this.updateTotalBill();
    console.log('product removed successfully');
  }

  getLastBill(): Cart {
    const currentUser = JSON.parse(sessionStorage.getItem('currentuser')!);
    const users = this.getRegisteredUsers();
    const currentUserIndex = users.findIndex(
      (p: User) => p.username == currentUser.username
    );
    let len = users[currentUserIndex].purchaseHistoryCartArray.length;
    return users[currentUserIndex].purchaseHistoryCartArray[len - 1];
  }

  getProductsInLastBill() {
    return this.getLastBill().productAndQuantity;
  }

  removeProductFromLastBill(product: Product, index: number) {
    const currentUser = JSON.parse(sessionStorage.getItem('currentuser')!);
    const users = this.getRegisteredUsers();
    const currentUserIndex = users.findIndex(
      (p: User) => p.username == currentUser.username
    );
    let len = users[currentUserIndex].purchaseHistoryCartArray.length;

    users[currentUserIndex].purchaseHistoryCartArray[len - 1].totalBill -=
      product.costPrice *
      users[currentUserIndex].purchaseHistoryCartArray[len - 1]
        .productAndQuantity[index].quantity;
    users[currentUserIndex].purchaseHistoryCartArray[
      len - 1
    ].productAndQuantity.splice(index, 1);
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }

  updateQuantityInLastCart(product: Product, index: number) {
    // var index = this.tempCart.productAndQuantity.findIndex((p) => p.product == product)!;
    // var currentProductAndQuantity= this.purchaseHistoryCartArray[index].productAndQuantity[index];
    // var updatedBill = currentProductAndQuantity.product.sellingPrice * currentProductAndQuantity.quantity;
    // currentProductAndQuantity.subtotal = updatedBill;
    // this.updateTotalBill();
  }

  returnInLastBill() {}
}
