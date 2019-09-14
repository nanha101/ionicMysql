import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarketFacePage } from './market-face';

@NgModule({
  declarations: [
    MarketFacePage,
  ],
  imports: [
    IonicPageModule.forChild(MarketFacePage),
  ],
})
export class MarketFacePageModule {}
