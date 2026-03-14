"use client";

import { useState, useRef, useEffect, type KeyboardEvent, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";

type AuthState = "login" | "signup" | "otp";

export default function LoginPage() {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>("login");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Handle state transitions
  const changeState = (newState: AuthState) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setAuthState(newState);
      setIsTransitioning(false);
    }, 150);
  };

  // OTP resend timer
  useEffect(() => {
    if (authState === "otp" && resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [authState, resendTimer]);

  // Focus first OTP input when entering OTP state
  useEffect(() => {
    if (authState === "otp") {
      otpRefs.current[0]?.focus();
    }
  }, [authState]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = () => {
    if (canResend) {
      setResendTimer(30);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      otpRefs.current[0]?.focus();
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - in production, call your API
    router.push("/dashboard");
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup - in production, call your API
    router.push("/dashboard");
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      // Simulate OTP verification - in production, call your API
      router.push("/dashboard");
    }
  };

  const handleForgotPassword = () => {
    if (email) {
      changeState("otp");
      setResendTimer(30);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-background relative">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #1A1A1A 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
          opacity: 0.04,
        }}
      />

      <div className="relative z-10 w-full max-w-[420px]">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <WarehouseIcon className="w-10 h-10 text-primary" />
            <span className="text-2xl font-bold text-primary">CoreInventory</span>
          </div>
          <p className="text-muted text-sm">
            Streamline Your Stock. Simplify Your Business.
          </p>
        </div>

        {/* Auth Card */}
        <div
          className={`bg-card rounded-[20px] shadow-lg border border-border p-6 md:p-10 transition-all duration-150 ${
            isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          }`}
        >
          {authState === "otp" ? (
            <OtpForm
              email={email}
              otp={otp}
              otpRefs={otpRefs}
              resendTimer={resendTimer}
              canResend={canResend}
              onOtpChange={handleOtpChange}
              onOtpKeyDown={handleOtpKeyDown}
              onResend={handleResendOtp}
              onSubmit={handleVerifyOtp}
              onBack={() => changeState("login")}
            />
          ) : (
            <>
              {/* Tab Toggle */}
              <div className="flex bg-background rounded-xl p-1 mb-6">
                <button
                  type="button"
                  onClick={() => authState !== "login" && changeState("login")}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    authState === "login"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => authState !== "signup" && changeState("signup")}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    authState === "signup"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {authState === "login" ? (
                <LoginForm
                  email={email}
                  password={password}
                  showPassword={showPassword}
                  onEmailChange={setEmail}
                  onPasswordChange={setPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                  onForgotPassword={handleForgotPassword}
                  onSubmit={handleLogin}
                  onSwitchToSignup={() => changeState("signup")}
                />
              ) : (
                <SignupForm
                  fullName={fullName}
                  email={email}
                  password={password}
                  showPassword={showPassword}
                  onFullNameChange={setFullName}
                  onEmailChange={setEmail}
                  onPasswordChange={setPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                  onSubmit={handleSignup}
                  onSwitchToLogin={() => changeState("login")}
                />
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

// Login Form Component
function LoginForm({
  email,
  password,
  showPassword,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onForgotPassword,
  onSubmit,
  onSwitchToSignup,
}: {
  email: string;
  password: string;
  showPassword: boolean;
  onEmailChange: (v: string) => void;
  onPasswordChange: (v: string) => void;
  onTogglePassword: () => void;
  onForgotPassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onSwitchToSignup: () => void;
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-1">Welcome Back</h2>
        <p className="text-sm text-muted">Sign in to your CoreInventory account</p>
      </div>

      <div className="space-y-4">
        <InputField
          type="email"
          placeholder="Email address"
          value={email}
          onChange={onEmailChange}
          icon={<MailIcon className="w-5 h-5 text-muted" />}
        />
        <InputField
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
          icon={<LockIcon className="w-5 h-5 text-muted" />}
          suffix={
            <button
              type="button"
              onClick={onTogglePassword}
              className="text-muted hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOffIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          }
        />
      </div>

      <div className="flex justify-end mt-2">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-primary hover:text-primary-hover transition-colors"
        >
          Forgot Password?
        </button>
      </div>

      <button
        type="submit"
        className="w-full mt-6 py-3 bg-primary text-white font-medium rounded-[14px] hover:bg-primary-hover hover:shadow-md transition-all duration-200"
      >
        Sign In
      </button>

      <p className="text-center text-sm text-muted mt-6">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-primary font-medium hover:text-primary-hover transition-colors"
        >
          Sign up
        </button>
      </p>
    </form>
  );
}

// Signup Form Component
function SignupForm({
  fullName,
  email,
  password,
  showPassword,
  onFullNameChange,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onSubmit,
  onSwitchToLogin,
}: {
  fullName: string;
  email: string;
  password: string;
  showPassword: boolean;
  onFullNameChange: (v: string) => void;
  onEmailChange: (v: string) => void;
  onPasswordChange: (v: string) => void;
  onTogglePassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onSwitchToLogin: () => void;
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-1">Create Account</h2>
        <p className="text-sm text-muted">Start managing your inventory today</p>
      </div>

      <div className="space-y-4">
        <InputField
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={onFullNameChange}
          icon={<UserIcon className="w-5 h-5 text-muted" />}
        />
        <InputField
          type="email"
          placeholder="Email address"
          value={email}
          onChange={onEmailChange}
          icon={<MailIcon className="w-5 h-5 text-muted" />}
        />
        <InputField
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
          icon={<LockIcon className="w-5 h-5 text-muted" />}
          suffix={
            <button
              type="button"
              onClick={onTogglePassword}
              className="text-muted hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOffIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          }
        />
      </div>

      <button
        type="submit"
        className="w-full mt-6 py-3 bg-primary text-white font-medium rounded-[14px] hover:bg-primary-hover hover:shadow-md transition-all duration-200"
      >
        Create Account
      </button>

      <p className="text-center text-sm text-muted mt-6">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-primary font-medium hover:text-primary-hover transition-colors"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}

// OTP Form Component
function OtpForm({
  email,
  otp,
  otpRefs,
  resendTimer,
  canResend,
  onOtpChange,
  onOtpKeyDown,
  onResend,
  onSubmit,
  onBack,
}: {
  email: string;
  otp: string[];
  otpRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  resendTimer: number;
  canResend: boolean;
  onOtpChange: (index: number, value: string) => void;
  onOtpKeyDown: (index: number, e: KeyboardEvent<HTMLInputElement>) => void;
  onResend: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}) {
  return (
    <form onSubmit={onSubmit}>
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-muted hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        <span className="text-sm">Back</span>
      </button>

      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold text-foreground mb-1">Check Your Email</h2>
        <p className="text-sm text-muted">
          We sent a 6-digit OTP to{" "}
          <span className="text-foreground font-medium">{email || "your@email.com"}</span>
        </p>
      </div>

      {/* OTP Input Boxes */}
      <div className="flex justify-center gap-2 mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { otpRefs.current[index] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onOtpChange(index, e.target.value)}
            onKeyDown={(e) => onOtpKeyDown(index, e)}
            className="w-12 h-12 text-center text-xl font-bold border border-border rounded-lg bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        ))}
      </div>

      {/* Resend OTP */}
      <div className="text-center mb-6">
        {canResend ? (
          <button
            type="button"
            onClick={onResend}
            className="text-sm text-primary hover:text-primary-hover transition-colors font-medium"
          >
            Resend OTP
          </button>
        ) : (
          <p className="text-sm text-muted">
            Resend OTP in <span className="text-foreground font-medium">{resendTimer}s</span>
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={otp.join("").length !== 6}
        className="w-full py-3 bg-primary text-white font-medium rounded-[14px] hover:bg-primary-hover hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary disabled:hover:shadow-none"
      >
        Verify OTP
      </button>
    </form>
  );
}

// Input Field Component
function InputField({
  type,
  placeholder,
  value,
  onChange,
  icon,
  suffix,
}: {
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
  suffix?: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2">{icon}</div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-[10px] text-foreground placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
      />
      {suffix && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">{suffix}</div>
      )}
    </div>
  );
}

// Icons
function WarehouseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M9 21v-6h6v6" />
      <path d="M9 9h6" />
      <path d="M9 12h6" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
      <path d="m2 2 20 20" />
    </svg>
  );
}

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}
