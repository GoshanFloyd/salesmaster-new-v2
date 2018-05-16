import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProductBrandModel} from '../models/product-brand.model';

@Injectable()
export class ProductBrandService {

  private readonly baseProtocol = 'https://';
  private readonly baseURL = 'test.salesmaster.me/api/v1/';

  constructor (private _httpClient: HttpClient) {}

  public getBrands(obj?: any) {
    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<ProductBrandModel[]>(`${this.baseProtocol}${this.baseURL}product_brands`, {
      params: obj ? obj : null,
      headers: header
    });
  }
}


