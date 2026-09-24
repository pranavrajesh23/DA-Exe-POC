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
