import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarketFilterOfMePage } from './market-filter-of-me';

@NgModule({
  declarations: [
    MarketFilterOfMePage,
  ],
  imports: [
    IonicPageModule.forChild(MarketFilterOfMePage),
  ],
})
export class MarketFilterOfMePageModule {}
