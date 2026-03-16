import { useEffect, useRef, useState } from "react";
import { useNotify } from "../App";
import Footer from "../components/Footer";
import confetti from "canvas-confetti";

const CURRENCY_CONFIG = {
  USD: {
    symbol: "$",
    label: "USD",
    min: 1,
    presets: [25, 50, 100, 250, 500],
    paystackCurrency: "USD",
    impact: [
      "$25 provides school supplies for one child for a full year.",
      "$50 feeds an orphan for an entire month.",
      "$100 funds a week of clean water for an entire household.",
      "$500 seeds a woman's cooperative enterprise with startup capital.",
    ],
  },
  NGN: {
    symbol: "₦",
    label: "NGN",
    min: 1000,
    presets: [5000, 10000, 25000, 50000, 100000],
    paystackCurrency: "NGN",
    impact: [
      "₦5,000 provides school supplies for one child for a full year.",
      "₦10,000 feeds an orphan for an entire month.",
      "₦25,000 funds a week of clean water for an entire household.",
      "₦100,000 seeds a woman's cooperative enterprise with startup capital.",
    ],
  },
};

function DonationSuccessModal({ fname, amount, symbol, reference, onClose }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const fire = confetti.create(canvas, { resize: true, useWorker: true });

    const colors = ["#b8943a", "#2d5a3d", "#f5f0e8", "#ffffff", "#d4aa55"];

    fire({ particleCount: 80, spread: 60, origin: { x: 0.3, y: 0.6 }, colors });
    fire({ particleCount: 80, spread: 60, origin: { x: 0.7, y: 0.6 }, colors });

    const t1 = setTimeout(
      () =>
        fire({
          particleCount: 50,
          spread: 100,
          origin: { x: 0.5, y: 0.4 },
          colors,
        }),
      350,
    );
    const t2 = setTimeout(() => {
      fire({
        particleCount: 40,
        spread: 55,
        origin: { x: 0.2, y: 0.5 },
        colors,
      });
      fire({
        particleCount: 40,
        spread: 55,
        origin: { x: 0.8, y: 0.5 },
        colors,
      });
    }, 700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50"
      onClick={onClose}
    >
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-50"
      />

      <div
        className="relative z-[60] bg-canvas rounded-lg w-[90vw] max-w-md p-8 sm:p-10 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gold ring icon */}
        <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center">
          <span className="text-2xl">✦</span>
        </div>

        <p className="text-[0.7rem] tracking-[0.22em] uppercase text-gold mb-2">
          Donation Confirmed
        </p>

        <h2 className="font-serif text-[1.9rem] font-semibold text-charcoal leading-snug mb-3">
          Thank you,
          <br />
          {fname}!
        </h2>

        <p className="text-[0.95rem] text-muted leading-[1.8] mb-6">
          Your donation of{" "}
          <span className="font-semibold text-charcoal">
            {symbol}
            {Number(amount).toLocaleString()}
          </span>{" "}
          is already making a difference. A receipt has been sent to your email.
        </p>

        <p className="text-[0.75rem] text-muted/60 font-mono mb-7">
          Ref: {reference}
        </p>

        <button
          onClick={onClose}
          className="w-full py-4 bg-green text-cream text-[0.82rem] tracking-[0.14em] uppercase font-semibold rounded-sm hover:opacity-90 transition-opacity"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function Donate() {
  const notify = useNotify();

  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState(25);
  const [custom, setCustom] = useState("");
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const config = CURRENCY_CONFIG[currency];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Reset amount when currency changes so no stale preset is shown
  const handleCurrencyChange = (cur) => {
    setCurrency(cur);
    setAmount(CURRENCY_CONFIG[cur].presets[0]);
    setCustom("");
  };

  function handleDonate() {
    const finalAmount = amount === "custom" ? parseFloat(custom) : amount;

    if (!fname.trim()) {
      notify("Please enter your first name.", "error");
      return;
    }
    if (!lname.trim()) {
      notify("Please enter your last name.", "error");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      notify("Please enter a valid email address.", "error");
      return;
    }
    if (!finalAmount || isNaN(finalAmount) || finalAmount < config.min) {
      notify(
        `Minimum donation is ${config.symbol}${config.min.toLocaleString()}.`,
        "error",
      );
      return;
    }

    if (!window.PaystackPop) {
      console.error("[Donate] PaystackPop not available on window.");
      notify(
        "Payment provider failed to load. Please refresh and try again.",
        "error",
      );
      return;
    }

    const ref = `ASD-${Date.now()}`;
    console.info("[Donate] Initiating payment", {
      ref,
      finalAmount,
      currency,
      email,
    });

    setLoading(true);

    try {
      const handler = window.PaystackPop.setup({
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        email,
        amount: finalAmount * 100,
        currency: config.paystackCurrency,
        ref,
        metadata: {
          custom_fields: [
            {
              display_name: "Full Name",
              variable_name: "full_name",
              value: `${fname} ${lname}`,
            },
            {
              display_name: "Currency",
              variable_name: "currency",
              value: currency,
            },
          ],
        },
        callback: (response) => {
          setLoading(false);
          console.info("[Donate] Payment successful", response);
          setSuccessData({
            fname,
            amount: finalAmount,
            symbol: config.symbol,
            reference: response.reference,
          });
        },
        onClose: () => {
          setLoading(false);
          console.info("[Donate] Payment modal closed by user.");
          notify("Payment was cancelled.", "error");
        },
      });

      handler.openIframe();
    } catch (err) {
      setLoading(false);
      console.error("[Donate] PaystackPop.setup threw an error:", err);
      notify(
        "Something went wrong initiating payment. Please try again.",
        "error",
      );
    }
  }

  const btnClass = (val) =>
    `py-3.5 border-[1.5px] rounded-sm font-serif text-[1.3rem] font-semibold
     transition-all duration-200 cursor-pointer
     ${
       amount === val
         ? "border-green bg-green text-cream"
         : "border-[rgba(28,28,26,0.15)] bg-transparent text-charcoal hover:border-green hover:bg-green hover:text-cream"
     }`;

  return (
    <div>
      {successData && (
        <DonationSuccessModal
          {...successData}
          onClose={() => setSuccessData(null)}
        />
      )}

      {/* HERO SECTION */}
      <div className="bg-charcoal pt-[140px] pb-[80px] px-6 md:px-10 lg:px-[60px] grid lg:grid-cols-2 gap-12 lg:gap-[100px] items-center min-h-screen">
        {/* LEFT */}
        <div>
          <div className="flex items-center gap-2.5 text-cream/40 text-[0.72rem] tracking-[0.22em] uppercase mb-5">
            <span className="block w-8 h-px bg-gold/60" />
            Make a Difference
          </div>

          <h1
            className="font-serif font-light text-cream mb-6"
            style={{ fontSize: "clamp(2.5rem,5vw,5rem)", lineHeight: 1.08 }}
          >
            Give with
            <br />
            <em style={{ fontStyle: "italic", color: "#d4aa55" }}>
              intention.
            </em>
          </h1>

          <p className="text-[1rem] text-cream/60 leading-[1.8] mb-9 max-w-[520px]">
            Every contribution goes directly toward orphans, widows, and
            vulnerable families across our communities. No cause is too small —
            your generosity is what keeps this mission alive.
          </p>

          <ul>
            {config.impact.map((item) => (
              <li
                key={item}
                className="flex gap-4 py-3.5 border-b border-white/[0.06] text-cream/70 text-[0.9rem] leading-[1.6]"
              >
                <span className="text-gold text-[0.6rem] mt-1.5">✦</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* FORM */}
        <div className="bg-canvas rounded-md p-6 sm:p-8 lg:p-12">
          <div className="font-serif text-[2rem] font-semibold text-charcoal mb-8">
            Your Contribution
          </div>

          {/* Currency toggle */}
          <label className="field-label !mt-0">Currency</label>
          <div className="grid grid-cols-2 gap-2.5 mb-5">
            {["USD", "NGN"].map((cur) => (
              <button
                key={cur}
                onClick={() => handleCurrencyChange(cur)}
                className={`py-3 text-[0.82rem] font-sans tracking-widest border-[1.5px] rounded-sm uppercase font-semibold transition-all duration-200
                  ${
                    currency === cur
                      ? "border-green bg-green text-cream"
                      : "border-[rgba(28,28,26,0.15)] text-charcoal hover:border-green hover:bg-green hover:text-cream"
                  }`}
              >
                {cur === "USD" ? "🇺🇸 USD" : "🇳🇬 NGN"}
              </button>
            ))}
          </div>

          <label className="field-label">Select Amount</label>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4">
            {config.presets.map((p) => (
              <button
                key={p}
                className={btnClass(p)}
                onClick={() => setAmount(p)}
              >
                {config.symbol}
                {p.toLocaleString()}
              </button>
            ))}

            <button
              className={btnClass("custom")}
              onClick={() => setAmount("custom")}
            >
              Custom
            </button>
          </div>

          {amount === "custom" && (
            <div>
              <label className="field-label">
                Enter Amount ({config.symbol})
              </label>
              <input
                className="field-input"
                type="number"
                min={config.min}
                placeholder="0.00"
                value={custom}
                step={500}
                onChange={(e) => setCustom(e.target.value)}
              />
              <p className="text-[0.76rem] text-muted/60 mt-1.5">
                Minimum: {config.symbol}
                {config.min.toLocaleString()}
              </p>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-3 mt-2">
            <div>
              <label className="field-label">First Name</label>
              <input
                className="field-input"
                type="text"
                placeholder="Jane"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
            </div>

            <div>
              <label className="field-label">Last Name</label>
              <input
                className="field-input"
                type="text"
                placeholder="Doe"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </div>
          </div>

          <label className="field-label">Email</label>
          <input
            className="field-input"
            type="email"
            placeholder="jane@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={handleDonate}
            disabled={loading}
            className={`w-full mt-7 py-5 text-white text-[0.82rem]
            tracking-[0.14em] uppercase rounded-sm transition-opacity
            ${loading ? "bg-gold/50 cursor-not-allowed" : "bg-gold hover:opacity-90"}`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Opening payment…
              </span>
            ) : (
              "Complete Donation ✦"
            )}
          </button>

          <p className="text-center text-[0.74rem] text-muted mt-4">
            🔒 Secured & Encrypted · Tax receipt sent by email
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
