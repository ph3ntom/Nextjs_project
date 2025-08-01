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
  questionId: number
  body: string
  votes: number
  user: User
  answeredTime: string
  accepted?: boolean
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