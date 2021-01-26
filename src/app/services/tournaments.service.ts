import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import Tournament from '../models/tournament.model';

@Injectable({
  providedIn: 'root'
})
export class TournamentsService {

  private dbPath = '/tournaments';


  tournamentsRef: AngularFirestoreCollection<Tournament>;

  constructor(private db: AngularFirestore) {
    this.tournamentsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Tournament> {
    return this.tournamentsRef;
  }

  create(tournaments: Tournament): any {
    return this.tournamentsRef.add({ ...tournaments });
  }

  update(id: string, data: any): Promise<void> {
    return this.tournamentsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.tournamentsRef.doc(id).delete();
  }
  
}
