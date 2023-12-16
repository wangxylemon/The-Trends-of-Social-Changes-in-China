import * as echarts from 'echarts'
import {useEffect, useRef} from "react";
import {DyBarConfig} from "../config/DyBarConfig";
import {data} from '../assert/data/data_with_totalDetails'

export const DyBar=(props)=>{
    const ref = useRef(null);
    let echartInstance = null;
    const teams = Object.keys(data);
    function updateYear(index,option) {
        option.series[0].data = teams.map((t) => {
            return [t, data[t]["score"][index]]
        });
        option.graphic.elements[0].style.text = index;
        echartInstance.setOption(option);
    }
    const renderLine = () => {
        const renderedInstance = echarts.getInstanceByDom(ref.current);
        if (renderedInstance) {
            echartInstance = renderedInstance;
        } else {
            echartInstance = echarts.init(ref.current);
        }
        let option = DyBarConfig();
        echartInstance.setOption(
            option
        );
        for (let i = 0; i < 39; ++i) {
            (function (i) {
                setTimeout(function () {
                    updateYear(i,option);
                }, i * 2000);
            })(i);
        }
    }
    useEffect(()=>{
        renderLine()
    },[])
    return(
        <div ref={ref} style={{height:'600px',width:'50%'}}></div>
    )
}