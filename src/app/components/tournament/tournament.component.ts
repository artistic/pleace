import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import Tournament from 'src/app/models/tournament.model';
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

	tournament$: Observable<Tournament[]>;

	

	userState: any;
	userRef: any;
	crrntUsr: any;
	userEmail: any;
	userID : any;
	teeId : any;
	player : any;

	

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private fireService: FirestoreService,
		private db: AngularFirestore,
		public afAuth: AngularFireAuth,
		private toastr: ToastrService
		) {
		this.activatedRoute.params.subscribe(parameter => {
			this.parameterTournament = parameter.tournamentID
			console.log(this.parameterTournament);
		});


    	

		this.tournament$ = this.db.collection<Tournament>('tournaments', ref => ref.where('tournamentID', '==', this.parameterTournament))
		.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data() as Tournament;
				const id = a.payload.doc.id;
				return { id, ...data };
				console.log(this.tournament$);
			}))
			);




		this.afAuth.authState.subscribe(user => {
			if (user) {
				this.userState = user;
				localStorage.setItem('user', JSON.stringify(this.userState));
				JSON.parse(localStorage.getItem('user'));
				this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
				this.userID = this.crrntUsr.uid;
				console.log(this.userID);
			} else {
				localStorage.setItem('user', null);
				JSON.parse(localStorage.getItem('user'));
			}
		});



		
	}


	ngOnInit(): void {

	}

	getAllDocs() {
           const ref = this.db.collection('tournaments');
           return ref.valueChanges(
           	{
           		club: 'club',
           	}
           	);
      }


	newPlayer : Play = {
		uid : "",
		handicapIndex : "",
		posted : new Date(Date.now()),
	}

	onSubmit() {

		console.log(this.newPlayer);
		this.db.collection<Play>('play').add(this.newPlayer);
		this.toastr.success('You have success joined the tournament', 'Tournament Joined'); 
	}



}
