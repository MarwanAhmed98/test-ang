import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../shared/environment';

@Injectable({
  providedIn: 'root'
})
export class ICartService {
  myToken: any = localStorage.getItem('token')
  constructor(private readonly httpClient: HttpClient) {}
  cartNumber:WritableSignal<number>=signal(0)
  AddProductToCart(id: string): Observable<any> {
    return this.httpClient.post(environment.baseUrl+'/api/v1/cart',
      {
        "productId": id
      }
    )
  }
  GetLoggedData(): Observable<any> {
    return this.httpClient.get(environment.baseUrl+'/api/v1/cart'
    )
  }
  RemoveCartItem(id: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl+`/api/v1/cart/${id}`
    )
  }
  UpdateCartItem(id:string,newCount:number): Observable<any> {
    return this.httpClient.put(environment.baseUrl+`/api/v1/cart/${id}`,
      {
        "count": newCount
      }
    )
  }
  ClearCart():Observable<any>{
    return this.httpClient.delete(environment.baseUrl+'/api/v1/cart'
    )
  }
}
