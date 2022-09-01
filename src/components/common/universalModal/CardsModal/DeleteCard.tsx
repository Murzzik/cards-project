import React from 'react';
import UniversalModal from '../UniversalModal';
import {useAppDispatch} from '../../../../store/store';
import s from './cards.module.css';
import {Button} from 'antd';
import {deleteCard} from '../../../../store/reducers/cardsReducer';
import {DeleteOutlined} from '@ant-design/icons';

type DeleteCard = {
    id: string
    packID: string
    cardName: string
}

export const DeleteCard: React.FC<DeleteCard> = ({id, packID, cardName}) => {
    const dispatch = useAppDispatch();

    const deleteCardHandler = () => {
        dispatch(deleteCard(id, packID));
    };

    return (
        <UniversalModal callBackFunction={deleteCardHandler}
                        modalName="Delete card"
                        clickElement={
                            <Button shape="circle" icon={<DeleteOutlined style={{fontSize: '20px', color: 'red'}}/>}/>
                        }>
            <div>
                <span className={s.deleteAttentionText}>
                    Are you sure you want to delete this <span className={s.deletedCardName}>"{cardName}"</span> question?
                </span>
            </div>
        </UniversalModal>
    );
};