"use client"
import { ResponsiveHeatMap } from "@nivo/heatmap"

interface HeatMapChartProps {
  onDrilldown?: (data: any) => void
}

export function HeatMapChart({ onDrilldown }: HeatMapChartProps) {
  // 模拟数据
  const data = [
    {
      id: "北京",
      data: [
        { x: "1月", y: 45 },
        { x: "2月", y: 32 },
        { x: "3月", y: 67 },
        { x: "4月", y: 89 },
        { x: "5月", y: 76 },
        { x: "6月", y: 54 },
      ],
    },
    {
      id: "上海",
      data: [
        { x: "1月", y: 78 },
        { x: "2月", y: 65 },
        { x: "3月", y: 43 },
        { x: "4月", y: 56 },
        { x: "5月", y: 91 },
        { x: "6月", y: 82 },
      ],
    },
    {
      id: "广州",
      data: [
        { x: "1月", y: 34 },
        { x: "2月", y: 56 },
        { x: "3月", y: 78 },
        { x: "4月", y: 45 },
        { x: "5月", y: 67 },
        { x: "6月", y: 89 },
      ],
    },
    {
      id: "深圳",
      data: [
        { x: "1月", y: 56 },
        { x: "2月", y: 78 },
        { x: "3月", y: 90 },
        { x: "4月", y: 34 },
        { x: "5月", y: 45 },
        { x: "6月", y: 67 },
      ],
    },
    {
      id: "成都",
      data: [
        { x: "1月", y: 67 },
        { x: "2月", y: 89 },
        { x: "3月", y: 45 },
        { x: "4月", y: 78 },
        { x: "5月", y: 34 },
        { x: "6月", y: 56 },
      ],
    },
  ]

  const handleClick = (data: any) => {
    if (onDrilldown) {
      onDrilldown({
        title: `${data.yKey} - ${data.xKey} 详细数据`,
        value: data.value,
        region: data.yKey,
        month: data.xKey,
      })
    }
  }

  return (
    <div className="w-full h-full">
      <ResponsiveHeatMap
        data={data}
        margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
        valueFormat=">-.2s"
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: "",
          legendOffset: 46,
        }}
        axisRight={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "城市",
          legendPosition: "middle",
          legendOffset: 70,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "城市",
          legendPosition: "middle",
          legendOffset: -72,
        }}
        colors={{
          type: "sequential",
          scheme: "blues",
        }}
        emptyColor="#eeeeee"
        legends={[
          {
            anchor: "bottom",
            translateX: 0,
            translateY: 30,
            length: 400,
            thickness: 8,
            direction: "row",
            tickPosition: "after",
            tickSize: 3,
            tickSpacing: 4,
            tickOverlap: false,
            tickFormat: ">-.2s",
            title: "销售额 →",
            titleAlign: "start",
            titleOffset: 4,
          },
        ]}
        annotations={[
          {
            type: "rect",
            match: { id: "广州", value: 78 },
            noteX: "3月",
            noteY: "广州",
            offset: 5,
            noteTextOffset: 5,
            noteWidth: 10,
            noteHeight: 10,
            noteBorderRadius: 5,
            noteComponent: ({ x, y }) => (
              <g transform={`translate(${x},${y})`}>
                <rect
                  x={-4}
                  y={-4}
                  width={8}
                  height={8}
                  fill="rgba(255, 0, 0, 0.5)"
                  stroke="rgb(255, 0, 0)"
                  strokeWidth={1}
                />
              </g>
            ),
          },
        ]}
        onClick={handleClick}
        hoverTarget="cell"
        cellHoverOthersOpacity={0.25}
      />
    </div>
  )
}
