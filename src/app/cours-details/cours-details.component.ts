import { Component, EventEmitter, Output, Input } from '@angular/core';
import { DataService } from '../data.service';

// CoursDetailsComponent est responsable de l'affichage des détails d'un cours sélectionné, 
// y compris la liste des étudiants inscrits et les informations du professeur. 

@Component({
  selector: 'app-cours-details',
  templateUrl: './cours-details.component.html',
  styleUrls: ['./cours-details.component.scss']
})
export class CoursDetailsComponent {
  constructor(private data: DataService) { }
  // Déclaration de sorties (@Output) et d'entrées (@Input) 

  @Output() closeModal = new EventEmitter<boolean>(); // Événement émis pour fermer la fenêtre modale.
  @Output() refreshPage = new EventEmitter<boolean>(); // Événement émis pour actualiser la page parente.
  @Input() students: any[] = []; // Données d'entrée passées au composant.
  @Input() courses: any[] = [];
  @Input() teachers: any[] = [];
  @Input() currentCourseID: number = 0;
  @Input() currentCourseSemester: string = '';
  @Input() currentCourseSemesterID: number = 0;
  @Input() currentSemesterID: number = 0;

  showTeacherDetails: boolean = true; // Boolean pour afficher ou masquer les détails du professeur.
  selectedTeacher: number = 0; // ID du professeur sélectionné.

  // La méthode ngOnChanges() est un crochet de cycle de vie qui est appelé lorsque des valeurs d'entrée changent. 
  // Dans ce cas, elle est utilisée pour appeler 
  ngOnChanges() {
    this.getDefaultSemesterTeacher();
  }

  getDefaultSemesterTeacher() {
    const course = this.courses.filter((course) => course.CourseId === this.currentCourseID && course.Semester === this.currentCourseSemester)[0];
    this.selectedTeacher = course.TeacherId;
  }

  // Method to confirm and remove a student
  confirmRemove(student: any) {
    const confirmation = window.confirm("Êtes-vous sûr ?"); // Display a confirmation dialog

    if (confirmation) {
      // User confirmed, proceed with removal
      this.removeStudent(student);
    }
  }

  // Method to remove a student from the list
  removeStudent(student: any) {
    this.data.deleteStudent(student.StudentId, this.currentSemesterID).subscribe((response: any) => {
      if (response.status === 'success') {
        console.log('deleted ' + student.FirstName + ' ' + student.LastName);
        const studentIndex = this.students.indexOf(student);
        if (studentIndex !== -1) {
          this.students.splice(studentIndex, 1);
        }
      } else {
        console.log('Error deleting student: ', response.message)
      }
    })
  }

  updateStudentGrade(student: any) {
    this.data.CourseSemesterStudentUpdateGrade(student.StudentId, this.currentCourseSemesterID, student.Grade).subscribe((response: any) => {
      if (response.status === 'success') {
        console.log('new grade for ' + student.FirstName + ' ' + student.LastName + ': ' + student.Grade);
      } else {
        console.log('Error changing student grade: ', response.message)
      }
    })
  }

  updateTeacher() {
    this.data.CourseSemesterUpdateTeacher(this.currentCourseSemesterID, this.selectedTeacher).subscribe((response: any) => {
      if (response.status === 'success') {
        this.refreshPage.emit(true);
        console.log('updated teacher with ID' + this.selectedTeacher);
      } else {
        console.log('Error updating teacher: ', response.message)
      }
    })
  }

  toggleTeacherDetails() {
    this.showTeacherDetails = !this.showTeacherDetails;
  }
}

