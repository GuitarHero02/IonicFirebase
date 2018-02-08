import { BuddiesPage } from './../pages/buddies/buddies';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Facebook } from '@ionic-native/facebook';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser';


import { IonicStorageModule } from '@ionic/storage';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';

import { FIREBASE_CONFIG } from '../config/app.firebase.config';
import * as firebase from 'firebase';


import { ConferenceApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { BuddiesPage } from '../pages/buddies/buddies';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';
import { SpeakerDetailPage } from '../pages/speaker-detail/speaker-detail';
import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';
import { ChatsPage } from '../pages/chats/chats';
import { GroupsPage } from '../pages/groups/groups';
import { ProfilePage } from '../pages/profile/profile';
import { PasswordResetPage } from '../pages/password-reset/password-reset';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { AuthProvider } from '../providers/auth';
import { ImagehandlerProvider } from '../providers/imagehandler/imagehandler';
import { RequestProvider } from '../providers/request/request';

firebase.initializeApp(FIREBASE_CONFIG);

@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    ChatsPage,
    GroupsPage,
    ProfilePage,
    PasswordResetPage,
    BuddiesPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    IonicModule.forRoot(ConferenceApp, {tabsPlacement: 'top'}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs-page' },
        { component: SchedulePage, name: 'Schedule', segment: 'schedule' },
        { component: SessionDetailPage, name: 'SessionDetail', segment: 'sessionDetail/:sessionId' },
        { component: ScheduleFilterPage, name: 'ScheduleFilter', segment: 'scheduleFilter' },
        { component: SpeakerListPage, name: 'SpeakerList', segment: 'speakerList' },
        { component: SpeakerDetailPage, name: 'SpeakerDetail', segment: 'speakerDetail/:speakerId' },
        { component: MapPage, name: 'Map', segment: 'map' },
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
        { component: SupportPage, name: 'SupportPage', segment: 'support' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' },
        { component: ChatsPage, name: 'Chats', segment: 'chat' },
        { component: GroupsPage, name: 'GroupsPage', segment: 'groups' },
        { component: ProfilePage, name: 'ProfilePage', segment: 'profile' },
        { component: PasswordResetPage, name: 'PasswordResetPage', segment: 'password-reset' },
        { component: BuddiesPage, name: 'BuddiesPage', segment: 'buddies' }
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    ChatsPage,
    GroupsPage,
    ProfilePage,
    PasswordResetPage,
    BuddiesPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
    InAppBrowser,
    SplashScreen,
    AuthProvider,
    StatusBar,
    Facebook,
    File,
    FilePath,
    FileChooser,
    ImagehandlerProvider,
    RequestProvider
  ]
})
export class AppModule { }
