import { readFile } from 'node:fs/promises'
import { analyseContract } from '../security/analyseContract.js'
import { formatMarkdown } from '../reporting/formatReport.js'

const fileIndex = process.argv.findIndex((arg) => arg === '--file')
const file = fileIndex >= 0 ? process.argv[fileIndex + 1] : ''
const formatIndex = process.argv.findIndex((arg) => arg === '--format')
const format = formatIndex >= 0 ? process.argv[formatIndex + 1] : 'markdown'

if (!file) {
  console.error('Usage: npm run analyse -- --file <path> [--format markdown|json]')
  process.exit(1)
}

const source = await readFile(file, 'utf8')
const findings = analyseContract(source)

if (format === 'json') {
  console.log(JSON.stringify({ findings }, null, 2))
} else {
  console.log(formatMarkdown(findings))
}
