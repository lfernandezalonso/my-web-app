import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { ColorsService } from './colors.service';
import { Color } from './colors.models';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NewColorComponent } from './new-color.component';
import { Subscription } from 'rxjs';
import { ColorsPagination } from './colors-pagination.model';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css']
})
export class ColorsComponent implements OnInit, AfterViewInit, OnDestroy
{
  desplegarColumnas: string[] = ['id', 'name', 'hexCode', 'actions'];
  dataSource = new MatTableDataSource<Color>();
  @ViewChild(MatSort) myColorsorting: MatSort;
  @ViewChild(MatPaginator) myColorPaginator: MatPaginator;

  public pageCombo: number[] = [5, 10, 20];

  private colorsSubscription: Subscription;

  colorsPag: ColorsPagination = {
    pageSize: 10, pageNumber: 1, sortField: 'Name', sortDirection: 1, filterField: '', filterValue: '',
  }

  public dialogRef: MatDialogRef<NewColorComponent, any>

  timeout: any;

  constructor(private colorsService: ColorsService, private dialog: MatDialog) {
  }

  eventPaginator(event: PageEvent):void {
    this.colorsPag.pageSize = event.pageSize;
    this.colorsPag.pageNumber = event.pageIndex + 1;
    this.colorsService.getColorsListWithPag(this.colorsPag);
  }

  ngOnInit(): void {
    this.colorsService.getColorsListWithPag(this.colorsPag);
    this.colorsSubscription = this.colorsService
      .getCurrentPagListener()
      .subscribe( (pagination: ColorsPagination) => {
        console.log(pagination);
        this.dataSource = new MatTableDataSource<Color>(pagination.data);
        this.colorsPag.totalRows = pagination.totalRows
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.myColorsorting;
    this.dataSource.paginator = this.myColorPaginator;
  }

  applyFilter(event:any): void {
    clearTimeout(this.timeout);
    const $this = this;

    this.timeout = setTimeout( () => {
      if(event.keyCode != 13) {
        $this.colorsPag.filterField = 'Name';
        $this.colorsPag.filterValue = event.target.value;
        $this.colorsService.getColorsListWithPag($this.colorsPag);
      }
    }, 1000)
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(NewColorComponent, { width: '350px' });

    this.dialogRef.afterClosed()
    .subscribe( () => {
      this.colorsService.getColorsListWithPag(this.colorsPag);
    });
  }

  exportList() {
  }

  editColor(id:string) {
    alert(id);
  }

  deleteColor(id:string): void {
    this.colorsService.deleteColor(id).subscribe({
      next: (response) => {
        alert('The color has been successfully deleted');
        console.log('The color has been successfully deleted', response);
        this.colorsService.getColorsListWithPag(this.colorsPag);
      },
      error: (error) => {
        alert('There was an error during the addition of the color: ' + error);
        console.error('There was an error during the addition of the color: ', error);
      }
    });
  }

  SortRowsByColum(event): void
  {
    let strTemp: string = event.active.toString().trim();
    strTemp = strTemp.slice(0,1).toUpperCase() + strTemp.slice(1);
    this.colorsPag.sortField = strTemp;
    this.colorsPag.sortDirection = ((event.direction.toString().trim() == "asc") ? 1 : -1);
    this.colorsService.getColorsListWithPag(this.colorsPag);
  }

  ngOnDestroy() {
    this.colorsSubscription.unsubscribe();
  }
}
