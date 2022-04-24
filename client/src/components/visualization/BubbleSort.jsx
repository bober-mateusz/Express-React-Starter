import { useD3 } from "../../hooks/useD3";
import React from "react";
import * as d3 from "d3";
import "../../styles/bubbleSortStyle.css";
import "../../styles/outputWindow.css";
var $ = require("jquery");
function BubbleSort({ data }) {
  const ref = useD3(
    (svg) => {
      var data = [14, 2, 42, 17, 28, 12, 11, 18, 47, 19, 32, 46, 39, 34];
      var letterAxis = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N"
      ];
      var width = 1000,
        height = 500,
        margin = 25; // References for viewport(svg)

      var svg = d3
        .select("div#canvas")
        .append("svg")
        .attr("width", width)
        .attr("height", height); // Choose div

      //Sets First value of data array to Max and Min
      var maxY = d3.max(data, function (d) {
          return d;
        }), // Find the max value
        minY = d3.min(data, function (d) {
          return d;
        }); // Find the min value

      // Scales The Domain is the numerical Value that should be spread over the Range
      var scaleY = d3
          .scaleLinear()
          .domain([0, 50])
          .range([height - margin * 2, 0]), // Scale for Y axis
        scaleX = d3
          .scaleBand()
          .domain(
            letterAxis.map(function (d) {
              return d;
            })
          )
          .rangeRound([0, width - margin * 2]); // Scale for X axis (cardinal)

      let color = d3.scaleLinear().domain([minY, maxY]).range([10, 90]); // Scale for fancy coloring depending on value
      // Create X axis
      var xAxis = d3.axisBottom(scaleX);

      //G is like a div but for SVGs This puts the xAxis in place
      var axisGroupX = svg
        .append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(37.5,475)")
        .call(xAxis);

      // Create Y axis
      var yAxis = d3.axisLeft(scaleY).ticks(12);
      var value = -1;
      var axisGroupY = svg
        .append("g")
        .call(yAxis)
        .attr("transform", "translate(37.5,25)");

      // Create bars
      var rects = svg
        .append("g")
        .attr("class", "rectangles") // Create rectangles based on data
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "rect")
        .attr("y", function (d) {
          return scaleY(d) + margin;
        }) // y position (reversed)
        .attr("x", function (d) {
          value++;
          return scaleX(letterAxis[value]) + margin * 1.75;
        }) // x position
        .attr("height", function (d) {
          return height - margin * 2 - scaleY(d);
        })
        .attr("width", scaleX.bandwidth())
        .attr("fill", function (d) {
          return "#44" + Math.floor(color(d)) + "f4";
        })
        .on("mouseover", function (e, d) {
          d3.select("#tooltip")
            .transition()
            .duration(200)
            .style("opacity", 1)
            .style("color", "red")
            .text(d);
        })
        .on("mouseout", function (e, d) {
          d3.select("#tooltip").style("opacity", 0);
        })
        .on("mousemove", function (e, d) {
          d3.select("#tooltip")
            .style("left", e.pageX + 15 + "px")
            .style("top", e.pageY + 15 + "px");
        });

      d3.select("body")
        .append("div")
        .attr("id", "tooltip")
        .attr("style", "position:absolute;opacity 0");

      function swap(a, b) {
        //Log
        //Swap Graphics
        var x0 = scaleX.domain(
          data.map(function (d) {
            return d;
          })
        );

        var firstRectForX = d3.selectAll("rect").nodes()[a];
        var firstRectX = firstRectForX.x.animVal.value;
        var secondRectForX = d3.selectAll("rect").nodes()[b];
        var secondRectX = secondRectForX.x.animVal.value;
        var firstRect = d3
          .selectAll("rect")
          .filter(function (d, i) {
            return i === a;
          })
          .transition()
          .duration(400)
          .attr("fill", function (d) {
            return "#FF" + Math.floor(color(d)) + "00";
          })
          .attr("x", secondRectX)
          .transition()
          .delay(400)
          .duration(350)
          .attr("fill", function (d) {
            return "#44" + Math.floor(color(d)) + "f1";
          });

        var secondRect = d3
          .selectAll("rect")
          .filter(function (d, i) {
            return i === b;
          })
          .transition()
          .duration(500)
          .attr("x", firstRectX)
          .transition();

        let firstRectNode = firstRect.nodes()[0];
        let secondRectNode = secondRect.nodes()[0];
        let jqFirstNode = $(firstRectNode);
        let jqSecondNode = $(secondRectNode);
        jqFirstNode.insertAfter(jqSecondNode);
      }
      d3.select("#Run").on("click", function () {
        data = sorting(data);
      });
      d3.select("#Reset").on("click", function () {
        reset();
      });

      var swapArray = [];
      function SwapLog(a, b) {
        console.log(`A:${a}, B:${b}`);
        if (a < b) {
          let s = ` ${a} Swaps With ${b} `;
          swapArray = [...swapArray, s];
        }
        d3.select(".OutputWindow")
          .selectAll("code")
          .data(swapArray)
          .enter()
          .append("code")
          .text((dta) => dta);
      }
      function sort(a, b) {
        if (a < b) {
          return a;
        }
      }
      function sorting(inputArr) {
        let len = inputArr.length;
        let delay = 250;
        for (let i = 0; i < len; i++) {
          for (let j = 0; j < len - 1; j++) {
            let tmp = sort(inputArr[j], inputArr[j + 1]);
            if (tmp != null) {
              let one = inputArr[j];
              let two = inputArr[j + 1];
              let t1 = setTimeout(function () {
                SwapLog(one, two);
              }, delay);
              inputArr[j] = inputArr[j + 1];
              inputArr[j + 1] = tmp;
              let t2 = setTimeout(function () {
                swap(j, j + 1);
              }, delay);
              delay = delay + 650;
            }
          }
        }
        return inputArr;
      }
      function reset() {
        window.location.reload(true);
      }
    },
    [5]
  );
  return (
    <div className="container-fluid">
      <h3>BubbleSort Visualization</h3>
      <div className="row">
        <div className="col-1">
          <button
            className="btn btn-primary mb-2"
            width="5%"
            type="button"
            id="Run"
          >
            Run
          </button>
          <button
            className="btn btn-primary mb-2"
            width="5%"
            type="button"
            id="Reset"
          >
            Reset
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          {/* Bubble sort is visualized in canvas property */}
          <div id="canvas"></div>
        </div>
        <div className="row px-5">
          <div className="col-4  mt-5">
            <div className="container OutputWindow pl-5">
              <h3 className="outputHeader">Output Window</h3>
              <pre></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BubbleSort;
