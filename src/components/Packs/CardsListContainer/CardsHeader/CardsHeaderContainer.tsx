import React from 'react';
import CardsHeader from './CardsHeader';
import {useParams} from 'react-router-dom';
import {useAppSelector} from '../../../../store/store';



const CardsHeaderContainer: React.FC = () => {
    const {cardsPack_id} = useParams();
    const packUserId = useAppSelector(state => state.cards.packUserId);
    const isMyPack = useAppSelector(state => state.auth.user._id) === packUserId;
    const packName = useAppSelector(state => state.cards.packName);
    console.log(isMyPack + '  ' + packName);
    const imagePack = useAppSelector(state => state.cards.packDeckCover);
    return (

        <CardsHeader cardsPack_id={cardsPack_id}
                     packName={packName}
                     isMyPack={isMyPack}
                     imagePack={imagePack}
        />
    );
};

export default CardsHeaderContainer;