import React, { useEffect, useContext } from 'react';
import style from '../css/country.module.css';
import {motion} from 'framer-motion';
import {useHistory, useParams } from 'react-router-dom';
import { CountryType, RouteParams } from '../types';
import { CountryContext } from '../context/countryContext';
import { numberFormat } from '../helpers';
import Loader from './loader';
 
function Country() {
  const history = useHistory()
  const {getCountry, country, loading, setLoading} = useContext(CountryContext)
  let {name}: RouteParams = useParams()

  useEffect(()=>{
    setLoading(true)
    getCountry(name)
  },[name])
  
  return (
    <motion.div 
      exit={{display: 'none'}}
      className={style.wrapper}>
      <motion.div
        initial={{scale: 0}}
        animate={{scale: 1}}
        exit={{scale: 0}}
        className={style.container}>
          {loading && <Loader/>}
        <motion.button 
          whileTap={{scale: .7}}
          onClick={()=>history.push('/')}>X</motion.button>
          
          <div className={style.properties}>
            {country && country.map((object: CountryType, index: number)=>(
              <div key={index} className={style.properties}>
                <img src={object.flag} className={style.map} />
                <div className={style.content}>
                  <h3>Name</h3>
                  <p>{object.name}</p>
                </div>
                <div className={style.content}>
                  <h3>Native Name</h3>
                  <p>{object.nativeName}</p>
                </div>
                <div className={style.content}>
                  <h3>Capital</h3>
                  <p>{object.capital}</p>
                </div>
                <div className={style.content}>
                  <h3>Population</h3>
                  <p>{ numberFormat(object.population)}</p>
                </div>
                <div className={style.content}>
                  <h3>Region</h3>
                  <p>{object.region}</p>
                </div>
                <div className={style.content}>
                  <h3>Sub Region</h3>
                  <p>{object.subregion}</p>
                </div> 
                <div className={style.content}>
                  <h3>Top Level Domain</h3> 
                  <p>{object.topLevelDomain}</p>
                </div>
                <div className={style.content}>
                  <h3>Currencies</h3> 
                  {object.currencies.map((currency, index: number)=>
                        <p key={index}>{currency.name}</p>
                  )}
                </div>
                {object.borders.length > 0 ? 
                <div className={style.borders}>
                  <h3>Borders</h3>
                  <ul className={style.items}>
                    {object.borders.map((border, index)=>
                      <li key={index}>{border}</li>  
                    )}
                </ul>
                </div> : null}
              </div>
            ))}
             </div>
            
      </motion.div>
    </motion.div>
  );
}

export default Country;
