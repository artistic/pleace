import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { NgAuthService } from "../../ng-auth.service";
import { FirestoreService } from 'src/app/services/firestore.service';
import { UsersService } from 'src/app/services/users.service';
import { AngularFireAuth } from "@angular/fire/auth";
import auth  from 'firebase/app';
import User from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';


import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	UID: string;
	public parameterUser: string;


	//get course
	usrcollection: AngularFirestoreCollection<User>;  
	usr: Observable<User[]>;  
	usrDoc: AngularFirestoreDocument<User>;
	usr$: Observable<{}[]>;


	constructor(
		public ngAuthService: NgAuthService,
		private usersService: UsersService,
		public formBuilder: FormBuilder,
		public db: AngularFirestore,
		public afAuth: AngularFireAuth,
		public router: Router,
		private toastr: ToastrService,
		private activatedRoute: ActivatedRoute,
		) { 



	}

	ngOnInit(): void {
		this.activatedRoute.params.subscribe(parameter => {
			this.parameterUser = parameter.UID
			console.log(this.parameterUser);
		});

		this.usrcollection = this.db.collection<{}>('users', ref => ref.where('uid', '==', this.parameterUser));
		this.usr$ = this.usrcollection.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };

				console.log(this.usr$);
			}))
			);
	}


	deleteUser() {

	}





}
