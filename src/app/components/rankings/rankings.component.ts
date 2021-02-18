import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent implements OnInit {


	category = "2";

  constructor() { }

  ngOnInit(): void {
  }

  setChamp(): void {
    this.category = '1';
  }

  setCeleb(): void {
    this.category = '2';
  }

  setTour(): void {
    this.category = '3';
  }

  setProf(): void {
    this.category = '4';
  }

}
