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
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  
  @Input() user?: User;
  @Output() refreshUser: EventEmitter<any> = new EventEmitter();
  

  uid: any;
  message = '';
  submitted = false;

  public editForm: FormGroup;
  userState: any;
  userRef: any;
  crrntUsr: any;

  firstrun : any;



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

      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });

    this.editForm = this.formBuilder.group({
      firstname: [''],
      surname: [''],
      gender: [''],
      nationality:[''],
      accountType: [''],
      homeClub: [''],
      handicap: [''],
      residence: [''],
    })
  }

  ngOnInit(): void {
    this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
    const id = this.crrntUsr.uid;
    console.log(id);
    
    this.usersService.getUserDoc(id).subscribe(res => {
      this.userRef = res;

      this.firstrun = this.userRef.firstrun;
      console.log(this.firstrun);
      this.editForm = this.formBuilder.group({
        firstname: [this.userRef.firstname],
        surname: [this.userRef.surname],
        gender: [this.userRef.gender],
        nationality: [this.userRef.nationality],
        accountType: [this.userRef.accountType],
        homeClub: [this.userRef.homeClub],
        handicap: [this.userRef.handicap],
        residence: [this.userRef.residence],
      })      
    })
  }


  onSubmit() {
    this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
    const id = this.crrntUsr.uid;
    console.log(id);
    this.usersService.updateUser(this.editForm.value, id);
    this.router.navigate(['dashboard']);
  };


}
