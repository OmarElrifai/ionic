import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipesDetailsPageRoutingModule } from './recipes-details-routing.module';

import { RecipesDetailsPage } from './recipes-details.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipesDetailsPageRoutingModule,
    SharedModule
  ],
  declarations: [RecipesDetailsPage]
})
export class RecipesDetailsPageModule {}
