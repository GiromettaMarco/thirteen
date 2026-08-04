import { useState } from 'react'
import type { PasswordReport } from '@/types'

export function usePasswordCheck() {
  const [report, setReport] = useState<PasswordReport>({
    hasLength: false,
    hasLowercase: false,
    hasNumber: false,
    hasSymbol: false,
    hasUppercase: false,
    level: 0
  })

  function check(password: string) {
    const newReport = {
      hasLength: false,
      hasLowercase: false,
      hasNumber: false,
      hasSymbol: false,
      hasUppercase: false,
      level: 0
    }

    if (password.length >= 12) {
      newReport.hasLength = true
      newReport.level++
    }

    if (/[a-z]/.test(password)) {
      newReport.hasLowercase = true
      newReport.level++
    }

    if (/[0-9]/.test(password)) {
      newReport.hasNumber = true
      newReport.level++
    }

    if (/\p{Z}|\p{S}|\p{P}/u.test(password)) {
      newReport.hasSymbol = true
      newReport.level++
    }

    if (/[A-Z]/.test(password)) {
      newReport.hasUppercase = true
      newReport.level++
    }

    setReport(newReport)
  }

  return { check, report }
}
