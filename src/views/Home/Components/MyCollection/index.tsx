import React, {useCallback, useRef} from 'react'
import Header from '../../../../components/Header'
import Tab from "./Tab";
import {SearchBar, WingBlank} from "antd-mobile";
import { tutsauSearch } from './actionCreater'
import { connect } from 'react-redux'
import {TutsauSearch} from "../../../../store/state";

interface IMyCollectionProps {
  tutsauSearch: (value: TutsauSearch) => ReturnType<typeof tutsauSearch>
}

const MyCollection: React.FC<IMyCollectionProps> = (props) => {
  let timerId = useRef<NodeJS.Timeout | null>(null)

  const handleChange = useCallback((value: TutsauSearch) => {
    timerId.current && clearTimeout(timerId.current)
    timerId.current = setTimeout(() => {
      props.tutsauSearch(value)
    }, 400)
  }, [props])

    return (
        <div>
            <Header name="我的收藏" path="/home"/>
            <WingBlank size="sm"><SearchBar placeholder="Search" maxLength={14} onChange={handleChange}/></WingBlank>
            <Tab value=""/>
        </div>
    )
}

const mapDispatchToProps = {
  tutsauSearch
}

export default connect(null, mapDispatchToProps)(MyCollection)
