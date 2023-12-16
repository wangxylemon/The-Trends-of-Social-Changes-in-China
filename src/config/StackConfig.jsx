export  const  StackConfig=(props)=>{
    const df = {
        Arsenal: {
            draw: {
                away: 3,
                expected: 7,
                home: 3,
            },
            loss: {
                away: 4,
                expected: 4,
                home: 2,
            },
            win: {
                away: 12,
                expected: 27,
                home: 14,
            },
        },
        "Aston Villa": {
            draw: {
                away: 5,
                expected: 9,
                home: 2,
            },
            loss: {
                away: 8,
                expected: 10,
                home: 5,
            },
            win: {
                away: 6,
                expected: 19,
                home: 12,
            },
        },
        Bournemouth: {
            draw: {
                away: 2,
                expected: 7,
                home: 4,
            },
            loss: {
                away: 12,
                expected: 8,
                home: 9,
            },
            win: {
                away: 5,
                expected: 23,
                home: 6,
            },
        },
        Brentford: {
            draw: {
                away: 7,
                expected: 10,
                home: 7,
            },
            loss: {
                away: 7,
                expected: 12,
                home: 2,
            },
            win: {
                away: 5,
                expected: 16,
                home: 10,
            },
        },
        Brighton: {
            draw: {
                away: 4,
                expected: 11,
                home: 4,
            },
            loss: {
                away: 7,
                expected: 9,
                home: 5,
            },
            win: {
                away: 8,
                expected: 18,
                home: 10,
            },
        },
        Chelsea: {
            draw: {
                away: 4,
                expected: 11,
                home: 7,
            },
            loss: {
                away: 10,
                expected: 10,
                home: 6,
            },
            win: {
                away: 5,
                expected: 17,
                home: 6,
            },
        },
        "Crystal Palace": {
            draw: {
                away: 5,
                expected: 11,
                home: 7,
            },
            loss: {
                away: 10,
                expected: 5,
                home: 5,
            },
            win: {
                away: 4,
                expected: 22,
                home: 7,
            },
        },
        Everton: {
            draw: {
                away: 9,
                expected: 14,
                home: 3,
            },
            loss: {
                away: 8,
                expected: 8,
                home: 10,
            },
            win: {
                away: 2,
                expected: 16,
                home: 6,
            },
        },
        Fulham: {
            draw: {
                away: 2,
                expected: 9,
                home: 5,
            },
            loss: {
                away: 10,
                expected: 7,
                home: 6,
            },
            win: {
                away: 7,
                expected: 22,
                home: 8,
            },
        },
        Leeds: {
            draw: {
                away: 3,
                expected: 5,
                home: 7,
            },
            loss: {
                away: 14,
                expected: 10,
                home: 7,
            },
            win: {
                away: 2,
                expected: 23,
                home: 5,
            },
        },
        Leicester: {
            draw: {
                away: 3,
                expected: 12,
                home: 4,
            },
            loss: {
                away: 12,
                expected: 8,
                home: 10,
            },
            win: {
                away: 4,
                expected: 18,
                home: 5,
            },
        },
        Liverpool: {
            draw: {
                away: 5,
                expected: 11,
                home: 5,
            },
            loss: {
                away: 8,
                expected: 8,
                home: 1,
            },
            win: {
                away: 6,
                expected: 19,
                home: 13,
            },
        },
        "Man City": {
            draw: {
                away: 4,
                expected: 6,
                home: 1,
            },
            loss: {
                away: 4,
                expected: 4,
                home: 1,
            },
            win: {
                away: 11,
                expected: 28,
                home: 17,
            },
        },
        "Man United": {
            draw: {
                away: 3,
                expected: 5,
                home: 3,
            },
            loss: {
                away: 8,
                expected: 7,
                home: 1,
            },
            win: {
                away: 8,
                expected: 26,
                home: 15,
            },
        },
        Newcastle: {
            draw: {
                away: 8,
                expected: 13,
                home: 6,
            },
            loss: {
                away: 3,
                expected: 5,
                home: 2,
            },
            win: {
                away: 8,
                expected: 20,
                home: 11,
            },
        },
        "Nott'm Forest": {
            draw: {
                away: 5,
                expected: 8,
                home: 6,
            },
            loss: {
                away: 13,
                expected: 11,
                home: 5,
            },
            win: {
                away: 1,
                expected: 19,
                home: 8,
            },
        },
        Southampton: {
            draw: {
                away: 2,
                expected: 8,
                home: 5,
            },
            loss: {
                away: 13,
                expected: 7,
                home: 12,
            },
            win: {
                away: 4,
                expected: 23,
                home: 2,
            },
        },
        Tottenham: {
            draw: {
                away: 5,
                expected: 6,
                home: 1,
            },
            loss: {
                away: 8,
                expected: 7,
                home: 6,
            },
            win: {
                away: 6,
                expected: 25,
                home: 12,
            },
        },
        "West Ham": {
            draw: {
                away: 3,
                expected: 7,
                home: 4,
            },
            loss: {
                away: 13,
                expected: 8,
                home: 7,
            },
            win: {
                away: 3,
                expected: 23,
                home: 8,
            },
        },
        Wolves: {
            draw: {
                away: 5,
                expected: 6,
                home: 3,
            },
            loss: {
                away: 12,
                expected: 10,
                home: 7,
            },
            win: {
                away: 2,
                expected: 22,
                home: 9,
            },
        },
    };

    var teamname = props.teamname;
    var option;

    option = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
        },
        legend: {},
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
        },
        xAxis: [
            {
                type: "category",
                data: ["Wins", "Draws", "Losses"],
            },
        ],
        yAxis: [
            {
                type: "value",
            },
        ],
        series: [
            {
                name: "Home",
                type: "bar",
                stack: "Ad",
                emphasis: {
                    focus: "series",
                },
                data: [
                    df[teamname].win.home,
                    df[teamname].draw.home,
                    df[teamname].loss.home,
                ],
            },
            {
                name: "Away",
                type: "bar",
                stack: "Ad",
                emphasis: {
                    focus: "series",
                },
                data: [
                    df[teamname].win.away,
                    df[teamname].draw.away,
                    df[teamname].loss.away,
                ],
            },
            {
                name: "Expected",
                type: "bar",
                data: [
                    df[teamname].win.expected,
                    df[teamname].draw.expected,
                    df[teamname].loss.expected,
                ],
                emphasis: {
                    focus: "series",
                },
            },
        ],
    };
    return option

}