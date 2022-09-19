import React, {ChangeEvent, useState} from 'react';
import 'antd/dist/antd.css';
import {PlusOutlined} from '@ant-design/icons';
import {Modal, Upload} from 'antd';

type UpLoadPropsType = {
    uploadImage?: (e: ChangeEvent<HTMLInputElement>) => void,
    setImage: (base64: string) => void
    someImage?: string
}

const UpLoad: React.FC<UpLoadPropsType> = ({setImage, uploadImage, someImage}) => {
        const [previewOpen, setPreviewOpen] = useState(false);
        const [previewImage, setPreviewImage] = useState('');
        // const [previewTitle, setPreviewTitle] = useState('');
        const [fileList, setFileList] = useState([{
            // uid: '-1',
            // name: 'image.png',
            status: 'done',
            url: someImage,
        }]);

        const handleCancel = () => setPreviewOpen(false);

        const handlePreview = async (file: any) => {
            someImage && setPreviewImage(someImage);
            setPreviewOpen(true);
            // setPreviewTitle(
            //     file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
            // );
        };

        const clearPackImg = () => {
            setImage('0');
        };

        // @ts-ignore
        const handleChange = ({fileList: newFileList}) => {
            setFileList(newFileList);
        };

        const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
            uploadImage && uploadImage(e);
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
                    // @ts-ignore
                    fileList={fileList}
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
                    // title={previewTitle}
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
