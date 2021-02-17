import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import Courses from 'src/app/models/firestore.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
	selector: 'app-courses',
	templateUrl: './courses.component.html',
	styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

	coursescollection: AngularFirestoreCollection<Courses>;  
	courses: Observable<Courses[]>;  
	coursesDoc: AngularFirestoreDocument<Courses>;
	course$: Observable<{}[]>;

	constructor(
		private fireService: FirestoreService,
		private db: AngularFirestore
		) { }

	ngOnInit(): void {

		this.coursescollection = this.db.collection<{}>('courses');
		this.course$ = this.coursescollection.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };

				console.log(this.course$);
			}))
			);
	}

}
