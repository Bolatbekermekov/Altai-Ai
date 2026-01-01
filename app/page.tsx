import CaseStudy from "../components/sections/case-study/default";
import ContactPage from "../components/sections/contact/page";
import CTA from "../components/sections/cta/default";
import FAQ from "../components/sections/faq/default";
import Footer from "../components/sections/footer/default";
import Hero from "../components/sections/hero/default";
import Items from "../components/sections/items/default";
import Navbar from "../components/sections/navbar/default";
import Process from "../components/sections/process/Process";
import Services from "../components/sections/services/Services";
import TeamReviews from "../components/sections/team-reviews/default";
import TelegramBotCase from "../components/sections/telegram-bot-case/default";

export default function Home() {
  return (
    <main className="bg-background text-foreground min-h-screen w-full">
      <Navbar />
      <Hero />
      <Services />
      <CaseStudy />
      <TelegramBotCase />
      <Process />
      <TeamReviews />
      <Items />
      <ContactPage />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
