
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import Tournament from 'src/app/models/tournament.model';
import Continents from 'src/app/models/continents.model';
import Clubs from 'src/app/models/clubs.model';
import Courses from 'src/app/models/courses.model';
import Tees from 'src/app/models/tees.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
	selector: 'app-add-tournament',
	templateUrl: './add-tournament.component.html',
	styleUrls: ['./add-tournament.component.css']
})
export class AddTournamentComponent implements OnInit {

	// Observable which will hold an array of Article
	tournaments$: Observable<Tournament[]>;
	continents$: Observable<Continents[]>;
	clubs$: Observable<Clubs[]>;
	courses$: Observable<Courses[]>;
	tees$: Observable<Tees[]>;
	// form boolean
	showForm: Boolean = false;
	// default article values
	newTournament: Tournament = {
		tournamentID : "",
		name: "",
		regStartDate: "",
		regEndDate: "",
		startDate: "",
		endDate: "",
		divisions: "",
		courses: "",
		posted : new Date(Date.now()),
		continent : "",
		club : "",
		course : "",
		tee : "",

	}

	posted:any;
	cont: any[] = null;



	constructor(
		private db: AngularFirestore
		) {
		// The code below will query all the articles
		// and return id + data (e.g. title, description, img)
		this.tournaments$ = this.db.collection<Tournament>('tournaments')
		.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data() as Tournament;
				const id = a.payload.doc.id;
				return { id, ...data };
			}))
			);

		this.continents$ = this.db.collection<Continents>('continents')
		.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data() as Continents;
				const id = a.payload.doc.id;
				return { id, ...data };
			}))
			);

		this.clubs$ = this.db.collection<Clubs>('clubs')
		.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data() as Clubs;
				const id = a.payload.doc.id;
				return { id, ...data };
			}))
			);
		this.courses$ = this.db.collection<Courses>('courses')
		.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data() as Courses;
				const id = a.payload.doc.id;
				return { id, ...data };
			}))
			);
		this.tees$ = this.db.collection<Tees>('tees')
		.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data() as Tees;
				const id = a.payload.doc.id;
				return { id, ...data };
			}))
			);


	}

	ngOnInit(): void {

		this.tournaments$.subscribe(data => console.log(data));
	}

	onSubmit() {
		console.log(this.newTournament);
		this.db.collection<Tournament>('tournaments').add(this.newTournament);
		this.showForm = false;
	}

}
