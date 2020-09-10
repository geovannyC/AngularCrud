import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class UserService {


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  constructor(private http: HttpClient) { }
  url = 'http://localhost:3000'
  getData():  Observable<any>{
    return this.http.get(this.url+'/verCategorias', this.httpOptions)
  }

  addUser(user: User) {
    console.log('hola add')
    return this.http.post(this.url+'/addcategoria',user, this.httpOptions)
  }
  deleteUser(id: any) {
    console.log(id)
    return this.http.get(this.url+ `/deleteUser/${id}`, this.httpOptions)
  }
}
