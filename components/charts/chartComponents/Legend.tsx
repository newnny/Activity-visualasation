import React, { useState, useEffect } from 'react'

interface LegendProps {
  names: string[],
  colors: string[]
}

const Legend: React.FC<LegendProps> = ({ names, colors }) => {
  const initialCY = 130
  const [cy, setCY] = useState<number[]>([])

  const generateMappedCY = () => {
    const mappedCY: number[] = []
    let initialValue = initialCY

    for (let i = 0; i < names.length; i++) {
      mappedCY.push(initialValue);
      initialValue += 30
    }

    setCY(mappedCY)
  }

  useEffect(() => {
    generateMappedCY()
  }, [])

  return (
    <>
      {names.map((name, i) => {
        cy.map(y => {
          return (
            <g key={i} width={300} height={300} fill='black'>
              <circle cx={200} cy={y} r={6} fill={colors[i]} />
              <text alignmentBaseline='middle' fontSize={15}>
                {name}
              </text>
            </g>)
        })
      })}
    </>
  )
}

export default Legend