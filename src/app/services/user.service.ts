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
  getDataSubCategorias(id):  Observable<any>{
    return this.http.get(this.url+`/versubcategorias/${id}`, this.httpOptions)
  }

  addUser(descripcion: string) {
    const data = {
      descripcion: descripcion
    }
    console.log(data)
    return this.http.post(this.url+'/addcategoria',JSON.stringify(data), this.httpOptions)
  }
  addSubCategoria(subcategoria, id){
    return this.http.post(this.url+`/addsubcategoria/${id}`,JSON.stringify(subcategoria), this.httpOptions)

  }
  deleteUser(id: any) {
    console.log(id)
    return this.http.get(this.url+ `/deletecategoria/${id}`, this.httpOptions)
  }
  deleteSubCategoria(id: any) {
    console.log(id)
    return this.http.get(this.url+ `/deletesubcategoria/${id}`, this.httpOptions)
  }
}
