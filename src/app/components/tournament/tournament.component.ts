import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import Tournament from 'src/app/models/tournament.model';
import { TournamentsService } from 'src/app/services/tournaments.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit, OnChanges {

	@Input() tournament?: Tournament;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentTournament: Tournament = {
    title: '',
    description: '',
    published: false
  };
  message = '';

  constructor(
    private tournamentsService: TournamentsService,
    private firestore: AngularFirestore
    ) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentTournament = { ...this.tournament };
  }


  
  updatePublished(status: boolean): void {
    if (this.currentTournament.id) {
      this.tournamentsService.update(this.currentTournament.id, { published: status })
      .then(() => {
        this.currentTournament.published = status;
        this.message = 'The status was updated successfully!';
      })
      .catch(err => console.log(err));
    }
  }

  updateTutorial(): void {
    const data = {
      title: this.currentTournament.title,
      description: this.currentTournament.description
    };

    if (this.currentTournament.id) {
      this.tournamentsService.update(this.currentTournament.id, data)
        .then(() => this.message = 'The tutorial was updated successfully!')
        .catch(err => console.log(err));
    }
  }

  deleteTutorial(): void {
    if (this.currentTournament.id) {
      this.tournamentsService.delete(this.currentTournament.id)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The tutorial was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }

}
