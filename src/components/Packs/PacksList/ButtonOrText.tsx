import React from 'react';
import {useAppSelector} from '../../../store/store';
import AddNewPackModal from '../../common/universalModal/AddNewPackModal';

const ButtonOrText: React.FC = () => {
    const myId = useAppSelector(state => state.auth.user._id);
    const isMyPacks = useAppSelector(state => state.packsParameter.user_id) === myId;

    return (
        <div>
            {isMyPacks ?
                <div>
                    <div style={{textAlign: 'center', fontSize: '28px', color: 'white'}}>Нет таких паков</div>
                    <div style={{textAlign: 'center'}}>
                        <AddNewPackModal/>
                    </div>

                </div>
                :
                <div style={{textAlign: 'center', fontSize: '28px', color: 'white'}}>Нет таких паков</div>
            }
        </div>
    );
};

export default ButtonOrText;