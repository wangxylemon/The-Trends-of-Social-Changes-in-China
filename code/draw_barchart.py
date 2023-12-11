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


# Main function for the Streamlit app
def draw_barchart():
    st.title("Season Points Evolution for Football Teams")

    # Load and process data
    file_path = "D:\\The-Trends-of-Social-Changes-in-China\\data\\data.json"  # Update the file path accordingly
    df = load_and_process_json(file_path)

    # Generate color mapping for teams
    color_mapping = generate_color_mapping(df["Team"].unique())

    # Slider to select a game number
    max_game_number = df["Game"].max()
    selected_game = st.slider("Select a game number:", 1, max_game_number, 1)

    # Filter the DataFrame based on the selected game number and sort by Points
    game_data = df[df["Game"] == selected_game].sort_values("Points", ascending=True)

    # Preparing the data for the ECharts series
    bar_data = []
    for _, row in game_data.iterrows():
        bar_data.append(
            {"value": row["Points"], "itemStyle": {"color": color_mapping[row["Team"]]}}
        )

    # ECharts options
    options = {
        "title": {"text": "Football Teams Points by Game", "left": "center"},
        "tooltip": {"trigger": "axis", "axisPointer": {"type": "shadow"}},
        "legend": {"data": list(color_mapping.keys()), "bottom": 0},
        "grid": {
            "left": "3%",
            "right": "4%",
            "bottom": "15%",  # Adjust space for legend
            "containLabel": "true",
        },
        "xAxis": {"type": "value", "boundaryGap": [0, 0.01]},
        "yAxis": {"type": "category", "data": game_data["Team"].tolist()},
        "series": [{"name": "Points", "type": "bar", "data": bar_data}],
    }

    # Render the ECharts bar chart in Streamlit
    st_echarts(options=options, height="800px")


