import { AxiosResponse } from 'axios';
import service from './serviceConfig';


export const getAllCountries = async(url: string): Promise<AxiosResponse<any>> =>{
    return await service().get(`${url}?fields=name;capital;region;flag;population`)
}

export const getSingleCountry = async(url: string, query: string): Promise<AxiosResponse<any>> =>{
    return await service().get(`${url}/${query}?fullText=true`)
}

export const filterCountries = async(url: string, query: string) => {
    return await service().get(`${url}/${query}`)
}
