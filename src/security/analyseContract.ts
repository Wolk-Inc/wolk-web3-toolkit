export function analyseContract(source: string) {
  const findings: string[] = []

  if (source.includes('tx.origin')) {
    findings.push('Avoid tx.origin for authorization checks.')
  }

  if (source.includes('.call{value:')) {
    findings.push('Review low-level call usage for reentrancy protection.')
  }

  if (source.includes('for (')) {
    findings.push('Check loop size for gas growth under large datasets.')
  }

  return findings
}
