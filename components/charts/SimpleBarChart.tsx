import React from 'react'
import * as d3 from 'd3'
import Axis from './chartComponents/Axis';
import { ActivitiesInterface } from '@/types/types';

interface simpleBarChartProps {
  activityData: ActivitiesInterface[]
}

const SimpleBarChart: React.FC<simpleBarChartProps> = ({
  activityData
}) => {

  const xAccessor = (d: ActivitiesInterface): string => (d && d !== undefined && d !== null) ? d.start_date.substring(0, 10) : ""
  const yAccessor = (d: ActivitiesInterface): number => d!.distance / 1000

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
  
  const startDate: string[] = activityData!.map(d => d.start_date.substring(0, 10))

  const xScale = startDate && d3.scaleBand()
    .domain(startDate as string[])
    .rangeRound([dimensions.margin.left, dimensions.width - dimensions.margin.right])

  const yScale = d3.scaleLinear()
    .domain(d3.extent(activityData, yAccessor) as [number, number])
    .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])
    .nice()

  const barPadding = 16

  return (
    <svg
      width={dimensions.width}
      height={dimensions.height}
    >
      <g transform={`translate(${dimensions.margin.left}, 0`}>
        <>
          <Axis
            position='bottom'
            strScale={xScale}
            numScale={undefined}
            timeScale={undefined}
            xTicks={15}
            width={-(dimensions.width - dimensions.margin.left - dimensions.margin.right)}
            height={-(dimensions.height - dimensions.margin.top - dimensions.margin.bottom)}
            transform={`translate(0,${dimensions.height - dimensions.margin.bottom})`}
            x={(dimensions.width - dimensions.margin.left) / 2}
            y={dimensions.margin.bottom}
            text='Date'
            color='white'
          />
          <Axis
            position='left'
            numScale={yScale}
            strScale={undefined}
            timeScale={undefined}
            yTicks={15}
            width={-(dimensions.width - dimensions.margin.left - dimensions.margin.right)}
            height={-(dimensions.height - dimensions.margin.top - dimensions.margin.bottom)}
            transform={`translate(${dimensions.margin.left}, 0)`}
            x={-((dimensions.height - dimensions.margin.top - dimensions.margin.bottom) / 2)}
            y={- dimensions.margin.left + dimensions.margin.right}
            text='Distance (km)'
            color='white'
          />
          {activityData && activityData.length > 0 && activityData.map((d, id) => {
            const xAccessorValue = xAccessor(d)
            const xValue = xScale(xAccessorValue)
            if (xValue !== undefined) {
              return (
                <g key={id}>
                  <rect
                    x={xValue + (barPadding / 2)}
                    y={yScale(yAccessor(d))}
                    width={d3.max([0, dimensions.width / activityData.length - barPadding])}
                    height={dimensions.height - dimensions.margin.bottom - yScale(yAccessor(d))}
                    fill={"cornflowerblue"}
                  />
                </g>
              )
            }
          })}
        </>
      </g>
    </svg>
  )
}

export default SimpleBarChart