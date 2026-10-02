import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Arrow } from "../components/Button";
import PlaygroundClient from "./PlaygroundClient";
import s from "./playground.module.css";

export const metadata: Metadata = {
  title: "Playground — Build your working week",
  description: "Try the real forceCalendar component in CRM, campus, and resource scheduling scenarios. Create and move events, customize the calendar, and inspect the live API.",
  alternates: { canonical: "https://forcecalendar.org/playground" },
  openGraph: { url: "https://forcecalendar.org/playground" },
};

export default function PlaygroundPage() {
  return (
    <div className={s.page}>
      <Nav />
      <main>
        <section className={`${s.wrap} ${s.hero}`} aria-labelledby="playground-title">
          <div className={s.heroTop}>
            <p className={s.eyebrow}>forceCalendar / interactive playground</p>
            <Link href="/interface" className={s.textLink}>Meet the interface <Arrow /></Link>
          </div>
          <div className={s.heroGrid}>
            <h1 id="playground-title">Make it your<br /><span>working week.</span></h1>
            <div><p className={s.lede}>Different systems. Different schedules. The same calendar underneath. Pick a workspace, change a record, and see what happens.</p><p className={s.heroNote}><span aria-hidden="true" />Real component · synthetic data · no account required</p></div>
          </div>
        </section>
        <section className={`${s.wrap} ${s.lab}`} aria-label="Interactive calendar workspace">
          <PlaygroundClient />
        </section>
        <section className={`${s.wrap} ${s.nextSteps}`} aria-labelledby="next-title">
          <div><p className={s.eyebrow}>From this workspace to yours</p><h2 id="next-title">Keep the calendar.<br />Bring your own context.</h2></div>
          <div><p>This playground uses the published Web Component and local in-memory records. Your application supplies persistence, permissions, and business rules.</p><div className={s.nextLinks}><a href="https://docs.forcecalendar.org" className={s.textLink}>Read the documentation <Arrow /></a><Link href="/salesforce" className={s.textLink}>Explore Salesforce <Arrow /></Link></div></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
