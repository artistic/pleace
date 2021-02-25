import { Injectable } from '@angular/core';
import Tournaments from '../models/firestore.model';  // Tournaments data type interface class
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object

@Injectable({
  providedIn: 'root'
})
export class TournamentsService {

  tournamentsRef: AngularFireList<any>;    // Reference to Tournaments data list, its an Observable
  tournamentRef: AngularFireObject<any>;   // Reference to Tournaments object, its an Observable too
  
  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase) { }

  // Create Tournaments
  AddStudent(student: Tournaments) {
    this.tournamentsRef.push({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      mobileNumber: student.mobileNumber
    })
  }

  // Fetch Single Tournaments Object
  GetTournaments(id: string) {
    this.tournamentRef = this.db.object('tournaments/' + id);
    return this.tournamentRef;
  }

  // Fetch Tournamentss List
  GetTournamentsList() {
    this.tournamentsRef = this.db.list('tournaments');
    return this.tournamentsRef;
  }  

  // Update Tournaments Object
  UpdateTournament(student: Tournaments) {
    this.tournamentRef.update({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      mobileNumber: student.mobileNumber
    })
  }  

  // Delete Tournaments Object
  DeleteTournament(id: string) { 
    this.tournamentRef = this.db.object('tournaments/'+id);
    this.tournamentRef.remove();
  }
}
