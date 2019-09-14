import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddDataTypePage } from './add-data-type';

@NgModule({
  declarations: [
    AddDataTypePage,
  ],
  imports: [
    IonicPageModule.forChild(AddDataTypePage),
  ],
})
export class AddDataTypePageModule {}
