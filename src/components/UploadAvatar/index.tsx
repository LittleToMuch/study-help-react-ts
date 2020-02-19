import React, { useState, useCallback } from 'react'
import { Upload, Icon, message } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { UploadFile, UploadChangeParam } from 'antd/lib/upload/interface';

interface IUploadAvatarProps {
    uploadPath: (path: string | undefined) => void
}

interface Response {
    data: string,
    code: number
}

function UploadAvatar(props: IUploadAvatarProps): React.ReactElement {
    const [loading, setLoading] = useState<boolean>(false)
    const [imageUrl, setImageUrl] = useState<string>('')

    const uploadButton = (
        <div>
          <Icon type={loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
      );

    const beforeUpload = useCallback((file: RcFile, fileList: RcFile[]): boolean | PromiseLike<void>  => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片大小不能超过2MB!');
        }
        return isJpgOrPng && isLt2M;
    }, [])

    const handleChange = useCallback((info: UploadChangeParam<UploadFile<Response>>) => {
        const path = info.file.response?.data
        if (info.file.status === 'uploading') {
            setLoading(loading => loading = true)
            return;
        }
        if (info.file.status === 'done') {
        // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl) => {
                setImageUrl(imageUrl as string)
                setLoading(loading => loading = true)
            })
            props.uploadPath(path)
        }
    }, [props])

    return (
        <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/api/users/uploadAvatar"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    )
}

export default UploadAvatar


function getBase64(img: File | Blob | undefined, callback: (result: string | ArrayBuffer) => void) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!));
    reader.readAsDataURL(img!);
}
