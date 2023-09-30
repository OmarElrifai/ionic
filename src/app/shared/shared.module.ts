import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationPickerComponent } from './pickers/location-picker/location-picker.component';
import { MapModalComponent } from './pickers/map-modal/map-modal.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MapModalComponent
  }
];
@NgModule({
  declarations: [LocationPickerComponent,MapModalComponent],
  exports:[LocationPickerComponent,MapModalComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
