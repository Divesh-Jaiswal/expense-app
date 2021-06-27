import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.css']
})
export class ExpenseDetailComponent implements OnInit {

  img =
    'https://png.pngtree.com/png-vector/20190810/ourmid/pngtree-budget-consumption-costs-expenses-finance--blue-and-red-down-png-image_1655027.jpg';
  expenseId;
  expenseDetail;
  constructor(private _route: ActivatedRoute,private _api:ExpenseService) { }

  ngOnInit(): void {
    this.expenseId = this._route.snapshot.params.id;
    console.log(this.expenseId);
    this._api.getExpenseById(this.expenseId).subscribe((res:any)=>{
      if(res){
        this.expenseDetail = res;
      }
    },(err)=>{
      console.log(err);
    })

  }

}
