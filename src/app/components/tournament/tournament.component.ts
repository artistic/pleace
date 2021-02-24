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
  leaderBoard: Play[];
  allSubscriptions: Subscription[] = [];
  te: Tees;
  crse: Courses;
  clb: Clubs;
	tournament$: Observable<Tournament[]>;
	tee$: Observable<Tees[]>;
	course$: Observable<Courses[]>;
	club$: Observable<Clubs[]>;
  joinTournamentForm: FormGroup = new FormGroup({});
	courseHandicap : any;
	handicapIndexGlobal : any;
	 rating : any;
	slope : any;
	par : any;

	standardSlope : any;
	withCourse : any;

	totalIndex : any;
	rndtotalIndex : any = 0;
	userState: any;
	userRef: any;
	crrntUsr: any;
	userEmail: any;
	userID : any;
	player : any;
	tournamnentList : any;

  teeID:any;




	constructor(
		private router: Router,
    private fb: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private fireService: FirestoreService,
		private db: AngularFirestore,
		public afAuth: AngularFireAuth,
		private toastr: ToastrService,
    private usersService: UsersService,
		) {

	}

  /**
   * Fire on init when class initializes
   */
	ngOnInit() {
    this.createForm()
    this.allSubscriptions.push(this.getParameterSubscription());
    this.allSubscriptions.push(this.getAuthState());
    this.allSubscriptions.push(this.getHandicapChangesSubscription());
    this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
    const id = this.crrntUsr.uid;
    console.log(id);

    this.usersService.getUserDoc(id).subscribe(res => {
      this.userRef = res;
    })


	}
  /**
   * Create join tournament form
   */
  createForm(){
    this.joinTournamentForm = this.fb.group({
      handicapIndex: ['', [Validators.required]]
    })
  }

  getHandicapChangesSubscription(){
    // console.log(this.registerForm);
      //calculate handicap
    return  this.handicapIndex.valueChanges.subscribe((value) => {
        if(value != '' && value != 0){
          console.log('Change');
          this.handicapIndexGlobal = value;
          let rating = this.rating
          let par = this.par;
          let slope = this.slope == 'N/D' ? 124 : parseFloat(this.te.slope)
          console.log(value)
          this.courseHandicap = value * slope;
          this.standardSlope = this.courseHandicap / 113;

          this.withCourse = rating - par;

          this.totalIndex = this.standardSlope + this.withCourse;

          this.rndtotalIndex = Math.round(this.totalIndex)

        }

      })


      //calculate


      // console.log(this.standardSlope);
      // console.log(this.withCourse);

      // console.log(this.rndtotalIndex);
      alert("WOW!! You have been done with reactive form part 1.");
  }
  /**
   * Retrieve user
   */
  getAuthState(){
    return this.afAuth.authState.subscribe(async (user) => {
			if (user) {
				this.userState = user;
				localStorage.setItem('user', JSON.stringify(this.userState));
				JSON.parse(localStorage.getItem('user'));
				this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
				this.userID = this.crrntUsr.uid;
				this.accountType = this.crrntUsr.accountType;
        try {
          this.allSubscriptions.push(await this.checkLeaderBoardAccess());
          } catch (error) {
            this.leaderBoard = null;
          }
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
          this.rating = this.te.rating;
          this.slope = this.te.slope;
          this.par = this.te.course_par_for_tee;
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
   * Submit form.
   */
async	onSubmit() {
    const newPlayer : Play = {
      uid : this.userState.uid,
      handicapIndex : this.rndtotalIndex,
      teeId : this.teeID,
      posted : new Date(Date.now()),
    }
    // Create batch for multiple writes
   let batch = this.db.firestore.batch();

	const playRef =	this.db.collection<any>('play')
    .doc(this.userState.uid).ref
  const subTornamentRef = this.db.collection<any>('tournaments')
  .doc(this.parameterTournament)
  .collection<Play>('players')
  .doc(this.userState.uid)


  .ref
    batch.set(playRef, {uid: this.userState.uid}, {merge: true})
    batch.set(subTornamentRef, {
      ...newPlayer,
      score_in_hole: [0, 0, 0, 0, 0, 0, 0, 0, 0],
       total: 0,
       displayName: this.userState.displayName ? this.userState.displayName : 'Placeholder'
    }, {merge: true});
    try {
      await batch.commit();
      this.allSubscriptions.push(await this.checkLeaderBoardAccess());
      this.toastr.success('You have success joined the tournament', 'Tournament Joined');
    } catch (error) {
      this.toastr.error(error);
    }



  }

  // Form Getters

  get handicapIndex(){
    return this.joinTournamentForm.get('handicapIndex')
  }

  async checkLeaderBoardAccess(): Promise<Subscription>{
    console.log("User id");
    console.log(this.userState.uid);
   const playerData = (await this.db
    .collection<Play>('tournaments')
    .doc(this.parameterTournament)
    .collection('players')
    .doc(this.userState.uid)
    .get()
    .toPromise())

    if(playerData.exists){
      return new Promise<Subscription>((res, rej) => {
        res(this.db
          .collection<any>('tournaments')
          .doc(this.parameterTournament)
          .collection<Play>('players')
        .valueChanges({ idField: 'id'})
        .subscribe((leaderBoard) => {
          this.leaderBoard = leaderBoard;
        })
        )
      })      //  this.db.collection<Play>('tournaments').valueChanges({ idField: 'id'});
    } else{
      return new Promise((res, rej) => {
        rej(null)
      })
    }

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
