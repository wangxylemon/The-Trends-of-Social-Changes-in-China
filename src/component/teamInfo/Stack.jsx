import {useEffect, useRef, useState} from "react";
import * as echarts from "echarts";
import {StackConfig} from "../../config/StackConfig";

export const Stack=(props)=>{
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
            StackConfig({teamname:props.team})
        );
    }
    useEffect(()=>{
        renderLine()
    },[props.team])
    return(
        <div ref={ref} style={{width:'500px',height:'500px'}}></div>
    )
}