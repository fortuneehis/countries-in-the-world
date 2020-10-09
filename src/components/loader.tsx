import React from 'react';
import style from '../css/loader.module.css';
import {motion} from 'framer-motion';

const Loader: React.FC = () => {
  return (
      <div className={style.wrapper}>
          <motion.div 
            initial={{borderRadius: '20px',
                      scale: 1,         
                    }}
            animate={{borderRadius: '50%',
                      scale: .7,
                      rotateY: 360
                    }}
            transition={{yoyo: Infinity,
                         duration: .5
                        }}
            className={style.loader}>

          </motion.div>
      </div>
  );
}

export default Loader