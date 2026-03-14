'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: add real auth logic here
    router.push('/dashboard');
  };

  return (
    <main style={{
      minHeight: '100vh',
      background: '#fdf6ee',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{
        background: '#fff8f0',
        border: '0.5px solid #e2c99a',
        borderRadius: '16px',
        padding: '40px 36px 36px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 2px 24px rgba(160,80,20,0.07)',
      }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', marginBottom: '28px' }}>
          <div style={{ width: 36, height: 36, background: '#c45e1a', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="2" width="7" height="7" rx="2" fill="white"/>
              <rect x="11" y="2" width="7" height="7" rx="2" fill="white" opacity=".6"/>
              <rect x="2" y="11" width="7" height="7" rx="2" fill="white" opacity=".6"/>
              <rect x="11" y="11" width="7" height="7" rx="2" fill="white"/>
            </svg>
          </div>
          <span style={{ fontSize: '17px', fontWeight: 600, color: '#3b1a06' }}>CoreInventory</span>
        </div>

        <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#2c1200', textAlign: 'center', marginBottom: '6px' }}>
          Welcome back
        </h1>
        <p style={{ fontSize: '13px', color: '#9c7a56', textAlign: 'center', marginBottom: '28px' }}>
          Sign in to your inventory dashboard
        </p>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, color: '#7a5535', display: 'block', marginBottom: '6px' }}>
              Email address
            </label>
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%', padding: '10px 14px', fontSize: '14px',
                background: '#fdf4e8', border: '0.5px solid #d4a96a',
                borderRadius: '8px', color: '#2c1200', outline: 'none',
                boxSizing: 'border-box', fontFamily: 'inherit',
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '8px' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, color: '#7a5535', display: 'block', marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%', padding: '10px 14px', fontSize: '14px',
                background: '#fdf4e8', border: '0.5px solid #d4a96a',
                borderRadius: '8px', color: '#2c1200', outline: 'none',
                boxSizing: 'border-box', fontFamily: 'inherit',
              }}
            />
          </div>

          {/* Remember + Forgot */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0 22px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '12px', color: '#9c7a56', cursor: 'pointer' }}>
              <input type="checkbox" style={{ accentColor: '#c45e1a' }} /> Remember me
            </label>
            <Link href="/forgot-password" style={{ fontSize: '12px', color: '#c45e1a', textDecoration: 'none' }}>
              Forgot password?
            </Link>
          </div>

          <button type="submit" style={{
            width: '100%', padding: '12px',
            background: '#c45e1a', color: '#fff8f0',
            border: 'none', borderRadius: '9px',
            fontSize: '14px', fontWeight: 600,
            fontFamily: 'inherit', cursor: 'pointer',
          }}>
            Sign in
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '20px 0' }}>
          <div style={{ flex: 1, height: '0.5px', background: '#e2c99a' }} />
          <span style={{ fontSize: '11px', color: '#b8906a' }}>don't have an account?</span>
          <div style={{ flex: 1, height: '0.5px', background: '#e2c99a' }} />
        </div>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#9c7a56' }}>
          New here?{' '}
          <Link href="/signup" style={{ color: '#c45e1a', fontWeight: 500, textDecoration: 'none' }}>
            Create an account →
          </Link>
        </p>
      </div>
    </main>
  );
}