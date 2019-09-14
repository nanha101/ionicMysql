import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Camera } from '@ionic-native/camera';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { KnowledgePage } from '../pages/knowledge/knowledge';
import { NewsPage } from '../pages/news/news';
import { FarmPage } from '../pages/farm/farm';
import { MarketPage } from '../pages/market/market';
import { PostsPage } from '../pages/posts/posts';
import { SuggestionPage } from '../pages/suggestion/suggestion';
import { HomeFilterPage } from '../pages/home-filter/home-filter';
import { KnowledgeFilterPage } from '../pages/knowledge-filter/knowledge-filter';
import { NewsFilterPage } from '../pages/news-filter/news-filter';
import { FarmDetailsPage } from '../pages/farm-details/farm-details';
import { MarketFilterPage } from '../pages/market-filter/market-filter';
import { FarmOfMePage } from '../pages/farm-of-me/farm-of-me';
import { MarketDetailsPage } from '../pages/market-details/market-details';
import { MarketShowPhotoPage } from '../pages/market-show-photo/market-show-photo';
import { AuthServiceProvider } from '../providers/auth-service';
import { RegisterPage } from '../pages/register/register';
import { MarketFacePage } from '../pages/market-face/market-face';
import { MarketProductOfMePage } from '../pages/market-product-of-me/market-product-of-me';
import { KnowledgeAddPage } from '../pages/knowledge-add/knowledge-add';
import { Ng2ImgMaxModule } from 'ng2-img-max'; // Resize Image file
import { NewsDetailsPage } from '../pages/news-details/news-details';
import { NewsAddPage } from '../pages/news-add/news-add';
import { FarmAddPage } from '../pages/farm-add/farm-add';
import { MarketFilterOfMePage } from '../pages/market-filter-of-me/market-filter-of-me';
import { MarketAddPage } from '../pages/market-add/market-add';
import { PostFilterPage } from '../pages/post-filter/post-filter';
import { PostsDetailsPage } from '../pages/posts-details/posts-details';
import { UsersPage } from '../pages/users/users';
import { UsersDetailsPage } from '../pages/users-details/users-details';
import { KnowledgeDetailsPage } from '../pages/knowledge-details/knowledge-details';
import { PersonalDataPage } from '../pages/personal-data/personal-data';
import { PersonalChangePage } from '../pages/personal-change/personal-change';
import { NotificationPage } from '../pages/notification/notification';
import { ManageTypeDataPage } from '../pages/manage-type-data/manage-type-data';
import { AddDataTypePage } from '../pages/add-data-type/add-data-type';
import { PostsAddPage } from '../pages/posts-add/posts-add';
import { NotificationDetailsPage } from '../pages/notification-details/notification-details';
import { NotificationAddPage } from '../pages/notification-add/notification-add';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    KnowledgePage,
    NewsPage,
    FarmPage,
    FarmOfMePage,
    FarmAddPage,
    MarketPage,
    MarketDetailsPage,
    MarketFilterPage,
    MarketShowPhotoPage,
    MarketFilterOfMePage,
    MarketAddPage,
    PostsPage,
    PostsDetailsPage,
    PostFilterPage,
    SuggestionPage,
    HomeFilterPage,
    KnowledgeFilterPage,
    KnowledgeAddPage,
    KnowledgeDetailsPage,
    NewsFilterPage,
    FarmDetailsPage,
    RegisterPage,
    MarketFacePage,
    MarketProductOfMePage,
    NewsDetailsPage,
    NewsAddPage,
    UsersPage,
    UsersDetailsPage,
    PersonalDataPage,
    PersonalChangePage,
    NotificationPage,
    NotificationDetailsPage,
    NotificationAddPage,
    ManageTypeDataPage,
    AddDataTypePage,
    PostsAddPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),
    Ng2ImgMaxModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    KnowledgePage,
    NewsPage,
    FarmPage,
    FarmOfMePage,
    FarmAddPage,
    MarketPage,
    MarketDetailsPage,
    MarketFilterPage,
    MarketShowPhotoPage,
    MarketFilterOfMePage,
    MarketAddPage,
    PostsPage,
    PostsDetailsPage,
    PostFilterPage,
    SuggestionPage,
    HomeFilterPage,
    KnowledgeFilterPage,
    KnowledgeAddPage,
    KnowledgeDetailsPage,
    NewsFilterPage,
    FarmDetailsPage,
    RegisterPage,
    MarketFacePage,
    MarketProductOfMePage,
    NewsDetailsPage,
    NewsAddPage,
    UsersPage,
    UsersDetailsPage,
    PersonalDataPage,
    PersonalChangePage,
    NotificationPage,
    NotificationDetailsPage,
    NotificationAddPage,
    ManageTypeDataPage,
    AddDataTypePage,
    PostsAddPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthServiceProvider,
    Camera
  ]
})
export class AppModule { }
