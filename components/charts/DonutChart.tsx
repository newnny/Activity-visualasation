import * as d3 from 'd3'
import { SortedData } from '@/types/types'

interface PlantsProps {
  data: SortedData
}

type SportsDistance = {
  sport_type: string;
  total_distance: number;
}[]

//data form = {All:[{...}], work: [{...}], ride: [{...}], ...}
const DonutChart: React.FC<PlantsProps> = ({ data }) => {
  const keys = Object.keys(data)
  const totalDistance = (distance: number[]) => distance.reduce((a, b) => a + b, 0)
  const reformat:SportsDistance = keys.map((k: string, i: number) => {
    return {
      sport_type: k,
      total_distance: totalDistance(data[k].map(d => parseFloat((d.distance / 1000).toFixed(1))))
    }
  })

  return (
    <div>

    </div>
  )
}

export default DonutChart