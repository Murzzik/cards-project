import React from 'react';
import style from '../SearchParameters.module.css';
import Slider from '@mui/material/Slider';

type QuantityFilterPropsType = {
    setMin: (min: number) => void,
    setMax: (min: number) => void,
}

const QuantityFilter: React.FC<QuantityFilterPropsType> = ({setMin, setMax}) => {
    const [value, setValue] = React.useState<number[]>([0, 110]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
        // @ts-ignore
        setMin(newValue[0]);
        // @ts-ignore
        setMax(newValue[1]);
    };
    return (
        <div className={style.quantity_filter}>
            <h3>Number of cards</h3>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Slider style={{width: '60%'}}
                        getAriaLabel={() => 'Temperature range'}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        max={110}
                    // getAriaValueText={valuetext}
                />
            </div>
        </div>
    );
};

export default QuantityFilter;