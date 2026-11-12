const testaments = [
  {
    id: "old-testament",
    title: "Old Testament",
    count: 39,
    language: "Mainly Hebrew, with some Aramaic",
    story: "From creation and God’s promises to Abraham, the story follows Israel through deliverance from Egypt, kingship, exile, and return. The prophets call people back to God and hold out hope for the Messiah.",
    books: [
      { group: "Law", examples: "Genesis through Deuteronomy", purpose: "The beginnings of Israel, its covenant, and its laws." },
      { group: "History", examples: "Joshua, Kings, Ezra, Nehemiah", purpose: "Life in the land, the monarchy, and rebuilding after exile." },
      { group: "Poetry and wisdom", examples: "Job, Psalms, Proverbs", purpose: "Suffering, prayer, worship, and wise living." },
      { group: "Prophets", examples: "Isaiah through Malachi", purpose: "Warnings, calls to faithfulness, and promises of restoration." },
    ],
  },
  {
    id: "new-testament",
    title: "New Testament",
    count: 27,
    language: "Greek",
    story: "Jesus announces God’s kingdom, teaches his disciples, dies, and rises from the dead. His followers carry the gospel from Jerusalem into new communities.",
    books: [
      { group: "Gospels", examples: "Matthew, Mark, Luke, John", purpose: "Four accounts of Jesus’ life and ministry." },
      { group: "Early church", examples: "Acts", purpose: "The growth of the first churches and the spread of the gospel." },
      { group: "Letters", examples: "Romans, Ephesians, James", purpose: "Christian teaching and guidance for life together." },
      { group: "Revelation", examples: "Revelation", purpose: "Visions that encourage believers to remain faithful." },
    ],
  },
] as const;

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
        <header className="bible-intro">
          <h2 id="bible-title">Explore the Bible</h2>
          <p>Christians receive the Bible as Scripture inspired by God. The Protestant Bible brings together 66 books written in several forms, including history, poetry, prophecy, and letters.</p>
          <nav aria-label="Bible guide sections">
            <a href="#old-testament">Old Testament</a>
            <a href="#new-testament">New Testament</a>
            <a href="#start-reading">Start reading</a>
          </nav>
        </header>

        {testaments.map(({ id, title, count, language, story, books }) => (
          <article className="testament" id={id} key={id} aria-labelledby={id + "-title"}>
            <div className="testament-intro">
              <h3 id={id + "-title"}>{title}</h3>
              <p className="testament-facts">{count} books · {language}</p>
              <p>{story}</p>
            </div>
            <dl className="book-groups">
              {books.map(({ group, examples, purpose }) => (
                <div key={group}>
                  <dt>{group}</dt>
                  <dd><span>{examples}</span>{purpose}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}

        <div className="reading-guide" id="start-reading">
          <div className="section-intro">
            <h3>Start with four readings</h3>
            <p>Read each passage in context. Ask who is speaking, what kind of writing it is, and how you might respond.</p>
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

        <div className="bible-translation">
          <h3>Reading in translation</h3>
          <p>The Bible’s original languages were Hebrew, Aramaic, and Greek. English readers have translations including the King James Version, published in 1611, and modern versions that draw on ancient manuscripts.</p>
        </div>
        <p className="sources">
          Adapted from <a href="https://www.christianbiblereference.org/summary.htm">Christian Bible Reference’s Summary and History of the Bible</a>.
        </p>
      </div>
    </section>
  );
}
