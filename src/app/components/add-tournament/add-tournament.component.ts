import { Component, OnInit } from '@angular/core';
import Tournament from 'src/app/models/tournament.model';
import { TournamentsService } from 'src/app/services/tournaments.service';

import { ToastrService } from 'ngx-toastr';

import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-tournament',
  templateUrl: './add-tournament.component.html',
  styleUrls: ['./add-tournament.component.css']
})
export class AddTournamentComponent implements OnInit {

  tournaments: Tournament = new Tournament();
  submitted = false;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(
    private tournamentService: TournamentsService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
  }

  saveTournament(): void {
    this.tournamentService.create(this.tournaments).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
      this.toastr.success('You have successfully created a new tournament', 'Tournament Created'); 
    });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tournaments = new Tournament();
  }

}
