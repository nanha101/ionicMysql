import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsFilterPage } from './news-filter';

@NgModule({
  declarations: [
    NewsFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsFilterPage),
  ],
})
export class NewsFilterPageModule {}
