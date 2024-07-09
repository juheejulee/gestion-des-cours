import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CoursComponent } from './cours/cours.component';
import { EtudiantsComponent } from './etudiants/etudiants.component';
import { MessageComponent } from './message/message.component';
import { OopsComponent } from './oops/oops.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cours', component: CoursComponent },
  { path: 'etudiants', component: EtudiantsComponent },
  { path: 'message', component: MessageComponent },
  { path: '**', component: OopsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// AppRoutingModule définit les routes de navigation pour votre application Angular en utilisant le module RouterModule
// et le service Routes fourni par Angular. 