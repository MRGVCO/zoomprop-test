import { EstimateDateRange } from '@/types/graphs'
import { Estimate } from '@/types/listing'

type GraphData = {
  labels: string[]
  data: number[]
}

export const getStartDateFromRange = (range: EstimateDateRange) => {
  const d = new Date()
  const YEAR = 365

  switch (range) {
    case EstimateDateRange['1year']:
      return d.setDate(d.getDate() - YEAR)
    case EstimateDateRange['5years']:
      return d.setDate(d.getDate() - YEAR * 5)
    default:
      return -1
  }
}

export const filterRange = (
  data: Estimate,
  range: EstimateDateRange,
): GraphData => {
  const fromDate = getStartDateFromRange(range)
  const filteredLabels = Object.keys(data).filter(
    (d) => new Date(d).getTime() >= fromDate,
  )
  const filteredData: number[] = []

  for (let i = 0; i < filteredLabels.length; i++) {
    //@ts-ignore
    filteredData.push(data[filteredLabels[i]])
  }

  return {
    labels: filteredLabels,
    data: filteredData,
  }
}

export const getGraphData = (
  data: Estimate,
  range: EstimateDateRange,
): GraphData => {
  if (range === EstimateDateRange['all'])
    return {
      labels: Object.keys(data),
      data: Object.values(data),
    }

  return filterRange(data, range)
}
