import React from 'react';
import UniversalModal from './UniversalModal';
import {useAppDispatch} from '../../../store/store';
import {deletePack} from '../../../store/reducers/packs-reducer';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type DeletePackModalPropsType = {
    packId: string,
    packName: string
}

const DeletePackModal: React.FC<DeletePackModalPropsType> = ({packId, packName}) => {
    const dispatch = useAppDispatch();
    const deletePackHandler = () => {
        dispatch(deletePack(packId));
    };

    return (
        <UniversalModal callBackFunction={deletePackHandler}
                        clickElement={
                            <DeleteForeverIcon/>
                        } modalName="Delete Pack"
                        children={
                            <h3>Are you sure you want to remove the pack
                                "<b style={{color: 'red'}}>{packName}</b>"?
                            </h3>
                        }/>
    );
};

export default DeletePackModal;