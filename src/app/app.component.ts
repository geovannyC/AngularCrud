import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  alert: boolean = false;
  alertDelete: boolean = false;
  users: any = [];
  userForm: boolean;
  isNewUser: boolean;
  newUser: any = {};
  editUserForm: boolean;
  editedUser: any = {};
  descripcionCategoria: string;
  handleChangeCategoria: string;
  selectedValue = '1';
  subcategorias: any = [];
  constructor(private userService: UserService) { }

  ngOnInit() {
    // this.users = this.getUsers();

    this.getFoods()
  }
  switchAlert(){
    this.alert?this.alert=false:this.alert=true
  }
  switchAlertDeleted(){
    this.alertDelete?this.alertDelete=false:this.alertDelete=true
  }
  getFoods() {
      this.userService.getData().subscribe(
         data => { 
          console.log(data) 
          this.users = data},
         err => console.error(err),
         () => console.log('done loading foods')
        );
      
     }


  showAddUserForm() {
    // resets form if edited user
    if (this.users.length) {
      this.newUser = {};
    }
    this.userForm = true;
    this.isNewUser = true;

  }
  showcategoria(idCategoria){
 
    this.userService.getDataSubCategorias(idCategoria).subscribe(
      
      res=>{
        console.log(res)
        this.subcategorias=res
      }
    )
  }
  getSelectedValue(value: any) {
    console.log(value)
    this.handleChangeCategoria=value
    this.showcategoria(value)
  }
  saveUser(): boolean {
    
      this.userService.addUser(this.descripcionCategoria).subscribe(
        res=>{
          if(res==='creadoexitosamente'){
            
            this.getFoods()
            this.switchAlert()
          }else{
            alert('error en el servidor')
          }
          
        
        }
      )

    this.userForm = false;
    return true 
  }
  saveSubCategoria(): boolean {

    this.userService.addSubCategoria(this.newUser, this.handleChangeCategoria).subscribe(
      res=>{
        if(res==='creadoexitosamente'){
          this.showcategoria(this.handleChangeCategoria)
          
          this.switchAlert()
        }else{
          alert('error en el servidor')
        }
        
      
      }
    )

  this.userForm = false;
  return true 
}


  removeUser(user) {
    
    this.userService.deleteSubCategoria(user).subscribe((data)=>{
      if(data==='eliminado exitosamente'){
        this.switchAlertDeleted()
        this.showcategoria(this.handleChangeCategoria)
      }else{
        alert('error en el servidor')
      }
    })
  }
  removeCategoria() {
    
    this.userService.deleteUser(this.handleChangeCategoria).subscribe((data)=>{
      if(data==='eliminado exitosamente'){
        this.switchAlertDeleted()
        this.getFoods()
        this.handleChangeCategoria=''

      }else{
        alert('error en el servidor')
      }
    })
  }
  cancelNewUser() {
    this.newUser = {};
    this.userForm = false;
  }

}
