import React, { ChangeEvent, useRef } from 'react'
import { Form, Input, Button } from 'antd'

interface IEditorProps {
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
    onSubmit: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
    submitting: boolean
    value: string
}

const { TextArea } = Input;

const Editor: React.FC<IEditorProps> = (props) => {
    return (
        <div>
            <Form.Item>
                <TextArea rows={4} onChange={props.onChange} value={props.value}/>
            </Form.Item>
            <Button htmlType="submit" loading={props.submitting} onClick={props.onSubmit} type="primary">
                发布
            </Button>
        </div>
    )
}

export default Editor
