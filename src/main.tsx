import React, { useEffect, useState, useContext } from 'react';
import style from './css/main.module.css';
import {AnimatePresence, motion} from 'framer-motion';
import SearchBar from './components/searchbar';
import Country from './components/country';
import {ReactComponent as Population} from './svg/crowd-of-users.svg';
import {ReactComponent as Capital} from './svg/bank-building.svg';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { CountriesType } from './types';
import { CountryContext } from './context/countryContext';
import { numberFormat } from './helpers';
import Loader from './components/loader';
import { Paginator } from './components/scrollWrapper';


function Main() { 
    const location = useLocation()
    const history = useHistory()
    const offset = 12
    const [pageLimit, setPageLimit] = useState(0)
    const {getCountries, loading, setLoading, countries, error, hasMore} = useContext(CountryContext)

    useEffect(()=>{
        getCountries(pageLimit)
    },[pageLimit])
  return (
      <>
        <AnimatePresence>
            <Switch location={location} key={location.key}>
                <Route exact path="/country/:name">
                    <Country/>
                </Route>
            </Switch>
        </AnimatePresence>
        <section className={style.home}>
            <div className={style.container}>
                <motion.h1 
                initial={{y: -20, opacity: 0}} 

                animate={{opacity:1,
                          y: 0}} 

                transition={{type: "spring", 
                            stiffness: 300}}
                >Countries in the World</motion.h1>
                <p>made with ReactJS (Typescript), Axios, <a target="_blank" rel="noopener noreferrer" href="http://www.restcountries.eu">restcountries.eu</a> API</p>
                <SearchBar/>
            </div>
        </section>
        <section className={style.row}>
           { countries && countries.map((country: CountriesType, index: number)=>
                <motion.div 
                key={index}
                whileTap={{scale: .8}}
                className={style.column}
                onClick={()=>history.push(`/country/${country.name}`)}>
                <img className={style.img} src={country.flag} alt={country.name} />
                <h1>{country.name}</h1>
                <div className={style.wrapper}>
                    <div className={style.icongroup}>
                        <Population/>
                        <p>{numberFormat(country.population)}</p>
                    </div>
                    <div className={style.icongroup}>
                        <Population/>
                        <p>{country.region}</p>
                    </div>
                    <div className={style.icongroup}>
                        <Capital/>
                        <p>{country.capital}</p>
                    </div>
                </div>
            </motion.div>
            
           )}
           {error.length > 0 && <motion.div
            initial={{scale: .9}}
            animate={{scale: 1}}
            transition={{yoyo: Infinity}}
            whileTap={{scale: .9}}
            onClick={()=>history.go(0)}
            className={style.error}>{error}! <button>Retry</button></motion.div> }

        </section>
        <Paginator hasMore={hasMore}>
            {()=>{
               setLoading(true)
               setPageLimit(prevState=> prevState + offset) 
            }}</Paginator> 

        {loading && <Loader/>}
    </>
  );
}

export default Main;
