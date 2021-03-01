import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import Clubs from 'src/app/models/firestore.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
	selector: 'app-clubs',
	templateUrl: './clubs.component.html',
	styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit {

	clubscollection: AngularFirestoreCollection<Clubs>;  
	clubs: Observable<Clubs[]>;  
	clubsDoc: AngularFirestoreDocument<Clubs>;

	//continents
	africaClubs$: Observable<{}[]>;
	asiaClubs$: Observable<{}[]>;
	europeClubs$: Observable<{}[]>;
	americaClubs$: Observable<{}[]>;
	greatBritainClubs$: Observable<{}[]>;

	search = true;

	constructor(
		private fireService: FirestoreService,
		private db: AngularFirestore
		) { }

	ngOnInit(): void {

		this.clubscollection = this.db.collection<{}>('clubs', ref => ref.where('continent', '==', 'Africa'));
		this.africaClubs$ = this.clubscollection.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };

				console.log(this.africaClubs$);
			}))
			);

		this.clubscollection = this.db.collection<{}>('clubs', ref => ref.where('continent', '==', 'Asia'));
		this.asiaClubs$ = this.clubscollection.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };

				console.log(this.asiaClubs$);
			}))
			);

		this.clubscollection = this.db.collection<{}>('clubs', ref => ref.where('continent', '==', 'America'));
		this.americaClubs$ = this.clubscollection.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };

				console.log(this.europeClubs$);
			}))
			);

		this.clubscollection = this.db.collection<{}>('clubs', ref => ref.where('continent', '==', 'Europe'));
		this.europeClubs$ = this.clubscollection.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };

				console.log(this.europeClubs$);
			}))
			);

		this.clubscollection = this.db.collection<{}>('clubs', ref => ref.where('continent', '==', 'Great Britain'));
		this.greatBritainClubs$ = this.clubscollection.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };

				console.log(this.greatBritainClubs$);
			}))
			);
	}

}
