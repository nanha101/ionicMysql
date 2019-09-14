import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service';

import { OnInit, Input } from '@angular/core'; //for safe URL
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; //for safe URL
/**
 * Generated class for the KnowledgeDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-knowledge-details',
  templateUrl: 'knowledge-details.html',
})
export class KnowledgeDetailsPage {
  Path_Image: string;
  Detail_Data: any = {};
  Response_Image: any;
  url: string = "https://www.youtube.com/embed/rtQOAEkniPg";
  urlSafe: SafeResourceUrl;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public sanitizer: DomSanitizer //for safe url
  ) {

    this.Path_Image = this.authService.Get_Path_Image();
    this.Set_Data();
  }
  Get_SafeUrl(item) {
    console.log("item = ",item);
    return this.sanitizer.bypassSecurityTrustResourceUrl(item.Know_Video_Link);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad KnowledgeDetailsPage');
  }
  Set_Data() {
    this.Detail_Data = this.navParams.get('items').item;
    this.Response_Image = this.navParams.get('items').Image;
    // console.log(this.Response_Image[0])
  }

}
