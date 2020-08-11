import { Injectable } from '@angular/core';
import { Actions, Effect, ofType} from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { UserActionTypes, GetUserFormSuccess, GetUserFormFail } from './user.actions';
import { AppService } from '../app.service';
import { Observable, of } from 'rxjs';
import { IUserForm } from 'src/assets/model/IUserForm';
import { Action } from '@ngrx/store';
 
@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private appService: AppService) {}
  
  @Effect()
  UserActions$: Observable<Action> = this.actions$.pipe(
      ofType(UserActionTypes.GetUserFormLoad),
      mergeMap(()=> 
          this.appService.getUserFormDataFromLocalJSON().pipe(
              map((userForm: IUserForm[])=>{
                  return new GetUserFormSuccess(userForm)
              }),
              catchError((error)=> 
              of(new GetUserFormFail(error)))
          )
      )
  )
}   
