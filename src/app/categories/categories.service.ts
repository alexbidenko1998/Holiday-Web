import { Injectable } from '@angular/core';
import {Category} from './category';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Server} from '../server';
import {Observable} from 'rxjs';
import {SubCategory} from './sub-category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(Server.url + '/categories/all');
  }

  getSubCategories(): Observable<SubCategory[]> {
    return this.httpClient.get<SubCategory[]>(Server.url + '/categories/sub/all');
  }

  uploadImage(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData.get('file'));
    return this.httpClient.post(Server.url + '/images/add', formData, {
      headers: new HttpHeaders({
        Token: localStorage.getItem('token')
      })
    });
  }

  addCategory(category: Category): Observable<any> {
    return this.httpClient.post(Server.url + '/categories/add', category, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Token: localStorage.getItem('token')
      })
    });
  }

  updateCategory(category: Category): Observable<any> {
    return this.httpClient.put(Server.url + '/categories/update/' + category.id, category, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Token: localStorage.getItem('token')
      }),
      observe: 'response'
    });
  }

  removeCategory(id: number): Observable<any> {
    return this.httpClient.delete(Server.url + '/categories/delete/' + id, {
      headers: new HttpHeaders({
        Token: localStorage.getItem('token')
      })
    });
  }

  addSubCategory(subCategory: SubCategory): Observable<any> {
    return this.httpClient.post(Server.url + '/categories/sub/add', subCategory, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Token: localStorage.getItem('token')
      })
    });
  }

  updateSubCategory(subCategory: SubCategory): Observable<any> {
    return this.httpClient.put(Server.url + '/categories/sub/update/' + subCategory.id, subCategory, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Token: localStorage.getItem('token')
      }),
      observe: 'response'
    });
  }

  removeSubCategory(id: number): Observable<any> {
    return this.httpClient.delete(Server.url + '/categories/sub/delete/' + id, {
      headers: new HttpHeaders({
        Token: localStorage.getItem('token')
      })
    });
  }
}
