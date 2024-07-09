import { Component } from '@angular/core';
import { SecurityService } from '../security.service';
import { Router } from '@angular/router';

// LoginComponent est responsable de la gestion de la page de connexion de votre application Angular.  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(public security: SecurityService, private router: Router) { }

  // on a besoins 3 variables : username, password, errorMessage (en cas d'echec de la connexion => button Connexion)
  username: string = "";
  password: string = "";
  errorMessage: string = "";

  public btnLogin() {
    this.errorMessage = "";
    this.security.validateCredentials(this.username, this.password);

    this.security.connected.subscribe((isConnected) => {
      // on va appeler la fonction validateCredentials du service security.service.ts pour valider
      if (isConnected) {
        // si connecte --> navigate cours
        this.router.navigate(['cours']);
      } else {
        setTimeout(() => {
          this.errorMessage = 'Login Error' // au lieu d'alerte, afficher ce message sous le bouton Connexion
        }, 200)
      }
    })
  }
}