import Image from "next/image";

export default function Home() {
  return (
    <main id="main">
      <section className="hero" aria-labelledby="welcome-title">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span></span> Welcome to church</p>
            <h1 id="welcome-title">Fundamental<br />Baptist Church<span>San Isidro</span></h1>
            <p>Whether you’re new to church or looking for a local congregation, we invite you to get to know us.</p>
            <div className="actions"><a className="button" href="#visit">Plan a visit <span aria-hidden="true">↗</span></a><a className="text-link" href="#beliefs">Explore Baptist beliefs <span aria-hidden="true">↓</span></a></div>
          </div>
          <div className="hero-art">
            <Image src="/fbcsi-logo.jpg" alt="Official logo of Fundamental Baptist Church, San Isidro Village, San Fernando, Pampanga" width={2048} height={1176} loading="eager" fetchPriority="high" sizes="(max-width: 760px) 352px, 400px" />
          </div>
        </div>
      </section>
      <section id="beliefs" className="section wrap">
        <div className="section-intro"><p className="eyebrow"><span></span> 01 / Beliefs</p><h2>What do Fundamental Baptists believe?</h2><p>These are common teachings in the Fundamental Baptist tradition. For the San Isidro congregation’s own statement of faith, contact the church directly.</p></div>
        <div className="beliefs">
          <article><p className="number">01</p><h3>The authority of Scripture</h3><p>God inspired the Bible, and it is the final authority for Christian faith and practice.</p><p className="reference">2 Timothy 3:16–17</p></article>
          <article><p className="number">02</p><h3>The person and work of Jesus Christ</h3><p>Jesus Christ is fully God and fully human. He died for sins, rose bodily from the dead, and will return.</p><p className="reference">John 1:1, 14 · 1 Corinthians 15:3–4 · Acts 1:11</p></article>
          <article><p className="number">03</p><h3>Salvation by grace through faith</h3><p>Salvation is God’s gift, received through faith in Jesus Christ. Good works follow faith.</p><p className="reference">Ephesians 2:8–10</p></article>
        </div>
        <div className="bible-resources">
          <h3>Explore the Bible</h3>
          <p>The Old Testament follows God’s covenant with Israel. The New Testament recounts the life, death, and resurrection of Jesus and the growth of the early church.</p>
          <ul>
            <li><a href="https://gbgabiola.github.io/the-bible/">The Bible</a></li>
            <li><a href="https://www.christianbiblereference.org/summary.htm">Summary and History of the Bible</a></li>
          </ul>
        </div>
      </section>
      <section id="practices" className="practices section">
        <div className="wrap practice-grid">
          <div className="section-intro"><p className="eyebrow"><span></span> 02 / Practices</p><h2>Life in a Baptist church</h2><p>Learn about two ordinances and the role of the local congregation.</p></div>
          <div>
            <details open><summary>Believer’s baptism</summary><p>After professing faith in Christ, believers are baptized by immersion, publicly identifying with his death, burial, and resurrection. <span className="reference">Romans 6:3–4</span></p></details>
            <details><summary>The Lord’s Supper</summary><p>The congregation shares bread and the cup in remembrance of Jesus’ death. <span className="reference">1 Corinthians 11:23–26</span></p></details>
            <details><summary>The local congregation</summary><p>Baptist congregations typically govern their own affairs under Christ. They gather for worship, prayer, Scripture teaching, and fellowship, and share the gospel through evangelism and missions. <span className="reference">Acts 2:42 · Matthew 28:18–20</span></p></details>
            <p className="sources">Further reading <a href="https://bbsi.edu.ph/statement-of-faith">Baptist Bible Seminary &amp; Institute</a> and <a href="https://www.bbfi.org/articles-of-faith/">Baptist Bible Fellowship International</a>.</p>
          </div>
        </div>
      </section>
      <section id="visit" className="section wrap">
        <div className="visit">
          <div>
            <p className="eyebrow"><span></span> 03 / Visit</p>
            <h2>Come worship with us</h2>
            <address>3M35+RHW, Sampaguita Main Road<br />San Fernando, Pampanga, Philippines</address>
          </div>
          <div className="visit-links">
            <a className="button" href="https://maps.app.goo.gl/7hfevm2YGM75h9829?g_st=ic">Get directions <span aria-hidden="true">↗</span></a>
            <a href="https://www.facebook.com/fbcsi4Christ">Ask us on Facebook <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="schedule">
          <h3 id="weekly-schedule">Weekly schedule</h3>
          <table aria-labelledby="weekly-schedule">
            <thead><tr><th scope="col">Day</th><th scope="col">Gathering</th><th scope="col">Start time</th></tr></thead>
            <tbody>
              <tr><td>Sunday</td><th scope="row">Sunday School</th><td><time dateTime="08:30">8:30 AM</time></td></tr>
              <tr><td>Sunday</td><th scope="row">Worship Service</th><td><time dateTime="09:30">9:30 AM</time></td></tr>
              <tr><td>Wednesday</td><th scope="row">Prayer Meeting</th><td><time dateTime="18:00">6:00 PM</time></td></tr>
              <tr><td>Thursday</td><th scope="row">Saguin Prayer Meeting</th><td><time dateTime="18:00">6:00 PM</time></td></tr>
              <tr><td>Friday</td><th scope="row">Outreach in San Jose</th><td>To be announced</td></tr>
              <tr><td>Saturday</td><th scope="row">Outreach in San Isidro, Bacolor</th><td><time dateTime="09:00">9:00 AM</time></td></tr>
            </tbody>
          </table>
          <p className="sources">All times are Philippine time. Contact the church for outreach meeting points and schedule updates.</p>
        </div>
      </section>
    </main>
  );
}
