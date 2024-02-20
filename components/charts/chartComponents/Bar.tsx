import React from "react";
import * as d3 from "d3"
import { callAccessor } from "./utils";

interface BarProps {
  dataSet: [];
  x: any;
  y: any;
  width: number;
  height: number;
  fill: string;
  keyAccessor: any;
  xAccessor: any;
  yAccessor: any;
  widthAccessor: any;
  heightAccessor: any;
}

const Bar: React.FC<BarProps> = ({
  dataSet,
  fill,
  keyAccessor,
  xAccessor,
  yAccessor,
  widthAccessor,
  heightAccessor
}: BarProps) => {
  return (
    <>
      {dataSet && dataSet.map((d, i) => {
        <g key={i}>
          <rect
            key={keyAccessor(d, i)}
            x={callAccessor(xAccessor, d, i)}
            y={callAccessor(yAccessor, d, i)}
            width={d3.max([callAccessor(widthAccessor, d, i), 0])}
            height={d3.max([callAccessor(heightAccessor, d, i), 0])}
            fill={fill}
          />
        </g>
      })}
    </>
  )
}

export default Bar