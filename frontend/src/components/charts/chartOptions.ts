const sharedPlugins = {
  legend: {
    position: 'bottom' as const,
    labels: { boxWidth: 10, font: { size: 10 }, padding: 8 },
  },
}

// For vertical Bar, Line, Scatter -- charts with a standard x/y axis
export const cartesianChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: { bottom: 4 } },
  plugins: sharedPlugins,
  scales: {
    x: {
      ticks: { font: { size: 9 }, autoSkip: true, maxRotation: 40, minRotation: 40 },
    },
  },
}

// For horizontal bar charts -- same idea, axis flipped
export const horizontalCartesianChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y' as const,
  plugins: { ...sharedPlugins, legend: { display: false } },
  scales: {
    x: {
      ticks: { font: { size: 9 } },
    },
    y: {
      ticks: { font: { size: 10 } },
    },
  },
}

// For Pie, Doughnut, Radar, PolarArea -- no axes at all
export const radialChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: sharedPlugins,
}

// For a vertical stacked Bar (e.g. a stacked time series) -- same as
// cartesianChartOptions but both axes stack their datasets
export const stackedCartesianChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: { bottom: 4 } },
  plugins: sharedPlugins,
  scales: {
    x: { stacked: true, ticks: { font: { size: 9 }, autoSkip: true, maxRotation: 40, minRotation: 40 } },
    y: { stacked: true },
  },
}

// For a horizontal stacked Bar (e.g. a category broken down by series)
export const stackedHorizontalCartesianChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y' as const,
  plugins: sharedPlugins,
  scales: {
    x: { stacked: true, ticks: { font: { size: 9 } } },
    y: { stacked: true, ticks: { font: { size: 10 } } },
  },
}
