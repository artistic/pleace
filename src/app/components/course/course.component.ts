import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import Course from 'src/app/models/course.model';
import { CoursesService } from 'src/app/services/courses.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
	selector: 'app-course',
	templateUrl: './course.component.html',
	styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnChanges {


	@Input() course?: Course;
	@Output() refreshList: EventEmitter<any> = new EventEmitter();
	currentCourse: Course = {
		club_id: '',
		club_description: '',
		club_published: false
	};
	message = '';

	constructor(
		private coursesService: CoursesService,
		private firestore: AngularFirestore
		) { }

	ngOnInit(): void {
		this.message = '';
	}

	ngOnChanges(): void {
		this.message = '';
		this.currentCourse = { ...this.course };
	}

	updatePublished(status: boolean): void {
    if (this.currentCourse.club_id) {
      this.coursesService.update(this.currentCourse.club_id, { published: status })
      .then(() => {
        this.currentCourse.club_published = status;
        this.message = 'The status was updated successfully!';
      })
      .catch(err => console.log(err));
    }
  }

  editCourse(): void {
    const data = {
      club_id: this.currentCourse.club_id,
      description: this.currentCourse.club_description
    };

    if (this.currentCourse.club_id) {
      this.coursesService.update(this.currentCourse.club_id, data)
        .then(() => this.message = 'The tutorial was updated successfully!')
        .catch(err => console.log(err));
    }
  }

  deleteCourse(): void {
    if (this.currentCourse.club_id) {
      this.coursesService.delete(this.currentCourse.club_id)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The tutorial was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }

}
