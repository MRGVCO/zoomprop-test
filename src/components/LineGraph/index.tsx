import { ChartOptions } from 'chart.js'
import { ChartData, Line } from 'react-chartjs-2'

interface LineGraphProps {
  data: ChartData<Chart.ChartData>
  options: ChartOptions
}

const LineGraph = ({ data, options }: LineGraphProps) => (
  <Line data={data} options={options} />
)

export default LineGraph
