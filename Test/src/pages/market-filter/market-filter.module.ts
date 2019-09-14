import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarketFilterPage } from './market-filter';

@NgModule({
  declarations: [
    MarketFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(MarketFilterPage),
  ],
})
export class MarketFilterPageModule {}
