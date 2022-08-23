import React from 'react';
import { IconButton } from '@material-ui/core';
import SchoolIcon from '@mui/icons-material/School';
import { useAppSelector } from '../../../../../store/store';
import DeletePackModal from '../../../../common/universalModal/PacksMoad/DeletePackModal';
import EditPackModal from '../../../../common/universalModal/PacksMoad/EditPackModal';
import { useNavigate } from 'react-router-dom';


type IconGroupPropsType = {
    ownerPack: string,
    packId: string,
    packName: string
}

const IconGroup: React.FC<IconGroupPropsType> = ({ownerPack, packId, packName}) => {
    const myId = useAppSelector(state => state.auth.user._id);
    const navigate = useNavigate();

    const isMyPacks = myId === ownerPack;

    const onLearnButtonHandler = () => {
        navigate(`/learn/${packId}`);
    };

    return (
        <div>
            <IconButton onClick={onLearnButtonHandler}>
                <SchoolIcon />
            </IconButton>
            {isMyPacks &&
                <div>
                    <IconButton>
                            <DeletePackModal packId={packId} packName={packName} />
                    </IconButton>
                    <IconButton>
                            <EditPackModal packId={packId} packName={packName} />
                    </IconButton>
                </div>
            }
        </div>
    );
};

export default IconGroup;