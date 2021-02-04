import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import Course from 'src/app/models/course.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';



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

  coursecollection: AngularFirestoreCollection<Course>;  
  course: Observable<Course[]>;  
  courseDoc: AngularFirestoreDocument<Course>;
  dbCourses$: Observable<{}[]>;


  coursed : any;

  search = false;
  closeResult: string;

  constructor(
  	private coursesService: CoursesService,
    private db: AngularFirestore
  	) { 

    

  }

  ngOnInit(): void {
    this.retrieveCourses();
    this.db.collection('courses').valueChanges()
     .subscribe(val => console.log(val));

     this.coursecollection = this.db.collection<{}>('courses');
    this.dbCourses$ = this.dbCourses$ = this.coursecollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data(); // DB Questions
        const id = a.payload.doc.id;
        return { id, ...data };

        console.log(this.dbCourses$);
      }))
    )

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
