import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import Tournament from 'src/app/models/tournament.model';
import Tees from 'src/app/models/tees.model';
import Courses from 'src/app/models/courses.model';
import Clubs from 'src/app/models/clubs.model';
import Play from 'src/app/models/play.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';
import auth  from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";

import { ToastrService } from 'ngx-toastr';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
	selector: 'app-tournament',
	templateUrl: './tournament.component.html',
	styleUrls: ['./tournament.component.css']
})



export class TournamentComponent implements OnInit {

	tournamentID: string;
	faciltyID: string;
	public parameterTournament: string;
	public t: string;
  accountType;
  trment: Tournament;
  te: Tees;
  crse: Courses;
  clb: Clubs;
	tournament$: Observable<Tournament[]>;
	tee$: Observable<Tees[]>;
	course$: Observable<Courses[]>;
	club$: Observable<Clubs[]>;



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
		private activatedRoute: ActivatedRoute,
		private fireService: FirestoreService,
		private db: AngularFirestore,
		public afAuth: AngularFireAuth,
		private toastr: ToastrService
		) {
		this.activatedRoute.params.subscribe(async (parameter) => {
			if(parameter.tournamentID){

        this.parameterTournament = parameter.tournamentID

        console.log(this.parameterTournament);
       // Get Tournament
        this.trment = (await this.db.collection<Tournament>('tournaments')
        .doc(this.parameterTournament)
        .get()
        .toPromise()
        ).data()
        this.clb = (await this.db
          .collection<Clubs>('clubs')
          .doc(this.trment.club)
          .get()
        .toPromise())
        .data();
        this.crse = (await this.db
          .collection<Courses>('courses')
          .doc(this.trment.course)
          .get()
          .toPromise()
          ).data();
          this.te = (await this.db.collection('tees').doc(this.trment.tee)
          .get()
          .toPromise()
          ).data()
    // Start
		// this.tournament$ = this.db.collection<Tournament>('tournaments', ref => ref.where('tournamentID', '==', this.parameterTournament))
		// .snapshotChanges().pipe(
		// 	map(actions => actions.map(a => {
		// 		const data = a.payload.doc.data() as Tournament;
		// 		const id = a.payload.doc.id;
		// 		return { id, ...data };

		// 	}))
		// );



		// this.tee$ = this.db.collection<Tees>('tees', ref => ref.where('teeId', '==', this.teeId))
		// .snapshotChanges().pipe(
		// 	map(actions => actions.map(a => {
		// 		const data = a.payload.doc.data() as Tees;
		// 		const id = a.payload.doc.id;
		// 		return { id, ...data };
		// 		console.log(this.tee$);
		// 	}))
		// 	);


		// this.course$ = this.db.collection<Courses>('courses', ref => ref.where('courseID', '==', this.courseId))
		// .snapshotChanges().pipe(
		// 	map(actions => actions.map(a => {
		// 		const data = a.payload.doc.data() as Courses;
		// 		const id = a.payload.doc.id;
		// 		return { id, ...data };
		// 		console.log(this.course$);
		// 	}))
		// 	);

		// this.club$ = this.db.collection<Clubs>('clubs', ref => ref.where('facilityID', '==', this.clubId))
		// .snapshotChanges().pipe(
		// 	map(actions => actions.map(a => {
		// 		const data = a.payload.doc.data() as Clubs;
		// 		const id = a.payload.doc.id;
		// 		return { id, ...data };
		// 		console.log(this.club$);
		// 	}))
		// 	);

      //End
      }
		});

		this.afAuth.authState.subscribe(user => {
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


	ngOnInit(): void {

	}




	newPlayer : Play = {
		uid : "W0z02lUZWSOGHjpJmOa0NU9sGHF2",
		handicapIndex : "3",
		teeId : this.teeId,
		posted : new Date(Date.now()),
	}

	onSubmit() {

		this.db.collection<Play>('play').add(this.newPlayer);
		this.toastr.success('You have success joined the tournament', 'Tournament Joined');
	}



}
