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
        width: '110px'
    },
    {
        title: 'Last Update',
        dataIndex: 'updated',
        sorter: {},
        width: '110px'
    },
    {
        title: 'Create by',
        dataIndex: 'user_name',
        sorter: {
            // compare: (a: any, b: any) => a.grade - b.grade,
            //  multiple: 1,
        },
        width: '100px'
    },
    {
        title: 'Action',
        dataIndex: 'action',
        width: '110px',
    },
];
const TablesContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const totalItems = useAppSelector(state => state.packs.cardPacksTotalCount);
    const parameters = useAppSelector(state => state.packsParameter);
    const showTotal = (totalItems: number) => `Total ${totalItems} items`;
    const packs = useAppSelector(state => state.packs.cardPacks);
    const myId = useAppSelector(state => state.auth.user._id);
    const currentPage = useAppSelector(state => state.packs.page)

    const onChange = (pagination: any, filters: any, sorter: any) => {
        const sortPacks = `${sorter.order === 'ascend' ? '0' : '1'}${sorter.field}`;
        console.log(sorter.order);
        if (sorter.order) {
            dispatch(setPacksParameter({parameters: {...parameters, sortPacks, page: pagination.current}}));
        }
        // else {
        //     dispatch(setPacksParameter({parameters: {...parameters, sortPacks: '', page: pagination.current, pageCount: parameters.pageCount}}));
        // }
    };
    const changePacksPaginationData = (page: number, pageCount: number) => {
        console.log(pageCount + '   ' + page);
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
                : <p style={{color: '#1890ff'}} className={'ppp'}>{pack.name}</p>,

        cardsCount: pack.cardsCount,
        updated: <div>
            <p>{convertDate(pack.updated)[0]}</p>
            {/*<p>{convertDate(pack.updated)[1]}</p>*/}
        </div>,
        user_name: <PopoverUserInfoContainer
            user_name={pack.user_name}
            user_id={pack.user_id}
        />,
        action: <IconGroup ownerPack={pack.user_id} packId={pack._id} packName={pack.name} cardsCount={pack.cardsCount}/>,

    }));
    return (
        <Table columns={columns}
               size={'small'}
               dataSource={data}
               onChange={onChange}
               sortDirections={['ascend', 'descend', 'ascend']}
               style={{width: '80%', margin: '0 auto'}}
               pagination={{
                   size: 'small',
                   total: totalItems,
                   current: currentPage,
                   showTotal: showTotal,
                   onChange: changePacksPaginationData,
                   defaultPageSize: 4,
                   pageSizeOptions: [4, 10, 20, 50],
                   showQuickJumper: true,
                   showSizeChanger: true
               }}
        />
    );
};

export default TablesContainer;