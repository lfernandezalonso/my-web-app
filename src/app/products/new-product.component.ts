import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from './products.service';
import { MatSelectChange } from '@angular/material/select';
import { MatOption } from '@angular/material/core/option';
import { MatDialog } from '@angular/material/dialog';
import { Color } from '../colors/colors.models';
import { ColorsService } from '../colors/colors.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit, OnDestroy{
  selectedColorId: number;
  selectedColorText: string;

  colorsList: Color[] = [];

  colorsSubscription: Subscription;

  constructor(private productsService: ProductsService, private colorsService: ColorsService, private dialogRef: MatDialog) {
  }

  ngOnInit(): void {
    this.colorsService.getColorsList();
    this.colorsSubscription = this.colorsService.getCurrentListener()
      .subscribe( (colors: Color[]) => {
        console.log(colors);
        this.colorsList = colors;
        console.log(this.colorsList)
      });
  }

  colorSelected(event: MatSelectChange) {
    this.selectedColorText = (event.source.selected as MatOption).viewValue;
  }

  addNewProduct(form: NgForm)
  {
    if (form.valid) {
      const request = {
        id: 0,
        description: form.value.product_description,
        price: form.value.product_price,
        colorId: this.selectedColorId,
        color: null,
        imageSrc: form.value.product_imagesrc,
        productComposition: null,
        manufactureDate: null
      }

      this.productsService.addNewProduct(request).subscribe({
        next: (response) => {
          console.log('The product was successfully added', response);
          alert('The product was successfully added');
          this.dialogRef.closeAll();
        },
        error: (error) => {
          console.error('There was an error during the addition of the product', error);
          alert('There was an error during the addition of the product: ' + error);
        }
      });
    }
  }

  ngOnDestroy() {
    this.colorsSubscription.unsubscribe();
  }
}
