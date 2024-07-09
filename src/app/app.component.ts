import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SecurityService } from './security.service';

// app.component.ts : ceci semble être le composant principal de l'application Angular, 
// responsable de la gestion de l'interface utilisateur globale, de la navigation et de l'authentification. 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'College';

  // si user n'est pas connecte, menu ne s'affiche pas
  constructor(public security: SecurityService, private router: Router) { }

  // si user pas connecte, page navigate --> login page
  ngOnInit() {
    // TODO: REVERT BACK
    if (!this.security.isConnected()) {
      this.router.navigate(['login']);
    }
  }

  logout() {
    // logout et retour à login page
    this.security.logout();
    this.router.navigate(['login']);
  }

  // couleur sur le menu choisi
  IsCoursSelected(): boolean {

    // console.log("IsCoursSelected");
    // console.log(this.router.url);

    if (this.router.url == "/cours") {
      return true;
    }
    return false;
  }

  // couleur sur le menu choisi
  IsEtudiantsSelected(): boolean {

    // console.log("IsEtudiantsSelected");
    // console.log(this.router.url);

    if (this.router.url == "/etudiants") {
      return true;
    }
    return false;
  }
}

