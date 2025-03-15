"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"

export default function AskQuestionPage() {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [preview, setPreview] = useState({ title: "", body: "", tags: [] })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real app, you would submit to an API
    console.log("Submitting question:", { title, body, tags })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Reset form
    setTitle("")
    setBody("")
    setTags("")
    setIsSubmitting(false)
    alert("Your question has been submitted!")
  }

  const generatePreview = () => {
    setPreview({
      title,
      body,
      tags: tags.split(" ").filter((tag) => tag.trim() !== ""),
    })
  }

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Ask a Question</h1>

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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. How to center a div with Tailwind CSS"
            required
          />
          <p className="text-xs text-muted-foreground">
            Be specific and imagine you're asking a question to another person.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="body">Body</Label>
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
            Include all the information someone would need to answer your question. You can use markdown for formatting.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
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

