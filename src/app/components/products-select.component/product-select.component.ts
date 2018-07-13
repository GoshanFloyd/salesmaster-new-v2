import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserRepository} from '../../repositories/user.repository';
import {UserModel} from '../../models/user.model';
import {ProductBrandService} from '../../services/product.brand.service';
import {IProductBrandCreate, ProductBrandModel} from '../../models/product-brand.model';
import {ProductService} from '../../services/product.service';
import {ProductModel} from '../../models/product.model';
import {Observable} from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  templateUrl: './product-select.component.html',
  selector: 'app-product-select'
})

export class ProductSelectComponent implements OnInit {

  @Output() public onSelectProduct = new EventEmitter<ProductModel>();

  public brandsList: Array<ProductBrandModel> = [];

  private _productsList: Array<ProductModel> = [];

  public currentProduct: ProductModel = null;

  public searchString: string;
  public currentBrand: ProductBrandModel;
  public company_filter: number = this.user.getDefaultCompany().id;

  constructor(private _userRepository: UserRepository,
              private _productBrandService: ProductBrandService,
              private _productService: ProductService) {
  }

  get user(): UserModel {
    return this._userRepository.getMyUser();
  }

  get productsList(): Array<ProductModel> {

    let arr: Array<ProductModel> = this._productsList;

    if (this.searchString) {
      arr = arr.filter(x => x.title.toLocaleLowerCase().indexOf(this.searchString.toLocaleLowerCase()) > -1);
    }

    return arr;
  }

  ngOnInit() {
    this.getBrands().subscribe(
      data => {
        this.currentBrand = data[0];
        this.getProducts();
      }
    );
  }

  public getBrands() {
    return Observable.create(observer => {
      this._productBrandService.getBrands().subscribe(
        data => {
          this.brandsList = ProductBrandModel.fromArray(data as Array<IProductBrandCreate>);
          observer.next(this.brandsList);
        },
        err => {
          console.log(err);
          observer.error(err);
        },
        () => observer.complete()
      );
    });
  }

  public changeCompany(): void {
    this.getProducts();
  }

  public changeBrand(): void {
    this.getProducts();
  }

  public getProducts(): void {
    this.currentProduct = null;
    this._productService.getProducts({
      'company_id': this.company_filter,
      'brand_id': this.currentBrand.id,
      'is_has_parents': false
    }).subscribe(
      data => {
        this._productsList = ProductModel.fromArray(data);
      },
      err => console.log(err)
    );
  }

  public setCurrentProduct(product: ProductModel) {
    this.currentProduct = product;
    this.emitProduct(this.currentProduct);
  }

  public emitProduct(p: ProductModel) {
    this.onSelectProduct.emit(p);
  }
}
