# ParamparaAI

An offline-ready Next.js MVP demonstrating artisan-verified digital apprenticeship for Indian hand block printing.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The judge walkthrough is available at `/demo`, and the complete practice/correction flow is at `/practice/block-printing/alignment`.

## Demo media

The three calibrated demo clips are included in `public/demo-videos/`:

- `master-reference.mp4`
- `incorrect-attempt.mp4`
- `corrected-attempt.mp4`

## MVP inference honesty

`lib/analysisService.ts` contains the deterministic, mock-backed analysis response used for the demo videos. It can be replaced later with a real MediaPipe/OpenCV/model API while retaining the existing UI result contract.
