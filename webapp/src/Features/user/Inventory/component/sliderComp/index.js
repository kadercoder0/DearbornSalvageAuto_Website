import React, { useState, useRef, useEffect } from "react";
import "./sliderStyle.css";
import { Slider } from "antd";
import sliderLines from "../../../../../Assets/sliderLines.png";

const SliderComp = ({ label, min, max, defaultValue }) => {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (show && dropdownRef.current) {
      dropdownRef.current.style.height = `${dropdownRef.current.scrollHeight}px`;
      dropdownRef.current.style.opacity = "1";
    } else if (dropdownRef.current) {
      dropdownRef.current.style.height = "0px";
      dropdownRef.current.style.opacity = "0";
    }
  }, [show]);

  return (
    <div className="sliderWrapper">
      <div className="headerWrapper2" onClick={() => setShow(!show)}>
        <p className="sliderText">{label}</p>
        <span className="dropdownArrow">
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="down"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
          </svg>
        </span>
      </div>

      <div className="dropdownWrapper" ref={dropdownRef}>
        <Slider
          tooltip={{ open: show && true }}
          range
          defaultValue={defaultValue}
          min={min}
          max={max}
          className="sliderClass"
        />
        {label === "Year" ? (
          ""
        ) : (
          <img
            src={sliderLines}
            alt="slider Lines"
            className="sliderLinesClass"
            draggable={false}
          />
        )}
      </div>
    </div>
  );
};

export default SliderComp;
