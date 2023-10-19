import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.scss']
})
export class EtudiantsComponent {
  constructor(private data: DataService) { }

  etudiants: any[] = [];
  // courseSemesterId: number = 1;

  ngOnInit() {
    this.data.getAllPersons('Student').subscribe((response: any) => {
      if (response.status === 'success') {
        this.etudiants = response.data;
        console.log('GOT ETUDIANTS', this.etudiants)
      } else {
        console.log('Error fetching courses:', response.message)
      }
    })
  }
}
