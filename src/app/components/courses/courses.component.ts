import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { map } from 'rxjs/operators';
import Course from 'src/app/models/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses?: Course[];
  currentCourse?: Course;
  currentIndex = -1;
  title = '';

  search = false;

  constructor(
  	private coursesService: CoursesService
  	) { }

  ngOnInit(): void {
    this.retrieveCourses();
  }

  refreshList(): void {
    this.currentCourse = undefined;
    this.currentIndex = -1;
    this.retrieveCourses();
  }

  retrieveCourses(): void {
    this.coursesService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.courses = data;
    });
  }

  setActiveCourse(course: Course, index: number): void {
    this.currentCourse = course;
    this.currentIndex = index;
  }

}
