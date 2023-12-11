import json
import pandas as pd
import streamlit as st
from streamlit_echarts import st_echarts


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
    # Using a larger set of colors to accommodate many teams
    colors = [
        "#1f77b4",
        "#aec7e8",
        "#ff7f0e",
        "#ffbb78",
        "#2ca02c",
        "#98df8a",
        "#d62728",
        "#ff9896",
        "#9467bd",
        "#c5b0d5",
        "#8c564b",
        "#c49c94",
        "#e377c2",
        "#f7b6d2",
        "#7f7f7f",
        "#c7c7c7",
        "#bcbd22",
        "#dbdb8d",
        "#17becf",
        "#9edae5",
    ]
    colors *= len(teams) // len(colors) + 1  # Repeat color list if there are many teams
    return {team: color for team, color in zip(teams, colors)}


# Main function for the Streamlit app
def draw_line():
    st.title("Season Points Evolution for Football Teams")

    # Load and process data
    file_path = "D:\\The-Trends-of-Social-Changes-in-China\\data\\data.json"  # Update the file path accordingly
    df = load_and_process_json(file_path)

    # Generate color mapping for teams
    color_mapping = generate_color_mapping(df["Team"].unique())

    # Prepare series data for ECharts
    series = []
    for team in df["Team"].unique():
        team_data = df[df["Team"] == team].sort_values("Game")
        series.append(
            {
                "name": team,
                "type": "line",
                "data": team_data["Points"].tolist(),
                "itemStyle": {"color": color_mapping[team]},
            }
        )

    # ECharts options
    options = {
        "tooltip": {"trigger": "axis"},
        "legend": {"data": list(df["Team"].unique()), "type": "scroll", "bottom": 10},
        "grid": {
            "left": "3%",
            "right": "4%",
            "bottom": "15%",  # Make room for legend
            "containLabel": "true",
        },
        "xAxis": {
            "type": "category",
            "boundaryGap": False,
            "data": list(range(1, max(df["Game"]) + 1)),
        },
        "yAxis": {"type": "value"},
        "series": series,
    }

    # Render the ECharts line chart in Streamlit
    st_echarts(options=options, height="600px")

