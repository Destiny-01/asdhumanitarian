import { useEffect, useState } from 'react'
import { useNotify } from '../App'
import Footer from '../components/Footer'

const PRESETS = [25, 50, 100, 250, 500]

const IMPACT = [
  '$25 provides school supplies for one child for a full year.',
  '$100 funds a week of clean water for an entire household.',
  '$500 seeds a woman\'s cooperative enterprise with startup capital.',
  '$1,000 equips a classroom with digital tools and solar power.',
]

export default function Donate() {
  const notify = useNotify()
  const [amount, setAmount]   = useState(25)
  const [custom, setCustom]   = useState('')
  const [freq, setFreq]       = useState('one-time')
  const [email, setEmail]     = useState('')
  const [fname, setFname]     = useState('')
  const [lname, setLname]     = useState('')

  useEffect(() => { window.scrollTo(0, 0) }, [])

  function handleDonate() {
    const finalAmount = amount === 'custom' ? parseFloat(custom) : amount
    if (!finalAmount || finalAmount < 1) { notify('Please select or enter a valid amount.', 'error'); return }
    if (!email) { notify('Please enter your email address.', 'error'); return }
    // TODO: Wire up Stripe / Paystack / Flutterwave here
    notify(`🙏 Thank you${fname ? ', ' + fname : ''}! Your ${freq === 'monthly' ? 'monthly ' : ''}$${finalAmount} donation is being processed.`)
  }

  const btnClass = (val) =>
    `py-3.5 border-[1.5px] rounded-sm font-serif text-[1.3rem] font-semibold
     transition-all duration-200 cursor-pointer
     ${amount === val
       ? 'border-green bg-green text-cream'
       : 'border-[rgba(28,28,26,0.15)] bg-transparent text-charcoal hover:border-green hover:bg-green hover:text-cream'}`

  return (
    <div>
      <div className="bg-charcoal pt-[160px] pb-[100px] px-[60px] grid grid-cols-2 gap-[100px] items-center min-h-screen">

        {/* ── Left: Impact ── */}
        <div>
          <div
            className="flex items-center gap-2.5 text-cream/40 text-[0.72rem] tracking-[0.22em] uppercase mb-5"
            style={{ '--tw-content': '' }}
          >
            <span className="block w-8 h-px bg-gold/60" />
            Make a Difference
          </div>
          <h1
            className="font-serif font-light text-cream mb-6"
            style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', lineHeight: 1.08 }}
          >
            Give with<br />
            <em style={{ fontStyle: 'italic', color: '#d4aa55' }}>intention.</em>
          </h1>
          <p className="text-[1rem] text-cream/60 leading-[1.8] mb-9">
            Your donation reaches communities directly. We keep our overhead below 9% —
            because your money should work in the field, not in an office.
          </p>
          <ul className="space-y-0">
            {IMPACT.map(item => (
              <li
                key={item}
                className="flex gap-4 py-3.5 border-b border-white/[0.06] text-cream/70 text-[0.9rem] leading-[1.6]"
              >
                <span className="text-gold text-[0.6rem] mt-1.5 flex-shrink-0">✦</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Right: Form ── */}
        <div className="bg-canvas rounded-md p-12">
          <div className="font-serif text-[2rem] font-semibold text-charcoal mb-8">Your Contribution</div>

          {/* Amount presets */}
          <label className="field-label !mt-0">Select Amount</label>
          <div className="grid grid-cols-3 gap-2.5 mb-4">
            {PRESETS.map(p => (
              <button key={p} className={btnClass(p)} onClick={() => setAmount(p)}>${p}</button>
            ))}
            <button className={btnClass('custom')} onClick={() => setAmount('custom')}>Custom</button>
          </div>

          {amount === 'custom' && (
            <div className="mb-2">
              <label className="field-label">Enter Amount ($)</label>
              <input
                className="field-input"
                type="number"
                min="1"
                placeholder="0.00"
                value={custom}
                onChange={e => setCustom(e.target.value)}
              />
            </div>
          )}

          {/* Frequency */}
          <label className="field-label">Donation Type</label>
          <div className="grid grid-cols-2 gap-2.5">
            {['one-time', 'monthly'].map(f => (
              <button
                key={f}
                onClick={() => setFreq(f)}
                className={`py-3 text-[0.82rem] font-sans tracking-wide border-[1.5px] rounded-sm transition-all duration-200 cursor-pointer capitalize
                  ${freq === f ? 'border-green bg-green text-cream' : 'border-[rgba(28,28,26,0.15)] text-charcoal hover:border-green'}`}
              >
                {f.replace('-', '-')}
              </button>
            ))}
          </div>

          {/* Personal info */}
          <div className="grid grid-cols-2 gap-3 mt-1">
            <div>
              <label className="field-label">First Name</label>
              <input className="field-input" type="text" placeholder="Jane" value={fname} onChange={e => setFname(e.target.value)} />
            </div>
            <div>
              <label className="field-label">Last Name</label>
              <input className="field-input" type="text" placeholder="Doe" value={lname} onChange={e => setLname(e.target.value)} />
            </div>
          </div>

          <label className="field-label">Email</label>
          <input className="field-input" type="email" placeholder="jane@example.com" value={email} onChange={e => setEmail(e.target.value)} />

          {/* Card fields — replace with Stripe Elements or Paystack SDK */}
          <label className="field-label">Card Number</label>
          <input className="field-input" type="text" placeholder="•••• •••• •••• ••••" maxLength={19} />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="field-label">Expiry</label>
              <input className="field-input" type="text" placeholder="MM / YY" />
            </div>
            <div>
              <label className="field-label">CVV</label>
              <input className="field-input" type="text" placeholder="•••" maxLength={4} />
            </div>
          </div>

          <button
            onClick={handleDonate}
            className="w-full mt-7 py-5 bg-gold text-white text-[0.82rem] tracking-[0.14em]
                       uppercase font-medium rounded-sm border-none cursor-pointer
                       transition-all duration-200 hover:opacity-90 hover:-translate-y-px font-sans"
          >
            Complete Donation ✦
          </button>

          <p className="text-center text-[0.74rem] text-muted mt-4 flex items-center justify-center gap-1.5">
            🔒 Secured &amp; Encrypted · Tax receipt sent by email
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
