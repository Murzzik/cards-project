import React, {ChangeEvent, useEffect, useState} from 'react';
import useDebounce from 'usehooks-ts/dist/esm/useDebounce/useDebounce';
import {Button, IconButton, TextField} from '@material-ui/core';
import {SearchOutlined} from '@material-ui/icons';
import style from './CardsHeader.module.css';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {addNewCard} from '../../../../store/reducers/cards-reducer';

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
    let packName = '';
    if (pack) {
        packName = pack.name;
    }

    const addPackHandler = (id: string) => {
        const question = 'Who is your boss baby';
        const answer = 'You are, my papa';
        dispatch(addNewCard(id, question, answer));
    };

    useEffect(() => {
        if (packName !== name) {
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
                                <SearchOutlined/>
                            </IconButton>
                        ),
                    }}
                />
            </div>
            <Button variant={'contained'} color={'primary'} onClick={() => addPackHandler(cardsPack_id)}>Add new
                card</Button>
        </div>
    );
};

export default CardsHeader;