import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import Play from '../models/play.model';

@Injectable({
  providedIn: 'root'
})
export class TournamentGuard implements CanActivate {
  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth, private router: Router){

  }
 async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree>  {
      const paramId = route.params.tournamentID;

      try {
        const userState = await this.afAuth.currentUser;
        console.log(userState.uid);
        const playerData = (await this.db
          .collection<Play>('tournaments')
          .doc(paramId)
          .collection('players')
          .doc(userState.uid)
          .get()
          .toPromise())
          if(playerData.exists){
            return new Promise<boolean>((res, rej) => {
              res(true)
            })
          } else{
            this.router.navigate(['/tournaments'])
            return new Promise((res, rej) => {
              rej(false)
            })
          }


      } catch (error) {
        this.router.navigate(['/tournaments'])
        return new Promise((res, rej) => {
          rej(false)
        })
      }

  }

}
