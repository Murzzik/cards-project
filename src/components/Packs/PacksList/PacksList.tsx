import * as React from 'react';
import {useAppSelector} from '../../../store/store';
import TablesContainer from './Table/TablesContainer';
import ButtonOrText from './ButtonOrText';

type PackListPopsType = {}

export const PackList: React.FC<PackListPopsType> = () => {
    const isPacks = useAppSelector(state => state.packs.cardPacks).length > 0;

    return (
        <div>
            {isPacks ?
                <TablesContainer/>
                :
                <ButtonOrText/>
            }
        </div>
    );
};
export default PackList;
