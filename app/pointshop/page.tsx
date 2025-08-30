"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star } from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"

interface Product {
  id: number
  name: string
  image: string
  points: number
  category: string
  rating: number
  description: string
}

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "DevForum 티셔츠",
    image: "/placeholder-product.jpg",
    points: 1500,
    category: "의류",
    rating: 4.8,
    description: "고급 코튼 소재의 DevForum 로고 티셔츠"
  },
  {
    id: 2,
    name: "프로그래밍 머그컵",
    image: "/placeholder-product.jpg", 
    points: 800,
    category: "생활용품",
    rating: 4.5,
    description: "코딩하며 마시는 커피를 위한 특별한 머그컵"
  },
  {
    id: 3,
    name: "개발자 스티커팩",
    image: "/placeholder-product.jpg",
    points: 500,
    category: "문구",
    rating: 4.9,
    description: "노트북을 꾸밀 수 있는 개발 관련 스티커 세트"
  },
  {
    id: 4,
    name: "키보드 청소 키트",
    image: "/placeholder-product.jpg",
    points: 1200,
    category: "도구",
    rating: 4.3,
    description: "기계식 키보드 전용 청소 도구 세트"
  },
  {
    id: 5,
    name: "DevForum 에코백",
    image: "/placeholder-product.jpg",
    points: 1000,
    category: "의류",
    rating: 4.6,
    description: "환경을 생각하는 개발자를 위한 에코백"
  },
  {
    id: 6,
    name: "코딩 노트",
    image: "/placeholder-product.jpg",
    points: 700,
    category: "문구",
    rating: 4.7,
    description: "아이디어를 기록하는 개발자 전용 노트"
  }
]

export default function PointShopPage() {
  const [products] = useState<Product[]>(sampleProducts)
  const [userPoints, setUserPoints] = useState(2500)
  const { user, isLoggedIn } = useAuth()

  return (
    <div className="container py-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">PointShop</h1>
          {isLoggedIn && (
            <div className="flex items-center gap-2 bg-accent/50 p-3 rounded-md">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold">{userPoints.toLocaleString()} P</span>
            </div>
          )}
        </div>
        <p className="text-muted-foreground">
          포인트로 다양한 개발 관련 상품을 구매하세요. 질문과 답변 활동으로 포인트를 적립할 수 있습니다.
        </p>
      </div>

      {!isLoggedIn && (
        <div className="mb-6 p-4 bg-accent/20 border border-accent/40 rounded-md">
          <p className="text-center text-muted-foreground">
            포인트샵을 이용하려면 로그인이 필요합니다.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <div className="text-gray-400 text-center">
                <ShoppingCart className="h-12 w-12 mx-auto mb-2" />
                <div className="text-sm">상품 이미지 영역</div>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm ml-1">{product.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="font-bold text-lg">{product.points.toLocaleString()} P</span>
                  </div>
                  
                  <Button 
                    size="sm"
                    disabled={!isLoggedIn || userPoints < product.points}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    구매하기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}