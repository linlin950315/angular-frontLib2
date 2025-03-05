import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
  @Input() showCategoryId: number | null = null; // 绑定当前 显示的分类
  //@Output() categoryChange = new EventEmitter<number>(); // Emitter用于子组件向父组件发送事件
  categories: { categoryId: number; categoryName: string }[] = []; // 分类列表
  showCategoryName: string = ''; // 显示的分类名称

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe(catdata => {
      this.categories = catdata;
      console.log('Category分类列表:', this.categories);
      this.showCategory()
      console.log('当前选中的分类ID+名称:' + this.showCategoryId, this.showCategoryName);
    });
  }
  // 更新显示的分类名称
  showCategory() {
    // 根据showCategoryId查找categories数组中的分类
    const showCategory = this.categories.find(c => c.categoryId === this.showCategoryId);
    // 如果找到了分类，则将分类名称赋值给showCategoryName，否则赋值为空字符串
    this.showCategoryName = showCategory ? showCategory.categoryName : '';
  }

  // onCategoryChange(event: any) {
  //   const newCategoryId = Number(event.target.value);
  //   this.showCategoryId = newCategoryId;
  //   this.updateCategoryName();
  //   this.categoryChange.emit(newCategoryId);
  // }

}
