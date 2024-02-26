'use client'
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import './RunnerAnim.css'
import { ActivitiesInterface } from '@/types/types';

interface PlantsProps {
  data: ActivitiesInterface[]
}
const RunnerAnim: React.FC<PlantsProps> = ({ data }) => {
  const distance = data.map(d => d.distance / 1000)
  const totalDistance = distance.reduce((a, b) => a + b, 0)

  gsap.registerPlugin(MotionPathPlugin);

  const path = useRef<SVGPathElement | null>(null);
  //in order to store a reference to an SVG <path>, provide the type SVGPathElement to useRef
  const width = window.innerWidth * 0.7;
  const setPath = () => {
    if (path.current) {
      path.current.setAttributeNS(null, 'd', `M0 250 Q${width} 250, ${width} 250`);
      gsap.set("#running-shoe", {
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "50% 50%",
        scale: 0.15,
        autoAlpha: 1
      });
    }
  }

  const setRunningDistance = (distance: number) => {
    var adjustWindowLengthDistance = parseFloat((width * distance / 42.195).toFixed(1))
    var endPercentage = adjustWindowLengthDistance / width
    gsap.to("#running-shoe", {
      duration: 5,
      //repeat: 12,
      //repeatDelay: 3,
      yoyo: true,
      ease: "power1.inOut",
      motionPath: {
        path: "#path",
        align: "#path",
        autoRotate: true,
        alignOrigin: [0.5, 0.5],
        end: endPercentage
      }
    });
  }

  useEffect(() => {
    setPath()
    setRunningDistance(totalDistance)
  }, [])

  useEffect(() => {
    setRunningDistance(totalDistance)
  }, [totalDistance])

  return (
    <div className='body'>
      <div className='line'>
        <p className='text-neutral-400'>
          {`Total distance of your activity:`} <b className='text-neutral-400'>{`${totalDistance.toFixed(1)}`}</b>{`km`}
        </p>
        <svg>
          <path id="path" ref={path} />
          <text className='fill-neutral-400' x="0" y="270">
            0km
          </text>
          <text className='fill-neutral-400' x={`${width / 2}`} y="270">
            21km
          </text>
          <text className='fill-neutral-400' x={`${width - 75}`} y="270">
            42.195km
          </text>
          <g id='running-shoe' transform="translate(6, 3)">
            <path style={{ fill: "#AAB1BA" }}
              d="M356.667,154.19v34.133c-16.213,0-34.133-1.707-34.133-1.707
		C261.947,178.083,210.747,138.83,186,85.07c0,0-8.533-18.773-8.533-41.813l25.6-25.6c0,0,17.067,68.267,51.2,102.4
		S356.667,154.19,356.667,154.19"
            />
            <path style={{ fill: "#FF7474" }} d="M407.867,376.057h17.067c39.253,0,68.267,29.867,68.267,68.267H339.6L58,162.723L177.467,43.257
		c0,23.04,8.533,41.813,8.533,41.813c24.747,53.76,75.947,93.013,136.533,101.547c0,0,17.92,1.707,34.133,1.707v136.533
		L407.867,376.057z"/>
            <path style={{ fill: "#FFE079" }} d="M321.68,239.523c0,4.267-3.413,8.533-8.533,8.533s-8.533-4.267-8.533-8.533s3.413-8.533,8.533-8.533
		S321.68,235.257,321.68,239.523z M313.147,316.323c-5.12,0-8.533-4.267-8.533-8.533s3.413-8.533,8.533-8.533
		s8.533,4.267,8.533,8.533S318.267,316.323,313.147,316.323z"/>
            <path style={{ fill: "#ECF4F7" }} d="M493.2,444.323v17.067c0,10.24-7.68,17.067-17.067,17.067H336.187
		c-13.653,0-22.187-8.533-22.187-8.533L46.907,202.83c-7.68-7.68-7.68-21.333-0.853-28.16L58,162.724l281.6,281.6L493.2,444.323
		L493.2,444.323z"/>
          </g>
        </svg>
      </div>
    </div>

  )
}

export default RunnerAnim;