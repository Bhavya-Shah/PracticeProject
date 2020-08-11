import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserForm } from '../assets/model/IUserForm';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private userFormUrl = "assets/json/user.form.json";
  userForm: IUserForm[];
  constructor(private http: HttpClient){}

  public getUserFormDataFromLocalJSON(): Observable<IUserForm[]>{
    return this.http.get<IUserForm[]>(this.userFormUrl);
  }
}
