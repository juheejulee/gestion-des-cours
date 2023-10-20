import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-cours-details',
  templateUrl: './cours-details.component.html',
  styleUrls: ['./cours-details.component.scss']
})
export class CoursDetailsComponent {
  @Output() closeModal = new EventEmitter<boolean>();
  @Input() students: any[] = [];
  @Input() courses: any[] = [];
  @Input() currentCourseID: number = 0;
  @Input() currentCourseSemester: string = '';

  // editingStudent: any = null;

  // editGrade(student: any) {
  //   this.editingStudent = student;
  // }

  // saveGrade() {
  //   if (this.editingStudent) {
  //     this.editingStudent = null;
  //   }


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
    // Implement the removal logic here, e.g., remove the student from the 'students' array.
    const studentIndex = this.students.indexOf(student);

    if (studentIndex !== -1) {
      this.students.splice(studentIndex, 1);
    }
  }
}

