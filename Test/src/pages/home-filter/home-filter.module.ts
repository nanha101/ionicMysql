import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeFilterPage } from './home-filter';

@NgModule({
  declarations: [
    HomeFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeFilterPage),
  ],
})
export class HomeFilterPageModule {}
