import { Injectable } from '@angular/core';

import { Http } from "@angular/http";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the LoadDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadDataProvider {

  constructor(private http: Http) {
  }

  getDataFromJSON(path : string) {
    return this.http.get(path).map((res: any) => res.json());
  }


}
