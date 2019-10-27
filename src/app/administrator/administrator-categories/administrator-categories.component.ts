import { Component, OnInit } from '@angular/core';
import {CategoriesService} from '../../categories/categories.service';
import {Category} from '../../categories/category';
import {SubCategory} from '../../categories/sub-category';
import {Server} from '../../server';

@Component({
  selector: 'app-administrator-categories',
  templateUrl: './administrator-categories.component.html',
  styleUrls: ['./administrator-categories.component.css']
})
export class AdministratorCategoriesComponent implements OnInit {

  categories: Category[] = [];
  isAddCategory = false;
  newCategoryImage: string;
  newCategoryImageUrl: string;
  newCategoryTitle: string;
  activeCategory: Category = {id: 0, title: '', image: ''};

  updatedCategory: number;
  updateCategoryTitle: string;

  subCategories: SubCategory[];
  isAddSubCategory = false;
  newSubCategoryTitle: string;

  updatedSubCategory: number;
  updateSubCategoryTitle: string;

  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.categoriesService.getCategories().subscribe(categories => {
      categories.forEach(category => {
        category.image = Server.url + '/images/get/' + category.image;
        this.categories.push(category);
      });
    });
    this.categoriesService.getSubCategories().subscribe(subCategories => this.subCategories = subCategories);
  }

  changeNewCategoryImage(event) {
    this.categoriesService.uploadImage(event.target.files[0]).subscribe(response => {
      this.newCategoryImage = response.filename;
      this.newCategoryImageUrl = Server.url + '/images/get/' + response.filename;
    });
  }

  saveNewCategory() {
    if (!!this.newCategoryImage && !!this.newCategoryTitle) {
      const category = {
        id: null,
        title: this.newCategoryTitle,
        image: this.newCategoryImage
      };
      this.categoriesService.addCategory(category).subscribe(responses => {
        category.id = responses.id;
        category.image = this.newCategoryImageUrl;
        this.categories.push(category);
        this.newCategoryImageUrl = null;
        this.newCategoryImage = null;
        this.newCategoryTitle = '';
      });
    }
  }

  changeUpdateCategoryImage(event: any, newCategory: Category) {
    console.log(newCategory);
    this.categoriesService.uploadImage(event.target.files[0]).subscribe(
      response => {
        newCategory.image = response.filename;
        this.categoriesService.updateCategory(newCategory).subscribe(() => {
          const newCategories: Category[] = [];
          this.categories.forEach(category => {
            if (category.id === newCategory.id) {
              category.image = Server.url + '/images/get/' + newCategory.image;
            }
            newCategories.push(category);
          });
          this.categories = newCategories;
        });
      }
    );
  }

  changeUpdateCategoryTitle(newCategory: Category) {
    newCategory.title = this.updateCategoryTitle;
    newCategory.image = newCategory.image.split('/')[newCategory.image.split('/').length - 1];
    this.categoriesService.updateCategory(newCategory).subscribe(() => {
      const newCategories: Category[] = [];
      this.categories.forEach(category => {
        if (category.id === newCategory.id) {
          category.title = newCategory.title;
        }
        newCategories.push(category);
      });
      this.categories = newCategories;
      this.updatedCategory = 0;
    });
  }

  deleteCategory(id: number) {
    this.categoriesService.removeCategory(id).subscribe(
      () => this.categories = this.categories.filter(category => category.id !== id)
    );
  }

  saveNewSubCategory() {
    const subCategory = {
      id: null,
      categoryId: this.activeCategory.id,
      title: this.newSubCategoryTitle,
    };
    this.categoriesService.addSubCategory(subCategory).subscribe(responses => {
      subCategory.id = responses.id;
      this.subCategories.push(subCategory);
      this.newSubCategoryTitle = '';
    });
  }

  changeUpdateSubCategoryTitle(newSubCategory: SubCategory) {
    newSubCategory.title = this.updateSubCategoryTitle;
    this.categoriesService.updateSubCategory(newSubCategory).subscribe(() => {
      const newSubCategories: SubCategory[] = [];
      this.subCategories.forEach(subCategory => {
        if (subCategory.id === newSubCategory.id) {
          subCategory.title = newSubCategory.title;
        }
        newSubCategories.push(subCategory);
      });
      this.subCategories = newSubCategories;
      this.updatedSubCategory = 0;
    });
  }

  deleteSubCategory(id: number) {
    this.categoriesService.removeSubCategory(id).subscribe(
      () => this.subCategories = this.subCategories.filter(subCategory => subCategory.id !== id)
    );
  }
}
