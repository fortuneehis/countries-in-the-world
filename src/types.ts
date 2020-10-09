export interface CountriesType {
    name : string,
    population : number,
    flag: string,
    capital: string,
    region: string,
}

export interface CountryType {
    name: string,
    population : number,
    flag: string,
    capital: string,
    region: string,
    nativeName: string,
    topLevelDomain: string, 
    subregion: string,
    currencies: {name: string}[],
    borders: string[]
}

export interface RouteParams {
    name ?: string
}

export interface Props {
    children: JSX.Element
}

export interface State {
    countries: CountriesType[],
    country: CountryType[],
    loading: boolean,
    error: string,
    hasMore: boolean
}

