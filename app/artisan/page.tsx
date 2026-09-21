'use client';

import React, { useState } from 'react';
import { Check, Edit3, Upload, ShieldCheck, Sparkles, Video, Save } from 'lucide-react';
import { Shell } from '@/components/Shell';
import { steps as initialSteps, SkillStep } from '@/lib/data';

export default function Artisan() {
  const [file, setFile] = useState<string | null>(null);
  const [generated, setGenerated] = useState(false);
  const [approved, setApproved] = useState<number[]>([]);
  const [editing, setEditing] = useState<number | null>(null);
  const [steps, setSteps] = useState<SkillStep[]>(initialSteps);
  const [published, setPublished] = useState(false);

  const updateField = (field: keyof SkillStep, value: any) => {
    setSteps((prev) =>
      prev.map((x, i) => (i === editing ? { ...x, [field]: value } : x))
    );
  };

  const toggleApprove = (index: number) => {
    setApproved((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <Shell>
      <header className="pageHead">
        <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Sparkles size={14} /> ARTISAN STUDIO · MASTER AUTHORING
        </div>
        <h1>Turn your demonstration into an interactive teaching model.</h1>
        <p className="muted">
          Record or upload your craft practice. AI structures the video into candidate steps, visual checks, and common mistakes for your approval.
        </p>
      </header>

      {!generated ? (
        <section className="card studioUpload" style={{ textAlign: 'center', padding: '48px 24px', border: '2px dashed #d5c4ab' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#f8ebe2', display: 'grid', placeItems: 'center', margin: '0 auto 16px', color: 'var(--terra)' }}>
            <Upload size={28} />
          </div>
          <h2 style={{ fontFamily: 'Playfair Display', margin: '0 0 8px' }}>Capture Master Demonstration</h2>
          <p className="muted" style={{ maxWidth: 520, margin: '0 auto 24px', fontSize: 15 }}>
            Upload a video recording of your master technique. The system will extract observable step boundaries and visual checkpoints.
          </p>

          <label className="button terra" style={{ cursor: 'pointer' }}>
            <Video size={16} /> Choose Master Demonstration Video
            <input
              type="file"
              accept="video/*"
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setFile(URL.createObjectURL(f));
              }}
            />
          </label>

          {file && (
            <div style={{ marginTop: 24 }}>
              <video src={file} controls style={{ width: '100%', maxWidth: 560, margin: '0 auto 20px', display: 'block', borderRadius: 12, border: '1px solid var(--line)' }} />
              <button className="button" onClick={() => setGenerated(true)}>
                Generate Draft Skill Graph
              </button>
            </div>
          )}
        </section>
      ) : (
        <section>
          <div className="card" style={{ background: '#f5eadc', borderLeft: '4px solid var(--terra)', marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <b style={{ color: 'var(--terra)', fontSize: 13, textTransform: 'uppercase' }}>Draft Generated from Master Demonstration</b>
                <h2 style={{ fontFamily: 'Playfair Display', margin: '4px 0 0' }}>5 Candidate Steps Detected</h2>
                <p className="muted" style={{ fontSize: 13, margin: '4px 0 0' }}>
                  Transcribing explanation · Segmenting demonstration · Identifying observable checkpoints · Detecting common errors
                </p>
              </div>
              <span className="badge" style={{ background: '#eaf3e6', color: '#275227', fontSize: 13 }}>
                <ShieldCheck size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Master Review Required
              </span>
            </div>
          </div>

          <div className="courseSteps" style={{ display: 'grid', gap: 16 }}>
            {steps.map((s, i) => {
              const isApproved = approved.includes(i);
              return (
                <div className="card" key={s.id} style={{ border: isApproved ? '1px solid #73b378' : '1px solid var(--line)', background: isApproved ? '#f7faf6' : 'var(--cream)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
                    <div style={{ flex: 1, minWidth: 260 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className="badge" style={{ background: 'var(--indigo)', color: '#fff' }}>
                          Step {String(s.order).padStart(2, '0')}
                        </span>
                        <h3 style={{ margin: 0, fontFamily: 'Playfair Display', fontSize: 20 }}>{s.title}</h3>
                      </div>

                      <p style={{ margin: '8px 0 10px', fontSize: 14 }}>{s.instruction}</p>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10, background: 'rgba(0,0,0,0.03)', padding: 12, borderRadius: 10, fontSize: 13 }}>
                        <div>
                          <b style={{ color: 'var(--ink)' }}>Observable Checkpoints:</b>
                          <div style={{ color: 'var(--muted)', marginTop: 2 }}>{s.observableChecks.join(', ')}</div>
                        </div>
                        <div>
                          <b style={{ color: 'var(--terra)' }}>Common Mistake:</b>
                          <div style={{ color: 'var(--muted)', marginTop: 2 }}>{s.commonMistakes.join(', ')}</div>
                        </div>
                        <div>
                          <b style={{ color: '#2b6330' }}>Master Correction:</b>
                          <div style={{ color: 'var(--muted)', marginTop: 2 }}>{s.correction}</div>
                        </div>
                      </div>

                      <div style={{ marginTop: 8, fontSize: 12, color: 'var(--muted)' }}>
                        AI confidence: {96 - i * 2}% · Cultural note: <i>{s.culturalNote}</i>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="buttonGhost" style={{ padding: '8px 14px', fontSize: 13 }} onClick={() => setEditing(i)}>
                        <Edit3 size={14} /> Edit
                      </button>
                      <button
                        className={isApproved ? 'button' : 'buttonGhost'}
                        style={{ padding: '8px 14px', fontSize: 13, background: isApproved ? '#2b6330' : undefined }}
                        onClick={() => toggleApprove(i)}
                      >
                        {isApproved ? 'Approved ✓' : 'Approve Step'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <span className="muted" style={{ fontSize: 14 }}>
              <b>{approved.length} of 5 steps approved</b> by master artisan.
            </span>

            {approved.length < 5 ? (
              <button className="buttonGhost" onClick={() => setApproved([0, 1, 2, 3, 4])}>
                Approve All 5 Steps
              </button>
            ) : (
              <button className="button terra" style={{ padding: '12px 24px', fontSize: 15 }} onClick={() => setPublished(true)}>
                <ShieldCheck size={16} /> Publish Verified Skill Graph
              </button>
            )}
          </div>

          {published && (
            <div className="card" style={{ marginTop: 24, background: '#eaf3e6', border: '1px solid #b8dcaf', padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Check className="pass" size={32} />
                <div>
                  <h2 style={{ margin: 0, fontFamily: 'Playfair Display', color: '#2b6330' }}>
                    Artisan-Verified Skill Graph Published
                  </h2>
                  <p className="muted" style={{ margin: '4px 0 0', color: '#275227', fontSize: 15 }}>
                    Your approved knowledge is now available to learners worldwide on their mobile practice cameras.
                  </p>
                </div>
              </div>

              <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid #cae3c4', fontWeight: 700, color: 'var(--ink)' }}>
                “The artisan — not the AI — remains the authority.”
              </div>
            </div>
          )}
        </section>
      )}

      {/* Edit Modal */}
      {editing !== null && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modalBox" style={{ maxWidth: 640 }}>
            <h2 style={{ fontFamily: 'Playfair Display', margin: '0 0 16px' }}>
              Edit Step {String(steps[editing].order).padStart(2, '0')}: {steps[editing].title}
            </h2>

            <div style={{ display: 'grid', gap: 14 }}>
              <label style={{ display: 'grid', gap: 5 }}>
                <b style={{ fontSize: 13 }}>Step Name</b>
                <input
                  value={steps[editing].title}
                  onChange={(e) => updateField('title', e.target.value)}
                  style={{ padding: 10, border: '1px solid #cbbba2', borderRadius: 8, font: 'inherit' }}
                />
              </label>

              <label style={{ display: 'grid', gap: 5 }}>
                <b style={{ fontSize: 13 }}>Instruction</b>
                <textarea
                  rows={2}
                  value={steps[editing].instruction}
                  onChange={(e) => updateField('instruction', e.target.value)}
                  style={{ padding: 10, border: '1px solid #cbbba2', borderRadius: 8, font: 'inherit' }}
                />
              </label>

              <label style={{ display: 'grid', gap: 5 }}>
                <b style={{ fontSize: 13 }}>Observable Checkpoints (comma separated)</b>
                <input
                  value={steps[editing].observableChecks.join(', ')}
                  onChange={(e) => updateField('observableChecks', e.target.value.split(',').map((x) => x.trim()))}
                  style={{ padding: 10, border: '1px solid #cbbba2', borderRadius: 8, font: 'inherit' }}
                />
              </label>

              <label style={{ display: 'grid', gap: 5 }}>
                <b style={{ fontSize: 13 }}>Common Mistake</b>
                <input
                  value={steps[editing].commonMistakes.join(', ')}
                  onChange={(e) => updateField('commonMistakes', e.target.value.split(',').map((x) => x.trim()))}
                  style={{ padding: 10, border: '1px solid #cbbba2', borderRadius: 8, font: 'inherit' }}
                />
              </label>

              <label style={{ display: 'grid', gap: 5 }}>
                <b style={{ fontSize: 13 }}>Master Correction</b>
                <textarea
                  rows={2}
                  value={steps[editing].correction}
                  onChange={(e) => updateField('correction', e.target.value)}
                  style={{ padding: 10, border: '1px solid #cbbba2', borderRadius: 8, font: 'inherit' }}
                />
              </label>

              <label style={{ display: 'grid', gap: 5 }}>
                <b style={{ fontSize: 13 }}>Cultural Note</b>
                <input
                  value={steps[editing].culturalNote}
                  onChange={(e) => updateField('culturalNote', e.target.value)}
                  style={{ padding: 10, border: '1px solid #cbbba2', borderRadius: 8, font: 'inherit' }}
                />
              </label>
            </div>

            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button className="button" onClick={() => setEditing(null)}>
                <Save size={15} /> Save Changes Locally
              </button>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}

