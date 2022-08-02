import React from 'react';
import style from '../SearchParameters.module.css';
import {Button, ButtonGroup} from '@material-ui/core';
import {useNavigate} from 'react-router-dom';

const OwnerFilter: React.FC = () => {
    const ownerPacks = "ownerPacks=my"
    const navigate = useNavigate();
    const onclickHandler = () => {
            navigate(`?${ownerPacks}`)
    };
    return (
        <div className={style.owner_filter}>
            <h3>Show packs cards</h3>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={onclickHandler}>My</Button>
                <Button>All</Button>
            </ButtonGroup>
        </div>
    );
};

export default OwnerFilter;