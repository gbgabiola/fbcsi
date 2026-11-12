import { church } from "../lib/church";
import { FacebookPost } from "./facebook-post";

const latestPosts = [
  {
    title: "44th church anniversary and water baptisms",
    date: "2026-10-26",
    dateLabel: "October 26, 2026",
    url: "https://www.facebook.com/fbcsi4Christ/posts/pfbid02ppH1HCpgmuAgXjHmKvmSAhmhooMbDMWNfEANAGMcD63oDbJSwRGm3xVejxCbkwk9l",
  },
  {
    title: "Church photo update",
    date: "2026-10-22",
    dateLabel: "October 22, 2026",
    url: "https://www.facebook.com/fbcsi4Christ/posts/pfbid0SNiD3o9k4MNa5gzQzfHL9K65cZrWmdcF5bZtAoev6zXoczYqxbLdStrRYt7mtGNgl",
  },
  {
    title: "Sunday worship service",
    date: "2026-10-18",
    dateLabel: "October 18, 2026",
    url: "https://www.facebook.com/fbcsi4Christ/posts/pfbid0ZSU6mSZF9H52bhRprwroB7UFmSZFBdtPUztyrdnp8H9Gu3b532Ary8HPVddBktfpl",
  },
] as const;

export function ChurchUpdates() {
  return (
    <section id="updates" className="section wrap church-updates" aria-labelledby="updates-title">
      <div className="section-intro">
        <h2 id="updates-title">Latest Facebook posts</h2>
        <p>See the latest posts shared with us from the church’s Facebook Page.</p>
      </div>
      <ul className="facebook-posts">
        {latestPosts.map(({ title, date, dateLabel, url }) => (
          <li key={url}>
            <article>
              <time dateTime={date}>{dateLabel}</time>
              <h3>{title}</h3>
              <FacebookPost title={title} url={url} />
              <a className="text-link" href={url}>Open on Facebook <span aria-hidden="true">↗</span></a>
            </article>
          </li>
        ))}
      </ul>
      <a className="button" href={church.facebook}>Visit the Facebook Page <span aria-hidden="true">↗</span></a>
    </section>
  );
}
