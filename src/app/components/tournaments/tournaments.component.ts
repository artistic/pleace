import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import Tournament from 'src/app/models/tournament.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
	selector: 'app-tournaments',
	templateUrl: './tournaments.component.html',
	styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {

	tournaments$: Observable<Tournament[]>;

	constructor(
		private fireService: FirestoreService,
		private db: AngularFirestore
		) {
		this.tournaments$ = this.db.collection<Tournament>('tournaments')
		.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data() as Tournament;
				const id = a.payload.doc.id;
				return { id, ...data };
			}))
			);
		 }

	ngOnInit(): void {

	}

}
