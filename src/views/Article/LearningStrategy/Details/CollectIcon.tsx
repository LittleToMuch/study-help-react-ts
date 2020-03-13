import React, { useCallback } from 'react'
import Icon from '@ant-design/icons';

interface ICollectIconProps {
    style: object
    collectCb: () => void
}

const CollectIcon: React.FC<ICollectIconProps> = (props) => {
    const collectClick = useCallback(() => {
        props.collectCb()
    }, [props.collectCb])
    return (
        <span>
            <Icon component={CollectSvg} style={props.style} onClick={collectClick}/>
        </span>

    )
}

const CollectSvg = () => (
    <div>
        <svg viewBox="0 0 1024 1024" version="1.1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" p-id="2376" width=".18rem" height=".18rem">
            <path d="M752 939.2c-9.6 0-20.8-3.2-30.4-8l-208-104-209.6 104c-20.8 11.2-48 9.6-67.2-4.8-19.2-14.4-30.4-40-25.6-64l43.2-224L89.6 484.8C72 467.2 65.6 440 72 417.6c8-24 27.2-41.6 52.8-44.8l228.8-41.6 102.4-208c11.2-22.4 33.6-36.8 57.6-36.8s48 14.4 57.6 36.8l102.4 208 228.8 40c24 3.2 44.8 20.8 51.2 44.8 8 24 1.6 49.6-16 67.2L772.8 638.4l41.6 224c4.8 25.6-6.4 49.6-25.6 64-9.6 8-22.4 12.8-36.8 12.8z" p-id="2377"></path>
        </svg>
    </div>
)

export default CollectIcon
