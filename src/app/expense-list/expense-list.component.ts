import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  p: number = 1;
  expenseArray = [];
  searchExpenseArray = [];
  constructor(private _api: ExpenseService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getExpenseList();
  }

  getExpenseList(){
    this.spinner.show();
    this._api.getAllExpense().subscribe((res: any) => {
      if (res) {
        this.expenseArray = res;
        this.searchExpenseArray =res;
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      }
    }, (err) => {
      console.log(err);
      this.spinner.hide();
    })
  }

  onSearch(event){
    let key = event.target.value;
    if (key !== '') {
      this.expenseArray = this.searchExpenseArray.filter((el) => {
        return el.title.search(new RegExp(key, 'i')) > -1;
      });
    } else {
      this.getExpenseList();
    }
  }

  onDeleteExpense(id) {
    if (window.confirm('are you sure you want to delete this?')) {
      this._api.deleteExpense(id).subscribe((data) => {
        console.log(data);
        this.getExpenseList();
      });
    }
  }

}
