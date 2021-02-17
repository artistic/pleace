import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import Tournaments from 'src/app/models/firestore.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
	selector: 'app-tournaments',
	templateUrl: './tournaments.component.html',
	styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {

	tournamentscollection: AngularFirestoreCollection<Tournaments>;  
	tournaments: Observable<Tournaments[]>;  
	tournamentsDoc: AngularFirestoreDocument<Tournaments>;
	tournaments$: Observable<{}[]>;

	constructor(
		private fireService: FirestoreService,
		private db: AngularFirestore
		) { }

	ngOnInit(): void {
		this.tournamentscollection = this.db.collection<{}>('tournaments');
		this.tournaments$ = this.tournamentscollection.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };

				console.log(this.tournaments$);
			}))
			);
	}

}
