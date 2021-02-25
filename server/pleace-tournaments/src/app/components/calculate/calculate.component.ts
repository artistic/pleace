import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.css']
})
export class CalculateComponent implements OnInit {

	courseHandicap : any;
	handicapIndex : any;
	 rating : any;
	slope : any;
	par : any;

	standardSlope : any;
	withCourse : any;

	totalIndex : any;
	rndtotalIndex : any;







  registerForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder){}
  //Add user form actions
  get f() { return this.registerForm.controls; }
  onSubmit() {
    
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
      console.log(this.registerForm);
      //calculate handicap
      this.handicapIndex = this.registerForm.get('handicap').value;
      this.rating = this.registerForm.get('rating').value;
      this.slope = this.registerForm.get('slope').value;
      this.par = this.registerForm.get('par').value;

      //calculate
      this.courseHandicap = this.handicapIndex * this.slope;

      this.standardSlope = this.courseHandicap / 113;

      this.withCourse = this.rating - this.par;

      this.totalIndex = this.standardSlope + this.withCourse;

      this.rndtotalIndex = Math.round(this.totalIndex)

      console.log(this.standardSlope);
      console.log(this.withCourse);

      console.log(this.rndtotalIndex);
      alert("WOW!! You have been done with reactive form part 1.");
    }
   
  }
    ngOnInit() {
      //Add User form validations
      this.registerForm = this.formBuilder.group({   
      handicap: ['', [Validators.required, Validators.maxLength(3)]],
      rating: ['', [Validators.required, Validators.maxLength(6)]],
      slope: ['', [Validators.required, Validators.maxLength(6)]],
      par: ['', [Validators.required, Validators.maxLength(6)]],
      });
    }


}
