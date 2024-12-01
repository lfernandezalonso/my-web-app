import { Injectable } from '@angular/core';
import { Product } from './products.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductsPagination } from './products-pagination.model';

@Injectable({
    providedIn: 'root'
})
export class ProductsService
{
  productsPagination: ProductsPagination;
  productPaginationSubject = new Subject<ProductsPagination>();

  constructor(private httpClient: HttpClient) {
  }

  getProductsListWithPag(productsPag: ProductsPagination) {
    let params = new HttpParams()
      .set('PageSize', productsPag.pageSize.toString())
      .set('PageNumber', productsPag.pageNumber.toString())
      .set('SortField', productsPag.sortField.toString())
      .set('SortDirection', productsPag.sortDirection.toString())
      .set('FilterCond.FilterField', productsPag.filterField)
      .set('FilterCond.FilterValue', productsPag.filterValue);

    console.log(params);
    this.httpClient.get<ProductsPagination>('api/Products/GetWithPagination', {params})
    .subscribe( (response) =>  {
      console.log(response);
      this.productsPagination = response;
      this.productPaginationSubject.next(this.productsPagination)
    });
  }

  getCurrentPagListener() {
    return this.productPaginationSubject.asObservable();
  }

  addNewProduct(newProduct: Product): Observable<any> {
    return this.httpClient.post('api/Products', newProduct)
  }

  updateProduct(updProduct: Product): Observable<any> {
    return this.httpClient.put('api/Products/' + updProduct.id, updProduct)
  }

  deleteProduct(id: string): Observable<any> {
     return this.httpClient.delete('api/Products/' + id);
  }

}
