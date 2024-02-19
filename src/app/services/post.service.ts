import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private _http: HttpClient) { }

  addPost(data : any): Observable <any> {
    return this._http.post('http://localhost:3000/posts', data); //esto devuelve un observable
  }
  
  updatePost(id: number, data : any): Observable <any> {
    return this._http.put(`http://localhost:3000/posts/${id}`, data); //esto devuelve un observable
  }

  getPostList(): Observable <any> {
    return this._http.get('http://localhost:3000/posts'); //esto devuelve un observable
  }
  
  deletePost(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/posts/${id}`);
  }


}
