'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Compass, GraduationCap, Network, Palette, Play, LayoutDashboard } from 'lucide-react';

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="nav">
        <div className="shell" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
            <Image
              src="/brand/paramparaai-logo.png"
              alt="ParamparaAI"
              width={220}
              height={90}
              priority
              className="brand-logo"
              style={{
                height: 'auto',
                maxHeight: '48px',
                maxWidth: '210px',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </Link>

          <div className="links">
            <Link href="/">Discover</Link>
            <Link href="/learn/block-printing">Tutorial</Link>
            <Link href="/skill-graph/block-printing">Skill Graph</Link>
            <Link href="/artisan">Artisan Studio</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/impact">Impact & Tech</Link>
          </div>

          <Link className="button terra" href="/demo">
            <Play size={15} /> Experience Judge Demo
          </Link>
        </div>
      </nav>

      <main className="shell">{children}</main>

      <footer className="shell footer" style={{ textAlign: 'center', marginTop: 40, borderTop: '1px solid var(--line)', paddingTop: 24, paddingBottom: 32 }}>
        <p style={{ margin: '0 0 8px 0', fontWeight: 600 }}>
          ParamparaAI · From Digital Preservation to Digital Apprenticeship
        </p>
        <span className="badge" style={{ background: '#f0e6d6', color: '#685947', border: '1px solid #d9cbba' }}>
          MVP Demo · Live vision intelligence simulated using prerecorded practice sessions.
        </span>
      </footer>

      <nav className="mobileNav">
        <Link href="/">
          <Compass size={18} />
          <br />
          Discover
        </Link>
        <Link href="/learn/block-printing">
          <GraduationCap size={18} />
          <br />
          Learn
        </Link>
        <Link href="/skill-graph/block-printing">
          <Network size={18} />
          <br />
          Graph
        </Link>
        <Link href="/artisan">
          <Palette size={18} />
          <br />
          Studio
        </Link>
        <Link href="/dashboard">
          <LayoutDashboard size={18} />
          <br />
          Stats
        </Link>
      </nav>
    </>
  );
}

