import * as React from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import TablesContainer from './Table/TablesContainer';
import {Button} from '@material-ui/core';
import {addNewPack} from '../../../store/reducers/packs-reducer';

type PackListPopsType = {}

export const PackList: React.FC<PackListPopsType> = () => {
    const IsPacks = useAppSelector(state => state.packs.cardPacks).length > 0;

    const dispatch = useAppDispatch();
    const newPackHandler = () => {
        const name = 'New pack success added';
        dispatch(addNewPack(name));
    };

    return (
        <div>
            {IsPacks ?
                <TablesContainer/>
                :
                <Button variant={'contained'} color={'primary'} onClick={newPackHandler} style={{left: '50%'}}>Add new pack</Button>
            }
        </div>
    );
};
export default PackList;
