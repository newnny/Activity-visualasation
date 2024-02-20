import React from "react";
import * as d3 from "d3"

import Circles from "./chartComponents/Circles";
import { ActivitiesInterface } from "@/types/types";

interface ScatterPlotProps {
  data: ActivitiesInterface[]
}
const ScatterPlot: React.FC<ScatterPlotProps> = ({
  data
}) => {

  let dimensions = {
    width: window.innerWidth * 0.7,
    height: 420,
    margin: {
      top: 15,
      right: 15,
      bottom: 60,
      left: 50
    }
  }

  const xAccessor = (d: ActivitiesInterface) => d.distance
  const yAccessor = (d: ActivitiesInterface) => d.average_speed

  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xAccessor) as number[])
    .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])
    .nice()

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yAccessor) as number[])
    .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])
    .nice()

  const barPadding = 2
  
  const xAccessorScaled = (d: ActivitiesInterface) => xScale(xAccessor(d))
  const yAccessorScaled = (d: ActivitiesInterface) => yScale(yAccessor(d))
  const keyAccessor = (d: ActivitiesInterface, i: number) => i
  //const widthAccessorScaled = d => xScale(d.x1) - xScale(d.x0) - barPadding
  //const heightAccessorScaled = d => dimensions.boundedHeight - yScale(yAccessor(d))


  return (
    <div>

    </div>

  )
}

export default ScatterPlot