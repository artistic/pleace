import { Component , OnInit } from '@angular/core';  
import { NgAuthService } from "./ng-auth.service";
import { Title } from '@angular/platform-browser';  
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';  
import { filter } from 'rxjs/operators'; 
import User from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
//import { ApiService } from './services/api.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'Pleace Golf';

  where : any;

  uid: any;
  message = '';
  submitted = false;


  userState: any;
  userRef: any;
  crrntUsr: any;
  userEmail: any;

  firstrun : any;

  constructor(
    public ngAuthService: NgAuthService,
    private router: Router,  
    private activatedRoute: ActivatedRoute,  
    private titleService: Title,
    private usersService: UsersService,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    // private apiService: ApiService,

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

  }

  ngOnInit() { 
    this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
    const id = this.crrntUsr.uid;
    this.userEmail = this.crrntUsr.email;
    console.log(id);
    this.usersService.getUserDoc(id).subscribe(res => {
      this.userRef = res;
      this.firstrun = this.userRef.firstrun;
      console.log(this.firstrun);     
    });

    this.router.events.pipe(  
      filter(event => event instanceof NavigationEnd),  
      ).subscribe(() => {  
        const rt = this.getChild(this.activatedRoute);  
        rt.data.subscribe(data => {  
          console.log(data);  
          this.titleService.setTitle(data.title)}); 
      });  
    }  

    getChild(activatedRoute: ActivatedRoute) {  
      if (activatedRoute.firstChild) {  
        return this.getChild(activatedRoute.firstChild);  
      } else {  
        return activatedRoute;  
      }  

    } 
  }
