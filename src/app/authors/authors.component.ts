import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../admin/services/book.service';
import { AuthorsService } from './services/authors.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent implements OnInit {
  bookForm!: FormGroup; // 书籍表单
  bookId!: number; // 书籍 ID

  constructor(
    private bookService: BookService, //bookService：用于获取书籍信息。
    private route: ActivatedRoute, //route：用于获取 URL 参数（如 id）。
    private router: Router, //router：用于 跳转页面。
    private authorService: AuthorsService,
  ) { }
  ngOnInit(): void {
    console.log('BookListComponent 初始化');
        this.loadbook(new PageEvent());//调用 loadBooks() 方法，从后端加载书籍数据。
  }
  loadbook(event: PageEvent) {

  }
  goBack() {
    // 使用路由器导航到管理员书籍页面
    this.router.navigate(['/admin/book']);
  }
}

