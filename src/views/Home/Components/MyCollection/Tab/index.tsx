import React, {useState, useEffect, useCallback} from 'react'
import {Tabs, WhiteSpace} from 'antd-mobile';
import Axios from 'axios';
import {connect} from 'react-redux'
import {TutsauSearch} from "../../../../../store/state";
import {ContentListJson} from "../../../../../utils/apiInterface";
import ItemList from "../../../../../components/ItemList";
import {Reducers} from "../../../../../store/reducers";
import store from "../../../../../store";

interface ITabProps {
  value: TutsauSearch
}

interface ITabs {
  title: string
  sub?: string
}

const tabList = [
  {title: '经验'},
  {title: '攻略'},
  {title: '吐槽'},
];

const Tab: React.FC<ITabProps> = (props) => {
  const [tabs, setTabs] = useState<ITabs[]>(tabList)
  const [contents, setContents] = useState<ContentListJson[]>([])
  useEffect(() => {
    const { id } = store.getState().tokenReducer
    Axios.get('/api/experience/myCollection', {params: {userid: id}}).then(res => {
      const {data, code} = res.data
      code === 200 && setContents(data)
    })
  }, [])

  const handleChange = useCallback(async (tab, index) => {
    console.log(tab, index)
  }, [])

  console.log(contents)
  return (
      <div>
        <Tabs tabs={tabs}
              initialPage={0}
              tabBarBackgroundColor="#f5f5f9"
              onChange={handleChange}
              tabBarUnderlineStyle={{backgroundColor: '#108ee9', borderLeft: 0, borderRight: 0, borderTop: 1}}
        >
          {
            tabs.map((item: ITabs, index: number) => (
                <div key={index} style={{backgroundColor: '#fff'}}>
                  {
                    contents.map((item: ContentListJson) => (
                        item.title.includes(props.value) ?
                            <ItemList key={item.id} {...item} detailUrl="/tutsau/detail"/> : null
                    ))
                  }
                </div>
            ))
          }
        </Tabs>
      </div>
  )
}

const mapStateToProps = (state: Reducers) => {
  return {
    value: state.tutsauSearch
  }
}

export default connect(mapStateToProps, null)(Tab)
