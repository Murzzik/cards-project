import React from 'react';
import {IconButton} from '@material-ui/core';
import SchoolIcon from '@mui/icons-material/School';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {useAppDispatch, useAppSelector} from '../../../../../store/store';
import {deletePack, updatePackName} from '../../../../../store/reducers/packs-reducer';

type IconGroupPropsType = {
    ownerPack: string,
    packId: string
}

const IconGroup: React.FC<IconGroupPropsType> = ({ownerPack, packId}) => {
    const myId = useAppSelector(state => state.auth.user._id);
    const dispatch = useAppDispatch();
    const deletePackHandler = (id: string) => {
        dispatch(deletePack(id));
    };
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
                    <IconButton onClick={() => deletePackHandler(packId)}>
                        <DeleteForeverIcon/>
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