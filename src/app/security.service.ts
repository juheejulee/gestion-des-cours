import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';

// structure de donnees pour representer la structure de donnees de la reponse attendue de service de donnees
interface CollegeResponse {
  status: string;
  message: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})

// ce service sera automatiquement injecté dans n'importe quel composant ou service qui en dépend lorsqu'il est requis.
export class SecurityService {

  constructor(private data: DataService) { }

  // est-ce que User est connecte?
  // variable va etre private parce qu'on ne veux pas que l'utilisateur puisse la modifier
  public connected = new BehaviorSubject<boolean>(false);

  isConnected(): boolean {
    return true;
    // TODO: REVERT BACK
    return this.connected.getValue(); // retourner la valeur de la variable si elle est true ou false
  }

  // if user id and password is good
  // user id = user1  &  password = user1pw (given by Julien)
  validateCredentials(user: string, password: string) {
    // lorsque on a des response => envoie ca validateCredentialsObserved
    this.data.validateUser(user, password).subscribe((response: CollegeResponse) => this.validateCredentialsObserved(response));
  }

  // Cette méthode appelle this.data.validateUser(user, password) pour valider les informations d'identification de l'utilisateur 
  // en utilisant le service de données 
  validateCredentialsObserved(response: CollegeResponse) {
    console.log('response', response)

    if (response.status == "success") {
      this.connected.next(true);
    }
    else {
      this.connected.next(false);
    }
  }
  // Cette méthode est appelée pour déconnecter l'utilisateur en mettant connected à false.
  logout(): void {
    this.connected.next(false);
  }
}

// on va pas afficher le menu si l'on est pas connecte --> app.component.ts