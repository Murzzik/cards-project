import React from 'react';
import { IconButton } from '@material-ui/core';
import SchoolIcon from '@mui/icons-material/School';
import { useAppSelector } from '../../../../../store/store';
import DeletePackModal from '../../../../common/universalModal/DeletePackModal';
import EditPackModal from '../../../../common/universalModal/EditPackModal';
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

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
                        <DeleteForeverIcon>
                            <DeletePackModal packId={packId} packName={packName} />
                        </DeleteForeverIcon>
                    </IconButton>
                    <IconButton>
                        <EditIcon>
                            <EditPackModal packId={packId} packName={packName} />
                        </EditIcon>
                    </IconButton>
                </div>
            }
        </div>
    );
};

export default IconGroup;