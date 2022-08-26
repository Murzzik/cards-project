import React, {ChangeEvent, useRef, useState} from 'react';
import UniversalModal from '../UniversalModal';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {updatePack} from '../../../../store/reducers/packs-reducer';
import {Checkbox, Input} from 'antd';
import {CheckboxChangeEvent} from 'antd/lib/checkbox';
import EditIcon from '@mui/icons-material/Edit';
import baseQuestionImage from '../../../../assets/images/project-logo.png';
import s from '../CardsModal/cards.module.css';
import {uploadPhoto} from '../../../../utils/uploadPhoto';

type EditePackModalPropsType = {
    packId: string,
    packName: string
}
const EditPackModal: React.FC<EditePackModalPropsType> = ({packId, packName}) => {
    const pack = useAppSelector(state => state.packs.cardPacks.find(p => p._id === packId));
    let packImg = baseQuestionImage;
    if (pack) {
        if (pack.deckCover) {
            packImg = pack.deckCover;
        }
    }
    const dispatch = useAppDispatch();
    const [name, setName] = useState(packName);
    const [check, setCheck] = useState(true);
    const [packImage, setPackImage] = useState(packImg);
    const uploadRef = useRef<HTMLInputElement>(null);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
    };
    const onChangeCheck = (e: CheckboxChangeEvent) => {
        setCheck(e.target.checked);
    };
    const updatePackHandler = () => {
        dispatch(updatePack(packId, name, check, packImage));
    };

    const clearData = () => {
        setName(packName);
        setPackImage(packImg);
        if (uploadRef.current) {
            uploadRef.current.value = '';
        }
    };
    const uploadPackImage = (e: ChangeEvent<HTMLInputElement>) => {
        uploadPhoto(e, (file64: string) => {
            setPackImage(file64);
        });
    };

    return (
        <UniversalModal
            callBackFunction={updatePackHandler}
            modalName="Edit pack"
            clickElement={<EditIcon/>}
            clearData={clearData}
            children={
                <div>
                    <Input placeholder="Pack name" value={name} onChange={onChangeHandler}/>
                    <div className={s.question_image_block}>
                        <img src={packImage} alt=""/>
                        <label className="custom-file-upload">
                            <input type="file" onChange={uploadPackImage} ref={uploadRef}/>
                        </label>
                    </div>
                    <Checkbox checked={check} onChange={onChangeCheck}>Private</Checkbox>
                </div>
            }
        />
    );
};

export default EditPackModal;