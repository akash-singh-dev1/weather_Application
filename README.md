<h1 align="center">🌤️ Modern Weather & Air Quality Dashboard</h1>

<p align="center">
  A high-performance, responsive React application providing real-time weather insights, deep hourly forecasting, and extensive historical climate data in the form of data and charts using the Open-Meteo API.
</p>

## 🚀 Project Overview

This application automatically detects the user's location via browser Geolocation upon landing, delivering heavily localized data through a modern "Bento Grid" glassmorphic interface. The application is optimized to fetch, parse, and render dense meteorological datasets in under **500 milliseconds**.

## ✨ Core Features

### 1. Real-Time Insights & Hourly Forecast

- **Auto-Geolocation:** Instantly requests and resolves user coordinates to serve localized weather data on load.
- **Bento Grid Dashboard:** Displays current temperature (Min/Max/Current), Precipitation, Relative Humidity, UV Index, Wind metrics, and Sun Cycle (Sunrise/Sunset).
- **Air Quality Matrix:** Real-time tracking of EAQI, PM10, PM2.5, CO, CO2, NO2, and SO2.
- **Interactive Hourly Visualizations:** \* Features 6 distinct data charts covering 24-hour trends.
  - Users can seamlessly toggle between **Celsius and Fahrenheit** globally.
  - Charts include **Horizontal Scrolling** and a **Brush tool** for zooming into specific timeframes.

### 2. Historical Climate Analysis

- **Long-Term Trends:** Users can select custom date ranges to query up to 2 years of historical data.
- **Data Aggregation:** Calculates and visualizes daily means, maximums, and minimums over extended periods.
- **Advanced Charting:** \* Area charts with custom gradients for Temperature and Air Quality trends.
  - Bar charts for total Precipitation tracking.
  - Composed charts tracking Max Wind Speed (Area) against Dominant Wind Direction (Step Line).

## 🛠️ Tech Stack & Architecture

- **Framework:** React (Bootstrapped via Vite for rapid HMR and optimized builds)
- **Styling:** Tailwind CSS v4 (Utilizing the new `@theme` API and custom CSS variables for native Glassmorphism)
- **State & Caching:** `@tanstack/react-query`
  - Utilized for aggressive request caching, deduplication, and background data fetching to meet the <500ms rendering requirement.
- **Visualizations:** `recharts`
  - Fully responsive SVG charts optimized with `React.memo` and `useMemo` to prevent unnecessary DOM repaints.
- **Routing:** `react-router`

## ⚡ Performance Optimizations

To handle massive JSON payloads from the Open-Meteo API while maintaining a buttery-smooth 60FPS UI, the following techniques were implemented:

1. **Component Lazy Loading (`React.lazy` & `Suspense`):** Heavy charting libraries are code-split and only loaded when the user navigates to the chart sections, significantly reducing the initial JavaScript bundle size.
2. **Reference Equality (`useMemo`):** Array mapping for chart coordinates is memoized, ensuring charts only re-render when the underlying data or unit metrics explicitly change.

## 📂 Project Structure

````text
src/
├── api/                  # Open-Meteo API fetch functions
├── assets/               # Static assets and icons
├── components/           # Reusable UI components
│   ├── Charts/           # Recharts wrappers (Hourly & Historical)
│   ├── AirQualitySection # Bento grid AQI layout
│   ├── Navbar            # Responsive, floating navigation
│   └── WeatherCard       # Glassmorphic data cards
├── context/              # Global state (Location & Temperature Units)
├── hooks/                # Custom React Query hooks (useCurrentWeather, etc.)
├── layout/               # Main application shell
├── pages/                # Route components (CurrentWeather, HistoricalWeather)
└── utils/                # Date formatting, AQI logic, and Unit conversion math

## 💻 Getting Started

### Prerequisites

Make sure you have the following installed:

* **Node.js** (v18 or higher recommended)
* **npm** or **yarn**

---

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/yourusername/weather-application.git
cd weather-application
````

#### 2. Install dependencies

```bash
npm install
```

#### 3. Start the development server

```bash
npm run dev
```

#### 4. Open your browser

Navigate to:

```
http://localhost:5173
```

Ensure **browser location services** are enabled for the auto-detect feature to work.

---

## 📡 API Reference

This project relies entirely on the free, open-source **Open-Meteo API**.
**No API keys are required.**

### Endpoints Used

#### `v1/forecast`

Used for **current weather** and **24-hour hourly data**

#### `v1/archive`

Used for **historical climate data**

#### `v1/air-quality`

Used for **air quality metrics** (particulates and gases)

---

## 👨‍💻 Author

**Designed and built by Akash Singh**
