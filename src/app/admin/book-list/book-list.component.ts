import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
//export class BookListComponent{}
export class BookListComponent implements OnInit{
  books: any[] = [];
  selectedBooks: number[] = []; // 存储选中的书籍 ID
  constructor(private bookService: BookService) {}
//构造函数中注入 BookService，用于调用 API 获取书籍数据。

  ngOnInit(): void {//ngOnInit() 是 Angular 生命周期钩子，在组件创建后会自动执行。
    this.loadBooks();//调用 loadBooks() 方法，从后端加载书籍数据。
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data.map(book => ({
          bookId: book.book_id,
          bookName: book.book_name || '未知书名',
          categoryId: book.categoryId || '无分类',
          price: book.price !== null ? book.price : '暂无价格',
          image: book.image || 'assets/default-book.png', // 默认图片
          description: book.description || '暂无描述',
          counts: book.counts !== null ? book.counts : 0, // 处理库存
          status: book.status !== null ? book.status : '未知状态',
          createTime: book.createTime ? new Date(book.createTime).toLocaleString() : '无时间',
          updateTime: book.updateTime ? new Date(book.updateTime).toLocaleString() : '无时间'
        }));
      },
      // error: (err) => {
      //   console.error('获取书籍列表失败:', err);
      // }
    });
  }
  // 切换选中状态
  toggleSelection(bookId: number) {
    const index = this.selectedBooks.indexOf(bookId);
    if (index === -1) {
      this.selectedBooks.push(bookId);
    } else {
      this.selectedBooks.splice(index, 1);
    }
  }
  deleteBook(bookId: number) {
    if (confirm('确定删除这本书吗？')) {
      this.bookService.deleteBook(bookId).subscribe(
        () => {
          this.books = this.books.filter(book => book.book_id !== bookId);
        },
        (error) => {
          console.error('删除书籍失败', error);
        }
      );
    }
  }
}
