import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Lock, Play, ShieldCheck, Sparkles } from 'lucide-react';
import { Shell } from '@/components/Shell';
import { VideoCard } from '@/components/VideoCard';

export default function Home() {
  const flowSteps = ['WATCH', 'PRACTISE', 'DETECT', 'CORRECT', 'RETRY', 'LEARN'];

  return (
    <Shell>
      {/* Hero Section */}
      <section className="hero">
        <div>
          <div className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Sparkles size={14} /> ARTISAN-VERIFIED AI LEARNING
          </div>
          <h1>
            Traditional knowledge deserves more than an archive.
            <br />
            It deserves an apprentice.
          </h1>
          <p>
            An artisan-verified AI learning system that observes craft practice and provides step-specific corrective guidance using an ordinary smartphone.
          </p>
          <div className="actions">
            <Link href="/learn/block-printing" className="button">
              Start Learning <ArrowRight size={16} />
            </Link>
            <Link href="/demo" className="buttonGhost">
              <Play size={15} /> Launch Judge Demo
            </Link>
          </div>
        </div>
        <VideoCard src="/demo-videos/master-reference.mp4" label="Master artisan reference" />
      </section>

      {/* The Correction Loop */}
      <section className="section">
        <div className="eyebrow">THE CORRECTION LOOP</div>
        <h2>Watch. Practise. Improve.</h2>
        <div className="flow">
          {flowSteps.map((step, i) => (
            <React.Fragment key={step}>
              <b>{step}</b>
              {i < flowSteps.length - 1 && <span>→</span>}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Two Column Feature Section */}
      <section className="section twoCol">
        <div className="card">
          <div className="eyebrow">CONTINUE LEARNING</div>
          <h2>Block Printing</h2>
          <p className="muted">3 of 5 skills — your pattern alignment is now ready for practice.</p>
          <div className="progress" style={{ margin: '16px 0' }}>
            <i style={{ width: '60%' }} />
          </div>
          <Link href="/practice/block-printing/alignment" className="button" style={{ marginTop: 12 }}>
            Resume Step 3 <ArrowRight size={16} />
          </Link>
        </div>

        <div className="card">
          <div className="eyebrow">THE PRINCIPLE</div>
          <h2>AI amplifies the artisan. It does not replace them.</h2>
          <p className="muted">
            The system structures visible craft knowledge; the master approves what is taught and which variations count as correct.
          </p>
          <div style={{ marginTop: 16 }}>
            <span className="badge">
              <ShieldCheck size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />
              Human-in-the-loop validation
            </span>
          </div>
        </div>
      </section>

      {/* Explore Crafts Grid */}
      <section className="section">
        <div className="eyebrow">EXPLORE CRAFTS</div>
        <h2>Living traditions, taught with care.</h2>
        <div className="grid4" style={{ marginTop: 20 }}>
          <div className="card" style={{ borderLeft: '4px solid var(--terra)' }}>
            <b>Block Printing</b>
            <p className="muted">Indian Hand Woodblock Technique</p>
            <span className="badge">5 verified skills</span>
          </div>
          {['Basket Weaving', 'Wood Carving', 'Embroidery'].map((craft) => (
            <div className="card" key={craft} style={{ opacity: 0.85 }}>
              <Lock size={18} color="#b45435" />
              <p style={{ marginTop: 8 }}>
                <b>{craft}</b>
              </p>
              <span className="muted">Coming soon</span>
            </div>
          ))}
        </div>
      </section>
    </Shell>
  );
}

