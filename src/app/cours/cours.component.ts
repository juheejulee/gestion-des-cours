import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from '../data.service';
// DataService => pour recuperer la liste des cours et des enseignants depuis le backend
import { Sort } from '@angular/material/sort';

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
  semesterNames: any[] = [];
  sortedCourses: any[] = [];
  teachers: any[] = [];
  courseStudents: string[] = [];
  courseNames: string[] = [];
  currentCourseID: number = 0;
  currentCourseSemester: string = '';
  currentCourseSemesterID: number = 0;
  currentSemesterID: number = 0;
  showCourseDetails: boolean = false;
  selectedCourseName: string = '';
  selectedSemester: string = '';

  // ngOnInit() => angular lifecycle hook => crochet de cycle de vie qui est appelé lorsque le composant est initialisé
  ngOnInit() {
    this.fetchData();
  }

  // fetchData() est utilisée pour récupérer les données des cours et des enseignants en utilisant le service DataService
  fetchData() {
    this.data.getSemesterCourses().subscribe((response: any) => {
      if (response.status === 'success') {
        this.courses = response.data;
        this.sortData({
          active: 'session',
          direction: 'asc'
        })
        this.filterCourses(false);
        this.courseNames = [...new Set(this.courses.map((course) => {
          return course.Course;
        }))]
        this.semesterNames = [...new Set(this.courses.map((course) => {
          return course.Semester;
        }))]
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

  sortData(sort: Sort) {
    const data = this.courses.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedCourses = data;
      return;
    }

    this.sortedCourses = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'session':
          return this.compare(a.SemesterId, b.SemesterId, isAsc);
        case 'departement':
          return this.compare(a.Department, b.Department, isAsc);
        case 'cours':
          return this.compare(a.Course, b.Course, isAsc);
        case 'professeur':
          return this.compare(a.TeacherFirstName + " " + a.TeacherLastName, b.TeacherFirstName + " " + b.TeacherLastName, isAsc);
        default:
          return 0;
      }
    });
  }

  filterCourses(isFromDropdown: boolean) {
    if (this.selectedCourseName || this.selectedSemester || isFromDropdown) {
      this.data.getSemesterCourses().subscribe((response: any) => {
        this.courses = response.data;
        this.sortData({
          active: 'session',
          direction: 'asc'
        })
        if (this.selectedCourseName && this.selectedSemester) {
          this.sortedCourses = this.sortedCourses.filter((course) => course.Semester === this.selectedSemester && course.Course === this.selectedCourseName);
        }
        if (this.selectedCourseName && !this.selectedSemester) {
          this.sortedCourses = this.sortedCourses.filter((course) => course.Course === this.selectedCourseName);
        }
        if (!this.selectedCourseName && this.selectedSemester) {
          this.sortedCourses = this.sortedCourses.filter((course) => course.Semester === this.selectedSemester);
        }
        if (!this.selectedCourseName && !this.selectedSemester) {
          this.fetchData()
        }
      })
    }
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? - 1 : 1) * (isAsc ? 1 : -1);
  }

  // Cette méthode est appelée lorsque l'utilisateur clique sur une ligne de cours. 
  showDetails(course: any) {
    this.data.courseSemesterStudentGetAll(course.Id).subscribe((response: any) => {
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
