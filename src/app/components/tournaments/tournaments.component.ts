import { Component, OnInit } from '@angular/core';
import { TournamentsService } from 'src/app/services/tournaments.service';
import { map } from 'rxjs/operators';
import Tournament from 'src/app/models/tournament.model';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {

	tournaments?: Tournament[];
  currentTournament?: Tournament;
  currentIndex = -1;
  title = '';

  constructor(private tournamentsService: TournamentsService) { }

  ngOnInit(): void {
    this.retrieveTournaments();
  }

  refreshList(): void {
    this.currentTournament = undefined;
    this.currentIndex = -1;
    this.retrieveTournaments();
  }

  retrieveTournaments(): void {
    this.tournamentsService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.tournaments = data;
    });
  }

  setActiveTutorial(tournament: Tournament, index: number): void {
    this.currentTournament = tournament;
    this.currentIndex = index;
  }

}
