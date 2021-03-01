import { Component, OnInit, NgZone, Input, OnChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgAuthService } from "../../ng-auth.service";
import User from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import auth  from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import Clubs, { Country } from 'src/app/models/firestore.model';
import { Subscription } from 'rxjs';


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
  userEmail: any;
  clubsList: Clubs[] = [];
  firstrun : any;
  allSubscriptions: Subscription[] = [];
  residenceSubscription: Subscription = new Subscription();
  countriesList: Country[] = [];


  constructor(
    public ngAuthService: NgAuthService,
    private usersService: UsersService,
    public formBuilder: FormBuilder,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private toastr: ToastrService
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
      code: [''],
      accountType: [''],
      homeClub: [''],
      handicap: [''],
      residence: [''],
    })
  }

  ngOnInit(): void {
    this.allSubscriptions.push(this.getCountries());
    this.allSubscriptions.push(this.getResidenceChange());
    this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));

    const id = this.crrntUsr.uid;
    this.userEmail = this.crrntUsr.email;


    this.usersService.getUserDoc(id).subscribe(res => {
    this.userRef = res;
    this.firstname.patchValue(res.displayName.split(' ')[0])
    this.surname.patchValue(res.displayName.split(' ')[0])
    this.gender.patchValue(res.gender);
    this.nationality.patchValue(res.nationality);
    this.accountType.patchValue(res.accountType)
    this.code.patchValue(res.code);
    this.homeClub.patchValue(res.homeClub);
    this.handicap.patchValue(res.handicap);
    this.residence.patchValue(res.residence);

      this.firstrun = this.userRef.firstrun;
      console.log(this.firstrun);

    })



  }
   // Form Getters
   get firstname(){
    return this.editForm.get('firstname')
  }
  get surname(){
    return this.editForm.get('surname')
  }
  get gender(){
    return this.editForm.get('gender')
  }
  get nationality(){
    return this.editForm.get('nationality')
  }
  get accountType(){
    return this.editForm.get('accountType')
  }
  get homeClub(){
    return this.editForm.get('homeClub')
  }
  get handicap(){
    return this.editForm.get('handicap')
  }
  get residence(){
    return this.editForm.get('residence')
  }
  get code(){
    return this.editForm.get('code')
  }
  getCountries(){
    return this.afs.collection<Country>('countries')
    .valueChanges({ idField: 'id'})
    .subscribe((countries) => {
      this.countriesList = countries
    })
  }
  getClubs(value: string){
    return this.afs
    .collection<Clubs>('clubs', ref => ref
    .where('country', '==', value))
    .valueChanges({ idField: 'id'})
    .subscribe((clubs) => {
      console.log(value);
      console.log(clubs);
      this.clubsList = clubs;
    })
  }
  getResidenceChange(){

    return this.residence.valueChanges.subscribe((value) => {
      this.residenceSubscription.unsubscribe();
      this.residenceSubscription = this.getClubs(value);
    })
  }

  onSubmit() {
    this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
    const id = this.crrntUsr.uid;
    console.log(id);
    this.usersService.updateUser(this.editForm.value, id);

   this.toastr.success('Your profile has been updated', 'Profile Updated');
   this.router.navigate(['dashboard']);
  };
  ngOnDestroy(){
    this.residenceSubscription.unsubscribe();
    this.allSubscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
  }

}
