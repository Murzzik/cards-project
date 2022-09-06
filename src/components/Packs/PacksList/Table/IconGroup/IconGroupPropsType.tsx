import React from 'react';
import {IconButton} from '@material-ui/core';
import SchoolIcon from '@mui/icons-material/School';
import {useAppSelector} from '../../../../../store/store';
import DeletePackModal from '../../../../common/universalModal/PacksMoad/DeletePackModal';
import EditPackModal from '../../../../common/universalModal/PacksMoad/EditPackModal';
import {useNavigate} from 'react-router-dom';

type IconGroupPropsType = {
    ownerPack: string,
    packId: string,
    packName: string
    cardsCount: number
}

const IconGroup: React.FC<IconGroupPropsType> = ({ownerPack, packId, packName, cardsCount}) => {
    const myId = useAppSelector(state => state.auth.user._id);
    const navigate = useNavigate();

    const isMyPacks = myId === ownerPack;

    const onLearnButtonHandler = () => {
        navigate(`/learn/${packId}`);
    };

    const isStudyIcon = (cardsCount > 0) ?
        <IconButton onClick={onLearnButtonHandler} size={'small'}><SchoolIcon/></IconButton>
        :
        !isMyPacks && <p>This pack empty. Sorry</p>;
    return (
        <div style={{display: 'flex',alignItems:'center'}}>
            {/*<IconButton onClick={onLearnButtonHandler}><SchoolIcon/></IconButton>*/}
            {isStudyIcon}
            {isMyPacks &&
                <div>
                    <IconButton size={'small'}>
                        <DeletePackModal packId={packId} packName={packName}/>
                    </IconButton >
                    <IconButton size={'small'}>
                        <EditPackModal packId={packId} packName={packName}/>
                    </IconButton>
                </div>
            }
        </div>
    );
};

export default IconGroup;