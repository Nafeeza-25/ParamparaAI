# ParamparaAI

An offline-ready **Next.js** MVP demonstrating an artisan-verified digital apprenticeship platform for **Indian hand block printing**.

**Live Demo:** [paramparaai.vercel.app](https://paramparaai.vercel.app/)

---

## Overview

Traditional Indian hand block printing relies on years of tactile, master-to-apprentice mentorship to achieve precise pattern alignment, ink consistency, and pressure control. **ParamparaAI** bridges this gap by pairing structured digital guidance with visual attempt evaluation—helping learners practice core techniques and receive immediate feedback on alignment and form.

### Key Features
- **Interactive Practice & Correction Flow:** Step-by-step apprenticeship module guiding learners through block alignment and printing accuracy (`/practice/block-printing/alignment`).
- **Judge & Stakeholder Walkthrough:** Curated demonstration flow showcasing reference techniques alongside incorrect and corrected learner attempts (`/demo`).
- **Offline-Ready Architecture:** Designed to function reliably in low-connectivity environments using local assets and deterministic inference contracts.
- **Modular Vision Pipeline:** Decoupled analysis layer built to seamlessly transition from calibrated mock responses to real-time computer vision models without modifying the frontend UI.

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript (100%)
- **Deployment:** Vercel

---

## Project Structure

```text
ParamparaAI/
├── app/                   # Next.js App Router pages and layouts (/demo, /practice/...)
├── components/            # Reusable UI and interactive feedback components
├── lib/                   # Core logic and analysisService.ts
├── public/
│   └── demo-videos/       # Calibrated reference and test video assets
├── next.config.ts         # Next.js configuration
├── package.json           # Project dependencies and scripts
└── tsconfig.json          # TypeScript compiler configuration
