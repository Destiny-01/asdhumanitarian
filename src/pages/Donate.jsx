import { useEffect, useState } from "react";
import Footer from "../components/Footer";

/* ── Update these details as needed ── */
const PAYPAL_LINK =
  "https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=asdpositiveimpactfoundation@gmail.com&currency_code=USD&source=url";

const UBA_DETAILS = {
  bankName: "UBA — United Bank for Africa",
  accountName: "Afemai Sons and Daughters Initiative",
  accountNumber: "1024241244",
  sortCode: null,
};

const IMPACT = [
  "Every gift goes directly toward orphans, widows, and vulnerable families.",
  "School fees, hospital bills, and emergency rent paid on your behalf.",
  "Feeding programmes that reach hundreds of children every month.",
  "Small business grants that restore dignity and financial independence.",
];

/* ── Copy-to-clipboard hook ── */
function useCopy(timeout = 1800) {
  const [copied, setCopied] = useState(false);
  function copy(text) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    });
  }
  return { copied, copy };
}

/* ── PayPal card ── */
function PayPalCard() {
  return (
    <div className="bg-white/[0.04] border border-white/10 rounded-md p-7 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#003087] flex items-center justify-center flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M7.077 21.316H4.5a.5.5 0 0 1-.494-.584L6.68 3.27A.625.625 0 0 1 7.3 2.75h6.494c2.784 0 4.8 1.923 4.472 4.687-.546 4.614-3.81 5.657-6.894 5.657H9.01L7.077 21.316Zm3.46-10.222h1.837c1.688 0 3.133-.602 3.416-2.979.194-1.632-.793-2.615-2.515-2.615H10.28L9.043 11.094h1.494Z" />
          </svg>
        </div>
        <div>
          <div className="text-[0.65rem] tracking-[0.2em] uppercase text-gold/80 mb-0.5">
            International
          </div>
          <div className="text-cream font-semibold text-[1.05rem]">
            Donate via PayPal
          </div>
        </div>
      </div>

      <p className="text-cream/50 text-[0.87rem] leading-[1.7]">
        Donate securely in any currency. Accepts all major cards — no PayPal
        account required.
      </p>

      <a
        href={PAYPAL_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-4 rounded-sm text-center text-[0.8rem] tracking-[0.14em] uppercase
                   font-semibold bg-[#0070ba] text-white hover:bg-[#003087] transition-colors duration-200"
      >
        Give via PayPal →
      </a>
    </div>
  );
}

/* ── UBA Bank Transfer card ── */
function BankCard() {
  const { copied, copy } = useCopy();

  const rows = [
    { label: "Bank", value: UBA_DETAILS.bankName },
    { label: "Account Name", value: UBA_DETAILS.accountName },
    {
      label: "Account Number",
      value: UBA_DETAILS.accountNumber,
      copyable: true,
    },
    ...(UBA_DETAILS.sortCode
      ? [{ label: "Sort Code", value: UBA_DETAILS.sortCode }]
      : []),
  ];

  return (
    <div className="bg-white/[0.04] border border-white/10 rounded-md p-7 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-[0.75rem] tracking-tight">
            UBA
          </span>
        </div>
        <div>
          <div className="text-[0.65rem] tracking-[0.2em] uppercase text-gold/80 mb-0.5">
            Nigeria · Naira
          </div>
          <div className="text-cream font-semibold text-[1.05rem]">
            Bank Transfer
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="divide-y divide-white/[0.07]">
        {rows.map(({ label, value, copyable }) => (
          <div
            key={label}
            className="flex items-center justify-between gap-4 py-3.5"
          >
            <div>
              <div className="text-[0.63rem] tracking-[0.18em] uppercase text-cream/35 mb-0.5">
                {label}
              </div>
              <div className="text-cream/90 text-[0.93rem] font-medium">
                {value}
              </div>
            </div>
            {copyable && (
              <button
                onClick={() => copy(value)}
                className={`flex-shrink-0 flex items-center gap-1.5 text-[0.68rem] tracking-[0.1em]
                            uppercase px-3 py-1.5 rounded-sm border transition-all duration-200
                            ${
                              copied
                                ? "border-green bg-green/10 text-green"
                                : "border-white/20 text-cream/50 hover:border-cream/40 hover:text-cream"
                            }`}
                aria-label="Copy account number"
              >
                {copied ? (
                  <>
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 6l3 3 5-5" />
                    </svg>
                    Copied
                  </>
                ) : (
                  <>
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="4" y="4" width="7" height="7" rx="1" />
                      <path d="M8 4V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            )}
          </div>
        ))}
      </div>

      <p className="text-cream/35 text-[0.78rem] leading-[1.65] border-t border-white/[0.07] pt-4">
        After transferring, please send your name and receipt to{" "}
        <a
          href="mailto:asdpositiveimpactfoundation@gmail.com"
          className="text-gold/70 underline underline-offset-2 hover:text-gold transition-colors"
        >
          asdpositiveimpactfoundation@gmail.com
        </a>{" "}
        so we can acknowledge your gift.
      </p>
    </div>
  );
}

/* ── Page ── */
export default function Donate() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* HERO */}
      <div
        className="bg-charcoal pt-[140px] pb-[80px] px-6 md:px-10 lg:px-[60px]
                      grid lg:grid-cols-2 gap-12 lg:gap-[100px] items-center min-h-screen"
      >
        {/* LEFT — copy */}
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
            {IMPACT.map((item) => (
              <li
                key={item}
                className="flex gap-4 py-3.5 border-b border-white/[0.06] text-cream/70 text-[0.9rem] leading-[1.6]"
              >
                <span className="text-gold text-[0.6rem] mt-1.5 flex-shrink-0">
                  ✦
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT — payment methods */}
        <div className="flex flex-col gap-5">
          <div className="text-[0.65rem] tracking-[0.2em] uppercase text-cream/30 mb-1">
            Choose how to give
          </div>
          <PayPalCard />
          <BankCard />
        </div>
      </div>

      <Footer />
    </div>
  );
}
