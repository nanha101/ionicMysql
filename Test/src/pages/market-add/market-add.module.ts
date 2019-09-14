import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarketAddPage } from './market-add';

@NgModule({
  declarations: [
    MarketAddPage,
  ],
  imports: [
    IonicPageModule.forChild(MarketAddPage),
  ],
})
export class MarketAddPageModule {}
