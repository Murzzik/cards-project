import React, {ChangeEvent, useEffect, useState} from 'react';
import style from '../SearchParameters.module.css';
import {IconButton, TextField} from '@material-ui/core';
import {SearchOutlined} from '@material-ui/icons';
import useDebounce from 'usehooks-ts/dist/esm/useDebounce/useDebounce';

type NameFilterPropsType = {
    setNamePack: (name: string) => void,
}

const NameFilter: React.FC<NameFilterPropsType> = ({setNamePack}) => {
    const [name, setName] = useState<string>('');
    const debouncedName = useDebounce(name, 1500);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    };

    useEffect(() => {
        setNamePack(name);
    }, [debouncedName]);
    return (
        <div className={style.input_field}>
            <h3>Search</h3>
            <TextField
                value={name}
                fullWidth
                id="standard-bare"
                variant="outlined"
                onChange={handleChange}
                InputProps={{
                    endAdornment: (
                        <IconButton>
                            <SearchOutlined/>
                        </IconButton>
                    ),
                }}
            />
        </div>
    );
};

export default NameFilter;