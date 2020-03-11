import React, { useState, useEffect } from "react";
import AntvF2React from "antv-f2-react";

function Visualization() {
  const [data, setData] = useState([]);

  const transformData = data => {
    // Get unique device ids;
    const uniqueId = {};
    data.forEach(el => {
      if (el.deviceid !== uniqueId[el.deviceid]) {
        uniqueId[el.deviceid] = el.deviceid;
      }
    });

    // Group data based on the device ids
    const groupData = [];
    Object.keys(uniqueId).forEach(el => {
      groupData.push(data.filter(ol => ol.deviceid === el));
    });

    // Sum usage based on device ids and return a nice formatted data for visualization purpose
    const finalData = [];
    groupData.forEach(el => {
      let deviceid;
      let usageSum = el.reduce(function(accumulator, currentValue) {
        deviceid = currentValue.deviceid;
        return accumulator + Number(currentValue["usage\r"]);
      }, 0);
      let xSum = el.reduce(function(accumulator, currentValue) {
        deviceid = currentValue.deviceid;
        return accumulator + parseInt(currentValue.x);
      }, 0);
      let ySum = el.reduce(function(accumulator, currentValue) {
        deviceid = currentValue.deviceid;
        return accumulator + parseInt(currentValue.y);
      }, 0);
      finalData.push({
        deviceid: deviceid,
        sessionCounts: el.filter(ol => Number(ol["usage\r"]) > 0).length,
        x: xSum,
        y: ySum,
        usage: usageSum
      });
    });

    // return final data
    return finalData;
  };

  const getData = () => {
    const _sv2json = require("sv2json");
    const request = require("request");
    const options = {
      method: "GET",
      url:
        "https://raw.githubusercontent.com/hologram-io/carthage/master/usage.tsv",
      headers: {}
    };
    request(options, function(error, response) {
      if (error) throw new Error(error);
      const jsonVersionOfTsvData = _sv2json(response.body, "\t");
      setData(transformData(jsonVersionOfTsvData));
    });
  };

  // Get the data when the component is mounted
  useEffect(() => {
    getData();
  }, []);

  const VisualizationHistogram = AntvF2React(chart => {
    chart
      .interval()
      .position("deviceid*usage")
      .color("deviceid");
    chart.render();
  });

  const VisualizationSessionCountHistogram = AntvF2React(chart => {
    chart
      .interval()
      .position("deviceid*sessionCounts")
      .color("deviceid");
    chart.render();
  });

  const VisualizationGraph = AntvF2React(chart => {
    chart.line().position("x*y");
    chart.render();
  });

  const style = {
    width: 1080,
    height: 600
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">Histogram-1</div>
        <div className="card-body">
          <VisualizationSessionCountHistogram
            width={style.width}
            height={style.height}
            data={data}
          />
        </div>
      </div>
      <div className="card">
        <div className="card-header">Graph</div>
        <div className="card-body">
          <VisualizationGraph
            width={style.width}
            height={style.height}
            data={data}
          />
        </div>
      </div>
      <div className="card">
        <div className="card-header">Histogram-2</div>
        <div className="card-body">
          <VisualizationHistogram
            width={style.width}
            height={style.height}
            data={data}
          />
        </div>
      </div>
    </div>
  );
}

export default Visualization;
