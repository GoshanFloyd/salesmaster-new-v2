import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProductModel} from '../models/product.model';
import {UrlSettings} from '../classes/urlSettings';

@Injectable()
export class ProductService {

  constructor (private _httpClient: HttpClient) {}

  public getProducts(obj?: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<ProductModel[]>(`${UrlSettings.getBackendUrl()}products`, {
      params: obj ? obj : null,
      headers: header
    });
  }

  public getProduct(id: number) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<ProductModel[]>(`${UrlSettings.getBackendUrl()}products/${id}`, {
      headers: header
    });
  }

  public createProduct(obj: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.post<ProductModel>(`${UrlSettings.getBackendUrl()}products`, obj, {
      headers: header
    });
  }

  public updateProduct(id: number, obj: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.patch<any>(`${UrlSettings.getBackendUrl()}products/${id}`, obj, {
      headers: header
    })
  }
}
