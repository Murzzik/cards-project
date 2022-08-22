import React from 'react';
import { IconButton } from '@material-ui/core';
import { useAppSelector } from '../../../../../store/store';
import s from '../../../CardsListContainer/CardsList.module.css';
import { EditCard } from '../../../../common/universalModal/CardsModal/EditCard';
import { DeleteCard } from '../../../../common/universalModal/CardsModal/DeleteCard';
import { Rating } from '@mui/material';

type IconsCardsGroup = {
    ownerPack: string
    id: string
    question: string
    answer: string
    cardsPack_id: string
    grade: number
}

export const IconsCardsGroup: React.FC<IconsCardsGroup> = ({ownerPack, cardsPack_id, id, answer, question, grade}) => {
    const myId = useAppSelector(state => state.auth.user._id);

    const isMyPacks = myId === ownerPack;

    return (
        <div className={s.editRow}>
            {   isMyPacks &&
                <div>
                    <IconButton>
                        <EditCard id={id}
                                  packID={cardsPack_id}
                                  questionValue={question}
                                  answerValue={answer}/>
                    </IconButton>
                    <IconButton>
                        <DeleteCard id={id}
                                    packID={cardsPack_id}
                                    cardName={question}/>
                    </IconButton>
                </div>
            }
            <Rating name="half-rating-read" defaultValue={grade} precision={0.5}
                    readOnly />
        </div>
    );
};