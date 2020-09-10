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

  saveUser(user: User): boolean {
      this.userService.addUser(user).subscribe(
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


  removeUser(user) {
    
    this.userService.deleteUser(user).subscribe((data)=>{
      if(data==='eliminado exitosamente'){
        this.switchAlertDeleted()
        this.getFoods()
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
