import React, {ChangeEvent, useEffect, useState} from 'react';
import useDebounce from 'usehooks-ts/dist/esm/useDebounce/useDebounce';
import style from './CardsHeader.module.css';
import {AddCard} from '../../../common/universalModal/CardsModal/AddCard';
import {Input, Collapse} from 'antd';
import {setCardsParameter} from '../../../../store/reducers/cardsParametersReducer';
import {useAppDispatch, useAppSelector} from '../../../../store/store';

type CardsHeaderPropsType = {
    cardsPack_id: string | undefined,
    packName: string
    isMyPack: boolean
    imagePack: string
}

const {Search} = Input;
const {Panel} = Collapse;

const CardsHeader: React.FC<CardsHeaderPropsType> = ({cardsPack_id, packName, isMyPack, imagePack}) => {
    const parameters = useAppSelector(state => state.cardsParameter);
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');
    const debouncedName = useDebounce(name, 1500);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    };

    const cardQuestion = useAppSelector(state => state.cardsParameter.cardQuestion);

    useEffect(() => {
        if (cardQuestion !== name) {
            dispatch(setCardsParameter({parameters: {...parameters, cardQuestion: name}}));
        }
    }, [debouncedName]);

    return (
        <div className={style.cardsHeader}>

            <div className={style.inputField}>
                <h2>Pack name: {packName}</h2>
                <Collapse collapsible="header" defaultActiveKey={['1']} accordion={false}>
                    <Panel header="Card tools" key="1">
                        <div>
                            <h3>Search</h3>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Search value={name}
                                        placeholder="input search question"
                                        onChange={handleChange}
                                        enterButton size={'middle'}
                                />
                                {isMyPack && cardsPack_id && <AddCard packID={cardsPack_id}/>}
                            </div>
                        </div>
                    </Panel>
                </Collapse>
            </div>

            <div>
                {(imagePack && imagePack.includes('data:image') ?
                        <img src={imagePack} alt=""
                             style={{width: '200px'}}
                        />
                        :
                        ''
                )}
            </div>
        </div>
    );
};

export default CardsHeader;