import { church } from "../lib/church";
import { FacebookTimeline } from "./facebook-timeline";

export function ChurchUpdates() {
  return (
    <section id="updates" className="section wrap church-updates" aria-labelledby="updates-title">
      <div className="section-intro">
        <h2 id="updates-title">Church updates</h2>
        <p>Follow announcements and see photos from the church’s Facebook Page.</p>
        <div className="actions">
          <a className="button" href={church.facebook}>Open Facebook Page <span aria-hidden="true">↗</span></a>
          <a className="text-link" href={`${church.facebook}/photos`}>Browse church photos <span aria-hidden="true">↗</span></a>
        </div>
        <p className="sources">If Facebook limits the embedded timeline, open the Page to see the updates there.</p>
      </div>
      <FacebookTimeline pageUrl={church.facebook} />
    </section>
  );
}
