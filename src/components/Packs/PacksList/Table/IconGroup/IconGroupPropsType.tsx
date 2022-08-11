import React from 'react';
import {IconButton} from '@material-ui/core';
import SchoolIcon from '@mui/icons-material/School';
import EditIcon from '@mui/icons-material/Edit';
import {useAppDispatch, useAppSelector} from '../../../../../store/store';
import {updatePackName} from '../../../../../store/reducers/packs-reducer';
import DeletePackModal from '../../../../common/universalModal/DeletePackModal';

type IconGroupPropsType = {
    ownerPack: string,
    packId: string,
    packName: string
}

const IconGroup: React.FC<IconGroupPropsType> = ({ownerPack, packId, packName}) => {
    const myId = useAppSelector(state => state.auth.user._id);
    const dispatch = useAppDispatch();
    const updatePackNameHandler = (id: string) => {
        const newPackName = 'Test for name change before modal implemented';
        dispatch(updatePackName(id, newPackName));
    };
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
                        <EditIcon onClick={() => updatePackNameHandler(packId)}/>
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