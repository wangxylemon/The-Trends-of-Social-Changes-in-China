import {data} from '../assert/data/data_with_totalDetails'

const color = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896",
    "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22",
    "#dbdb8d", "#17becf", "#9edae5",]
export const scoreLineConfig = () => {
    const teams = Object.keys(data);
    const colorMap = teams.map((t, i) => [t, color[i]]);
    let series = [];
    teams.forEach((t,index) => {
        series.push({
            "name": t,
            "type": "line",
            "data": data[t]['score'],
            "itemStyle": {
                "color": color[index]
            }
        })
    })
    const options = {
        "tooltip": {"trigger": "axis"},
        "legend": {"data": teams, "type": "scroll", "bottom": 10},
        "grid": {
            "left": "3%",
            "right": "4%",
            "bottom": "15%",
            "containLabel": true,
        },
        "xAxis": {
            "type": "category",
            "boundaryGap": false,
            "data": data[teams[0]]["score"].map((_, index) => index + 1),
        },
        "yAxis": {"type": "value"},
        "series": series,
    }
    return options;
}
