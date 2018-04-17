import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivityModel} from '../models/activity.model';
import {ProductModel} from '../models/product.model';

@Injectable()
export class ProductService {

  private readonly baseProtocol = 'https://';
  private readonly baseURL = 'test.salesmaster.me/api/v1/';
  private header = new HttpHeaders({
    'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
  });

  constructor (private _httpClient: HttpClient) {}

  public getProducts(obj?: any) {
    return this._httpClient.get<ProductModel[]>(`${this.baseProtocol}${this.baseURL}products`, {
      params: obj ? obj : null,
      headers: this.header
    });
  }

  public getProduct(id: number) {
    return this._httpClient.get<ProductModel[]>(`${this.baseProtocol}${this.baseURL}products/${id}`, {
      headers: this.header
    });
  }

  public createProduct(obj: any) {
    return this._httpClient.post<ProductModel>(`${this.baseProtocol}${this.baseURL}products`, obj, {
      headers: this.header
    });
  }

  public updateProduct(id: number, obj: any) {
    return this._httpClient.patch<any>(`${this.baseProtocol}${this.baseURL}products/${id}`, obj, {
      headers: this.header
    })
  }
}
