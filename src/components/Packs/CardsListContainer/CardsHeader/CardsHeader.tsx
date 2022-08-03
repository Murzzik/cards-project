import React, {ChangeEvent, useEffect, useState} from 'react';
import useDebounce from 'usehooks-ts/dist/esm/useDebounce/useDebounce';
import {useSearchParams} from 'react-router-dom';
import {Button, IconButton, TextField} from '@material-ui/core';
import {SearchOutlined} from '@material-ui/icons';

const CardsHeader: React.FC = () => {
    const [question, setQuestion] = useState<string>('');
    const debouncedName = useDebounce(question, 1500);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuestion(event.currentTarget.value);
    };
    const [searchParameters, setSearchParameters] = useSearchParams();

    useEffect(() => {
        if (question.length > 0) {
            setSearchParameters({...Object.fromEntries(searchParameters), question});
        } else {
            searchParameters.delete('question');
            setSearchParameters({...Object.fromEntries(searchParameters)});
        }
    }, [debouncedName]);

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <div>
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
            <Button style={{height: '40px'}} variant={'contained'} color={'primary'}>Add new card</Button>
        </div>
    );
};

export default CardsHeader;