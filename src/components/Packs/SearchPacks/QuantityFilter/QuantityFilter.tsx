import React from 'react';
import style from '../SearchParameters.module.css';
import Slider from '@mui/material/Slider';
import {TextField} from '@material-ui/core';


const QuantityFilter: React.FC = () => {
    const [value, setValue] = React.useState<number[]>([20, 110]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };
    return (
        <div className={style.quantity_filter}>
            <h3>Number of cards</h3>
           <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
               <TextField style={{width:"55px"}} variant="outlined" size="small"/>
               <Slider style={{width:"60%"}}
                   getAriaLabel={() => 'Temperature range'}
                   value={value}
                   onChange={handleChange}
                   valueLabelDisplay="auto"
                   max={110}
                   // getAriaValueText={valuetext}
               />
               <TextField style={{width:"55px"}} variant="outlined" size="small"/>
           </div>
        </div>
    );
};

export default QuantityFilter;