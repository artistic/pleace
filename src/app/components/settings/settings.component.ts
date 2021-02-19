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
  coursescollection: AngularFirestoreCollection<Courses>;  
  courses: Observable<Courses[]>;  
  coursesDoc: AngularFirestoreDocument<Courses>;
  course$: Observable<{}[]>;

  //get clubs
  clubscollection: AngularFirestoreCollection<Clubs>;  
  clubs: Observable<Clubs[]>;  
  clubsDoc: AngularFirestoreDocument<Clubs>;
  club$: Observable<{}[]>;

  //get tee
  teescollection: AngularFirestoreCollection<Tees>;  
  tees: Observable<Tees[]>;  
  teesDoc: AngularFirestoreDocument<Tees>;
  tees$: Observable<{}[]>;



  constructor(
  	private usersService: UsersService,
    private fireService: FirestoreService,
    private db: AngularFirestore
    ) { }

  ngOnInit(): void {
  	this.retrieveUsers();
    this.retrieveClubs();
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


  setUsers(): void {
    this.setting = '1';
  }

  setClubs(): void {
    this.setting = '2';
  }

  setCourses(): void {
    this.setting = '3';
  }

  setTournaments(): void {
    this.setting = '3';
  }

  setRankings(): void {
    this.setting = '5';
  }

}
