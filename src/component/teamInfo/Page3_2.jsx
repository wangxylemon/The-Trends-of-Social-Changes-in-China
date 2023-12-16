import {useEffect, useRef, useState} from "react";
import * as echarts from "echarts";
import {StackConfig} from "../../config/StackConfig";
import {Page3_2Config} from "../../config/Page3_2Config";

export const Page32 = (props) => {
    const ref = useRef(null);
    let echartInstance = null;
    const renderLine = () => {
        const renderedInstance = echarts.getInstanceByDom(ref.current);
        if (renderedInstance) {
            echartInstance = renderedInstance;
        } else {
            echartInstance = echarts.init(ref.current);
        }
        Page3_2Config({teamname: props.team, ref: ref, selected: props.selected})
    }
    useEffect(() => {
        renderLine()
    }, [props.team,props.selected])
    return (
        <>
            <div ref={ref} style={{width: '800px', height: '500px', marginTop: '35px'}}></div>
        </>
    )
}