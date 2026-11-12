import type { Metadata } from "next";
import { church, weeklySchedule } from "../lib/church";
import { BibleGuide } from "./bible-guide";
import { ChurchUpdates } from "./church-updates";

export const metadata: Metadata = {
  description: church.description,
  alternates: { canonical: "/" },
  verification: { google: "4iPbrwzcOoDsogi5HOXpAqc3cxxE01MUcBT5AMVkB0o" },
  openGraph: {
    type: "website",
    locale: "en_PH",
    title: church.title,
    description: church.description,
    siteName: church.name,
    url: "/",
    images: [{ url: church.logo, width: 2048, height: 1176, alt: "Official church logo" }],
  },
};

const churchSchema = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: church.name,
  url: new URL("/", church.url).href,
  image: new URL(church.logo, church.url).href,
  sameAs: [church.facebook],
  hasMap: church.map,
  address: {
    "@type": "PostalAddress",
    streetAddress: church.street,
    addressLocality: church.locality,
    addressRegion: church.region,
    addressCountry: "PH",
  },
};

const sundaySchedule = weeklySchedule.filter((gathering) => gathering.day === "Sunday" && gathering.start !== null);

export default function Home() {
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(churchSchema).replace(/</g, "\\u003c") }}
      />
      <section className="hero" aria-labelledby="welcome-title">
        <div className="wrap hero-inner">
          <p className="hero-location">San Isidro, San Fernando, Pampanga</p>
          <h1 id="welcome-title">Come worship with us</h1>
          <p className="hero-description">Join Fundamental Baptist Church this Sunday for Bible teaching and worship.</p>
          <ul className="sunday-schedule" aria-label="Sunday service times in Philippine time">
            {sundaySchedule.map(({ gathering, start }) => (
              <li key={gathering}>
                <time dateTime={start.time}>{start.label}</time>
                <span>{gathering}</span>
              </li>
            ))}
          </ul>
          <div className="actions">
            <a className="button" href="#visit">Plan a visit</a>
            <a className="text-link" href={church.map}>Get directions <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
      <section id="visit" className="section wrap visit-grid" aria-labelledby="visit-title">
        <div className="visit">
          <div>
            <h2 id="visit-title">Plan your visit</h2>
            <address>{church.street}<br />{church.locality}, {church.region}, Philippines</address>
          </div>
          <div className="visit-links">
            <a className="button" href={church.map}>Get directions <span aria-hidden="true">↗</span></a>
            <a className="text-link" href={church.facebook}>Ask us on Facebook <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="schedule">
          <h3 id="weekly-schedule">Weekly schedule</h3>
          <table aria-labelledby="weekly-schedule">
            <thead><tr><th scope="col">Day</th><th scope="col">Gathering</th><th scope="col">Start time</th></tr></thead>
            <tbody>
              {weeklySchedule.map(({ day, gathering, start }) => (
                <tr key={gathering}>
                  <td>{day}</td>
                  <th scope="row">{gathering}</th>
                  <td>{start ? <time dateTime={start.time}>{start.label}</time> : "To be announced"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="sources">All times are Philippine time. Contact the church for outreach meeting points and schedule updates.</p>
        </div>
      </section>
      <ChurchUpdates />
      <section id="beliefs" className="section beliefs-section" aria-labelledby="beliefs-title">
        <div className="wrap">
          <div className="section-intro">
            <h2 id="beliefs-title">What do Fundamental Baptists believe?</h2>
            <p>These are common teachings in the Fundamental Baptist tradition. For the San Isidro congregation’s own statement of faith, contact the church directly.</p>
            <p><a href="#practices">Read about Baptist practices</a>.</p>
          </div>
          <div className="beliefs">
            <article>
              <h3>The authority of Scripture</h3>
              <p>God inspired the Bible, and it is the final authority for Christian faith and practice.</p>
              <p className="reference">2 Timothy 3:16–17</p>
            </article>
            <article>
              <h3>The person and work of Jesus Christ</h3>
              <p>Jesus Christ is fully God and fully human. He died for sins, rose bodily from the dead, and will return.</p>
              <p className="reference">John 1:1, 14 · 1 Corinthians 15:3–4 · Acts 1:11</p>
            </article>
            <article>
              <h3>Salvation by grace through faith</h3>
              <p>Salvation is God’s gift, received through faith in Jesus Christ. Good works follow faith.</p>
              <p className="reference">Ephesians 2:8–10</p>
            </article>
          </div>
        </div>
      </section>
      <section id="practices" className="practices section">
        <div className="wrap practice-grid">
          <div className="section-intro"><h2>Life in a Baptist church</h2><p>Learn about two ordinances and the role of the local congregation.</p></div>
          <div>
            <details open><summary>Believer’s baptism</summary><p>After professing faith in Christ, believers are baptized by immersion, publicly identifying with his death, burial, and resurrection. <span className="reference">Romans 6:3–4</span></p></details>
            <details><summary>The Lord’s Supper</summary><p>The congregation shares bread and the cup in remembrance of Jesus’ death. <span className="reference">1 Corinthians 11:23–26</span></p></details>
            <details><summary>The local congregation</summary><p>Baptist congregations typically govern their own affairs under Christ. They gather for worship, prayer, Scripture teaching, and fellowship, and share the gospel through evangelism and missions. <span className="reference">Acts 2:42 · Matthew 28:18–20</span></p></details>
            <p className="sources">Further reading <a href="https://bbsi.edu.ph/statement-of-faith">Baptist Bible Seminary &amp; Institute</a> and <a href="https://www.bbfi.org/articles-of-faith/">Baptist Bible Fellowship International</a>.</p>
          </div>
        </div>
      </section>
      <BibleGuide />
    </main>
  );
}
