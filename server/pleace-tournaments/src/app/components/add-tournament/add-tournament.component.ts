
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import Tournament from 'src/app/models/tournament.model';
import Continents from 'src/app/models/continents.model';
import Clubs from 'src/app/models/clubs.model';
import Courses from 'src/app/models/courses.model';
import Tees from 'src/app/models/tees.model';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
	selector: 'app-add-tournament',
	templateUrl: './add-tournament.component.html',
	styleUrls: ['./add-tournament.component.css']
})
export class AddTournamentComponent implements OnInit, OnDestroy {

	// Observable which will hold an array of Article
	tournamentsForm: FormGroup = new FormGroup({});
  tournaments$: Observable<Tournament[]>;
  continents$: Observable<Continents[]>;
  clubsList: Clubs[] = []
  clubs$: Observable<Clubs[]>;
  clubsSubscription: Subscription = new Subscription();
  allSubscriptions: Subscription[] = [];

  coursesList: Courses[] = [];
  courses$: Observable<Courses[]>;
  coursesSubscription: Subscription = new Subscription();

  teesList: Tees[] = [];
  teesSubscription: Subscription = new Subscription();
  tees$: Observable<Tees[]>;
  // form boolean
  showForm: Boolean = false;
  // default article values
  newTournament: Tournament = {
    tournamentID : "",
    name: "",
    regStartDate: "",
    regEndDate: "",
    startDate: "",
    endDate: "",
    divisions: "",
    courses: "",
    posted : new Date(Date.now()),
    continent : "",
    club : "",
    course : "",
    tee : "",

  }

  posted:any;
  cont: any[] = null;

  divisionsArray = ['Champion', 'Celebrity', 'Tour Player', 'PGA Professional']
  continentsArray = [
  {id: '1', name: 'Africa'},
  {id: '2', name: 'Antarctica'},
  {id: '3', name: 'Asia'},
  {id: '4', name: 'Europe'},
  {id: '5', name: 'North America'},
  {id: '6', name: 'Oceania'},
  {id: '7', name: 'South America'}]

  constructor(
    private db: AngularFirestore,
    private fb: FormBuilder,
    private toastr: ToastrService
    ) {
    // The code below will query all the articles
    // and return id + data (e.g. title, description, img)
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
    this.createForm();
    let subscribe_holder = new Subscription();
    subscribe_holder = this.continent.index.valueChanges.subscribe((change) => {
          this.club.patchValue('');
          this.course.patchValue('');
          this.tee.patchValue('');
          this.selectedContinent();
      })
      const hold_array = [this.club, this.course, this.tee]
      // this.allSubscriptions
      // .push(this.getFormObservable(this.continent
      //   .index
      //   .valueChanges, this.selectedContinent, hold_array));
      this.allSubscriptions.push(subscribe_holder);
      subscribe_holder =this.club.valueChanges.subscribe((change) => {
        this.selectedClub();
      })
      this.allSubscriptions.push(subscribe_holder);
      subscribe_holder = this.course.valueChanges.subscribe((change) => {
        this.selectedCourse();
      })
      this.allSubscriptions.push(subscribe_holder);
      // this.tournaments$.subscribe(data => console.log(data));
    }

    get nameTournament(){
      return this.tournamentsForm.get('nameTournament')
    }
    get startDate(){
      return this.tournamentsForm.get('startDate')
    }
    get regStartDate(){
      return this.tournamentsForm.get('regStartDate')
    }
    get regEndDate(){
      return this.tournamentsForm.get('regEndDate')
    }
    get endDate(){
      return this.tournamentsForm.get('endDate')
    }
    get divisions(){
      return {index: this.tournamentsForm.get('divisions'), name: this.divisionsArray[parseInt(this.tournamentsForm.get('divisions').value) - 1]}
    }
    get course(){
      return this.tournamentsForm.get('course')
    }
    // get courses(){
      //   return this.tournamentsForm.get('course')
      // }
      get continent(){
        return {index: this.tournamentsForm
          .get('continent'),
          name: this.continentsArray[parseInt(this.tournamentsForm
            .get('continent')
            .value) - 1]}
        }
        get club(){
          return this.tournamentsForm.get('club')
        }

        get tee(){
          return this.tournamentsForm.get('tee')
        }
        createForm(){
          this.tournamentsForm = this.fb.group({
            nameTournament: ['', [Validators.required]],
            startDate: ['', [Validators.required]],
            regStartDate: ['', [Validators.required]],
            regEndDate: ['', [Validators.required]],
            endDate: ['', [Validators.required]],
            divisions: ['', [Validators.required]],
            continent: ['', [Validators.required]],
            club: ['', [Validators.required]],
            course: ['', [Validators.required]],
            tee: ['', [Validators.required]],
          })
        }
        selectedContinent(){
          this.clubsSubscription.unsubscribe();
          console.log(this.continent.name.name);
          this.clubs$ = this.db.collection<Clubs>('clubs',
            ref => ref
            .where('continent', '==', this.continent.name.name))
          .valueChanges({idField: 'id'});
          this.clubsSubscription = this.clubs$
          .subscribe((clubsList) => {
            this.clubsList = clubsList;
          })
        }
        selectedClub(){
          console.log(this.club.value);
          this.coursesSubscription.unsubscribe();
          this.courses$ = this.db
          .collection<Courses>('courses', ref => ref
            .where('facilityID', '==', this.club.value))
          .valueChanges({ idField: 'id' })

          this.coursesSubscription = this.courses$
          .subscribe((courses) => {
            console.log(courses);
            this.coursesList = courses;
          })
        }
        selectedCourse(){
          console.log(this.club.value);
          this.teesSubscription.unsubscribe();
          this.tees$ = this.db
          .collection<Courses>('tees', ref => ref
            .where('course', '==', this.course.value))
          .valueChanges({ idField: 'id' })

          this.teesSubscription = this.tees$
          .subscribe((tees) => {
            console.log(tees);
            this.teesList = tees;
          })
        }
        async onSubmit() {
          this.newTournament = {
            tournamentID : "",
            name: this.nameTournament.value,
            regStartDate: this.regStartDate.value,
            regEndDate: this.regEndDate.value,
            startDate: this.startDate.value,
            endDate: this.endDate.value,
            divisions: this.divisions.index.value,
            courses: "",
            posted : new Date(Date.now()),
            continent : this.continent.index.value,
            club : this.club.value,
            course : this.course.value,
            tee : this.tee.value,
          }
          console.log(this.newTournament);
          try {
            await this.db.collection<Tournament>('tournaments').add(this.newTournament);
            this.toastr.success('Tournament Has Been Successfully Added', 'Tournament Created');
          } catch (error) {
            this.toastr.error('Something Went Wrong', 'Tournament Error');
          }

          this.showForm = false;
        }
        getFormObservable(formObservable$: Observable<any>, callback: () => void, zeros: any[] = []){
          return formObservable$.subscribe((value) => {
            if(zeros.length != 0){
              zeros.forEach((zero) => {
                zero.patchValue('');
              })
            }
            callback();
          })
        }
        ngOnDestroy(){
          this.allSubscriptions.forEach((sub) => {
            sub.unsubscribe()
          })
          this.clubsSubscription.unsubscribe();
          this.coursesSubscription.unsubscribe();
          this.teesSubscription.unsubscribe()
        }

      }
