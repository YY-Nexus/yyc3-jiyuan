export function generateStaticParams() {
  // 生成1到20的ID参数
  return Array.from({ length: 20 }, (_, i) => ({
    id: (i + 1).toString(),
  }))
}

export default function Page({ params }: { params: { id: string } }) {
  return <div>User ID: {params.id}</div>
}
