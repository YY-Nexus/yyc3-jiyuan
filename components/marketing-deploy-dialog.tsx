"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

interface MarketingDeployDialogProps {
  isOpen: boolean
  onClose: () => void
  templateId: number
}

export function MarketingDeployDialog({ isOpen, onClose, templateId }: MarketingDeployDialogProps) {
  const [formData, setFormData] = useState({
    logo: "",
    mainTitle: "",
    subTitle: "",
    activityImage: "",
    activityDescription: "",
    activityContent: "",
    bottomImage: "",
    distributionConfig: ["姓名"], // 默认选中姓名
  })

  const handleDeploy = () => {
    console.log("部署营销活动:", formData)
    onClose()
  }

  const handleAddConfig = (config: string) => {
    if (!formData.distributionConfig.includes(config)) {
      setFormData((prev) => ({
        ...prev,
        distributionConfig: [...prev.distributionConfig, config],
      }))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>智能投放</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          {/* 左侧表单 */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>公司logo:</Label>
                <Button variant="ghost" size="sm" className="text-blue-600 h-6">
                  点击上传
                </Button>
              </div>
              <div className="border h-10 bg-blue-600 text-white flex items-center justify-center">哆嗦刀</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Label className="mr-1">*活动主题:</Label>
                <Button variant="ghost" size="sm" className="text-blue-600 h-6 ml-auto">
                  点击上传
                </Button>
              </div>
              <Input placeholder="请输入您想设置的活动主题" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Label className="mr-1">活动副主题:</Label>
                <Button variant="ghost" size="sm" className="text-blue-600 h-6 ml-auto">
                  点击上传
                </Button>
              </div>
              <Input placeholder="请输入您想设置的副主题" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Label>活动图片:</Label>
                <Button variant="ghost" size="sm" className="text-blue-600 h-6 ml-auto">
                  点击上传
                </Button>
              </div>
              <div className="border h-20 flex items-center justify-center bg-gray-100">
                <span className="text-gray-400">图片预览</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Label className="mr-1">*活动内容预览:</Label>
                <Button variant="ghost" size="sm" className="text-blue-600 h-6 ml-auto">
                  点击上传
                </Button>
              </div>
              <Input placeholder="请输入上传内容预览描述" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Label className="mr-1">*活动内容:</Label>
              </div>
              <Textarea placeholder="请输入上传活动内容" className="min-h-[100px]" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Label>内容配图:</Label>
                <Button variant="ghost" size="sm" className="text-blue-600 h-6 ml-auto">
                  点击上传
                </Button>
              </div>
              <div className="border h-20 flex items-center justify-center bg-gray-100">
                <span className="text-gray-400">图片预览</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Label className="mr-1">*表单配置框标题:</Label>
                <Button variant="ghost" size="sm" className="text-blue-600 h-6 ml-auto">
                  点击上传
                </Button>
              </div>
              <Input placeholder="请输入上传表单配置框标题" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Label className="mr-1">*表单配置:</Label>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={`rounded-full ${formData.distributionConfig.includes("姓名") ? "bg-blue-100 border-blue-600 text-blue-600" : ""}`}
                  onClick={() => handleAddConfig("姓名")}
                >
                  姓名
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`rounded-full ${formData.distributionConfig.includes("手机号") ? "bg-blue-100 border-blue-600 text-blue-600" : ""}`}
                  onClick={() => handleAddConfig("手机号")}
                >
                  手机号
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`rounded-full ${formData.distributionConfig.includes("企业名") ? "bg-blue-100 border-blue-600 text-blue-600" : ""}`}
                  onClick={() => handleAddConfig("企业名")}
                >
                  企业名
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`rounded-full ${formData.distributionConfig.includes("职位") ? "bg-blue-100 border-blue-600 text-blue-600" : ""}`}
                  onClick={() => handleAddConfig("职位")}
                >
                  职位
                </Button>
                <Button variant="outline" size="sm" className="rounded-full text-blue-600">
                  添加
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>投放渠道:</Label>
              <RadioGroup defaultValue="付费">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="付费" id="pay" />
                    <Label htmlFor="pay">付费</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="自定" id="custom" />
                    <Label htmlFor="custom">自定</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="百度" id="baidu" />
                    <Label htmlFor="baidu">百度</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* 右侧预览 */}
          <div className="space-y-4">
            <div className="bg-blue-600 text-white p-4 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="px-8 py-2 bg-white text-blue-600 rounded-lg font-bold">哆嗦刀</div>
              </div>

              <div className="text-center font-bold mb-2">小程序大能力，微企业精管理</div>
              <div className="text-center text-xs mb-8">让信息流转起来，降低管理成本，提升管理效率</div>

              <div className="bg-white/20 rounded-lg p-4 flex justify-center mb-8">
                <div className="w-2/3 h-32 bg-white/30 rounded"></div>
              </div>

              <div className="border border-white rounded-lg p-2 mb-4">
                <div className="text-center">企业遇到了这些难题?</div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white text-black p-2 rounded-lg text-xs">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mr-2"></div>
                    <span>业务管理模块化程度</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mr-2"></div>
                    <span>信息流通慢效率低</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mr-2"></div>
                    <span>人力成本居高不下</span>
                  </div>
                </div>
                <div className="bg-white p-2 rounded-lg flex items-center justify-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">图标</div>
                </div>
              </div>

              <div className="bg-white text-blue-600 p-2 text-center rounded-lg font-medium mb-4">
                留下联系方式，免费体验小程序
              </div>

              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="space-y-2">
                  <Input placeholder="请输入您的姓名" className="bg-gray-100" />
                  <Input placeholder="请输入手机号码" className="bg-gray-100" />
                  <Input placeholder="请输入企业名称" className="bg-gray-100" />
                  <Input placeholder="请输入您的职位" className="bg-gray-100" />
                </div>
              </div>

              <Button className="w-full bg-blue-500 hover:bg-blue-700 text-white">提交</Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="mr-2">
            取消
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleDeploy}>
            确定
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
