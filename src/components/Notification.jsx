export default function Notification({ toast }) {
  return (
    <div
      className={`fixed bottom-8 right-8 px-6 py-4 rounded text-[0.88rem] z-[999]
                  shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-400 pointer-events-none
                  ${toast.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                  ${toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-green text-cream'}`}
    >
      {toast.message}
    </div>
  )
}
