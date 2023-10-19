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
}
