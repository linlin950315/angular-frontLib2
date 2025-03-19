import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { BookService } from '../services/book.service';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
//export class BookListComponent{}
export class BookListComponent implements OnInit {
  //bookForm: any[] = [];
  selectedBook: number[] = []; // 存储选中的书籍 ID
  // 和html交互的表格列名
  displayedColumns: string[] = ['edit', 'demo-position', 'checkbox', 'bookId', 'bookName', 'category_id', 'categoryName', 'price', 'counts', 'status', 'createTime', 'updateTime'];
  dataSource = new MatTableDataSource<any>([]);
  //分页
  pageEvent = PageEvent;
  totalElements = 0;
  totalPages = 0;
  pageSize = 15;
  currentPage = 0;
  page = 0;
  sortBy = '';
  descOrAsc = 'ASC';


  //在组件类中定义了一个名为 paginator 的属性，并使用 @ViewChild(MatPaginator) 装饰器获取模板中的 paginator 元素。
  @ViewChild(MatPaginator) paginator!: MatPaginator;//@ViewChild() 装饰器用于获取模板中的元素或组件。
  @ViewChild(MatSort) sort!: MatSort;//获取 MatSort 组件
  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;//在 ngAfterViewInit() 生命周期钩子中，将 paginator 和 sort 分配给 dataSource。
    //console.log('确保 MatSort 组件存在', this.sort); // 确保 MatSort 组件存在
    //console.log('确保 MatPaginator 组件存在', this.paginator); // 确保 MatPaginator 组件存在
    //console.log('Sorting Data Accessor:', this.dataSource.sortingDataAccessor);
  }
  constructor(
    private bookService: BookService, //bookService：用于获取书籍信息。
    private router: Router, //router：用于 跳转页面。
    private _liveAnnouncer: LiveAnnouncer,//LiveAnnouncer：用于向屏幕阅读器发送消息。
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
  // 加载书籍
  // 加载书籍
  loadBooks() {
    // 调用 bookService 的 getBooks 方法获取书籍数据
    this.bookService.getBooks(this.currentPage, this.pageSize).subscribe((data: any) => {
      console.log('API Response:', data);
      // 使用 setData 方法更新数据
      this.dataSource = data.content || []; // || []确保 data.content 不是 undefined
      this.totalElements = data.totalElements; // 总条数
      this.totalPages = data.totalPages // 总页数
      // 绑定 MatSort 和 MatPaginator
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      //this.dataSource.sort.sortables; // 重新绑定排序
        // 手动更新 MatPaginator
      //TODO:this.dataSource.data = data.content|| [];  分页器报错原因不明；如用.data则sort不失效
      // console.log('dataSource', this.dataSource);
      // console.log('totalElements,totalPages=', this.totalElements, this.totalPages);
      // console.log('paginator.length', this.paginator.length);
      // console.log('this.dataSource.sort.sortables', this.dataSource.sort.sortables);
      // console.log("后面要用this.dataSource.paginator:",this.dataSource.paginator);
      // console.log("后面要用this.dataSource.paginator.firstPage():",this.dataSource.paginator.firstPage());

    });
  }

  onPageChange(pageEvent: PageEvent) {
    console.log('Page Event:', pageEvent);
    this.currentPage = pageEvent.pageIndex; //设置当前页 MatPaginator 从 0 开始
    this.pageSize = pageEvent.pageSize; //设置每页显示的条数
    this.loadBooks();
    console.log('onPageChange,currentPage,pageSize,totalememant', this.currentPage, this.pageSize,this.totalElements);
  }

  // 切换选中状态
  // 切换书籍选择状态
  toggleSelection(toggedBookId: number) {
    // 获取已选择书籍数组中指定书籍的索引
    const index = this.selectedBook.indexOf(toggedBookId);
    console.log('index', index);
    // 如果指定书籍不在已选择书籍数组中
    if (index === -1) {
      // 将指定书籍添加到已选择书籍数组中
      this.selectedBook.push(toggedBookId);
    } else {
      this.selectedBook.splice(index, 1); //array.splice(start, deleteCount, item1, item2, ...);
      // start：表示要修改的起始索引位置（从0计数）。
      //deleteCount：表示要删除的元素数量。如果为0，则不删除任何元素。
      //item1, item2, ...：要插入到数组的元素。
    }
  }
  deleteBook(): void {
    if (this.selectedBook.length === 0) return;

    const deleteRequests = this.selectedBook.map(toggedBookId =>
      this.bookService.deleteBook(toggedBookId)
    );

    forkJoin(deleteRequests).subscribe({
      next: () => {
        this.loadBooks(); // 重新加载数据
        this.selectedBook = []; // 清空选择
        alert('删除成功');
      },
      error: err => console.error('删除失败:', err)
    });
  }
  addBook() {
    this.router.navigate(['/admin/book/insert']); //仅按钮
  }
  // announceSortChange(sortState: any) {
  //   console.log("announceSortChange start------------");
  //   if (sortState.direction) {
  //     //console.log("sortState.direction", sortState.direction);
  //     this._liveAnnouncer.announce(`sorted ${sortState.direction}ending`);
  //   } else {
  //     this._liveAnnouncer.announce('sorting cleared');
  //   }
  // }

  getDisplayIndex(index: number): number {
    return this.currentPage * this.pageSize + index + 1;
  }
  sortBybookName() {
    this.bookService.readAllsortBybookName(this.currentPage, this.pageSize, 'bookName', this.descOrAsc).subscribe((data: any) => {
      console.log('SortNameAPI Response:', data);
      this.dataSource = data.content || []; // || []确保 data.content 不是 undefined
      this.totalElements = data.totalElements; // 总条数
      this.totalPages = data.totalPages // 总页数
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
}





