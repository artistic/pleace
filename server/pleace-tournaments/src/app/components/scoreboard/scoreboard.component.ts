import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import Clubs from 'src/app/models/firestore.model';
import Courses from 'src/app/models/firestore.model';
import Tees from 'src/app/models/firestore.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
	selector: 'app-scoreboard',
	templateUrl: './scoreboard.component.html',
	styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

	courseID: string;
	public parameterTee: string;

	clubcollection: AngularFirestoreCollection<Clubs>;  
	club: Observable<Clubs[]>;  
	clubDoc: AngularFirestoreDocument<Clubs>;
	club$: Observable<{}[]>;

	//get course
	coursescollection: AngularFirestoreCollection<Courses>;  
	courses: Observable<Courses[]>;  
	coursesDoc: AngularFirestoreDocument<Courses>;
	course$: Observable<{}[]>;

	//get tee
	teescollection: AngularFirestoreCollection<Tees>;  
	tees: Observable<Tees[]>;  
	teesDoc: AngularFirestoreDocument<Tees>;
	tees$: Observable<{}[]>;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private fireService: FirestoreService,
		private db: AngularFirestore

		) { }

	ngOnInit(): void {

		this.activatedRoute.params.subscribe(parameter => {
			this.parameterTee = parameter.courseID
			console.log(this.parameterTee);
		});

		this.teescollection = this.db.collection<{}>('tees', ref => ref.where('course', '==', this.parameterTee));
		this.tees$ = this.teescollection.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };
			}))
			);
	}

}
