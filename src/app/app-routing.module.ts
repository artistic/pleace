import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { TournamentComponent } from './components/tournament/tournament.component';
import { AddTournamentComponent } from './components/add-tournament/add-tournament.component';

import { CoursesComponent } from './components/courses/courses.component';
import { CourseComponent } from './components/course/course.component';
import { AddCourseComponent } from './components/add-course/add-course.component';


import { PlayComponent } from './components/play/play.component';
import { CalculateComponent } from './components/calculate/calculate.component';

import { RankingsComponent } from './components/rankings/rankings.component';
import { SettingsComponent } from './components/settings/settings.component';

import { TermsComponent } from './components/terms/terms.component';
import { PrivacyComponent } from './components/privacy/privacy.component';


import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent, data: {title: 'Sign In'} },
  { path: 'sign-up', component: SignUpComponent, data: {title: 'Sign Up'} },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: {title: 'Dashboard'}},
  { path: 'forgot-password', component: ForgotPasswordComponent, data: {title: 'Forgot Password'} },
  { path: 'email-verification', component: VerifyEmailComponent, data: {title: 'Email Verification'} },
  { path: 'edit-user', component: EditUserComponent, data: {title: 'Edit User'} },

  { path: 'tournaments', component: TournamentsComponent, data: {title: 'Tournaments'} },
  { path: 'tournament', component: TournamentComponent, data: {title: 'Tournament'} },
  { path: 'add-tournament', component: AddTournamentComponent, data: {title: 'Add New Tournament'} },

  { path: 'courses', component: CoursesComponent, data: {title: 'Courses'} },
  { path: 'course', component: CourseComponent, data: {title: 'Course'} },
  { path: 'add-course', component: AddCourseComponent, data: {title: 'Add New Course'} },

  { path: 'play', component: PlayComponent, data: {title: 'Play Match'} },
  { path: 'calculate', component: CalculateComponent, data: {title: 'Golf Handicap Calculator'} },

  { path: 'rankings', component: RankingsComponent, data: {title: 'Rankings'} },
  { path: 'settings', component: SettingsComponent, data: {title: 'Settings'} },

  { path: 'terms', component: TermsComponent, data: {title: 'Terms And Conditions'} },
  { path: 'privacy', component: PrivacyComponent, data: {title: 'Privacy Policy'} },


  { path: '**', component: NoPageFoundComponent, data: {title: 'Page Error'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }

