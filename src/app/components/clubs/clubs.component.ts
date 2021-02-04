import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import Clubs from 'src/app/models/clubs.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';


@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit {

	 articles$: Observable<Clubs[]>;
	 africa$ : any;

  constructor(
  	private firestoreService: FirestoreService,
    private db: AngularFirestore
  	) {

  	// The code below will query all the articles
     // and return id + data (e.g. title, description, img)
       this.africa$ = this.db.collection('clubs', ref => ref.where('continent', '==', 'Africa'))
        .snapshotChanges().pipe(
           map(actions => actions.map(a => {
             const data = a.payload.doc.data() as Clubs;
             const id = a.payload.doc.id;
             return { id, ...data };
           }))
         );

  	 }

  ngOnInit(): void {

  	// this.db.collection('clubs').valueChanges()
   //   .subscribe(val => console.log(val));

     this.africa$.subscribe(data => console.log(data));

  }

}
