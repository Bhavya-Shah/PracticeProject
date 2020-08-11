import { Component, OnInit, Input } from '@angular/core';
import { IUserForm } from '../../assets/model/IUserForm';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form-field',
  templateUrl: './user-form-field.component.html',
  styleUrls: ['./user-form-field.component.scss']
})
export class UserFormFieldComponent implements OnInit {

  @Input() userFormGroup: FormGroup;
  @Input() field: IUserForm;
  calculatedAge: number = 19;
  // formElement: any;
  constructor() { }

  ngOnInit(): void {
    this.userFormGroup.get('DOB').valueChanges.subscribe(val => {
      var convertIntoDate = [val.slice(0, 4), '-', val.slice(4, 6), '-', val.slice(6)].join('');
      var birthDate = new Date(convertIntoDate).getTime();
      var timeDiff = Math.abs(Date.now() - birthDate);
      this.calculatedAge = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    })
    // var form = document.getElementById('dynamicForm');
    // var formGroup: HTMLElement = <HTMLElement>document.createElement('div')
    // formGroup.className="form-group";

    // if(this.field.tag == 'input'){
    //   this.formElement = <HTMLInputElement>document.createElement(this.field.tag);
    //   this.createFormElement(this.formElement);
    //   formGroup.appendChild(this.createLabel());
    //   formGroup.appendChild(this.formElement);
    //   form.appendChild(formGroup)
    // }
    // else if(this.field.tag == 'select'){
    //   this.formElement = <HTMLSelectElement>document.createElement(this.field.tag);
    //   this.createFormElement(this.formElement);

    //   // var optionElement: HTMLOptionElement = <HTMLOptionElement>document.createElement('option');
    //   // this.field.ids.forEach(res=>{ optionElement.value = res.value, optionElement.innerHTML = res.text})
    //   // formElement.appendChild(optionElement);

    //   formGroup.appendChild(this.createLabel());
    //   formGroup.appendChild(this.formElement);
    //   form.appendChild(formGroup);
    // }
    // else if(this.field.tag == 'textarea'){

    //   this.formElement = <HTMLTextAreaElement>document.createElement(this.field.tag);
    //   this.createFormElement(this.formElement);
    //   formGroup.appendChild(this.createLabel());
    //   formGroup.appendChild(this.formElement);
    //   form.appendChild(formGroup);
    // }
  }

  //   createLabel(){
  //     var label: HTMLLabelElement = <HTMLLabelElement>document.createElement('label')
  //     label.htmlFor = this.field.label;
  //     label.innerHTML = this.field.label;
  //     return label;
  //   }

  //   createFormElement(formElement){
  //     if(this.field.type == 'input'){
  //       formElement.type = this.field.type;
  //     }
  //     formElement.id = this.field.id;
  //     formElement.name = this.field.name;
  //     formElement.placeholder = this.field.placeholder;
  //     formElement.className = this.field.class;
  //     formElement.setAttribute('formControlName', this.field.formControlName)
  // }

  onChange(e) {
    const formArray: FormArray = this.userFormGroup.get('services') as FormArray;
    if (e.target.checked) {
      formArray.push(new FormControl(e.target.value))
    }
    else {
      let i: number = 0;
      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == e.target.value) {
          formArray.removeAt(i)
        }
        i++;
      });
    }
  }
  
  toggleClass() {
    if (this.field.isDisabled) {
      if (this.userFormGroup.controls['DOB'].valid) {
        if (this.calculatedAge > 18) {
          return { 'd-none': true }
        }
        else {
          this.userFormGroup.get('parentName').updateValueAndValidity()
          this.userFormGroup.get('parentName').setValidators([
            Validators.required,
            Validators.maxLength(25),
            Validators.pattern('^[a-zA-Z]+$')])
          this.userFormGroup.get('parentContact').updateValueAndValidity()
          this.userFormGroup.get('parentContact').setValidators([
            Validators.required,
            Validators.pattern('^(\\+\\d{2,4})?\\s?(\\d{10})$')])
          return { 'd-none': false }
        }
      }
      else {
        return { 'd-none': true }
      }
    }
  }
}
