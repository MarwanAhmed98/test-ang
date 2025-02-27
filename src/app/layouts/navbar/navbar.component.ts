
import { Component, computed, inject, input, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Translate2Service } from '../../core/services/translate2.service';
import { ICartService } from '../../core/services/ICart/icart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  readonly authService = inject(AuthService);
  private readonly translate2Service = inject(Translate2Service);
  private readonly translateService = inject(TranslateService);
  private readonly iCartService = inject(ICartService);

  counterNumber:Signal<number>=computed(  ()=>this.iCartService.cartNumber() );

  ngOnInit(): void {
    this.iCartService.GetLoggedData().subscribe({
      next:(res)=>{
        this.iCartService.cartNumber.set(res.numOfCartItems)
      }
    })
  }
  isLogin = input<boolean>(true)

  Change(lang:string):void{
    this.translate2Service.changeLang(lang)
  }
  currentLang(lang:string):boolean{
    return this.translateService.currentLang===lang
  }

}
