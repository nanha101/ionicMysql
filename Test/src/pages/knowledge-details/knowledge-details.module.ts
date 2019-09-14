import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KnowledgeDetailsPage } from './knowledge-details';

@NgModule({
  declarations: [
    KnowledgeDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(KnowledgeDetailsPage),
  ],
})
export class KnowledgeDetailsPageModule {}
