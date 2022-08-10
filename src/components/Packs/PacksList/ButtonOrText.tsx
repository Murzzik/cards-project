import React from 'react';
import {Button} from '@material-ui/core';
import {addNewPack} from '../../../store/reducers/packs-reducer';
import {useAppDispatch, useAppSelector} from '../../../store/store';

const ButtonOrText: React.FC = () => {
    const dispatch = useAppDispatch();
    const myId = useAppSelector(state => state.auth.user._id);
    const isMyPacks = useAppSelector(state => state.packsParameter.user_id) === myId;

    const newPackHandler = () => {
        const name = 'New pack success added';
        dispatch(addNewPack(name));
    };
    return (
        <div>
            {isMyPacks ?
                <div>
                    <div style={{textAlign: 'center', fontSize: '28px', color: 'white'}}>Нет таких паков</div>
                    <Button variant={'contained'} color={'primary'} onClick={newPackHandler} style={{left: '50%'}}>Add new pack</Button>
                </div>
                :
                <div style={{textAlign: 'center', fontSize: '28px', color: 'white'}}>Нет таких паков</div>
            }
        </div>
    );
};

export default ButtonOrText;