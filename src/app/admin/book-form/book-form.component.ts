import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent implements OnInit{
  bookForm!: FormGroup; // 书籍表单
  bookId!: number; // 书籍 ID

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute, //route：用于获取 URL 参数（如 id）。
    private router: Router, //router：用于 跳转页面。
    private fb: FormBuilder //Angular 表单构造器，用于创建表单对象。
  ) {}

  ngOnInit(): void {
//从 URL 解析 ID;id = 3，转换为 number 赋值给 bookId。
//创建书籍表单
  this.bookId = Number(this.route.snapshot.paramMap.get('id'));
  this.bookForm = this.fb.group({ //定义表单字段 等效于new FormGroup({...})
    bookName: [''],
    categoryId: [''],
    price: [''],
    description: [''],
    counts: [''],
    status: ['']
  });

  if (this.bookId) { //判断当前组件是“编辑模式”还是“新增模式”以决定是否需要加载已有书籍的数据。
  //编辑模式
    this.loadTargetBook();
  }else{
    //新增模式
    //this.insertBook();
  }
}
//编辑模式
loadTargetBook(): void {
    this.bookService.getBookById(this.bookId).subscribe((book) => { //subscribe() 监听请求结果，把 book 数据填充到 bookForm
      this.bookForm.patchValue(book); //编辑模式只更新传入的字段，不会影响未定义的字段。
    });
  }

  updateBook(): void {
    if (this.bookForm.valid) {
      this.bookService.updateBook(this.bookId, this.bookForm.value).subscribe(() => {
        alert('修改成功');
        this.router.navigate(['/admin/book']);// 来自Router 跳转回书籍列表
      });
    }
  }
  //TODO 新增模式


}
