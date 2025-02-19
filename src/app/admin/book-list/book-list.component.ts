import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BookService } from '../services/book.service';
@Component({//TODO 改后端
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
//export class BookListComponent{}
export class BookListComponent implements OnInit {
  bookForm: any[] = [];
  selectedBook: number[] = []; // 存储选中的书籍 ID
  // 和html交互的表格列名
  displayedColumns: string[] = ['edit','checkbox','book_id', 'book_name', 'category_id', 'price', 'counts', 'status', 'createTime', 'updateTime'];
  dataSource = new MatTableDataSource<any>([]);
  //分页
  pageEvent = PageEvent;
  totalElements = 0;
  totalPages = 0;
  pageSize = 5;
  currentPage = 0;
  page=0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private bookService: BookService,
    private router: Router, //router：用于 跳转页面。

  ) { }
  //构造函数中注入 BookService，用于调用 API 获取书籍数据。

  ngOnInit(): void {//ngOnInit() 在组件创建后会自动执行。
    console.log('BookListComponent 初始化');

    this.loadBooks();//调用 loadBooks() 方法，从后端加载书籍数据。
  }

  // allBooks(): void {
  //   this.bookService.getBooks().subscribe({//组件初始化时，调用 getItems() 加载第一页的数据。
  //     next: (data) => {
  //       this.bookForm = data.map(book => ({
  //         bookId: book.book_id,
  //         bookName: book.book_name || '未知书名',
  //         categoryId: book.categoryId || '无分类',
  //         price: book.price !== null ? book.price : '暂无价格',
  //         image: book.image || 'assets/default-book.png', // 默认图片
  //         description: book.description || '暂无描述',
  //         counts: book.counts !== null ? book.counts : 0, // 处理库存
  //         status: book.status !== null ? book.status : '未知状态',
  //         createTime: book.createTime ? new Date(book.createTime).toLocaleString() : '无时间',
  //         updateTime: book.updateTime ? new Date(book.updateTime).toLocaleString() : '无时间'
  //       }));
  //       this.totalItems = data.reduce(item => item.totalItems);
  //     },
  //     // error: (err) => {
  //     //   console.error('获取书籍列表失败:', err);
  //     // }
  //   });
  loadBooks() {
    this.bookService.getBooks(this.currentPage, this.pageSize).subscribe((data: any) => {
      //console.log('data:', data);
      this.dataSource = data.content || []; // 确保 data.content 不是 undefined
      //TODO:this.dataSource.data = data.content 分页器报错原因
      console.log('dthis.dataSource', data.content);
      this.totalElements = data.totalElements; // 总条数
      this.totalPages = data.totalPages // 总页数
    });

  }

  onPageChange(pageEvent: PageEvent) {
    this.currentPage = pageEvent.pageIndex; //设置当前页 MatPaginator 从 0 开始
    this.pageSize = pageEvent.pageSize;
    this.loadBooks();
  }

  // 切换选中状态
  toggleSelection(toggedBookId: number) {
    const index = this.selectedBook.indexOf(toggedBookId);
    if (index === -1) {
      this.selectedBook.push(toggedBookId);
    } else {
      this.selectedBook.splice(index, 1); //array.splice(start, deleteCount, item1, item2, ...);
      // start：表示要修改的起始索引位置（从0计数）。
      //deleteCount：表示要删除的元素数量。如果为0，则不删除任何元素。
      //item1, item2, ...：要插入到数组的元素。
    }
  }
  deleteBook(): void {
    // 遍历选中的书籍，依次发送删除请求
    this.selectedBook.forEach(toggedBookId => {
      //console.log('删除书籍 ID:', toggedBookId);//TODO 实际删除成功但前端没报成功
      this.bookService.deleteBook(toggedBookId).subscribe({
        next: () => {
          // 成功后从 books 列表中移除该书籍
          this.bookForm = this.bookForm.filter(book => book.book_id !== toggedBookId);
        },
      });
    });

    // 清空已选中的书籍
    this.selectedBook = [];
  }
  addBook() {
    this.router.navigate(['/admin/book/insert']); //仅按钮
  }

}


