import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class UserService {

  private upersons: User[] = [
    {id: 1, cod_categoria:"String",nombre:"String",descripcion:"String",fechaCreacion:"String"},
   
  ];
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  constructor(private http: HttpClient) { }
  url = 'http://localhost:3000'
  getUsersFromData(): User[] {
    return this.upersons;
  }
  getData(){
    return this.http.get(this.url+'/verCategorias', this.httpOptions)
  }

  addUser(user: User) {
    user.id = this.upersons.length + 1;
    this.http.post(this.url+'/añadirCategoria',user, this.httpOptions);

  }

  deleteUser(id: any) {
    this.http.get(this.url+ `/deleteUser/${id}`, this.httpOptions)
  }

}
