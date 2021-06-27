import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http:HttpClient) { }
  url = "http://localhost:3000/expense";

  getAllExpense(){
    return this.http.get(this.url);
  }
  getExpenseById(id:any){
    return this.http.get(this.url +'/' + id);
  }
  createExpense(body:any){
    return this.http.post(this.url,body);
  }
  updateExpense(body,id){
    return this.http.patch(this.url +'/' + id,body);
  }
  deleteExpense(id){
    return this.http.delete(this.url +'/' + id);
  }

}
