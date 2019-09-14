import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmAddPage } from './farm-add';

@NgModule({
  declarations: [
    FarmAddPage,
  ],
  imports: [
    IonicPageModule.forChild(FarmAddPage),
  ],
})
export class FarmAddPageModule {}
