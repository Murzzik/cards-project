import React, {useState} from 'react';
import style from './OwnerFilter.module.css';
import {Button, ButtonGroup} from '@material-ui/core';
import {useAppSelector} from '../../../../store/store';

type OwnerFilterPropsType = {
    setUserID: (userID: string) => void,
}

const OwnerFilter: React.FC<OwnerFilterPropsType> = ({setUserID}) => {
    const userID = useAppSelector(state => state.auth.user._id);
    const [activeButton, setActiveButton] = useState<'all' | 'my'>('all');

    const onclickHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
        if (e.currentTarget.dataset.owner) {
            const trigger: string = e.currentTarget.dataset.owner;
            if (trigger === 'my') {
                setUserID(userID);
                setActiveButton('my');
            } else {
                setUserID('');
                setActiveButton('all');
            }
        }
    };
    return (
        <div className={style.owner_filter}>
            <h3>Show packs cards</h3>
            <ButtonGroup variant="contained" aria-label="outlined primary button group" className={style.buttonGroup}>
                <Button data-owner="my" className={activeButton === 'my' ? style.activeButton : ''} onClick={onclickHandler}>My</Button>
                <Button data-owner="all" className={activeButton === 'all' ? style.activeButton : ''} onClick={onclickHandler}>All</Button>
            </ButtonGroup>
        </div>
    );
};

export default OwnerFilter;