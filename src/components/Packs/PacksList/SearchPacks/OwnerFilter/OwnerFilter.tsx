import React, {useState} from 'react';
import style from './OwnerFilter.module.css';
import {Button, ButtonGroup} from '@material-ui/core';
import {useAppDispatch, useAppSelector} from '../../../../../store/store';
import {setPacksParameter} from '../../../../../store/reducers/packsParameterReducer';


type OwnerFilterPropsType = {}

const OwnerFilter: React.FC<OwnerFilterPropsType> = () => {

    const dispatch = useAppDispatch();
    const user_id = useAppSelector(state => state.auth.user._id);
    const [activeButton, setActiveButton] = useState(false);
    let parameters = useAppSelector(state => state.packsParameter);


    const onclickHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
        if (e.currentTarget.dataset.owner) {
            const trigger: string = e.currentTarget.dataset.owner;
            if (trigger === 'my') {
                dispatch(setPacksParameter({...parameters, user_id}));
                setActiveButton(true)
            } else {
                dispatch(setPacksParameter({...parameters, user_id: ''}))
                setActiveButton(false)
            }
        }
    };

    return (
        <div className={style.ownerFilter}>
            <h3>Show packs cards</h3>
            <ButtonGroup variant="contained" aria-label="outlined primary button group" className={style.buttonGroup}>
                <Button data-owner="my" className={activeButton ? style.activeButton : ''}
                        onClick={onclickHandler}>My</Button>
                <Button data-owner="all" className={!activeButton ? style.activeButton : ''}
                        onClick={onclickHandler}>All</Button>
            </ButtonGroup>
        </div>
    );
};

export default OwnerFilter;