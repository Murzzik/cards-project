import React, { ChangeEvent, useEffect, useState } from 'react';
import useDebounce from 'usehooks-ts/dist/esm/useDebounce/useDebounce';
import { IconButton, TextField } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import style from './CardsHeader.module.css';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { AddCard } from '../../../common/universalModal/CardsModal/AddCard';

type CardsHeaderPropsType = {
    cardsPack_id: string
}

const CardsHeader: React.FC<CardsHeaderPropsType> = ({cardsPack_id}) => {
    const dispatch = useAppDispatch();

    const [name, setName] = useState('');
    const debouncedName = useDebounce(name, 1500);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    };

    const pack = useAppSelector(state => state.packs.cardPacks.find(p => p._id === cardsPack_id));
    const cards = useAppSelector(state => state.cards.cards);
    let packName = '';
    if(pack) {
        packName = pack.name;
    }

    useEffect(() => {
        if(packName !== name) {
            // dispatch(setCarsParameter({...parameters, packName}));
        }
    }, [debouncedName]);

    return (
        <div className={style.cardsHeader}>
            <div className={style.inputField}>
                <h3>{packName}</h3>
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
                                <SearchOutlined />
                            </IconButton>
                        ),
                    }}
                />
            </div>
            {!!cards.length && <AddCard packID={cardsPack_id} />}
        </div>
    );
};

export default CardsHeader;