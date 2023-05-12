import LineGraph from '@/components/LineGraph'
import { EstimateDateRange } from '@/types/graphs'
import { Estimate } from '@/types/listing'
import { getGraphData } from '@/utils/graphs'
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  SelectChangeEvent,
} from '@mui/material'
import { ChartData } from 'chart.js'
import { useState } from 'react'

interface PastEstimatesLineGraphProps {
  estimates: Estimate
}

const PastEstimatesLineGraph = ({ estimates }: PastEstimatesLineGraphProps) => {
  const [range, setRange] = useState<EstimateDateRange>(
    EstimateDateRange['5years'],
  )
  const onChange = (e: SelectChangeEvent<EstimateDateRange>) => {
    setRange(e.target.value as EstimateDateRange)
  }

  const graphData = getGraphData(estimates, range)
  const data: ChartData = {
    labels: graphData.labels,
    datasets: [
      {
        label: 'Past Estimates',
        data: graphData.data,
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
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h2">Past Estimates</Typography>
        <Box width="30%">
          <FormControl fullWidth>
            <InputLabel id="select-label">Timeframe</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              value={range}
              label="Timeframe"
              onChange={onChange}
            >
              <MenuItem value={EstimateDateRange['1year']}>Last year</MenuItem>
              <MenuItem value={EstimateDateRange['5years']}>
                Last 5 years
              </MenuItem>
              <MenuItem value={EstimateDateRange['all']}>All time</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <LineGraph data={data} options={options} />
    </Box>
  )
}

export default PastEstimatesLineGraph
