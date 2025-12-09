"use client"

import { ResponsiveLine } from "@nivo/line"

interface PredictiveAnalysisChartProps {
  onDrilldown?: (data: any) => void
}

export function PredictiveAnalysisChart({ onDrilldown }: PredictiveAnalysisChartProps) {
  // 模拟数据 - 包括历史数据和预测数据
  const data = [
    {
      id: "实际销售额",
      data: [
        { x: "1月", y: 45000 },
        { x: "2月", y: 52000 },
        { x: "3月", y: 49000 },
        { x: "4月", y: 63000 },
        { x: "5月", y: 58000 },
        { x: "6月", y: 69000 },
        { x: "7月", y: 75000 },
        { x: "8月", y: 82000 },
      ],
    },
    {
      id: "预测销售额",
      data: [
        { x: "7月", y: 73000 },
        { x: "8月", y: 80000 },
        { x: "9月", y: 88000 },
        { x: "10月", y: 92000 },
        { x: "11月", y: 96000 },
        { x: "12月", y: 105000 },
      ],
    },
    {
      id: "乐观预测",
      data: [
        { x: "7月", y: 78000 },
        { x: "8月", y: 86000 },
        { x: "9月", y: 95000 },
        { x: "10月", y: 102000 },
        { x: "11月", y: 108000 },
        { x: "12月", y: 120000 },
      ],
    },
    {
      id: "保守预测",
      data: [
        { x: "7月", y: 68000 },
        { x: "8月", y: 74000 },
        { x: "9月", y: 81000 },
        { x: "10月", y: 85000 },
        { x: "11月", y: 88000 },
        { x: "12月", y: 93000 },
      ],
    },
  ]

  const handleClick = (point: any) => {
    if (onDrilldown) {
      onDrilldown({
        title: `${point.serieId} - ${point.data.x} 详细数据`,
        value: point.data.y,
        month: point.data.x,
        series: point.serieId,
      })
    }
  }

  return (
    <div className="w-full h-full">
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "月份",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "销售额 (元)",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        colors={{ scheme: "category10" }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        onClick={handleClick}
        enableSlices="x"
        enableArea={true}
        areaOpacity={0.1}
        enableGridX={false}
        motionConfig="stiff"
        animate={true}
      />
    </div>
  )
}
