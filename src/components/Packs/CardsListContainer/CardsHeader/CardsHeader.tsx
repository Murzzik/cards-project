import React, {ChangeEvent, useEffect, useState} from 'react';
import useDebounce from 'usehooks-ts/dist/esm/useDebounce/useDebounce';
import {useSearchParams} from 'react-router-dom';
import {Button, IconButton, TextField} from '@material-ui/core';
import {SearchOutlined} from '@material-ui/icons';
import style from './CardsHeader.module.css';
import {useAppSelector} from '../../../../store/store';

type CardsHeaderPropsType = {
    cardsPack_id: string | undefined
}

const CardsHeader: React.FC<CardsHeaderPropsType> = ({cardsPack_id}) => {
    const [searchParameters, setSearchParameters] = useSearchParams();
    let starQuestion = searchParameters.get('question');
    let questionParameter = '';
    if (starQuestion) {
        questionParameter = starQuestion;
    }
    const [question, setQuestion] = useState<string>(questionParameter);
    const debouncedName = useDebounce(question, 1500);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuestion(event.currentTarget.value);
    };

    const pack = useAppSelector(state => state.packs.cardPacks.find(p => p._id === cardsPack_id));
    let packName = '';
    if (pack) {
        packName = pack.name;
    }
    useEffect(() => {
        if (question.length > 0) {
            setSearchParameters({...Object.fromEntries(searchParameters), question});
        } else {
            searchParameters.delete('question');
            setSearchParameters({...Object.fromEntries(searchParameters)});
        }
    }, [debouncedName]);

    return (
        <div className={style.cardsHeader}>
            <div className={style.inputField}>
                <h3>{packName}</h3>
                <h3>Search</h3>
                <TextField
                    value={question}
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
            <Button variant={'contained'} color={'primary'}>Add new card</Button>
        </div>
    );
};

export default CardsHeader;