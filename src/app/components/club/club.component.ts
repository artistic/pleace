import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import Clubs from 'src/app/models/firestore.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
	selector: 'app-club',
	templateUrl: './club.component.html',
	styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {

	facilityID: string;
	public parameterValue: string;

	clubcollection: AngularFirestoreCollection<Clubs>;  
	club: Observable<Clubs[]>;  
	clubDoc: AngularFirestoreDocument<Clubs>;
	club$: Observable<{}[]>;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private fireService: FirestoreService,
		private db: AngularFirestore
		) { }

	ngOnInit(): void {

		this.activatedRoute.params.subscribe(parameter => {
			this.parameterValue = parameter.facilityID
			console.log(this.parameterValue);
		});

		this.clubcollection = this.db.collection<{}>('clubs', ref => ref.where('facilityID', '==', this.parameterValue));
		this.club$ = this.clubcollection.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };

				console.log(this.club$);
			}))
			);

	}

}
