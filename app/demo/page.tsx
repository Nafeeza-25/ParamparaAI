'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ArrowRight, ShieldCheck, Camera, Sparkles, Play, RefreshCw, AlertTriangle } from 'lucide-react';
import { Shell } from '@/components/Shell';
import { VideoCard } from '@/components/VideoCard';

const titles = [
  '1. Learn from the Master',
  '2. Knowledge Becomes Teachable',
  '3. Learner Practises Live',
  '4. AI Observes & Corrects',
  '5. Learner Retries & Improves',
  '6. Digital Apprenticeship'
];

export default function Demo() {
  const [step, setStep] = useState(0);
  const [restartKey, setRestartKey] = useState(0);

  const next = () => setStep((s) => Math.min(s + 1, 5));

  return (
    <Shell>
      <div className="demoBox" key={restartKey}>
        <header className="pageHead" style={{ textAlign: 'center' }}>
          <div className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Sparkles size={14} /> JUDGE DEMO · PARAMPARAAI IN 60 SECONDS
          </div>
          <div className="demoProgress" style={{ maxWidth: 500, margin: '16px auto' }}>
            {titles.map((_, i) => (
              <i className={i <= step ? 'on' : ''} key={i} />
            ))}
          </div>
          <span className="muted" style={{ fontSize: 13, display: 'block', marginBottom: 8 }}>
            Step {step + 1} of 6
          </span>
          <h1 style={{ fontFamily: 'Playfair Display', margin: 0 }}>{titles[step]}</h1>
        </header>

        <AnimatePresence mode="wait">
          <motion.section
            key={step}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            className="card"
            style={{ padding: 28, marginTop: 12 }}
          >
            {/* Step 1: Meet Master */}
            {step === 0 && (
              <div>
                <VideoCard src="/demo-videos/master-reference.mp4" label="Master Artisan Demonstration">
                  <div style={{ position: 'absolute', top: 12, right: 12, background: '#eaf3e6', color: '#275227', padding: '6px 12px', borderRadius: 99, fontSize: 12, fontWeight: 700 }}>
                    <ShieldCheck size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Verified Master Reference
                  </div>
                </VideoCard>
                <div style={{ marginTop: 18 }}>
                  <p className="muted" style={{ fontSize: 16, lineHeight: 1.6 }}>
                    A master artisan demonstrates the craft using an ordinary smartphone camera. The system captures the visual technique, rhythm, and structural placement checkpoints.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Knowledge Model / Skill Graph */}
            {step === 1 && (
              <div>
                <div className="flow" style={{ justifyContent: 'center', margin: '16px 0 24px' }}>
                  <b>MASTER DEMO</b>
                  <span>→</span>
                  <b>5 OBSERVABLE STEPS</b>
                  <span>→</span>
                  <b>CHECKPOINTS</b>
                  <span>→</span>
                  <b>ARTISAN APPROVAL</b>
                </div>

                <div className="card" style={{ background: '#f5eadc', border: '1px solid #e5d1b8', padding: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--terra)', marginBottom: 8 }}>
                    <ShieldCheck size={20} />
                    <b style={{ fontSize: 16 }}>ARTISAN APPROVAL REQUIRED</b>
                  </div>
                  <p className="muted" style={{ fontSize: 15, margin: 0 }}>
                    AI structures the video into candidate steps, observable visual checks, and common mistakes. The master artisan reviews, edits, and approves the Skill Graph before it reaches learners.
                  </p>
                  <div style={{ marginTop: 12, fontWeight: 600, color: 'var(--ink)', fontSize: 14 }}>
                    “The artisan — not the AI — remains the authority.”
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Learner Practises */}
            {step === 2 && (
              <div>
                <VideoCard src="/demo-videos/incorrect-attempt.mp4" label="Learner Camera Feed (Simulated Live Practice)">
                  <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(23,34,60,0.85)', color: '#fff', padding: '6px 12px', borderRadius: 99, fontSize: 12, fontWeight: 700 }}>
                    <Camera size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Phone Camera Live Observation
                  </div>
                </VideoCard>
                <div style={{ marginTop: 18 }}>
                  <p className="muted" style={{ fontSize: 16, lineHeight: 1.6 }}>
                    The learner attempts Step 3 (Align Pattern) independently. In production, their phone camera observes the practice in real-time.
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: AI Detects Mistake & Master-Approved Correction */}
            {step === 3 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#fcece8', display: 'grid', placeItems: 'center', color: 'var(--terra)' }}>
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <span className="badge" style={{ background: '#f7e3d8', color: '#a44328' }}>
                      Step 3 — Align Pattern · 91% Confidence
                    </span>
                    <h2 style={{ fontFamily: 'Playfair Display', margin: '4px 0 0' }}>
                      Alignment Mismatch Detected
                    </h2>
                  </div>
                </div>

                <div style={{ position: 'relative', marginBottom: 20 }}>
                  <VideoCard src="/demo-videos/incorrect-attempt.mp4" label="Observed Practice with 13° Deviation">
                    <div className="overlay">
                      <div className="refLine" />
                      <div className="yourLine" />
                      <span className="annotation">⚠ 13° Rotational Deviation</span>
                    </div>
                  </VideoCard>
                </div>

                <div className="card" style={{ background: '#f4ede1', borderLeft: '4px solid var(--terra)', padding: 18 }}>
                  <b style={{ color: 'var(--terra)', fontSize: 13, textTransform: 'uppercase', letterSpacing: 1.2 }}>
                    MASTER-APPROVED CORRECTION
                  </b>
                  <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', margin: '6px 0 0' }}>
                    “Rotate the block slightly counter-clockwise and align its lower edge with the previous motif before placement.”
                  </p>
                </div>
              </div>
            )}

            {/* Step 5: Learner Retries & Gets Verified */}
            {step === 4 && (
              <div>
                <VideoCard src="/demo-videos/corrected-attempt.mp4" label="Corrected Practice Session">
                  <div style={{ position: 'absolute', top: 12, right: 12, background: '#eaf3e6', color: '#275227', padding: '6px 12px', borderRadius: 99, fontSize: 12, fontWeight: 700 }}>
                    ✓ Alignment Verified (94% Accuracy)
                  </div>
                </VideoCard>

                <div style={{ marginTop: 18 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#2b6330', marginBottom: 8 }}>
                    <Check size={24} />
                    <h2 style={{ fontFamily: 'Playfair Display', margin: 0 }}>
                      Alignment Verified
                    </h2>
                  </div>
                  <p className="muted" style={{ fontSize: 15, margin: 0 }}>
                    The visible block orientation and edge alignment match the artisan-approved reference. Progress updates from <b>2 / 5</b> to <b>3 / 5 skills completed</b>.
                  </p>
                </div>
              </div>
            )}

            {/* Step 6: Final Comparison & Summary */}
            {step === 5 && (
              <div>
                <div className="compare" style={{ marginBottom: 24 }}>
                  <div className="card" style={{ background: '#fff9f2' }}>
                    <b style={{ color: '#7a5a3a', fontSize: 13 }}>EXISTING DIGITAL LEARNING</b>
                    <p className="muted" style={{ fontSize: 14, margin: '12px 0 0', lineHeight: 1.8 }}>
                      Master<br />
                      ↓<br />
                      Video Archive / PDF<br />
                      ↓<br />
                      Learner watches passively
                    </p>
                  </div>

                  <div className="card" style={{ background: '#edf4ea', border: '1px solid #cae3c4' }}>
                    <b style={{ color: '#2b6330', fontSize: 13 }}>PARAMPARAAI</b>
                    <p className="muted" style={{ fontSize: 14, margin: '12px 0 0', lineHeight: 1.8, color: '#1e4222' }}>
                      Master<br />
                      ↓<br />
                      Artisan-Verified Skill Graph<br />
                      ↓<br />
                      Learner Practises Live (Camera)<br />
                      ↓<br />
                      AI Observes & Detects Mistakes<br />
                      ↓<br />
                      Master-Approved Correction<br />
                      ↓<br />
                      Learner Retries & Improves
                    </p>
                  </div>
                </div>

                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                  <h2 style={{ fontFamily: 'Playfair Display', fontSize: 26, color: 'var(--ink)', lineHeight: 1.35, maxWidth: 620, margin: '0 auto 16px' }}>
                    “Don’t just archive the master’s hands.
                    <br />
                    Preserve their ability to guide the next pair of hands.”
                  </h2>

                  <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link href="/practice/block-printing/alignment" className="button terra">
                      Try Interactive Practice <ArrowRight size={15} />
                    </Link>
                    <button
                      className="buttonGhost"
                      onClick={() => {
                        setStep(0);
                        setRestartKey((x) => x + 1);
                      }}
                    >
                      <RefreshCw size={15} /> Restart Judge Demo
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.section>
        </AnimatePresence>

        {/* Step Navigation Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
          <button
            className="buttonGhost"
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(s - 1, 0))}
            style={{ opacity: step === 0 ? 0.4 : 1 }}
          >
            Previous
          </button>

          {step < 5 ? (
            <button className="button" onClick={next}>
              {step === 2 ? 'Analyse Practice Session' : step === 3 ? 'Apply Correction' : step === 4 ? 'See Final Comparison' : 'Next Step'}{' '}
              <ArrowRight size={15} />
            </button>
          ) : null}
        </div>
      </div>
    </Shell>
  );
}

