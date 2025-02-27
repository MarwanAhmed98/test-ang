import { Component, inject, OnInit } from '@angular/core';
import { ICartService } from '../../core/services/ICart/icart.service';
import { ICart } from '../../shared/interfaces/icart';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../core/services/order/order.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [SweetAlert2Module, RouterLink, TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  CartDetails: ICart = {} as ICart
  private readonly iCartService = inject(ICartService);
  private readonly orderService = inject(OrderService);


  ngOnInit(): void {
    this.GetUserData()
    this.orderService.getUsersData()
    this.orderService.userId
    this.yarabba2()
  }
  GetUserData(): void {
    this.iCartService.GetLoggedData().subscribe({
      next: (res) => {
        console.log(res.data);
        console.log(res.data.cartOwner);
        this.CartDetails = res.data;
      }
    })
  }
  RemoveItem(id: string): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.iCartService.RemoveCartItem(id).subscribe({
          next: (res) => {
            console.log(res);
            this.CartDetails = res.data;
            this.iCartService.cartNumber.set(res.numOfCartItems)
            Swal.fire({
              title: "Deleted!",
              text: "Your Product has been deleted.",
              icon: "success"
            });
          }
        });
      }
    });
  }

  UpdateItem(id: string, count: number): void {
    this.iCartService.UpdateCartItem(id, count).subscribe({
      next: (res) => {
        console.log(res.data);
        this.CartDetails = res.data;
      }
    })
  }
  Clear(): void {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to clear your Cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Clear it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.iCartService.ClearCart().subscribe({
          next: (res) => {
            console.log(res);
            this.CartDetails = {} as ICart;
            this.iCartService.cartNumber.set(0)
            Swal.fire({
              title: "Cleared!",
              text: "Your Cart has been cleared.",
              icon: "success"
            });
          }
        });
      }
    });
  }
  yarabba2():void{
    this.orderService.getUsersOrders(this.orderService.userId).subscribe({
      next:(res)=>{
        console.log(res);
        
      }
    })
  }
}
