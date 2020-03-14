import React, {useState, useEffect, useCallback} from 'react'
import {Tabs, WhiteSpace} from 'antd-mobile';
import Axios from 'axios';
import {connect} from 'react-redux'
import {TutsauSearch} from "../../../../../store/state";
import {ContentListJson} from "../../../../../utils/apiInterface";
import ItemList from "../../../../../components/ItemList";
import {Reducers} from "../../../../../store/reducers";
import store from "../../../../../store";
import { flatten } from '../../../../../utils/utils';

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
  const [experience, setExperience] = useState<ContentListJson[]>([])
  const [learning, setLearning] = useState<ContentListJson[]>([])
  const [tutsau, setTutsau] = useState<ContentListJson[]>([])
  useEffect(() => {
    (async () => {
      const renderExp = await getRenderList('/api/experience/myCollection')
      setExperience(renderExp)
      const renderLearning = await getRenderList('/api/learning/myCollection')
      setLearning(renderLearning)
      const renderTutsau = await getRenderList('/api/tutsau/myCollection')
      setTutsau(renderTutsau)
    })()
  }, [])

  const getRenderList = async (url: string): Promise<any> => {
    const { id } = store.getState().tokenReducer
    const res = await Axios.get(url, {params: {userid: id}})
    const { data, code } = res.data
    if (code === 200) return data 
  }
  const handleChange = useCallback(async (tab, index) => {
  }, [])

  return (
      <div>
        <Tabs tabs={tabs}
              initialPage={0}
              tabBarBackgroundColor="#f5f5f9"
              onChange={handleChange}
              tabBarUnderlineStyle={{backgroundColor: '#108ee9', borderLeft: 0, borderRight: 0, borderTop: 1}}
        >
          <div>
            {
              experience.map((item: ContentListJson, index: number) => (
                  item.title.includes(props.value) ?
                      <ItemList key={index} {...item} detailUrl="/experience/detail"/> : null
              ))
            }
          </div>
          <div>
            {
              learning.map((item: ContentListJson, index: number) => (
                  item.title.includes(props.value) ?
                      <ItemList key={index} {...item} detailUrl="/learning/detail"/> : null
              ))
            }
          </div>
          <div>
            {
              tutsau.map((item: ContentListJson, index: number) => (
                  item.title.includes(props.value) ?
                      <ItemList key={index} {...item} detailUrl="/tutsau/detail"/> : null
              ))
            }
          </div>
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
