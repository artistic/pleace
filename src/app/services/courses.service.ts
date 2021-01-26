import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import Course from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

	private dbPath = '/courses';

	coursesRef: AngularFirestoreCollection<Course>;

  constructor(private db: AngularFirestore) {
    this.coursesRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Course> {
    return this.coursesRef;
  }

  create(courses: Course): any {
    return this.coursesRef.add({ ...courses });
  }

  update(id: string, data: any): Promise<void> {
    return this.coursesRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.coursesRef.doc(id).delete();
  }
}
