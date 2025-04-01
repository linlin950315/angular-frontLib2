import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }
  getAllCategory(authorNames: any): Observable<any> {
    console.log('调用 getAllCategory()', `${this.apiUrl}/admin/author/addAuthorsWithCheck`);
    return this.http.get<any>(`${this.apiUrl}/admin/author/addAuthorsWithCheck`, authorNames);
  }
}
