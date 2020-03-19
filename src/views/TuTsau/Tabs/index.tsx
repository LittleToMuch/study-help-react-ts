import React, {useState, useEffect, useCallback} from 'react'
import {Tabs, WhiteSpace} from 'antd-mobile';
import {TutsauSearch} from '../../../store/state'
import Axios from 'axios';
import ItemList from '../../../components/ItemList';
import {connect} from 'react-redux'
import {Reducers} from '../../../store/reducers';
import {ContentListJson} from '../../../utils/apiInterface';

interface ITabProps {
  value: TutsauSearch
}

interface ITabs {
  title: string
  sub?: string
}

const tabList = [
  {title: 'React'},
  {title: 'Golang'},
  {title: 'Java'},
  {title: 'Swift'},
  {title: 'Python'},
  {title: 'Rust'},
  {title: 'PHP'},
  {title: 'Ruby'}
];

const Tab: React.FC<ITabProps> = (props) => {
  const [tabs, setTabs] = useState<ITabs[]>(tabList)
  const [contents, setContents] = useState<ContentListJson[]>([])

  useEffect(() => {
    Axios.get('/api/tutsau/list').then(res => {
      const {data} = res.data
      setContents(data)
    })
  }, [])

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
          {
            tabs.map((item: ITabs, index: number) => (
                <div key={index} style={{backgroundColor: '#fff', marginBottom: '.5rem'}}>
                  {
                    contents.filter((content: ContentListJson) => {
                      return content.category === item.title.toLocaleLowerCase()
                    }).map((item: ContentListJson) => (
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
