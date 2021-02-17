import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import Clubs from '../models/firestore.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

	private dbClubs = '/clubs';

	clubsRef: AngularFirestoreCollection<Clubs>;

  constructor(private db: AngularFirestore) {
    this.clubsRef = db.collection(this.dbClubs);
  }

  getAll(): AngularFirestoreCollection<Clubs> {
    return this.clubsRef;
  }

  create(clubs: Clubs): any {
    return this.clubsRef.add({ ...clubs });
  }

  update(id: string, data: any): Promise<void> {
    return this.clubsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.clubsRef.doc(id).delete();
  }
}
