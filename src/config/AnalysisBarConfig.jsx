// AnalysisBarConfig.jsx
import { data } from '../assert/data/data_with_totalDetails';

export const AnalysisBarConfig = (dataType) => {
    const teams = Object.keys(data);
    const color = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896",
        "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7",
        "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"];

    const colorMap = {};
    teams.forEach((team, i) => { colorMap[team] = color[i % color.length]; });

    function calculateRate(numerator, denominator) {
        return denominator > 0 ? parseFloat((numerator / denominator * 100).toFixed(2)) : 0;
    }

    function get_data() {
        switch (dataType) {
            case 'shootingAccuracy':
                // 射正率
                return teams.map(team => [team, calculateRate(data[team]['totalShotTarget'], data[team]['totalShot'])]);

            case 'scoringRate':
                // 进球率
                return teams.map(team => [team, calculateRate(data[team]['totalGoal'], data[team]['totalShot'])]);

            case 'totalGoal':
                // 进球数
                return teams.map(team => [team, data[team]['totalGoal']]);

            case 'wins':
                // 胜局数
                return teams.map(team => [team, data[team]['wins']]);

            case 'draws':
                // 平局数
                return teams.map(team => [team, data[team]['draws']]);

            case 'losses':
                // 败局数
                return teams.map(team => [team, data[team]['losses']]);

            case 'totalShot':
                // 射门数
                return teams.map(team => [team, data[team]['totalShot']]);

            case 'totalShotTarget':
                // 射正数
                return teams.map(team => [team, data[team]['totalShotTarget']]);

            case 'totalPoints':
                // 总积分
                return teams.map(team => {
                    const scores = data[team].score;
                    console.log(scores[scores.length - 1])
                    return [team, scores && scores.length > 0 ? scores[scores.length - 1] : 0]; // 获取最后一场比赛的积分
                });

            default:
                return teams.map(team => [team, 0]);
        }
    }



    let option = {
        grid: { top: 10, bottom: 30, left: 150, right: 80 },
        xAxis: { max: 'dataMax' },
        yAxis: { type: 'category', inverse: true, max: 15 },
        dataset: { source: get_data() },
        series: [{
            type: 'bar',
            realtimeSort: true,
            seriesLayoutBy: 'column',
            itemStyle: { color: param => colorMap[param.value[0]] },
            encode: { x: 1, y: 0 },
            label: { show: true, position: 'right', valueAnimation: true }
        }],
        animationDuration: 0,
        animationDurationUpdate: 2000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear'
    };

    return option;
}
