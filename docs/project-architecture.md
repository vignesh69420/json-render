# Project Architecture Diagram

This diagram shows the high-level architecture of the OG-Img project - a monorepo for generating dynamic Open Graph images.

```mermaid
graph TB
    subgraph "OG-Img Monorepo"
        subgraph "Frontend Applications"
            web[Web App<br/>Next.js]
            chrome[Chrome Extension<br/>React + Vite]
        end

        subgraph "Core Packages"
            api[API Package<br/>Image Generation API]
            cli[CLI Tool<br/>Command Line Interface]
            lib[Library Package<br/>Core Logic]
        end

        subgraph "Shared Utilities"
            config[ESLint Config<br/>Shared Linting]
            tsconfig[TypeScript Config<br/>Shared TS Settings]
            ui[UI Components<br/>Shared React Components]
        end

        subgraph "External Services"
            vercel[Vercel<br/>Deployment]
            s3[AWS S3<br/>Image Storage]
        end
    end

    web --> lib
    chrome --> lib
    api --> lib
    cli --> lib

    web --> ui
    chrome --> ui

    web --> config
    chrome --> config
    api --> config
    cli --> config

    web --> tsconfig
    chrome --> tsconfig
    api --> tsconfig
    cli --> tsconfig
    lib --> tsconfig

    web --> vercel
    api --> vercel

    api --> s3

    style web fill:#0070f3,color:#fff
    style chrome fill:#4285f4,color:#fff
    style api fill:#00c7b7,color:#fff
    style cli fill:#ff6b6b,color:#fff
    style lib fill:#ffd93d,color:#000
    style ui fill:#95e1d3,color:#000
    style config fill:#e5e5e5,color:#000
    style tsconfig fill:#e5e5e5,color:#000
    style vercel fill:#000,color:#fff
    style s3 fill:#ff9900,color:#fff
```

## Project Structure Overview

### What is this project?
This is a **monorepo** (multiple related projects in one repository) called **OG-Img** that helps you generate beautiful Open Graph (OG) images for websites and social media.

### Main Components:

1. **Web App** - A Next.js website where users can create and customize OG images
2. **Chrome Extension** - A browser extension for quick OG image generation
3. **API** - Backend service that generates the actual images
4. **CLI** - Command-line tool for developers to generate images from terminal
5. **Library (lib)** - Core shared code used by all other packages
6. **UI Components** - Reusable React components
7. **Config Packages** - Shared settings for code quality and TypeScript

### How it works:
- The Web App and Chrome Extension provide user interfaces
- They both use the Library package for core functionality
- The API generates images and stores them on AWS S3
- Everything is deployed to Vercel
- The CLI lets developers automate image generation

### Technology Stack:
- **Framework**: Turborepo (for managing the monorepo)
- **Frontend**: React, Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Storage**: AWS S3
```

## Simplified Component Interaction

```mermaid
sequenceDiagram
    participant User
    participant Web/Extension
    participant Library
    participant API
    participant S3

    User->>Web/Extension: Create OG Image
    Web/Extension->>Library: Process template & data
    Library->>API: Request image generation
    API->>API: Generate image
    API->>S3: Upload image
    S3-->>API: Return image URL
    API-->>Web/Extension: Send image URL
    Web/Extension-->>User: Display generated image
```

## Package Dependencies

```mermaid
graph LR
    A[apps/web] --> E[packages/lib]
    A --> F[packages/ui]
    A --> G[packages/config]
    A --> H[packages/tsconfig]

    B[apps/chrome-extension] --> E
    B --> F
    B --> G
    B --> H

    C[packages/api] --> E
    C --> G
    C --> H

    D[packages/cli] --> E
    D --> G
    D --> H

    style A fill:#0070f3,color:#fff
    style B fill:#4285f4,color:#fff
    style C fill:#00c7b7,color:#fff
    style D fill:#ff6b6b,color:#fff
    style E fill:#ffd93d,color:#000
    style F fill:#95e1d3,color:#000
```
