import { DashboardLayout } from '../../design/DashboardLayout/DashboardLayout'
import { StatCard } from '../../components/charts/StatCard/StatCard'
import { BarChartWidget } from '../../components/charts/BarChartWidget/BarChartWidget'
import { LineChartWidget } from '../../components/charts/LineChartWidget/LineChartWidget'
import { PieChartWidget } from '../../components/charts/PieChartWidget/PieChartWidget'
import './FleetHealthDashboard.css'
import { TextPanel } from '../../components/common/TextPanel'
import { DataTable } from '../../components/common/DataTable'

export function FleetHealthDashboard() {
  // Placeholder data -- swap each of these for your real /api call results.
  const weeklyLabels = ['7/1', '7/8', '7/15', '7/22', '7/29', '8/5', '8/12']
  const weeklyValues = [7200, 7400, 7100, 7500, 7300, 9800, 7600]

  const hierarchyLabels = ['Supply Chain Solutions', 'West Operations', 'Integrated Solutions']
  const hierarchyValues = [9.8, 9.8, 10.0]

  const topPerformersLabels = ['Sumter Utilities', 'Service Electric Co', 'Potelco Inc']
  const topPerformersValues = [1.9, 2.9, 5.1]

  const reportingStatusLabels = ['North Houston Pole Line LP', 'NorthStar Energy Solutions', 'PAR Western Line Contractors']
  const reportingStatusValues = [22.0, 21.3, 14.5]

  const highestSmallLabels = ['Price Gregory Int\'l Alaska', 'GRD Line Construction', 'The Hallen Construction']
  const highestSmallValues = [58.0, 57.6, 47.6]

  const deviceCategoryLabels = ['Powered Assets', 'On Road Devices', 'Battery Assets', 'OEM Activation', 'Other']
  const deviceCategoryValues = [38, 30, 20, 8, 4]

  const nonReportingLabels = ['30 Days or Less', '31-60 Days', '61-90 Days', '91-180 Days', '181-365 Days', 'More than 365']
  const nonReportingValues = [1334, 787, 502, 814, 1070, 1557]

  const nruCategoryLabels = ['Incomplete', 'Lost Power', 'Low Battery', 'Requires Investigation', 'Weak Cellular Signal']
  const nruCategoryValues = [186, 2528, 888, 1642, 820]

  const lowestSmallLabels = ['Pinnacle Foundation Solutions', 'Advanced Electric Systems', 'PJ Helicopters']
  const lowestSmallValues = [2.3, 2.4, 2.8]

  const tableColumns = ['Region', 'Group', 'Opu', 'Company', 'VzcInstallCount', 'LytxInstallCount']
  const tableRows = [
    { Region: 'UU&I Operations', Group: 'Price Gregory Region', Opu: 'Price Gregory', Company: '00427 Price Gregory Int\'l Alaska', VzcInstallCount: 300, LytxInstallCount: 158 },
    { Region: 'East Operations', Group: 'Telecom East Region', Opu: 'Telecom East Group', Company: '00108 The ComTran Group', VzcInstallCount: 278, LytxInstallCount: 159 },
  ]

  return (
    <DashboardLayout
      summary={
        <TextPanel
          title="Summary"
          text="by Company, Region, Vehicle Type and days NRU."
        />
      }
      kpi1={<StatCard label="Total Units" value="47,855" />}
      kpi2={<StatCard label="Current NRUs" value="6,152" />}
      kpi3={<StatCard label="NRU Percentage" value="12.9%" />}
      main={<LineChartWidget labels={weeklyLabels} values={weeklyValues} label="Weekly NRU Count" />}
      barA={<BarChartWidget labels={hierarchyLabels} values={hierarchyValues} horizontal color="#DE350B" />}
      barB={<BarChartWidget labels={topPerformersLabels} values={topPerformersValues} color="#FF8B00" />}
      barC={<BarChartWidget labels={reportingStatusLabels} values={reportingStatusValues} horizontal color="#DE350B" />}
      barD={<BarChartWidget labels={highestSmallLabels} values={highestSmallValues} horizontal color="#42526E" />}
      pie={<PieChartWidget labels={deviceCategoryLabels} values={deviceCategoryValues} />}
      barE={<BarChartWidget labels={nonReportingLabels} values={nonReportingValues} horizontal color="#DE350B" />}
      barF={<BarChartWidget labels={nruCategoryLabels} values={nruCategoryValues} color="#FF8B00" />}
      barG={<BarChartWidget labels={lowestSmallLabels} values={lowestSmallValues} horizontal color="#42526E" />}
      table={<DataTable columns={tableColumns} rows={tableRows} maxHeight={340} />}
    />
  )
}
