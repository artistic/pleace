import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import Tournament from 'src/app/models/tournament.model';
import Tees from 'src/app/models/tees.model';
import Courses from 'src/app/models/courses.model';
import Clubs from 'src/app/models/clubs.model';
import Play from 'src/app/models/play.model';
import User from 'src/app/models/user.model';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';
import auth  from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";

import { ToastrService } from 'ngx-toastr';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-tournament',
	templateUrl: './tournament.component.html',
	styleUrls: ['./tournament.component.css']
})



export class TournamentComponent implements OnInit, OnDestroy {

  scorecard1: FormGroup = new FormGroup({});
  scorecard2: FormGroup = new FormGroup({});
  user: User;
  currentPlayer: any;
  tournamentID2: string;
  userPlay: Play;
  score_in_hole: number[] = [];
  score_in_hole2: number[] = [];
  formLoaded = false;
  onSaveSubject: Subject<{score1: number[], score2: number[]}> = new Subject()

  tournamentID: string;
	faciltyID: string;
	public parameterTournament: string;
	public t: string;
  accountType;
  trment: Tournament;
  leaderBoard: Play[];
  allSubscriptions: Subscription[] = [];
  te: Tees;
  topScoreHolder: number[] = [];
  bottomScoreHolder: number[] = [];
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
  indexNumber = 1;
	standardSlope : any;
	withCourse : any;
  totalScore: number;
	totalIndex : any;
	rndtotalIndex : any = 0;
	userState: any;
	userRef: any;
	crrntUsr: any;
	userEmail: any;
	userID : any;
	player : any;
	tournamnentList : any;
  courseParTop = []
  courseParBottom = []
  teeID:any = '';




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
    this.createForm();
    this.onSaveSubject.subscribe((value) => {
      this.score_in_hole = value.score1;
      this.score_in_hole2 = value.score2;
      this.totalScore = this.getTotalScore();
    })
    this.allSubscriptions.push(this.getParameterSubscription());
    this.allSubscriptions.push(this.getAuthState());
    this.allSubscriptions.push(this.getHandicapChangesSubscription());
    this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
    const id = this.crrntUsr.uid;
    console.log(id);

    this.usersService.getUserDoc(id).subscribe(res => {
      this.userRef = res;

    });

