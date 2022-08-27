import React from 'react';
import {Spin} from 'antd';
import style from './Preloader.module.css';

const Preloader: React.FC = () => {
    return (
      <div className={style.preloader}>
          <Spin  size={'large'}/>
      </div>

    );
};

export default Preloader;