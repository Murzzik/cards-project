import React, {ChangeEvent, useState} from 'react';
import UniversalModal from './UniversalModal';
import {addNewPack} from '../../../store/reducers/packs-reducer';
import {useAppDispatch} from '../../../store/store';
import {Button, Checkbox, Input} from 'antd';
import {CheckboxChangeEvent} from 'antd/lib/checkbox';

const AddNewPackModal: React.FC = () => {
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');
    const [check, setCheck] = useState(true);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
    };
    const onChangeCheck = (e: CheckboxChangeEvent) => {
        setCheck(e.target.checked);
    };

    const newPackHandler = () => {
        dispatch(addNewPack(name, check));
        setName('');
    };
    return (
        <UniversalModal
            callBackFunction={newPackHandler}
            clickElement={<Button type="primary">Add new Pack</Button>}
            modalName="Add new Pack"
            children={
                <div>
                    <Input placeholder="Pack name" value={name} onChange={onChangeHandler}/>
                    <Checkbox checked={check} onChange={onChangeCheck}>Private</Checkbox>
                </div>
            }
        />
    );
};

export default AddNewPackModal;