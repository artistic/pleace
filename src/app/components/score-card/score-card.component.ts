import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import Play from 'src/app/models/play.model';
import User from 'src/app/models/user.model';


@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css']
})
export class ScoreCardComponent implements OnInit {
  scorecard: FormGroup = new FormGroup({});
  user: User;
  tournamentID: string;
  userPlay: Play;
  score_in_hole: number[] = [];
  formLoaded = false;
  constructor(private fb: FormBuilder, private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(async (user) => {

      this.user = user;

      await this.getScorecard();
      console.log(this.score_in_hole[0]);
      this.createScoreCard();
      this.formLoaded = true;
    })
     this.activatedRoute.params.subscribe((value) => {
      this.tournamentID = value.tournamentID
      console.log(this.tournamentID);
    });


  }
  createScoreCard(){
    this.scorecard = this.fb.group({
      hole1: [this.RZIF(this.score_in_hole[0]), [Validators.required]],
      hole2: [this.RZIF(this.score_in_hole[1]), [Validators.required]],
      hole3: [this.RZIF(this.score_in_hole[2]), [Validators.required]],
      hole4: [this.RZIF(this.score_in_hole[3]), [Validators.required]],
      hole5: [this.RZIF(this.score_in_hole[4]), [Validators.required]],
      hole6: [this.RZIF(this.score_in_hole[5]), [Validators.required]],
      hole7: [this.RZIF(this.score_in_hole[6]), [Validators.required]],
      hole8: [this.RZIF(this.score_in_hole[7]), [Validators.required]],
      hole9: [this.RZIF(this.score_in_hole[8]), [Validators.required]],
      hole10: [this.RZIF(this.score_in_hole[9]), [Validators.required]]
    })
  }

 async getScorecard(){
    this.userPlay = (await this.db
    .collection('tournaments')
    .doc(this.tournamentID)
    .collection('players')
    .doc(this.user.uid)
    .get()
    .toPromise())
    .data()
    this.score_in_hole = this.userPlay.score_in_hole;
  }
  // Form getters

  get hole1(){
    return this.scorecard.get('hole1')
  }
  get hole2(){
    return this.scorecard.get('hole2')
  }
  get hole3(){
    return this.scorecard.get('hole3')
  }
  get hole4(){
    return this.scorecard.get('hole4')
  }
  get hole5(){
    return this.scorecard.get('hole5')
  }
  get hole6(){
    return this.scorecard.get('hole6')
  }
  get hole7(){
    return this.scorecard.get('hole7')
  }
  get hole8(){
    return this.scorecard.get('hole8')
  }
  get hole9(){
    return this.scorecard.get('hole9')
  }
  get hole10(){
    return this.scorecard.get('hole10')
  }
  get completeHoleArray(){
    return [
      this.RZIF(this.hole1.value),
      this.RZIF(this.hole2.value),
      this.RZIF(this.hole3.value),
      this.RZIF(this.hole4.value),
      this.RZIF(this.hole5.value),
      this.RZIF(this.hole6.value),
      this.RZIF(this.hole7.value),
      this.RZIF(this.hole8.value),
      this.RZIF(this.hole9.value),
      this.RZIF(this.hole10.value)]
  }
  get total(){
    let total = 0;
     this.score_in_hole.forEach((value) => {
      total += value
    })
    return total;
  }
  RZIF(value: any){

    return value == '' || !value ? 0 : parseInt(value)
  }
 async onSave(){
   await this.db.collection('tournaments').doc(this.tournamentID)
    .collection('players')
    .doc(this.user.uid)
    .set({score_in_hole: this.completeHoleArray, total: this.total}, {merge: true})

    alert('Progress saved');
  }
  onFinish(){

  }

}
