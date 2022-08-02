import React, {useEffect} from 'react';
import style from '../SearchParameters.module.css';
import Slider from '@mui/material/Slider';
import useDebounce from 'usehooks-ts/dist/esm/useDebounce/useDebounce';

type QuantityFilterPropsType = {
    setMin: (min: number) => void,
    setMax: (min: number) => void,
}

const QuantityFilter: React.FC<QuantityFilterPropsType> = ({setMin, setMax}) => {
    const [value, setValue] = React.useState<number[]>([0, 110]);
    const debouncedMin = useDebounce(value[0], 1500);
    const debouncedMax = useDebounce(value[1], 1500);
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };
    useEffect(() => {
        setMin(value[0]);
        setMax(value[1]);
    }, [debouncedMin, debouncedMax]);
    return (
        <div className={style.quantity_filter}>
            <h3>Number of cards</h3>
            <div>
                <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        max={110}
                />
            </div>
        </div>
    );
};

export default QuantityFilter;