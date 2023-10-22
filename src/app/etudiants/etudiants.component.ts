import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from '../data.service';
// DataService pour effectuer des requêtes pour obtenir la liste des étudiants depuis le backend.

//EtudiantsComponent est responsable de la récupération et de l'affichage de la liste des étudiants dans app Angular. 

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.scss']
})
export class EtudiantsComponent {
  constructor(private data: DataService) { }

  etudiants: any[] = [];
  // courseSemesterId: number = 1;


  // La méthode ngOnInit() est un crochet de cycle de vie qui est appelé lorsque le composant est initialisé. 
  ngOnInit() {
    this.data.getAllPersons('Student').subscribe((response: any) => {
      if (response.status === 'success') {
        this.etudiants = response.data; // pour recuperer la liste des etudiants depuis le service DataService
        console.log('GOT ETUDIANTS', this.etudiants)
      } else {
        console.log('Error fetching students:', response.message)
      }
    })
  }
}
