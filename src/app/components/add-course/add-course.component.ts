import { Component, OnInit } from '@angular/core';
import Course from 'src/app/models/course.model';
import { CoursesService } from 'src/app/services/courses.service';

import { FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-add-course',
	templateUrl: './add-course.component.html',
	styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

	courses: Course = new Course();
	submitted = false;

	constructor(private courseService: CoursesService) { }

  ngOnInit(): void {
  }

  saveCourse(): void {
    this.courseService.create(this.courses).then(() => {
      console.log('Created new Course successfully!');
      this.submitted = true;
    });
  }

  newCourse(): void {
    this.submitted = false;
    this.courses = new Course();
  }

}
