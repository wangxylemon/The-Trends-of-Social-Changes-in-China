import * as echarts from 'echarts'
import {useEffect, useRef} from "react";
import {scoreLineConfig} from "../config/scoreLineConfig";
export const ScoreLine=(props)=>{
    const ref = useRef(null);
    let echartInstance = null;
    const renderLine = () => {
        const renderedInstance = echarts.getInstanceByDom(ref.current);
        if (renderedInstance) {
            echartInstance = renderedInstance;
        } else {
            echartInstance = echarts.init(ref.current);
        }
        echartInstance.setOption(
            scoreLineConfig()
        );
    }
    useEffect(()=>{
      renderLine()
    },[])

    return(
        <div ref={ref} style={{height:'600px',width:'1000px'}}></div>
    )
}