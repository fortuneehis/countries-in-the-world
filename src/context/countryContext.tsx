import React, {createContext, useReducer} from 'react';
import { filterCountries, getAllCountries, getSingleCountry } from '../service/service';
import { State, Props } from '../types';
import Reducer from './countryReducer';
import { ERROR, GET_ALL_COUNTRIES, LOADING, GET_COUNTRY, HAS_MORE } from './constants';



export const CountryContext =  createContext<any>(null)

const initialState: State = {
    countries: [],
    country: [],
    loading: true,
    hasMore: true,
    error: ''
}

function Context({children}: Props) {
    const [state, dispatch] = useReducer(Reducer, initialState)

    const setError = (message: string) => {
        dispatch({
            type: ERROR,
            payload: message
        })
    }

    const setLoading = (param: boolean) => {
        dispatch({
            type: LOADING,
            payload: param
        })
    }

    const getCountries = (pageLimit: number = 0): void => {
        getAllCountries('/all').then((response:any)=>{
            let paginatedData = response.data.slice(0,pageLimit)
            setLoading(false)
            setError('')
            dispatch({
                type: HAS_MORE,
                payload: true
            })
            dispatch({
                type: GET_ALL_COUNTRIES,
                payload: [...paginatedData]
            })
        }).catch((err: Error)=>setError(err.message))
    }

    const getCountry = (query: string): void => {
        getSingleCountry('/name', query).then((response:any)=>{
            setLoading(false)
            setError('')
            dispatch({
                type: GET_COUNTRY,
                payload: response.data
            })
        }).catch((err: Error)=>setError(err.message))
    }

    const searchCountries = (query: string, pageLimit: number): void => {
        filterCountries('/name', query).then((response: any)=>{
            setLoading(false)
            dispatch({
                type: HAS_MORE,
                payload: false
            })
            dispatch({
                type: GET_ALL_COUNTRIES,
                payload: [...response.data]
            })
        }).catch((err: Error)=>setError(err.message))
    }


    return (
        <CountryContext.Provider value={{
            getCountries,
            searchCountries,
            getCountry,
            hasMore: state.hasMore,
            countries: state.countries,
            country: state.country,
            loading: state.loading,
            setLoading,
            error: state.error
        }}>
            {children}
        </CountryContext.Provider>
    );
}

export default Context
