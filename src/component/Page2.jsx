// ScatterPlot.js
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { data } from '../assert/data/bubble';

export const BubbleChart = (props) => {
    const chartRef = useRef(null);
    const teamColors = [{'Crystal Palace': '#1f77b4'},
        {'Arsenal': '#aec7e8'},
        {'Fulham': '#ff7f0e'},
        {'Liverpool': '#ffbb78'},
        {'Bournemouth': '#2ca02c'},
        {'Aston Villa': '#98df8a'},
        {'Leeds': '#d62728'},
        {'Wolves': '#ff9896'},
        {'Newcastle': '#9467bd'},
        {"Nott'm Forest": '#c5b0d5'},
        {'Tottenham': '#8c564b'},
        {'Southampton': '#c49c94'},
        {'Everton': '#e377c2'},
        {'Chelsea': '#f7b6d2'},
        {'Leicester': '#7f7f7f'},
        {'Brentford': '#c7c7c7'},
        {'Man United': '#bcbd22'},
        {'Brighton': '#dbdb8d'},
        {'West Ham': '#17becf'},
        {'Man City': '#9edae5'}];
    let colors = '#000000';
    useEffect(() => {
        if (chartRef.current && data) {
            const chart = echarts.init(chartRef.current);

            const groupedData = data.reduce((result, item) => {
                const round = item.round;
                if (!result[round]) {
                    result[round] = [];
                }
                result[round].push(item);
                return result;
            }, {});

            const option = {
                baseOption: {
                    timeline: {
                        axisType: 'category',
                        autoPlay: true,
                        playInterval: 300, // 设置轮次之间的时间间隔
                        data: Object.keys(groupedData), // 设置时间轴数据
                    },
                    tooltip: {
                        formatter: function (params) {
                            if (Array.isArray(params.value)) {
                                const [ diff_goals, score, goals, teamname ] = params.value;
                                return `${teamname}<br/>得分: ${score}<br/>进球数: ${goals}<br/>净胜球数: ${diff_goals}`;
                            } else {
                                // 处理 params.value 不是数组的情况
                                return `无效的数据格式`;
                            }
                        },
                    },
                    xAxis: {
                        type: 'value',
                        name: '净胜球数',
                        min: -70,
                        max: 70,
                    },
                    yAxis: {
                        type: 'value',
                        name: '得分',
                        min: 0,
                        max: 100,
                    },
                    series: [],
                },
                options: Object.keys(groupedData).map((round, index) => ({
                    series: [
                        {
                            type: 'scatter',
                            symbolSize: function (data) {
                                return data[2];
                            },
                            itemStyle: { color: function(params) {
                                    const teamNameToFind = params.value[3];
                                    const tottenhamColorObject = teamColors.find(team => Object.keys(team)[0] === teamNameToFind);
                                    return tottenhamColorObject[teamNameToFind];
                                } },
                            name: `Round ${round}`,
                            data: groupedData[round].map(team => ({ value: [team.diff_goals, team.score, team.goals, team.teamname] })),
                        },
                    ],
                })),
            };

            chart.setOption(option);

            window.addEventListener('resize', () => {
                chart.resize();
            });

            return () => {
                window.removeEventListener('resize', () => {
                    chart.resize();
                });

                chart.dispose();
            };
        }
    }, [chartRef, data]);

    return (
        <div>
            <h1>气泡图</h1>
            <div style={{ display:'flex' }}>
                <div ref={chartRef} style={{ width: '70%', height: '500px', flex: '80%' }} />

                <div style={{ flexDirection: 'column', alignItems: 'left', flex:'20%' }}>
                    <div style={{ flexDirection: 'column', alignItems: 'right', }}>
                        {teamColors.map((team, index) => (
                            <div key={index} style={{ alignItems: 'right', margin: '5px', display:'flex' }}>
                                <div style={{ width: '30px', height: '20px', backgroundColor: Object.values(team)[0], marginRight: '5px', flex:'10%' }}></div>
                                <div style={{ flex:'90%' }}>{Object.keys(team)[0]}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
