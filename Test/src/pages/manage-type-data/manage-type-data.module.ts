import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageTypeDataPage } from './manage-type-data';

@NgModule({
  declarations: [
    ManageTypeDataPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageTypeDataPage),
  ],
})
export class ManageTypeDataPageModule {}
