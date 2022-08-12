import React, { ChangeEvent, useState } from 'react';
import UniversalModal from './UniversalModal';
import { useAppDispatch } from '../../../store/store';
import { updatePackName } from '../../../store/reducers/packs-reducer';
import { Checkbox, Input } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

type EditePackModalPropsType = {
    packId: string,
    packName: string
}
const EditPackModal: React.FC<EditePackModalPropsType> = ({packId, packName}) => {
    const dispatch = useAppDispatch();
    const [name, setName] = useState(packName);
    const [check, setCheck] = useState(true);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
    };
    const onChangeCheck = (e: CheckboxChangeEvent) => {
        setCheck(e.target.checked);
    };
    const updatePackHandler = () => {
        dispatch(updatePackName(packId, name, check));
    };
    return (
        <UniversalModal
            callBackFunction={updatePackHandler}
            modalName="Edit pack"
            children={
                <div>
                    <Input placeholder="Pack name" value={name} onChange={onChangeHandler} />
                    <Checkbox checked={check} onChange={onChangeCheck}>Private</Checkbox>
                </div>
            }
        />
    );
};

export default EditPackModal;