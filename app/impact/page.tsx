import React from 'react';
import { Shell } from '@/components/Shell';
import { Sparkles, Check, AlertTriangle, Cpu } from 'lucide-react';

const pipeline = [
  'MASTER ARTISAN',
  'Smartphone Video + Voice',
  'Video Segmentation + Speech-to-Text',
  'Hand / Object / Step Detection',
  'Artisan Review & Approval',
  'ARTISAN-VERIFIED SKILL GRAPH',
  'Learner Smartphone Camera / Video',
  'Hand + Workpiece Tracking',
  'Current-Step Recognition',
  'Reference Comparison',
  'Visible Deviation Detection',
  'Master-Approved Corrective Feedback'
];

export default function Impact() {
  return (
    <Shell>
      <header className="pageHead">
        <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Sparkles size={14} /> PROTOTYPE / PILOT METRICS & ARCHITECTURE
        </div>
        <h1>Measured for learning, preservation and access.</h1>
        <p className="muted">Illustrative pilot metrics and production technical architecture roadmap.</p>
      </header>

      <section className="grid4">
        {[
          ['12', 'Artisan-Verified Skills Captured'],
          ['5', 'Craft Variations Preserved'],
          ['126', 'Learner Practice Sessions'],
          ['34%', 'Average Error Reduction'],
          ['4', 'Languages Supported']
        ].map(([n, l]) => (
          <div className="card" key={l}>
            <div className="metric">{n}</div>
            <small className="muted" style={{ fontSize: 13 }}>
              {l}
            </small>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="eyebrow">TECHNICAL FEASIBILITY & PIPELINE</div>
        <h2>Human approval at the centre of the system.</h2>
        <div className="flow" style={{ marginTop: 16 }}>
          {pipeline.map((step, i) => (
            <React.Fragment key={step}>
              <b style={{ background: i === 0 || i === 5 || i === pipeline.length - 1 ? 'var(--terra)' : '#efe2cf', color: i === 0 || i === 5 || i === pipeline.length - 1 ? '#fff' : 'var(--ink)' }}>
                {step}
              </b>
              {i < pipeline.length - 1 && <span>↓</span>}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="grid3" style={{ marginTop: 10 }}>
        <div className="card" style={{ borderLeft: '4px solid #2b6330' }}>
          <b style={{ color: '#2b6330', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Check size={16} /> WHAT CAMERA CAN OBSERVE
          </b>
          <p className="muted" style={{ fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>
            Hand position · hand orientation · movement sequence · tool/block orientation · alignment · visible spacing · shape · pattern position · visible transfer result
          </p>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--terra)' }}>
          <b style={{ color: 'var(--terra)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <AlertTriangle size={16} /> WHAT MVP DOES NOT CLAIM TO MEASURE
          </b>
          <p className="muted" style={{ fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>
            Exact pressure · material moisture · temperature · internal structural tension · purely tactile qualities
          </p>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--indigo)' }}>
          <b style={{ color: 'var(--indigo)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Cpu size={16} /> FUTURE-READY ARCHITECTURE
          </b>
          <p className="muted" style={{ fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>
            MediaPipe Hand Landmarker · OpenCV / OpenCV.js · Multimodal Vision Model · Speech-to-Text · Automatic Translation · Supabase / PostgreSQL Data Storage
          </p>
        </div>
      </section>
    </Shell>
  );
}

