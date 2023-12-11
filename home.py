import sys
import streamlit.components.v1 as components

sys.path.append("D:\\The-Trends-of-Social-Changes-in-China")
from code.draw_barchart import draw_barchart
from code.draw_line import draw_line

draw_barchart()
draw_line()


# 使用Streamlit的HTML组件来运行JavaScript
components.html("D:\\The-Trends-of-Social-Changes-in-China\\test.js")
