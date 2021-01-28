import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { map } from 'rxjs/operators';
import User from 'src/app/models/user.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

	//users
	users?: User[];
	currentUser?: User;
	currentIndex = -1;
	title = '';

 setting = "2";

  constructor(
  	private usersService: UsersService

  	) { }

  ngOnInit(): void {
  	this.retrieveUsers();
  }

  refreshUsers(): void {
    this.currentUser = undefined;
    this.currentIndex = -1;
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.usersService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.users = data;
    });
  }

  setActiveUser(user: User, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }


  setUsers(): void {
    this.setting = '1';
  }

  setRankings(): void {
    this.setting = '2';
  }

  setTournaments(): void {
    this.setting = '3';
  }

  setMessages(): void {
    this.setting = '4';
  }

}
