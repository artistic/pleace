import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UsersService } from 'src/app/services/users.service';
import User from 'src/app/models/user.model';
import Clubs from 'src/app/models/firestore.model';
import Courses from 'src/app/models/firestore.model';
import Tournaments from 'src/app/models/firestore.model';
import Tees from 'src/app/models/firestore.model';
import Rankings from 'src/app/models/firestore.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  setting = "1";


  //get Users
  userscollection: AngularFirestoreCollection<User>;  
  users: Observable<User[]>;  
  usersDoc: AngularFirestoreDocument<User>;
  users$: Observable<{}[]>;

  //get course
  crsescollection: AngularFirestoreCollection<Courses>;  
  crses: Observable<Courses[]>;  
  crsesDoc: AngularFirestoreDocument<Courses>;
  crses$: Observable<{}[]>;

  //get clubs
  clubscollection: AngularFirestoreCollection<Clubs>;  
  clubs: Observable<Clubs[]>;  
  clubsDoc: AngularFirestoreDocument<Clubs>;
  club$: Observable<{}[]>;

  //get tee
  trmntcollection: AngularFirestoreCollection<Tournaments>;  
  trmnt: Observable<Tournaments[]>;  
  trmntDoc: AngularFirestoreDocument<Tournaments>;
  trmnt$: Observable<{}[]>;

  //get tee
  teescollection: AngularFirestoreCollection<Tees>;  
  tees: Observable<Tees[]>;  
  teesDoc: AngularFirestoreDocument<Tees>;
  tees$: Observable<{}[]>;

  //get tee
  rnkcollection: AngularFirestoreCollection<Rankings>;  
  rnks: Observable<Rankings[]>;  
  rnkDoc: AngularFirestoreDocument<Rankings>;
  rnk$: Observable<{}[]>;



  constructor(
  	private usersService: UsersService,
    private fireService: FirestoreService,
    private db: AngularFirestore
    ) { }

  ngOnInit(): void {
  	this.retrieveUsers();
    this.retrieveClubs();
    this.retrieveCourses();
    this.retrieveTournaments();
    this.retrieveRankings();
  }

  retrieveUsers() {
    this.userscollection = this.db.collection<{}>('users');
    this.users$ = this.userscollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data(); // DB Questions
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
      );
  }

   retrieveClubs() {
    this.clubscollection = this.db.collection<{}>('clubs');
    this.club$ = this.clubscollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data(); // DB Questions
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
      );
  }

  retrieveCourses() {
    this.crsescollection = this.db.collection<{}>('courses');
    this.crses$ = this.crsescollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data(); // DB Questions
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
      );
  }

  retrieveRankings() {
    this.rnkcollection = this.db.collection<{}>('rankings');
    this.rnk$ = this.rnkcollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data(); // DB Questions
        const id = a.payload.doc.id;
        return { id, ...data };

      }))
      );
  }

  retrieveTournaments() {
    this.trmntcollection = this.db.collection<{}>('tournaments');
    this.trmnt$ = this.trmntcollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data(); // DB Questions
        const id = a.payload.doc.id;
        return { id, ...data };

      }))
      );
  }
  


  setUsers(): void {
    this.setting = '1';
  }

  setClubs(): void {
    this.setting = '2';
  }

  setCourses(): void {
    this.setting = '3';
  }

  setRankings(): void {
    this.setting = '4';
  }

  setTournaments(): void {
    this.setting = '5';
  }

  

}
