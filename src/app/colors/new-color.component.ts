import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { ColorsService } from './colors.service';
import { MatSelectChange } from '@angular/material/select';
import { MatOption } from '@angular/material/core/option';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-color',
  templateUrl: './new-color.component.html',
  styleUrls: ['./new-color.component.css']
})
export class NewColorComponent { // implements OnInit, OnDestroy

  constructor(private colorsService: ColorsService, private dialogRef: MatDialog) {
  }

  addNewColor(form: NgForm)
  {
    if (form.valid) {
      const request = {
        id: 0,
		name: form.value.color_name,
        hexCode: form.value.color_hexCode
      }

      this.colorsService.addNewColor(request).subscribe({
        next: (response) => {
          console.log('The color was added successfully', response);
          alert('The color was added successfully');
          this.dialogRef.closeAll();
        },
        error: (error) => {
          console.error('There was an error during the addition of the color', error);
          alert('There was an error during the addition of the color: ' + error);
        }
      });
    }
  }

}
