import React from 'react'

interface LegendProps {
  names: string[];
  colors: string[];
  width: number;
}

const Legend: React.FC<LegendProps> = ({ names, colors, width }) => {

  const legendItemSize = 14
  const legendSpacing = -4

  return (
    <>
      {names.map((name, i) => {
        return (
          <svg key={i} height={legendItemSize*1.5} width={width/(names.length*1.5)}>
            <g>
              <circle cx={legendItemSize} cy={legendItemSize} r={legendItemSize/2} fill={colors[i]} />
              <text
                x={legendItemSize*1.7}
                y={legendItemSize - legendSpacing}
                fontSize={10}
                alignmentBaseline='middle'
                textAnchor='start'
              >
                {name}
              </text>
            </g>
          </svg>
        )
      })}
    </>
  )
}

export default Legend