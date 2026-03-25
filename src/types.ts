export type Finding = {
  title: string
  severity: 'low' | 'medium' | 'high'
  category: 'security' | 'gas' | 'architecture'
  detail: string
  remediation: string
}
