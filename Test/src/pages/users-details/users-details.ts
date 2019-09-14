import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service';

/**
 * Generated class for the UsersDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users-details',
  templateUrl: 'users-details.html',
})
export class UsersDetailsPage {
  Detail_Data: any;
  Path_Image: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
  ) {

    this.Path_Image = this.authService.Get_Path_Image();
    this.Set_Data();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersDetailsPage');
  }
  Set_Data() {
    this.Detail_Data = this.navParams.get('items').item;
  }

}
