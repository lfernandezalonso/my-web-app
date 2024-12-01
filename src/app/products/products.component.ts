import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { ProductsService } from './products.service';
import { Product } from './products.model';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NewProductComponent } from './new-product.component';
import { Subscription } from 'rxjs';
import { ProductsPagination } from './products-pagination.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, AfterViewInit
{
  desplegarColumnas: string[] = ['imageSrc','id', 'description', 'price', 'color', 'actions'];
  dataSource = new MatTableDataSource<Product>();
  @ViewChild(MatSort) myProductSorting: MatSort;
  @ViewChild(MatPaginator) myProductPaginator: MatPaginator;

  public pageCombo: number[] = [5, 10, 20];

  private productsSubscription: Subscription;

  productsPag: ProductsPagination = {
    totalRows: 0, pageSize: 5, pageNumber: 1, sortField: 'description', sortDirection: 1, filterField: '', filterValue: ''
  }

  public dialogRef: MatDialogRef<NewProductComponent, any>

  timeout: any;

  constructor(private productsService: ProductsService, private dialog: MatDialog) {
  }

  eventPaginator(event: PageEvent):void {
    this.productsPag.pageSize = event.pageSize;
    this.productsPag.pageNumber = event.pageIndex + 1;
    this.productsService.getProductsListWithPag(this.productsPag);
  }

  ngOnInit(): void {
      this.productsService.getProductsListWithPag(this.productsPag);
      this.productsSubscription = this.productsService
        .getCurrentPagListener()
        .subscribe( (pagination: ProductsPagination) => {
          console.log(pagination);
          this.dataSource = new MatTableDataSource<Product>(pagination.data);
          this.productsPag.totalRows = pagination.totalRows
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.myProductSorting;
    this.dataSource.paginator = this.myProductPaginator;
  }

  applyFilter(event:any): void {
    clearTimeout(this.timeout);
    const $this = this;

    this.timeout = setTimeout( () => {
      if(event.keyCode != 13) {
        $this.productsPag.filterField = 'Title';
        $this.productsPag.filterValue = event.target.value;
        $this.productsService.getProductsListWithPag($this.productsPag);
      }
    }, 1000)
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(NewProductComponent, { width: '550px' });

    this.dialogRef.afterClosed()
      .subscribe( () => {
        this.productsService.getProductsListWithPag(this.productsPag);
      });
  }

  exportList() {
  }

  editProduct(id:string) {
    alert(id);
  }

  deleteProduct(id:string): void {
     this.productsService.deleteProduct(id).subscribe({
      next: (response) => {
        alert('Producto eliminado con éxito');
        console.log('Producto eliminado con éxito', response);
        this.productsService.getProductsListWithPag(this.productsPag);
      },
      error: (error) => {
        alert('Hubo un error al eliminar el producto ' + error);
        console.error('Hubo un error al eliminar el producto', error);
      }
    });
  }

  SortRowsByColum(event): void
  {
    let strTemp: string = event.active.toString().trim();
    strTemp = strTemp.slice(0,1).toUpperCase() + strTemp.slice(1);
    this.productsPag.sortField = strTemp;
    this.productsPag.sortDirection = ((event.direction.toString().trim() == "asc") ? 1 : -1);
    this.productsService.getProductsListWithPag(this.productsPag);
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }
}
