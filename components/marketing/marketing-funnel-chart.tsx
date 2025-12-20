"use client"

import { ResponsiveFunnel } from "@nivo/funnel"

interface MarketingFunnelChartProps {
  onDrilldown?: (data: any) => void
}

export function MarketingFunnelChart({ onDrilldown }: MarketingFunnelChartProps) {
  // 模拟数据
  const data = [
    {
      id: "曝光",
      value: 100000,
      label: "曝光 (100,000)",
    },
    {
      id: "访问",
      value: 60000,
      label: "访问 (60,000)",
    },
    {
      id: "注册",
      value: 30000,
      label: "注册 (30,000)",
    },
    {
      id: "激活",
      value: 15000,
      label: "激活 (15,000)",
    },
    {
      id: "转化",
      value: 8000,
      label: "转化 (8,000)",
    },
    {
      id: "留存",
      value: 4000,
      label: "留存 (4,000)",
    },
  ]

  const handleClick = (data: any) => {
    if (onDrilldown) {
      onDrilldown({
        title: `${data.id} 阶段详细数据`,
        value: data.value,
        stage: data.id,
      })
    }
  }

  return (
    <div className="w-full h-full">
      <ResponsiveFunnel
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        valueFormat=">-.4s"
        colors={{ scheme: "blues" }}
        borderWidth={20}
        labelColor={{ from: "color", modifiers: [["darker", 3]] }}
        beforeSeparatorLength={100}
        beforeSeparatorOffset={20}
        afterSeparatorLength={100}
        afterSeparatorOffset={20}
        currentPartSizeExtension={10}
        currentBorderWidth={40}
        motionConfig="wobbly"
        onClick={handleClick}
      />
    </div>
  )
}
