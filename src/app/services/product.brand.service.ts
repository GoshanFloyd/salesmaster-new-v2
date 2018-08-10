import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProductBrandModel} from '../models/product-brand.model';
import {UrlSettings} from '../classes/urlSettings';

@Injectable()
export class ProductBrandService {

  constructor (private _httpClient: HttpClient) {}

  public getBrands(obj?: any) {
    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<ProductBrandModel[]>(`${UrlSettings.getBackendUrl()}product_brands`, {
      params: obj ? obj : null,
      headers: header
    });
  }
}


