import { createFeatureSelector, createSelector} from "@ngrx/store";
import { IAppState } from "./user.reducer";

const getUserForm = createFeatureSelector<IAppState>('userForm');

export const userFields = createSelector(getUserForm, (state: IAppState) => {
    return state;
});

