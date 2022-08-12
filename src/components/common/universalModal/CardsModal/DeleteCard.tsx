import React from 'react';
import UniversalModal from '../UniversalModal';
import { useAppDispatch } from '../../../../store/store';

import { deleteCard } from '../../../../store/reducers/cards-reducer';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type DeleteCard = {
    id: string
    packID: string
}

export const DeleteCard: React.FC<DeleteCard> = ({id, packID}) => {
    const dispatch = useAppDispatch();

    const deleteCardHandler = () => {
        dispatch(deleteCard(id, packID));
    };

    return (
        <UniversalModal callBackFunction={deleteCardHandler} modalName='Delete card'>
            <div>
                <span>Are you sure you want to delete this card?</span>
            </div>
        </UniversalModal>
    );
};