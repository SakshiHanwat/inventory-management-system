'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    company: '', password: '', confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // ── Validations ──
    if (!form.firstName || !form.lastName || !form.email || !form.company || !form.password || !form.confirmPassword) {
      setError('Please fill in all fields.'); return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('Please enter a valid email address.'); return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.'); return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.'); return;
    }

    setLoading(true);
    // TODO: replace with real API call
    setTimeout(() => {
      setLoading(false);
      router.push('/login');
    }, 1000);
  };

  return (
    <main style={{
      minHeight: '100vh',
      background: '#fdf6ee',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif",
      padding: '24px',
    }}>
      <div style={{
        background: '#fff8f0',
        border: '0.5px solid #e2c99a',
        borderRadius: '16px',
        padding: '36px',
        width: '100%',
        maxWidth: '460px',
        boxShadow: '0 2px 24px rgba(160,80,20,0.07)',
      }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', marginBottom: '24px' }}>
          <div style={{ width: 36, height: 36, background: '#c45e1a', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="2" width="7" height="7" rx="2" fill="white"/>
              <rect x="11" y="2" width="7" height="7" rx="2" fill="white" opacity=".6"/>
              <rect x="2" y="11" width="7" height="7" rx="2" fill="white" opacity=".6"/>
              <rect x="11" y="11" width="7" height="7" rx="2" fill="white"/>
            </svg>
          </div>
          <span style={{ fontSize: '17px', fontWeight: 700, color: '#3b1a06' }}>CoreInventory</span>
        </div>

        {/* Heading */}
        <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#2c1200', textAlign: 'center', marginBottom: '6px' }}>
          Create your account
        </h1>
        <p style={{ fontSize: '13px', color: '#9c7a56', textAlign: 'center', marginBottom: '24px' }}>
          Start managing your inventory in minutes
        </p>

        <form onSubmit={handleSubmit}>

          {/* Row 1 — First + Last name */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
            <div>
              <label style={labelStyle}>First Name</label>
              <input
                value={form.firstName}
                onChange={e => handleChange('firstName', e.target.value)}
                placeholder="Arjun"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Last Name</label>
              <input
                value={form.lastName}
                onChange={e => handleChange('lastName', e.target.value)}
                placeholder="Joshi"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: '14px' }}>
            <label style={labelStyle}>Email address</label>
            <input
              type="email"
              value={form.email}
              onChange={e => handleChange('email', e.target.value)}
              placeholder="you@company.com"
              style={inputStyle}
            />
          </div>

          {/* Company */}
          <div style={{ marginBottom: '14px' }}>
            <label style={labelStyle}>Company Name</label>
            <input
              value={form.company}
              onChange={e => handleChange('company', e.target.value)}
              placeholder="e.g. Joshi Enterprises"
              style={inputStyle}
            />
          </div>

          {/* Row 2 — Password + Confirm */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '6px' }}>
            <div>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                value={form.password}
                onChange={e => handleChange('password', e.target.value)}
                placeholder="••••••••"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Confirm Password</label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={e => handleChange('confirmPassword', e.target.value)}
                placeholder="••••••••"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div style={{ marginTop: '10px', padding: '10px 14px', background: '#B85C4A15', border: '0.5px solid #B85C4A44', borderRadius: '8px', fontSize: '12px', color: '#B85C4A', fontWeight: 500 }}>
              ⚠ {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '12px',
              background: loading ? '#d4956a' : '#c45e1a',
              color: '#fff8f0', border: 'none',
              borderRadius: '9px', fontSize: '14px',
              fontWeight: 600, fontFamily: 'inherit',
              marginTop: '18px', cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.15s',
            }}>
            {loading ? 'Creating account...' : 'Create Account →'}
          </button>
        </form>

        {/* Terms */}
        <p style={{ fontSize: '11px', color: '#b8906a', textAlign: 'center', marginTop: '14px', lineHeight: '1.6' }}>
          By signing up you agree to our{' '}
          <span style={{ color: '#c45e1a', cursor: 'pointer' }}>Terms of Service</span>{' '}
          and{' '}
          <span style={{ color: '#c45e1a', cursor: 'pointer' }}>Privacy Policy</span>
        </p>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '18px 0' }}>
          <div style={{ flex: 1, height: '0.5px', background: '#e2c99a' }} />
          <span style={{ fontSize: '11px', color: '#b8906a' }}>already have an account?</span>
          <div style={{ flex: 1, height: '0.5px', background: '#e2c99a' }} />
        </div>

        {/* Login link */}
        <p style={{ textAlign: 'center', fontSize: '13px', color: '#9c7a56' }}>
          <Link href="/login" style={{ color: '#c45e1a', fontWeight: 600, textDecoration: 'none' }}>
            ← Sign in to existing account
          </Link>
        </p>

      </div>
    </main>
  );
}

// ── Shared styles ──
const labelStyle = {
  fontSize: '12px', fontWeight: 500,
  color: '#7a5535', display: 'block', marginBottom: '6px',
};
const inputStyle = {
  width: '100%', padding: '10px 14px',
  fontSize: '13px', background: '#fdf4e8',
  border: '0.5px solid #d4a96a', borderRadius: '8px',
  color: '#2c1200', fontFamily: 'inherit',
  boxSizing: 'border-box', outline: 'none',
};