import React, {ChangeEvent, useEffect, useState} from 'react';
import style from './QuantityFilter.module.css';
import Slider from '@mui/material/Slider';
import useDebounce from 'usehooks-ts/dist/esm/useDebounce/useDebounce';

type QuantityFilterPropsType = {
    setMin: (min: number) => void,
    setMax: (min: number) => void,
}

const QuantityFilter: React.FC<QuantityFilterPropsType> = ({setMin, setMax}) => {
    const [value, setValue] = React.useState<number[]>([0, 110]);
    const [minimun, setMinimum] = useState(value[0]);
    const [maximun, setMaximum] = useState(value[1]);
    const debouncedMin = useDebounce(value[0], 1500);
    const debouncedMax = useDebounce(value[1], 1500);
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.dataset.quantity) {
            const trigger: string = event.currentTarget.dataset.quantity;
            if (trigger === 'minimum') {
                setMinimum(+event.currentTarget.value);
                setValue([+event.currentTarget.value, value[1]]);
            }
            if (trigger === 'maximum') {
                setMaximum(+event.currentTarget.value);
                setValue([value[0], +event.currentTarget.value]);
            }
        }
    };
    useEffect(() => {
        setMin(value[0]);
        setMax(value[1]);
    }, [debouncedMin, debouncedMax]);
    return (
        <div className={style.quantity_filter}>
            <h3>Number of cards</h3>
            <div className={style.quantity_parameters}>
                <input type="number" value={value[0]} onChange={onChangeHandler} data-quantity="minimum"/>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    max={110}
                />
                <input value={value[1]} onChange={onChangeHandler} data-quantity="maximum"/>
            </div>
        </div>
    );
};

export default QuantityFilter;