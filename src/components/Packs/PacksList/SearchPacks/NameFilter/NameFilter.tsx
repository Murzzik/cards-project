import React, {ChangeEvent, useEffect, useState} from 'react';
import useDebounce from 'usehooks-ts/dist/esm/useDebounce/useDebounce';
import {useAppDispatch, useAppSelector} from '../../../../../store/store';
import {setPacksParameter} from '../../../../../store/reducers/packsParameterReducer';
import {Input} from 'antd';

const {Search} = Input;

type NameFilterPropsType = {}

const NameFilter: React.FC<NameFilterPropsType> = () => {
    const dispatch = useAppDispatch();
    let parameters = useAppSelector(state => state.packsParameter);
    let name = useAppSelector(state => state.packsParameter.packName);

    const [packName, setPackName] = useState<string>('');
    const debouncedName = useDebounce(packName, 1500);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPackName(event.currentTarget.value);
    };

    useEffect(() => {
        if (packName !== name) {
            dispatch(setPacksParameter({parameters: {...parameters, packName}}));
        }
    }, [debouncedName]);

    return (
        <div>
            <h3>Search</h3>
            <Search value={packName}
                    placeholder="input search question"
                    onChange={handleChange}
                    enterButton size={'middle'}
                    style={{width:'450px'}}
            />
        </div>
    );
};

export default NameFilter;