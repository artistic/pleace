import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UsersService } from 'src/app/services/users.service';
import { TournamentsService } from 'src/app/services/tournaments.service';
import User from 'src/app/models/user.model';
import Clubs from 'src/app/models/firestore.model';
import Courses from 'src/app/models/firestore.model';
import Tournaments from 'src/app/models/firestore.model';
import Tees from 'src/app/models/firestore.model';
import Rankings from 'src/app/models/firestore.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr

@Component({
  selector: 'app-add-tournament',
  templateUrl: './add-tournament.component.html',
  styleUrls: ['./add-tournament.component.css']
})
export class AddTournamentComponent implements OnInit {

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

  public tournamentForm: FormGroup;  // Define FormGroup to student's form

  constructor(
  	private usersService: UsersService,
    private fireService: FirestoreService,
    private db: AngularFirestore,
    public crudApi: TournamentsService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService  // Toastr service for alert message
  	) { }

  ngOnInit(): void {
    this.retrieveClubs();
    this.retrieveCourses();
    this.retrieveTournaments();
    this.retrieveRankings();

    this.crudApi.GetTournaments();  // Call GetStudentsList() before main form is being called
    this.tournamentForm();              // Call student form when component is ready
  }


  // Reactive student form
  tournamenForm() {
    this.tournamentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })  
  }

  // Accessing form control using getters
  get firstName() {
    return this.tournamentForm.get('firstName');
  }

  get lastName() {
    return this.tournamentForm.get('lastName');
  }  

  get email() {
    return this.tournamentForm.get('email');
  }

  get mobileNumber() {
    return this.tournamentForm.get('mobileNumber');
  }

  // Reset student form's values
  ResetForm() {
    this.tournamentForm.reset();
  }  
 
  submitTournamentData() {
    this.crudApi.AddStudent(this.tournamentForm.value); // Submit student data using CRUD API
    this.toastr.success(this.tournamentForm.controls['firstName'].value + ' successfully added!'); // Show success message when data is successfully submited
    this.ResetForm();  // Reset form when clicked on reset button
   };


   

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
  

}
