#!/bin/bash
# Claude Code pre-commit hook
# Runs before committing changes

echo "🔍 Running pre-commit checks..."

# Type checking
echo "📝 Type checking..."
npm run type-check

# Linting
echo "🎨 Linting code..."
npm run lint

# Format check
echo "✨ Checking formatting..."
npm run format:check

# Test suite
echo "🧪 Running tests..."
npm run test

echo "✅ Pre-commit checks passed!"