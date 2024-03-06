import DonutChart from "@/components/charts/DonutChart"
import { SortedData, DonutChartDataType } from "@/types/types"

interface ActivityDistanceProps {
  width: number;
  height: number;
  data: SortedData;
}

const ActivityDistance: React.FC<ActivityDistanceProps> = ({ width, height, data }) => {
  //data form = {All:[{...}], work: [{...}], ride: [{...}], ...}
  const keys = Object.keys(data)
  const sportTypes = keys.filter(k => k !== "All") //without type of "All"
  const distanceSum = (distance: number[]) => distance.reduce((a, b) => a + b, 0)
  const reformatData: DonutChartDataType[] = sportTypes.map((type: string, i: number) => {
    return {
      type: type,
      value: distanceSum(data[type].map(d => parseFloat((d.distance / 1000).toFixed(1))))
    }
  })

  const totalDistance = distanceSum(reformatData.map(d => d.value))
  const colours = ["#ffd282", "#f9a96e", "#f07575", "#714168", "#282c5a"]

  return (
    <DonutChart
      data={reformatData}
      width={width}
      height={height}
      title={"Activity distance"}
      colours={colours}
      totalValue={totalDistance}
      unit="km"
    />
  )
}

export default ActivityDistance