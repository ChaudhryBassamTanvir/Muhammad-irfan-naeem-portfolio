import { profile, experience, projects, skills, certificates } from "@/data/cv";
import { Reveal, Counter, Typewriter, FlightBar } from "@/components/Motion";

function Plane({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <path fill="currentColor" d="M62 30 40 24 28 4h-6l6 20-14 3-6-8H4l4 13-4 13h4l6-8 14 3-6 20h6l12-20 22-6c3-1 3-4 0-5z" />
    </svg>
  );
}

const allSkills = [...skills.Technical, ...skills.Professional];
const stats = [
  { label: "CGPA (out of 4)", to: 3.19, d: 2 },
  { label: "Certificates", to: 5, d: 0 },
  { label: "Built projects", to: 3, d: 0 },
  { label: "Languages", to: 3, d: 0 },
];

export default function Home() {
  return (
    <>
      <FlightBar />
      <header className="nav">
        <a href="#top" className="brand"><Plane className="brand-icon" /> Irfan Naeem</a>
        <nav aria-label="Sections">
          <a href="#experience">Experience</a><a href="#projects">Projects</a><a href="#skills">Skills</a>
          <a href="#contact" className="pill">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="sun" />
          <div className="cloud c1" /><div className="cloud c2" /><div className="cloud c3" />
          <Plane className="jet" />
          <div className="wrap hero-grid">
            <div>
              <p className="kicker">Hello, I’m</p>
              <h1>{profile.name}</h1>
              <p className="role">Aviation Engineer · <Typewriter words={["Aircraft maintenance", "Quality control", "Airworthiness", "Inspection & reporting"]} /></p>
              <p className="lead">I keep aircraft safe, documented and ready to fly.</p>
              <div className="actions">
                <a className="btn primary" href={`mailto:${profile.email}`}>Email me</a>
                <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              </div>
            </div>
            <div className="panel" aria-label="Quick facts">
              {stats.map((s) => (
                <div key={s.label} className="gauge"><b><Counter to={s.to} decimals={s.d} /></b><span>{s.label}</span></div>
              ))}
            </div>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div>{[...allSkills, ...allSkills].map((s, i) => <span key={i}>{s}</span>)}</div>
        </div>

        <section className="wrap about">
          <Reveal><h2>About</h2><p>{profile.summary}</p></Reveal>
          <Reveal delay={150}>
            <dl className="facts">
              <div><dt>Degree</dt><dd>BS Aviation Engineering and Technology</dd></div>
              <div><dt>University</dt><dd>Superior University, Lahore</dd></div>
              <div><dt>Languages</dt><dd>English, Urdu, Punjabi</dd></div>
              <div><dt>Honor</dt><dd>Partial University Scholarship</dd></div>
            </dl>
          </Reveal>
        </section>

        <section id="experience" className="wrap">
          <Reveal><h2>Experience</h2></Reveal>
          <ol className="log">
            {experience.map((e, i) => (
              <li key={e.place}><Reveal delay={i * 150}>
                <h3>{e.place}</h3>
                <ul>{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </Reveal></li>
            ))}
          </ol>
        </section>

        <section id="projects" className="band">
          <div className="wrap">
            <Reveal><h2>Projects</h2></Reveal>
            <div className="grid">
              {projects.map((p, i) => (
                <Reveal key={p.name} delay={i * 120}>
                  <article className={i === 0 ? "card feature" : "card"}>
                    <span className="tag">{p.tag}</span>
                    <h3>{p.name}</h3>
                    <p>{p.text}</p>
                    <small>Superior University, Lahore</small>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="wrap two">
          {Object.entries(skills).map(([group, list], g) => (
            <Reveal key={group} delay={g * 150}>
              <h2>{group} skills</h2>
              <ul className="chips">{list.map((s) => <li key={s}>{s}</li>)}</ul>
            </Reveal>
          ))}
        </section>

        <section className="wrap two">
          <Reveal>
            <h2>Certificates</h2>
            <ul className="certs">{certificates.map((c) => <li key={c.name}><strong>{c.name}</strong><span>{c.by}</span></li>)}</ul>
          </Reveal>
          <Reveal delay={150}>
            <h2>Beyond the hangar</h2>
            <p><strong>Aviation Technicians Community</strong>, Superior University. Active member in technical discussions, workshops and team events.</p>
            <p><strong>Interests:</strong> teaching and mentoring, scientific writing, aviation technology, manufacturing systems, career counseling.</p>
          </Reveal>
        </section>

        <section id="contact" className="contact">
          <div className="wrap">
            <Reveal>
              <h2>Ready for takeoff?</h2>
              <p>Open to aviation engineering, maintenance and quality roles.</p>
              <ul className="links">
                <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
                <li><a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a></li>
                <li>WeChat: {profile.wechat}</li>
                <li><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn profile</a></li>
              </ul>
            </Reveal>
          </div>
        </section>
      </main>
      <footer className="foot">© {new Date().getFullYear()} {profile.name}</footer>
    </>
  );
}
