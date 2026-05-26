import fastf1
import streamlit as st
import plotly.express as px


# ----------------- STREAMLIT APP -----------------
st.set_page_config(page_title="F1 Dashboard", layout="wide")
st.title("🏎️ Formula 1 Dashboard")

# --- User Inputs ---
year = st.slider("Select Year", 2018, 2023, 2023)
gp = st.text_input("Grand Prix (e.g. Monza, Silverstone, Bahrain)", "Monza")
session_type = st.selectbox("Session Type", ["R", "Q", "FP1", "FP2", "FP3"])

# Load session
session = fastf1.get_session(year, gp, session_type)
session.load()

# --- Show results table ---
st.subheader(" Session Results")
st.dataframe(session.results[["Abbreviation", "Position", "Points", "Status"]])

# --- Driver selection ---
drivers = session.results["Abbreviation"].tolist()
selected_driver = st.selectbox("Choose Driver", drivers)

# Get laps for that driver
laps = session.laps.pick_drivers(selected_driver)

if not laps.empty:
    # Cleaned lap dataframe
    lap_data = laps[["LapNumber", "LapTime", "Sector1Time", "Sector2Time", "Sector3Time"]]
    st.subheader(f" Lap Times for {selected_driver}")
    st.dataframe(lap_data)

    # Convert timedelta to seconds for plotting
    lap_data = lap_data.copy()
    lap_data["LapTime(s)"] = lap_data["LapTime"].dt.total_seconds()

    # --- Plot Lap Times ---
    fig = px.line(lap_data, x="LapNumber", y="LapTime(s)",
                  title=f"Lap Times for {selected_driver}",
                  markers=True)
    st.plotly_chart(fig, use_container_width=True)

else:
    st.warning(f"No lap data available for {selected_driver}")
