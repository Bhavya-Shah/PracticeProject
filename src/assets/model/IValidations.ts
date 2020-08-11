export interface IValidations{
    required: { value: boolean, message: string } | null,
    maxLength: { value: number, message: string } | null,
    minLength: { value: number, message: string } | null,
    max: { value: number, message: string } | null,
    min: { value: number, message: string } | null,
    pattern: { value: string, message: string }| null
}