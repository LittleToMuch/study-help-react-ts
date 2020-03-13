import React, { useState, useEffect, useCallback } from 'react'
import { Icon } from 'antd-mobile'
import { Upload, Modal } from 'antd'
import { UploadFile } from 'antd/lib/upload/interface'

interface IUploadImgProps {
    imgUrl: (url: string) => void
}

const UploadImg: React.FC<IUploadImgProps> = (props) => {
    const [previewVisible, setPreviewVisible] = useState<boolean>(false)
    const [previewImage, setPreviewImage] = useState<string>('')
    const [fileList, setFileList] = useState<UploadFile[]>([])

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            if(file.originFileObj) {
                // @ts-ignore
                file.preview = await getBase64(file.originFileObj);
            }
        }
        // @ts-ignore
        setPreviewImage(file.url || file.preview)
        setPreviewVisible(true)
    };

    useEffect(() => {
        
    }, [fileList])

    const handleChange = useCallback((param: any) => {
        if(param.file.response) {
            const { code, data } = param.file.response
            code === 200 && props.imgUrl(data)
        }
        setFileList(param.fileList)
        
    }, []);

    const handleCancel = () => setPreviewVisible(false);

    const uploadButton = (
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">Upload</div>
        </div>
      );

    return (
        <div>
            <Upload
            action="/api/tutsau/upload"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            >
            {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    )
}

function getBase64(file: File | Blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default UploadImg
