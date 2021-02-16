import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import Tournament from 'src/app/models/tournament.model';
import { TournamentsService } from 'src/app/services/tournaments.service';
import { NgAuthService } from "../../ng-auth.service";
import User from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import auth  from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit, OnChanges {

	@Input() tournament?: Tournament;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentTournament: Tournament = {
    title: '',
    description: '',
    published: false
  };
  message = '';

  uid: any;
  submitted = false;

  public editForm: FormGroup;
  userState: any;
  userRef: any;
  courseRef: any;
  courseId: any;
  courseAddress: any;
  crrntUsr: any;
  userEmail: any;

  firstrun : any;

  constructor(
    private tournamentsService: TournamentsService,
    private firestore: AngularFirestore,
    public ngAuthService: NgAuthService,
    private usersService: UsersService,
    public formBuilder: FormBuilder,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,

    ) { 
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userState = user;
        localStorage.setItem('user', JSON.stringify(this.userState));
        JSON.parse(localStorage.getItem('user'));
        this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));

      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });

    this.editForm = this.formBuilder.group({
      firstname: [''],
      surname: [''],
      gender: [''],
      nationality:[''],
      accountType: [''],
      homeClub: [''],
      handicap: [''],
      residence: [''],
    })
  }

  ngOnInit(): void {
    this.message = '';
    this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
    const id = this.crrntUsr.uid;
    this.userEmail = this.crrntUsr.email;
    console.log(id);


    this.usersService.getUserDoc(id).subscribe(res => {
      this.userRef = res;

      this.firstrun = this.userRef.firstrun;
      console.log(this.firstrun);
      this.editForm = this.formBuilder.group({
        firstname: [this.userRef.firstname],
        surname: [this.userRef.surname],
        gender: [this.userRef.gender],
        nationality: [this.userRef.nationality],
        accountType: [this.userRef.accountType],
        homeClub: [this.userRef.homeClub],
        handicap: [this.userRef.handicap],
        residence: [this.userRef.residence],
      })      
    });

    const courseid = this.currentTournament.course;
    this.tournamentsService.getCourseDoc(courseid).subscribe(res => {
      this.courseRef = res;
      console.log(this.courseRef);

    })
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentTournament = { ...this.tournament };
  }


  
  updatePublished(status: boolean): void {
    if (this.currentTournament.id) {
      this.tournamentsService.update(this.currentTournament.id, { published: status })
      .then(() => {
        this.currentTournament.published = status;
        this.message = 'The status was updated successfully!';
      })
      .catch(err => console.log(err));
    }
  }

  updateTutorial(): void {
    const data = {
      title: this.currentTournament.title,
      description: this.currentTournament.description
    };

    if (this.currentTournament.id) {
      this.tournamentsService.update(this.currentTournament.id, data)
      .then(() => this.message = 'The tutorial was updated successfully!')
      .catch(err => console.log(err));
    }
  }

  deleteTutorial(): void {
    if (this.currentTournament.id) {
      this.tournamentsService.delete(this.currentTournament.id)
      .then(() => {
        this.refreshList.emit();
        this.message = 'The tutorial was updated successfully!';
      })
      .catch(err => console.log(err));
    }
  }

}
