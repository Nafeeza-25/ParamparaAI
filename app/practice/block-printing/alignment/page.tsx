'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Check, ChevronDown, RotateCcw, Camera, ShieldCheck, Play, ArrowRight, Eye, Video, Upload } from 'lucide-react';
import { Shell } from '@/components/Shell';
import { VideoCard } from '@/components/VideoCard';
import { analyzePracticeAttempt, Analysis } from '@/lib/analysisService';

const stages = [
  'Detecting hand & workpiece...',
  'Identifying current skill step...',
  'Comparing with artisan-verified reference...',
  'Checking visible deviations...'
];

export default function Practice() {
  const [attempt, setAttempt] = useState<'incorrect-attempt' | 'corrected-attempt' | null>('incorrect-attempt');
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [upload, setUpload] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(0);
  const [result, setResult] = useState<Analysis | null>(null);
  const [why, setWhy] = useState(false);
  const [master, setMaster] = useState(false);
  const [retryMode, setRetryMode] = useState(false);
  const [showDevUpload, setShowDevUpload] = useState(false);

  const startPracticeSession = async () => {
    setIsSessionActive(true);
    setLoading(true);
    setResult(null);
    setStage(0);

    const activeVideo = retryMode ? 'corrected-attempt' : 'incorrect-attempt';
    const timer = window.setInterval(() => {
      setStage((s) => Math.min(s + 1, 3));
    }, 850);

    const res = await analyzePracticeAttempt(activeVideo);
    window.clearInterval(timer);
    setLoading(false);
    setResult(res);
  };

  const handleRetryStep = () => {
    setRetryMode(true);
    setAttempt('corrected-attempt');
    setResult(null);
    setIsSessionActive(false);
  };

  return (
    <Shell>
      <header className="pageHead">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Camera size={14} /> LIVE AI COACHING SESSION · STEP 3 OF 5
            </div>
            <h1>Align the Pattern</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#eef4ea', padding: '6px 14px', borderRadius: 99, color: '#2b6330', fontWeight: 600, fontSize: 13, border: '1px solid #c9dec4' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#3ba445', animation: 'pulse 1.5s infinite' }} />
            AI Coach Active
          </div>
        </div>

        <div className="progress" style={{ marginTop: 14 }}>
          <i style={{ width: retryMode && result?.status === 'verified' ? '60%' : '40%' }} />
        </div>
      </header>

      <div className="twoCol">
        {/* Left Column: Camera Viewfinder */}
        <section>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Eye size={16} color="var(--terra)" />
                <b style={{ fontSize: 14 }}>PHONE CAMERA FEED (SIMULATED PRACTICE)</b>
              </div>
              <span className="badge" style={{ fontSize: 11, background: '#f0e3d2', color: '#6e4f2b' }}>
                Step 3 — Align Pattern
              </span>
            </div>

            <div style={{ position: 'relative' }}>
              <VideoCard
                src={upload || `/demo-videos/${attempt || 'incorrect-attempt'}.mp4`}
                label={isSessionActive ? (result?.status === 'verified' ? 'Corrected Practice Session' : 'Active Practice Session') : 'Camera Preview Ready'}
              >
                {/* Live Camera Indicators Overlay */}
                <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end', pointerEvents: 'none' }}>
                  <span className="badge" style={{ background: 'rgba(23, 34, 60, 0.85)', color: '#fff', fontSize: 11 }}>
                    Hand Tracking: ACTIVE
                  </span>
                  <span className="badge" style={{ background: 'rgba(23, 34, 60, 0.85)', color: '#fff', fontSize: 11 }}>
                    Block Position: TRACKED
                  </span>
                </div>

                {/* Visual Error Annotations when analysis fails */}
                {result?.status === 'error' && (
                  <div className="overlay">
                    <div className="refLine" />
                    <div className="yourLine" />
                    <span className="videoTag" style={{ top: '45%', left: '13%', background: '#f7df99', color: '#4a3809', fontWeight: 700 }}>
                      REFERENCE ALIGNMENT
                    </span>
                    <span className="videoTag" style={{ top: '68%', left: '45%', background: '#f5b19b', color: '#571c0e', fontWeight: 700 }}>
                      YOUR ALIGNMENT (13° DEVIATION)
                    </span>
                    <span className="annotation">
                      ⚠ 13° Rotational Deviation Detected
                    </span>
                  </div>
                )}
              </VideoCard>
            </div>

            {/* Main Primary Action Button */}
            {!isSessionActive && !loading && (
              <div style={{ marginTop: 16 }}>
                <button className="button terra" style={{ width: '100%', justifyContent: 'center', padding: '14px 20px', fontSize: 15 }} onClick={startPracticeSession}>
                  <Play size={16} /> {retryMode ? 'START RETRY PRACTICE SESSION' : 'START PRACTICE SESSION'}
                </button>
              </div>
            )}

            {isSessionActive && !loading && result && (
              <div style={{ marginTop: 14, textAlign: 'center' }}>
                <button
                  className="buttonGhost"
                  style={{ fontSize: 13 }}
                  onClick={() => {
                    setIsSessionActive(false);
                    setResult(null);
                  }}
                >
                  Reset Session
                </button>
              </div>
            )}
          </div>

          {/* Camera Positioning & Setup Guide */}
          <div className="card" style={{ marginTop: 14, background: '#f5eadc', border: '1px solid #ebd8c1', fontSize: 13 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--ink)', fontWeight: 600 }}>
              <Camera size={15} color="var(--terra)" />
              <b>CAMERA POSITIONING GUIDE</b>
            </div>
            <p className="muted" style={{ margin: '6px 0 0', fontSize: 12, lineHeight: 1.5 }}>
              Position your phone camera 30–45 cm above your workspace with clear lighting on the printing block and fabric. The AI Coach automatically detects hand placement and block orientation.
            </p>
          </div>
        </section>

        {/* Right Column: AI Coach Feedback Panel */}
        <section className="card coach">
          <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <ShieldCheck size={14} /> AI APPRENTICE COACH
          </div>

          {!isSessionActive && !loading && (
            <div style={{ padding: '20px 0' }}>
              <h2 style={{ fontFamily: 'Playfair Display', margin: '8px 0 12px' }}>
                {retryMode ? 'Ready for your retry.' : 'Position your phone camera.'}
              </h2>
              <p className="muted">
                {retryMode
                  ? 'Click "Start Retry Practice Session" to perform the step again with the master artisan’s corrective guidance.'
                  : 'Start your practice session when ready. The AI Coach will observe your technique, compare it against the Artisan-Verified Skill Graph, and provide immediate guidance if mistakes occur.'}
              </p>

              <div style={{ background: '#f5eadc', padding: 16, borderRadius: 12, marginTop: 20 }}>
                <b>What the AI Coach observes:</b>
                <ul className="muted" style={{ paddingLeft: 18, margin: '8px 0 0', fontSize: 13, display: 'grid', gap: 4 }}>
                  <li>Hand position & grip trajectory</li>
                  <li>Block orientation relative to previous motif</li>
                  <li>Lower edge placement alignment</li>
                  <li>Pattern spacing and repeat consistency</li>
                </ul>
              </div>
            </div>
          )}

          {loading && (
            <div className="analysis" style={{ padding: '30px 0' }}>
              <div style={{ marginBottom: 12, fontWeight: 700, color: 'var(--terra)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="badge" style={{ background: '#f5e4d2', color: '#91421c' }}>● Observing Live Practice...</span>
              </div>
              {stages.map((x, i) => (
                <motion.div
                  key={x}
                  className={`analysisItem ${i < stage ? 'done' : ''}`}
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: i <= stage ? 1 : 0.2 }}
                >
                  {i < stage ? <Check size={18} className="pass" /> : <span style={{ color: '#aaa' }}>◌</span>}
                  <span>{x}</span>
                  {i === 1 && i <= stage && <small style={{ display: 'block', color: 'var(--terra)' }}>Step 3 — Align Pattern</small>}
                </motion.div>
              ))}
            </div>
          )}

          {result && !loading && (
            <AnimatePresence mode="wait">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                {result.status === 'error' ? (
                  <>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', margin: '8px 0' }}>
                      <AlertTriangle className="warn" size={28} />
                      <h2 style={{ fontFamily: 'Playfair Display', margin: 0, color: 'var(--terra)' }}>
                        Alignment Mismatch
                      </h2>
                    </div>

                    <span className="badge" style={{ background: '#f7e3d8', color: '#a44328', fontWeight: 700, marginBottom: 16 }}>
                      Step 3 — Align Pattern · AI Confidence {result.confidence * 100}%
                    </span>

                    <div style={{ display: 'grid', gap: 14, margin: '16px 0' }}>
                      <div style={{ background: '#fffaf2', padding: 14, borderRadius: 12, border: '1px solid #ead7c2' }}>
                        <b style={{ fontSize: 13, color: 'var(--ink)' }}>OBSERVED DEVIATION:</b>
                        <p className="muted" style={{ margin: '4px 0 0', fontSize: 14 }}>
                          {result.observed}
                        </p>
                      </div>

                      <div style={{ background: '#f4ede1', padding: 14, borderRadius: 12, borderLeft: '4px solid var(--terra)' }}>
                        <b style={{ fontSize: 13, color: 'var(--terra)' }}>MASTER-APPROVED CORRECTION:</b>
                        <p style={{ margin: '4px 0 0', fontWeight: 600, color: 'var(--ink)', fontSize: 14 }}>
                          “{result.correction}”
                        </p>
                      </div>
                    </div>

                    <Checks result={result} />

                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 20 }}>
                      <button className="buttonGhost" onClick={() => setMaster(true)}>
                        View Master Reference
                      </button>
                      <button className="button terra" onClick={handleRetryStep}>
                        <RotateCcw size={15} /> Retry Step with Guidance
                      </button>
                    </div>

                    <button
                      className="buttonGhost"
                      style={{ display: 'block', marginTop: 16, paddingLeft: 0, border: 0, color: 'var(--muted)', fontSize: 13 }}
                      onClick={() => setWhy(!why)}
                    >
                      Why was this flagged? <ChevronDown size={14} style={{ transform: why ? 'rotate(180deg)' : 'none' }} />
                    </button>

                    {why && (
                      <p className="muted" style={{ fontSize: 13, background: '#f8f2e7', padding: 12, borderRadius: 8, marginTop: 8 }}>
                        The visible orientation of the printing block differs by ~13° from the reference checkpoint approved by the master artisan in the Skill Graph.
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', margin: '8px 0' }}>
                      <Check className="pass" size={32} />
                      <h2 style={{ fontFamily: 'Playfair Display', margin: 0, color: '#2b6330' }}>
                        Alignment Verified
                      </h2>
                    </div>

                    <p className="muted" style={{ margin: '8px 0 16px', fontSize: 15 }}>
                      {result.message}
                    </p>

                    <div className="grid3" style={{ background: '#f4f8f3', padding: 16, borderRadius: 12, margin: '16px 0' }}>
                      <div>
                        <div className="metric" style={{ color: '#2b6330', fontSize: 32 }}>
                          {result.accuracy * 100}%
                        </div>
                        <small style={{ color: '#557358', fontWeight: 600 }}>Practice Accuracy</small>
                      </div>
                      <div>
                        <div className="metric" style={{ color: '#73706a', fontSize: 32 }}>
                          76%
                        </div>
                        <small style={{ color: '#73706a' }}>Previous Attempt</small>
                      </div>
                      <div>
                        <div className="metric" style={{ color: '#2b6330', fontSize: 32 }}>
                          +{(result.improvement || 0.18) * 100}%
                        </div>
                        <small style={{ color: '#2b6330', fontWeight: 600 }}>Improvement</small>
                      </div>
                    </div>

                    <Checks result={result} />

                    <div className="card" style={{ background: '#eaf0e5', border: '1px solid #cce0c7', margin: '16px 0 20px' }}>
                      <b style={{ color: '#275227' }}>Skill Journey Updated</b>
                      <p className="muted" style={{ margin: '4px 0 0', color: '#385738' }}>
                        Completed 2 / 5 skills → <b>3 / 5 skills (Align Pattern Verified ✓)</b>
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <Link href="/learn/block-printing" className="button">
                        Continue to Step 4 <ArrowRight size={16} />
                      </Link>
                      <Link href="/dashboard" className="buttonGhost">
                        View My Progress
                      </Link>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </section>
      </div>

      {/* Master Reference Modal */}
      {master && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modalBox">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h2 style={{ fontFamily: 'Playfair Display', margin: 0 }}>Verified Master Reference</h2>
              <span className="badge" style={{ background: '#eaf3e6', color: '#275227' }}>
                <ShieldCheck size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Verified by Master Artisan ✓
              </span>
            </div>

            <VideoCard src="/demo-videos/master-reference.mp4" label="Master Reference Demonstration" />

            <div style={{ margin: '16px 0', background: '#f5eadc', padding: 14, borderRadius: 10, fontSize: 14 }}>
              <p className="muted" style={{ margin: 0 }}>
                <b>Expected orientation:</b> Block edge parallel to previous motif.<br />
                <b>Visible checkpoint:</b> Lower block edge aligned before pressure.<br />
                <b>Master note:</b> “Check alignment before applying pressure.”
              </p>
            </div>

            <button className="button" onClick={() => setMaster(false)}>
              Return to Practice Session
            </button>
          </div>
        </div>
      )}
    </Shell>
  );
}

function Checks({ result }: { result: Analysis }) {
  return (
    <div className="checks" style={{ margin: '16px 0' }}>
      {Object.entries(result.checks).map(([key, value]) => (
        <div className="check" key={key}>
          <span>{key.replace(/([A-Z])/g, ' $1')}</span>
          <b className={value === 'pass' ? 'pass' : 'warn'}>
            {value === 'pass' ? '✓ Pass' : '⚠ Correction Needed'}
          </b>
        </div>
      ))}
    </div>
  );
}

