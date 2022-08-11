import React, {ChangeEvent, useState} from 'react';
import UniversalModal from './UniversalModal';
import {addNewPack} from '../../../store/reducers/packs-reducer';
import {useAppDispatch} from '../../../store/store';
import {Checkbox, TextField} from '@material-ui/core';
import {Button} from 'antd';

const AddNewPackModal: React.FC = () => {
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');
    const [check, setCheck] = useState(true);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
    };
    const onChangeCheck = (e: ChangeEvent<HTMLInputElement>) => {
        setCheck(e.currentTarget.checked);
    };

    const newPackHandler = () => {
        dispatch(addNewPack(name, check));
    };
    return (
        <UniversalModal nameButton="Add New Pack" someFunction={newPackHandler} children={
            <div>
                <TextField style={{width: '100%'}} type="text" value={name} onChange={onChangeHandler} variant="outlined"/>

                <Checkbox checked={check} onChange={onChangeCheck} color="primary"/>
                <span>Privat</span>
            </div>
        } clickElement={<Button type="primary">Add new Pack</Button>}/>
    );
};

export default AddNewPackModal;