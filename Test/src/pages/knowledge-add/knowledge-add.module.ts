import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KnowledgeAddPage } from './knowledge-add';

@NgModule({
  declarations: [
    KnowledgeAddPage,
  ],
  imports: [
    IonicPageModule.forChild(KnowledgeAddPage),
  ],
})
export class KnowledgeAddPageModule {}
