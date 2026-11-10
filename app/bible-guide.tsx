const readingPath = [
  { passage: "John 1", topic: "Meet Jesus", description: "Notice what John says about who Jesus is and why he came." },
  { passage: "Genesis 12:1–9", topic: "Follow the promise", description: "Read what God promises Abram and how Abram responds." },
  { passage: "Acts 2:37–47", topic: "See the early church", description: "Look for how the first believers learned, worshiped, and cared for one another." },
  { passage: "Ephesians 2:1–10", topic: "Understand grace", description: "Consider how Paul connects salvation, faith, and good works." },
] as const;

export function BibleGuide() {
  return (
    <section id="bible" className="section bible-guide" aria-labelledby="bible-title">
      <div className="wrap">
        <div className="section-intro">
          <p className="eyebrow"><span></span> 04 / Bible guide</p>
          <h2 id="bible-title">Explore the Bible</h2>
          <p>The Bible brings together histories, poems, prophecies, accounts of Jesus, and letters. The Protestant Bible contains 39 Old Testament books and 27 New Testament books.</p>
        </div>

        <div className="testament-grid">
          <article className="testament">
            <p className="eyebrow">39 books · Mainly Hebrew, with some Aramaic</p>
            <h3>Old Testament</h3>
            <p>It begins with creation and traces God’s promises to Abraham, Israel’s deliverance from Egypt, and the nation’s life through kings, exile, and return. The prophets call people back to God and look ahead to the Messiah.</p>
            <dl>
              <div><dt>Law</dt><dd>Genesis through Deuteronomy introduce Israel’s beginnings, covenant, and commands.</dd></div>
              <div><dt>History</dt><dd>Joshua and Kings trace Israel’s life in the land. Ezra and Nehemiah describe the return and rebuilding.</dd></div>
              <div><dt>Poetry and wisdom</dt><dd>Psalms gives words for prayer and worship. Proverbs offers guidance for daily life.</dd></div>
              <div><dt>Prophets</dt><dd>Isaiah through Malachi call for faithfulness and speak of judgment and hope.</dd></div>
            </dl>
          </article>

          <article className="testament">
            <p className="eyebrow">27 books · Written in Greek</p>
            <h3>New Testament</h3>
            <p>It tells of Jesus’ life, teaching, death, and resurrection, then follows the spread of the gospel as the first churches formed.</p>
            <dl>
              <div><dt>Gospels</dt><dd>Matthew, Mark, Luke, and John recount Jesus’ life and ministry.</dd></div>
              <div><dt>Acts</dt><dd>Follow the early church from Jerusalem and see how the gospel reached new communities.</dd></div>
              <div><dt>Letters</dt><dd>Paul and other writers address questions about faith, worship, and life together.</dd></div>
              <div><dt>Revelation</dt><dd>Visions written to churches encourage faithfulness and point to Christ’s victory.</dd></div>
            </dl>
          </article>
        </div>

        <div className="reading-guide">
          <div className="section-intro">
            <h3>Start with four readings</h3>
            <p>Read each passage in context. Ask who is speaking, what the passage says, and how you might respond.</p>
          </div>
          <ol className="reading-path">
            {readingPath.map(({ passage, topic, description }) => (
              <li key={passage}>
                <strong>{passage}</strong>
                <h4>{topic}</h4>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </div>

        <p className="sources">
          Sources for the overview include{" "}
          <a href="https://www.christianbiblereference.org/summary.htm">Christian Bible Reference’s Summary and History of the Bible</a>
          {" and "}
          <a href="https://gbgabiola.github.io/the-bible/">Genesis Gabiola’s Bible overview</a>.
        </p>
      </div>
    </section>
  );
}
