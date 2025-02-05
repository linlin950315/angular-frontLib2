import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  //OK
  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/book`);
  }

  // 根据id获取书籍
  getBookById(bookId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/book/${bookId}`);
  }

  addBook(book: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, book);
  }

  updateBook(id: number, book: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, book);
  }
//delete OK
  deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/book/${bookId}`);
  }
}
