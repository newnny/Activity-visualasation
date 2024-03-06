import * as d3 from 'd3'
import React, { useState, useMemo } from 'react';
import { DonutChartDataType } from '@/types/types'
import styles from './chart.module.css'
import { convertSectoHms } from '@/app/utils/utils';
import Legend from './chartComponents/Legend';
interface DonutChartProps {
  width: number;
  height: number;
  data: DonutChartDataType[];
  title: string;
  colours: string[];
  unit: string;
  totalValue: number | null;
  secondConvert: boolean;
}

const MARGIN = 30;
const INFLEXION_PADDING = 10; // space between donut and label inflexion point


const DonutChart: React.FC<DonutChartProps> = ({ width, height, data, title, colours, totalValue, unit, secondConvert }) => {
  const radius = Math.min(width, height) / 2 - MARGIN;

  const [selectedSlice, setSelectedSlice] = useState<string | null>(null);

  /*
  d3.pie() is called with the type parameter <DonutChartDataType> to specify the type of data expected. 
  Then, the value() method is provided with a function that takes a parameter of type DonutChartDataType and returns a number, 
  which aligns with the expected signature. 
  */

  const pie = useMemo(() => {
    const pieGenerator = d3.pie<DonutChartDataType>()
      .padAngle(0.005)
      .value((d: DonutChartDataType): number => d.value)
      .sort(null)
    return pieGenerator(data)
  }, [data])

  const sliceShapes = pie && pie.length > 0 && pie.map((slice, i) => {
    const arcPathGenerator = d3.arc();
    const sliceinfo = {
      innerRadius: 50,
      outerRadius: radius,
      startAngle: slice.startAngle,
      endAngle: slice.endAngle
    }
    const centroid = arcPathGenerator.centroid(sliceinfo)
    const slicePath: string | null | undefined = arcPathGenerator(sliceinfo)
    const label = slice.data.type
    const value = slice.data.value

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

    const className =
      selectedSlice && label !== selectedSlice
        ? styles.slice + " " + styles.dimmed
        : styles.slice;

    const sliceTextRender = () => {
      if (!selectedSlice) {
        if (totalValue) {
          return `${(value / totalValue * 100).toFixed(1)}%`
        } else {
          return label
        }
      } else {
        if (selectedSlice == label) {
          if (secondConvert) {
            return convertSectoHms(value)
          } else {
            return `${value} ${unit}`
          }
        } else {
          return ""
        }
      }
    }
    return (
      <g key={i}>
        <path
          key={i}
          d={slicePath ? slicePath : undefined}
          fill={colours[i]}
          className={className}
          onMouseOver={() => setSelectedSlice(label)}
          onMouseLeave={() => setSelectedSlice(null)}
        />
        {value !== 0 &&
          <text
            x={centroid[0]}
            y={inflexionPoint[1]}
            dominantBaseline="middle"
            fontSize={10}
            style={{ maxWidth: width, textWrap: "wrap", wordWrap: "break-word" }}
            className='w-8 text-wrap break-words'
            textAnchor={textAnchor}
            fontWeight={selectedSlice === label ? "bold" : "inherit"}
          >
            {sliceTextRender()}
          </text>
        }
      </g>
    )
  })

  return (
    <div className='flex flex-col'>
      <div className='flex justify-center items-center'>
        <Legend
          names={data.map(d => d.type)}
          colors={colours}
          width={width}
        />
      </div>
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          {sliceShapes}
        </g>
      </svg>
      <p className='flex text-xs justify-center items-center'>
        {title}
      </p>
    </div>
  )
}

export default DonutChart