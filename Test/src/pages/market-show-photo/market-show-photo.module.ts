import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarketShowPhotoPage } from './market-show-photo';

@NgModule({
  declarations: [
    MarketShowPhotoPage,
  ],
  imports: [
    IonicPageModule.forChild(MarketShowPhotoPage),
  ],
})
export class MarketShowPhotoPageModule {}
