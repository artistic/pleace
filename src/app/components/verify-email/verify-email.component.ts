import { Component, OnInit, NgZone, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { NgAuthService } from "../../ng-auth.service";
import User from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-verify-email',
	templateUrl: './verify-email.component.html',
	styleUrls: ['./verify-email.component.css']
})

export class VerifyEmailComponent implements OnInit {




	@Input() user?: User;
	@Output() refreshUser: EventEmitter<any> = new EventEmitter();
	
	photoURL : any;
	myArray : any;
	rand : any;
	placeHolder : any;
	userState: any;
	crrntUsr: any;
	usrId : any;
	firstname: any;
	surname: any;
	gender: any;
	nationality: any;
	residence: any;
	accountType: any;
	homeClub: any;
	handicap: any;
	message = '';
	submitted = false;

	public editForm: FormGroup;
	userRef: any



	constructor(
		public ngAuthService: NgAuthService,
		private usersService: UsersService,
		public formBuilder: FormBuilder,
		public afs: AngularFirestore,
		public afAuth: AngularFireAuth,
		public router: Router,
		public ngZone: NgZone
		) { 
		this.afAuth.authState.subscribe(user => {
			if (user) {
				this.userState = user;
				localStorage.setItem('user', JSON.stringify(this.userState));
				JSON.parse(localStorage.getItem('user'));
				this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
				const id = this.crrntUsr.uid;
				console.log(this.usrId);
			} else {
				localStorage.setItem('user', null);
				JSON.parse(localStorage.getItem('user'));
			}
		});

		this.editForm = this.formBuilder.group({
			firstname: [''],
			surname: [''],
			gender: ['']
		})


	}

	ngOnInit(): void {
		const id = this.crrntUsr.uid;
		this.usersService.getUserDoc(id).subscribe(res => {
			this.userRef = res;
			this.editForm = this.formBuilder.group({
				firstname: [this.userRef.firstname],
				surname: [this.userRef.surname],
				gender: [this.userRef.gender]
			})      
		})
	}


	onSubmit() {

		const id = this.crrntUsr.uid;
		this.usersService.updateUser(this.editForm.value, id);
		this.router.navigate(['list-users']);
	};





}
