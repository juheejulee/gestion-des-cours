import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.scss']
})
export class CoursComponent {
  constructor(private data: DataService) { }

  courses: any[] = [];
  //selectedCourse: any; // Variable to store the selected course details

  ngOnInit() {
    this.data.getSemesterCourses().subscribe((response: any) => {
      if (response.status === 'success') {
        this.courses = response.data;
        console.log('GOT COURSES', this.courses)
      } else {
        console.log('Error fetching courses:', response.message)
      }
    })
  }


  // export class CoursComponent {
  // constructor(private data: DataService) { }

  // courses: any[] = [];
  // //selectedCourse: any; // Variable to store the selected course details

  // ngOnInit() {
  //   this.data.getSemesterCourses().subscribe((value: any) => {
  //     this.courses = value;
  //     console.log('GOT COURSES', this.courses)
  //   })
  // }

  // showCourseDetails(course: any) {
  //   this.selectedCourse = course;
  // }

}
