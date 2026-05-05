import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import './App.css'

const EJS_SVC  = 'service_pj3hlus'
const EJS_TPL  = 'template_bk7q5fn'
const EJS_TPL_CAB = 'template_chb30qm'
const EJS_TPL_DLX = 'template_chb30qm'
const EJS_KEY  = 'gvdK0ZhnbvKEAa6x5'

function validateForm({ name, phone, email, consent }) {
  if (!name || name.trim().length < 2) return 'Please enter your full name (at least 2 characters).'
  if (!phone || !/^[6-9]\d{9}$/.test(phone.replace(/[\s\-+]/g, ''))) return 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.'
  if (email && email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Please enter a valid email address.'
  if (consent === false) return 'Please agree to the terms before submitting.'
  return null
}

function sendEnquiry({ title, name, phone, email, date, interested_in, message }) {
  return emailjs.send(
    EJS_SVC,
    EJS_TPL,
    {
      title:         title || 'Website Enquiry',
      name:          name || 'Not provided',
      phone:         phone || 'Not provided',
      email:         email || 'Not provided',
      date:          date || 'Not specified',
      interested_in: interested_in || 'Not specified',
      message:       message || '',
      time:          new Date().toLocaleString(),
    },
    EJS_KEY
  )
}

const NAV = ['Home', 'Properties', 'Amenities', 'About us', 'Contact']

const SLIDES = [
  {
    img: '/entrance-lobby.png',
    tag: 'New Launch · North Bengaluru',
    sub: 'Premium 2 & 3 BHK residences across 10 acres with world-class amenities.',
  },
  {
    img: '/entrance-cam.png',
    tag: 'Limited Units · Book Now',
    sub: 'Experience resort-style living with a 29,000 sq.ft clubhouse, 12 towers and unmatched connectivity.',
  },
  {
    img: '/bans1.png',
    tag: 'Prices Starting ₹1.5 Cr',
    sub: 'SH 104, Sathanur — 20 mins from Airport & Manyata Tech Park. Your luxury home awaits.',
  },
]

const PROPS = [
  {
    title: 'TVS Emerald Altura',
    loc: 'SH 104, Sathanur, North Bengaluru',
    price: '₹1.5 Cr – ₹2.5 Cr',
    tag: 'New Launch',
    beds: '2 & 3 BHK',
    area: '1100–2123 sq.ft',
    img: '/entrance-lobby.png',
    tagline: 'Premium living in the fast-developing corridor of North Bengaluru',
    // rera: 'PRM/KA/RERA/1251/309/PR/040426/008572',
    desc: 'Premium residential development in the fast-developing corridor of North Bengaluru. 12 towers, 975 units across 10.06 acres with world-class amenities.',
    specs: [
      { label: 'Total Area',  value: '10.06 Acres' },
      { label: 'Towers',      value: '12' },
      { label: 'Total Units', value: '975' },
      { label: 'Structure',   value: '2B + G + 12 Floors' },
      { label: 'Clubhouse',   value: '29,000+ sq.ft' },
    ],
    typologies: [
      { type: '2 BHK',                   area: '1100 – 1200 sq.ft' },
      { type: '3 BHK (2 Toilets)',        area: '1510 – 1588 sq.ft' },
      { type: '3 BHK (3 Toilets)',        area: '1898 sq.ft' },
      { type: '3 BHK + Servant Quarter', area: '2123 sq.ft' },
    ],
    amenities: ['2 Clubhouses','2 Gyms','2 Swimming Pools','Sky Cinema','Café & Social Spaces','Landscaped Gardens','In-Campus Temple','Man-made Water Body','2 Acres Greenery'],
    connectivity: [
      { place: 'Bagalur Metro Station', time: '7 mins' },
      { place: 'KIADB',                 time: '10 mins' },
      { place: 'Bhartiya City',         time: '7 mins' },
      { place: 'Delhi Public School',   time: '5 mins' },
      { place: 'Yelahanka Railway',     time: '12 mins' },
      { place: 'Manyata Tech Park',     time: '20 mins' },
      { place: 'Kempegowda Airport',    time: '20 mins' },
    ],
    mapUrl: 'https://maps.app.goo.gl/UhEXsGgDRg5KCCzT8',
    pdfs: [
      { label: 'Brochure',    file: '/src/assets/Welcome-to-TVS-Emerald-Altura-Modern-Living-in-North-Bangalore.pdf' },
      { label: 'Floor Plans', file: '/src/assets/AL Floor Plans - UR - High Res.pdf' },
      { label: 'Location',    file: '/src/assets/Sathanur location carosuel.pdf' },
      { label: 'VP Deck',     file: '/src/assets/Sathanur VP Deck (1).pdf' },
    ],
  },
]

const GALLERY = [
  { img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85', label: 'Living Spaces',    cls: 'g-tall' },
  { img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=700&q=85',    label: 'Modern Kitchens',  cls: '' },
  { img: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=700&q=85',    label: 'Master Suites',    cls: '' },
  { img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=85', label: 'Private Pools',    cls: 'g-wide' },
  { img: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=700&q=85', label: 'Rooftop Views',    cls: '' },
  { img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=700&q=85', label: 'Premium Interiors',cls: '' },
]

const TESTIMONIALS = [
  { q: 'TVS Emerald Altura turned our dream of a luxury villa into reality. Their team was professional, knowledgeable, and always went the extra mile for us.', name: 'Rahul & Sneha Sharma', role: 'Villa Owner, Baner', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', prop: 'Royal Skyline Villa', rating: 5 },
  { q: 'From site visit to registration, they handled everything seamlessly. We got our dream 3BHK well within budget. Absolutely stress-free experience!', name: 'Vikram Kulkarni', role: '3BHK Owner, Wakad', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', prop: 'Emerald Heights', rating: 5 },
  { q: 'Their investment advisory is outstanding. 40% ROI on my Hinjewadi property in just 3 years. TVS Emerald Altura is my first and only call for real estate.', name: 'Amit Desai', role: 'Investor, Hinjewadi', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80', prop: 'Urban Crest', rating: 5 },
  { q: 'I was skeptical at first but the team guided me at every step. Found my dream home in just 2 visits. Transparency and trust — that is TVS Emerald Altura.', name: 'Priya Mehta', role: 'Homeowner, Kharadi', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80', prop: 'Sapphire Towers', rating: 5 },
]

function useOnScreen(threshold = 0.12) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect() } }, { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, vis]
}

function Fade({ children, d = 0, className = '' }) {
  const [ref, vis] = useOnScreen()
  return (
    <div ref={ref} className={`fd ${vis ? 'fd--in' : ''} ${className}`} style={{ transitionDelay: `${d}ms` }}>
      {children}
    </div>
  )
}

function Count({ to, suffix = '' }) {
  const [val, setVal] = useState(0)
  const [ref, vis] = useOnScreen(0.5)
  useEffect(() => {
    if (!vis) return
    let cur = 0; const step = Math.ceil(to / 60)
    const id = setInterval(() => { cur += step; if (cur >= to) { setVal(to); clearInterval(id) } else setVal(cur) }, 20)
    return () => clearInterval(id)
  }, [vis, to])
  return <span ref={ref}>{val}{suffix}</span>
}

/* ─── Property Detail Modal ─── */
function PropModal({ prop, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const esc = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', esc)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', esc) }
  }, [onClose])

  if (!prop) return null
  return (
    <div className="pmod__backdrop" onClick={onClose}>
      <div className="pmod" onClick={e => e.stopPropagation()}>
        <button className="pmod__close" onClick={onClose} aria-label="Close">✕</button>

        {/* hero image */}
        <div className="pmod__hero">
          <img src={prop.img} alt={prop.title}/>
          <div className="pmod__hero-overlay">
            <span className="pmod__tag">{prop.tag}</span>
            <div>
              <h2 className="pmod__title">{prop.title}</h2>
              <p className="pmod__loc"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display:'inline',verticalAlign:'middle',marginRight:4}}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> {prop.loc}</p>
            </div>
          </div>
        </div>

        <div className="pmod__body">

          {/* left col */}
          <div className="pmod__left">
            {prop.desc && <p className="pmod__desc">{prop.desc}</p>}

            {prop.rera && (
              <div className="pmod__rera">RERA: <strong>{prop.rera}</strong></div>
            )}

            {/* specs grid */}
            {prop.specs && (
              <div className="pmod__section">
                <h3 className="pmod__sec-title">Project Overview</h3>
                <div className="pmod__specs">
                  {prop.specs.map((s,i) => (
                    <div key={i} className="pmod__spec">
                      <span>{s.label}</span><strong>{s.value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* typologies */}
            {prop.typologies && (
              <div className="pmod__section">
                <h3 className="pmod__sec-title">Unit Typologies</h3>
                <div className="pmod__types">
                  {prop.typologies.map((t,i) => (
                    <div key={i} className="pmod__type">
                      <strong>{t.type}</strong><span>{t.area}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* amenities */}
            {prop.amenities && (
              <div className="pmod__section">
                <h3 className="pmod__sec-title">Premium Amenities</h3>
                <div className="pmod__amenities">
                  {prop.amenities.map((a,i) => (
                    <span key={i} className="pmod__amenity">✓ {a}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* right col */}
          <div className="pmod__right">

            {/* connectivity */}
            {prop.connectivity && (
              <div className="pmod__section">
                <h3 className="pmod__sec-title">Connectivity</h3>
                <div className="pmod__conn">
                  {prop.connectivity.map((c,i) => (
                    <div key={i} className="pmod__conn-row">
                      <span>{c.place}</span>
                      <strong>{c.time}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* map link */}
            {prop.mapUrl && (
              <a href={prop.mapUrl} target="_blank" rel="noreferrer" className="pmod__map-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display:'inline',verticalAlign:'middle',marginRight:4}}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> View on Google Maps →
              </a>
            )}

            {/* PDF downloads */}
            {prop.pdfs && (
              <div className="pmod__section">
                <h3 className="pmod__sec-title">Downloads</h3>
                <div className="pmod__pdfs">
                  {prop.pdfs.map((p,i) => (
                    <a key={i} href={p.file} target="_blank" rel="noreferrer" className="pmod__pdf">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
                      {p.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <a href="#contact" className="pmod__cta" onClick={onClose}>
              Enquire Now →
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}

/* ─── Properties: sticky scroll — index-based crossfade, no clip-path glitch ─── */
function PropertiesSection() {
  const sectionRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [progress,  setProgress]  = useState(0)
  const [prevIdx,   setPrevIdx]   = useState(null)
  const [modalProp, setModalProp] = useState(null)

  const scrollTo = (i) => {
    const el = sectionRef.current; if (!el) return
    const total = el.offsetHeight - window.innerHeight
    window.scrollTo({ top: el.offsetTop + (i / PROPS.length) * total + 10, behavior: 'smooth' })
  }

  useEffect(() => {
    let raf = null
    const fn = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = null
        const el = sectionRef.current; if (!el) return
        const total    = el.offsetHeight - window.innerHeight
        const scrolled = Math.max(0, -el.getBoundingClientRect().top)
        const pct      = Math.min(1, Math.max(0, scrolled / total))
        const idx      = Math.min(PROPS.length - 1, Math.floor(pct * PROPS.length))

        setProgress(pct)
        setActiveIdx(prev => {
          if (prev !== idx) setPrevIdx(prev)
          return idx
        })
      })
    }
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => { window.removeEventListener('scroll', fn); if (raf) cancelAnimationFrame(raf) }
  }, [])

  const arcLen  = 2 * Math.PI * 72
  const arcOff  = arcLen * (1 - progress)

  return (
    <>
    <section id="properties" className="props" ref={sectionRef}>
      <div className="props__sticky-viewport">

        {/* ── LEFT panel ── */}
        <div className="props__left">
          <div className="props__eyebrow">
            <span className="props__eyebrow-line" />
            Our Projects
          </div>

          <h2 className="props__big-title">
            Discover <em className="props__title-em">Exceptional</em><br />
            Properties
          </h2>

          {/* text slides — each property's info stacked, active one visible */}
          <div className="props__info-stack">
            {PROPS.map((item, i) => (
              <div key={i} className={`props__info-slide ${i === activeIdx ? 'props__info-slide--in' : i === prevIdx ? 'props__info-slide--out' : ''}`}>
                <p className="props__left-sub">{item.tag} · {item.loc}</p>
                <div className="props__left-price">{item.price}</div>
                <div className="props__left-meta">
                  <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display:'inline',verticalAlign:'middle',marginRight:3}}><path d="M2 4v16"/><path d="M22 4v16"/><path d="M2 8h20"/><path d="M2 12h20"/><path d="M2 16h20"/><path d="M6 8v8"/><path d="M18 8v8"/></svg> {item.beds}</span>
                  <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display:'inline',verticalAlign:'middle',marginRight:3}}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg> {item.area}</span>
                </div>
                <a href="#contact" className="props__sticky-btn">Enquire Now →</a>
              </div>
            ))}
          </div>

          {/* circular progress wheel */}
          <div className="props__wheel">
            <svg viewBox="0 0 180 180" fill="none">
              <circle cx="90" cy="90" r="72" stroke="#ebebeb" strokeWidth="1.5"/>
              <circle cx="90" cy="90" r="72"
                stroke="url(#wGold)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={arcLen}
                strokeDashoffset={arcOff}
                transform="rotate(-90 90 90)"
                style={{ transition: 'stroke-dashoffset .2s linear' }}
              />
              <defs>
                <linearGradient id="wGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f0d080"/>
                  <stop offset="100%" stopColor="#b8920a"/>
                </linearGradient>
              </defs>
              {PROPS.map((_, i) => {
                const a = (i / PROPS.length) * 2 * Math.PI - Math.PI / 2
                const x = 90 + 72 * Math.cos(a)
                const y = 90 + 72 * Math.sin(a)
                const isAct = i === activeIdx
                return (
                  <g key={i} onClick={() => scrollTo(i)} style={{ cursor: 'pointer' }}>
                    <circle cx={x} cy={y} r={isAct ? 9 : 5}
                      fill={isAct ? '#c9a84c' : '#ddd'}
                      style={{ transition: 'all .3s ease' }}
                    />
                    {isAct && (
                      <circle cx={x} cy={y} r="14"
                        fill="none" stroke="#c9a84c" strokeWidth="1.5" opacity="0.35"
                      />
                    )}
                  </g>
                )
              })}
            </svg>
            <div className="props__wheel-c">
              <span className="props__wheel-n">0{activeIdx + 1}</span>
              <span className="props__wheel-d" />
              <span className="props__wheel-t">0{PROPS.length}</span>
            </div>
          </div>

          <div className="props__dot-nav">
            {PROPS.map((_, i) => (
              <button key={i}
                className={`props__dot-btn ${i === activeIdx ? 'props__dot-btn--on' : ''}`}
                onClick={() => scrollTo(i)}
                aria-label={`Property ${i + 1}`}
              />
            ))}
          </div>

          <a href="#contact" className="btn-gold props__view-all">View All Properties</a>
        </div>

        {/* ── RIGHT: image crossfade stack ── */}
        <div className="props__right">
          <div className="props__card">
            <div className="props__card-img-wrap">
              {PROPS.map((item, i) => (
                <div key={i} className={`props__img-layer ${i === activeIdx ? 'props__img-layer--in' : ''}`}>
                  <img src={item.img} alt={item.title} />
                </div>
              ))}
              <span className="props__card-tag">{PROPS[activeIdx].tag}</span>
            </div>

            <div className="props__card-body">
              <div className="props__card-titles">
                {PROPS.map((item, i) => (
                  <h3 key={i} className={`props__card-title ${i === activeIdx ? 'props__card-title--in' : ''}`}>
                    {item.title}
                  </h3>
                ))}
              </div>
              <div className="props__card-foot">
                {PROPS.map((item, i) => (
                  <strong key={i} className={`props__card-price ${i === activeIdx ? 'props__card-price--in' : ''}`}>
                    {item.price}
                  </strong>
                ))}
                <button className="props__card-cta" onClick={() => setModalProp(PROPS[activeIdx])}>View Details →</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
    {modalProp && <PropModal prop={modalProp} onClose={() => setModalProp(null)} />}
    </>
  )
}

/* ── Services Section — sidebar + image + detail ── */
const SERVICES = [
  {
    num:'01', icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>, title:'Verified Project Details', sub:'Accurate & Transparent',
    desc:'We share relevant project information so you can make an informed enquiry. Every detail about TVS Emerald Altura — from RERA registration to floor plans — is clearly presented.',
    tags:['RERA Verified','Accurate Info','Floor Plans','Clear Pricing'],
    img:'/entrance-lobby.png',
  },
  {
    num:'02', icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, title:'Site Visit Assistance',   sub:'At Your Convenience',
    desc:'Our team helps you schedule a site visit at your convenience. We coordinate with the project team and ensure your visit is smooth, informative and worth your time.',
    tags:['Flexible Scheduling','Expert Guidance','Property Tour','No Obligation'],
    img:'/entrance-cam.png',
  },
  {
    num:'03', icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>, title:'Personalized Guidance',  sub:'Tailored to Your Needs',
    desc:'We understand your budget, location preference, and family needs before suggesting property options. No generic responses — just relevant, focused advice for your situation.',
    tags:['Budget Planning','Family Needs','Location Match','Custom Advice'],
    img:'/club-cam.png',
  },
  {
    num:'04', icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41a2 2 0 0 1 1.81-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, title:'Smooth Enquiry Support', sub:'From First Call to Site Visit',
    desc:'From first call to site visit planning, we help you move forward without confusion. For serious buyers searching for luxury apartments in Bangalore, TVS Emerald Altura helps you take the next step quickly and confidently.',
    tags:['Quick Response','Clear Process','Buyer Focused','No Confusion'],
    img:'/elevation-landscape-cam.png',
  },
]

function ServiceSection() {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)

  const select = (i) => {
    if (i === active) return
    setAnimating(true)
    setTimeout(() => { setActive(i); setAnimating(false) }, 320)
  }

  const s = SERVICES[active]

  return (
    <section id="services" className="svcs">

      {/* top header */}
      <div className="ctr svcs__head">
        <div className="svcs__head-left">
          <span className="svcs__eyebrow">— Why Choose Us</span>
          <h2 className="svcs__h2">Why Choose <em className="svcs__h2-em">TVS Emerald Altura</em></h2>
        </div>
        <p className="svcs__head-desc">
          Choosing the right real estate partner can save your time and help you make a confident decision. TVS Emerald Altura supports you with clear communication and buyer focused assistance.
        </p>
      </div>

      {/* main layout: sidebar | image | detail */}
      <div className="svcs__layout">

        {/* LEFT — numbered sidebar list */}
        <div className="svcs__sidebar">
          {SERVICES.map((item, i) => (
            <button
              key={i}
              className={`svcs__tab ${i === active ? 'svcs__tab--on' : ''}`}
              onClick={() => select(i)}
            >
              <span className="svcs__tab-num">0{i+1}</span>
              <div className="svcs__tab-icon">{item.icon}</div>
              <div className="svcs__tab-text">
                <strong>{item.title}</strong>
                <span>{item.sub}</span>
              </div>
              <svg className="svcs__tab-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          ))}
        </div>

        {/* CENTER — large image */}
        <div className={`svcs__img-wrap ${animating ? 'svcs__img-wrap--out' : ''}`}>
          <img src={s.img} alt={s.title} className="svcs__img" />
          <div className="svcs__img-overlay" />
          <div className="svcs__img-counter">
            <span>0{active+1}</span>
            <span className="svcs__img-counter-sep"> / 0{SERVICES.length}</span>
          </div>
        </div>

        {/* RIGHT — detail panel */}
        <div className={`svcs__detail ${animating ? 'svcs__detail--out' : ''}`}>
          <span className="svcs__detail-tag">{s.sub}</span>
          <h3 className="svcs__detail-title">{s.title}</h3>
          <p className="svcs__detail-desc">{s.desc}</p>
          <div className="svcs__detail-tags">
            {s.tags.map(t => (
              <span key={t} className="svcs__detail-pill">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                {t}
              </span>
            ))}
          </div>
          <div className="svcs__detail-btns">
          </div>
          {/* slide nav dots */}
          <div className="svcs__detail-dots">
            {SERVICES.map((_, i) => (
              <button key={i} className={`svcs__ddot ${i === active ? 'svcs__ddot--on' : ''}`} onClick={() => select(i)} aria-label={`Service ${i+1}`}/>
            ))}
            <button className="svcs__darr" onClick={() => select((active-1+SERVICES.length)%SERVICES.length)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button className="svcs__darr" onClick={() => select((active+1)%SERVICES.length)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}

/* ══ Lens Zoom → Why Choose Us Reveal ══════════════ */
const WHY_POINTS = [
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>, title: 'Verified Project Details',  desc: 'We share relevant project information so you can make an informed enquiry.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, title: 'Site Visit Assistance',     desc: 'Our team helps you schedule a site visit at your convenience.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>, title: 'Personalized Guidance',     desc: 'We understand your budget, location preference, and family needs before suggesting property options.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41a2 2 0 0 1 1.81-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, title: 'Smooth Enquiry Support',    desc: 'From first call to site visit planning, we help you move forward without confusion.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, title: 'Luxury Apartments',         desc: 'For serious buyers searching for luxury apartments in Bangalore, TVS Emerald Altura helps you take the next step quickly and confidently.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: 'Buyer Focused Assistance',  desc: 'Choosing the right real estate partner can save your time and help you make a confident decision.' },
]

function LensSection() {
  const sectionRef = useRef(null)
  const [p, setP]  = useState(0)

  useEffect(() => {
    let raf = null
    const fn = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = null
        const el = sectionRef.current; if (!el) return
        const total   = el.offsetHeight - window.innerHeight
        const scrolled = Math.max(0, -el.getBoundingClientRect().top)
        setP(Math.min(1, scrolled / total))
      })
    }
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => { window.removeEventListener('scroll', fn); if (raf) cancelAnimationFrame(raf) }
  }, [])

  // Phase 1 (0→0.45): lens sits on left, right content slides in
  // Phase 2 (0.45→1): lens expands to fill screen, why-us grid appears
  const ph1 = Math.min(1, p / 0.45)
  const ph2 = Math.max(0, (p - 0.45) / 0.55)

  // Lens circle: grows from 300px to cover full screen
  const lensR   = 150 + ph1 * 30                     // radius px during ph1
  const expandR = ph2 * (typeof window !== 'undefined' ? Math.hypot(window.innerWidth, window.innerHeight) : 1500)
  const totalR  = ph2 > 0 ? expandR : lensR

  // Lens anchor: left-center → true center
  const lensX = 22 + ph2 * 28   // % — moves from 22% to 50%
  const lensY = 50

  // Right content: fades IN with ph1, fades OUT immediately when ph2 starts
  const rightOp = Math.min(ph1, Math.max(0, 1 - ph2 * 6))
  const rightX  = (1 - ph1) * 72

  // Full-screen grid: only starts appearing after right panel is fully gone
  const gridOp = Math.min(1, Math.max(0, (ph2 - 0.25) / 0.75))

  return (
    <section className="ls" ref={sectionRef}>
      <div className="ls__view">

        {/* 1 — dark base layer */}
        <div className="ls__base" />

        {/* 2 — full-width luxury bg revealed by expanding circle */}
        <div
          className="ls__reveal-bg"
          style={{
            clipPath:       `circle(${totalR}px at ${lensX}% ${lensY}%)`,
            WebkitClipPath: `circle(${totalR}px at ${lensX}% ${lensY}%)`,
          }}
        />

        {/* 3 — dark tint over revealed bg so text is readable */}
        <div
          className="ls__reveal-tint"
          style={{ opacity: Math.min(1, ph2 * 1.6) }}
        />

        {/* 4 — LEFT: about-02.png magnifying glass image, full quality */}
        <div
          className="ls__left"
          style={{
            opacity:   Math.max(0, 1 - ph2 * 8),
            transform: `translate3d(${-ph2 * 80}px, 0, 0) scale(${1 + ph2 * 0.15})`,
          }}
        >
          <img src="/about-02.png" alt="TVS Emerald Altura" className="ls__lens-img" />
        </div>

        {/* 5 — RIGHT: heading + points slide in during phase 1 */}
        <div
          className="ls__right"
          style={{
            opacity:   rightOp,
            transform: `translate3d(${rightX}px, 0, 0)`,
            pointerEvents: ph1 < 0.5 ? 'none' : 'auto',
          }}
        >
          <span className="ls__eyebrow">— Discover Your Dream</span>
          <h2 className="ls__h2">
            Find the <em className="ls__h2-gold">Perfect Home</em><br />for You
          </h2>
          <p className="ls__desc">
            From cozy 1BHKs to sprawling villas — every property is handpicked, RERA verified, and ready for you to walk in.
          </p>
          <div className="ls__stats-row">
            {[
              { num: '500+', label: 'Happy Families' },
              { num: '12+', label: 'Years of Trust' },
              { num: '₹0',  label: 'Hidden Charges' },
            ].map((s, i) => (
              <div key={i} className="ls__stat-box"
                style={{
                  opacity:   Math.min(1, Math.max(0, (ph1 - i * 0.12) / 0.25)),
                  transform: `translate3d(0, ${Math.max(0, (1 - Math.min(1, (ph1 - i * 0.12) / 0.25)) * 22)}px, 0)`,
                }}
              >
                <strong className="ls__stat-num">{s.num}</strong>
                <span className="ls__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
          <a href="#contact" className="ls__right-btn"
            style={{
              opacity:   Math.min(1, Math.max(0, (ph1 - 0.4) / 0.3)),
              transform: `translate3d(0, ${Math.max(0, (1 - Math.min(1, (ph1 - 0.4) / 0.3)) * 16)}px, 0)`,
            }}
          >Book a Free Site Visit →</a>
        </div>

        {/* 6 — FULL-SCREEN Why Choose Us — premium redesign */}
        <div className="ls__full" style={{ opacity: gridOp, pointerEvents: gridOp > 0.5 ? 'auto' : 'none' }}>

          {/* top label */}
          <div className="ls__full-top">
            <span className="ls__full-eyebrow">Why Choose Us</span>
            <h2 className="ls__full-h2">
              Why Choose <span className="ls__full-gold">TVS Emerald Altura</span>
            </h2>
            <p className="ls__full-sub">Choosing the right real estate partner can save your time and help you make a confident decision. TVS Emerald Altura supports you with clear communication and buyer focused assistance.</p>
          </div>

          {/* 2-col feature grid */}
          <div className="ls__feat-grid">
            {WHY_POINTS.map((pt, i) => (
              <div
                key={i}
                className="ls__feat-row"
                style={{
                  opacity:   Math.min(1, Math.max(0, (gridOp - i * 0.06) / 0.35)),
                  transform: `translate3d(${(i % 2 === 0 ? -1 : 1) * Math.max(0, (1 - Math.min(1, (gridOp - i * 0.06) / 0.35)) * 30)}px, 0, 0)`,
                }}
              >
                <div className="ls__feat-num">0{i + 1}</div>
                <div className="ls__feat-icon">{pt.icon}</div>
                <div className="ls__feat-body">
                  <strong className="ls__feat-title">{pt.title}</strong>
                  <p className="ls__feat-desc">{pt.desc}</p>
                </div>
                <div className="ls__feat-line" />
              </div>
            ))}
          </div>


        </div>

      </div>
    </section>
  )
}

/* ══ Gallery ══ */
const GAL_ITEMS = [
  { img:'/entrance-lobby.png',          label:'Entrance Lobby',        tag:'Interiors'  },
  { img:'/entrance-cam.png',            label:'Entrance View',         tag:'Exteriors'  },
  { img:'/balcony-closeup-cam.png',     label:'Balcony View',          tag:'Interiors'  },
  { img:'/club-cam.png',                label:'Clubhouse',             tag:'Amenities'  },
  { img:'/club-to-building.png',        label:'Club to Building',      tag:'Amenities'  },
  { img:'/co-working-space.png',        label:'Co-Working Space',      tag:'Amenities'  },
  { img:'/elevation-landscape-cam.png', label:'Elevation & Landscape', tag:'Exteriors'  },
  { img:'/aerial-cam.png',              label:'Aerial View',           tag:'Exteriors'  },
  { img:'/side-tower-cam.png',          label:'Tower View',            tag:'Exteriors'  },
  { img:'/pond-cam.png',                label:'Pond & Greenery',       tag:'Amenities'  },
  { img:'/terrace-cam-1.png',           label:'Terrace Level 1',       tag:'Amenities'  },
  { img:'/terrace-cam-2.png',           label:'Terrace Level 2',       tag:'Amenities'  },
  { img:'/gym.png',                     label:'Gymnasium',             tag:'Amenities'  },
  { img:'/kids-play-area.png',          label:'Kids Play Area',        tag:'Amenities'  },
  { img:'/av-room.png',                 label:'AV Room',               tag:'Amenities'  },
  { img:'/multipurpose-hall.png',       label:'Multipurpose Hall',     tag:'Amenities'  },
]

function GallerySection() {
  const [active, setActive] = useState(2)
  const [lightbox, setLightbox] = useState(null)
  const total = GAL_ITEMS.length

  const go = (idx) => setActive((idx + total) % total)
  const prev = () => go(active - 1)
  const next = () => go(active + 1)

  useEffect(() => {
    const t = setInterval(() => go(active + 1), 4000)
    return () => clearInterval(t)
  }, [active])

  // 5 slots: -2, -1, 0(center), 1, 2
  const slots = [-2, -1, 0, 1, 2]
  const configs = [
    { rotate: '-8deg',  scale: 0.82, ty: 40, opacity: 0.7 },
    { rotate: '-4deg',  scale: 0.91, ty: 18, opacity: 0.85 },
    { rotate: '0deg',   scale: 1,    ty: 0,  opacity: 1 },
    { rotate: '4deg',   scale: 0.91, ty: 18, opacity: 0.85 },
    { rotate: '8deg',   scale: 0.82, ty: 40, opacity: 0.7 },
  ]

  return (
    <section id="gallery" className="gal2">

      {/* ── HEADING ── */}
      <div className="gal2__head">
        <h2 className="gal2__h2">
          Find Your Dream<br/>
          <em className="gal2__h2-em">Space at Altura</em>
        </h2>
        <p className="gal2__sub">
          From grand entrance lobbies to serene water bodies — every corner of TVS Emerald Altura is crafted for elevated living.
        </p>
      </div>

      {/* ── CARD ROW ── */}
      <div className="gal2__row">
        {slots.map((offset, i) => {
          const idx = (active + offset + total) % total
          const item = GAL_ITEMS[idx]
          const isCenter = offset === 0
          const cfg = configs[i]
          return (
            <div
              key={`${idx}-${i}`}
              className={`gal2__card ${isCenter ? 'gal2__card--center' : ''}`}
              style={{
                transform: `rotate(${cfg.rotate}) translateY(${cfg.ty}px) scale(${cfg.scale})`,
                opacity: cfg.opacity,
                zIndex: isCenter ? 5 : Math.abs(offset) === 1 ? 3 : 1,
              }}
              onClick={() => isCenter ? setLightbox(idx) : go(active + offset)}
            >
              <img src={item.img} alt={item.label} className="gal2__card-img" />
              <div className="gal2__card-overlay" />
              <div className="gal2__card-label">
                <span className="gal2__card-tag">{item.tag}</span>
                <span className="gal2__card-name">{item.label}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── NAV ARROWS ── */}
      <div className="gal2__nav">
        <button className="gal2__nav-btn" onClick={prev} aria-label="Prev">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div className="gal2__dots">
          {GAL_ITEMS.map((_,i) => (
            <button key={i} className={`gal2__dot ${i===active?'gal2__dot--on':''}`} onClick={() => go(i)} aria-label={`Slide ${i+1}`}/>
          ))}
        </div>
        <button className="gal2__nav-btn gal2__nav-btn--next" onClick={next} aria-label="Next">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && (
        <div className="gal2__lightbox" onClick={() => setLightbox(null)}>
          <button className="gal2__lb-close" onClick={() => setLightbox(null)}>✕</button>
          <button className="gal2__lb-arr gal2__lb-arr--prev" onClick={e => { e.stopPropagation(); setLightbox(i => (i - 1 + total) % total) }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <img src={GAL_ITEMS[lightbox].img} alt={GAL_ITEMS[lightbox].label} onClick={e => e.stopPropagation()} className="gal2__lb-img"/>
          <div className="gal2__lb-info">
            <span className="gal2__lb-tag">{GAL_ITEMS[lightbox].tag}</span>
            <span className="gal2__lb-label">{GAL_ITEMS[lightbox].label}</span>
          </div>
          <button className="gal2__lb-arr gal2__lb-arr--next" onClick={e => { e.stopPropagation(); setLightbox(i => (i + 1) % total) }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      )}

    </section>
  )
}

/* ══ PORTFOLIO CAROUSEL — Brigade style ══════════════ */
function PortfolioCarousel({ onEnquire }) {
  const [active, setActive] = useState(0)
  const [detailOpen, setDetailOpen] = useState(false)
  const total = PROPS.length
  const goPrev = () => { setDetailOpen(false); setActive(i => (i - 1 + total) % total) }
  const goNext = () => { setDetailOpen(false); setActive(i => (i + 1) % total) }
  const p = PROPS[active]

  return (
    <section className="port" id="portfolio">

      {/* section heading */}
      <div className="port__heading">New Launches &amp; Events</div>

      {/* outer wrapper with side arrows */}
      <div className="port__outer">

        {/* prev arrow */}
        <button className="port__arr port__arr--prev" onClick={goPrev} aria-label="Previous">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        {/* card wrapper — contains outside text + card */}
        <div className="port__card-wrap">

          {/* OUTSIDE LEFT TEXT — floats left of card */}
          <div className="port__outside-text" key={`outside-${active}`}>
            <h2 className="port__outside-title">{p.title}</h2>
            <button className="port__outside-btn" onClick={() => setDetailOpen(v => !v)}>
              View Details
              <span className="port__know-circle">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </button>
          </div>

        {/* center card */}
        <div className="port__card">

          {/* LEFT — image with counter + title overlay */}
          <div className="port__img-side">
            {PROPS.map((prop,i) => (
              <div key={i} className={`port__img-wrap ${i===active?'port__img-wrap--on':''}`}>
                <img src={prop.img} alt={prop.title} className="port__img" />
                <div className="port__img-grad" />
              </div>
            ))}

            {/* gold arc deco */}
            <div className="port__arc" />

            {/* counter */}
            <div className="port__counter">
              <strong>{active+1}</strong>
              <span> / {total}</span>
              <div className="port__cbar"><div className="port__cfill" style={{width:`${((active+1)/total)*100}%`}}/></div>
            </div>

            {/* title on image bottom */}
            <div className="port__img-info" key={`info-${active}`}>
              <h2 className="port__title">{p.title}</h2>
            </div>
          </div>

          {/* RIGHT — white info panel */}
          <div className="port__info-side">
            {detailOpen ? (
              /* DETAIL VIEW */
              <div className="port__detail-view">
                <button className="port__detail-back" onClick={() => setDetailOpen(false)}>
                  ← Back
                </button>
                <span className="port__panel-tag">{p.tag}</span>
                <h3 className="port__panel-title">{p.title}</h3>
                <p className="port__panel-loc"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display:'inline',verticalAlign:'middle',marginRight:4}}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> {p.loc}</p>
                {p.rera && <p className="port__panel-rera">RERA: {p.rera}</p>}
                <p className="port__panel-desc">{p.desc}</p>

                {p.specs && (
                  <div className="port__panel-specs">
                    {p.specs.map((s,j) => (
                      <div key={j} className="port__panel-spec">
                        <strong>{s.value}</strong><span>{s.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {p.typologies && (
                  <div className="port__panel-sec">
                    <h4 className="port__panel-sec-title">Unit Typologies</h4>
                    {p.typologies.map((t,j) => (
                      <div key={j} className="port__panel-type">
                        <span>{t.type}</span><strong>{t.area}</strong>
                      </div>
                    ))}
                  </div>
                )}

                {p.amenities && (
                  <div className="port__panel-sec">
                    <h4 className="port__panel-sec-title">Premium Amenities</h4>
                    <div className="port__panel-pills">
                      {p.amenities.map((a,j) => (
                        <span key={j} className="port__panel-pill">✓ {a}</span>
                      ))}
                    </div>
                  </div>
                )}

                {p.connectivity && (
                  <div className="port__panel-sec">
                    <h4 className="port__panel-sec-title">Ultra-Connectivity</h4>
                    {p.connectivity.map((c,j) => (
                      <div key={j} className="port__panel-conn">
                        <span>{c.place}</span><strong>{c.time}</strong>
                      </div>
                    ))}
                  </div>
                )}

                <div className="port__panel-btns">
                  {p.mapUrl && <a href={p.mapUrl} target="_blank" rel="noopener noreferrer" className="port__panel-map"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display:'inline',verticalAlign:'middle',marginRight:4}}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> View on Map</a>}
                  <button className="port__panel-cta" onClick={onEnquire}>Enquire Now →</button>
                </div>
              </div>
            ) : (
              /* DEFAULT VIEW */
              <div className="port__default-view">
                <span className="port__info-tag">{p.tag}</span>
                <h3 className="port__info-title">{p.title}</h3>
                <p className="port__info-loc"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display:'inline',verticalAlign:'middle',marginRight:4}}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> {p.loc}</p>
                {p.tagline && <p className="port__info-tagline">{p.tagline}</p>}

                {p.specs && (
                  <div className="port__info-specs">
                    {p.specs.slice(0,4).map((s,j) => (
                      <div key={j} className="port__info-spec">
                        <strong>{s.value}</strong><span>{s.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {p.typologies && (
                  <div className="port__info-types">
                    {p.typologies.map((t,j) => (
                      <div key={j} className="port__info-type">
                        <span>{t.type}</span><strong>{t.area}</strong>
                      </div>
                    ))}
                  </div>
                )}

                {p.rera && <p className="port__info-rera">RERA: {p.rera}</p>}

                <div className="port__info-btns">
                  <button className="port__info-detail" onClick={() => setDetailOpen(true)}>View Details →</button>
                  <button className="port__info-enquire" onClick={onEnquire}>Enquire Now</button>
                </div>
              </div>
            )}
          </div>

        </div>

        </div>{/* end port__card-wrap */}

        {/* next arrow */}
        <button className="port__arr port__arr--next" onClick={goNext} aria-label="Next">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>

      </div>

      {/* thumbnail strip bottom */}
      <div className="port__thumbs-strip">
        {PROPS.map((prop,i) => (
          <button key={i} className={`port__thumb-item ${i===active?'port__thumb-item--on':''}`} onClick={() => {setActive(i);setDetailOpen(false);}}>
            <img src={prop.img} alt={prop.title} />
            <span>{prop.title}</span>
          </button>
        ))}
      </div>

    </section>
  )
}

const FAQS = [
  {
    q: 'Where is this TVS Emerald residential project located?',
    a: 'The project is located in the fast-developing corridor of North Bengaluru with access to Bagalur Metro Station, KIADB, Bhartiya City, Manyata Tech Park, and the airport.',
  },
  {
    q: 'What apartment sizes are available?',
    a: 'The project offers 2 BHK units from 1100 to 1200 sq. ft. and multiple 3 BHK options ranging from 1510 sq. ft. to 2123 sq. ft.',
  },
  {
    q: 'What are the major amenities in the project?',
    a: 'The project includes 2 clubhouses, 2 gyms, 2 swimming pools, sky cinema, café spaces, landscaped gardens, temple, water body, and green open spaces.',
  },
  {
    q: 'Is this project good for families?',
    a: 'Yes. With schools, healthcare, entertainment hubs, metro access, airport connectivity, and peaceful amenities nearby, it is suitable for modern family living.',
  },
  {
    q: 'How can I book a site visit?',
    a: 'You can submit the enquiry form on this page. TVS Emerald Altura will contact you with project details and help schedule your site visit.',
  },
]

function FaqSection() {
  const [open, setOpen] = useState(null)
  const toggle = (i) => setOpen(open === i ? null : i)

  return (
    <section className="faq" id="faq">
      <div className="ctr faq__inner">

        {/* left */}
        <div className="faq__left">
          <span className="faq__eyebrow">Got Questions?</span>
          <h2 className="faq__h2">Frequently Asked <em className="faq__em">Questions</em></h2>
          <p className="faq__sub">Everything you need to know about TVS Emerald Altura and our services. Can't find an answer? Reach out to us directly.</p>

          {/* decorative image */}
          <div className="faq__img-wrap">
            <img src="/entrance-cam.png" alt="TVS Emerald Altura" />
            {/* <div className="faq__img-badge">
              <strong>RERA</strong>
              <span className="faq__rera-num">PRM/KA/RERA/1251/309/PR/040426/008572</span>
            </div> */}
          </div>
        </div>

        {/* right — accordion */}
        <div className="faq__list">
          {FAQS.map((item, i) => (
            <div key={i} className={`faq__item ${open === i ? 'faq__item--open' : ''}`}>
              <button className="faq__q" onClick={() => toggle(i)}>
                <span className="faq__q-num">0{i + 1}</span>
                <span className="faq__q-text">{item.q}</span>
                <span className="faq__q-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    {open === i
                      ? <path d="M18 15l-6-6-6 6"/>
                      : <path d="M6 9l6 6 6-6"/>}
                  </svg>
                </span>
              </button>
              <div className="faq__a-wrap">
                <p className="faq__a">{item.a}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

const TVS_IMGS = [
  { src:'/entrance-lobby.png',          label:'Entrance Lobby'       },
  { src:'/entrance-cam.png',            label:'Entrance View'        },
  { src:'/elevation-landscape-cam.png', label:'Elevation & Landscape'},
  { src:'/aerial-cam.png',              label:'Aerial View'          },
  { src:'/club-cam.png',                label:'Clubhouse'            },
  { src:'/club-to-building.png',        label:'Club to Building'     },
  { src:'/pond-cam.png',                label:'Pond & Greenery'      },
  { src:'/side-tower-cam.png',          label:'Tower View'           },
  { src:'/balcony-closeup-cam.png',     label:'Balcony View'         },
  { src:'/gym.png',                     label:'Gymnasium'            },
  { src:'/terrace-cam-1.png',           label:'Terrace Level 1'      },
  { src:'/kids-play-area.png',          label:'Kids Play Area'       },
  { src:'/av-room.png',                 label:'AV Room'              },
  { src:'/multipurpose-hall.png',       label:'Multipurpose Hall'    },
  { src:'/co-working-space.png',        label:'Co-Working Space'     },
]

function TvsGalleryStrip() {
  const [cur, setCur]         = useState(0)
  const [dir, setDir]         = useState(1)   // 1=next, -1=prev
  const [animating, setAnim]  = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const total   = TVS_IMGS.length
  const VISIBLE = 4

  const go = (nextIdx, direction) => {
    if (animating) return
    setDir(direction)
    setAnim(true)
    setTimeout(() => {
      setCur(nextIdx)
      setAnim(false)
    }, 420)
  }
  const prev = () => go((cur - 1 + total) % total, -1)
  const next = () => go((cur + 1) % total,          1)

  // autoplay
  useEffect(() => {
    const t = setInterval(() => go((cur + 1) % total, 1), 3500)
    return () => clearInterval(t)
  }, [cur, animating])

  // show VISIBLE cards; the one just out of range peeks in
  const cards = Array.from({ length: VISIBLE + 1 }, (_, i) =>
    TVS_IMGS[(cur + i) % total]
  )

  return (
    <>
    <div className="tvsc" id="amenities">

      {/* ── TRACK ── */}
      <div className={`tvsc__track ${animating ? (dir === 1 ? 'tvsc__track--slide-left' : 'tvsc__track--slide-right') : ''}`}>
        {cards.map((img, i) => (
          <div
            key={`${cur}-${i}`}
            className="tvsc__card"
            onClick={() => setLightbox((cur + i) % total)}
          >
            <img src={img.src} alt={img.label} className="tvsc__img" />
            <div className="tvsc__overlay" />
            <div className="tvsc__label">
              <span className="tvsc__label-text">{img.label}</span>
              <div className="tvsc__zoom-icon">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── LEFT ARROW ── */}
      <button className="tvsc__arr tvsc__arr--prev" onClick={prev} aria-label="Previous">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
      </button>

      {/* ── RIGHT ARROW ── */}
      <button className="tvsc__arr tvsc__arr--next" onClick={next} aria-label="Next">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      {/* ── DOTS ── */}
      <div className="tvsc__dots">
        {TVS_IMGS.map((_, i) => (
          <button
            key={i}
            className={`tvsc__dot ${i === cur ? 'tvsc__dot--on' : ''}`}
            onClick={() => go(i, i > cur ? 1 : -1)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

    </div>

    {/* ── LIGHTBOX ── */}
    {lightbox !== null && (
      <div className="tvsc__lightbox" onClick={() => setLightbox(null)}>
        <button className="tvsc__lb-close" onClick={() => setLightbox(null)}>✕</button>
        <button className="tvsc__lb-arr tvsc__lb-arr--prev"
          onClick={e => { e.stopPropagation(); setLightbox(i => (i - 1 + total) % total) }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <img src={TVS_IMGS[lightbox].src} alt={TVS_IMGS[lightbox].label} onClick={e => e.stopPropagation()} className="tvsc__lb-img" />
        <div className="tvsc__lb-label">{TVS_IMGS[lightbox].label}</div>
        <button className="tvsc__lb-arr tvsc__lb-arr--next"
          onClick={e => { e.stopPropagation(); setLightbox(i => (i + 1) % total) }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    )}
    </>
  )
}

/* ══ About Section — scroll-progress word fill animation ══ */
function AboutSection() {
  const bigText = 'Discover your ideal luxury residence with TVS Emerald Altura. Connect with the finest homes in North Bengaluru and find smooth, transparent transactions. Find your perfect property or investment.'
  const words = bigText.split(' ')

  const secRef = useRef(null)
  const [litCount, setLitCount] = useState(0)

  useEffect(() => {
    const el = secRef.current
    if (!el) return
    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const winH = window.innerHeight
      // progress: 0 when top of section hits bottom of screen, 1 when bottom of section hits top
      const progress = Math.min(1, Math.max(0, (winH - rect.top) / (winH + rect.height)))
      setLitCount(Math.floor(progress * words.length * 1.6))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [words.length])

  return (
    <section id="about-us" className="wwa" ref={secRef}>
      <div className="wwa__inner">

        {/* LEFT — pill + image only */}
        <div className="wwa__left">
          <div className="wwa__pill">Who we are</div>
          <div className="wwa__img-stack">
            <img src="/entrance-lobby.png" alt="TVS Emerald Altura" className="wwa__img-main" />
          </div>
        </div>

        {/* RIGHT — text with floating image behind bottom-right */}
        <div className="wwa__right">
          <p className="wwa__nano">
            {words.map((word, i) => (
              <span
                key={i}
                className={`wwa__nano-word ${i < litCount ? 'wwa__nano-word--in' : ''}`}
              >
                {word}{' '}
              </span>
            ))}
          </p>

          {/* floating tilted card — bottom-right, peeking behind text */}
          <div className="wwa__img-float">
            <img src="/side-tower-cam.png" alt="Altura Tower" className="wwa__img-sm" />
          </div>
        </div>

      </div>
    </section>
  )
}

/* ══ About TVS Emerald Altura Section ══ */
function AboutTVSEmeraldAltura({ onSiteVisit }) {
  const [secRef, secVis] = useOnScreen(0.12)

  const lines = [
    { num: '01', title: 'Honest Guidance',       desc: 'Every buyer gets clear, unbiased information about the project — no hidden facts, no pressure.' },
    { num: '02', title: 'Project Information',   desc: 'We share complete details: location, floor plans, RERA, pricing, amenities and connectivity.' },
    { num: '03', title: 'Site Visit Support',    desc: 'We coordinate your site visit smoothly so you can experience the project firsthand, hassle-free.' },
    { num: '04', title: 'Result Oriented',       desc: 'We focus on your decision — not just a sale. Simple, transparent, and buyer-first always.' },
  ]

  return (
    <section className="apv" ref={secRef}>

      {/* ── LEFT — sticky content ── */}
      <div className="apv__left">

        {/* eyebrow */}
        <div className={`apv__eyebrow ${secVis ? 'apv__eyebrow--in' : ''}`}>
          <span className="apv__eyebrow-line" />
          About Pruthvirealty Realty
        </div>

        {/* H2 */}
        <h2 className="apv__h2">
          <span className={`apv__h2-word ${secVis ? 'apv__h2-word--in' : ''}`} style={{ transitionDelay: '0ms' }}>About </span>
          <span className={`apv__h2-word ${secVis ? 'apv__h2-word--in' : ''}`} style={{ transitionDelay: '70ms', color: '#216721' }}>Pruthvirealty </span>
          <span className={`apv__h2-word ${secVis ? 'apv__h2-word--in' : ''}`} style={{ transitionDelay: '140ms' }}>Realty</span>
        </h2>

        <p className={`apv__p ${secVis ? 'apv__p--in' : ''}`} style={{ transitionDelay: '300ms' }}>
          <strong style={{color:'#216721'}}>Pruthvirealty Realty</strong> is the registered trade name of the proprietorship business owned and operated by <strong>Ms. Pruthvisimha</strong>, a RERA-registered real estate agent based in Bengaluru, Karnataka.
        </p>
        <p className={`apv__p ${secVis ? 'apv__p--in' : ''}`} style={{ transitionDelay: '400ms' }}>
          We operate as an authorized non-exclusive marketing channel partner for TVS Emerald Limited. Our role is limited to facilitating property enquiries, sharing authentic project information, and coordinating site visits. We do not collect any payments from buyers — all booking transactions occur directly between the buyer and the developer.
        </p>


      </div>

      {/* ── RIGHT — Verified Credentials card ── */}
      <div className="apv__right">
        <div className={`apv__cred-card ${secVis ? 'apv__cred-card--in' : ''}`} style={{ transitionDelay: '200ms' }}>
          <h3 className="apv__cred-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#216721" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Verified Credentials
          </h3>
          {[
            { label: 'Legal Name',              value: 'Pruthvisimha' },
            { label: 'Trade Name',              value: 'Pruthvirealty Realty' },
            // { label: 'RERA Agent Registration', value: 'PRM/KA/RERA/1251/310/AG/250627/005895', highlight: true },
            { label: 'RERA Validity',           value: '27 June 2025 to 27 June 2030' },
            { label: 'GSTIN',                   value: '29ENCPP5700D1Z4' },
            { label: 'Business Type',           value: 'Sole Proprietorship' },
            { label: 'Registered Office',       value: '2nd Floor, 3023 "Prestige Bagamane Temple Bells, Rajarajeshwari Nagar, Javare Gowda Nagar, Bengaluru Urban, Karnataka - 560098' },
          ].map((row, i) => (
            <div key={i} className="apv__cred-row">
              <span className="apv__cred-label">{row.label}</span>
              <span className={`apv__cred-value ${row.highlight ? 'apv__cred-value--hl' : ''}`}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

export default function App() {
  const [slide, setSlide] = useState(0)
  const [prev, setPrev]   = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [testi, setTesti] = useState(0)
  const [siteVisitOpen, setSiteVisitOpen] = useState(false)
  const [enquireOpen, setEnquireOpen] = useState(false)
  const [cabPopupOpen, setCabPopupOpen] = useState(false)
  const [cabDismissed, setCabDismissed] = useState(false)
  const [dlxGate, setDlxGate] = useState(null)
  const [dlxName, setDlxName] = useState('')
  const [dlxPhone, setDlxPhone] = useState('')
  const [dlxConsent, setDlxConsent] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)
  const [refundOpen, setRefundOpen] = useState(false)
  const [thankYou, setThankYou] = useState(null)

  const goTo = (i) => { setPrev(slide); setSlide(i) }

  useEffect(() => {
    const t = setInterval(() => goTo((slide + 1) % SLIDES.length), 6000)
    return () => clearInterval(t)
  }, [slide])

  useEffect(() => {
    const t = setInterval(() => setTesti(p => (p + 1) % TESTIMONIALS.length), 5000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    if (cabDismissed) return
    const t = setTimeout(() => setCabPopupOpen(true), 10000)
    return () => clearTimeout(t)
  }, [cabDismissed])

  useEffect(() => {
    if (window.location.pathname === '/') {
      window.history.replaceState({}, '', '/luxury-apartments-in-bangalore/' + window.location.search + window.location.hash)
    }
  }, [])

  useEffect(() => {
    const HOME_PATH = '/luxury-apartments-in-bangalore/'
    const THANKS_PATH = '/thank-you'
    if (thankYou) {
      if (window.location.pathname !== THANKS_PATH) {
        window.history.pushState({ thankYou: true }, '', THANKS_PATH)
      }
    } else if (window.location.pathname === THANKS_PATH) {
      window.history.pushState({}, '', HOME_PATH)
    }
  }, [thankYou])

  useEffect(() => {
    const onPop = () => {
      if (window.location.pathname !== '/thank-you') setThankYou(null)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return (
    <div className="site">

      {/* ══ FIXED HEADER: announce bar + nav ══════════ */}
      <header className="site-header">


      {/* ANNOUNCEMENT BAR — scrolling marquee */}
      <div className="nav__announce">
        <div className="nav__announce-track">
          {[0,1].map(k => (
            <div className="nav__announce-reel" key={k} aria-hidden={k===1}>
              <span className="nav__announce-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                New Launch — TVS Emerald Altura, North Bengaluru
              </span>
              <span className="nav__announce-dot">✦</span>
              {/* <span className="nav__announce-item">Project RERA: <span className="nav__announce-rera">PRM/KA/RERA/1251/309/PR/040426/008572</span></span>
              <span className="nav__announce-dot">✦</span>
              <span className="nav__announce-item">Agent RERA: <span className="nav__announce-rera">PRM/KA/RERA/1251/310/AG/250627/005895</span></span> */}
              <span className="nav__announce-dot">✦</span>
              <span className="nav__announce-item">Limited Units Available — Book Now</span>
              <span className="nav__announce-dot">✦</span>
              <span className="nav__announce-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                SH 104, Sathanur, North Bengaluru
              </span>
              <span className="nav__announce-dot">✦</span>
              <span className="nav__announce-item">Premium 2 &amp; 3 BHK Apartments Starting ₹65 Lakhs*</span>
              <span className="nav__announce-dot">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* NAV */}
      <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__wrap">
          <a href="/luxury-apartments-in-bangalore/" className="nav__logo">
            <img src="/logo_1.png" alt="TVS Emerald Altura" />
          </a>

          <ul className="nav__links">
            {NAV.map(n => (
              <li key={n}><a href={n === 'Home' ? '/luxury-apartments-in-bangalore/' : `#${n.toLowerCase().replace(/\s/g,'-')}`}>{n}</a></li>
            ))}
          </ul>

          <div className="nav__right">
            <a href="tel:+918105102506" className="nav__phone">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +91 81051 02506
            </a>
          </div>

          <button className={`nav__burger ${menuOpen ? 'nav__burger--x' : ''}`}
            onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>
      </header>

      {/* ══ SIDEBAR PANEL (slides in from left) ════════ */}
      {menuOpen && <div className="sidebar__backdrop" onClick={() => setMenuOpen(false)} />}
      <aside className={`sidebar ${menuOpen ? 'sidebar--open' : ''}`}>
        {/* close button */}
        <button className="sidebar__close" onClick={() => setMenuOpen(false)} aria-label="Close">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>

        {/* logo + tagline */}
        <div className="sidebar__brand">
          <img src="/logo_1.png" alt="TVS Emerald Altura" className="sidebar__logo" />
          <p className="sidebar__tagline">
            By aiming to elevate the standard of premium living, TVS Emerald Altura continues to be the address of luxury and trust.
          </p>
        </div>

        {/* property thumbnails */}
        <div className="sidebar__thumbs">
          {PROPS.slice(0,3).map((prop, i) => (
            <a key={i} href="#properties" className="sidebar__thumb" onClick={() => setMenuOpen(false)}>
              <img src={prop.img} alt={`Property ${i+1}`} />
            </a>
          ))}
        </div>

        {/* nav links */}
        <nav className="sidebar__nav">
          {NAV.map(n => (
            <a key={n} href={n === 'Home' ? '/luxury-apartments-in-bangalore/' : `#${n.toLowerCase().replace(/\s/g,'-')}`}
              className="sidebar__link" onClick={() => setMenuOpen(false)}>
              {n}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          ))}
        </nav>

        {/* contact info */}
        <div className="sidebar__contact">
          <p className="sidebar__addr">2nd Floor, 3023 "Prestige Bagamane Temple Bells, Rajarajeshwari Nagar, Javare Gowda Nagar, Bengaluru Urban, Karnataka - 560098</p>
          <a href="tel:+918105102506" className="sidebar__phone">+91 81051 02506</a>
          <a href="mailto:info@Pruthvirealty.com" className="sidebar__email">info@Pruthvirealty.com</a>
        </div>

        {/* socials */}
        <div className="sidebar__socs">
          {[
            { l:'Facebook', svg:<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
            { l:'Instagram', svg:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg> },
            { l:'LinkedIn', svg:<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
            { l:'YouTube', svg:<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#296e28"/></svg> },
          ].map(s => (
            <a key={s.l} href="#" aria-label={s.l} className="sidebar__soc">{s.svg}</a>
          ))}
        </div>

        {/* copyright */}
        <p className="sidebar__copy">© 2025 TVS Emerald Altura | Premium Real Estate</p>
      </aside>

      {/* ══ HERO — Kordex style ══════════════════════ */}
      <section id="home" className="hero">

        {/* ── FULL-SCREEN BACKGROUND ── */}
        <div className="hero__bg">
          <img src="/side-tower-cam.png" alt="TVS Emerald Altura" className="hero__bg-img" />
          <div className="hero__bg-grad" />
        </div>

        {/* ── BOTTOM CONTENT ROW ── */}
        <div className="hero__body">

          {/* LEFT — headline + sub + buttons */}
          <div className="hero__left">
            <h1 className="hero__h1">
              <span className="hero__h1-line1">TVS Emerald</span>
              <span className="hero__h1-shimmer">Altura</span>
            </h1>
            <p className="hero__sub-text">
              Premium luxury residences offering world-class amenities,
              exceptional craftsmanship, and a lifestyle curated for
              those who settle for nothing less than the finest.
            </p>

            {/* RERA compliance box */}
            {/* <div className="hero__rera-box">
              <span className="hero__rera-label">RERA COMPLIANCE</span>
              <p className="hero__rera-line">Real Estate Agent Reg No: <span className="hero__rera-highlight">PRM/KA/RERA/1251/310/AG/250627/005895</span></p>
              <p className="hero__rera-line">Project RERA No: <span className="hero__rera-highlight">PRM/KA/RERA/1251/309/PR/040426/008572</span></p>
            </div> */}
          </div>

          {/* RIGHT — inline enquiry form */}
          <div className="hero__card">
            <p className="hero__card-title">Get a Free Consultation</p>
            <p className="hero__card-desc">Fill in your details and our expert will call you back shortly.</p>
            <form className="hero__card-form" onSubmit={e => {
              e.preventDefault()
              const fd = new FormData(e.target)
              const name = fd.get('hcf_name')?.trim()
              const phone = fd.get('hcf_phone')?.trim()
              const email = fd.get('hcf_email')?.trim()
              const interested_in = fd.get('hcf_unit')
              const consent = e.target.querySelector('[name="hcf_consent"]').checked
              const err = validateForm({ name, phone, email, consent: consent ? null : false })
              if (err) { alert(err); return }
              sendEnquiry({
                title: 'Hero Banner Enquiry',
                name, phone,
                email: email || 'Not provided',
                interested_in: interested_in || 'Not specified',
                message: '',
              }).then(() => { e.target.reset(); setThankYou('enquiry') })
                .catch((err) => { console.error('EmailJS error:', err); alert('Something went wrong. Please call +91 81051 02506.') })
            }}>
              <div className="hcf__field">
                <input name="hcf_name" type="text" placeholder="Your Full Name *" required />
              </div>
              <div className="hcf__field">
                <input name="hcf_phone" type="tel" placeholder="Phone Number *" required maxLength={10} />
              </div>
              <div className="hcf__field">
                <input name="hcf_email" type="email" placeholder="Email Address" />
              </div>
              <div className="hcf__field">
                <select name="hcf_unit">
                  <option value="">Interested In</option>
                  <option>2 BHK – 1100 to 1200 sq.ft</option>
                  <option>3 BHK (2T) – 1510 to 1588 sq.ft</option>
                  <option>3 BHK (3T) – 1898 sq.ft</option>
                  <option>3 BHK + Servant Quarter – 2123 sq.ft</option>
                </select>
              </div>
              <label className="hcf__consent">
                <input name="hcf_consent" type="checkbox" required />
                <span>I agree to be contacted by <strong>Pruthvirealty Realty</strong> and TVS Emerald's authorized sales team via call, SMS, WhatsApp, or email regarding this enquiry. I have read and agree to the <button type="button" className="hcf__consent-link" onClick={() => setPrivacyOpen(true)}>Privacy Policy</button> and <button type="button" className="hcf__consent-link" onClick={() => setTermsOpen(true)}>Terms of Service</button>.</span>
              </label>
              <button type="submit" className="hcf__btn">
                Request a Callback
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M7 7h10v10"/></svg>
              </button>
              <p className="hcf__note">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Your information is 100% secure & confidential
              </p>
            </form>
          </div>

        </div>

      </section>


      {/* ══ PROPERTY CARDS STRIP ═══════════════════════ */}
      <section className="pstrip">
        <div className="pstrip__head">
          <p className="pstrip__eyebrow">What We Offer</p>
          <h2 className="pstrip__h2">
            {'Explore Premium Living with'.split(' ').map((w,i) => (
              <span key={i} className="pstrip__h2-word" style={{animationDelay:`${i*0.1}s`}}>{w}{' '}</span>
            ))}
            <span className="pstrip__h2-green">
              {'TVS Emerald Altura'.split(' ').map((w,i) => (
                <span key={i} className="pstrip__h2-word pstrip__h2-word--green" style={{animationDelay:`${(i+5)*0.1}s`}}>{w}{' '}</span>
              ))}
            </span>
          </h2>
        </div>
        <div className="pstrip__track">

          <div className="pstrip__card pstrip__card--tall">
            <img src="/elevation-landscape-cam.png" alt="Premium Residences" className="pstrip__img" />
            <a className="pstrip__arrow" href="#portfolio" aria-label="View">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M7 7h10v10"/></svg>
            </a>
            <div className="pstrip__label">
              <span className="pstrip__tag">Luxury Living</span>
              <p className="pstrip__name">Premium<br/>Residences.</p>
            </div>
          </div>

          <div className="pstrip__card pstrip__card--circle">
            <img src="/side-tower-cam.png" alt="TVS Emerald Altura" className="pstrip__img" />
            <a className="pstrip__arrow" href="#portfolio" aria-label="View">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M7 7h10v10"/></svg>
            </a>
            <div className="pstrip__label">
              <span className="pstrip__tag">New Launch</span>
              <p className="pstrip__name">TVS Emerald<br/>Altura.</p>
            </div>
          </div>

          <div className="pstrip__card pstrip__card--tall">
            <img src="/club-cam.png" alt="World-class Amenities" className="pstrip__img" />
            <a className="pstrip__arrow" href="#amenities" aria-label="View">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M7 7h10v10"/></svg>
            </a>
            <div className="pstrip__label">
              <span className="pstrip__tag">Lifestyle</span>
              <p className="pstrip__name">World-class<br/>Amenities.</p>
            </div>
          </div>

          <div className="pstrip__card pstrip__card--tall">
            <img src="/terrace-cam-1.png" alt="Invest & Grow" className="pstrip__img" />
            <a className="pstrip__arrow" href="#contact" aria-label="View">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M7 7h10v10"/></svg>
            </a>
            <div className="pstrip__label">
              <span className="pstrip__tag">Investment</span>
              <p className="pstrip__name">Invest &amp;<br/>Grow.</p>
            </div>
          </div>

        </div>
      </section>


      {/* ══ DESIGN SOLUTIONS SECTION ════════════════════ */}
      <section className="dsol">
        <div className="dsol__inner">

          {/* LEFT — headline + accent bar */}
          <div className="dsol__left">
            <div className="dsol__accent-bar" />
            <h2 className="dsol__h2">
              Providing Premium<br/>
              Residences That<br/>
              <span className="dsol__h2-green">Elevate Every Space.</span>
            </h2>
            <p className="dsol__sub">
              TVS Emerald Altura brings world-class architecture, thoughtful design, and curated living experiences to North Bengaluru.
            </p>
            <a href="#portfolio" className="dsol__cta">
              Explore Project
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M7 7h10v10"/></svg>
            </a>
          </div>

          {/* CENTER — tall building photo */}
          <div className="dsol__center">
            <div className="dsol__center-img">
              <img src="/side-tower-cam.png" alt="TVS Emerald Altura Tower" />
            </div>
          </div>

          {/* RIGHT — two stacked feature cards */}
          <div className="dsol__right">
            <div className="dsol__feat-card">
              <div className="dsol__feat-img">
                <img src="/entrance-lobby.png" alt="Luxury Lobby" />
              </div>
              <div className="dsol__feat-body">
                <p className="dsol__feat-title">Architectural Design</p>
                <p className="dsol__feat-desc">Manica specialises in creating objects and spaces that emphasise the fine process of construction.</p>
              </div>
            </div>
            <div className="dsol__feat-card">
              <div className="dsol__feat-img">
                <img src="/club-cam.png" alt="Club House" />
              </div>
              <div className="dsol__feat-body">
                <p className="dsol__feat-title">Lifestyle & Amenities</p>
                <p className="dsol__feat-desc">Every amenity crafted to give residents a life of comfort, leisure, and vibrant community living.</p>
              </div>
            </div>
            <div className="dsol__feat-card">
              <div className="dsol__feat-img">
                <img src="/terrace-cam-1.png" alt="Terrace View" />
              </div>
              <div className="dsol__feat-body">
                <p className="dsol__feat-title">Premium Views</p>
                <p className="dsol__feat-desc">Sweeping vistas and open terraces designed to bring the outdoors into your everyday living.</p>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ══ ABOUT ═══════════════════════════════════════ */}
      <AboutSection />


      {/* ══ TVS EMERALD ALTURA — LUXURY SHOWCASE ════════ */}
      <section className="tvslux" id="portfolio">

        {/* ── BG IMAGE FULL ── */}
        <div className="tvslux__bg"><img src="/elevation-landscape-cam.png" alt=""/></div>
        <div className="tvslux__veil"/>

        {/* ── TOP LABEL BAR ── */}

        {/* ── MAIN CONTENT ── */}
        <div className="tvslux__main ctr">

          {/* LEFT */}
          <div className="tvslux__left">

            {/* heading */}
            <h2 className="tvslux__h2">TVS Emerald<br/><em className="tvslux__em">Altura</em></h2>
            <p className="tvslux__loc">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              SH 104, Sathanur, North Bengaluru
            </p>
            <p className="tvslux__intro">Introducing TVS Emerald's premium residential development in the fast-developing corridor of North Bengaluru.</p>

            {/* stats */}
            <div className="tvslux__stats-grid">
              {[
                { val:'10.06', label:'Acres' },
                { val:'12',    label:'Towers' },
                { val:'975',   label:'Units' },
                { val:'29K+',  label:'Clubhouse sqft' },
              ].map((s,i) => (
                <div key={i} className="tvslux__stat">
                  <strong>{s.val}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            {/* connectivity */}
            <div className="tvslux__conn-title">⚡ Ultra-Connectivity</div>
            <div className="tvslux__conn-grid">
              {[
                { place:'Bagalur Metro',  time:'7 min' },
                { place:'KIADB',          time:'10 min' },
                { place:'Bhartiya City',  time:'7 min' },
                { place:'DPS School',     time:'5 min' },
                { place:'Yelahanka Rly',  time:'12 min' },
                { place:'Manyata Tech',   time:'20 min' },
                { place:'Airport',        time:'20 min' },
              ].map((c,i) => (
                <div key={i} className="tvslux__conn-item">
                  <strong>{c.time}</strong>
                  <span>{c.place}</span>
                </div>
              ))}
            </div>

            <div className="tvslux__btns">
              <a href="https://maps.app.goo.gl/UhEXsGgDRg5KCCzT8" target="_blank" rel="noopener noreferrer" className="tvslux__btn-ghost">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                View on Map
              </a>
            </div>
          </div>

          {/* RIGHT — unit typologies + amenities */}
          <div className="tvslux__right">

            <div className="tvslux__card">
              <div className="tvslux__card-title">Unit Typologies</div>
              {[
                { type:'2 BHK',                   area:'1100 – 1200 sq.ft' },
                { type:'3 BHK (2 Toilets)',        area:'1510 – 1588 sq.ft' },
                { type:'3 BHK (3 Toilets)',        area:'1898 sq.ft' },
                { type:'3 BHK + Servant Quarter',  area:'2123 sq.ft' },
              ].map((t,i) => (
                <div key={i} className="tvslux__type-row">
                  <span>{t.type}</span>
                  <strong>{t.area}</strong>
                </div>
              ))}
            </div>

            <div className="tvslux__card">
              <div className="tvslux__card-title">Premium Amenities</div>
              <div className="tvslux__amenities">
                {['2 Clubhouses','2 Gyms','2 Swimming Pools','Sky Cinema','Café & Social Spaces','Landscaped Gardens','In-Campus Temple','Man-made Water Body','2 Acres Greenery'].map((a,i) => (
                  <span key={i} className="tvslux__pill">✓ {a}</span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── BOTTOM IMAGE CAROUSEL ── */}
        <TvsGalleryStrip />

      </section>

      {/* ══ DOWNLOADS SECTION ══════════════════════════ */}
      <section className="dlx">
        <div className="dlx__head">
          <div className="dlx__head-left">
            <span className="dlx__eyebrow">
              <span className="dlx__eyebrow-dot"/>
              TVS Emerald Altura
            </span>
            <h2 className="dlx__h2">Project <em className="dlx__h2-em">Resources</em></h2>
          </div>
          <p className="dlx__desc">Access detailed brochures, floor plans, location maps and more — everything you need to make a confident decision.</p>
        </div>
        <div className="dlx__grid">
          {[
            { num:'01', icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>, label:'Brochure', sub:'Project Overview', desc:'Complete vision, highlights, lifestyle features and design philosophy of TVS Emerald Altura.', file:'/src/assets/Welcome-to-TVS-Emerald-Altura-Modern-Living-in-North-Bangalore.pdf', tag:'PDF · 14 Pages' },
            { num:'02', icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>, label:'Floor Plans', sub:'All Configurations', desc:'Detailed unit plans for all towers — 2 BHK Classic, 2 BHK Premium, 3 BHK Luxe + Staff.', file:'/src/assets/AL Floor Plans - UR - High Res.pdf', tag:'PDF · 6 Pages' },
            { num:'03', icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>, label:'Location Map', sub:'Connectivity Guide', desc:'Metro access, IT hubs, hospitals, schools, airports and all key landmarks nearby.', file:'/src/assets/Sathanur location carosuel.pdf', tag:'PDF · Map Deck' },
            { num:'04', icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>, label:'VP Deck', sub:'Investment Case', desc:'Value proposition, investment highlights, EOI process, pricing and ROI potential.', file:'/src/assets/Sathanur VP Deck (1).pdf', tag:'PDF · 60 Pages' },
          ].map((doc, i) => (
            <div key={i} className="dlx__card">
              <div className="dlx__card-top">
                <span className="dlx__card-num">{doc.num}</span>
                <div className="dlx__card-icon">{doc.icon}</div>
              </div>
              <div className="dlx__card-body">
                <span className="dlx__card-sub">{doc.sub}</span>
                <h3 className="dlx__card-title">{doc.label}</h3>
                <p className="dlx__card-desc">{doc.desc}</p>
              </div>
              <div className="dlx__card-foot">
                <span className="dlx__card-tag">{doc.tag}</span>
                <button className="dlx__card-dl" onClick={() => { setDlxGate(doc); setDlxName(''); setDlxPhone('') }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                </button>
              </div>
              <div className="dlx__card-line"/>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SERVICES — sidebar layout like screenshot ═══ */}
      {/* ══ WHY CHOOSE TVS EMERALD ALTURA ══════════════ */}
      <ServiceSection />

      {/* ══ ABOUT TVS EMERALD ALTURA ════════════════════ */}
      <AboutTVSEmeraldAltura onSiteVisit={() => setSiteVisitOpen(true)} />

      {/* ══ FAN GALLERY ════════════════════════════════ */}
      <GallerySection />

      {/* ══ TESTIMONIALS ═══════════════════════════════ */}
      <section className="testi">

        {/* ── LEFT ── */}
        <div className="testi__left">
          {/* deco dots */}
          <div className="testi__deco-dot testi__deco-dot--lg" />
          <div className="testi__deco-dot testi__deco-dot--sm" />

          <span className="testi__eyebrow">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#296e28"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22" fill="#296e28"/></svg>
            Customer Testimonials
          </span>

          <h2 className="testi__h2">Hear From Happy<br/>Homeowners</h2>
          <p className="testi__sub">Discover what our satisfied homeowners have to say about their journey. Real stories, real experiences, and real trust — built one home at a time.</p>

          {/* stacked avatars + count */}
          <div className="testi__social-proof">
            <div className="testi__avatars">
              {TESTIMONIALS.slice(0,3).map((t,i)=>(
                <div key={i} className="testi__av testi__av-icon" style={{zIndex:3-i,marginLeft: i===0?0:-14}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#216721" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
              ))}
              <div className="testi__av testi__av-count">10k</div>
            </div>
            <p className="testi__proof-text">More Than <strong>25K</strong> Clients Reviews</p>
          </div>

          {/* vertical divider line (decorative) */}
          <div className="testi__vline"/>
        </div>

        {/* ── RIGHT ── */}
        <div className="testi__right">

          {/* card carousel */}
          <div className="testi__card-wrap">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={`testi__card ${i === testi ? 'testi__card--active' : 'testi__card--hidden'}`}>
                {/* stars */}
                <div className="testi__stars">
                  {Array.from({length:5}).map((_,s)=>(
                    <span key={s} className={s < t.rating ? 'testi__star--on' : 'testi__star--off'}>★</span>
                  ))}
                </div>
                {/* quote */}
                <blockquote className="testi__quote">
                  "{t.q}"
                </blockquote>
                {/* author */}
                <div className="testi__author">
                  <div className="testi__avatar-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#216721" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                  <div className="testi__author-info">
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                  {/* big quote icon right */}
                  <div className="testi__q-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="#296e28" opacity=".9"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* bottom nav row */}
          <div className="testi__nav">
            <button className="testi__btn testi__btn--outline"
              onClick={() => setTesti(p => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              aria-label="Previous">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>

            {/* progress bar dots */}
            <div className="testi__progress">
              {TESTIMONIALS.map((_,i)=>(
                <button key={i}
                  className={`testi__pdot ${i===testi?'testi__pdot--on':''}`}
                  onClick={()=>setTesti(i)} aria-label={`Review ${i+1}`}/>
              ))}
            </div>

            <button className="testi__btn testi__btn--filled"
              onClick={() => setTesti(p => (p + 1) % TESTIMONIALS.length)}
              aria-label="Next">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>

        </div>

      </section>

      {/* ══ FAQ ═════════════════════════════════════════ */}
      <FaqSection />

      {/* ══ CONTACT ════════════════════════════════════ */}
      <section id="contact" className="contact">
        <div className="ctr contact__grid">
          <Fade className="contact__left">
            <h2 className="h2">Let's Find Your<br /><span style={{color:'#216721'}}>Perfect Home</span></h2>
            <p className="body-t">Our experts are ready for a free, no-obligation consultation. We respond within 30 minutes.</p>
            <div className="contact__infos">
              {[
                {ic:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41a2 2 0 0 1 1.81-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,l:'Phone',v:'+91 81051 02506'},
                {ic:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,l:'Email',v:'info@Pruthvirealty.com'},
                {ic:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,l:'Office',v:'2nd Floor, 3023 "Prestige Bagamane Temple Bells, Rajarajeshwari Nagar, Javare Gowda Nagar, Bengaluru Urban, Karnataka - 560098'},
                {ic:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,l:'Hours',v:'Mon–Sat  9 AM – 7 PM'},
              ].map(d => (
                <div key={d.l} className="contact__info">
                  <div className="contact__ic">{d.ic}</div>
                  <div><small>{d.l}</small><strong>{d.v}</strong></div>
                </div>
              ))}
            </div>
          </Fade>
          <Fade d={100} className="contact__form-wrap">
            <h3 className="contact__ftitle">Send an Enquiry</h3>
            <form className="contact__form" onSubmit={e => {
              e.preventDefault()
              const f = e.target
              const consent = f.querySelector('[name="cf_consent"]').checked
              const err = validateForm({ name: f[0].value, phone: f[1].value, email: f[2].value, consent: consent ? null : false })
              if (err) { alert(err); return }
              sendEnquiry({
                title: 'Website Enquiry',
                name: f[0].value,
                phone: f[1].value,
                email: f[2].value || 'Not provided',
                interested_in: `${f[3].value || 'Not specified'} | Budget: ${f[4].value || 'Not specified'}`,
                message: f[5].value || '',
              }).then(() => { f.reset(); setThankYou('enquiry') })
                .catch((err) => { console.error('EmailJS error:', err); alert('Something went wrong (' + (err?.text || err?.message || JSON.stringify(err)) + '). Please call +91 81051 02506.') })
            }}>
              <div className="cf-row">
                <div className="cf-g"><label>Full Name *</label><input type="text" placeholder="Your name" required /></div>
                <div className="cf-g"><label>Mobile *</label><input type="tel" placeholder="+91 XXXXX XXXXX" required /></div>
              </div>
              <div className="cf-g"><label>Email</label><input type="email" placeholder="you@email.com" /></div>
              <div className="cf-row">
                <div className="cf-g"><label>Property Type</label><select><option value="">Select type</option><option>Luxury Apartment</option><option>Villa</option><option>Plot</option><option>Commercial</option></select></div>
                <div className="cf-g"><label>Budget</label><select><option value="">Select budget</option><option>Under ₹50L</option><option>₹50L – ₹1Cr</option><option>₹1Cr – ₹3Cr</option><option>Above ₹3Cr</option></select></div>
              </div>
              <div className="cf-g"><label>Message</label><textarea rows={4} placeholder="Tell us what you're looking for..."></textarea></div>
              <label className="hcf__consent" style={{marginTop:4}}>
                <input name="cf_consent" type="checkbox" required />
                <span>I agree to be contacted by <strong>Pruthvirealty Realty</strong> and TVS Emerald's authorized sales team via call, SMS, WhatsApp, or email regarding this enquiry. I have read and agree to the <button type="button" className="hcf__consent-link" onClick={() => setPrivacyOpen(true)}>Privacy Policy</button> and <button type="button" className="hcf__consent-link" onClick={() => setTermsOpen(true)}>Terms of Service</button>.</span>
              </label>
              <button type="submit" className="btn-gold btn-full">Send Enquiry →</button>
            </form>
          </Fade>
        </div>
      </section>

      {/* ══ FOOTER ═════════════════════════════════════ */}
      <footer className="foot">

        {/* ── MAIN FOOTER ── */}
        <div className="foot__main">

          {/* top strip */}
          <div className="foot__top-strip">
            <div className="foot__top-inner">
              <div className="foot__top-left">
                <span className="foot__top-label">Ready to find your dream home?</span>
                <h3 className="foot__top-h3">Book a <span className="foot__top-green">Free Site Visit</span> Today</h3>
              </div>
              <a className="foot__top-cta" href="tel:+918105102506">
                Call Now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41a2 2 0 0 1 1.81-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </a>
            </div>
          </div>

          {/* divider */}
          <div className="foot__divider"/>

          {/* grid */}
          <div className="foot__grid">

            {/* Brand */}
            <div className="foot__brand">
              <img src="/logo_1.png" alt="TVS Emerald Altura" className="foot__logo"/>
              <p className="foot__tagline">
                Premium 2 &amp; 3 BHK residences at TVS Emerald Altura, North Bengaluru — crafted for those who settle for nothing less than the finest.
              </p>
              {/* <div className="foot__rera">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                RERA: <span className="foot__rera-num">PRM/KA/RERA/1251/309/PR/040426/008572</span>
              </div> */}
              <div className="foot__contacts">
                <a href="tel:+918105102506" className="foot__contact-link">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41a2 2 0 0 1 1.81-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  +91 81051 02506
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="foot__col">
              <h4 className="foot__col-h4">Quick Links</h4>
              <ul className="foot__col-list">
                {[['Home','/luxury-apartments-in-bangalore/'],['Amenities','#amenities'],['About Us','#about-us'],['Gallery','#gallery'],['Contact','#contact']].map(([l,h]) => (
                  <li key={l}>
                    <a href={h} className="foot__col-link">
                      <span className="foot__col-dot"/>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Project */}
            <div className="foot__col">
              <h4 className="foot__col-h4">Our Project</h4>
              <div className="foot__project-card">
                <img src="/side-tower-cam.png" alt="TVS Emerald Altura" className="foot__project-img"/>
                <div className="foot__project-body">
                  <p className="foot__project-name">TVS Emerald Altura</p>
                  <p className="foot__project-loc">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    SH 104, Sathanur, North Bengaluru
                  </p>
                  <div className="foot__project-tags">
                    <span>2 BHK</span>
                    <span>3 BHK</span>
                    <span>10 Acres</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="foot__col">
              <h4 className="foot__col-h4">Office Address</h4>
              <p className="foot__addr">
               2nd Floor, 3023 'Prestige Bagamane Temple Bells, Rajarajeshwari Nagar, Javare Gowda Nagar, Bengaluru Urban, Karnataka - 560098
              </p>
              <div className="foot__hours">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Monday to Saturday &nbsp;|&nbsp; 10:00 AM – 7:00 PM IST
              </div>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="foot__map-btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                View on Google Maps
              </a>
            </div>

          </div>
        </div>

        {/* ── DISCLAIMER ── */}
        <div className="foot__disclaimer">
          <div className="foot__disclaimer-in">
            <span className="foot__disclaimer-label">Mandatory Disclosure:</span> Pruthvirealty Realty is the registered trade name of the proprietorship of Pruthvisimha, a RERA-registered real estate agent and authorized non-exclusive channel partner of TVS Emerald Limited. We are not the developer, builder, or owner of any property. We do not collect any booking amounts, advance payments, or sale consideration. All buyer payments must be made directly to the developer through their official channels. Information on this website is indicative, subject to change, and must be verified directly with the developer. Images are for illustrative purposes only.
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="foot__bot">
          <div className="foot__bot-in">
            <span className="foot__copy">© 2026 TVS Emerald Altura by Prop Vruksha Reality. All Rights Reserved.</span>
            <div className="foot__bot-links">
              <button className="foot__policy-btn" onClick={() => setPrivacyOpen(true)}>Privacy Policy</button>
              <span className="foot__bot-sep">·</span>
              <button className="foot__policy-btn" onClick={() => setTermsOpen(true)}>Terms of Service</button>
              <span className="foot__bot-sep">·</span>
              <button className="foot__policy-btn" onClick={() => setRefundOpen(true)}>Refund &amp; Cancellation</button>
            </div>
            <button className="foot__backtop" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 15l-6-6-6 6"/></svg>
            </button>
          </div>
        </div>

      </footer>


      {/* ══ ENQUIRE NOW POPUP ══════════════════════════════ */}
      {enquireOpen && (
        <div className="enq__backdrop" onClick={() => setEnquireOpen(false)}>
          <div className="enq__modal" onClick={e => e.stopPropagation()}>

            {/* close */}
            <button className="enq__close" onClick={() => setEnquireOpen(false)} aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>

            {/* left — image + info */}
            <div className="enq__left">
              <img src="/entrance-cam.png" alt="TVS Emerald Altura" className="enq__img" />
              <div className="enq__img-overlay" />
              <div className="enq__img-info">
                <span className="enq__img-tag">New Launch</span>
                <h3 className="enq__img-title">TVS Emerald Altura</h3>
                <p className="enq__img-loc"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display:'inline',verticalAlign:'middle',marginRight:4}}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> SH 104, Sathanur, North Bengaluru</p>
                <div className="enq__img-stats">
                  <div><strong>975</strong><span>Units</span></div>
                  <div><strong>12</strong><span>Towers</span></div>
                  <div><strong>10.06</strong><span>Acres</span></div>
                </div>
              </div>
            </div>

            {/* right — form */}
            <div className="enq__right">
              <span className="enq__eyebrow">Free Consultation</span>
              <h2 className="enq__title">Get <span className="enq__gold">Expert Advice</span></h2>
              <p className="enq__sub">Our team responds within 30 minutes. No obligation, just honest guidance.</p>

              <form className="enq__form" onSubmit={e => { e.preventDefault(); setEnquireOpen(false) }}>
                <div className="enq__row">
                  <div className="enq__field">
                    <label>Full Name *</label>
                    <input type="text" placeholder="Your full name" required />
                  </div>
                  <div className="enq__field">
                    <label>Mobile Number *</label>
                    <input type="tel" placeholder="+91 XXXXX XXXXX" required />
                  </div>
                </div>
                <div className="enq__field">
                  <label>Email Address</label>
                  <input type="email" placeholder="your@email.com" />
                </div>
                <div className="enq__row">
                  <div className="enq__field">
                    <label>Configuration</label>
                    <select>
                      <option value="">Select type</option>
                      <option>2 BHK Classic</option>
                      <option>2 BHK Premium</option>
                      <option>3 BHK Classic</option>
                      <option>3 BHK Premium</option>
                      <option>3 BHK Luxe + Staff</option>
                    </select>
                  </div>
                  <div className="enq__field">
                    <label>Budget</label>
                    <select>
                      <option value="">Select budget</option>
                      <option>₹1Cr – ₹1.5Cr</option>
                      <option>₹1.5Cr – ₹2Cr</option>
                      <option>₹2Cr – ₹2.5Cr</option>
                      <option>Above ₹2.5Cr</option>
                    </select>
                  </div>
                </div>
                <div className="enq__field">
                  <label>Message (Optional)</label>
                  <textarea rows={3} placeholder="Any specific requirements..."></textarea>
                </div>
                <button type="submit" className="enq__submit">
                  Request Free Callback →
                </button>
              </form>
            </div>

          </div>
        </div>
      )}

      {/* ══ BOOK A SITE VISIT POPUP ══════════════════════ */}
      {siteVisitOpen && (
        <div className="bsv__backdrop" onClick={() => setSiteVisitOpen(false)}>
          <div className="bsv__modal" onClick={e => e.stopPropagation()}>
            <div className="bsv__left">
              <img src="/entrance-lobby.png" alt="TVS Emerald Altura" className="bsv__img"/>
              <div className="bsv__img-overlay"/>
              <div className="bsv__img-info">
                <span className="bsv__img-tag">New Launch</span>
                <h3 className="bsv__img-title">TVS Emerald Altura</h3>
                <p className="bsv__img-loc"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display:'inline',verticalAlign:'middle',marginRight:4}}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> SH 104, Sathanur, North Bengaluru</p>
                {/* <p className="bsv__img-rera">RERA: PRM/KA/RERA/1251/309/PR/040426/008572</p> */}
              </div>
            </div>

            <div className="bsv__right">
              <button className="bsv__close" onClick={() => setSiteVisitOpen(false)} aria-label="Close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
              <span className="bsv__eyebrow">Schedule a Visit</span>
              <h2 className="bsv__title">Book a <span className="bsv__gold">Site Visit</span></h2>
              <p className="bsv__sub">Our experts will guide you through the project. Fill in your details and we'll confirm your slot.</p>

              <form className="bsv__form" onSubmit={e => {
                e.preventDefault()
                const f = e.target
                const consent = f.querySelector('[name="bsv_consent"]').checked
                const err = validateForm({ name: f[0].value, phone: f[1].value, email: f[2].value, consent: consent ? null : false })
                if (err) { alert(err); return }
                sendEnquiry({
                  title: 'Site Visit Booking',
                  name: f[0].value,
                  phone: f[1].value,
                  email: f[2].value || 'Not provided',
                  date: f[3].value || 'Not specified',
                  interested_in: f[4].value || 'Not specified',
                  message: f[5].value || '',
                }).then(() => { setSiteVisitOpen(false); setThankYou('sitevisit') })
                  .catch((err) => { console.error('EmailJS error:', err); alert('Something went wrong (' + (err?.text || err?.message || JSON.stringify(err)) + '). Please call +91 81051 02506.') })
              }}>
                <div className="bsv__row">
                  <div className="bsv__field">
                    <label>Full Name</label>
                    <input type="text" placeholder="Your full name" required />
                  </div>
                  <div className="bsv__field">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="+91 XXXXX XXXXX" required />
                  </div>
                </div>
                <div className="bsv__row">
                  <div className="bsv__field">
                    <label>Email Address</label>
                    <input type="email" placeholder="your@email.com" />
                  </div>
                  <div className="bsv__field">
                    <label>Preferred Date</label>
                    <input type="date" />
                  </div>
                </div>
                <div className="bsv__field">
                  <label>Interested In</label>
                  <select>
                    <option value="">Select configuration</option>
                    <option>2 BHK – 1100 to 1200 sq.ft</option>
                    <option>3 BHK (2T) – 1510 to 1588 sq.ft</option>
                    <option>3 BHK (3T) – 1898 sq.ft</option>
                    <option>3 BHK + Servant Quarter – 2123 sq.ft</option>
                  </select>
                </div>
                <div className="bsv__field">
                  <label>Message (Optional)</label>
                  <textarea rows={3} placeholder="Any specific requirements or questions..."/>
                </div>
                <label className="hcf__consent" style={{marginTop:4}}>
                  <input name="bsv_consent" type="checkbox" required />
                  <span>I agree to be contacted by <strong>Pruthvirealty Realty</strong> and TVS Emerald's authorized sales team via call, SMS, WhatsApp, or email regarding this enquiry. I have read and agree to the <button type="button" className="hcf__consent-link" onClick={() => setPrivacyOpen(true)}>Privacy Policy</button> and <button type="button" className="hcf__consent-link" onClick={() => setTermsOpen(true)}>Terms of Service</button>.</span>
                </label>
                <button type="submit" className="bsv__submit">
                  Confirm Site Visit →
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ══ CAB POPUP — appears after 20s ══════════════════ */}
      {cabPopupOpen && (
        <div className="cab__backdrop">
          <div className="cab__modal">

            <button className="cab__close" onClick={() => { setCabPopupOpen(false); setCabDismissed(true) }} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>

            {/* top image strip */}
            <div className="cab__img-wrap">
              <img src="/elevation-landscape-cam.png" alt="TVS Emerald Altura" className="cab__img" />
              <div className="cab__img-overlay" />
              <div className="cab__img-badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                SH 104, Sathanur, North Bengaluru
              </div>
            </div>

            {/* offer pill */}
            <div className="cab__offer-pill">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              FREE CAB RIDE OFFER
            </div>

            <div className="cab__body">
              <h2 className="cab__title">Book a <span className="cab__title-green">Site Visit</span></h2>
              <p className="cab__sub">Get a <strong>complimentary cab ride</strong> to TVS Emerald Altura. Experience the project firsthand — zero cost, zero hassle.</p>

              <form className="cab__form" onSubmit={e => {
                e.preventDefault()
                const f = e.target
                const consent = f.querySelector('[name="cab_consent"]').checked
                const err = validateForm({ name: f[0].value, phone: f[1].value, consent: consent ? null : false })
                if (err) { alert(err); return }
                emailjs.send(EJS_SVC, EJS_TPL_CAB, {
                  name: f[0].value,
                  phone: f[1].value,
                  time: new Date().toLocaleString(),
                }, EJS_KEY)
                .then(() => { setCabPopupOpen(false); setCabDismissed(true); setThankYou('cab') })
                  .catch((err) => { console.error('EmailJS error:', err); alert('Something went wrong (' + (err?.text || err?.message || JSON.stringify(err)) + '). Please call +91 81051 02506.') })
              }}>
                <div className="cab__field">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                  <input type="text" placeholder="Your Full Name" required />
                </div>
                <div className="cab__field">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41a2 2 0 0 1 1.81-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <input type="tel" placeholder="Phone Number" required />
                </div>
                <label className="hcf__consent" style={{marginTop:4}}>
                  <input name="cab_consent" type="checkbox" required />
                  <span>I agree to be contacted by <strong>Pruthvirealty Realty</strong> and TVS Emerald's authorized sales team via call, SMS, WhatsApp, or email regarding this enquiry. I have read and agree to the <button type="button" className="hcf__consent-link" onClick={() => setPrivacyOpen(true)}>Privacy Policy</button> and <button type="button" className="hcf__consent-link" onClick={() => setTermsOpen(true)}>Terms of Service</button>.</span>
                </label>
                <button type="submit" className="cab__submit">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  Book My Free Site Visit
                </button>
              </form>

              <p className="cab__note">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                100% Free · No hidden charges · Limited slots available
              </p>
            </div>

          </div>
        </div>
      )}

      {/* ══ DLX LEAD GATE POPUP ════════════════════════════ */}
      {dlxGate && (
        <div className="dlx__gate-backdrop" onClick={() => setDlxGate(null)}>
          <div className="dlx__gate-modal" onClick={e => e.stopPropagation()}>

            <button className="dlx__gate-close" onClick={() => setDlxGate(null)} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>

            <div className="dlx__gate-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#216721" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
            </div>

            <h3 className="dlx__gate-title">Download <span className="dlx__gate-title-green">{dlxGate.label}</span></h3>
            <p className="dlx__gate-sub">Enter your details below to access the {dlxGate.label} for TVS Emerald Altura.</p>

            <form className="dlx__gate-form" onSubmit={e => {
              e.preventDefault()
              const err = validateForm({ name: dlxName, phone: dlxPhone, consent: dlxConsent ? null : false })
              if (err) { alert(err); return }
              emailjs.send(EJS_SVC, EJS_TPL_DLX, {
                name: dlxName,
                phone: dlxPhone,
                time: new Date().toLocaleString(),
              }, EJS_KEY).finally(() => {
                window.open(dlxGate.file, '_blank', 'noopener,noreferrer')
                setDlxGate(null)
              })
            }}>
              <div className="dlx__gate-field">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                <input
                  type="text"
                  placeholder="Your Full Name"
                  required
                  value={dlxName}
                  onChange={e => setDlxName(e.target.value)}
                />
              </div>
              <div className="dlx__gate-field">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41a2 2 0 0 1 1.81-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  pattern="[0-9]{10}"
                  title="Enter a valid 10-digit phone number"
                  value={dlxPhone}
                  onChange={e => setDlxPhone(e.target.value)}
                />
              </div>
              <label className="hcf__consent" style={{marginTop:4}}>
                <input type="checkbox" checked={dlxConsent} onChange={e => setDlxConsent(e.target.checked)} required />
                <span>I agree to be contacted by <strong>Pruthvirealty Realty</strong> and TVS Emerald's authorized sales team via call, SMS, WhatsApp, or email regarding this enquiry. I have read and agree to the <button type="button" className="hcf__consent-link" onClick={() => setPrivacyOpen(true)}>Privacy Policy</button> and <button type="button" className="hcf__consent-link" onClick={() => setTermsOpen(true)}>Terms of Service</button>.</span>
              </label>
              <button type="submit" className="dlx__gate-submit">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                Download {dlxGate.label}
              </button>
            </form>

            <p className="dlx__gate-note">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Your information is secure and will not be shared.
            </p>

          </div>
        </div>
      )}

      {/* ══ REFUND & CANCELLATION POLICY ══════════════════ */}
      {refundOpen && (
        <div className="pp__backdrop" onClick={() => setRefundOpen(false)}>
          <div className="pp__modal" onClick={e => e.stopPropagation()}>

            <div className="pp__header">
              <div>
                <h2 className="pp__title">Refund &amp; Cancellation Policy</h2>
                <p className="pp__meta">Effective Date: 28 April 2026 &nbsp;|&nbsp; Last Updated: 28 April 2026</p>
              </div>
              <button className="pp__close" onClick={() => setRefundOpen(false)} aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            <div className="pp__body">

              <p className="pp__intro">Pruthvirealty Realty is the registered trade name of the proprietorship business owned by <strong>Pruthvisimha</strong>, a RERA-registered real estate agent. This policy explains how refunds and cancellations work for services we directly provide.</p>

              <div className="pp__section">
                <h3 className="pp__s-title">1. Our Role and Service Type</h3>
                <p className="pp__s-body">Pruthvirealty Realty operates as an authorized channel partner. We are not the developer, builder, owner, or seller of any property. We do not collect booking amounts or any property-related payment from buyers. Our direct services to website visitors are <strong>free of cost</strong> and include:</p>
                <ul className="pp__list" style={{marginTop:'8px'}}>
                  {['Providing property information and project details','Forwarding qualified enquiries to authorized developers','Coordinating site visits','Offering general guidance during property selection'].map(i => <li key={i}>{i}</li>)}
                </ul>
                <p className="pp__s-body" style={{marginTop:'8px'}}>Since we do not charge website visitors for these services, no refund or cancellation typically applies on our end.</p>
              </div>

              <div className="pp__section">
                <h3 className="pp__s-title">2. Property Booking Payments — Handled by the Developer</h3>
                <p className="pp__s-body"><strong>Critical Disclosure:</strong> All booking amounts, token payments, advance payments, EMIs, and full sale consideration must be paid directly to the developer through their official payment channels. <strong>Do not transfer any money to Pruthvirealty Realty for property bookings.</strong></p>
                <p className="pp__s-body" style={{marginTop:'8px'}}>Cancellation and refund of any amount paid to a developer is governed entirely by the booking agreement, developer's internal policy, RERA 2016, and Karnataka RERA Rules 2017. Pruthvirealty Realty has no authority or liability over the developer's refund timelines.</p>
              </div>

              <div className="pp__section">
                <h3 className="pp__s-title">3. Paid Services — Refund Eligibility</h3>
                <div className="pp__table">
                  <div className="pp__table-head">
                    <span>Service Type</span><span>Refund Eligibility</span><span>Refund Window</span>
                  </div>
                  {[
                    ['Property advisory consultation','Refundable if cancelled before service delivery','Within 7 days'],
                    ['Site visit coordination (paid)','Refundable if site visit not conducted','Within 14 days'],
                    ['Documentation assistance','Non-refundable once work has commenced','Within 7 days if not started'],
                    ['Subscription / premium membership','Pro-rata refund for unused period','Within 30 days'],
                  ].map(([a,b,c],i) => (
                    <div key={i} className="pp__table-row">
                      <span>{a}</span><span>{b}</span><span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pp__section">
                <h3 className="pp__s-title">4. How to Request a Refund (Paid Services Only)</h3>
                <ul className="pp__list">
                  <li>Email <strong>info@Pruthvirealty.com</strong> with subject "Refund Request"</li>
                  <li>Include your full name, contact number, payment reference, date of payment, and reason</li>
                  <li>Attach a copy of the payment receipt or invoice</li>
                  <li>We will acknowledge within 2 business days</li>
                  <li>Approved refunds processed within 7–10 business days to the original payment method</li>
                </ul>
              </div>

              <div className="pp__section">
                <h3 className="pp__s-title">5. Non-Refundable Situations</h3>
                <ul className="pp__list">
                  {['Service has been fully delivered and consumed','Refund request is made beyond the eligible window','Property booking refunds (handled by the developer, not us)','Any payment made directly to a developer or third party','Disputes regarding property quality, possession delays, or construction issues'].map(i => <li key={i}>{i}</li>)}
                </ul>
              </div>

              {[
                { n:'6', title:'Cancellation of Enquiries and Site Visits', body:'You may cancel a scheduled site visit or withdraw your enquiry at any time, free of charge, by calling +91 81051 02506, emailing info@Pruthvirealty.com, or replying "STOP" to any of our communications. We will inform the relevant developer to discontinue follow-ups.' },
                { n:'7', title:'Data Deletion Requests', body:'If you wish to have your enquiry data deleted, write to info@Pruthvirealty.com. We will process deletion requests within 30 days, in accordance with our Privacy Policy and applicable data protection laws.' },
                { n:'8', title:'Disputes Related to Developer Transactions', body:'For disputes regarding property bookings, allotment, possession delays, or refund of booking amounts, first raise the matter directly with the developer. If unresolved, file a complaint with the Karnataka Real Estate Regulatory Authority (K-RERA) at rera.karnataka.gov.in. Consumer disputes may also be raised with the consumer forum under the Consumer Protection Act, 2019.' },
                { n:'9', title:'Modification of Policy', body:'We reserve the right to modify this policy at any time. Updated terms will be posted on this page with a revised "Last Updated" date.' },
                { n:'10', title:'Governing Law', body:'This policy is governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts at Bengaluru, Karnataka.' },
              ].map(s => (
                <div key={s.n} className="pp__section">
                  <h3 className="pp__s-title">{s.n}. {s.title}</h3>
                  <p className="pp__s-body">{s.body}</p>
                </div>
              ))}

              <div className="pp__contact-box">
                <h3 className="pp__s-title">11. Contact for Refund Queries</h3>
                <p><strong>Pruthvirealty Realty</strong> (Proprietor: Pruthvisimha)</p>
                {/* <p>RERA Reg No: <span className="pp__hl">PRM/KA/RERA/1251/310/AG/250627/005895</span></p> */}
                <p>GSTIN: 29ENCPP5700D1Z4</p>
                <p style={{marginTop:'8px'}}>2nd Floor, 3023 'Prestige Bagamane Temple Bells, Rajarajeshwari Nagar, Javare Gowda Nagar, Bengaluru Urban Karnataka - 560098</p>
                <p>Email: info@Pruthvirealty.com &nbsp;|&nbsp; Phone: +91 81051 02506</p>
                <p>Working Hours: Monday to Saturday, 10:00 AM – 7:00 PM IST</p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ══ TERMS OF SERVICE ══════════════════════════════ */}
      {termsOpen && (
        <div className="pp__backdrop" onClick={() => setTermsOpen(false)}>
          <div className="pp__modal" onClick={e => e.stopPropagation()}>

            <div className="pp__header">
              <div>
                <h2 className="pp__title">Terms of Service</h2>
                <p className="pp__meta">Effective Date: 28 April 2026 &nbsp;|&nbsp; Last Updated: 28 April 2026</p>
              </div>
              <button className="pp__close" onClick={() => setTermsOpen(false)} aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            <div className="pp__body">

              <p className="pp__intro">Pruthvirealty Realty is the registered trade name of the proprietorship business owned by <strong>Pruthvisimha</strong>, a RERA-registered real estate agent in Karnataka, India. By accessing or using our website and services, you agree to be bound by these Terms of Service.</p>

              {[
                { n:'1', title:'Acceptance of Terms', body:'By visiting www.Pruthvirealty.com, submitting an enquiry, or using any service offered by Pruthvirealty Realty, you confirm that you have read, understood, and agreed to these Terms of Service and our Privacy Policy. If you do not agree, please do not use our Website or Services.' },
                { n:'2', title:'About Our Role', body:'Important Disclosure: Pruthvirealty Realty is an authorized channel partner facilitating property enquiries for TVS Emerald and other listed real estate developers. We are NOT the developer, builder, owner, or seller of any property. Our role is limited to providing project information, forwarding qualified enquiries to developers, coordinating site visits, and offering general guidance.' },
                { n:'4', title:'Property Information and Accuracy', body:'All property details, images, pricing, payment plans, amenities, and possession dates shown on our Website are provided by the respective developers. All information is indicative and subject to change at the developer\'s sole discretion. Final terms must be confirmed directly with the developer before any booking or payment.' },
                { n:'5', title:'Enquiries and Lead Forwarding', body:'When you submit an enquiry, your contact details are forwarded to the relevant developer\'s authorized sales team. All booking discussions, agreements, and payments are conducted directly between you and the developer. Pruthvirealty Realty is not a party to any sale agreement or payment between you and the developer.' },
                { n:'6', title:'No Financial Transactions Through Us', body:'Pruthvirealty Realty does not collect any booking amount, token amount, advance payment, or sale consideration from buyers. Any payment for a property must be made directly to the developer through official channels. Do not transfer any money to Pruthvirealty Realty for property bookings under any circumstances.' },
                { n:'7', title:'RERA Compliance', body:'As a RERA-registered real estate agent, Pruthvirealty Realty operates in compliance with the Real Estate (Regulation and Development) Act, 2016, the Karnataka RERA Rules, 2017, and all guidelines issued by K-RERA. All projects featured on our Website are registered under RERA.' },
                { n:'8', title:'Intellectual Property', body:'All content on the Website, including the Pruthvirealty Realty brand name, logo, design, text, and graphics, is owned by Pruthvisimha or licensed to us, and is protected under Indian intellectual property laws. You may not reproduce, distribute, or modify any content without prior written permission.' },
                { n:'9', title:'Third-Party Content and Links', body:'Our Website may contain links to developer websites, property portals, and social media platforms. We do not control or assume responsibility for any third-party content. Use of such sites is at your own risk.' },
                { n:'10.2', title:'Limitation of Liability', body:'To the maximum extent permitted by law, Pruthvirealty Realty shall not be liable for any damages arising from your use of the Website, inaccuracy in developer-provided information, any transaction between you and the developer, possession delays, project cancellation, or unauthorized access to your data.' },
                { n:'11', title:'Privacy', body:'Your use of the Website is governed by our Privacy Policy, which explains how we collect, use, and protect your personal information. By using the Website, you consent to the practices described in the Privacy Policy.' },
                { n:'14', title:'Governing Law and Jurisdiction', body:'These Terms of Service are governed by the laws of India. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts at Bengaluru, Karnataka.' },
                { n:'15', title:'Dispute Resolution', body:'In case of any dispute, the parties shall first attempt to resolve the matter amicably. If unresolved within 30 days, the dispute shall be referred to arbitration under the Arbitration and Conciliation Act, 1996, with the seat of arbitration at Bengaluru, Karnataka.' },
                { n:'16', title:'Severability', body:'If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.' },
              ].map(s => (
                <div key={s.n} className="pp__section">
                  <h3 className="pp__s-title">{s.n}. {s.title}</h3>
                  <p className="pp__s-body">{s.body}</p>
                </div>
              ))}

              <div className="pp__section">
                <h3 className="pp__s-title">3. Use of the Website</h3>
                <p className="pp__s-body">You must be at least 18 years of age and legally capable of entering into a binding contract to use our Services. You agree not to:</p>
                <ul className="pp__list" style={{marginTop:'8px'}}>
                  {['Submit false, misleading, or fraudulent information','Impersonate any person or entity','Use automated bots or scrapers to extract data','Interfere with or disrupt the Website\'s functionality','Upload viruses or malicious code','Use the Website for any commercial purpose without our consent','Violate any applicable Indian or international law'].map(i => <li key={i}>{i}</li>)}
                </ul>
              </div>

              <div className="pp__section">
                <h3 className="pp__s-title">10.3. Indemnity</h3>
                <p className="pp__s-body">You agree to indemnify and hold harmless Pruthvirealty Realty, its proprietor, and representatives from any claims, damages, losses, or expenses arising from your violation of these Terms or your use of the Website.</p>
              </div>

              <div className="pp__contact-box">
                <h3 className="pp__s-title">17. Contact Information</h3>
                <p><strong>Pruthvirealty Realty</strong> (Proprietor: Pruthvisimha)</p>
                {/* <p>RERA Reg No: <span className="pp__hl">PRM/KA/RERA/1251/310/AG/250627/005895</span></p> */}
                <p>GSTIN: 29ENCPP5700D1Z4</p>
                <p style={{marginTop:'8px'}}>301, 3rd Floor, Sri Yogeshwara Apartment, Hoskerehalli, BSK 3rd Stage, Bengaluru – 560085</p>
                <p>Email: info@Pruthvirealty.com &nbsp;|&nbsp; Phone: +91 81051 02506</p>
                <p>Working Hours: Monday to Saturday, 10:00 AM – 7:00 PM IST</p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ══ PRIVACY POLICY PAGE ════════════════════════════ */}
      {privacyOpen && (
        <div className="pp__backdrop" onClick={() => setPrivacyOpen(false)}>
          <div className="pp__modal" onClick={e => e.stopPropagation()}>

            <div className="pp__header">
              <div>
                <h2 className="pp__title">Privacy Policy</h2>
                <p className="pp__meta">Effective Date: 28 April 2026 &nbsp;|&nbsp; Last Updated: 28 April 2026</p>
              </div>
              <button className="pp__close" onClick={() => setPrivacyOpen(false)} aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            <div className="pp__body">

              <p className="pp__intro">Pruthvirealty Realty is the registered trade name of the proprietorship business owned by <strong>Pruthvisimha</strong>, a RERA-registered real estate agent in Karnataka, India. This Privacy Policy explains how we collect, use, store, and protect your personal information.</p>

              {[
                { n:'1', title:'Introduction', body:'Pruthvirealty Realty respects your privacy and is committed to protecting your personal data. This Privacy Policy outlines our practices in compliance with the Information Technology Act, 2000, the IT (Reasonable Security Practices) Rules, 2011, and the Digital Personal Data Protection Act, 2023 of India.' },
                { n:'2', title:'Who We Are', body:'We are an authorized channel partner facilitating property enquiries for TVS Emerald and other listed real estate developers. We are not the developer or builder of any property. Our role is limited to lead generation, property enquiry facilitation, site visit coordination, and customer support.' },
                { n:'4', title:'How We Use Your Information', body:'To respond to your property enquiries and callback requests. To share relevant property options matching your preferences. To coordinate site visits with the developer\'s sales team. To send updates about new launches and offers (only if opted in). To improve our website and customer experience. To comply with RERA and legal obligations. To prevent fraud and maintain security.' },
                { n:'5.4', title:'We Do Not Sell Your Data', body:'We do not sell, rent, or trade your personal information to third parties for their marketing purposes.' },
                { n:'6', title:'Cookies and Tracking', body:'Our website uses essential cookies, analytics cookies (Google Analytics), and advertising cookies (Google Ads, Meta Pixel). You can disable cookies through your browser settings, although some website features may not work as expected.' },
                { n:'7', title:'Data Retention', body:'We retain your personal information only for as long as necessary to fulfil the purposes outlined in this policy. Enquiry data is typically retained for 24 months unless you request earlier deletion.' },
                { n:'8', title:'Data Security', body:'We implement industry-standard security measures including SSL encryption, secure servers, access controls, and regular security audits to protect your personal information.' },
                { n:'10', title:'Marketing Communications', body:'By submitting an enquiry, you consent to receive communications from us and the relevant developer. You can opt out of marketing emails or WhatsApp messages at any time by replying "STOP" or contacting us directly.' },
                { n:'12', title:'Children\'s Privacy', body:'Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from minors.' },
                { n:'13', title:'Changes to This Policy', body:'We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised "Last Updated" date. Continued use of our website after changes indicates your acceptance.' },
              ].map(s => (
                <div key={s.n} className="pp__section">
                  <h3 className="pp__s-title">{s.n}. {s.title}</h3>
                  <p className="pp__s-body">{s.body}</p>
                </div>
              ))}

              <div className="pp__section">
                <h3 className="pp__s-title">3. Information We Collect</h3>
                <p className="pp__s-body pp__s-sub">Personal information you provide:</p>
                <ul className="pp__list">
                  {['Full name','Phone number and WhatsApp number','Email address','City and locality of interest','Budget range and property preferences','Any other information you voluntarily share through enquiry forms'].map(i => <li key={i}>{i}</li>)}
                </ul>
                <p className="pp__s-body pp__s-sub" style={{marginTop:'10px'}}>Automatically collected information:</p>
                <ul className="pp__list">
                  {['IP address and approximate location','Browser type and version','Device information','Pages visited, time spent, and click patterns','Cookies and similar tracking technologies'].map(i => <li key={i}>{i}</li>)}
                </ul>
              </div>

              <div className="pp__section">
                <h3 className="pp__s-title">9. Your Rights</h3>
                <ul className="pp__list">
                  {['Access the personal information we hold about you','Request correction of inaccurate or incomplete data','Request deletion of your personal data','Withdraw consent for marketing communications','Opt out of cookies and tracking','Lodge a complaint with the appropriate data protection authority'].map(i => <li key={i}>{i}</li>)}
                </ul>
              </div>

              <div className="pp__contact-box">
                <h3 className="pp__s-title">14. Contact Us</h3>
                <p><strong>Pruthvirealty Realty</strong> (Proprietor: Pruthvisimha)</p>
                {/* <p>RERA Reg No: <span className="pp__hl">PRM/KA/RERA/1251/310/AG/250627/005895</span></p> */}
                <p>GSTIN: 29ENCPP5700D1Z4</p>
                <p style={{marginTop:'8px'}}>2nd Floor, 3023 'Prestige Bagamane Temple Bells, Rajarajeshwari Nagar, Javare Gowda Nagar, Bengaluru Urban Karnataka - 560098</p>
                <p>Email: info@Pruthvirealty.com &nbsp;|&nbsp; Phone: +91 81051 02506</p>
                <p>Working Hours: Monday to Saturday, 10:00 AM – 7:00 PM IST</p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ══ THANK YOU MODAL ══════════════════════════════ */}
      {thankYou && (
        <div className="ty__backdrop" onClick={() => setThankYou(null)}>
          <div className="ty__modal" onClick={e => e.stopPropagation()}>
            <div className="ty__icon">
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#216721" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h2 className="ty__title">Thank You!</h2>
            <p className="ty__msg">
              {thankYou === 'sitevisit' && 'Your site visit has been booked successfully. Our team will call you shortly to confirm your slot.'}
              {thankYou === 'cab' && 'Your free cab ride is booked! Our team will call you to confirm the pick-up details.'}
              {thankYou === 'enquiry' && 'Your enquiry has been received. Our team will get back to you within 30 minutes.'}
            </p>
            <p className="ty__phone">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41a2 2 0 0 1 1.81-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Or call us: <a href="tel:+918105102506">+91 81051 02506</a>
            </p>
            <button className="ty__close" onClick={() => setThankYou(null)}>Close</button>
          </div>
        </div>
      )}

    </div>
  )
}
