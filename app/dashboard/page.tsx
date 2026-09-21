'use client';

import React from 'react';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Sparkles, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { Shell } from '@/components/Shell';

const data = [
  { name: 'Attempt 1', mistakes: 6 },
  { name: 'Attempt 2', mistakes: 4 },
  { name: 'Attempt 3', mistakes: 2 },
  { name: 'Attempt 4', mistakes: 1 }
];

export default function Dashboard() {
  return (
    <Shell>
      <header className="pageHead">
        <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Sparkles size={14} /> APPRENTICE LEARNING DASHBOARD
        </div>
        <h1>Your Practice Progress</h1>
        <p className="muted">Track your skill mastery, mistake reduction, and practice history.</p>
      </header>

      <section className="grid4">
        {[
          ['3 / 5', 'Skills Completed'],
          ['94%', 'Latest Practice Accuracy'],
          ['7', 'Mistakes Corrected'],
          ['4', 'Practice Sessions']
        ].map(([n, l]) => (
          <div className="card" key={l}>
            <div className="metric">{n}</div>
            <span className="muted" style={{ fontSize: 14 }}>
              {l}
            </span>
          </div>
        ))}
      </section>

      <section className="twoCol section">
        <div className="card">
          <div className="eyebrow" style={{ marginBottom: 8 }}>PROGRESS ANALYTICS</div>
          <h2 style={{ fontFamily: 'Playfair Display', margin: '0 0 16px' }}>
            Mistakes Across Practice Attempts
          </h2>
          <div className="chart" style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#73706a' }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#73706a' }} />
                <Tooltip />
                <Line type="monotone" dataKey="mistakes" stroke="#b45435" strokeWidth={3} dot={{ r: 6, fill: '#b45435' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          <div className="card" style={{ background: '#f4f8f3', border: '1px solid #d4e5d2' }}>
            <div className="eyebrow" style={{ color: '#2b6330' }}>MOST IMPROVED SKILL</div>
            <h2 style={{ fontFamily: 'Playfair Display', margin: '4px 0 6px' }}>Pattern Alignment</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#2b6330', fontWeight: 700, fontSize: 18 }}>
              <TrendingUp size={20} /> ↑ 18% Accuracy Gain
            </div>
            <p className="muted" style={{ fontSize: 13, margin: '6px 0 0' }}>
              Rotational deviation reduced from 13° to matching artisan reference.
            </p>
          </div>

          <div className="card">
            <div className="eyebrow" style={{ marginBottom: 12 }}>CURRENT SKILL JOURNEY</div>
            <div style={{ display: 'grid', gap: 10 }}>
              {[
                { name: 'Prepare Colour', status: 'Complete', icon: '✓' },
                { name: 'Position Block', status: 'Complete', icon: '✓' },
                { name: 'Align Pattern', status: 'Verified (Step 3)', icon: '✓' },
                { name: 'Press Block', status: 'Next Up (Step 4)', icon: '→' },
                { name: 'Lift & Inspect', status: 'Locked', icon: '🔒' }
              ].map((x) => (
                <div key={x.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 6, borderBottom: '1px solid var(--line)', fontSize: 14 }}>
                  <span style={{ fontWeight: x.status.includes('Verified') ? 700 : 400, color: x.status.includes('Complete') || x.status.includes('Verified') ? '#2b6330' : 'var(--ink)' }}>
                    {x.icon} {x.name}
                  </span>
                  <span className="badge" style={{ fontSize: 11, background: x.status.includes('Verified') ? '#e4eedf' : x.status.includes('Next') ? '#f5eadc' : '#eee' }}>
                    {x.status}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16 }}>
              <Link href="/practice/block-printing/alignment" className="button terra" style={{ width: '100%', justifyContent: 'center' }}>
                Practice Step 3 <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}

