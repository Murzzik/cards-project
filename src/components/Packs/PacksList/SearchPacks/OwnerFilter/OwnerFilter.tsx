import React from 'react';
import style from './OwnerFilter.module.css';
import {Button, ButtonGroup} from '@material-ui/core';
import {useAppDispatch, useAppSelector} from '../../../../../store/store';
import {setPacksParameter} from '../../../../../store/reducers/packsParameterReducer';

type OwnerFilterPropsType = {}

const OwnerFilter: React.FC<OwnerFilterPropsType> = () => {

    const dispatch = useAppDispatch();
    const user_id = useAppSelector(state => state.auth.user._id);
    let parameters = useAppSelector(state => state.packsParameter);
    let isMyPacks = useAppSelector(state => state.packsParameter.user_id) === user_id;

    const onclickHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
        if (e.currentTarget.dataset.owner) {
            const trigger: string = e.currentTarget.dataset.owner;
            if (trigger === 'my') {
                dispatch(setPacksParameter({parameters: {...parameters, user_id}}));
            } else {
                dispatch(setPacksParameter({parameters: {...parameters, user_id: ''}}));
            }
        }
    };

    return (
        <div className={style.ownerFilter}>
            <h3>Show packs cards</h3>
            <ButtonGroup variant="contained" aria-label="outlined primary button group" className={style.buttonGroup}>
                <Button data-owner="my" className={isMyPacks ? style.activeButton : ''}
                        onClick={onclickHandler}>My</Button>
                <Button data-owner="all" className={!isMyPacks ? style.activeButton : ''}
                        onClick={onclickHandler}>All</Button>
            </ButtonGroup>
        </div>
    );
};
export default OwnerFilter;