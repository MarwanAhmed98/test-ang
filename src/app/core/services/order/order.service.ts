import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment';
import { jwtDecode } from "jwt-decode";
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OrderService{
  // myToken: any = localStorage.getItem('token')
  myToken: any;
  userData:any;
  userId:string=''
  DecodeData: any;
  constructor(private readonly httpClient: HttpClient ,  @Inject(PLATFORM_ID) private platformId: Object) { 
     if (isPlatformBrowser(this.platformId)) {
          this.myToken = localStorage.getItem('token');
        }
  }
  CheckoutSession(id:string, data:object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        "shippingAddress": data
      }
    )
  }
  getUsersOrders(id:string):Observable<any>{
     return this.httpClient.get(environment.baseUrl+`/api/v1/orders/user/${id}`)
  }
  getUsersData():void{
    this.userData=jwtDecode(localStorage.getItem('token')!)
    console.log(this.userData);
    this.userId=this.userData.id
    console.log(this.userId);
    
  }
}
