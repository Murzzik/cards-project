import React, {ChangeEvent} from 'react';
import style from '../SearchParameters.module.css';
import {IconButton, TextField} from '@material-ui/core';
import {SearchOutlined} from '@material-ui/icons';

type NameFilterPropsType = {
    namePack: string,
    setNamePack: (name: string) => void,
}

const NameFilter: React.FC<NameFilterPropsType> = ({namePack, setNamePack}) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNamePack(event.currentTarget.value);
    };
    return (
        <div className={style.input_field}>
            <h3>Search</h3>
            <TextField
                value={namePack}
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