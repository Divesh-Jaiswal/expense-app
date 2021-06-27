import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {users} from '../users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users = users;
  currentUser;
  errMsg=null;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){

   this.currentUser  = this.users.filter(el =>{
     return el.email == form.value.email && el.password == form.value.password
   })
   if(this.currentUser[0]){
     console.log(this.currentUser[0]);
     localStorage.setItem("user",JSON.stringify(this.currentUser[0]));
      this.router.navigate(['/expense-list']);
   }
   if(!this.currentUser[0]){
     this.errMsg ='Invalid Credentials'
     setTimeout(() =>this.errMsg =null,1000)
   }
    
  }

}
