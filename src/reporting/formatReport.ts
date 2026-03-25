import type { Finding } from '../types.js'

export function formatMarkdown(findings: Finding[]) {
  if (findings.length === 0) {
    return '# Wolk Web3 Toolkit Report\n\nNo obvious risks detected in the supplied contract.'
  }

  const grouped = findings.reduce<Record<string, Finding[]>>((accumulator, finding) => {
    accumulator[finding.severity] = [...(accumulator[finding.severity] ?? []), finding]
    return accumulator
  }, {})

  return [
    '# Wolk Web3 Toolkit Report',
    '',
    ...(['high', 'medium', 'low'] as const).flatMap((severity) => {
      const items = grouped[severity] ?? []
      if (items.length === 0) return []
      return [
        `## ${severity.toUpperCase()} severity`,
        '',
        ...items.flatMap((finding) => [
          `### ${finding.title}`,
          `- Category: ${finding.category}`,
          `- Detail: ${finding.detail}`,
          `- Remediation: ${finding.remediation}`,
          '',
        ]),
      ]
    }),
  ].join('\n')
}
