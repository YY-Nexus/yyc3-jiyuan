"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import Sidebar from "@/components/sidebar"
import { PageTransition, SuccessAnimation } from "@/components/ui/micro-interactions"
import { useToast } from "@/hooks/use-toast"

export default function UserFeedbackPage() {
  const [activeTab, setActiveTab] = useState("feedback")
  const [feedbackType, setFeedbackType] = useState("suggestion")
  const [feedbackText, setFeedbackText] = useState("")
  const [satisfaction, setSatisfaction] = useState(3)
  const [usability, setUsability] = useState(3)
  const [performance, setPerformance] = useState(3)
  const [featureRating, setFeatureRating] = useState(3)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [participateInTesting, setParticipateInTesting] = useState(false)
  const { toast } = useToast()

  const handleSubmitFeedback = () => {
    setIsSubmitting(true)

    // 模拟提交
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      toast({
        title: "反馈已提交",
        description: "感谢您的反馈，我们将认真考虑您的建议",
      })

      // 重置表单
      setTimeout(() => {
        setIsSubmitted(false)
        setFeedbackText("")
        setFeedbackType("suggestion")
      }, 3000)
    }, 1500)
  }

  const handleSubmitSurvey = () => {
    setIsSubmitting(true)

    // 模拟提交
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      toast({
        title: "调查已提交",
        description: "感谢您参与用户体验调查，您的反馈对我们很重要",
      })

      // 重置表单
      setTimeout(() => {
        setIsSubmitted(false)
        setSatisfaction(3)
        setUsability(3)
        setPerformance(3)
        setFeatureRating(3)
      }, 3000)
    }, 1500)
  }

  const handleJoinTesting = () => {
    setIsSubmitting(true)

    // 模拟提交
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      toast({
        title: "申请已提交",
        description: "感谢您申请参与用户测试，我们会尽快与您联系",
      })

      // 重置表单
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail("")
        setParticipateInTesting(false)
      }, 3000)
    }, 1500)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 侧边栏 */}
      <Sidebar />

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部导航路径 */}
        <div className="bg-white p-4 border-b text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <span>系统</span>
            <span>/</span>
            <span className="text-gray-800">用户反馈与测试</span>
          </div>
          <h1 className="text-xl font-medium mt-2 text-gray-800">用户反馈与测试</h1>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-auto p-6">
          <PageTransition>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>帮助我们改进系统</CardTitle>
                <CardDescription>您的反馈和参与对我们持续改进产品至关重要</CardDescription>
              </CardHeader>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
                <TabsTrigger value="feedback">提交反馈</TabsTrigger>
                <TabsTrigger value="survey">用户调查</TabsTrigger>
                <TabsTrigger value="testing">参与测试</TabsTrigger>
              </TabsList>

              <TabsContent value="feedback">
                <Card>
                  <CardHeader>
                    <CardTitle>提交反馈</CardTitle>
                    <CardDescription>分享您的想法、建议或报告问题</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isSubmitted ? (
                      <div className="flex flex-col items-center justify-center py-8">
                        <SuccessAnimation className="mb-4" />
                        <h3 className="text-xl font-medium text-green-600">反馈已提交</h3>
                        <p className="text-gray-500 text-center mt-2">感谢您的反馈，我们将认真考虑您的建议</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="feedback-type">反馈类型</Label>
                          <RadioGroup value={feedbackType} onValueChange={setFeedbackType} className="flex space-x-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="suggestion" id="suggestion" />
                              <Label htmlFor="suggestion">建议</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="bug" id="bug" />
                              <Label htmlFor="bug">问题</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="praise" id="praise" />
                              <Label htmlFor="praise">表扬</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="feedback-text">您的反馈</Label>
                          <Textarea
                            id="feedback-text"
                            placeholder="请详细描述您的反馈..."
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            rows={5}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="feedback-email">电子邮箱（可选）</Label>
                          <Input
                            id="feedback-email"
                            type="email"
                            placeholder="您的电子邮箱，用于我们回复您"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <p className="text-xs text-gray-500">如果您希望我们就此反馈与您联系，请提供您的电子邮箱</p>
                        </div>
                      </>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    {!isSubmitted && (
                      <Button onClick={handleSubmitFeedback} disabled={!feedbackText || isSubmitting}>
                        {isSubmitting ? "提交中..." : "提交反馈"}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="survey">
                <Card>
                  <CardHeader>
                    <CardTitle>用户体验调查</CardTitle>
                    <CardDescription>帮助我们了解您对系统的满意度和使用体验</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {isSubmitted ? (
                      <div className="flex flex-col items-center justify-center py-8">
                        <SuccessAnimation className="mb-4" />
                        <h3 className="text-xl font-medium text-green-600">调查已提交</h3>
                        <p className="text-gray-500 text-center mt-2">感谢您参与用户体验调查，您的反馈对我们很重要</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-4">
                          <Label>总体满意度</Label>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">非常不满意</span>
                            <Slider
                              value={[satisfaction]}
                              min={1}
                              max={5}
                              step={1}
                              onValueChange={(value) => setSatisfaction(value[0])}
                              className="w-2/3 mx-4"
                            />
                            <span className="text-sm text-gray-500">非常满意</span>
                          </div>
                          <div className="text-center text-sm font-medium">{satisfaction}/5</div>
                        </div>

                        <div className="space-y-4">
                          <Label>易用性</Label>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">非常困难</span>
                            <Slider
                              value={[usability]}
                              min={1}
                              max={5}
                              step={1}
                              onValueChange={(value) => setUsability(value[0])}
                              className="w-2/3 mx-4"
                            />
                            <span className="text-sm text-gray-500">非常容易</span>
                          </div>
                          <div className="text-center text-sm font-medium">{usability}/5</div>
                        </div>

                        <div className="space-y-4">
                          <Label>系统性能</Label>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">非常慢</span>
                            <Slider
                              value={[performance]}
                              min={1}
                              max={5}
                              step={1}
                              onValueChange={(value) => setPerformance(value[0])}
                              className="w-2/3 mx-4"
                            />
                            <span className="text-sm text-gray-500">非常快</span>
                          </div>
                          <div className="text-center text-sm font-medium">{performance}/5</div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="feature-rating">最喜欢的功能</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="选择功能" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dashboard">数据仪表盘</SelectItem>
                              <SelectItem value="message">消息推送</SelectItem>
                              <SelectItem value="business-card">名片管理</SelectItem>
                              <SelectItem value="script">话术模板</SelectItem>
                              <SelectItem value="user-analysis">用户分析</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="improvement-suggestion">改进建议</Label>
                          <Textarea id="improvement-suggestion" placeholder="您对系统有什么改进建议..." rows={3} />
                        </div>
                      </>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    {!isSubmitted && (
                      <Button onClick={handleSubmitSurvey} disabled={isSubmitting}>
                        {isSubmitting ? "提交中..." : "提交调查"}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="testing">
                <Card>
                  <CardHeader>
                    <CardTitle>参与用户测试</CardTitle>
                    <CardDescription>加入我们的用户测试计划，体验最新功能并提供反馈</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {isSubmitted ? (
                      <div className="flex flex-col items-center justify-center py-8">
                        <SuccessAnimation className="mb-4" />
                        <h3 className="text-xl font-medium text-green-600">申请已提交</h3>
                        <p className="text-gray-500 text-center mt-2">感谢您申请参与用户测试，我们会尽快与您联系</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="test-email">电子邮箱</Label>
                          <Input
                            id="test-email"
                            type="email"
                            placeholder="您的电子邮箱"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="test-role">您的角色</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="选择角色" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="manager">管理者</SelectItem>
                              <SelectItem value="operator">运营人员</SelectItem>
                              <SelectItem value="sales">销售人员</SelectItem>
                              <SelectItem value="marketing">市场人员</SelectItem>
                              <SelectItem value="customer-service">客服人员</SelectItem>
                              <SelectItem value="other">其他</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="test-experience">使用经验</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="选择使用经验" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">新用户（不到1个月）</SelectItem>
                              <SelectItem value="beginner">初级用户（1-3个月）</SelectItem>
                              <SelectItem value="intermediate">中级用户（3-6个月）</SelectItem>
                              <SelectItem value="advanced">高级用户（6个月以上）</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="test-interest">感兴趣的测试领域</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="选择测试领域" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ui">用户界面</SelectItem>
                              <SelectItem value="features">新功能</SelectItem>
                              <SelectItem value="performance">性能优化</SelectItem>
                              <SelectItem value="mobile">移动端适配</SelectItem>
                              <SelectItem value="all">所有领域</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            id="participate"
                            checked={participateInTesting}
                            onCheckedChange={setParticipateInTesting}
                          />
                          <Label htmlFor="participate">我愿意参与在线用户测试会话（约30-60分钟）</Label>
                        </div>
                      </>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    {!isSubmitted && (
                      <Button onClick={handleJoinTesting} disabled={!email || isSubmitting}>
                        {isSubmitting ? "提交中..." : "申请参与"}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </PageTransition>
        </div>
      </div>
    </div>
  )
}
