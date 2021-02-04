import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import Course from '../models/course.model';
import Clubs from '../models/clubs.model';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {


	private dbClubs = '/clubs';
	private dbCourses = '/courses';

  constructor() { }
}
