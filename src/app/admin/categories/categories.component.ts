
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
  @Input() showCategoryId: number | null = null; // 从后端来的 绑定当前 显示的分类
  @Output() categoryChange = new EventEmitter<any>(); //定义EventEmitter， Emitter组件之间传递 解耦 子组件向父组件发送事件
  categories: { categoryId: number; categoryName: string }[] = []; // 分类列表
  showCategoryName: string = ''; // 显示的分类名称

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe(catdata => {
      this.categories = catdata;
      console.log('Category分类列表:', this.categories);
      this.showCategory()
      console.log('当前的分类ID+名称:' + this.showCategoryId, this.showCategoryName);
    });
  }

  // 更新显示的分类名称
  showCategory() {
    // 根据showCategoryId查找categories数组中的分类
    const showCategory = this.categories.find(c => c.categoryId === this.showCategoryId);//find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
    // 根据ID 查找名
    this.showCategoryName = showCategory ? showCategory.categoryName : '';
  }

  onCategoryChange(event: any) {//在book-form.component.html中，当用户选择分类时，会触发 onCategoryChange() 方法。
    //在book-form.component.html中触发(categoryChange)方法后传入updateCategoryId
    const updateCategoryId = Number(event.target.value);
    this.categoryChange.emit(updateCategoryId);// 触发事件并发送数据
    this.showCategoryId = updateCategoryId;
    //this.categoryChange.emit(updateCategoryId);// 触发事件并发送数据
    console.log('onCategoryChange,ID :' + updateCategoryId);
  }
}


