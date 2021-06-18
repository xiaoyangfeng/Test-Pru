import React, { useState, useRef, useEffect } from "react";
import "./slide.css";

function IndexPage() {
  const canvas = useRef();
  let ctx = null;
  const [currentValue, setCurrentValue] = useState(34);

  useEffect(() => {
    const canvasEle = canvas.current;
    let width = document.body.clientWidth || 375;
    canvasEle.width = width * 2;
    canvasEle.height = 160;
    ctx = canvasEle.getContext("2d");

    drawHorizontal();
    for (let i = 5; i <= 80; i++) {
      let y = i % 10 === 8 ? 30 : 20;
      drawVertical(i, y);
    }

    if (window.hasOwnProperty("ontouchstart")) {
      canvasEle.ontouchmove = moving;
    } else {
      canvasEle.onmousemove = moving;
    }
  }, []);

  let wait = false;
  const moving = (e) => {
    if (e.buttons === 0 || wait) {
      return;
    }
    setCurrentValue((pre) => pre - e.movementX);
    wait = true;
    setTimeout(function () {
      wait = false;
    }, 200);
  };

  const drawVertical = (x, y) => {
    ctx.beginPath();
    ctx.strokeStyle = "#d2d9df";
    ctx.lineWidth = 2;
    ctx.moveTo((x - 5) * 20, 0);
    ctx.lineTo((x - 5) * 20, y);
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    if (x % 10 === 8) {
      ctx.font = `40px Arial`;
      ctx.fillText(x, (x - 5) * 20, 35);
    }
    ctx.closePath();
  };

  const drawHorizontal = () => {
    ctx.beginPath();
    ctx.strokeStyle = "#d2d9df";
    ctx.lineWidth = 2;
    ctx.moveTo(0, 30);
    ctx.lineTo(1500, 30);
    ctx.stroke();
    ctx.closePath();
  };

  useEffect(() => {
    setCurrentValue((pre) => {
      let current = pre > 5 ? (pre < 80 ? pre : 80) : 5;
      console.log("current is ", current);
      canvas.current.style.transform = `translateX(${(53 - current) * 20}px)`;
      return current;
    });
  }, [currentValue]);

  return (
    <div className="container">
      <h3 className="select">How old are you?</h3>
      <div className="circle">
        <div className="value select">{currentValue}</div>
      </div>
      <canvas ref={canvas} className="canvas"></canvas>
    </div>
  );
}

export default IndexPage;
