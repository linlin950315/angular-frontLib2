import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  //OK
  getAllCategory(): Observable<any[]> {
    console.log('调用 getAllCategory()', `${this.apiUrl}/categories/all`);
      return this.http.get<any>(`${this.apiUrl}/categories/all`);
    }
}
