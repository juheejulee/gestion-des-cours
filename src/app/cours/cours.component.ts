import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from '../data.service';
// DataService => pour recuperer la liste des cours et des enseignants depuis le backend

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.scss']
})

// variables du composant sont ci-dessous
export class CoursComponent {
  constructor(private data: DataService) { }
  // ceci declare plusieurs variables pour stocker les donnees recuperees
  courses: any[] = [];
  teachers: any[] = [];
  courseStudents: string[] = [];
  currentCourseID: number = 0;
  currentCourseSemester: string = '';
  currentCourseSemesterID: number = 0;
  currentSemesterID: number = 0;
  showCourseDetails: boolean = false;

  // ngOnInit() => angular lifecycle hook => crochet de cycle de vie qui est appelé lorsque le composant est initialisé
  ngOnInit() {
    this.fetchData();
  }

  // fetchData() est utilisée pour récupérer les données des cours et des enseignants en utilisant le service DataService
  fetchData() {
    this.data.getSemesterCourses().subscribe((response: any) => {
      if (response.status === 'success') {
        this.courses = response.data;
      } else {
        console.log('Error fetching courses:', response.message)
      }
    })
    this.data.getAllPersons('Teacher').subscribe((response: any) => {
      if (response.status === 'success') {
        this.teachers = response.data;
      } else {
        console.log('Error fetching students:', response.message)
      }
    })
  }

  // Cette méthode est appelée lorsque l'utilisateur clique sur une ligne de cours. 
  showDetails(course: any) {
    this.data.courseSemesterStudentGetAll(course.SemesterId, course.CourseId).subscribe((response: any) => {
      if (response.status === 'success') {
        this.courseStudents = response.data;
        this.showCourseDetails = true;
        this.currentCourseID = course.CourseId;
        this.currentCourseSemester = course.Semester;
        this.currentSemesterID = course.SemesterId;
        this.currentCourseSemesterID = course.Id;
      } else {
        console.log('Error fetching courses:', response.message)
      }
    });
  }
}
