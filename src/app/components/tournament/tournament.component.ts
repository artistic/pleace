import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import Tournaments from 'src/app/models/firestore.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
	selector: 'app-tournament',
	templateUrl: './tournament.component.html',
	styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

	tournamentID: string;
	public parameterTournament: string;

	//get course
	trmentcollection: AngularFirestoreCollection<Tournaments>;  
	trments: Observable<Tournaments[]>;  
	trmentDoc: AngularFirestoreDocument<Tournaments>;
	trment$: Observable<{}[]>;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private fireService: FirestoreService,
		private db: AngularFirestore
		) { }

	ngOnInit(): void {

		this.activatedRoute.params.subscribe(parameter => {
			this.parameterTournament = parameter.courseID
			console.log(this.parameterTournament);
		});

		this.trmentcollection = this.db.collection<{}>('tournaments', ref => ref.where('id', '==', this.parameterTournament));
		this.trment$ = this.trmentcollection.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };

				console.log(this.trment$);
			}))
			);

	}

}
