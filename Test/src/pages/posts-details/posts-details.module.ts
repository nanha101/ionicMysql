import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostsDetailsPage } from './posts-details';

@NgModule({
  declarations: [
    PostsDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PostsDetailsPage),
  ],
})
export class PostsDetailsPageModule {}
