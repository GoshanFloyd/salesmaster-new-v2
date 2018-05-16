import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProductModel} from '../models/product.model';

@Injectable()
export class ProductService {

  private readonly baseProtocol = 'https://';
  private readonly baseURL = 'test.salesmaster.me/api/v1/';

  constructor (private _httpClient: HttpClient) {}

  public getProducts(obj?: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<ProductModel[]>(`${this.baseProtocol}${this.baseURL}products`, {
      params: obj ? obj : null,
      headers: header
    });
  }

  public getProduct(id: number) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<ProductModel[]>(`${this.baseProtocol}${this.baseURL}products/${id}`, {
      headers: header
    });
  }

  public createProduct(obj: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.post<ProductModel>(`${this.baseProtocol}${this.baseURL}products`, obj, {
      headers: header
    });
  }

  public updateProduct(id: number, obj: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.patch<any>(`${this.baseProtocol}${this.baseURL}products/${id}`, obj, {
      headers: header
    })
  }
}
