import React from 'react';
import {IconButton} from '@material-ui/core';
import SchoolIcon from '@mui/icons-material/School';
import {useAppSelector} from '../../../../../store/store';
import DeletePackModal from '../../../../common/universalModal/DeletePackModal';
import EditPackModal from '../../../../common/universalModal/EditPackModal';

type IconGroupPropsType = {
    ownerPack: string,
    packId: string,
    packName: string
}

const IconGroup: React.FC<IconGroupPropsType> = ({ownerPack, packId, packName}) => {
    const myId = useAppSelector(state => state.auth.user._id);

    const isMyPacks = myId === ownerPack;
    return (
        <div>
            {isMyPacks ?
                <div>
                    <IconButton>
                        <SchoolIcon/>
                    </IconButton>
                    <IconButton>
                        <DeletePackModal packId={packId} packName={packName}/>
                    </IconButton>
                    <IconButton>
                        <EditPackModal packId={packId} packName={packName}/>
                    </IconButton>
                </div>
                :
                <div>
                    <IconButton>
                        <SchoolIcon/>
                    </IconButton>
                </div>
            }
        </div>
    );
};

export default IconGroup;