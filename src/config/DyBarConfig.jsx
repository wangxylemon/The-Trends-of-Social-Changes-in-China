import {data} from '../assert/data/data_with_totalDetails'

export const DyBarConfig = ()=>{
    const teams = Object.keys(data);
    const color = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896",
        "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22",
        "#dbdb8d", "#17becf", "#9edae5",]
    const colorMap = {}
    let dimension = 0;
    teams.forEach((t,i)=>{colorMap[t] = color[i]});
    function get_data(index){
        return teams.map((t)=>{return [t,data[t]["score"][index]]});
    }

    const updateFrequency = 2000;
    let option = {
        grid: {
            top: 10,
            bottom: 30,
            left: 150,
            right: 80
        },
        xAxis: {
            max: 'dataMax',
            axisLabel: {
                formatter: function (n) {
                    return Math.round(n) + '';
                }
            }
        },
        dataset: {
            source: get_data(0)
        },
        yAxis: {
            type: 'category',
            inverse: true,
            max: 15,
            axisLabel: {
                show: true,
                fontSize: 10,
                formatter: function (value) {
                    return value
                },
                rich: {
                    flag: {
                        fontSize: 25,
                        padding: 5
                    }
                }
            },
            animationDuration: 300,
            animationDurationUpdate: 300
        },
        series: [
            {
                realtimeSort: true,
                seriesLayoutBy: 'column',
                type: 'bar',
                itemStyle: {
                    color: function (param) {
                        return colorMap[param.value[0]];
                    }
                },
                encode: {
                    x: 1,
                    y: 0
                },
                label: {
                    show: true,
                    precision: 1,
                    position: 'right',
                    valueAnimation: true,
                    fontFamily: 'monospace'
                }
            }
        ],
        // Disable init animation.
        animationDuration: 0,
        animationDurationUpdate: updateFrequency,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear',
        graphic: {
            elements: [
                {
                    type: 'text',
                    right: 160,
                    bottom: 60,
                    style: {
                        text: 0,
                        font: 'bolder 80px monospace',
                        fill: 'rgba(100, 100, 100, 0.25)'
                    },
                    z: 100
                }
            ]
        }
    };
    return option
}