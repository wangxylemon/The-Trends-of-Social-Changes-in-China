import {data} from '../assert/data/data_with_totalDetails'
import * as echarts from "echarts";
export const Page3_2Config=(props)=>{
    var option;
    var teamname = props.teamname;
    var cur = props.selected;
    var res;
    if (cur === "0") {
        res = [
            [
                "number",
                ...data[teamname]["gameDetails"].map((_, index) => String(index + 1)),
            ],
            ["avg_win", ...data[teamname]["gameDetails"].map((g) => g.avg_win)],
            ["avg_draw", ...data[teamname]["gameDetails"].map((g) => g.avg_draw)],
            ["avg_loss", ...data[teamname]["gameDetails"].map((g) => g.avg_loss)],
        ];
    } else {
        res = [
            [
                "number",
                ...data[teamname]["gameDetails"].map((_, index) => String(index + 1)),
            ],
            [
                "ShotTarget",
                ...data[teamname]["gameDetails"].map((g) => {
                    if (g["HS"] !== undefined) return g["HST"];
                    else return g["AST"];
                }),
            ],
            [
                "ShotNotTarget",
                ...data[teamname]["gameDetails"].map((g) => {
                    if (g["HS"] !== undefined) return g["HS"] - g["HST"];
                    else return g["AS"] - g["AST"];
                }),
            ],
        ];
    }
    var myChart = null;
    setTimeout(function () {
        option = {
            legend: {},
            tooltip: {
                trigger: "axis",
                showContent: false,
            },
            dataset: {
                source: res,
            },
            xAxis: { type: "category" },
            yAxis: { gridIndex: 0 },
            grid: { top: "55%" },
            series: [
                {
                    type: "line",
                    smooth: true,
                    seriesLayoutBy: "row",
                    emphasis: { focus: "series" },
                },
                {
                    type: "line",
                    smooth: true,
                    seriesLayoutBy: "row",
                    emphasis: { focus: "series" },
                },
                {
                    type: "line",
                    smooth: true,
                    seriesLayoutBy: "row",
                    emphasis: { focus: "series" },
                },
                {
                    type: "line",
                    smooth: true,
                    seriesLayoutBy: "row",
                    emphasis: { focus: "series" },
                },
                {
                    type: "pie",
                    id: "pie",
                    radius: "30%",
                    center: ["50%", "25%"],
                    emphasis: {
                        focus: "self",
                    },
                    label: {
                        formatter: "{b}: {@1} ({d}%)",
                    },
                    encode: {
                        itemName: "number",
                        value: "1",
                        tooltip: "1",
                    },
                },
            ],
        };
        const renderedInstance = echarts.getInstanceByDom(props.ref.current);
        if (renderedInstance) {
            myChart = renderedInstance;
        } else {
            myChart = echarts.init(props.ref.current);
        }
        myChart.on("updateAxisPointer", function (event) {
            const xAxisInfo = event.axesInfo[0];
            if (xAxisInfo) {
                const dimension = xAxisInfo.value + 1;
                myChart.setOption({
                    series: {
                        id: "pie",
                        label: {
                            formatter: "{b}: {@[" + dimension + "]} ({d}%)",
                        },
                        encode: {
                            value: dimension,
                            tooltip: dimension,
                        },
                    },
                });
            }
        });
        myChart.setOption(option);
    });

    if (option && typeof option === "object") {
        myChart.setOption(option);
    }
    return option;
}