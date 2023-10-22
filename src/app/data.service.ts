import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// data.service.ts : responsable de interaction avec un backend pour effectuer diverses operations liees aux donnees dans app Angular

// structure de donnees attendue en reponse a nos requetes : elle contient des champs tels que status, msg, data.
interface CollegeResponse {
  status: string;
  message: string;
  data: any;
}

// ce service sera injecté automatiquement dans n'importe quel composant ou service qui en a besoin.
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // https://localhost:7218/swagger/index.html
  private port: number = 7218;

  // College is my DB name
  validateUser(user: string, password: string): Observable<CollegeResponse> {

    let method: string = "AccountValidate";
    let parameters = { parameters: [user, password] };

    let urlToCall: string = "https://localhost:" + this.port.toString() + "/College?method=" + method + "&parameters=" + JSON.stringify(parameters);
    //cela va revenir --> https://localhost:7218/College?parameters=%7B%22function%22%3A%22getStudents%22%7D

    return this.http.get<CollegeResponse>(urlToCall);
  }

  getSemesterCourses(): Observable<CollegeResponse> {
    let method = 'CourseSemesterGetAll';
    let parameters = { parameters: [] };
    let urlToCall: string = "https://localhost:" + this.port.toString() + "/College?method=" + method + "&parameters=" + JSON.stringify(parameters);

    return this.http.get<CollegeResponse>(urlToCall);
  }

  courseSemesterStudentGetAll(courseID: number): Observable<CollegeResponse> {
    let method = 'CourseSemesterStudentGetAll';
    let parameters = { parameters: [courseID.toString()] };
    let urlToCall: string = "https://localhost:" + this.port.toString() + "/College?method=" + method + "&parameters=" + JSON.stringify(parameters);

    return this.http.get<CollegeResponse>(urlToCall);
  }

  getAllPersons(typeOfPerson: string): Observable<CollegeResponse> {
    let method = 'PersonGetAll';
    let parameters = { parameters: [typeOfPerson] };
    let urlToCall: string = "https://localhost:" + this.port.toString() + "/College?method=" + method + "&parameters=" + JSON.stringify(parameters);

    return this.http.get<CollegeResponse>(urlToCall);
  }

  deleteStudent(studentID: number, semesterID: number): Observable<CollegeResponse> {
    let method = 'CourseSemesterStudentDelete';
    let parameters = { parameters: [semesterID.toString(), studentID.toString()] };
    let urlToCall: string = "https://localhost:" + this.port.toString() + "/College?method=" + method + "&parameters=" + JSON.stringify(parameters);

    return this.http.delete<CollegeResponse>(urlToCall);
  }

  CourseSemesterStudentUpdateGrade(studentID: number, semesterID: number, grade: number): Observable<CollegeResponse> {
    let method = 'CourseSemesterStudentUpdateGrade';
    let body = { parameters: [semesterID.toString(), studentID.toString(), grade.toString()] };
    let urlToCall: string = "https://localhost:" + this.port.toString() + "/College?method=" + method + "&parameters=" + JSON.stringify(body);

    return this.http.patch<CollegeResponse>(urlToCall, body);
  }

  CourseSemesterUpdateTeacher(semesterID: number, teacherID: number): Observable<CollegeResponse> {
    let method = 'CourseSemesterUpdateTeacher';
    let body = { parameters: [semesterID.toString(), teacherID.toString()] };
    let urlToCall: string = "https://localhost:" + this.port.toString() + "/College?method=" + method + "&parameters=" + JSON.stringify(body);

    return this.http.patch<CollegeResponse>(urlToCall, body);
  }
}