    this.afAuth.authState.subscribe(async (user) => {

      this.user = user;


      await this.getScorecard();
      console.log(this.score_in_hole[0]);
      const mainUser = (await this.db.collection<User>('users').doc(user.uid).get().toPromise()).data();
      this.handicapIndexGlobal = mainUser.handicap;
    })
     this.activatedRoute.params.subscribe((value) => {
      this.tournamentID2 = value.tournamentID2
      console.log(this.tournamentID2);
    });


	}

  createScoreCard(){
    this.scorecard1 = this.fb.group({
      hole1: [this.RZIF(this.score_in_hole[0]), [Validators.required]],
      hole2: [this.RZIF(this.score_in_hole[1]), [Validators.required]],
      hole3: [this.RZIF(this.score_in_hole[2]), [Validators.required]],
      hole4: [this.RZIF(this.score_in_hole[3]), [Validators.required]],
      hole5: [this.RZIF(this.score_in_hole[4]), [Validators.required]],
      hole6: [this.RZIF(this.score_in_hole[5]), [Validators.required]],
      hole7: [this.RZIF(this.score_in_hole[6]), [Validators.required]],
      hole8: [this.RZIF(this.score_in_hole[7]), [Validators.required]],
      hole9: [this.RZIF(this.score_in_hole[8]), [Validators.required]],
    })
  }

  createScoreCard2(){
    this.scorecard2 = this.fb.group({
      hole10: [this.RZIF(this.score_in_hole2[0]), [Validators.required]],
      hole11: [this.RZIF(this.score_in_hole2[1]), [Validators.required]],
      hole12: [this.RZIF(this.score_in_hole2[2]), [Validators.required]],
      hole13: [this.RZIF(this.score_in_hole2[3]), [Validators.required]],
      hole14: [this.RZIF(this.score_in_hole2[4]), [Validators.required]],
      hole15: [this.RZIF(this.score_in_hole2[5]), [Validators.required]],
      hole16: [this.RZIF(this.score_in_hole2[6]), [Validators.required]],
      hole17: [this.RZIF(this.score_in_hole2[7]), [Validators.required]],
      hole18: [this.RZIF(this.score_in_hole2[8]), [Validators.required]]
    })
  }

 async getScorecard(){
    this.userPlay = (await this.db
    .collection('tournaments')
    .doc(this.tournamentID)
    .collection('players')
    .doc(this.user.uid)
    .get()
    .toPromise())
    .data()

  }

  get hole1(){
    return this.scorecard1.get('hole1')
  }
  get hole2(){
    return this.scorecard1.get('hole2')
  }
  get hole3(){
    return this.scorecard1.get('hole3')
  }
  get hole4(){
    return this.scorecard1.get('hole4')
  }
  get hole5(){
    return this.scorecard1.get('hole5')
  }
  get hole6(){
    return this.scorecard1.get('hole6')
  }
  get hole7(){
    return this.scorecard1.get('hole7')
  }
  get hole8(){
    return this.scorecard1.get('hole8')
  }
  get hole9(){
    return this.scorecard1.get('hole9')
  }
  get hole10(){
    return this.scorecard2.get('hole10')
  }
  get hole11(){
    return this.scorecard2.get('hole11')
  }
  get hole12(){
    return this.scorecard2.get('hole12')
  }
  get hole13(){
    return this.scorecard2.get('hole13')
  }
  get hole14(){
    return this.scorecard2.get('hole14')
  }
  get hole15(){
    return this.scorecard2.get('hole15')
  }
  get hole16(){
    return this.scorecard2.get('hole16')
  }
  get hole17(){
    return this.scorecard2.get('hole17')
  }
  get hole18(){
    return this.scorecard2.get('hole18')
  }

  get completeHoleArray(){
    return [
      this.RZIF(this.hole1.value),
      this.RZIF(this.hole2.value),
      this.RZIF(this.hole3.value),
      this.RZIF(this.hole4.value),
      this.RZIF(this.hole5.value),
      this.RZIF(this.hole6.value),
      this.RZIF(this.hole7.value),
      this.RZIF(this.hole8.value),
      this.RZIF(this.hole9.value)]
  }
   get completeHoleArray2(){
    return [
      this.RZIF(this.hole10.value),
      this.RZIF(this.hole11.value),
      this.RZIF(this.hole12.value),
      this.RZIF(this.hole13.value),
      this.RZIF(this.hole14.value),
      this.RZIF(this.hole15.value),
      this.RZIF(this.hole16.value),
      this.RZIF(this.hole17.value),
      this.RZIF(this.hole18.value)]
  }
  get total(){
    let total = 0;
     this.score_in_hole.forEach((value) => {
      total += value
    })
    return total;
  }
  /*
PAR 3, 4, 5

Birdie -> +1 -> 1 Under par -> 2pts
Eagle -> +2 -> 2 Under par -> +5pts

Hole in one par 3 -> 7 pts;

Hole in one -> 7pts

albertros -> anything 3 under par -> +9pts

Boogie -> -1 -> 1 over par -> -1pts

Double boogie -> -2 or more over par -> -3pts
  */
  getScore(par: number, stroke: number, index: number){
    if(index < 17){
      if(stroke == 0){
        return 0;
      }
      if(par - stroke == 0){
        return 0
      }
      if((par - stroke) >= 3 ){
        return 9
      }
     else if(stroke == 1){
        return 7;
      }
     else if(par - stroke == 1){
        return 2
      } else if(par - stroke == 2){
        return 5
      }
      else if(par - stroke == -1){
        return -1
      } else if(par - stroke <= -2){
        return -3
      }
    } else{
      if(stroke == 0){
        return 0;
      }
      if(par - stroke == 0){
        return 0
      }
      if((par - stroke) >= 3 ){
        return 9*2
      }
     else if(stroke == 1){
        return 7*2;
      }
     else if(par - stroke == 1){
        return 2*2;
      } else if(par - stroke == 2){
        return 5*2;
      }
      else if(par - stroke == -1){
        return -1*2;
      } else if(par - stroke <= -2){
        return -3*2;
      }
    }
  }
  getTotalScore(){
    let total = 0;
    this.courseParTop.forEach((par, i) => {
     total +=  this.getScore(par, this.score_in_hole[i], i+1)
     + this.getScore(this.courseParBottom[i], this.score_in_hole2[i], i+11);
    })
    return total;
  }
  RZIF(value: any){

    return value == '' || !value ? 0 : parseInt(value)
  }
 async onSave(){
   try {
     console.log(this.parameterTournament);
    await this.db.collection('tournaments').doc(this.parameterTournament)
    .collection('players')
    .doc(this.user.uid)
    .set(
      {
        score_in_hole: this.completeHoleArray,
        score_in_hole2: this.completeHoleArray2,
        total: this.totalScore
      },
      {merge: true}
      )
      console.log(this.hole1.value)
      console.log(this.hole10.value);
      this.onSaveSubject.next({score1: this.completeHoleArray, score2: this.completeHoleArray2});
      this.toastr.success('Your stroke score has been saved', 'Scorecard Updated');
    } catch (error) {
      this.toastr.error(error);
   }


  }
  onFinish(){

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
          this.calculateScore(this.te);


          console.log("the tee")
          console.log(this.te)

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
      this.currentPlayer = playerData.data();
      this.score_in_hole = [...this.currentPlayer.score_in_hole];
      this.score_in_hole2 = [...this.currentPlayer.score_in_hole2];
      console.log("score 2")
      console.log(this.currentPlayer.score_in_hole2);
      this.createScoreCard();
      this.createScoreCard2();
      setTimeout((val) => {
        this.totalScore = this.getTotalScore()
        this.getHandicap()
      }, 2000)
      // this.totalScore = this.getTotalScore()
      this.formLoaded = true;
      console.log("In the form area")
      return new Promise<Subscription>((res, rej) => {
        res(this.db
          .collection<any>('tournaments')
          .doc(this.parameterTournament)
          .collection<Play>('players', ref => ref.orderBy('total', 'desc'))
          .valueChanges({ idField: 'id'})

        .subscribe((leaderBoard) => {
          this.leaderBoard = leaderBoard;
          console.log(leaderBoard);

        })
        )
      })      //  this.db.collection<Play>('tournaments').valueChanges({ idField: 'id'});
    } else{
      return new Promise((res, rej) => {
        rej(null)
      })
    }

  }

  calculateScore(tes: any){
    this.courseParTop = this.retrieveParsAsInts(
      tes.hole1_par,
      tes.hole2_par,
      tes.hole3_par,
      tes.hole4_par,
      tes.hole5_par,
      tes.hole6_par,
      tes.hole7_par,
      tes.hole8_par,
      tes.hole9_par)
      this.courseParBottom = this.retrieveParsAsInts(
        tes.hole10_par,
        tes.hole11_par,
        tes.hole12_par,
        tes.hole13_par,
        tes.hole14_par,
        tes.hole15_par,
        tes.hole16_par,
        tes.hole17_par,
        tes.hole18_par)

        return this.courseParTop[0] - parseInt(this.te[0].hole1) // Parse Hole value as Int because it's stored as string in db
  }
  retrieveParsAsInts(h1, h2, h3, h4, h5, h6, h7, h8, h9){
    const hold_array = [];
    hold_array.push(parseInt(h1));
    hold_array.push(parseInt(h2));
    hold_array.push(parseInt(h3));
    hold_array.push(parseInt(h4));
    hold_array.push(parseInt(h5));
    hold_array.push(parseInt(h6));
    hold_array.push(parseInt(h7));
    hold_array.push(parseInt(h8));
    hold_array.push(parseInt(h9));
    return [...hold_array]
  }

  getNumber(i: number){
    if(i != 0){
      if(this.leaderBoard[i].total === this.leaderBoard[i-1].total){
         ++this.indexNumber;
         return '';
      }else{
        return ++this.indexNumber;
      }
    } else{
      this.indexNumber = 1;
      return this.indexNumber;
    }
  }
  getHandicap(){
    console.log('Change');

          let rating = this.rating
          let par = this.par;
          let slope = this.slope == 'N/D' ? 124 : parseFloat(this.te.slope)
          console.log(this.handicapIndexGlobal)
          this.courseHandicap = this.handicapIndexGlobal * slope;
          this.standardSlope = this.courseHandicap / 113;
          this.withCourse = rating - par;
          this.totalIndex = this.standardSlope + this.withCourse;
          this.rndtotalIndex = Math.round(this.totalIndex)
  }
  getStrokeScore(strokes: number[]){
    let total = 0;
    strokes.forEach((num) => {
      total += num;
    })
    return total;
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
