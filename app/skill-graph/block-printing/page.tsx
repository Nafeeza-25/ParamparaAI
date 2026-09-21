'use client';

import React, { useState } from 'react';
import { Check, ShieldCheck, Sparkles, Network, AlertTriangle, Layers } from 'lucide-react';
import { Shell } from '@/components/Shell';
import { steps, SkillStep } from '@/lib/data';

export default function Graph() {
  const [selected, setSelected] = useState<SkillStep>(steps[2]); // Step 3 default

  return (
    <Shell>
      <header className="pageHead">
        <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Sparkles size={14} /> ARTISAN-VERIFIED KNOWLEDGE MODEL
        </div>
        <h1>Block Printing Skill Graph</h1>
        <p className="muted" style={{ maxWidth: 640 }}>
          The Skill Graph is the verified teaching model created from the master artisan’s demonstration. AI structures the video into candidate steps, and the master approves what is taught.
        </p>
      </header>

      <div className="card" style={{ background: '#f5eadc', borderLeft: '4px solid var(--terra)', marginBottom: 24, padding: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <ShieldCheck size={22} color="var(--terra)" />
          <div>
            <b style={{ color: 'var(--terra)', fontSize: 14 }}>THE PRINCIPLE</b>
            <p style={{ margin: '2px 0 0', fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>
              “AI structures the knowledge. The artisan approves what is taught.”
            </p>
          </div>
        </div>
      </div>

      <section className="graph">
        {/* Left Column: Interactive Node List */}
        <div className="card">
          <div className="eyebrow" style={{ marginBottom: 12 }}>
            <Network size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            STEPS IN GRAPH
          </div>
          <div className="nodes">
            {steps.map((s) => {
              const isSelected = s.id === selected.id;
              return (
                <button
                  className={`node ${isSelected ? 'selected' : ''}`}
                  key={s.id}
                  onClick={() => setSelected(s)}
                  style={{
                    display: 'block',
                    width: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: isSelected ? '2px solid var(--terra)' : '1px solid var(--line)',
                    background: isSelected ? '#f5e5d3' : 'var(--cream)',
                    borderRadius: 12,
                    padding: 14,
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <b>
                      {String(s.order).padStart(2, '0')} {s.title}
                    </b>
                    {isSelected && (
                      <span className="badge" style={{ background: 'var(--terra)', color: '#fff', fontSize: 10 }}>
                        Active
                      </span>
                    )}
                  </div>
                  <small className="muted" style={{ display: 'block', marginTop: 4, fontSize: 12 }}>
                    {isSelected ? 'Selected · Viewing checkpoints & corrections' : 'Click to inspect node details'}
                  </small>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Node Details Panel */}
        <article className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div className="eyebrow">NODE DETAILS · STEP {selected.order} OF 5</div>
            <span className="badge" style={{ background: '#eaf3e6', color: '#275227', fontSize: 12 }}>
              <ShieldCheck size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Verified by Master Artisan ✓
            </span>
          </div>

          <h2 style={{ fontFamily: 'Playfair Display', fontSize: 32, margin: '6px 0 10px' }}>
            {selected.title}
          </h2>
          <p className="muted" style={{ fontSize: 15, lineHeight: 1.5, margin: '0 0 20px' }}>
            {selected.instruction}
          </p>

          <hr style={{ border: 0, borderTop: '1px solid var(--line)', margin: '20px 0' }} />

          <div className="grid3" style={{ gap: 16 }}>
            {/* Observable Checks */}
            <section style={{ background: '#f8f4ed', padding: 14, borderRadius: 12, border: '1px solid #eadecc' }}>
              <b style={{ color: 'var(--ink)', display: 'block', marginBottom: 8, fontSize: 14 }}>
                Observable Checks
              </b>
              {selected.observableChecks.map((check) => (
                <p className="muted" key={check} style={{ fontSize: 13, margin: '4px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Check className="pass" size={14} /> {check}
                </p>
              ))}
            </section>

            {/* Common Mistakes */}
            <section style={{ background: '#fcf2ee', padding: 14, borderRadius: 12, border: '1px solid #f3d4ca' }}>
              <b style={{ color: 'var(--terra)', display: 'block', marginBottom: 8, fontSize: 14 }}>
                Common Mistakes
              </b>
              {selected.commonMistakes.map((mistake) => (
                <p className="muted" key={mistake} style={{ fontSize: 13, margin: '4px 0', display: 'flex', alignItems: 'center', gap: 6, color: '#823720' }}>
                  <AlertTriangle size={14} color="var(--terra)" /> {mistake}
                </p>
              ))}
            </section>

            {/* Master Correction */}
            <section style={{ background: '#f4ede1', padding: 14, borderRadius: 12, border: '1px solid #e8dbca' }}>
              <b style={{ color: 'var(--ink)', display: 'block', marginBottom: 8, fontSize: 14 }}>
                Master Correction
              </b>
              <p style={{ fontSize: 13, margin: 0, fontWeight: 600, color: 'var(--ink)' }}>
                “{selected.correction}”
              </p>
            </section>
          </div>

          <div className="card" style={{ marginTop: 20, background: '#f5eadc', border: '1px solid #e7d6c2' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <b style={{ fontSize: 13, color: 'var(--ink)' }}>Cultural & Context Note:</b>
                <p className="muted" style={{ margin: '4px 0 0', fontSize: 13 }}>
                  {selected.culturalNote}
                </p>
              </div>

              <div>
                <b style={{ fontSize: 13, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Layers size={14} color="var(--terra)" /> Accepted Craft Variations:
                </b>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
                  {selected.variations.map((v) => (
                    <span className="badge" style={{ background: '#e4eedf', color: '#2d5427', fontSize: 12 }} key={v}>
                      {v} ✓
                    </span>
                  ))}
                </div>
                <p className="muted" style={{ fontSize: 11, margin: '6px 0 0' }}>
                  Different artisan-approved traditions coexist as valid Skill Graph branches.
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>
    </Shell>
  );
}

