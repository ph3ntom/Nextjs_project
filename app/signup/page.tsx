"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff, Check, X } from "lucide-react"
import { useTheme } from "next-themes"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    phone: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [usernameChecked, setUsernameChecked] = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { theme } = useTheme()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Reset username check if username changes
    if (name === "username" && usernameChecked) {
      setUsernameChecked(false)
      setUsernameAvailable(false)
    }

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const checkUsername = () => {
    // Reset any existing username error
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors.username
      return newErrors
    })

    // Validate username
    if (!formData.username) {
      setErrors((prev) => ({ ...prev, username: "아이디를 입력해주세요." }))
      return
    }

    if (formData.username.length < 4) {
      setErrors((prev) => ({ ...prev, username: "아이디는 최소 4자 이상이어야 합니다." }))
      return
    }

    // Simulate API call to check username availability
    setIsSubmitting(true)

    setTimeout(() => {
      // For demo purposes, let's say usernames containing "admin" are taken
      const isAvailable = !formData.username.toLowerCase().includes("admin")
      setUsernameChecked(true)
      setUsernameAvailable(isAvailable)

      if (!isAvailable) {
        setErrors((prev) => ({ ...prev, username: "이미 사용 중인 아이디입니다." }))
      }

      setIsSubmitting(false)
    }, 1000)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Username validation
    if (!formData.username) {
      newErrors.username = "아이디를 입력해주세요."
    } else if (formData.username.length < 4) {
      newErrors.username = "아이디는 최소 4자 이상이어야 합니다."
    } else if (!usernameChecked) {
      newErrors.username = "아이디 중복확인을 해주세요."
    } else if (!usernameAvailable) {
      newErrors.username = "이미 사용 중인 아이디입니다."
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요."
    } else if (formData.password.length < 8) {
      newErrors.password = "비밀번호는 최소 8자 이상이어야 합니다."
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호 확인을 입력해주세요."
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다."
    }

    // Name validation
    if (!formData.name) {
      newErrors.name = "이름을 입력해주세요."
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요."
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다."
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "휴대폰 번호를 입력해주세요."
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/-/g, ""))) {
      newErrors.phone = "올바른 휴대폰 번호 형식이 아닙니다."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    try {
      // In a real app, you would submit to an API
      console.log("Submitting signup:", formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to login or show success message
      alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.")
      window.location.href = "/login"
    } catch (error) {
      console.error("Signup error:", error)
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="min-h-[calc(100vh-3.5rem)] bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <Link href="/">
              {theme === "dark" ? (
                <Image src="/logo-dark.svg" alt="DevForum Logo" width={50} height={50} className="h-12 w-12" />
              ) : (
                <Image src="/logo-light.svg" alt="DevForum Logo" width={50} height={50} className="h-12 w-12" />
              )}
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-center mb-6">회원가입</h1>

          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username field with check button */}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    ID
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={`w-full ${usernameChecked ? (usernameAvailable ? "border-green-500" : "border-red-500") : ""}`}
                        disabled={isSubmitting}
                      />
                      {usernameChecked && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          {usernameAvailable ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <X className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                    <Button
                      type="button"
                      onClick={checkUsername}
                      disabled={!formData.username || isSubmitting}
                      className="whitespace-nowrap"
                    >
                      Check_ID
                    </Button>
                  </div>
                  {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username}</p>}
                </div>

                {/* Password field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pr-10"
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                  <p className="text-xs text-muted-foreground mt-1">Password must be at least 8 characters long.</p>
                </div>

                {/* Confirm Password field */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    password_confirm
                  </label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pr-10"
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
                </div>

                {/* Name field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full"
                    disabled={isSubmitting}
                  />
                  {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                </div>

                {/* Email field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full"
                    disabled={isSubmitting}
                  />
                  {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                </div>

                {/* Phone field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="010-0000-0000"
                    className="w-full"
                    disabled={isSubmitting}
                  />
                  {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                </div>

                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 mt-6" disabled={isSubmitting}>
                  {isSubmitting ? "Processing ..." : "Register"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:text-blue-600">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

