import { Injectable } from '@angular/core';
import { Color } from './colors.models';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ColorsPagination } from './colors-pagination.model';

@Injectable({
  providedIn: 'root'
})
export class ColorsService
{
  private colorsList: Color[] = null;

  colorsPagination: ColorsPagination;
  private colorsSubject = new Subject<Color[]>();
  colorPaginationSubject = new Subject<ColorsPagination>();

  constructor(private httpClient: HttpClient) {
  }

  getColorsList() {
    this.httpClient.get<Color[]>('api/Colors') //this.baseUrl +
      .subscribe( (data) =>  {
        this.colorsList = data;
        this.colorsSubject.next([...this.colorsList])
      });
  }

  getColorsListWithPag(colorsPag: ColorsPagination) {
    let params = new HttpParams()
      .set('PageSize', colorsPag.pageSize.toString())
      .set('PageNumber', colorsPag.pageNumber.toString())
      .set('SortField', colorsPag.sortField.toString())
      .set('SortDirection', colorsPag.sortDirection.toString())
      .set('FilterCond.FilterField', colorsPag.filterField)
      .set('FilterCond.FilterValue', colorsPag.filterValue);

    console.log(params);
    this.httpClient.get<ColorsPagination>('api/Colors/GetWithPagination', {params})
    .subscribe( (response) =>  {
      console.log(response);
      this.colorsPagination = response;
      this.colorPaginationSubject.next(this.colorsPagination)
    });
  }

  getCurrentListener() {
    return this.colorsSubject.asObservable();
  }

  getCurrentPagListener() {
    return this.colorPaginationSubject.asObservable();
  }

  addNewColor(newColor: Color): Observable<any> {
    return this.httpClient.post('api/Colors', newColor)
  }

  updateColor(updColor: Color): Observable<any> {
    return this.httpClient.put('api/Colors/' + updColor.id, updColor)
  }

  deleteColor(id: string): Observable<any> {
    return this.httpClient.delete('api/Colors/' + id);
  }

}
