import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//service 用于调用后端 API，从server取数据。获取书籍数据。
@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:8080';


  constructor(private http: HttpClient) { }

  //OK
  getBooks(page: number, size: number): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/admin/book`, {
      params: { page: page.toString(), size: size.toString() }
    });
  }

  // 根据id获取书籍
  getBookById(bookId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/book/${bookId}`);
  }

  insertABook(bookInfo: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/book/insert`, bookInfo);
  }
//Ok
  updateBook(updatedBookInfo: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/book`,updatedBookInfo);
  }
//delete OK
  deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/book/${bookId}`);
  }
}
