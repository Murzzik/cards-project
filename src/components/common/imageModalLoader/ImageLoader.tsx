import { Button, message, Upload } from 'antd';
import type { UploadProps } from 'antd/es/upload/interface';
import React, { ChangeEvent } from 'react';
import { UploadOutlined } from '@mui/icons-material';

const props: UploadProps = {
    onChange(info: any) {
        if(info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if(info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if(info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

type ImageLoaderType = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const ImageLoader: React.FC<ImageLoaderType> = () => (
    <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
);