import React from 'react';
import {Table} from 'antd';
import {NavLink} from 'react-router-dom';
import {convertDate} from '../../../../utils/parsData';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import IconGroup from './IconGroup/IconGroupPropsType';
import defaultPackImage from '../../../../assets/images/project-logo.png';
import PopoverUserInfoContainer from './PopoverUser/PopoverUserInfoContainer';
import {setPacksParameter} from '../../../../store/reducers/packsParameterReducer';

const columns = [
    {
        title: `Pack's image`,
        dataIndex: 'questionImage',
        width: '130px'
    },
    {
        title: 'Name',
        dataIndex: 'packName',
        sorter: {},
    },
    {
        title: 'Cards count',
        dataIndex: 'cardsCount',
        sorter: {},
        width: '130px'
    },
    {
        title: 'Last Update',
        dataIndex: 'updated',
        sorter: {},
        width: '130px'
    },
    {
        title: 'Create by',
        dataIndex: 'user_name',
        sorter: {
            // compare: (a: any, b: any) => a.grade - b.grade,
            // multiple: 1,
        },
        width: '120px'
    },
    {
        title: 'Action',
        dataIndex: 'action',
        width: '180px',
    },
];
const TablesContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const totalItems = useAppSelector(state => state.packs.cardPacksTotalCount);
    const parameters = useAppSelector(state => state.packsParameter);
    const showTotal = (totalItems: number) => `Total ${totalItems} items`;
    const packs = useAppSelector(state => state.packs.cardPacks);
    const myId = useAppSelector(state => state.auth.user._id);

    const onChange = (pagination: any, filters: any, sorter: any) => {
        const sortPacks = `${sorter.order === 'ascend' ? '0' : '1'}${sorter.field}`;
        console.log(pagination);
        if (sorter.order) {
            dispatch(setPacksParameter({parameters: {...parameters, sortPacks, page: pagination.current}}));
        }
    };
    const changeCardsPaginationData = (page: number, pageCount: number) => {
        dispatch(setPacksParameter({parameters: {...parameters, page, pageCount}}));
    };

    const data = packs.map((pack) => ({
        key: pack._id,
        questionImage:
            (pack.deckCover && pack.deckCover.includes('data:image')) ?
                <img src={pack.deckCover} alt="" style={{width: '100px'}}/>
                :
                <img src={defaultPackImage} alt="" style={{width: '100px'}}/>,
        packName: (pack.cardsCount !== 0) ?
            <NavLink to={'/packs/' + pack._id}>{pack.name}</NavLink> :
            pack.user_id === myId ? <NavLink to={'/packs/' + pack._id}>{pack.name}</NavLink>
                : <p style={{color: '#1890ff'}}>{pack.name}</p>,

        cardsCount: pack.cardsCount,
        updated: convertDate(pack.updated),
        user_name: <PopoverUserInfoContainer
            user_name={pack.user_name}
            user_id={pack.user_id}
        />,
        action: <IconGroup ownerPack={pack.user_id} packId={pack._id} packName={pack.name} cardsCount={pack.cardsCount}/>,

    }));
    return (
        <Table columns={columns}
               dataSource={data}
               onChange={onChange}
               style={{width: '80%', margin: '0 auto'}}
               pagination={{
                   size: 'small',
                   total: totalItems,
                   current: parameters.page,
                   showTotal: showTotal,
                   onChange: changeCardsPaginationData,
                   defaultPageSize: 4,
                   pageSizeOptions: [4, 10, 20, 50],
                   showQuickJumper: true,
                   showSizeChanger: true
               }}
        />
    );
};

export default TablesContainer;