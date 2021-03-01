import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import Courses from 'src/app/models/firestore.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
	selector: 'app-course',
	templateUrl: './course.component.html',
	styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

	courseID: string;
	public parameterCourse: string;

	//get course
	crsescollection: AngularFirestoreCollection<Courses>;  
	crses: Observable<Courses[]>;  
	crsesDoc: AngularFirestoreDocument<Courses>;
	crses$: Observable<{}[]>;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private fireService: FirestoreService,
		private db: AngularFirestore
		) { }

	ngOnInit(): void {

		this.activatedRoute.params.subscribe(parameter => {
			this.parameterCourse = parameter.courseID
			console.log(this.parameterCourse);
		});

		this.crsescollection = this.db.collection<{}>('courses', ref => ref.where('courseID', '==', this.parameterCourse));
		this.crses$ = this.crsescollection.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };

				console.log(this.crses$);
			}))
			);
	}

}
