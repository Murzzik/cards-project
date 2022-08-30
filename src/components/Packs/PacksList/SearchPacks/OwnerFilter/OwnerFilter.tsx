import React, {useState} from 'react';
import style from './OwnerFilter.module.css';
// import {Switch} from 'antd';
import Switch from 'react-switch';
import {useAppDispatch, useAppSelector} from '../../../../../store/store';
import {setPacksParameter} from '../../../../../store/reducers/packsParameterReducer';

type OwnerFilterPropsType = {}

const OwnerFilter: React.FC<OwnerFilterPropsType> = () => {

    const dispatch = useAppDispatch();
    const user_id = useAppSelector(state => state.auth.user._id);
    let parameters = useAppSelector(state => state.packsParameter);
    let isMyPacks = useAppSelector(state => state.packsParameter.user_id) === user_id;
    const [isCheck, setCheck] = useState(true);

    const onclickHandler = (e: any) => {
        setCheck(!isCheck);

        if (isCheck) {
            dispatch(setPacksParameter({parameters: {...parameters, user_id, page: 1, sortPacks:""}}));
        } else {
            dispatch(setPacksParameter({parameters: {...parameters, user_id: '', page: 1, sortPacks:""}}));
        }

    };

    return (
        <div className={style.ownerFilter}>
            <h3>Show packs cards</h3>

            <div>
                <Switch
                    checked={isCheck}
                    onChange={onclickHandler}
                    handleDiameter={25}
                    offColor="#fff"
                    onColor="#fff"
                    offHandleColor="#E7E7E7"
                    onHandleColor="#E7E7E7"
                    height={30}
                    width={130}
                    borderRadius={5}
                    activeBoxShadow="0px 0px 1px 2px white"
                    uncheckedIcon={
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'left',
                                alignItems: 'center',
                                height: '100%',
                                fontSize: 13,
                                color: 'black',
                                position: 'absolute',
                                left: '-40px'
                            }}
                        >→ slide to All
                        </div>
                    }
                    checkedIcon={
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                fontSize: 13,
                                color: 'black',
                                paddingLeft: 10,
                                width: 90
                            }}
                        >slide to My ←
                        </div>
                    }
                    uncheckedHandleIcon={
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                color: '#000',
                                fontSize: 15,
                                fontWeight: 'bold',
                            }}
                        >
                            My
                        </div>
                    }
                    checkedHandleIcon={
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                color: '#000',
                                fontSize: 15,
                                fontWeight: 'bold',
                            }}
                        >
                            All
                        </div>
                    }
                    className="react-switch"
                    id="small-radius-switch"
                />
            </div>
        </div>
    );
};
export default OwnerFilter;