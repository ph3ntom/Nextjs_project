"use client"

import type React from "react"

import { useState, useCallback, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import type { QuestionFormData, QuestionPreview, Question } from "@/types"

interface EditQuestionPageProps {
  params: Promise<{
    id: string
  }>
}

export default function EditQuestionPage({ params }: EditQuestionPageProps) {
  const { id } = use(params)
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [preview, setPreview] = useState<QuestionPreview>({ title: "", body: "", tags: [] })
  const [error, setError] = useState<string | null>(null)
  const [question, setQuestion] = useState<Question | null>(null)
  
  const router = useRouter()
  const { user, isLoggedIn } = useAuth()

  // 기존 질문 데이터 로딩
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/${id}`)
        if (!response.ok) {
          throw new Error('질문을 불러올 수 없습니다.')
        }
        const questionData = await response.json()
        setQuestion(questionData)
        
        // 폼 필드에 기존 데이터 설정
        setTitle(questionData.title || "")
        setBody(questionData.description || questionData.body || "")
        setTags(questionData.tags ? questionData.tags.join(" ") : "")
        
      } catch (error) {
        console.error('Error fetching question:', error)
        setError(error instanceof Error ? error.message : '질문을 불러오는 중 오류가 발생했습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuestion()
  }, [id])

  // 권한 체크
  useEffect(() => {
    if (!isLoading && question && user && user.userId !== question.user?.userId) {
      setError('이 질문을 수정할 권한이 없습니다.')
    }
  }, [isLoading, question, user])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // 입력 검증
    if (title.length < 10) {
      setError("제목은 최소 10자 이상이어야 합니다.")
      setIsSubmitting(false)
      return
    }

    if (body.length < 20) {
      setError("질문 내용은 최소 20자 이상이어야 합니다.")
      setIsSubmitting(false)
      return
    }

    // 태그 처리 및 검증
    const tagsArray = tags.split(' ').filter(tag => tag.trim() !== '')
    
    // 백엔드 API 호출을 위한 데이터 구조 변환
    const questionData = {
      title,
      description: body,
      tags: tagsArray.length > 0 ? tagsArray : undefined,
      mbrId: user?.mbrId || 0
    }

    console.log('전송할 데이터:', questionData)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/${id}`, {
        method: 'PUT', // 수정이므로 PUT 사용
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionData),
      })

      console.log('응답 상태:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.log('에러 응답:', errorText)
        
        let errorData
        try {
          errorData = JSON.parse(errorText)
        } catch {
          throw new Error(`서버 에러 (${response.status}): ${errorText}`)
        }
        
        throw new Error(errorData.message || `서버 에러 (${response.status})`)
      }

      const result = await response.json()
      console.log('질문이 성공적으로 수정되었습니다:', result)
      
      // 성공 후 질문 상세 페이지로 리디렉션
      router.push(`/questions/${id}`)
      
    } catch (error) {
      console.error('Error:', error)
      setError(error instanceof Error ? error.message : '질문 수정 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }, [title, body, tags, user, router, id])

  const generatePreview = useCallback(() => {
    setPreview({
      title,
      body,
      tags: tags.split(" ").filter((tag) => tag.trim() !== ""),
    })
  }, [title, body, tags])

  // 로딩 중
  if (isLoading) {
    return (
      <div className="container py-6">
        <div className="text-center py-8">질문을 불러오는 중...</div>
      </div>
    )
  }

  // 로그인하지 않은 경우
  if (!isLoggedIn || !user) {
    return (
      <div className="container py-6">
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold mb-4">로그인이 필요합니다</h1>
          <p className="text-muted-foreground mb-4">질문을 수정하려면 로그인해야 합니다.</p>
          <Button asChild>
            <Link href="/auth/login">로그인</Link>
          </Button>
        </div>
      </div>
    )
  }

  // 권한이 없는 경우
  if (question && user.userId !== question.user?.userId) {
    return (
      <div className="container py-6">
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold mb-4">접근 권한 없음</h1>
          <p className="text-muted-foreground mb-4">이 질문을 수정할 권한이 없습니다.</p>
          <Button asChild>
            <Link href={`/questions/${id}`}>질문으로 돌아가기</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Edit Question</h1>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/questions/${id}`}>취소</Link>
        </Button>
      </div>

      <div className="bg-accent/30 p-4 rounded-md mb-6">
        <h2 className="font-medium mb-2">수정 시 주의사항</h2>
        <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
          <li>제목과 내용을 명확하고 구체적으로 작성해주세요</li>
          <li>기존 답변이 있는 경우, 답변과 관련 없는 내용으로 변경하지 마세요</li>
          <li>태그는 질문의 주제와 관련된 것으로 설정해주세요</li>
          <li>마크다운 문법을 사용할 수 있습니다</li>
        </ul>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 mb-6">
          <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">제목 <span className="text-red-500">*</span></Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. How to center a div with Tailwind CSS"
            required
          />
          <p className="text-xs text-muted-foreground">
            구체적이고 명확한 제목을 작성해주세요. (최소 10자)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="body">내용 <span className="text-red-500">*</span></Label>
          <Tabs defaultValue="write">
            <TabsList>
              <TabsTrigger value="write">작성</TabsTrigger>
              <TabsTrigger value="preview" onClick={generatePreview}>
                미리보기
              </TabsTrigger>
            </TabsList>
            <TabsContent value="write" className="mt-2">
              <Textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="문제를 자세히 설명해주세요. 관련 코드가 있다면 포함해주세요."
                className="min-h-[200px]"
                required
              />
            </TabsContent>
            <TabsContent value="preview" className="mt-2">
              <div className="min-h-[200px] border rounded-md p-4 prose dark:prose-invert max-w-none">
                {preview.body ? (
                  preview.body.split("\n\n").map((paragraph, idx) => <p key={idx}>{paragraph}</p>)
                ) : (
                  <p className="text-muted-foreground">미리볼 내용이 없습니다</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
          <p className="text-xs text-muted-foreground">
            질문에 답변할 수 있는 모든 정보를 포함해주세요. 마크다운 문법을 사용할 수 있습니다. (최소 20자)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">태그 <span className="text-red-500">*</span></Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. javascript react tailwindcss"
            required
          />
          <p className="text-xs text-muted-foreground">
            질문 주제와 관련된 태그를 최대 5개까지 추가할 수 있습니다.
          </p>
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "수정 중..." : "질문 수정"}
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href={`/questions/${id}`}>취소</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}