import { readFile } from 'node:fs/promises'
import { analyseContract } from '../security/analyseContract.js'

const fileIndex = process.argv.findIndex((arg) => arg === '--file')
const file = fileIndex >= 0 ? process.argv[fileIndex + 1] : ''

if (!file) {
  console.error('Usage: npm run analyse -- --file <path>')
  process.exit(1)
}

const source = await readFile(file, 'utf8')
console.log({ findings: analyseContract(source) })
