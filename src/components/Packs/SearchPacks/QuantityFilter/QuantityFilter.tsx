import React, { ChangeEvent, useEffect } from 'react';
import style from './QuantityFilter.module.css';
import Slider from '@mui/material/Slider';
import useDebounce from 'usehooks-ts/dist/esm/useDebounce/useDebounce';
import { useSearchParams } from 'react-router-dom';

type QuantityFilterPropsType = {}

const QuantityFilter: React.FC<QuantityFilterPropsType> = () => {
    const [searchParameters, setSearchParameters] = useSearchParams();
    const min = Number(searchParameters.get('min'));
    let max = Number(searchParameters.get('max'));
    if(max === 0) max = 110;

    const [value, setValue] = React.useState<number[]>([min, max]);

    const debouncedMin = useDebounce(value[0], 1500);
    const debouncedMax = useDebounce(value[1], 1500);

    // const inputMin = value[0].toString().replace(/^0+/, '');
    // const inputMax = value[1].toString().replace(/^0+/, '');

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.currentTarget.dataset.quantity) {
            const trigger: string = event.currentTarget.dataset.quantity;
            if(trigger === 'minimum') {
                setValue([+event.currentTarget.value, value[1]]);
            }
            if(trigger === 'maximum') {
                setValue([value[0], +event.currentTarget.value]);
            }
        }
    };

    useEffect(() => {
        if(value[0] === 0) {
            searchParameters.delete('min');
            setSearchParameters({...Object.fromEntries(searchParameters)});
        } else {
            setSearchParameters({...Object.fromEntries(searchParameters), min: value[0].toString()});
        }

    }, [debouncedMin]);

    useEffect(() => {
        if(value[1] === 110) {
            searchParameters.delete('max');
            setSearchParameters({...Object.fromEntries(searchParameters)});
        } else {
            setSearchParameters({...Object.fromEntries(searchParameters), max: value[1].toString()});
        }
    }, [debouncedMax]);

    return (
        <div className={style.quantity_filter}>
            <h3>Number of cards</h3>
            <div className={style.quantity_parameters}>
                <input type="number" value={value[0]} onChange={onChangeHandler} data-quantity="minimum" />
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    max={110}
                />
                <input value={value[1]} onChange={onChangeHandler} data-quantity="maximum" />
            </div>
        </div>
    );
};

export default QuantityFilter;