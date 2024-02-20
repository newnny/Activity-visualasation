import React from "react"

interface CirclesProps {
  data: [];
  keyAccessor: any;
  xAccessor: any;
  yAccessor: any;
  radius: any;
}
const Circles: React.FC<CirclesProps> = ({
  data, keyAccessor, xAccessor, yAccessor, radius
}) => (
  <React.Fragment>
    {data.map((d, i) => (
      <circle
        //className="Circles__circle"
        key={keyAccessor(d, i)}
        cx={xAccessor(d, i)}
        cy={yAccessor(d, i)}
        r={typeof radius == "function" ? radius(d) : radius}
      />
    ))}
  </React.Fragment>
)



export default Circles
