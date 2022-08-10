import * as React from 'react';
import {useAppSelector} from '../../../store/store';
import TablesContainer from './Table/TablesContainer';
import ConditionResponse from './ConditionResponse';

type PackListPopsType = {}

export const PackList: React.FC<PackListPopsType> = () => {
    const isPacks = useAppSelector(state => state.packs.cardPacks).length > 0;


    return (
        <div>
            {isPacks ?
                <TablesContainer/>
                :
              <ConditionResponse/>
            }
        </div>
    );
};
export default PackList;
