import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class CoinService {

  // private _coinsUrl = "http://localhost:3000/api/coins";
  private _coinsUrl = "https://ccgcdpvo25.execute-api.us-east-1.amazonaws.com/Armchair_Production/prices-bitcoin";
  // private _memberAltcoinsUrl = "http://localhost:3000/api/member-altcoins";
 private _memberAltcoinsUrl = "https://ccgcdpvo25.execute-api.us-east-1.amazonaws.com/Armchair_Production/prices-ethereum"; 

  constructor(private http: HttpClient) { }

  getCoins() {
    return this.http.get<any>(this._coinsUrl)
  }

  getMemberAltcoins() {
    return this.http.get<any>(this._memberAltcoinsUrl)
  }

}
