import { Supplier } from './../../../contracts/supplier/supplier';
import { SuppliersService } from './../../../sevices/common/suppliers.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Category, ListCategory } from 'src/app/contracts/category/list-category';
import { CategoryService } from './../../../sevices/common/models/category.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SpinnerType } from 'src/app/base/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { Filter } from 'src/app/contracts/dynamic/filter';
import { PropertyRead } from '@angular/compiler';
import { HttpParams } from '@angular/common/http';

export interface Task {
  name: string;
  completed: boolean;
  subtasks?: SubTasks[];
}
interface SubTasks {
  completed: boolean;
  category: Category;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private categoryService: CategoryService,
    private ngxSpinnerService: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.queries = [];
    this.subtask = [];
  }

  category: ListCategory;
  subtask: SubTasks[];
  color: string = "warn";
  task: Task = {
    name: 'Kategoriler',
    completed: false,
  };
  queries: string[];


  async ngOnInit() {
    this.ngxSpinnerService.show(SpinnerType.BallAtom)
    this.category = await this.getCategories();
    this.addSubtask();
    if (this.category != null && this.category != undefined)
      this.ngxSpinnerService.hide(SpinnerType.BallAtom)
  }

  updateAllComplete(category: Category) {
    
    const index: number = this.queries.indexOf(category.categoryId);
    if (index === -1)
      this.queries.push(category.categoryId);
    else {
      this.queries = this.queries.filter((p: string) => p !== category.categoryId)
    }
    
    this.router.navigate(["/products"], {queryParams:{c:this.queries},queryParamsHandling:"merge"});
  }
  
  addSubtask() {
    this.category.categoryDtos.forEach(category => {
      this.subtask.push({ category: category, completed: false })
    });
    this.task.subtasks = this.subtask;
  }

  async getCategories(): Promise<ListCategory> {
    return await this.categoryService.getAllCategory();
  }
}
