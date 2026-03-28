'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingPanelsProps {
  progress: number;
}

function CallLogPanel() {
  const calls = [
    { name: 'Maria S.', duration: '4:32', status: 'booked', channel: 'voice' },
    { name: 'James K.', duration: '2:18', status: 'resolved', channel: 'sms' },
    { name: 'Clinic HQ', duration: '7:04', status: 'live', channel: 'voice' },
    { name: 'Ana R.', duration: '1:55', status: 'booked', channel: 'web' },
  ];

  return (
    <div style={{
      width: '220px',
      background: 'rgba(13,17,23,0.92)',
      border: '1px solid rgba(56,189,248,0.2)',
      borderRadius: '16px',
      padding: '14px',
      backdropFilter: 'blur(12px)',
      fontFamily: 'system-ui, sans-serif',
      color: '#f0f6fc',
    }}>
      <div style={{ fontSize: '10px', color: '#38bdf8', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '10px', textTransform: 'uppercase' }}>
        Recent Calls
      </div>
      {calls.map((c, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: i < calls.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600 }}>{c.name}</div>
            <div style={{ fontSize: '9px', color: '#8b949e' }}>{c.duration} · {c.channel}</div>
          </div>
          <span style={{
            fontSize: '8px',
            padding: '2px 7px',
            borderRadius: '20px',
            background: c.status === 'live' ? 'rgba(56,189,248,0.2)' : c.status === 'booked' ? 'rgba(45,212,191,0.15)' : 'rgba(255,255,255,0.08)',
            color: c.status === 'live' ? '#38bdf8' : c.status === 'booked' ? '#2dd4bf' : '#8b949e',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            {c.status}
          </span>
        </div>
      ))}
    </div>
  );
}

function StatsPanel() {
  return (
    <div style={{
      width: '180px',
      background: 'rgba(13,17,23,0.92)',
      border: '1px solid rgba(45,212,191,0.2)',
      borderRadius: '16px',
      padding: '14px',
      backdropFilter: 'blur(12px)',
      fontFamily: 'system-ui, sans-serif',
      color: '#f0f6fc',
    }}>
      <div style={{ fontSize: '10px', color: '#2dd4bf', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '10px', textTransform: 'uppercase' }}>
        Live Stats
      </div>
      {[
        { label: 'Active Agents', value: '3', color: '#38bdf8' },
        { label: 'Live Calls', value: '1', color: '#2dd4bf' },
        { label: 'Today\'s Calls', value: '47', color: '#7dd3fc' },
        { label: 'Booked', value: '12', color: '#2dd4bf' },
      ].map((s, i) => (
        <div key={i} style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '9px', color: '#8b949e', marginBottom: '2px' }}>{s.label}</div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: s.color }}>{s.value}</div>
        </div>
      ))}
    </div>
  );
}

function UsagePanel() {
  return (
    <div style={{
      width: '200px',
      background: 'rgba(13,17,23,0.92)',
      border: '1px solid rgba(125,211,252,0.15)',
      borderRadius: '16px',
      padding: '14px',
      backdropFilter: 'blur(12px)',
      fontFamily: 'system-ui, sans-serif',
      color: '#f0f6fc',
    }}>
      <div style={{ fontSize: '10px', color: '#7dd3fc', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '10px', textTransform: 'uppercase' }}>
        This Month
      </div>
      <div style={{ fontSize: '28px', fontWeight: 700, color: '#38bdf8', marginBottom: '2px' }}>921k</div>
      <div style={{ fontSize: '9px', color: '#8b949e', marginBottom: '12px' }}>tokens processed</div>
      {[
        { label: 'Calls handled', pct: 78 },
        { label: 'Resolved', pct: 91 },
      ].map((item, i) => (
        <div key={i} style={{ marginBottom: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#8b949e', marginBottom: '3px' }}>
            <span>{item.label}</span><span style={{ color: '#38bdf8' }}>{item.pct}%</span>
          </div>
          <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px' }}>
            <div style={{ height: '100%', width: `${item.pct}%`, background: 'linear-gradient(90deg, #38bdf8, #2dd4bf)', borderRadius: '2px' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function FloatingPanels({ progress }: FloatingPanelsProps) {
  return (
    <group>
      {/* Call log panel — left */}
      <Float speed={1.2} floatIntensity={0.3} rotationIntensity={0.1}>
        <mesh position={[-2.2, 0.3, 0]} rotation={[0, 0.3, 0]}>
          <planeGeometry args={[3.5, 2.5]} />
          <meshBasicMaterial transparent opacity={0} />
          <Html transform distanceFactor={3} position={[0, 0, 0.01]} style={{ pointerEvents: 'none' }}>
            <CallLogPanel />
          </Html>
        </mesh>
      </Float>

      {/* Stats panel — center-right */}
      <Float speed={1.5} floatIntensity={0.4} rotationIntensity={0.1}>
        <mesh position={[1.8, 0.8, -0.5]} rotation={[0, -0.2, 0]}>
          <planeGeometry args={[2.8, 2.2]} />
          <meshBasicMaterial transparent opacity={0} />
          <Html transform distanceFactor={3} position={[0, 0, 0.01]} style={{ pointerEvents: 'none' }}>
            <StatsPanel />
          </Html>
        </mesh>
      </Float>

      {/* Usage panel — bottom right */}
      <Float speed={1.0} floatIntensity={0.25} rotationIntensity={0.08}>
        <mesh position={[2.4, -1.2, 0.3]} rotation={[0.05, -0.35, 0]}>
          <planeGeometry args={[3.2, 2.0]} />
          <meshBasicMaterial transparent opacity={0} />
          <Html transform distanceFactor={3} position={[0, 0, 0.01]} style={{ pointerEvents: 'none' }}>
            <UsagePanel />
          </Html>
        </mesh>
      </Float>
    </group>
  );
}
