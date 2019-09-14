import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmDetailsPage } from './farm-details';

@NgModule({
  declarations: [
    FarmDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(FarmDetailsPage),
  ],
})
export class FarmDetailsPageModule {}
