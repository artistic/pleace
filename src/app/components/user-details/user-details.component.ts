import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import User from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
	selector: 'app-user-details',
	templateUrl: './user-details.component.html',
	styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnChanges {


	@Input() user?: User;
	@Output() refreshUsers: EventEmitter<any> = new EventEmitter();
	currentUser: User = {
		uid: '',
		displayName: '',
		emailVerified: false
	};
	message = '';

	constructor(
		private usersService: UsersService,
		private firestore: AngularFirestore

		) { }

	ngOnInit(): void {
		this.message = '';
	}

	ngOnChanges(): void {
		this.message = '';
		this.currentUser = { ...this.user };
	}

	updatePublished(status: boolean): void {
		if (this.currentUser.uid) {
			this.usersService.update(this.currentUser.uid, { emailVerified: status })
			.then(() => {
				this.currentUser.emailVerified = status;
				this.message = 'The status was updated successfully!';
			})
			.catch(err => console.log(err));
		}
	}

	editCourse(): void {
		const data = {
			uid: this.currentUser.uid,
			description: this.currentUser.displayName
		};

		if (this.currentUser.uid) {
			this.usersService.update(this.currentUser.uid, data)
			.then(() => this.message = 'The tutorial was updated successfully!')
			.catch(err => console.log(err));
		}
	}

	deleteCourse(): void {
		if (this.currentUser.uid) {
			this.usersService.delete(this.currentUser.uid)
			.then(() => {
				this.refreshUsers.emit();
				this.message = 'The tutorial was updated successfully!';
			})
			.catch(err => console.log(err));
		}
	}

}
