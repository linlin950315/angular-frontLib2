import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css',
  standalone: false,
})
export class BookFormComponent implements OnInit {
  bookForm!: FormGroup; // 书籍表单
  bookId!: number; // 书籍 ID
  isEditMode: boolean = false; // 初始化为新增模式
  constructor(
    private bookService: BookService, //bookService：用于获取书籍信息。
    private route: ActivatedRoute, //route：用于获取 URL 参数（如 id）。
    private router: Router, //router：用于 跳转页面。
  ) { }
  ngOnInit() {
    // 获取 URL 里的 bookId
    this.route.paramMap.subscribe(params => {
      const bookId = params.get('bookId');
      if (bookId) {
        this.bookId = +bookId; // 转换为数字
        this.isEditMode = true; // 进入编辑模式
        console.log('模式', this.isEditMode); //
        this.loadBook(); // 加载书籍数据
        console.log('L29当前 bookId:', this.bookId);
      }
    });

    //1. 初始化表单（即使没有数据也要先创建表单）
    this.bookForm = new FormGroup({
      bookName: new FormControl('', Validators.required),
      bookId: new FormControl('', Validators.required),
      categoryId: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      counts: new FormControl('', [Validators.required, Validators.min(0)]),
      status: new FormControl(''),
      description: new FormControl('')
    });
  }

  //获取书籍信息并填充表单
  loadBook() {
    //console.log('L46bookService前loadBook() 被调用，bookId:', this.bookId);
    this.bookService.getBookById(this.bookId).subscribe(response => {
      console.log('L48bookService被调用response:', response);
      if (response && response.data){
        this.bookForm.patchValue({ //将获取到的数据填充到表单
          bookName:  response.data.book_name,
          bookId: response.data.book_id
        });
        console.log('表单数据v', this.bookForm.value);
        console.log('表单数据c', this.bookForm.controls);
      }
    });
  }

  // 3.提交修改
  // 提交表单
  // onSubmit() {
  //   // 如果表单验证通过
  //   if (this.bookForm.valid) {
  //     // 获取表单数据
  //     const bookData = this.bookForm.value;
  //     // 如果是编辑模式
  //     if (this.isEditMode) {
  //       // 编辑模式，调用更新 API
  //       this.bookService.updateBook(this.bookId, bookData).subscribe(() => {
  //         alert('书籍信息更新成功！');
  //         this.router.navigate(['/admin/book-list']); // 返回书籍列表
  //       });
  //     } else {
  //       // 新增模式，调用新增 API
  //       this.bookService.addBook(bookData).subscribe(() => {
  //         alert('书籍添加成功！');
  //         this.router.navigate(['/admin/book-list']); // 返回书籍列表
  //       });
  //     }
  //   }
  // }
}
