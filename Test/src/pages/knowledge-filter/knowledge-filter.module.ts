import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KnowledgeFilterPage } from './knowledge-filter';

@NgModule({
  declarations: [
    KnowledgeFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(KnowledgeFilterPage),
  ],
})
export class KnowledgeFilterPageModule {}
