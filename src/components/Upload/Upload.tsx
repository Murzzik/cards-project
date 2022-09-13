import React, {ChangeEvent, useState} from 'react';
import 'antd/dist/antd.css';
import {PlusOutlined} from '@ant-design/icons';
import {Modal, Upload} from 'antd';

type UpLoadPropsType = {
    uploadPackImage?: (e: ChangeEvent<HTMLInputElement>) => void,
    setPackImage: (base64: string) => void
    packImage: string
}

const UpLoad: React.FC<UpLoadPropsType> = ({setPackImage, uploadPackImage, packImage}) => {
        const [previewOpen, setPreviewOpen] = useState(false);
        const [previewImage, setPreviewImage] = useState('');
        const [previewTitle, setPreviewTitle] = useState('');
        const [fileList, setFileList] = useState<any []>([]);

        const handleCancel = () => setPreviewOpen(false);

        const handlePreview = async (file: any) => {
            setPreviewImage(packImage);
            setPreviewOpen(true);
            setPreviewTitle(
                file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
            );
        };

        const clearPackImg = () => {
            setPackImage('0');
        };

        // @ts-ignore
        const handleChange = ({fileList: newFileList}) => {
            setFileList(newFileList);
        };

        const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
            uploadPackImage && uploadPackImage(e);
        };

        const uploadButton = (
            <div>
                <PlusOutlined onChange={uploadHandler}/>
                <div style={{marginTop: 8}}>
                    Upload
                </div>
            </div>

        );

        return (
            <div style={{marginTop: '10px'}} onChange={uploadHandler}>
                <Upload
                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    accept="image/png, image/jpeg, image/jpg, image/svg"
                    onPreview={handlePreview}
                    onChange={handleChange}
                    onRemove={clearPackImg}
                    beforeUpload={() => {
                        /* update state here */
                        return false;
                    }}
                    maxCount={1}
                >
                    {!fileList.length && uploadButton}
                </Upload>
                <Modal
                    visible={previewOpen}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                >
                    <img
                        alt="example"
                        style={{width: '100%'}}
                        src={previewImage}
                    />
                </Modal>
            </div>
        );
    }
;

export default UpLoad;
