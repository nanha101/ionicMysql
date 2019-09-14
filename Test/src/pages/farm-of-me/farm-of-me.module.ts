import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmOfMePage } from './farm-of-me';

@NgModule({
  declarations: [
    FarmOfMePage,
  ],
  imports: [
    IonicPageModule.forChild(FarmOfMePage),
  ],
})
export class FarmOfMePageModule {}
