import React, {ChangeEvent, useEffect} from 'react';
import style from './QuantityFilter.module.css';
import Slider from '@mui/material/Slider';
import useDebounce from 'usehooks-ts/dist/esm/useDebounce/useDebounce';
import {useAppDispatch, useAppSelector} from '../../../../../store/store';
import {setPacksParameter} from '../../../../../store/reducers/packsParameterReducer';

type QuantityFilterPropsType = {}

const QuantityFilter: React.FC<QuantityFilterPropsType> = () => {

    const [value, setValue] = React.useState<number[]>([0, 110]);
    const dispatch = useAppDispatch();
    const debouncedMin = useDebounce(value[0], 1500);
    const debouncedMax = useDebounce(value[1], 1500);
    let min = useAppSelector(state => state.packsParameter.min);
    let max = useAppSelector(state => state.packsParameter.max);
    let parameters = useAppSelector(state => state.packsParameter);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.dataset.quantity) {
            const trigger: string = event.currentTarget.dataset.quantity;
            if (trigger === 'minimum') {
                setValue([+event.currentTarget.value, value[1]]);
            }
            if (trigger === 'maximum') {
                setValue([value[0], +event.currentTarget.value]);
            }
        }
    };

    useEffect(() => {
        if (max !== value[1]) {
            dispatch(setPacksParameter({parameters: {...parameters,  max: debouncedMax}}));
        }
        if (min !== value[0]) {
            dispatch(setPacksParameter({parameters: {...parameters, min: debouncedMin}}));
        }

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