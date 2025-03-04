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
    //1.初始化表单（即使没有数据也要先创建表单）
    this.bookForm = new FormGroup({
      bookName: new FormControl('', Validators.required),
      bookId: new FormControl('', Validators.required),
      categoryId: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      counts: new FormControl('', [Validators.required, Validators.min(0)]),
      status: new FormControl(''),
      description: new FormControl('')
    });
    //2.获取bookId
    this.route.paramMap.subscribe(params => {
      console.log('L34 当前 bookId:', params);
      const bookId = params.get('bookId');
      console.log('L36当前 id:', bookId);
      if (bookId === 'insert') {
        this.isEditMode = false;
        console.log('L28模式', this.isEditMode);
      } else if (!isNaN(Number(bookId))) {  //TODO为啥用！NaN啥意思
        this.isEditMode = true; // 进入编辑模式
        console.log('L32模式', this.isEditMode); //
        this.bookId = Number(bookId); //给bookid赋值
        this.loadBook(); // 加载书籍数据
        console.log('L29当前 bookId:', bookId);
      }
    });
  }

  //2.根据bookId获取书籍信息并填充表单
  loadBook() {//也是两个，先判断新增还是编辑模式，再获取数据
    if (String(this.bookId) === 'insert') {//TODO

    } else if (!isNaN(this.bookId)) {
      //console.log('L46bookService前loadBook() 被调用，bookId:', this.bookId);
      this.bookService.getBookById(this.bookId).subscribe(response => {
        console.log('L59bookService被调用response:', response);
        if (response && response.data) {
          this.bookForm.patchValue({ //将获取到的数据填充到表单
            bookName: response.data.book_name,
            bookId: response.data.bookId,
            categoryId: response.data.category.categoryId,
            //categoryName: response.data.category.categoryName, // TODO这里变成下拉菜单显示名字
            price: response.data.price,
            counts: response.data.counts,
            status: response.data.status,
            description: response.data.description,
          });
          console.log('L69表单数据bookForm', this.bookForm);
        }
      });
    }

  }
  // 3.提交修改
  onSubmit() {
    // 如果表单验证通过
    //if (this.bookForm.valid) {}
    // 获取表单数据1
    // const bookData = {
    //   bookName: this.bookForm.value.bookName,
    //   bookId: this.bookForm.value.bookId,
    //   categoryId: this.bookForm.value.categoryId,
    //   price: this.bookForm.value.price,
    //   counts: this.bookForm.value.counts,
    //   status: this.bookForm.value.status,
    //   description: this.bookForm.value.description,
    //  };
    // console.log('L90 bookData:', bookData);
    //这个看着麻烦
    // const bookInfo = {
    //   book_name: bookData.bookName,
    //   book_id: bookData.bookId,
    //   categoryId: bookData.categoryId,
    //   price: bookData.price,
    //   counts: bookData.counts,
    //   status: bookData.status,
    //   description: bookData.description,
    // }
    // 获取表单数据2

    // 如果是编辑模式
    if (this.isEditMode) {
      //获取带ID的表单
      const bookInfoAndId = {
        book_name: this.bookForm.value.bookName,
        bookId: this.bookForm.value.bookId,
        categoryId: Number(this.bookForm.value.categoryId),
        price: this.bookForm.value.price,
        counts: this.bookForm.value.counts,
        status: this.bookForm.value.status,
        description: this.bookForm.value.description,
      }
      console.log('bookInfoAndId:', bookInfoAndId);

      this.bookService.updateBook(bookInfoAndId).subscribe(() => {
        alert('书籍信息更新成功！');
        this.router.navigate(['/admin/book']); // 返回书籍列表
      });
    } else {
      //获取无ID的表单
      const bookInfo = {
        book_name: this.bookForm.value.bookName,
        //book_id: this.bookForm.value.bookId,
        category_id: Number(this.bookForm.value.categoryId),
        price: this.bookForm.value.price,
        counts: this.bookForm.value.counts,
        status: this.bookForm.value.status,
        description: this.bookForm.value.description,
      }
      console.log('bookInfoAndId:', bookInfo);
      this.bookService.insertABook(bookInfo).subscribe(() => {
        alert('书添加成功！');
        this.router.navigate(['/admin/book']);
      });
    }

  }
  goBack() {
    this.router.navigate(['/admin/book']);
  }
}










