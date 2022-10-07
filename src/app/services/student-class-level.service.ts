import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RC_STUDENT_CLASS_LEVEL_API_URL} from "../app.constants";
import {StudentClassLevel} from "../app.types";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentClassLevelService {

  constructor(private http: HttpClient, @Inject(RC_STUDENT_CLASS_LEVEL_API_URL) private apiUrl: string) {
  }

  getAllBySchool = (schoolId: number): Observable<StudentClassLevel[]> => {
    return this.http.get<StudentClassLevel[]>(`${this.apiUrl}/school/${schoolId}`)
  }
}
