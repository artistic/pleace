import { BrowserModule , Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';


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
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { AddTournamentComponent } from './components/add-tournament/add-tournament.component';
import { TournamentComponent } from './components/tournament/tournament.component';
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';
import { CourseComponent } from './components/course/course.component';
import { CoursesComponent } from './components/courses/courses.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { RankingsComponent } from './components/rankings/rankings.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { TermsComponent } from './components/terms/terms.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { PlayComponent } from './components/play/play.component';
import { CalculateComponent } from './components/calculate/calculate.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    TournamentsComponent,
    AddTournamentComponent,
    TournamentComponent,
    NoPageFoundComponent,
    CourseComponent,
    CoursesComponent,
    AddCourseComponent,
    RankingsComponent,
    SettingsComponent,
    UserDetailsComponent,
    EditUserComponent,
    TermsComponent,
    PrivacyComponent,
    PlayComponent,
    CalculateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule    
  ],
  providers: [
  Title,
  NgAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
