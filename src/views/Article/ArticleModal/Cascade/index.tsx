import React, { Component } from 'react'
import { Picker, List } from 'antd-mobile'
import store from '../../../../store';

interface ICascadeProps {
    getValue: (val: string[]) => void
}

interface ICascadeState {
    sValue: string[]
}

export default class Cascade extends Component<ICascadeProps, ICascadeState> {
    public state = {
        sValue: [],
    }

    private handleChange = (v: any) => {
        this.setState({ sValue: v })
        this.props.getValue(v)
    }

    render() {
        return (
            <div>
                <Picker
                    data={season}
                    title="选择类别"
                    cascade={false}
                    extra="请选择"
                    value={this.state.sValue}
                    onChange={this.handleChange}
                >
                <List.Item arrow="horizontal">类别:</List.Item>
                </Picker>
            </div>
        )
    }
}



const season = [
    [
        { label: "经验", value: "0" },
        { label: "攻略", value: "1" }
    ],
    [
        {label: 'React', value: 'react'},
        {label: 'Golang', value: 'golang'},
        {label: 'Java', value: 'java'},
        {label: 'Swift', value: 'swift'},
        {label: 'Python', value: 'python'},
        {label: 'Rust', value: 'rust'},
        {label: 'PHP', value: 'php'},
        {label: 'Ruby', value: 'ruby'}
    ]
]
