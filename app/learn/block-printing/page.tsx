import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight, ShieldCheck, Camera, Sparkles, AlertCircle, Lightbulb } from 'lucide-react';
import { Shell } from '@/components/Shell';
import { VideoCard } from '@/components/VideoCard';
import { steps } from '@/lib/data';

export default function Course() {
  const currentStep = steps[2]; // Step 3: Align Pattern

  return (
    <Shell>
      <header className="pageHead">
        <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Sparkles size={14} /> VERIFIED LEARNING PATHWAY · 5 SKILLS
        </div>
        <h1>Traditional Block Printing</h1>
        <p className="muted">Learn technique from master artisans, then practise live with phone camera AI observation.</p>
        <div className="progress" style={{ maxWidth: 430, marginTop: 12 }}>
          <i style={{ width: '60%' }} />
        </div>
      </header>

      <div className="twoCol">
        <aside className="card">
          <div className="eyebrow" style={{ marginBottom: 12 }}>CURRICULUM STEPS</div>
          <div className="courseSteps">
            {steps.map((s) => (
              <div className={`step ${s.order === 3 ? 'active' : ''}`} key={s.id}>
                <span>
                  {s.order < 3 ? (
                    <Check className="pass" size={18} />
                  ) : s.order === 3 ? (
                    <span style={{ color: 'var(--terra)', fontWeight: 'bold' }}>●</span>
                  ) : (
                    <span style={{ color: '#aaa' }}>○</span>
                  )}
                </span>
                <span style={{ marginLeft: 8 }}>
                  <b>{String(s.order).padStart(2, '0')}</b> {s.title}
                </span>
              </div>
            ))}
          </div>
        </aside>

        <section>
          <div className="eyebrow">STEP 03 TUTORIAL</div>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: 34, margin: '8px 0 16px' }}>
            Step 3 — Align Pattern
          </h2>

          <VideoCard src="/demo-videos/master-reference.mp4" label="Master Reference Video">
            <div style={{ position: 'absolute', top: 14, right: 14, background: '#eaf3e6', color: '#275227', padding: '6px 12px', borderRadius: 99, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
              <ShieldCheck size={14} /> Verified by Master Artisan ✓
            </div>
          </VideoCard>

          <div className="card" style={{ marginTop: 20 }}>
            <div className="eyebrow">VERIFIED CHECKPOINTS</div>
            <h3 style={{ margin: '6px 0 14px', fontFamily: 'Playfair Display' }}>What you will practice</h3>

            <div style={{ display: 'grid', gap: 14 }}>
              <div>
                <b>Goal</b>
                <p className="muted" style={{ margin: '4px 0 0' }}>{currentStep.instruction}</p>
              </div>

              <div>
                <b>What to observe (Observable Checks)</b>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 6 }}>
                  {currentStep.observableChecks.map((check) => (
                    <span key={check} className="badge" style={{ background: '#f5ead9', color: '#7a5127' }}>
                      <Check size={12} style={{ display: 'inline', marginRight: 4 }} /> {check}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 4 }}>
                <div style={{ background: '#fcf6ee', padding: 12, borderRadius: 10, border: '1px solid #ebdccb' }}>
                  <b style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#b45435', fontSize: 13 }}>
                    <AlertCircle size={14} /> Common Mistake
                  </b>
                  <p className="muted" style={{ fontSize: 13, margin: '4px 0 0' }}>
                    {currentStep.commonMistakes.join(', ')}
                  </p>
                </div>

                <div style={{ background: '#f4f8f3', padding: 12, borderRadius: 10, border: '1px solid #d4e5d2' }}>
                  <b style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#2b6330', fontSize: 13 }}>
                    <Lightbulb size={14} /> Master Tip
                  </b>
                  <p className="muted" style={{ fontSize: 13, margin: '4px 0 0' }}>
                    “Check the alignment before applying pressure.”
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: 12, color: 'var(--muted)', display: 'block' }}>READY TO PRACTICE?</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Use your smartphone camera for AI observation</span>
              </div>
              <Link href="/practice/block-printing/alignment" className="button terra">
                <Camera size={16} /> PRACTICE WITH AI COACH <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Shell>
  );
}

