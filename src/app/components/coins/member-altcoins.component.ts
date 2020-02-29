import { Component, OnInit } from '@angular/core';
import { CoinService } from '../../services/coin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'


@Component({
  selector: 'tm-member-altcoins',
  template: `
<div class="row mt-5">
  <div class="col-md-4 mb-3" *ngFor="let coin of memberAltcoins">
    <div class="card text-center">
      <div class="card-body">
        <h5 class="card-title">{{coin.Symbol}}</h5>
        <!-- <p class="card-text">Volume BTC: {{coin.'Volume BTC'}}</p> -->
        <p class="card-text">Open: {{coin.Open}}</p>
        <p class="card-text">Close: {{coin.Close}}</p>
      <a href="#" class="btn btn-primary">Statistics</a>
      </div>
      <div class="card-footer text-muted">
        {{coin.Date }}
         <!-- | date:'shortDate'}} -->
      </div>
    </div>
  </div>
</div>

  `,
  styles: []
})
export class MemberAltcoinsComponent implements OnInit {
  memberAltcoins = []
  constructor(private _coinService: CoinService, private _router: Router) { }



  ngOnInit() {
    this._coinService.getMemberAltcoins()
      .subscribe(
        res => this.memberAltcoins = res,
        err => {
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )
  }

}
