import React from 'react';
import {Pagination} from 'antd';

type PaginationPropsType = {
    totalItems: number,
    page: number,
    pageCount: number
    changePaginationData: (page: number, size: number) => void
}

const UniversalPagination: React.FC<PaginationPropsType> = ({totalItems, page, pageCount, changePaginationData}) => {

    const onChangeHandlerPage = (page: number, size = 4) => {
        changePaginationData(page, size)
    };

    return (
        <Pagination
            total={totalItems}
            showSizeChanger
            showQuickJumper
            current={page}
            onChange={onChangeHandlerPage}
            defaultPageSize={pageCount}
            pageSizeOptions={[4, 10, 20]}
            defaultCurrent={page}
            showTotal={(total) => `Total ${total} items`}
            style={{
                width: '80%',
                margin: '0 auto',
                color: 'white',
                backgroundColor: 'black',
                padding: '10px',
                borderRadius: '5px',
                marginTop: '20px',
                textAlign: 'right',
            }}
        />
    );
};

export default UniversalPagination;