import DonutChart from "@/components/charts/DonutChart"
import { SortedData, DonutChartDataType } from "@/types/types"
import { numSum } from "../utils/utils"

type ActivityTimeProps = {
  data: SortedData;
  width: number;
  height: number;
}

const ActivityTime: React.FC<ActivityTimeProps> = ({ data, width, height }) => {
  //data form = {All:[{...}], work: [{...}], ride: [{...}], ...}
  const keys = Object.keys(data)
  const sportTypes = keys.filter(k => k !== "All") //without type of "All"
  const reformatData: DonutChartDataType[] = sportTypes.map((type: string, i: number) => {
    return {
      type: type,
      value: numSum(data[type].map(d => d.moving_time))
    }
  })

  const totalMovingTime = numSum(reformatData.map(d=> d.value))
  const colours = ["#c4c2c8", "#6c82c6", "#c1c3da", "#f5f0f0", "#8a8a94"]

  return (
    <DonutChart
      data={reformatData}
      width={width}
      height={height}
      title={"Activity time"}
      colours={colours}
      totalValue={totalMovingTime}
      unit=""
      secondConvert={true}
    />
  )
}

export default ActivityTime