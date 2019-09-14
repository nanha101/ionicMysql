import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsAddPage } from './news-add';

@NgModule({
  declarations: [
    NewsAddPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsAddPage),
  ],
})
export class NewsAddPageModule {}
