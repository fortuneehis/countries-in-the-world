import {State} from '../types';
import { GET_ALL_COUNTRIES, LOADING, ERROR, GET_COUNTRY, HAS_MORE } from './constants';

export default (state: State, action: any): State => {
    switch(action.type) {
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                countries: action.payload
            }
        case GET_COUNTRY:
            return {
                ...state,
                country: action.payload
            }
        case LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case ERROR:
            return {
                ...state,
                error: action.payload
            }
        case HAS_MORE:
            return {
                ...state,
                hasMore: action.payload
            }
        default:
            return state
    }
}