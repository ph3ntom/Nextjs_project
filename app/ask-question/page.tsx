"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import type { QuestionFormData, QuestionPreview } from "@/types"

export default function AskQuestionPage() {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [preview, setPreview] = useState<QuestionPreview>({ title: "", body: "", tags: [] })
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()
  const { user } = useAuth()

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
      description: body, // body를 description으로 매핑
      tags: tagsArray.length > 0 ? tagsArray : undefined, // 빈 배열이면 undefined로 설정
      mbrId: user?.mbrId || 0 // 로그인된 사용자 고유 식별자 또는 익명(0)
    }

    console.log('전송할 데이터:', questionData)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions`, {
        method: 'POST',
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
      console.log('질문이 성공적으로 등록되었습니다:', result)
      
      // 폼 초기화
      setTitle("")
      setBody("")
      setTags("")
      
      // 성공 후 질문 상세 페이지로 리디렉션
      if (result.id) {
        router.push(`/questions/${result.id}`)
      } else {
        router.push('/')
      }
      
    } catch (error) {
      console.error('Error:', error)
      setError(error instanceof Error ? error.message : '질문 등록 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }, [title, body, tags, user, router])

  const generatePreview = useCallback(() => {
    setPreview({
      title,
      body,
      tags: tags.split(" ").filter((tag) => tag.trim() !== ""),
    })
  }, [title, body, tags])

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Ask a Question</h1>
      
      {!user && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            익명으로 질문을 작성하고 있습니다. <Link href="/auth/login" className="text-blue-600 hover:underline">로그인</Link>하면 더 많은 기능을 이용할 수 있습니다.
          </p>
        </div>
      )}

      <div className="bg-accent/30 p-4 rounded-md mb-6">
        <h2 className="font-medium mb-2">Writing a good question</h2>
        <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
          <li>Summarize your problem in a one-line title</li>
          <li>Describe your problem in more detail</li>
          <li>Describe what you tried and what you expected to happen</li>
          <li>Add "code" if relevant, formatted as code</li>
          <li>Add tags which help surface your question to members of the community</li>
        </ul>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 mb-6">
          <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. How to center a div with Tailwind CSS"
            required
          />
          <p className="text-xs text-muted-foreground">
            Be specific and imagine you're asking a question to another person. (최소 10자)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="body">Body <span className="text-red-500">*</span></Label>
          <Tabs defaultValue="write">
            <TabsList>
              <TabsTrigger value="write">Write</TabsTrigger>
              <TabsTrigger value="preview" onClick={generatePreview}>
                Preview
              </TabsTrigger>
            </TabsList>
            <TabsContent value="write" className="mt-2">
              <Textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Describe your problem in detail. Include code if relevant."
                className="min-h-[200px]"
                required
              />
            </TabsContent>
            <TabsContent value="preview" className="mt-2">
              <div className="min-h-[200px] border rounded-md p-4 prose dark:prose-invert max-w-none">
                {preview.body ? (
                  preview.body.split("\n\n").map((paragraph, idx) => <p key={idx}>{paragraph}</p>)
                ) : (
                  <p className="text-muted-foreground">Nothing to preview</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
          <p className="text-xs text-muted-foreground">
            Include all the information someone would need to answer your question. You can use markdown for formatting. (최소 20자)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags <span className="text-red-500">*</span></Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. javascript react tailwindcss"
            required
          />
          <p className="text-xs text-muted-foreground">
            Add up to 5 tags to describe what your question is about. Start typing to see suggestions.
          </p>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Post Your Question"}
        </Button>
      </form>
    </div>
  )
}

