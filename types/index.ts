export interface User {
  name: string
  image: string
  initials: string
  reputation?: number
  badges?: {
    gold: number
    silver: number
    bronze: number
  }
}

export interface Question {
  id: number
  title: string
  description: string
  votes: number
  answers: number
  views: number
  tags: string[]
  user: User
  askedTime: string
  body?: string
  accepted?: boolean
}

export interface Answer {
  id: number
  content: string
  votes: number
  accepted: boolean
  question_id: number
  user_id: number
  createdAt: string
  updatedAt: string
  user: User
  answeredTime: string
}

export interface Tag {
  name: string
  description?: string
  questionsCount: number
  color?: string
}

export interface QuestionFormData {
  title: string
  body: string
  tags: string
}

export interface QuestionPreview {
  title: string
  body: string
  tags: string[]
}