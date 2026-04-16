import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const donationAmounts = [10, 20, 50, 100]

const impactAmounts = [
  { amount: '£10', text: 'can support a homeless person with food for 2 nights.' },
  { amount: '£20', text: 'can help 3 homeless people with food for 2 nights and help support people in an emergency crisis.' },
  { amount: '£50', text: 'can help give a homeless person a place to sleep for 1 night, with food and essentials, along with helping someone in urgent crisis.' },
]

const impactCards = [
  { title: 'Urgent support with dignity', text: 'We respond when people are in immediate need, helping reduce pressure fast with practical, affirming support rooted in safety, care, and community.' },
  { title: 'Community that shows up', text: 'We help people feel less alone by creating safer spaces, meaningful connections, and support that recognises lived experience.' },
  { title: 'Inclusive by design', text: 'Our work centres LGBTQ+ individuals, People of Colour, and disabled people, recognising barriers and responding with compassion and respect.' },
  { title: 'Hope, stability, and belonging', text: 'We help people regain confidence, safety, and a stronger sense of belonging through grants, support, and community-led care.' },
]

const teamItems = [
  { name: 'Avani', role: "CEO's Personal Assistant", description: 'Executive support, scheduling, coordination, and communications assistance.', image: '/avani.jpg' },
  { name: '', role: 'CEO', description: 'Organisation leadership, strategy, partnerships, and overall direction.', image: '' },
  { name: 'Marie-Claire', role: 'Events Manager', description: 'Planning and delivering community events, awareness activity, and fundraising initiatives.', image: '/marie.jpg' },
  { name: 'Kamila', role: 'Social Media Manager', description: 'Digital communications, social content, campaigns, and online community engagement.', image: '/kamila.jpg' },
  { name: '', role: 'Finance Manager', description: 'Financial oversight, budgeting, donation administration, and financial processes.', image: '' },
]

const faqItems = [
  { q: 'Who can apply for support or a grant?', a: 'Applicants should be UK-based and either aged 16 or over, or have parental consent. Where someone is under 16, a parent or carer must sign on their behalf.' },
  { q: 'How quickly will I receive a response?', a: 'We aim to respond within 2–4 hours for emergencies and within 24–48 hours for non-emergencies, depending on demand and capacity.' },
  { q: 'Is my information kept private?', a: 'We aim to handle requests with care, respect, and confidentiality, while also acting where safeguarding concerns mean extra steps may be needed to protect someone’s wellbeing.' },
]

const testimonialItems = [
  { quote: 'Pride Mutual Aid & Support treated me with kindness and urgency at a time when I felt completely overwhelmed. The support I received made an immediate difference and reminded me that I was not alone.', by: 'Support recipient' },
  { quote: 'What stood out most was how respectful and inclusive the organisation felt from the first contact. Their approach is practical, compassionate, and genuinely community-led.', by: 'Community member' },
  { quote: 'I have seen first-hand how quickly this team responds when someone is in crisis. Their work fills real gaps and provides support with dignity.', by: 'Community partner' },
]

const placeholderNews = ['Future community update', 'Future funding appeal', 'Future service announcement']
const placeholderEvents = ['Future community event', 'Future fundraiser or awareness event', 'Future peer support session']
const placeholderJobs = ['Future role opening', 'Future role opening', 'Future role opening']

