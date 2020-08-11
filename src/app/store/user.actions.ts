import { Action } from '@ngrx/store'
import { IUserForm } from 'src/assets/model/IUserForm';
import { HttpErrorResponse } from '@angular/common/http';

export enum UserActionTypes {
    GetUserFormLoad = '[UserForm] Get User Form Load',
    GetUserFormFail = '[UserForm] Get User Form Fail',
    GetUserFormSuccess = '[UserForm] Get User Form Success'
}

export class GetUserFormLoad implements Action {
    public readonly type = UserActionTypes.GetUserFormLoad;
}
export class GetUserFormSuccess implements Action {
    public readonly type = UserActionTypes.GetUserFormSuccess;
    constructor(public payload: IUserForm[]){}
}
export class GetUserFormFail implements Action {
    public readonly type = UserActionTypes.GetUserFormFail;
    constructor(public error: HttpErrorResponse){}
}

export type UserFormActions = GetUserFormFail | GetUserFormLoad | GetUserFormSuccess
