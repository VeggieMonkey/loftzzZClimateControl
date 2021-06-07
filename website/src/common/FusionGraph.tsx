import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
// import Column2D from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, TimeSeries, FusionTheme);

export const SimpleTimeSeries: React.FC<{ data: any }> = ({ data }) => {
  let schema = [
    {
      name: "Date",
      type: "date",
      // format: "%-L",
      format: "%-d/%-m/%Y %H:%M:%S",
    },
    {
      name: "Co2",
      type: "number",
    },
    {
      name: "VoC",
      type: "number",
    },
    {
      name: "Temp",
      type: "number",
    },
    {
      name: "Humidity",
      type: "number",
    },
  ];

  // Here we are creating our DataTable
  const fusionTable = new FusionCharts.DataStore().createDataTable(
    data,
    schema
  );

  const chartConfigs = {
    type: "timeseries",
    renderAt: "container",
    width: "1000",
    height: "600",
    dataSource: {
      caption: { text: "House Environment Statistics" },
      data: fusionTable,
      // yAxis: [
      //   {
      //     plot: [
      //       {
      //         value: "----?----",
      //       },
      //     ],
      //   },
      // ],
    },
  };

  return <ReactFC {...chartConfigs} />;
};
