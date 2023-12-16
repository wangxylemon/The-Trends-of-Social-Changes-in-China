// AnalysisBar.jsx
import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { AnalysisBarConfig } from '../config/AnalysisBarConfig';
import {Select} from "antd";

const options = [
    {
        key:'0',
        value:'总积分',
        rvalue:'totalPoints'
    },
    {
        key:'1',
        value:'胜局数',
        rvalue: "wins"
    },
    {
        key:'2',
        value:'平局数',
        rvalue:'draws'
    },
    {
        key: '3',
        value: '败局数',
        rvalue:'losses'
    },
    {
        key:'4',
        value:'射门数',
        rvalue: "totalShot"
    },
    {
        key: '5',
        value: '射正数',
        rvalue: "totalShotTarget"
    },
    {
        key: '6',
        value: '射正率',
        rvalue: "shootingAccuracy"
    },
    {
        key: '7',
        value: '进球率',
        rvalue: "scoringRate"
    },
]

export const AnalysisBar = () => {
    const chartRef = useRef(null);
    const [selectedDataType, setSelectedDataType] = useState('totalPoints');
    useEffect(() => {
        const chartInstance = echarts.init(chartRef.current);
        const updateChart = () => {
            const option = AnalysisBarConfig(selectedDataType);
            chartInstance.setOption(option);
        };

        updateChart();

        window.addEventListener('resize', () => chartInstance.resize());
        return () => window.removeEventListener('resize', chartInstance.resize);
    }, [selectedDataType]);

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center', // Centers the dropdown horizontally
        justifyContent: 'flex-start', // Aligns dropdown to the top
        height: '600px',
        width: '1000px',
        position: 'relative',
    };

    // const dropdownStyle = {
    //     marginTop: '20px', // Space above the dropdown
    //     marginBottom: '10px', // Space below the dropdown
    // };

    const chartContainerStyle = {
        height: 'calc(100% - 40px)', // Adjust the height based on dropdown space
        width: '100%',
    };

    return (
        <div style={containerStyle}>
            {/*<select style={dropdownStyle} onChange={e => setSelectedDataType(e.target.value)}>*/}
            {/*    <option value="totalPoints">总积分</option>*/}
            {/*    <option value="wins">胜局数</option>*/}
            {/*    <option value="draws">平局数</option>*/}
            {/*    <option value="losses">败局数</option>*/}
            {/*    <option value="totalShot">射门数</option>*/}
            {/*    <option value="totalShotTarget">射正数</option>*/}
            {/*    <option value="shootingAccuracy">射正率</option>*/}
            {/*    <option value="scoringRate">进球率</option>*/}
            {/*</select>*/}
            <div style={{display:'flex'}}>
            <label>选择：</label>
            <Select
                value={selectedDataType}
                onChange={(e)=>{setSelectedDataType(e)}}
                style={{width:'100px'}}
            >
                {
                    options.map(opt=>{
                        return <Select.Option key={opt.key} value={opt.rvalue}>{opt.value}</Select.Option>
                    })
                }
            </Select>
            </div>
            <div ref={chartRef} style={chartContainerStyle}></div>
        </div>
    );
}
