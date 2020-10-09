
export const numberFormat = (value: number): string =>{
    return new Intl.NumberFormat().format(value)
}