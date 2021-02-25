import { BrowserModule , Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { AgmCoreModule } from '@agm/core';


import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

import { NgAuthService } from "./ng-auth.service";

import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';



import { RankingsComponent } from './components/rankings/rankings.component';
import { SettingsComponent } from './components/settings/settings.component';

import { EditUserComponent } from './components/edit-user/edit-user.component';
import { TermsComponent } from './components/terms/terms.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { PlayComponent } from './components/play/play.component';
import { CalculateComponent } from './components/calculate/calculate.component';
import { ClubsComponent } from './components/clubs/clubs.component';
import { ClubComponent } from './components/club/club.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseComponent } from './components/course/course.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { TournamentComponent } from './components/tournament/tournament.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { HelpComponent } from './components/help/help.component';
import { InviteComponent } from './components/invite/invite.component';
import { UserComponent } from './components/user/user.component';
import { AddTournamentComponent } from './components/add-tournament/add-tournament.component';
import { ScoreCardComponent } from './components/score-card/score-card.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    NoPageFoundComponent,
    RankingsComponent,
    SettingsComponent,
    EditUserComponent,
    TermsComponent,
    PrivacyComponent,
    PlayComponent,
    CalculateComponent,
    ClubsComponent,
    ClubComponent,
    CoursesComponent,
    CourseComponent,
    TournamentsComponent,
    TournamentComponent,
    ScoreboardComponent,
    HelpComponent,
    InviteComponent,
    UserComponent,
    AddTournamentComponent,
    ScoreCardComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAthlI_rqLxmFhgg0bIJ_kRXqKomJEj_vA'
    })
  ],
  providers: [
  Title,
  NgAuthService,
  {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }