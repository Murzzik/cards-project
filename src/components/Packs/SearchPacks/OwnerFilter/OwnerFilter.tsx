import React, {useState} from 'react';
import style from './OwnerFilter.module.css';
import {Button, ButtonGroup} from '@material-ui/core';
import {useAppSelector} from '../../../../store/store';
import {useSearchParams} from 'react-router-dom';

type OwnerFilterPropsType = {}

const OwnerFilter: React.FC<OwnerFilterPropsType> = () => {
    const [searchParameters, setSearchParameters] = useSearchParams();
    const owner = searchParameters.get('id');
    let ownerParameter = '';
    if (owner) {
        ownerParameter = 'my';
    } else {
        ownerParameter = 'all';
    }
    const userID = useAppSelector(state => state.auth.user._id);
    const [activeButton, setActiveButton] = useState(ownerParameter);

    const onclickHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
        if (e.currentTarget.dataset.owner) {
            const trigger: string = e.currentTarget.dataset.owner;
            if (trigger === 'my') {
                setSearchParameters({...Object.fromEntries(searchParameters), id: userID});
                setActiveButton('my');
            } else {
                searchParameters.delete('id');
                setSearchParameters({...Object.fromEntries(searchParameters)});
                setActiveButton('all');
            }
        }
    };

    return (
        <div className={style.ownerFilter}>
            <h3>Show packs cards</h3>
            <ButtonGroup variant="contained" aria-label="outlined primary button group" className={style.buttonGroup}>
                <Button data-owner="my" className={activeButton === 'my' ? style.activeButton : ''} onClick={onclickHandler}>My</Button>
                <Button data-owner="all" className={activeButton === 'all' ? style.activeButton : ''} onClick={onclickHandler}>All</Button>
            </ButtonGroup>
        </div>
    );
};

export default OwnerFilter;