import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorsService } from './services/authors.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent implements OnInit {
  bookForm!: FormGroup; // 书籍表单
  //bookId!: number; // 书籍 ID
  authorId: any;
  dataSource: any;

  displayedColumns: string[] = ['bookId','bookName'];

  constructor(
    private route: ActivatedRoute, //route：用于获取 URL 参数（如 id）。
    private router: Router, //router：用于 跳转页面。
    private authorService: AuthorsService,
  ) { }
  ngOnInit(): void {
    console.log('AuthorComponent 初始化');
    //获取authorId
    this.route.paramMap.subscribe(params => {
      const authorId = params.get('authorId');
      this.authorId = authorId;
    });
    this.loadbook(new PageEvent());
  }

  loadbook(p0: PageEvent): void {
    this.authorService.getBooksByAuthorId(this.authorId).subscribe((data: any[]) => {
      console.log('获取的书籍数据data:', data);

      this.dataSource = data;
      console.log('获取的书籍数据this.dataSource:', this.dataSource);
    });
  }
  goBack() {
    // 使用路由器导航到管理员书籍页面
    this.router.navigate(['/admin/book']);
  }
}
