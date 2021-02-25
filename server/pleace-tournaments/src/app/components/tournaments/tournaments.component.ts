import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { NgAuthService } from "../../ng-auth.service";
import User from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import auth  from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import Tournament from 'src/app/models/tournament.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';



@Component({
	selector: 'app-tournaments',
	templateUrl: './tournaments.component.html',
	styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {

	tournaments$: Observable<Tournament[]>;
	userState: any;
	userRef: any;
	crrntUsr: any;
	accountType : any;


	constructor(
		private fireService: FirestoreService,
		private db: AngularFirestore,
		public ngAuthService: NgAuthService,
		private usersService: UsersService,

		public afs: AngularFirestore,
		public afAuth: AngularFireAuth,

		private toastr: ToastrService
		) {
		this.afAuth.authState.subscribe(user => {
			if (user) {
				this.userState = user;
				localStorage.setItem('user', JSON.stringify(this.userState));
				JSON.parse(localStorage.getItem('user'));
				this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
				this.accountType = this.crrntUsr.accountType;

			} else {
				localStorage.setItem('user', null);
				JSON.parse(localStorage.getItem('user'));
			}
		});

		this.tournaments$ = this.db.collection<Tournament>('tournaments')
		.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data() as Tournament;
				const id = a.payload.doc.id;
				return { id, ...data };
			}))
			);
	}

	ngOnInit(): void {
    this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
    const id = this.crrntUsr.uid;
    console.log(id);
    
    this.usersService.getUserDoc(id).subscribe(res => {
      this.userRef = res;      
    })
  }

  playTournament() {
  	this.toastr.error('Invalid division. Apply it in settings and try again', 'Cant Join'); 
  }

}
