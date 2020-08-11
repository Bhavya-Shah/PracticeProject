import { IUserForm } from '../../assets/model/IUserForm'
import { UserActionTypes, UserFormActions } from './user.actions';

export interface IAppState {
    user: IUserForm[],
    isLoading: boolean;
}

const INITIAL_STATE: IAppState = {
    user: [],
    isLoading: false
}

export function rootReducer(state = INITIAL_STATE, action: UserFormActions): IAppState{
    switch (action.type)
    {
        case UserActionTypes.GetUserFormLoad: {
            return {
                ...state,
                isLoading: true
            }
        }
        case UserActionTypes.GetUserFormSuccess:{
            return {
                ...state,
                user: action.payload,
                isLoading: false
            }
        }
        case UserActionTypes.GetUserFormFail:{
            return{
                user: [],
                isLoading: false
            }
        }
        default:
            return state;
    }
}