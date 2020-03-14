import React, {useCallback, useRef, useEffect} from 'react'
import Header from '../../../../components/Header'
import Tab from "./Tab";
import {SearchBar, WingBlank} from "antd-mobile";
import { tutsauSearch, backStateLeave } from './actionCreater'
import { connect } from 'react-redux'
import {TutsauSearch} from "../../../../store/state";

interface IMyCollectionProps {
  tutsauSearch: (value: TutsauSearch) => ReturnType<typeof tutsauSearch>
  backStateLeave: () => ReturnType<typeof backStateLeave>
}

const MyCollection: React.FC<IMyCollectionProps> = (props) => {
  let timerId = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => { props.backStateLeave() }
  })

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
  tutsauSearch,
  backStateLeave
}

export default connect(null, mapDispatchToProps)(MyCollection)
