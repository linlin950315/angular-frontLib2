import { Component, OnInit } from '@angular/core';
import { BookService } from './../admin/services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit{
  constructor(private BookService: BookService) { }
  bookList: Array<Book> = [];

  ngOnInit(): void {
  }
}
export class Book {
  book_id: number | undefined;
  book_name: string | undefined;

}
/**
 * 初期処理結果格納用
 */
export class HomeInitResultDto {
  bookList: Array<Book> = [];
}
