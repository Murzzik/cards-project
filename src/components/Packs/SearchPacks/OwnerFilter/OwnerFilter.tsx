import React from 'react';
import style from '../SearchParameters.module.css';
import {Button, ButtonGroup} from '@material-ui/core';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../../../store/store';

type OwnerFilterPropsType = {
    setUserID: (userID: string) => void,
}

const OwnerFilter: React.FC<OwnerFilterPropsType> = ({setUserID}) => {
    const navigate = useNavigate();
    const userID = useAppSelector(state => state.auth.user._id);
    const onclickHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
        if (e.currentTarget.dataset.owner) {
            const trigger: string = e.currentTarget.dataset.owner;
            if (trigger === 'my') {
                setUserID(userID);
            } else {
                setUserID('');
            }
        }
    };
    return (
        <div className={style.owner_filter}>
            <h3>Show packs cards</h3>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button data-owner="my" onClick={onclickHandler}>My</Button>
                <Button data-owner="all" onClick={onclickHandler}>All</Button>
            </ButtonGroup>
        </div>
    );
};

export default OwnerFilter;