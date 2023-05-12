import LineGraph from '../LineGraph'
import { Estimate } from '@/types/listing'
import { Box, Typography } from '@mui/material'
import { ChartData } from 'chart.js'

interface FutureEstimatesLineGraphProps {
  estimates: Estimate
}

const FutureEstimatesLineGraph = ({
  estimates,
}: FutureEstimatesLineGraphProps) => {
  const data: ChartData = {
    labels: Object.keys(estimates),
    datasets: [
      {
        label: 'Future Estimate Predictions',
        data: Object.values(estimates),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        fill: true,
      },
    ],
  }
  const options: Chart.ChartOptions = {
    tooltips: {
      callbacks: {
        label: (item) => {
          return item.yLabel
            ? new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              }).format(+item.yLabel)
            : 'Missing label'
        },
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {},
        },
      ],
      yAxes: [
        {
          ticks: {
            callback: (value) => {
              return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              }).format(+value)
            },
          },
        },
      ],
    },
  }

  return (
    <Box>
      <Typography variant="h2">Future Estimate Predictions</Typography>
      <LineGraph data={data} options={options} />
    </Box>
  )
}

export default FutureEstimatesLineGraph
