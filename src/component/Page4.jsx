import {useState} from "react";
import {Avatar, Card, Select, Space} from "antd";
import {teams} from "../assert/option/teams";
import {data} from "../assert/data/data_with_totalDetails";

const {Meta} = Card;
export const Page4 = (props) => {
    const [team1, setTeam1] = useState("Arsenal");
    const [team2, setTeam2] = useState("Aston Villa");
    return (<>
            <Space direction={'vertical'}>
                <Select style={{width: '130px'}}
                        value={team1}
                        onSelect={(t) => {
                            if (t !== team2)
                                setTeam1(t)
                        }}>
                    {teams.map(option => {
                        return <Select.Option key={option.key} value={option.value}>{option.value}</Select.Option>
                    })}
                </Select>
                <Select
                    style={{width: '130px'}}
                    value={team2}
                    onSelect={(t) => {
                        if (t !== team1) setTeam2(t);
                    }}>
                    {
                        teams.map(option => {
                            return <Select.Option key={option.key} value={option.value}>{option.value}</Select.Option>
                        })
                    }
                </Select>
            </Space>
            <Space direction={'vertical'}>
                {
                    data[team1]["gameDetails"].filter(detail => detail["opponent"] === team2).map(game => {
                        return (
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Card style={{width: '300px'}}
                                      onClick={() => {
                                          props.setActiveKey('3');
                                          props.setTeam(team1);
                                      }}
                                >
                                    <div style={{display: 'flex'}}>
                                        <Meta
                                            avatar={<Avatar size={'large'}
                                                            src={require(`../assert/Logo/${team1}.png`)}/>}
                                            title={team1}
                                        />
                                        <div style={{marginLeft: '50%', fontSize: '20px'}}>{game.goal}</div>
                                    </div>
                                </Card>
                                <div style={{margin: '0 10px', fontSize: '24px'}}>vs</div>
                                <Card style={{width: '300px'}}
                                      onClick={() => {
                                          props.setTeam(team2);
                                          props.setActiveKey('3');
                                      }}
                                >
                                    <div style={{display: 'flex'}}>
                                        <div style={{fontSize: '20px'}}>{game.opponentGoal}</div>
                                        <Meta
                                            title={team2}
                                            avatar={<Avatar size={'large'}
                                                            src={require(`../assert/Logo/${team2}.png`)}/>}
                                            style={{marginLeft: '40%'}}
                                        />
                                    </div>
                                </Card>
                            </div>
                        )
                    })
                }
            </Space>
        </>
    );
}