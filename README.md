# wolk-web3-toolkit

Smart contract tooling, gas analysis, and protocol security helpers.

This starter repo gives protocol teams a TypeScript CLI for checking simple contract risks and estimating gas-heavy patterns before deeper audits.

## Quick start

```bash
npm install
npm run analyse -- --file examples/contract.sol
npm run analyse -- --file examples/contract.sol --format json
npm run typecheck
```

## Included checks

- `tx.origin` authorization risks
- low-level value transfer / reentrancy review flags
- `delegatecall` architecture risk markers
- timestamp-sensitive logic checks
- loop-based gas growth warnings
- basic accounting-pattern reminders

## Output formats

- Markdown
- JSON

Built by [Wolk Inc](https://wolkinc.com).
