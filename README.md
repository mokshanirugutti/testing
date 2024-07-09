# Testing Implementations

## Overview

This repository contains various implementations for testing purposes.

### 1. Easy

#### Testing an Express App
- Testing with `Jest`
- Testing with `Vitest`

### 2. With Database

#### Testing with Prisma
- Mocking external calls
- Deep mocking
- Using `mockResolvedValue` to return resolved values for database calls
- Using `toHaveBeenCalledWith` to check the correctness of database calls

### GitHub Workflow

- Runs tests on `2-withDatabase` for pull requests