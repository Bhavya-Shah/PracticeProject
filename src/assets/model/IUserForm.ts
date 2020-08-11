import { IValidations } from "./IValidations";

export interface IUserForm{
    key: number,
    type: string,
    class: string,
    id: string,
    name: string,
    mask: string | null,
    placeholder: string,
    formControlName: string,
    label: string,
    tag: string,
    isDisabled: boolean
    validations: IValidations | null,
    ids: [{
        id: number,
        value: string, 
        text: string
    }] | null,
    options: {
        value: string,
        text: string
    } | null,
    formArrayName: string | null
}