import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-expense-create',
  templateUrl: './expense-create.component.html',
  styleUrls: ['./expense-create.component.css']
})
export class ExpenseCreateComponent implements OnInit {

  message = null;
  expenseId;
  expenseDetail;
  isEditable = false;
  @ViewChild('form', { static: false }) updateForm: NgForm;

  constructor(private _api: ExpenseService, private _route: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.expenseId = this._route.snapshot.params.id;
    if (this.expenseId) {
      this.spinner.show();
      this._api.getExpenseById(this.expenseId).subscribe((data: any) => {
        this.expenseDetail = data;
        console.log(this.expenseDetail);
        this.updateForm.form.patchValue({
          id: this.expenseDetail.id,
          title: this.expenseDetail.title,
          amount: this.expenseDetail.amount,
          date: this.expenseDetail.date,
        });
        this.isEditable = true;
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      });
    }
  }
  onSubmit(form: NgForm) {
    this.spinner.show();
    let body = {
      id: +form.value.id,
      title: form.value.title,
      amount: +form.value.amount,
      date: form.value.date,
    };
    console.log(body);
    if (!this.isEditable) {
      this._api.createExpense(body).subscribe((res: any) => {
        if (res) {
          console.log('created', res);
          setTimeout(() => {
            this.message = "Expense Created Successfully!!"
            form.reset();
            this.spinner.hide();
          }, 400);
        }
      }, err => {
        this.message = "Something went wrong";
        this.spinner.hide();
      })
    }
    if (this.isEditable) {
      this._api.updateExpense(body, this.expenseId).subscribe((res: any) => {
        if (res) {
          console.log('update', res);
          setTimeout(() => {
            this.message = "Expense updated Successfully!!"
            form.reset();
            this.spinner.hide();
          }, 400)
        }
      }, err => {
        this.message = "Something went wrong";
        this.spinner.hide();
      })
    }


  }

}
