import { Component, OnInit, NgZone, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { NgAuthService } from "../../ng-auth.service";
import User from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import auth  from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';
import Courses from 'src/app/models/courses.model';


import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Tournament } from 'src/app/models/firestore.model';
import Clubs from 'src/app/models/clubs.model';
import { Subscription } from 'rxjs';
import Tees from 'src/app/models/tees.model';
import Play from 'src/app/models/play.model';


@Component({
	selector: 'app-play',
	templateUrl: './play.component.html',
	styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {



  @Input() user?: User;
  @Output() refreshUser: EventEmitter<any> = new EventEmitter();

  tournamentId: string = '';
  uid: any;
  message = '';
  submitted = false;
  i = 0;

  golfCourses: Courses[] = [];
  courseTees: Tees[] = [];
  public courseForm: FormGroup;
  userState: any;
  userRef: any;
  crrntUsr: any;
  userEmail: any;
  tournamentsChamps$;
  tournamentName: string = '';
  allSubscriptions: Subscription[] = [];
  teeSubscription: Subscription = new Subscription();
  coursesSubscription: Subscription = new Subscription();
  firstrun : any;
  golfClubs: Clubs[] = [];


  constructor(
    public ngAuthService: NgAuthService,
    private usersService: UsersService,
    public formBuilder: FormBuilder,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    private db: AngularFirestore,
    public ngZone: NgZone,
    private toastr: ToastrService
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


  }

  ngOnInit(): void {
    this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));

    const id = this.crrntUsr.uid;
    this.userEmail = this.crrntUsr.email;


    this.usersService.getUserDoc(id).subscribe(res => {
    this.userRef = res;

    this.tournamentsChamps$ = this.db
    .collection<Tournament>('tournaments',
    ref => ref.where('divisions', '==', this.userRef.accountType))
    .valueChanges({ idField: 'id'})
      this.firstrun = this.userRef.firstrun;
      console.log(this.firstrun);

    })



  }

   onTournamentSelect(tournamentId: string, tournamentName: string){
    this.courseForm = this.formBuilder.group({
      club: [''],
      course: [''],
      tee: [''],
      handiCapIndex:[''],
    })
    this.allSubscriptions.push(this.getClubs$());
    this.allSubscriptions.push(this.clubs.valueChanges.subscribe((value) => {
      this.selectedClub();
    }));
    this.allSubscriptions.push(this.course.valueChanges.subscribe((value) => {
      this.selectedCourse();
    }))
    // this.golfCourses = this.afs
    // .collection('clubs', ref => ref
    // .where('country', '==', this.userRef.country))
    // .valueChanges({ idField: 'id'})

    this.tournamentId = tournamentId;
    this.tournamentName = tournamentName;
  }
  get clubs(){
    return this.courseForm.get('club')
  }
  get course(){
    return this.courseForm.get('course')
  }
  get tee(){
    return this.courseForm.get('tee')
  }
  get handiCapIndex(){
    return this.courseForm.get('handiCapIndex')
  }
  getClubs$(){
    // console.log(++this.i)
    return this.afs.collection<Clubs>('clubs', ref => ref.where('country', '==', this.userRef.residence))
    .valueChanges({ idField: 'id'}).subscribe((clubs) => {
      this.golfClubs = clubs;
    })
  }
  selectedClub(){
    this.coursesSubscription.unsubscribe();
    this.coursesSubscription = this.afs.collection<Courses>('courses', ref => ref.where('facilityID', '==', this.clubs.value))
    .valueChanges({ idField: 'id'}).subscribe((courses) => {
      console.log(this.clubs.value)
      console.log(courses)
      this.golfCourses = courses;
    })
  }
  selectedCourse(){
    this.teeSubscription.unsubscribe();
    this.teeSubscription = this.afs.collection<Tees>('tees', ref => ref.where('course', '==', this.course.value))
    .valueChanges({ idField: 'id'}).subscribe((tees) => {
      this.courseTees = tees;
    })
  }
  onSubmit() {
    this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
    const id = this.crrntUsr.uid;
    console.log(id);
    // this.usersService.updateUser(this.courseForm.value, id);

   this.toastr.success('Your profile has been updated', 'Profile Updated');
  };
 async joinTournament(){
    const newPlayer : Play = {
      uid : this.userState.uid,
      handicapIndex : this.handiCapIndex.value,
      teeId : this.tee.value,
      posted : new Date(Date.now()),
    }
    // Create batch for multiple writes
   let batch = this.db.firestore.batch();

	const playRef =	this.db.collection<any>('play')
    .doc(this.userState.uid).ref
  const subTornamentRef = this.db.collection<any>('tournaments')
  .doc(this.tournamentId)
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
      // this.allSubscriptions.push(await this.checkLeaderBoardAccess());
      this.toastr.success('You have success joined the tournament', 'Tournament Joined');
      this.router.navigate(['score-card', this.tournamentId]);
    } catch (error) {
      this.toastr.error(error);
    }

  }
}
