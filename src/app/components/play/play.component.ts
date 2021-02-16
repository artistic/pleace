import { Component, OnInit, NgZone, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { NgAuthService } from "../../ng-auth.service";
import User from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import auth  from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';


@Component({
	selector: 'app-play',
	templateUrl: './play.component.html',
	styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {


	constructor(
		public ngAuthService: NgAuthService,
		private usersService: UsersService,
		public formBuilder: FormBuilder,
		public afs: AngularFirestore,
		public afAuth: AngularFireAuth,
		public router: Router,
		public ngZone: NgZone
		) { }

	ngOnInit(): void {
	}

}
