import DonutChart from "@/components/charts/DonutChart"
import { SortedData, DonutChartDataType } from "@/types/types"
import { numSum } from "../utils/utils"
import Legend from "@/components/charts/chartComponents/Legend"

type ActivityTypesProps = {
  data: SortedData;
  width: number;
  height: number;
}

const ActivityTypes: React.FC<ActivityTypesProps> = ({ data, width, height }) => {
  //data form = {All:[{...}], work: [{...}], ride: [{...}], ...}
  const keys = Object.keys(data)
  const sportTypes = keys.filter(k => k !== "All") //without type of "All"
  const reformatData: DonutChartDataType[] = sportTypes.map((type: string, i: number) => {
    return {
      type: type,
      value: data[type].length
    }
  })

  const totalNumberOfTypes = numSum(reformatData.map(d => d.value))
  const colours = ["#e38a2b", "#859cbb", "#384c6a", "#F3D0AA", "#9594b7", "#c09741", "#f2e9da"]

  return (
    <div className="flex flex-col">
      <DonutChart
        data={reformatData}
        width={width}
        height={height}
        title={"Activity types"}
        colours={colours}
        totalValue={totalNumberOfTypes}
        unit="activity"
        secondConvert={false}
      />
    </div>
  )
}

export default ActivityTypes