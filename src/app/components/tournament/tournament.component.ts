import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import Tournament from 'src/app/models/tournament.model';
import Tees from 'src/app/models/tees.model';
import Courses from 'src/app/models/courses.model';
import Clubs from 'src/app/models/clubs.model';
import Play from 'src/app/models/play.model';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';
import auth  from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";

import { ToastrService } from 'ngx-toastr';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-tournament',
	templateUrl: './tournament.component.html',
	styleUrls: ['./tournament.component.css']
})



export class TournamentComponent implements OnInit, OnDestroy {

	tournamentID: string;
	faciltyID: string;
	public parameterTournament: string;
	public t: string;
  accountType;
  trment: Tournament;
  allSubscriptions: Subscription[] = [];
  te: Tees;
  crse: Courses;
  clb: Clubs;
	tournament$: Observable<Tournament[]>;
	tee$: Observable<Tees[]>;
	course$: Observable<Courses[]>;
	club$: Observable<Clubs[]>;
  joinTournamentForm: FormGroup = new FormGroup({});


	userState: any;
	userRef: any;
	crrntUsr: any;
	userEmail: any;
	userID : any;
	teeId : any = 'COL-AN-0004-02-01';
	courseId : any = 'BFA-KA-0001-01';
	clubId : any = 'AUS-NS-0200';
	player : any;
	tournamnentList : any;




	constructor(
		private router: Router,
    private fb: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private fireService: FirestoreService,
		private db: AngularFirestore,
		public afAuth: AngularFireAuth,
		private toastr: ToastrService
		) {

	}

  /**
   * Fire on init when class initializes
   */
	ngOnInit(): void {
    this.createForm()
    this.allSubscriptions.push(this.getParameterSubscription());
    this.allSubscriptions.push(this.getAuthState());

	}
  /**
   * Create join tournament form
   */
  createForm(){
    this.joinTournamentForm = this.fb.group({
      handicapIndex: ['', [Validators.required]]
    })
  }

  /**
   * Retrieve user
   */
  getAuthState(){
    return this.afAuth.authState.subscribe(user => {
			if (user) {
				this.userState = user;
				localStorage.setItem('user', JSON.stringify(this.userState));
				JSON.parse(localStorage.getItem('user'));
				this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
				this.userID = this.crrntUsr.uid;
				this.accountType = this.crrntUsr.accountType;
				console.log(this.accountType);
			} else {
				localStorage.setItem('user', null);
				JSON.parse(localStorage.getItem('user'));
			}
		});
  }
  /**
   * Retrieve subscription of parameters
   */
  getParameterSubscription(){
    return this.activatedRoute.params.subscribe(async (parameter) => {
			if(parameter.tournamentID){

        this.parameterTournament = parameter.tournamentID

       // Query for required data
        this.trment = (await this.getTornaments()).data()
        console.log(this.trment);
        this.clb = (await this.getClubs()).data();
        this.crse = (await this.getCourses()).data();
          this.te = (await this.getTees()).data()
      }
		});
  }
  /**
   * Retrieve tornament
   */
 async getTornaments(){
    return this.db.collection<Tournament>('tournaments')
    .doc(this.parameterTournament)
    .get()
    .toPromise()
  }

   /**
   * Retrieve Club
   */
  async getClubs(){
    return this.db
    .collection<Clubs>('clubs')
    .doc(this.trment.club)
    .get()
  .toPromise()
  }
  /**
   * Retrieve Course
   */
  async getCourses(){
    return this.db
    .collection<Courses>('courses')
    .doc(this.trment.course)
    .get()
    .toPromise()
  }
  /**
   * Retrieve Tee
   */
  async getTees(){
    return this.db.collection('tees').doc(this.trment.tee)
    .get()
    .toPromise()
  }

  /**
   * Submit form
   */
async	onSubmit() {
    const newPlayer : Play = {
      uid : this.userState.uid,
      handicapIndex : this.handicapIndex.value,
      teeId : this.teeId,
      posted : new Date(Date.now()),
    }
   let batch = this.db.firestore.batch();

	const playRef =	this.db.collection<Play>('play')
    .doc(this.userState.uid).ref
  const subTornamentRef = this.db.collection<any>('play')
  .doc(this.userState.uid)
  .collection('tournaments')
  .doc(this.parameterTournament)
  .ref
    batch.set(playRef, newPlayer, {merge: true})
    batch.set(subTornamentRef, {
      score: 0
    }, {merge: true});
    try {
      await batch.commit();
      this.toastr.success('You have success joined the tournament', 'Tournament Joined');
    } catch (error) {
      this.toastr.error(error);
    }



  }

  // Form Getters

  get handicapIndex(){
    return this.joinTournamentForm.get('handicapIndex')
  }

  /**
   * Unsubscribe from subscriptions when class is destroyed
   */
  ngOnDestroy(){
    this.allSubscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
  }



}
