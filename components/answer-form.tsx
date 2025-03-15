"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AnswerFormProps {
  questionId: string
}

export default function AnswerForm({ questionId }: AnswerFormProps) {
  const [answer, setAnswer] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [preview, setPreview] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real app, you would submit to an API
    console.log("Submitting answer:", answer)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Reset form
    setAnswer("")
    setIsSubmitting(false)
    alert("Your answer has been submitted!")
  }

  const generatePreview = () => {
    setPreview(answer)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Tabs defaultValue="write">
        <TabsList>
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview" onClick={generatePreview}>
            Preview
          </TabsTrigger>
        </TabsList>
        <TabsContent value="write" className="mt-2">
          <Textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write your answer here... You can use Markdown formatting."
            className="min-h-[200px]"
            required
          />
        </TabsContent>
        <TabsContent value="preview" className="mt-2">
          <div className="min-h-[200px] border rounded-md p-4 prose dark:prose-invert max-w-none">
            {preview ? (
              preview.split("\n\n").map((paragraph, idx) => <p key={idx}>{paragraph}</p>)
            ) : (
              <p className="text-muted-foreground">Nothing to preview</p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Post Your Answer"}
        </Button>
        <p className="text-sm text-muted-foreground">
          By clicking "Post Your Answer", you agree to our terms of service and privacy policy.
        </p>
      </div>
    </form>
  )
}

