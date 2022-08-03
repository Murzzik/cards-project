import React, {ChangeEvent, useEffect, useState} from 'react';
import style from './NameFilter.module.css';
import {IconButton, TextField} from '@material-ui/core';
import {SearchOutlined} from '@material-ui/icons';
import useDebounce from 'usehooks-ts/dist/esm/useDebounce/useDebounce';
import {useSearchParams} from 'react-router-dom';

type NameFilterPropsType = {}

const NameFilter: React.FC<NameFilterPropsType> = () => {
    const [name, setName] = useState<string>('');
    const debouncedName = useDebounce(name, 1500);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    };
    const [searchParameters, setSearchParameters] = useSearchParams();

    useEffect(() => {
        if (name.length > 0) {
            setSearchParameters({...Object.fromEntries(searchParameters), name});
        } else {
            searchParameters.delete('name');
            setSearchParameters({...Object.fromEntries(searchParameters)});
        }
    }, [debouncedName]);

    return (
        <div className={style.inputField}>
            <h3>Search</h3>
            <TextField
                value={name}
                fullWidth
                id="standard-bare"
                variant="outlined"
                onChange={handleChange}
                InputProps={{
                    endAdornment: (
                        <IconButton disabled>
                            <SearchOutlined/>
                        </IconButton>
                    ),
                }}
            />
        </div>
    );
};

export default NameFilter;