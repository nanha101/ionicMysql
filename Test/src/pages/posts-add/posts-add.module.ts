import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostsAddPage } from './posts-add';

@NgModule({
  declarations: [
    PostsAddPage,
  ],
  imports: [
    IonicPageModule.forChild(PostsAddPage),
  ],
})
export class PostsAddPageModule {}
