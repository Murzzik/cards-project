import React, {ChangeEvent, useState} from 'react';
import UniversalModal from '../UniversalModal';
import {addNewPack} from '../../../../store/reducers/packs-reducer';
import {useAppDispatch} from '../../../../store/store';
import {Button, Checkbox, Input} from 'antd';
import {CheckboxChangeEvent} from 'antd/lib/checkbox';
import s from '../CardsModal/cards.module.css';
import defaultPackImage from '../../../../assets/images/project-logo.png';
import {uploadPhoto} from '../../../../utils/uploadPhoto';

const AddNewPackModal: React.FC = () => {
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');
    const [check, setCheck] = useState(true);
    const [packImage, setPackImage] = useState(defaultPackImage);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
    };
    const onChangeCheck = (e: CheckboxChangeEvent) => {
        setCheck(e.target.checked);
    };

    const newPackHandler = () => {
        dispatch(addNewPack(name, check, packImage));
        setName('');
        setPackImage('');
    };

    const uploadPackImage = (e: ChangeEvent<HTMLInputElement>) => {
        uploadPhoto(e, (file64: string) => {
            setPackImage(file64);
        });

    };
    return (
        <UniversalModal
            callBackFunction={newPackHandler}
            clickElement={<Button type="primary">Add new Pack</Button>}
            modalName="Add new Pack"
            children={
                <div>
                    <Input placeholder="Pack name" value={name} onChange={onChangeHandler}/>
                    <div className={s.question_image_block}>
                        <img src={packImage} alt=""/>
                        <label className="custom-file-upload">
                            <input type="file" onChange={uploadPackImage}/>
                            Upload image
                        </label>
                    </div>
                    <Checkbox checked={check} onChange={onChangeCheck}>Private</Checkbox>
                </div>
            }
        />
    );
};

export default AddNewPackModal;