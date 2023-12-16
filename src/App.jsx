import './App.css';
import {Button, Layout, Menu, Select, Space, theme} from 'antd'
import {useState} from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import {DyBar} from "./component/DyBar";
import {ScoreLine} from "./component/ScoreLine";
import {Page4} from "./component/Page4";
import {BubbleChart} from "./component/Page2";
import {AnalysisBar} from "./component/AnalysisBar";
import {Stack} from "./component/teamInfo/Stack";
import {teams} from "./assert/option/teams";
import {Page32, Page3_2} from "./component/teamInfo/Page3_2";

const {Header, Sider, Content} = Layout;

function App() {
    const [collapsed, setCollapsed] = useState(false);
    const [activeKey, setActiveKey] = useState('1');
    const [team, setTeam] = useState('Arsenal');//球队详情，和点击的时候使用
    const [selected, setSelected] = useState('0');
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    return (
        <Layout style={{height: '100vh'}}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical"/>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[activeKey]}
                    items={[
                        {
                            key: '1',
                            label: '整体排名',
                        },
                        {
                            key: '2',
                            label: '赛况回放',
                        },
                        {
                            key: '3',
                            label: '球队分析',
                        },
                        {
                            key: '5',
                            label: '整体对比'
                        },
                        {
                            key: '4',
                            label: '对比分析'
                        }
                    ]}
                    onSelect={(s) => {
                        setActiveKey(s.key);
                    }}
                />
            </Sider>
            <Layout>
                <Header style={{padding: 0, background: colorBgContainer}}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    {
                        activeKey === '1' && (
                            <div style={{display: 'flex'}}>
                                <DyBar/>
                                <ScoreLine/>
                            </div>
                        )
                    }
                    {
                        activeKey === '2' && (
                            <BubbleChart/>
                        )
                    }
                    {
                        activeKey === '3' && (
                            <>
                                    <Select style={{width: '130px'}}
                                            value={team}
                                            onSelect={(t) => {
                                                setTeam(t)
                                            }}>
                                        {teams.map(option => {
                                            return <Select.Option key={option.key}
                                                                  value={option.value}>{option.value}</Select.Option>
                                        })}
                                    </Select>
                                    <Select value={selected}
                                            onChange={(t) => setSelected(t)}
                                            style={{marginLeft:'400px',width:'100px'}}
                                    >
                                        <Select.Option value={'0'}>赔率</Select.Option>
                                        <Select.Option value={'1'}>射中率</Select.Option>
                                    </Select>
                                <div style={{display: 'flex'}}>
                                    <Stack team={team}/>
                                    <Page32 team={team} selected={selected}/>
                                </div>
                            </>
                        )
                    }
                    {
                        activeKey === '5' && (
                            <AnalysisBar/>
                        )
                    }
                    {
                        activeKey === '4' && (
                            <Page4 setActiveKey={setActiveKey} setTeam={setTeam}/>
                        )
                    }
                </Content>
            </Layout>
        </Layout>
    );
}

export default App;
