import React, { createContext, useContext } from "react"
import type { dimensions } from "@/types/types";

const ChartContext = createContext({});
export const useDimensionsContext = () => useContext(ChartContext)

interface ChartProps {
  children: React.ReactNode;
  dimensions: dimensions
}

const Chart:React.FC<ChartProps> = ({children, dimensions})=> (
  <ChartContext.Provider value={dimensions}>
    <svg width={dimensions.width} height={dimensions.height}>
      <g transform={`translate(${dimensions.marginLeft}, ${dimensions.marginTop})`}>
        {children}
      </g>
    </svg>
  </ChartContext.Provider>
)