function SectionShell({ eyebrow, title, intro, children }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{eyebrow}</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        {intro ? <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{intro}</p> : null}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [involvedOpen, setInvolvedOpen] = useState(false)
  const [selectedDonation, setSelectedDonation] = useState(20)
  const [donationType, setDonationType] = useState('one-off')
  const dropdownRef = useRef(null)

  const pages = useMemo(() => ([
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'impact', label: 'Impact' },
    { id: 'support', label: 'Support' },
    { id: 'grants', label: 'Grants' },
    { id: 'team', label: 'Team' },
    { id: 'news', label: 'News' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'contact', label: 'Contact' },
  ]), [])

  const getInvolvedPages = useMemo(() => ([
    { id: 'volunteer', label: 'Volunteer' },
    { id: 'events', label: 'Events' },
    { id: 'jobs', label: 'Jobs' },
  ]), [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setInvolvedOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    window.$crisp = window.$crisp || []
    window.CRISP_WEBSITE_ID = '24e13067-bcc5-4bc2-b9f1-978ca26a3e01'

    if (document.getElementById('crisp-chat-script')) return

    const script = document.createElement('script')
    script.src = 'https://client.crisp.chat/l.js'
    script.async = true
    script.id = 'crisp-chat-script'
    document.head.appendChild(script)
  }, [])

  const involvedLabel = getInvolvedPages.find((p) => p.id === currentPage)?.label

  const navigateTo = (page) => {
    setCurrentPage(page)
    setMenuOpen(false)
    setInvolvedOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function NavButton({ id, label }) {
    return (
      <button onClick={() => navigateTo(id)} className={`text-sm transition ${currentPage === id ? 'font-semibold text-slate-950' : 'text-slate-700 hover:text-slate-950'}`}>
        {label}
      </button>
    )
  }

  const renderHome = () => (
    <>
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fffaf6_45%,#ffffff_100%)]">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-pink-500 via-orange-400 via-cyan-400 to-violet-500" />
        <div className="absolute left-0 top-20 h-64 w-64 rounded-full bg-pink-200/30 blur-3xl" />
        <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="relative z-10 flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit rounded-full border border-pink-200 bg-white px-3 py-1 text-sm font-medium text-pink-700 shadow-soft">
              Vital LGBTQ+ support rooted in dignity, care, and community
            </div>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">Practical help when people need it most — and a community that stands beside you.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">Pride Mutual Aid &amp; Support exists to help LGBTQ+ individuals facing hardship through urgent practical support, community connection, and safe spaces where people feel valued, supported, and understood.</p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">We work to reduce financial stress, address social isolation, and ensure that no one in our community has to face difficult times alone. Donations are vital. They allow us to act quickly, respond with care, and ensure no one has to face crisis alone.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => navigateTo('donate')} className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-slate-800">Donate now</button>
              <button onClick={() => navigateTo('support')} className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-soft hover:bg-slate-50">Get support</button>
              <button onClick={() => navigateTo('grants')} className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-soft hover:bg-slate-50">Apply for a grant</button>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-600">
              {['UK donations in GBP', 'One-off and monthly giving', 'Crisp live chat included'].map((item) => <span key={item} className="rounded-full border border-slate-200 bg-white px-4 py-2 shadow-soft">{item}</span>)}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-strong">
            <div className="aspect-[4/3] bg-[linear-gradient(135deg,rgba(236,72,153,0.10),rgba(255,255,255,1)_35%,rgba(34,211,238,0.10))] p-6 sm:p-8">
              <div className="grid h-full gap-4 rounded-[1.5rem] border border-white/80 bg-white/80 p-4 shadow-soft backdrop-blur-sm sm:grid-cols-[1.05fr_0.95fr] sm:p-6">
                <div className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white"><img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=900&q=80" className="h-full w-full object-cover" alt="Community support" /></div>
                <div className="grid gap-4">
                  <div className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white"><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80" className="h-full w-full object-cover" alt="Community event" /></div>
                  <div className="rounded-[1.25rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-soft">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Urgent support</p>
                    <p className="mt-4 text-3xl font-bold">2–4 hrs</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">target response time for emergencies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: 'Get support', text: 'Reach out if you need practical help, signposting, or support during a difficult time.', page: 'support' },
            { title: 'Apply for a grant', text: 'Request financial support through a clear and respectful application process.', page: 'grants' },
            { title: 'Get involved', text: 'Volunteer, attend future events, or explore opportunities to support our work.', page: 'volunteer' },
          ].map((item, index) => (
            <div key={item.title} className="group rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft transition hover:-translate-y-1 hover:shadow-strong">
              <div className={`h-1.5 w-20 rounded-full ${index === 0 ? 'bg-pink-500' : index === 1 ? 'bg-amber-400' : 'bg-cyan-500'}`} />
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-600">{item.text}</p>
              <button onClick={() => navigateTo(item.page)} className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-soft hover:bg-slate-800">Learn more</button>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-strong sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Real impact</p>
              <h3 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Show the scale of your work clearly and confidently</h3>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">This section is designed to become one of the strongest trust-builders on the site. Replace these preview numbers with your real figures before publishing so visitors can quickly understand your reach, urgency, and community impact.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['128', 'people supported in the last 6 months'],
                ['47', 'urgent requests responded to'],
                ['£8.4k', 'distributed in direct community support'],
                ['2–4 hrs', 'target response time for emergencies'],
              ].map(([num, txt]) => (
                <div key={num + txt} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
                  <p className="text-4xl font-bold text-white">{num}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{txt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">About</p>
            <h3 className="mt-4 text-3xl font-bold tracking-tight">Community care, practical help, and support with dignity</h3>
            <p className="mt-4 text-base leading-7 text-slate-700">Pride Mutual Aid &amp; Support exists to support LGBTQ+ individuals facing hardship by providing practical help, building community connections, and creating safe spaces where people feel valued, supported, and understood.</p>
            <p className="mt-4 text-base leading-7 text-slate-700">We work to reduce financial stress, address social isolation, and ensure that no one in our community has to face difficult times alone. Through our support, events, and everyday care, we aim to help people regain stability, confidence, and a sense of belonging.</p>
            <button onClick={() => navigateTo('about')} className="mt-6 inline-flex rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-soft hover:bg-slate-50">Read more about us</button>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,rgba(255,247,237,1),rgba(255,255,255,1),rgba(236,254,255,1))] p-8 shadow-soft sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Image gallery</p>
            <h3 className="mt-4 text-3xl font-bold tracking-tight">Add more warmth and personality</h3>
            <p className="mt-4 text-base leading-7 text-slate-700">This homepage section is ready for photos from community events, campaign graphics, branded illustrations, or any imagery that helps the organisation feel more human, welcoming, and alive.</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white"><img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80" className="h-full w-full object-cover" alt="Community support" /></div>
              <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white"><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80" className="h-full w-full object-cover" alt="Community event" /></div>
              <div className="col-span-2 aspect-[8/3] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white"><img src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1400&q=80" className="h-full w-full object-cover" alt="Campaign impact" /></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return renderHome()
      case 'about': return (
        <SectionShell eyebrow="About" title="Supporting people through hardship with practical care" intro="Our mission is to support LGBTQ+ individuals facing hardship by providing practical help, building community connections, and creating safe spaces where people feel valued, supported, and understood.">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6"><h3 className="text-xl font-semibold">Our mission</h3><p className="mt-4 text-base leading-7 text-slate-700">Through our services, events, and everyday support, we aim to strengthen community ties and help people regain stability, confidence, and a sense of belonging.</p></div>
            <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white"><h3 className="text-xl font-semibold">Our vision</h3><p className="mt-4 text-base leading-7 text-slate-300">We envision a future where all LGBTQ+ individuals can access the support they need without barriers, and where no one is left to face hardship alone.</p></div>
          </div>
        </SectionShell>
      )
      case 'impact': return (
        <SectionShell eyebrow="Impact" title="Why this work matters" intro="We focus on practical support, urgent response, and meaningful connection so people can move forward with more safety, dignity, and stability.">
          <div className="grid gap-6 md:grid-cols-2">{impactCards.map((item, i) => <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6"><div className={`h-1.5 w-24 rounded-full ${i===0?'bg-pink-500':i===1?'bg-amber-400':i===2?'bg-cyan-500':'bg-violet-500'}`} /><h3 className="mt-5 text-xl font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p></div>)}</div>
        </SectionShell>
      )
      case 'support': return (
        <SectionShell eyebrow="Support" title="Get support" intro="If you need support, use this form to contact us. Requests can be sent to info@pridemutualaidandsupport.co.uk.">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900"><p><strong>Eligibility:</strong> Applicants should be UK-based and aged 16+ or have parental consent. Where someone is under 16, a parent or carer must sign on their behalf.</p><p className="mt-2"><strong>Response times:</strong> We aim to reply within 2–4 hours for emergencies and 24–48 hours for non-emergencies.</p><p className="mt-2"><strong>Emergency note:</strong> If someone is in immediate danger or needs urgent emergency medical, police, or crisis intervention support, contact emergency services right away.</p></div>
          <form action="https://formspree.io/f/xbdqgoyl" method="POST" className="mt-6 max-w-3xl space-y-4"><input name="name" className="w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="Full name"/><input name="email" type="email" className="w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="Email address"/><textarea name="message" className="min-h-[160px] w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="Tell us what support you need"/><button className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-soft hover:bg-slate-800">Submit support request</button></form>
        </SectionShell>
      )
      case 'grants': return (
        <SectionShell eyebrow="Grants" title="Apply for a grant" intro="Applicants can request financial support using this form. Applications can be sent to info@pridemutualaidandsupport.co.uk.">
          <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-4 text-sm leading-6 text-cyan-900"><p><strong>Eligibility:</strong> Applicants should be UK-based and aged 16+ or have parental consent. Where someone is under 16, a parent or carer must sign on their behalf.</p><p className="mt-2"><strong>Response times:</strong> We aim to reply within 2–4 hours for emergencies and 24–48 hours for non-emergencies.</p></div>
          <form action="https://formspree.io/f/mnjlpdvj" method="POST" className="mt-6 max-w-3xl space-y-4"><input name="name" className="w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="Full name"/><input name="email" type="email" className="w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="Email address"/><input name="amount_requested" className="w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="Amount requested (£)"/><textarea name="message" className="min-h-[160px] w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="Briefly explain your situation and the support requested"/><button className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-soft hover:bg-slate-800">Submit grant application</button></form>
        </SectionShell>
      )
      case 'team': return (
        <SectionShell eyebrow="Team" title="Meet the team" intro="Add more team members later as the organisation grows. This section is ready to be expanded.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{teamItems.map((item) => <div key={item.role + item.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">{item.image ? <img src={item.image} alt={item.name || item.role} className="mb-4 h-40 w-full rounded-2xl object-cover" /> : <div className="mb-4 h-40 w-full rounded-2xl bg-[linear-gradient(135deg,rgba(236,72,153,0.18),rgba(34,211,238,0.18))]" />}<p className="text-base font-semibold">{item.name || 'Name to be added'}</p><p className="mt-1 text-sm font-medium text-slate-500">{item.role}</p><p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p></div>)}</div>
          <div className="mt-10 rounded-[1.5rem] bg-slate-950 p-8 text-white"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Testimonials</p><h3 className="mt-4 text-2xl font-semibold">What people say about our support</h3><div className="mt-6 space-y-4">{testimonialItems.map((item) => <div key={item.quote} className="rounded-2xl border border-white/10 bg-white/5 p-5"><p className="text-sm leading-6 text-slate-200">“{item.quote}”</p><p className="mt-3 text-sm font-semibold text-white">{item.by}</p></div>)}</div></div>
        </SectionShell>
      )
      case 'news': return <SectionShell eyebrow="News" title="Latest updates" intro="This section is ready for future community updates, funding appeals, and service announcements once you are ready to publish them."><div className="grid gap-4 md:grid-cols-3">{placeholderNews.map((item)=><div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><p className="font-semibold">{item}</p><p className="mt-2 text-sm leading-6 text-slate-600">Placeholder content ready for your future news items.</p></div>)}</div></SectionShell>
      case 'faqs': return <SectionShell eyebrow="FAQs" title="Frequently asked questions" intro="Helpful answers for people seeking support, applying for grants, or learning about the organisation."><div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]"><div className="space-y-4">{faqItems.map((item)=><div key={item.q} className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><p className="font-semibold text-slate-900">{item.q}</p><p className="mt-2 text-sm leading-6 text-slate-600">{item.a}</p></div>)}</div><div className="rounded-[1.5rem] border border-slate-200 bg-[linear-gradient(135deg,rgba(255,247,237,1),rgba(255,255,255,1),rgba(236,254,255,1))] p-6 shadow-soft"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Live chat</p><h3 className="mt-4 text-2xl font-semibold tracking-tight">Crisp live chat placeholder</h3><p className="mt-4 text-sm leading-6 text-slate-700">Crisp live chat is included as a required feature. Once your Crisp website ID is added, a chat widget can appear in the bottom corner of the site on desktop and mobile.</p><div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-soft">Live chat preview area — this will be activated when your Crisp website ID is connected.</div></div></div></SectionShell>
      case 'contact': return <SectionShell eyebrow="Contact" title="Get in touch" intro="Serving people across London and the South East."><div className="space-y-3 text-sm text-slate-700"><p><strong>General enquiries:</strong> info@pridemutualaidandsupport.co.uk</p><p><strong>Management:</strong> management@pridemutualaidandsupport.co.uk</p><p><strong>Complaints:</strong> complaints@pridemutualaidandsupport.co.uk</p></div></SectionShell>
      case 'volunteer': return <SectionShell eyebrow="Get Involved" title="Volunteer" intro="Volunteers help strengthen our community and make support more accessible."><form className="max-w-3xl space-y-4"><input name="name" className="w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="Full name"/><input name="email" type="email" className="w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="Email address"/><textarea name="message" className="min-h-[140px] w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="Tell us why you would like to volunteer"/><button className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-soft hover:bg-slate-800">Submit volunteer application</button></form></SectionShell>
      case 'events': return <SectionShell eyebrow="Get Involved" title="Events" intro="This section is ready for community gatherings, support sessions, and fundraising events."><div className="grid gap-4 md:grid-cols-3">{placeholderEvents.map((item)=><div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><p className="font-semibold">{item}</p><p className="mt-2 text-sm leading-6 text-slate-600">Add date, location, access information, and booking details here later.</p></div>)}</div></SectionShell>
      case 'jobs': return <SectionShell eyebrow="Get Involved" title="Jobs" intro="This section is ready for future paid opportunities and role descriptions."><div className="grid gap-4 md:grid-cols-3">{placeholderJobs.map((item, index)=><div key={item+index} className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><p className="font-semibold">{item}</p><p className="mt-2 text-sm leading-6 text-slate-600">Add contract type, salary, hours, and application deadline here.</p></div>)}</div></SectionShell>
      case 'donate': return (
        <SectionShell eyebrow="Donate" title="Support urgent practical help across London & the South East" intro="Your donation directly funds food, emergency support, and safe spaces for LGBTQ+ individuals facing hardship. Give once or monthly in GBP via Stripe.">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-strong">
              <div className="flex items-center justify-between"><h3 className="text-xl font-semibold tracking-tight">Choose an amount</h3><span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">GBP</span></div>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {donationAmounts.map((amount, index) => {
                  const active = selectedDonation === amount
                  const color = index === 0 ? 'bg-pink-500' : index === 1 ? 'bg-amber-400' : index === 2 ? 'bg-cyan-500' : 'bg-violet-500'
                  return (
                    <motion.button key={amount} layout whileTap={{ scale: 0.97 }} whileHover={{ y: -2 }} onClick={() => setSelectedDonation(amount)} className={`relative overflow-hidden rounded-2xl px-4 py-5 text-lg font-semibold shadow-soft transition ${active ? `${color} text-white ring-4 ring-slate-200` : 'border border-slate-200 bg-white text-slate-900'}`}>
                      {active ? <motion.span layoutId="donation-highlight" className="absolute inset-0 bg-white opacity-15" /> : null}
                      <span className="relative z-10">£{amount}</span>
                    </motion.button>
                  )
                })}
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <motion.button whileTap={{ scale: 0.99 }} onClick={() => setDonationType('one-off')} className={`rounded-2xl px-6 py-4 text-sm font-semibold shadow-soft transition ${donationType === 'one-off' ? 'bg-slate-900 text-white' : 'border border-slate-300 bg-white text-slate-900'}`}>One-off donation</motion.button>
                <motion.button whileTap={{ scale: 0.99 }} onClick={() => setDonationType('monthly')} className={`rounded-2xl px-6 py-4 text-sm font-semibold shadow-soft transition ${donationType === 'monthly' ? 'bg-slate-900 text-white' : 'border border-slate-300 bg-white text-slate-900'}`}>Monthly donation</motion.button>
              </div>
              <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50"><div className="border-b border-slate-200 bg-white px-5 py-4"><p className="text-sm font-semibold text-slate-900">Donation summary</p><p className="mt-1 text-sm text-slate-600">You are previewing a {donationType} donation of <strong>£{selectedDonation}</strong>.</p></div><div className="p-5 text-sm leading-6 text-slate-700"><p><strong>Stripe checkout:</strong> This site is ready to connect to Stripe Checkout or Payment Links for live payments.</p><p className="mt-2">At launch, this button will open your live Stripe checkout in GBP with secure card, Apple Pay, and Google Pay options.</p></div></div>
              <button className="mt-6 w-full rounded-2xl bg-slate-900 px-6 py-4 text-sm font-semibold text-white shadow-soft hover:bg-slate-800">Continue to secure Stripe checkout</button>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">{['Secure payments', 'GBP checkout', 'Cancel monthly any time'].map((item) => <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1.5">{item}</span>)}</div>
            </div>
            <div className="space-y-8">
              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-strong"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Your impact</p><h3 className="mt-4 text-2xl font-semibold tracking-tight">What your donation makes possible</h3><div className="mt-6 space-y-4">{impactAmounts.map((item)=><div key={item.amount} className="rounded-2xl border border-white/10 bg-white/5 p-5"><p className="text-lg font-semibold">{item.amount}</p><p className="mt-2 text-sm leading-6 text-slate-300">{item.text}</p></div>)}</div><div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5"><p className="text-sm leading-6 text-slate-300">Every contribution helps us respond faster, support more people, and provide care that is immediate, respectful, and community-led.</p></div></div>
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-soft"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Transparency</p><h3 className="mt-4 text-2xl font-semibold tracking-tight">Built to reassure donors</h3><div className="mt-6 grid gap-3 sm:grid-cols-2">{['Secure Stripe payments', 'UK-based support focus', 'Clear impact messaging', 'Community-led response'].map((item)=><div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700">{item}</div>)}</div><p className="mt-5 text-sm leading-6 text-slate-600">You can replace these with real trust badges later, such as registered status, safeguarding commitments, annual reporting, or funding transparency statements.</p></div>
              <div className="rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(135deg,rgba(255,247,237,1),rgba(255,255,255,1),rgba(236,254,255,1))] p-8 shadow-soft"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Monthly giving</p><h3 className="mt-4 text-2xl font-semibold tracking-tight">Why recurring donations matter</h3><div className="mt-5 space-y-3 text-sm leading-6 text-slate-700"><p>• Helps us plan support more reliably.</p><p>• Makes emergency response funding more consistent.</p><p>• Strengthens long-term community care and stability.</p><p>• Reduces the pressure of relying only on one-off appeals.</p></div></div>
            </div>
          </div>
        </SectionShell>
      )
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#fcfcfd_100%)] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-pink-50 via-white to-cyan-50 shadow-soft"><div className="flex h-full w-full items-center justify-center text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Logo</div></div>
              <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Serving people across London and the South East</p><button onClick={() => navigateTo('home')} className="mt-1 text-left text-lg font-semibold tracking-tight text-slate-950">Pride Mutual Aid &amp; Support</button></div>
            </div>
            <nav className="hidden items-center gap-6 xl:flex">
              {pages.map((page) => <NavButton key={page.id} id={page.id} label={page.label} />)}
              <div ref={dropdownRef} className="relative">
                <button onClick={() => setInvolvedOpen((v) => !v)} className={`inline-flex items-center gap-2 text-sm transition ${involvedLabel ? 'font-semibold text-slate-950' : 'text-slate-700 hover:text-slate-950'}`}>Get Involved<span className={`text-xs transition-transform ${involvedOpen ? 'rotate-180' : ''}`}>▾</span></button>
                {involvedOpen ? <div className="absolute right-0 mt-4 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-strong"><div className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Opportunities and updates</div>{getInvolvedPages.map((page)=><button key={page.id} onClick={() => navigateTo(page.id)} className={`block w-full rounded-xl px-3 py-3 text-left text-sm transition ${currentPage === page.id ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'}`}>{page.label}</button>)}</div> : null}
              </div>
              <button onClick={() => navigateTo('donate')} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-slate-800">Donate</button>
            </nav>
            <button onClick={() => setMenuOpen((v) => !v)} className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 xl:hidden">{menuOpen ? 'Close' : 'Menu'}</button>
          </div>
        </div>
        {menuOpen ? <div className="border-t border-slate-200 bg-white xl:hidden"><div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8"><div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 shadow-soft"><div className="grid gap-2">{pages.map((page)=><button key={page.id} onClick={() => navigateTo(page.id)} className={`rounded-xl px-3 py-3 text-left text-sm transition ${currentPage===page.id?'bg-slate-900 text-white':'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-950'}`}>{page.label}</button>)}</div><div className="mt-5 border-t border-slate-200 pt-5"><div className="px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Get Involved</div><div className="mt-3 grid gap-2">{getInvolvedPages.map((page)=><button key={page.id} onClick={() => navigateTo(page.id)} className={`rounded-xl px-3 py-3 text-left text-sm transition ${currentPage===page.id?'bg-slate-900 text-white':'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-950'}`}>{page.label}</button>)}</div></div><button onClick={() => navigateTo('donate')} className="mt-5 w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-soft">Donate</button></div></div></div> : null}
      </header>
      <main>{renderPage()}</main>
      <footer className="bg-slate-950 text-slate-300"><div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between"><div><p className="font-semibold text-white">Pride Mutual Aid &amp; Support</p><p className="mt-2 text-sm">Practical help, community connection, and support with dignity.</p></div><div className="flex flex-wrap gap-4 text-sm">{['donate','support','grants','team','news','faqs','contact'].map((item)=><button key={item} onClick={() => navigateTo(item)} className="capitalize">{item}</button>)}</div></div></footer>
    </div>
  )
}
