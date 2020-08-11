import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { IAppState } from './store/user.reducer'
import { Subscription } from 'rxjs';
import { userFields } from './store/user.selector'
import { IUserForm } from 'src/assets/model/IUserForm';
import { GetUserFormLoad } from './store/user.actions';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy, OnInit {

  subcription: Subscription[] = [];
  userForm: IUserForm[];
  userFormGroup: FormGroup;
  controls = {};
  isDataAvailable: boolean = false;

  constructor(private form: FormBuilder,
    private store: Store<IAppState>,
    private spinner: NgxSpinnerService) {
    this.store.dispatch(new GetUserFormLoad())
    this.subcription.push(this.store.pipe(select(userFields)).subscribe(
      res => {
        this.userForm = res.user;
      }
    ));
  }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      if (this.userForm) {
        this.userForm.forEach(res => {
          const validationArray = [];
          if (res.validations) {
            if (res.validations.required) {
              if (res.validations.required.value) {
                validationArray.push(
                  Validators.required
                );
              }
            }
            if (res.validations.pattern) {
              if (res.validations.pattern.value) {
                validationArray.push(
                  Validators.pattern(res.validations.pattern.value)
                );
              }
            }
            if (res.validations.maxLength) {
              if (res.validations.maxLength.value) {
                validationArray.push(
                  Validators.maxLength(res.validations.maxLength.value)
                );
              }
            }
            if (res.validations.minLength) {
              if (res.validations.minLength.value) {
                validationArray.push(
                  Validators.minLength(res.validations.minLength.value)
                );
              }
            }
            if (res.validations.max) {
              if (res.validations.max.value) {
                validationArray.push(
                  Validators.max(res.validations.max.value)
                )
              }
            }
            if (res.validations.min) {
              if (res.validations.min.value) {
                validationArray.push(
                  Validators.min(res.validations.min.value)
                )
              }
            }
          }
          if (res.formControlName) {
            this.controls[res.formControlName] = new FormControl(null, validationArray);
          }
          else {
            this.controls[res.formArrayName] = new FormArray([], validationArray)
          }
        });
      }
      this.userForm = this.userForm.slice().sort((a,b)=>a.key-b.key);
      this.userFormGroup = this.form.group(this.controls);
      console.log(this.userFormGroup)
      this.isDataAvailable = true;
      this.spinner.hide();
    }, 2000);
  }

  onSubmit() {
    console.log("After submitting the form: ", this.userFormGroup.value);
    alert(JSON.stringify(this.userFormGroup.value))
  }

  toggleClass() {
    if (this.userFormGroup.valid)
      return { 'btn-primary': true }
    else
      return { 'btn-outline-primary': true }
  }

  ngOnDestroy() {
    this.subcription.forEach(items => items.unsubscribe());
  }
}
