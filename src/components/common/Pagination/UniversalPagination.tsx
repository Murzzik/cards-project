import React from 'react';
import {Pagination} from 'antd';

type PaginationPropsType = {
    totalItems: number,
    page: number | undefined,
    pageCount: number | undefined
    changePaginationData: (page: number, size: number) => void
}

const UniversalPagination: React.FC<PaginationPropsType> = ({totalItems, page, pageCount, changePaginationData}) => {
    const showTotal = (totalItems: number) => `Total ${totalItems} items`;
    const onChangeHandlerPage = (page: number, size = 4) => {
        changePaginationData(page, size);
    };

    return (
        <Pagination
            size="small"
            total={totalItems}
            onChange={onChangeHandlerPage}
            showTotal={showTotal}
            showSizeChanger
            defaultPageSize={4}
            pageSizeOptions={[4, 10, 20, 50]}
            showQuickJumper
            style={{
                width: '100%',
                maxWidth: '720px',
                textAlign: 'center',
                margin: '20px auto',
                backgroundColor: 'white',
                padding: '5px',
                borderRadius: '5px',
            }}
        />
    );
};

export default UniversalPagination;