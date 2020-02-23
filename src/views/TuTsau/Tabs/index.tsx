import React, { useState } from 'react'
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';

interface ITabProps {
    
}
interface ITabs {
    title: string
    sub?: string
}

const tabs = [
    { title: 'First Tab' },
    { title: 'Second Tab' },    
    { title: 'Third Tab' },
  ];
  
  const tabs2 = [
    { title: 'First Tab', sub: '1' },
    { title: 'Second Tab', sub: '2' },
    { title: 'Third Tab', sub: '3' },
    { title: 'Fourth Tab', sub: '4' },
  ];

const Tab: React.FC<ITabProps> = () => {
    const [tabs, setTabs] = useState<ITabs[]>([{ title: 'First Tab' },
    { title: 'Second Tab' },    
    { title: 'Third Tab' },])
    return (
        <div>
            <div>
                <Tabs tabs={tabs2}
                initialPage={1}
                tabBarBackgroundColor="#f5f5f9"
                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                >
                {
                    tabs.map((item, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
                            Content of {item.title}
                        </div>
                    ))
                }
                </Tabs>
                <WhiteSpace />
            </div>
        </div>
    )
}

export default Tab
