'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';

const SECTIONS = [
  { key: 'general',       label: 'General',       icon: '👤' },
  { key: 'company',       label: 'Company',        icon: '🏢' },
  { key: 'notifications', label: 'Notifications',  icon: '🔔' },
  { key: 'security',      label: 'Security',       icon: '🔒' },
  { key: 'appearance',    label: 'Appearance',     icon: '🎨' },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('general');
  const [saved, setSaved] = useState(false);

  // ── General form ──
  const [general, setGeneral] = useState({
    firstName: 'Sakshi', lastName: 'Harwani',
    email: 'sakshi@coreinventory.com', phone: '+91 98765 43210',
    role: 'Inventory Manager', language: 'English (India)',
  });

  // ── Company form ──
  const [company, setCompany] = useState({
    name: 'CoreInventory Pvt. Ltd.', gstin: '27AAPCS1234A1Z5',
    address: '14, MG Road, Indore', city: 'Indore',
    state: 'Madhya Pradesh', pincode: '452001',
    currency: 'INR (₹)', timezone: 'IST (UTC+5:30)',
  });

  // ── Notifications ──
  const [notifs, setNotifs] = useState({
    lowStock:       true,
    deliveryUpdate: true,
    dailySummary:   false,
    newReceipt:     true,
    adjustmentLog:  false,
    weeklyReport:   true,
  });

  // ── Security ──
  const [security, setSecurity] = useState({
    currentPassword: '', newPassword: '', confirmPassword: '',
  });
  const [secError, setSecError] = useState('');

  // ── Appearance ──
  const [appearance, setAppearance] = useState({
    theme: 'Cream (Default)', density: 'Comfortable', fontSize: 'Medium',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handlePasswordChange = () => {
    setSecError('');
    if (!security.currentPassword || !security.newPassword || !security.confirmPassword) {
      setSecError('Please fill all password fields.'); return;
    }
    if (security.newPassword.length < 6) {
      setSecError('New password must be at least 6 characters.'); return;
    }
    if (security.newPassword !== security.confirmPassword) {
      setSecError('Passwords do not match.'); return;
    }
    setSecurity({ currentPassword: '', newPassword: '', confirmPassword: '' });
    handleSave();
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F5EFE6' }}>
      <Navbar />
      <div style={{ marginLeft: '220px', flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* Topbar */}
        <div style={{ background: '#FDF8F2', borderBottom: '1px solid #E8D5BB', padding: '16px 28px', position: 'sticky', top: 0, zIndex: 40 }}>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#3D2B1F' }}>Settings</h1>
          <p style={{ fontSize: '12px', color: '#9C8572', marginTop: '2px' }}>Manage your account and application preferences</p>
        </div>

        <div style={{ display: 'flex', flex: 1 }}>

          {/* Settings Sidebar */}
          <div style={{ width: '200px', background: '#FDF8F2', borderRight: '1px solid #E8D5BB', padding: '16px 10px', flexShrink: 0 }}>
            <div style={{ fontSize: '10px', fontWeight: 600, color: '#C4A882', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0 6px 10px' }}>Preferences</div>
            {SECTIONS.map(s => (
              <div
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '9px',
                  padding: '9px 10px', borderRadius: '8px', marginBottom: '2px',
                  cursor: 'pointer', fontSize: '13px',
                  fontWeight: activeSection === s.key ? 600 : 400,
                  color: activeSection === s.key ? '#C17F3E' : '#9C8572',
                  background: activeSection === s.key ? '#C17F3E12' : 'transparent',
                  borderLeft: activeSection === s.key ? '2px solid #C17F3E' : '2px solid transparent',
                  transition: 'all 0.15s',
                }}>
                <span style={{ fontSize: '14px' }}>{s.icon}</span>
                {s.label}
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div style={{ flex: 1, padding: '24px 28px', overflowY: 'auto' }}>

            {/* ── SAVED TOAST ── */}
            {saved && (
              <div style={{ position: 'fixed', top: '80px', right: '28px', background: '#7A9E7E', color: '#fff', padding: '10px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, zIndex: 999 }}>
                ✓ Changes saved successfully
              </div>
            )}

            {/* ── GENERAL ── */}
            {activeSection === 'general' && (
              <div>
                <SectionHead title="General Settings" sub="Manage your personal account preferences" />

                <SettingsCard title="Personal Info">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                    <Field label="First Name" value={general.firstName} onChange={v => setGeneral(p => ({ ...p, firstName: v }))} />
                    <Field label="Last Name"  value={general.lastName}  onChange={v => setGeneral(p => ({ ...p, lastName: v }))} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                    <Field label="Email Address" value={general.email} onChange={v => setGeneral(p => ({ ...p, email: v }))} type="email" />
                    <Field label="Phone Number"  value={general.phone} onChange={v => setGeneral(p => ({ ...p, phone: v }))} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                    <SelectField label="Role" value={general.role} onChange={v => setGeneral(p => ({ ...p, role: v }))}
                      options={['Inventory Manager', 'Admin', 'Warehouse Staff', 'Viewer']} />
                    <SelectField label="Language" value={general.language} onChange={v => setGeneral(p => ({ ...p, language: v }))}
                      options={['English (India)', 'English (US)', 'Hindi']} />
                  </div>
                  <SaveBtn onClick={handleSave} />
                </SettingsCard>

                <SettingsCard title="Avatar">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #C17F3E, #6B4226)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 700, color: '#FDF8F2' }}>
                      {general.firstName[0]}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#3D2B1F', marginBottom: '4px' }}>{general.firstName} {general.lastName}</div>
                      <div style={{ fontSize: '12px', color: '#9C8572', marginBottom: '10px' }}>{general.role}</div>
                      <button style={{ padding: '6px 16px', background: 'transparent', border: '1px solid #E8D5BB', borderRadius: '7px', fontSize: '12px', color: '#9C6B3C', fontWeight: 500, cursor: 'pointer' }}>
                        Change Photo
                      </button>
                    </div>
                  </div>
                </SettingsCard>
              </div>
            )}

            {/* ── COMPANY ── */}
            {activeSection === 'company' && (
              <div>
                <SectionHead title="Company Settings" sub="Update your business information and billing details" />
                <SettingsCard title="Business Details">
                  <div style={{ marginBottom: '14px' }}>
                    <Field label="Company Name" value={company.name} onChange={v => setCompany(p => ({ ...p, name: v }))} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                    <Field label="GSTIN" value={company.gstin} onChange={v => setCompany(p => ({ ...p, gstin: v }))} />
                    <Field label="Pincode" value={company.pincode} onChange={v => setCompany(p => ({ ...p, pincode: v }))} />
                  </div>
                  <div style={{ marginBottom: '14px' }}>
                    <Field label="Address" value={company.address} onChange={v => setCompany(p => ({ ...p, address: v }))} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                    <Field label="City"  value={company.city}  onChange={v => setCompany(p => ({ ...p, city: v }))} />
                    <Field label="State" value={company.state} onChange={v => setCompany(p => ({ ...p, state: v }))} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                    <SelectField label="Currency" value={company.currency} onChange={v => setCompany(p => ({ ...p, currency: v }))}
                      options={['INR (₹)', 'USD ($)', 'EUR (€)', 'GBP (£)']} />
                    <SelectField label="Timezone" value={company.timezone} onChange={v => setCompany(p => ({ ...p, timezone: v }))}
                      options={['IST (UTC+5:30)', 'UTC', 'EST (UTC-5)', 'PST (UTC-8)']} />
                  </div>
                  <SaveBtn onClick={handleSave} />
                </SettingsCard>
              </div>
            )}

            {/* ── NOTIFICATIONS ── */}
            {activeSection === 'notifications' && (
              <div>
                <SectionHead title="Notification Settings" sub="Control which alerts and updates you receive" />
                <SettingsCard title="Stock & Inventory">
                  {[
                    { key: 'lowStock',      label: 'Low Stock Alerts',    sub: 'Notify when items hit reorder threshold' },
                    { key: 'newReceipt',    label: 'New Receipt Received', sub: 'Alert when incoming stock is logged' },
                    { key: 'adjustmentLog', label: 'Adjustment Logs',      sub: 'Notify on every stock adjustment made' },
                  ].map(n => (
                    <ToggleRow key={n.key} label={n.label} sub={n.sub}
                      value={notifs[n.key]}
                      onChange={() => setNotifs(p => ({ ...p, [n.key]: !p[n.key] }))} />
                  ))}
                </SettingsCard>
                <SettingsCard title="Operations">
                  {[
                    { key: 'deliveryUpdate', label: 'Delivery Updates',  sub: 'Updates on dispatch and delivery status' },
                    { key: 'dailySummary',   label: 'Daily Summary',     sub: 'Daily email with inventory snapshot' },
                    { key: 'weeklyReport',   label: 'Weekly Report',     sub: 'Weekly digest of all movements' },
                  ].map(n => (
                    <ToggleRow key={n.key} label={n.label} sub={n.sub}
                      value={notifs[n.key]}
                      onChange={() => setNotifs(p => ({ ...p, [n.key]: !p[n.key] }))} />
                  ))}
                </SettingsCard>
                <SaveBtn onClick={handleSave} />
              </div>
            )}

            {/* ── SECURITY ── */}
            {activeSection === 'security' && (
              <div>
                <SectionHead title="Security Settings" sub="Keep your account safe and secure" />
                <SettingsCard title="Change Password">
                  <div style={{ marginBottom: '14px' }}>
                    <Field label="Current Password" value={security.currentPassword}
                      onChange={v => setSecurity(p => ({ ...p, currentPassword: v }))} type="password" placeholder="Enter current password" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                    <Field label="New Password" value={security.newPassword}
                      onChange={v => setSecurity(p => ({ ...p, newPassword: v }))} type="password" placeholder="Min 6 characters" />
                    <Field label="Confirm New Password" value={security.confirmPassword}
                      onChange={v => setSecurity(p => ({ ...p, confirmPassword: v }))} type="password" placeholder="Repeat new password" />
                  </div>
                  {secError && (
                    <div style={{ padding: '10px 14px', background: '#B85C4A15', border: '0.5px solid #B85C4A44', borderRadius: '8px', fontSize: '12px', color: '#B85C4A', marginBottom: '14px' }}>
                      ⚠ {secError}
                    </div>
                  )}
                  <SaveBtn label="Update Password" onClick={handlePasswordChange} />
                </SettingsCard>

                <SettingsCard title="Session & Access">
                  {[
                    { label: 'Two-Factor Authentication', sub: 'Add extra layer of login security' },
                    { label: 'Login Notifications',       sub: 'Alert on new device login' },
                  ].map((item, i) => (
                    <ToggleRow key={i} label={item.label} sub={item.sub} value={false} onChange={() => {}} />
                  ))}
                </SettingsCard>

                <SettingsCard title="Danger Zone">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#3D2B1F' }}>Delete Account</div>
                      <div style={{ fontSize: '12px', color: '#9C8572', marginTop: '2px' }}>Permanently delete your account and all data</div>
                    </div>
                    <button style={{ padding: '8px 16px', background: 'transparent', border: '1px solid #B85C4A', borderRadius: '8px', fontSize: '12px', color: '#B85C4A', fontWeight: 600, cursor: 'pointer' }}>
                      Delete Account
                    </button>
                  </div>
                </SettingsCard>
              </div>
            )}

            {/* ── APPEARANCE ── */}
            {activeSection === 'appearance' && (
              <div>
                <SectionHead title="Appearance" sub="Customize how CoreInventory looks for you" />
                <SettingsCard title="Theme">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '20px' }}>
                    {[
                      { label: 'Cream (Default)', bg: '#F5EFE6', border: '#E8D5BB', active: true  },
                      { label: 'Pure White',       bg: '#FFFFFF', border: '#E0E0E0', active: false },
                      { label: 'Warm Sand',         bg: '#F0E6D3', border: '#D4B896', active: false },
                    ].map((t, i) => (
                      <div key={i} onClick={() => setAppearance(p => ({ ...p, theme: t.label }))}
                        style={{ border: `2px solid ${appearance.theme === t.label ? '#C17F3E' : '#E8D5BB'}`, borderRadius: '10px', padding: '12px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s' }}>
                        <div style={{ width: '100%', height: '36px', background: t.bg, border: `1px solid ${t.border}`, borderRadius: '6px', marginBottom: '8px' }} />
                        <div style={{ fontSize: '11px', fontWeight: 600, color: appearance.theme === t.label ? '#C17F3E' : '#9C8572' }}>{t.label}</div>
                      </div>
                    ))}
                  </div>
                </SettingsCard>
                <SettingsCard title="Display">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                    <SelectField label="Layout Density" value={appearance.density} onChange={v => setAppearance(p => ({ ...p, density: v }))}
                      options={['Comfortable', 'Compact', 'Spacious']} />
                    <SelectField label="Font Size" value={appearance.fontSize} onChange={v => setAppearance(p => ({ ...p, fontSize: v }))}
                      options={['Small', 'Medium', 'Large']} />
                  </div>
                  <SaveBtn onClick={handleSave} />
                </SettingsCard>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

// ── Reusable components ──

function SectionHead({ title, sub }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#3D2B1F', marginBottom: '4px' }}>{title}</h2>
      <p style={{ fontSize: '12px', color: '#9C8572' }}>{sub}</p>
    </div>
  );
}

function SettingsCard({ title, children }) {
  return (
    <div style={{ background: '#FDF8F2', border: '1px solid #E8D5BB', borderRadius: '12px', padding: '20px 22px', marginBottom: '16px' }}>
      {title && (
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#9C6B3C', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
          {title}
        </div>
      )}
      {children}
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', placeholder = '' }) {
  return (
    <div>
      <label style={{ fontSize: '12px', fontWeight: 500, color: '#7a5535', display: 'block', marginBottom: '6px' }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: '100%', padding: '10px 14px', background: '#fdf4e8', border: '0.5px solid #d4a96a', borderRadius: '8px', fontSize: '13px', color: '#2c1200', fontFamily: 'inherit', boxSizing: 'border-box' }}
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label style={{ fontSize: '12px', fontWeight: 500, color: '#7a5535', display: 'block', marginBottom: '6px' }}>{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ width: '100%', padding: '10px 14px', background: '#fdf4e8', border: '0.5px solid #d4a96a', borderRadius: '8px', fontSize: '13px', color: '#2c1200', fontFamily: 'inherit', boxSizing: 'border-box' }}>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function ToggleRow({ label, sub, value, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 0', borderBottom: '0.5px solid #F0E4D0' }}
      onClick={onChange}>
      <div>
        <div style={{ fontSize: '13px', fontWeight: 500, color: '#3D2B1F' }}>{label}</div>
        <div style={{ fontSize: '11px', color: '#9C8572', marginTop: '2px' }}>{sub}</div>
      </div>
      <div style={{ width: '36px', height: '20px', borderRadius: '10px', background: value ? '#C17F3E' : '#E8D5BB', position: 'relative', cursor: 'pointer', flexShrink: 0, transition: 'background 0.2s' }}>
        <div style={{ width: '16px', height: '16px', background: '#FDF8F2', borderRadius: '50%', position: 'absolute', top: '2px', transition: 'left 0.2s', left: value ? '18px' : '2px' }} />
      </div>
    </div>
  );
}

function SaveBtn({ label = 'Save Changes', onClick }) {
  return (
    <button onClick={onClick} style={{ padding: '10px 22px', background: '#C17F3E', color: '#FDF8F2', border: 'none', borderRadius: '9px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
      {label}
    </button>
  );
}
