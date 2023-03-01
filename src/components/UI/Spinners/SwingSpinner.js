import React from "react";

const SwingSpinner = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="200px"
      height="200px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle cx="50" cy="50" r="10" fill="#009ee0">
        <animate
          attributeName="cx"
          values="71.21320343559643;28.78679656440357;71.21320343559643"
          keyTimes="0;0.5;1"
          dur="1s"
          calcMode="spline"
          keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
          repeatCount="indefinite"
          begin="-0.25s"
        ></animate>
        <animate
          attributeName="cy"
          values="71.21320343559643;28.786796564403577;71.21320343559643"
          keyTimes="0;0.5;1"
          dur="1s"
          calcMode="spline"
          keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
          repeatCount="indefinite"
          begin="-0.25s"
        ></animate>
        <animate
          attributeName="r"
          values="10;2;10;2;10"
          keyTimes="0;0.25;0.5;0.75;1"
          dur="1s"
          repeatCount="indefinite"
          begin="-0.25s"
        ></animate>
      </circle>
      <circle cx="50" cy="50" r="10" fill="#c7eaf8">
        <animate
          attributeName="cx"
          values="28.786796564403577;71.21320343559643;28.786796564403577"
          keyTimes="0;0.5;1"
          dur="1s"
          calcMode="spline"
          keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
          repeatCount="indefinite"
          begin="0s"
        ></animate>
        <animate
          attributeName="cy"
          values="71.21320343559643;28.78679656440357;71.21320343559643"
          keyTimes="0;0.5;1"
          dur="1s"
          calcMode="spline"
          keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
          repeatCount="indefinite"
          begin="0s"
        ></animate>
        <animate
          attributeName="r"
          values="10;2;10;2;10"
          keyTimes="0;0.25;0.5;0.75;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0s"
        ></animate>
      </circle>
    </svg>
  );
};

export default SwingSpinner;
