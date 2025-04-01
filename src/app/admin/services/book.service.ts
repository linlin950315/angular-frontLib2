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

  //readAll(delfaultSortbyId)
  getBooks(page: number, size: number): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/admin/book`, {
      params: { page: page.toString(), size: size.toString() } //给ts文件内的方法传入参的值和形式
    });
  }

  // 根据关键词搜索书籍
  searchBooks(keyword: String, page: number, size: number, sortBy: String, descOrAsc: String, categoryId: number | null): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/admin/book/search`, {
      //TODO:categoryId:categoryId===null?'':categoryId.toString() 这个判断不熟
      params: { keyword: keyword.toString(), page: page, size: size, sortBy: sortBy.toString(), descOrAsc: descOrAsc.toString(), categoryId: categoryId === null ? '' : categoryId.toString() }
    });
  }
  //readAll(sort by bookname)
  // readAllsortBy(page: number, size: number, sortBy: String, descOrAsc: String): Observable<any[]> {
  //   return this.http.get<any>(`${this.apiUrl}/admin/book/sortBy`, {
  //     params: { page: page, size: size, sortBy: sortBy.toString(), descOrAsc: descOrAsc.toString() }
  //   });
  // }

  // 根据id获取书籍
  getBookById(bookId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/book/${bookId}`);
  }

  insertABook(bookInfo: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/book/insert`, bookInfo);
  }
  //Ok
  updateBook(bookInfoAndId: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/book`, bookInfoAndId);
  }
  //delete OK
  deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/book/${bookId}`);
  }
  //给书设置作者
  setAuthorsForBook(bookAuthordto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/book/setAuthors`, bookAuthordto);
  }


  // closeDialog(): Observable<void> {
  //   return this.http.get<void>(`${this.apiUrl}/admin/book`);
  // }
}
