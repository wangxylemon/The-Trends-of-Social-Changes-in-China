import json
import pandas as pd
import streamlit as st
from streamlit_echarts import st_echarts
from pyecharts.commons.utils import JsCode


# Load and process the JSON file
def load_and_process_json(file_path):
    with open(file_path, "r") as file:
        data = json.load(file)

    # Create a DataFrame to hold all the team data
    team_points = {team: data[team]["score"] for team in data}
    df = pd.DataFrame(team_points)

    # Convert the DataFrame to a "long" format suitable for ECharts
    df = df.reset_index().melt(id_vars=["index"], var_name="Team", value_name="Points")
    df.rename(columns={"index": "Game"}, inplace=True)
    df["Game"] += 1  # Games are 1-indexed, not 0-indexed

    return df


# Function to generate color mapping for teams
def generate_color_mapping(teams):
    colors = [
        "#1f77b4",
        "#ff7f0e",
        "#2ca02c",
        "#d62728",
        "#9467bd",
        "#8c564b",
        "#e377c2",
        "#7f7f7f",
        "#bcbd22",
        "#17becf",
    ] * (
        len(teams) // 10 + 1
    )  # Repeat color list if there are many teams
    return {team: color for team, color in zip(teams, colors)}


def formatter1(n):
    return n


def get_data(index, data):
    res = []
    for key in data.keys():
        res.append([key, data[key]["score"][index]])
    return res


def draw_line2():
    data = pd.read_json("D:\\The-Trends-of-Social-Changes-in-China\\data\\data.json")
    colors = generate_color_mapping(data.keys())
    yAxis_formatter = " function (value) {return value; }"
    color_formatter = "function (param) {return colors[param.value[0]];}"
    updateFrequency = 2000
    option = {
        "grid": {"top": 10, "bottom": 30, "left": 150, "right": 80},
        "xAxis": {
            "max": "dataMax",
        },
        "dataset": {"source": get_data(0, data)},
        "yAxis": {
            "type": "category",
            "inverse": True,
            "max": 10,
            "axisLabel": {
                "show": True,
                "fontSize": 14,
                "formatter": ,
                "rich": {"flag": {"fontSize": 25, "padding": 5}},
            },
            "animationDuration": 300,
            "animationDurationUpdate": 300,
        },
        "series": [
            {
                "realtimeSort": True,
                "seriesLayoutBy": "column",
                "type": "bar",
                "itemStyle": {"color": color_formatter},
                "encode": {
                    "x": "",
                    "y": 3,
                },
                "label": {
                    "show": True,
                    "precision": 1,
                    "position": "right",
                    "valueAnimation": True,
                    "fontFamily": "monospace",
                },
            }
        ],
        "animationDuration": 0,
        "animationDurationUpdate": updateFrequency,
        "animationEasing": "linear",
        "animationEasingUpdate": "linear",
        "graphic": {
            "elements": [
                {
                    "type": "text",
                    "right": 160,
                    "bottom": 60,
                    "style": {
                        "text": "<startYear should be replaced with the actual year>",
                        "font": "bolder 80px monospace",
                        "fill": "rgba(100, 100, 100, 0.25)",
                    },
                    "z": 100,
                }
            ]
        },
    }
    st_echarts(options=option)
