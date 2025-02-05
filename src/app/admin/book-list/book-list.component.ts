import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
//export class BookListComponent{}
export class BookListComponent implements OnInit{
  books: any[] = [];
  selectedBook: number[] = []; // 存储选中的书籍 ID
  constructor(
    private bookService: BookService,
     private router: Router, //router：用于 跳转页面。

  ) {}
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
    const index = this.selectedBook.indexOf(bookId);
    if (index === -1) {
      this.selectedBook.push(bookId);
    } else {
      this.selectedBook.splice(index, 1); //array.splice(start, deleteCount, item1, item2, ...);
      // start：表示要修改的起始索引位置（从0计数）。
      //deleteCount：表示要删除的元素数量。如果为0，则不删除任何元素。
      //item1, item2, ...：要插入到数组的元素。
    }
  }
  deleteBook(): void {
    // 遍历选中的书籍，依次发送删除请求
    this.selectedBook.forEach(bookId => {
      this.bookService.deleteBook(bookId).subscribe({
        next: () => {
          // 成功后从 books 列表中移除该书籍
          this.books = this.books.filter(book => book.bookId !== bookId);
        },
      });
    });

    // 清空已选中的书籍
    this.selectedBook = [];
  }
  //TODO 和bookform.component.ts中的代码通信
  editSelectedBook(): void {
    if (this.selectedBook.length === 1) { // 只允许选择一个书籍进行修改
      this.router.navigate(['/admin/book', this.selectedBook[0]]);
    } else {
      alert('请只选择一本书进行修改！');
    }
  }
  }


