import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// structure de donnees
interface CollegeResponse {
  status: string;
  message: string;
  data: any;
  //CourseSemesterId: number;
}


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
}