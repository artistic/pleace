import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import User from '../models/user.model';

@Injectable({
	providedIn: 'root'
})
export class UsersService {

	private dbPath = '/users';

	UsersRef: AngularFirestoreCollection<User>;

	constructor(private db: AngularFirestore) {
		this.UsersRef = db.collection(this.dbPath);
	}

	getAll(): AngularFirestoreCollection<User> {
		return this.UsersRef;
	}

	create(users: User): any {
		return this.UsersRef.add({ ...users });
	}

	update(id: string, data: any): Promise<void> {
		return this.UsersRef.doc(id).update(data);
	}

	delete(id: string): Promise<void> {
		return this.UsersRef.doc(id).delete();
	}

	getUserDoc(id) {
		return this.db
		.collection('user-collection')
		.doc(id)
		.valueChanges()
	}

	updateUser(user: User, id) {
		return this.db
		.collection("users")
		.doc(id)
		.update({
			firstname: user.firstname,
			surname: user.surname,
			displayName: user.firstname +' '+ user.surname,
			gender: user.gender,
			nationality: user.nationality,
			accountType: user.accountType,
			homeClub: user.homeClub,
			handicap: user.handicap,
			residence: user.residence,
			firstrun : '1',
		});
	}
}
