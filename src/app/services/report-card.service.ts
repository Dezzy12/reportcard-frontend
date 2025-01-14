import {Inject, Injectable} from '@angular/core';
import {RC_AUTH_TEST_API_URL, RC_DEFAULT_API_URL, RC_REPORT_CARD_API_URL} from "../app.constants";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ReportCardModel} from "../models/dto/report-card.model";

@Injectable({
  providedIn: 'root'
})
export class ReportCardService {

  constructor(
    @Inject(RC_DEFAULT_API_URL) private defaultApiUrl: string,
    @Inject(RC_REPORT_CARD_API_URL) private reportCardApiUrl: string,
    @Inject(RC_AUTH_TEST_API_URL) private testAuthApiUrl: string,
    private http: HttpClient
  ) {
  }

  testAuthUser = (): Observable<boolean> => this.http.get<boolean>(`${this.testAuthApiUrl}/user`);
  testAuthStudent = (): Observable<boolean> => this.http.get<boolean>(`${this.testAuthApiUrl}/student`);
  testAuthTeacher = (): Observable<boolean> => this.http.get<boolean>(`${this.testAuthApiUrl}/teacher`);
  testAuthAdmin = (): Observable<boolean> => this.http.get<boolean>(`${this.testAuthApiUrl}/admin`);

  create(): Observable<string> {
    return this.http.post<string>(`${this.defaultApiUrl}/create`, {})
  }

  test(): Observable<any> {
    return this.http.get<any>(`${this.defaultApiUrl}/test`, {})
  }

  getReportCard = (satId: number, termId: number): Observable<ReportCardModel> => {
    return this.http.get<ReportCardModel>(`${this.reportCardApiUrl}/report_card`, {
      params: {satId: satId, termId: termId}
    });
  }

  getReportCardFile = (satId: number, termId: number): Observable<HttpResponse<ArrayBuffer>> => {
    return this.http.get(`${this.reportCardApiUrl}/report_card/file`, {
      observe: 'response',
      params: {satId: satId, termId: termId},
      responseType: 'arraybuffer',
    }).pipe(map((response) => this.downloadFile(response)));
  }

  private downloadFile = (response: HttpResponse<ArrayBuffer>) => {
    if (response.body) {
      const filename = response.headers.get('Content-Disposition')?.split("filename=")[1].replace(/"/g, "");
      const blob = new Blob([response.body]);
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.setAttribute('style', 'display: none');
      document.body.appendChild(a);

      a.href = url;
      a.download = filename ? filename : "reportcard.docx";
      a.click();
    }
    return response;
  }
}
