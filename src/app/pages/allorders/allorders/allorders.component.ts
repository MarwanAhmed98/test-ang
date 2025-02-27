import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../core/services/order/order.service';
import { IOrders } from '../../../shared/interfaces/iorders';
import { ICartService } from '../../../core/services/ICart/icart.service';



@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit  {
  private readonly orderService = inject(OrderService)
  private readonly iCartService = inject(ICartService)

  MyCart:any=[]
  cartItems: any[] = [];
  ngOnInit(): void {
    this.orderService.getUsersData()
    this.orderService.userId
    this.yarabba2()
  }
  // yarabba2(): void {
  //   this.orderService.getUsersOrders(this.orderService.userId).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.MyCart = res;
  //       if (Array.isArray(this.MyCart) && this.MyCart.length > 0) {
  //         this.cartItems = this.MyCart[0]?.cartItems || [];
  //       } else {
  //         this.cartItems = [];
  //       }
  //       console.log(this.cartItems);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   });
  // }
  yarabba2():void{
    this.orderService.getUsersOrders(this.orderService.userId).subscribe({
      next:(res)=>{
        console.log(res);
        this.MyCart=res
        
      }
    })
  }
  
}
