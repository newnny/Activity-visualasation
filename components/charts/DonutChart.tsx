import * as d3 from 'd3'
import React, { useMemo, useRef } from 'react';
import { SortedData } from '@/types/types'
import Legend from './chartComponents/Legend';

interface DonutChartProps {
  width: number;
  height: number;
  data: SortedData;
}

type SportsDistance = {
  sport_type: string;
  total_distance: number;
}

const MARGIN = 30;
const INFLEXION_PADDING = 10; // space between donut and label inflexion point

const colors = ["#ffd282", "#f9a96e", "#f07575", "#714168", "#282c5a"]


//data form = {All:[{...}], work: [{...}], ride: [{...}], ...}
const DonutChart: React.FC<DonutChartProps> = ({ width, height, data }) => {
  const radius = Math.min(width, height) / 2 - MARGIN;

  const keys = Object.keys(data)
  const sportTypes = keys.filter(k => k !== "All") //without type of "All"
  const totalDistance = (distance: number[]) => distance.reduce((a, b) => a + b, 0)
  const reformatData: SportsDistance[] = sportTypes.map((type: string, i: number) => {
    return {
      sport_type: type,
      total_distance: totalDistance(data[type].map(d => parseFloat((d.distance / 1000).toFixed(1))))
    }

  })
  /*
  d3.pie() is called with the type parameter <SportsDistance> to specify the type of data expected. 
  Then, the value() method is provided with a function that takes a parameter of type SportsDistance and returns a number, 
  which aligns with the expected signature. 
  */

  const pie = useMemo(() => {
    const pieGenerator = d3.pie<SportsDistance>()
      .value((d: SportsDistance): number => d.total_distance)
      .sort(null)
    return pieGenerator(reformatData)
  }, [data])

  const arcPathGenerator = d3.arc();

  const sliceShapes = pie && pie.length > 0 && pie.map((slice, i) => {
    const sliceinfo = {
      innerRadius: 50,
      outerRadius: radius,
      startAngle: slice.startAngle,
      endAngle: slice.endAngle
    }
    const centroid = arcPathGenerator.centroid(sliceinfo)
    const slicePath: string | null | undefined = arcPathGenerator(sliceinfo)
    const label = slice.data.sport_type
    const value = slice.data.total_distance

    // Second arc is for the legend inflexion point
    const inflexionInfo = {
      innerRadius: radius + INFLEXION_PADDING,
      outerRadius: radius + INFLEXION_PADDING,
      startAngle: slice.startAngle,
      endAngle: slice.endAngle,
    };

    const inflexionPoint = arcPathGenerator.centroid(inflexionInfo);
    const isRightLabel = inflexionPoint[0] > 0;
    const textAnchor = isRightLabel ? "start" : "end";
    return (
      <g>
        <path
          key={i}
          d={slicePath ? slicePath : undefined}
          fill={colors[i]}
        />
        {value !== 0 &&
          <text
            x={centroid[0]}
            y={inflexionPoint[1]}
            dominantBaseline="middle"
            fontSize={10}
            textAnchor={textAnchor}
          >
            {`${label} (${value}km)`}
          </text>
        }
      </g>
    )
  })

  return (
    <div>
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          {sliceShapes}
        <Legend names={sportTypes} colors={colors}/>
        </g>
      </svg>

    </div>
  )
}

export default DonutChart