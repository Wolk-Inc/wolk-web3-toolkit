import type { Finding } from '../types.js'

export function analyseContract(source: string): Finding[] {
  const findings: Finding[] = []

  if (source.includes('tx.origin')) {
    findings.push({
      title: 'Avoid tx.origin authorization',
      severity: 'high',
      category: 'security',
      detail: 'Using tx.origin for access control can be bypassed through malicious intermediary contracts.',
      remediation: 'Switch authorization checks to msg.sender and role-based access control patterns.',
    })
  }

  if (source.includes('.call{value:')) {
    findings.push({
      title: 'Low-level value transfer found',
      severity: 'high',
      category: 'security',
      detail: 'Low-level call with value can open reentrancy paths if state updates and guards are incomplete.',
      remediation: 'Apply checks-effects-interactions, reentrancy guards, and explicit success handling.',
    })
  }

  if (source.includes('delegatecall')) {
    findings.push({
      title: 'delegatecall usage requires strict review',
      severity: 'high',
      category: 'architecture',
      detail: 'delegatecall can execute external code in the current storage context.',
      remediation: 'Restrict delegatecall to audited proxy patterns with immutable implementation controls.',
    })
  }

  if (source.includes('block.timestamp')) {
    findings.push({
      title: 'Timestamp-based logic detected',
      severity: 'medium',
      category: 'security',
      detail: 'Miner or validator influence on timestamps can affect tightly bounded time logic.',
      remediation: 'Use broader timing windows and avoid timestamp dependence for critical randomness or auctions.',
    })
  }

  if (source.includes('for (') || source.includes('while (')) {
    findings.push({
      title: 'Potential gas growth loop detected',
      severity: 'medium',
      category: 'gas',
      detail: 'Loops over dynamic collections may become uncallable as state grows.',
      remediation: 'Paginate work, use pull-based claiming, or cap collection growth on-chain.',
    })
  }

  if (source.includes('mapping') && source.includes('address') && source.includes('balance')) {
    findings.push({
      title: 'Balance mapping found',
      severity: 'low',
      category: 'architecture',
      detail: 'Balance and vault patterns often need explicit eventing, accounting checks, and pause controls.',
      remediation: 'Verify accounting invariants and emit consistent transfer or withdrawal events.',
    })
  }

  return findings
}
