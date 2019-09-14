import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalChangePage } from './personal-change';

@NgModule({
  declarations: [
    PersonalChangePage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalChangePage),
  ],
})
export class PersonalChangePageModule {}
