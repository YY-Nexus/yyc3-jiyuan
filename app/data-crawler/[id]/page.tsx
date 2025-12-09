import DataCrawlerDetailClient from "./DataCrawlerDetailClient"

interface DataCrawlerDetailProps {
  params: {
    id: string
  }
}

// 添加generateStaticParams函数，告诉Next.js需要生成哪些静态路径
export function generateStaticParams() {
  // 生成1到20的ID参数
  return Array.from({ length: 20 }, (_, i) => ({
    id: (i + 1).toString(),
  }))
}

export default function DataCrawlerDetail({ params }: DataCrawlerDetailProps) {
  return <DataCrawlerDetailClient id={params.id} />
}
