import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import Clubs from '../models/firestore.model';
import Courses from '../models/firestore.model';
import Tees from '../models/firestore.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

	private dbClubs = '/clubs';
  private dbCourses = '/courses';
  private dbTees = '/tees';

	clubsRef: AngularFirestoreCollection<Clubs>;
  coursesRef: AngularFirestoreCollection<Courses>;
  teesRef: AngularFirestoreCollection<Tees>;

  constructor(private db: AngularFirestore) {
    this.clubsRef = db.collection(this.dbClubs);
    this.coursesRef = db.collection(this.dbCourses);
    this.teesRef = db.collection(this.dbTees);
  }


  // for clubs
  getAllClubs(): AngularFirestoreCollection<Clubs> {
    return this.clubsRef;
  }

  createClubs(clubs: Clubs): any {
    return this.clubsRef.add({ ...clubs });
  }

  updateClubs(id: string, data: any): Promise<void> {
    return this.clubsRef.doc(id).update(data);
  }

  deleteClubs(id: string): Promise<void> {
    return this.clubsRef.doc(id).delete();
  }


  // for courses
  getAllCourses(): AngularFirestoreCollection<Courses> {
    return this.clubsRef;
  }

  createCourses(courses: Courses): any {
    return this.coursesRef.add({ ...courses });
  }

  updateCourses(id: string, data: any): Promise<void> {
    return this.coursesRef.doc(id).update(data);
  }

  deleteCourses(id: string): Promise<void> {
    return this.coursesRef.doc(id).delete();
  }

  // for tee
  getAllTees(): AngularFirestoreCollection<Tees> {
    return this.teesRef;
  }

  createTees(tees: Tees): any {
    return this.teesRef.add({ ...tees });
  }

  updateTees(id: string, data: any): Promise<void> {
    return this.teesRef.doc(id).update(data);
  }

  deleteTees(id: string): Promise<void> {
    return this.teesRef.doc(id).delete();
  }



}
