import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

import heroAsset from "@/assets/bytsphere-hero.jpg.asset.json";
import testimonial1Asset from "@/assets/bytsphere-testimonial-1.jpg.asset.json";
import testimonial2Asset from "@/assets/bytsphere-testimonial-2.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bytsphere Technology — Web App Design & E-Commerce" },
      {
        name: "description",
        content:
          "Bytsphere designs and ships high-performance web applications and e-commerce experiences that turn first impressions into lasting revenue.",
      },
      {
        property: "og:title",
        content: "Bytsphere Technology — Web App Design & E-Commerce",
      },
      {
        property: "og:description",
        content:
          "Bytsphere designs and ships high-performance web applications and e-commerce experiences that turn first impressions into lasting revenue.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground antialiased">
      <Header />
      <main>
        <Hero />
        <Services />
        <Stats />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="inline-block size-2.5 rounded-full bg-primary" />
            <span className="font-display text-[15px] font-semibold tracking-tight">
              Bytsphere{" "}
              <span className="font-normal text-muted-foreground">Technology</span>
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-[13px] font-medium text-muted-foreground md:flex">
            <a href="#services" className="text-foreground transition-colors hover:text-foreground">
              Services
            </a>
            <a href="#proof" className="transition-colors hover:text-foreground">
              Proof
            </a>
          </nav>
          <a
            href="#contact"
            className="rounded-md bg-primary px-3.5 py-2 font-body text-[13px] font-semibold text-primary-foreground ring-1 ring-primary transition-transform hover:-translate-y-0.5"
          >
            Start a project
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div className="rise">
            <p className="mb-5 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">
              Web app design &amp; e-commerce
            </p>
            <h1 className="max-w-[15ch] font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance lg:text-[3.25rem]">
              Product surfaces that load fast, sell faster, and feel effortless.
            </h1>
            <p className="mt-6 max-w-[44ch] font-body text-base leading-[1.6] text-muted-foreground text-pretty">
              Bytsphere designs and ships high-converting web applications and storefronts — from the first wireframe to a production deploy.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="rounded-xl bg-primary px-4 py-2.5 font-body text-[14px] font-semibold text-primary-foreground ring-1 ring-primary transition-transform hover:-translate-y-0.5"
              >
                Book a discovery call
              </a>
              <a
                href="#services"
                className="rounded-xl bg-background px-4 py-2.5 font-body text-[14px] font-medium text-foreground ring-1 ring-border transition-transform hover:-translate-y-0.5"
              >
                Explore services
              </a>
            </div>
          </div>
          <div className="rise-d2 relative">
            <img
              src={heroAsset.url}
              alt="A laptop showing a web app dashboard and a mobile storefront floating beside it"
              className="aspect-[5/4] w-full rounded-3xl bg-muted object-cover"
              width={1280}
              height={1024}
              priority="true"
            />
            <div className="rise-d4 absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl bg-background px-4 py-3 shadow-sm ring-1 ring-border">
              <span className="grid size-8 place-items-center rounded-md bg-primary/10">
                <span className="size-2 rounded-full bg-primary" />
              </span>
              <div className="leading-tight">
                <p className="font-display text-[13px] font-semibold">98/100 Lighthouse</p>
                <p className="font-body text-[11px] text-muted-foreground">Avg. storefront score</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-[48ch]">
          <h2 className="font-display text-3xl font-medium leading-tight tracking-tight text-balance">
            What we build for you
          </h2>
          <p className="mt-3 font-body text-base leading-[1.6] text-muted-foreground text-pretty">
            Four disciplines, one accountable team. No hand-offs between vendors.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <ServiceCard
            icon={<span className="size-2.5 rounded-sm bg-primary" />}
            title="Web App Design"
            description="Dashboards and SaaS front-ends built for speed, clarity, and retention across every breakpoint."
            delay="d1"
          />
          <ServiceCard
            icon={<span className="size-2.5 rounded-full bg-primary" />}
            title="E-commerce Development"
            description="Headless storefronts with sub-second page loads and checkout flows tuned for conversion."
            delay="d2"
          />
          <ServiceCard
            icon={<span className="size-2.5 rounded-md bg-primary" />}
            title="UI / UX Design"
            description="Research-led systems with accessible components and a coherent, calm interface language."
            delay="d3"
          />
          <ServiceCard
            icon={<span className="size-2.5 rounded-[3px] bg-primary" />}
            title="Product Strategy"
            description="Roadmaps and KPIs that align engineering effort to revenue, not vanity metrics."
            delay="d4"
          />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  delay: "d1" | "d2" | "d3" | "d4";
}) {
  const delayClass =
    delay === "d1" ? "rise-d1" : delay === "d2" ? "rise-d2" : delay === "d3" ? "rise-d3" : "rise-d4";
  return (
    <div className={`rounded-2xl bg-background p-6 ring-1 ring-border ${delayClass}`}>
      <span className="inline-grid size-9 place-items-center rounded-lg bg-primary/10">{icon}</span>
      <h3 className="mt-4 font-display text-[17px] font-semibold">{title}</h3>
      <p className="mt-2 max-w-[40ch] font-body text-[14px] leading-[1.6] text-muted-foreground text-pretty">
        {description}
      </p>
    </div>
  );
}

function Stats() {
  return (
    <section id="proof" className="bg-muted">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          <div className="rise-d1">
            <p className="font-display text-3xl font-semibold tracking-tight">120+</p>
            <p className="mt-1 font-body text-[13px] text-muted-foreground">Products shipped</p>
          </div>
          <div className="rise-d2">
            <p className="font-display text-3xl font-semibold tracking-tight">
              +34<span className="text-primary">%</span>
            </p>
            <p className="mt-1 font-body text-[13px] text-muted-foreground">Avg. conversion lift</p>
          </div>
          <div className="rise-d3">
            <p className="font-display text-3xl font-semibold tracking-tight">0.9s</p>
            <p className="mt-1 font-body text-[13px] text-muted-foreground">Median load time</p>
          </div>
          <div className="rise-d4">
            <p className="font-display text-3xl font-semibold tracking-tight">9 yrs</p>
            <p className="mt-1 font-body text-[13px] text-muted-foreground">Agency track record</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-4 md:grid-cols-2">
          <figure className="rise-d1 rounded-2xl bg-background p-7 ring-1 ring-border">
            <p className="font-body text-[15px] leading-[1.6] text-pretty">
              "Bytsphere rebuilt our storefront in six weeks. Checkouts fell from four minutes to one, and revenue followed within a month."
            </p>
            <figcaption className="mt-5 flex items-center gap-3">
              <img
                src={testimonial1Asset.url}
                alt="Mara Voss, Head of Commerce at Fieldnote"
                className="size-11 shrink-0 rounded-full bg-muted object-cover"
                width={512}
                height={512}
                loading="lazy"
              />
              <div className="leading-tight">
                <p className="font-display text-[14px] font-semibold">Mara Voss</p>
                <p className="font-body text-[12px] text-muted-foreground">Head of Commerce, Fieldnote</p>
              </div>
            </figcaption>
          </figure>
          <figure className="rise-d2 rounded-2xl bg-background p-7 ring-1 ring-border">
            <p className="font-body text-[15px] leading-[1.6] text-pretty">
              "The rare studio that treats performance and design as one discipline. Our dashboard finally feels as fast as it looks."
            </p>
            <figcaption className="mt-5 flex items-center gap-3">
              <img
                src={testimonial2Asset.url}
                alt="Devon Rae, CTO at Lumenloop"
                className="size-11 shrink-0 rounded-full bg-muted object-cover"
                width={512}
                height={512}
                loading="lazy"
              />
              <div className="leading-tight">
                <p className="font-display text-[14px] font-semibold">Devon Rae</p>
                <p className="font-body text-[12px] text-muted-foreground">CTO, Lumenloop</p>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="contact" className="bg-muted">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="rise rounded-3xl bg-primary px-8 py-12 md:px-12">
          <h2 className="max-w-[16ch] font-display text-3xl font-semibold leading-tight tracking-tight text-balance text-primary-foreground">
            Ready to ship something that performs?
          </h2>
          <p className="mt-4 max-w-[46ch] font-body text-base leading-[1.6] text-pretty text-primary-foreground/85">
            Tell us where your product is today. We&apos;ll map the path to a faster, cleaner, higher-converting build.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:hello@bytsphere.dev"
              className="rounded-xl bg-background px-5 py-2.5 font-body text-[14px] font-semibold text-primary ring-1 ring-background transition-transform hover:-translate-y-0.5"
            >
              Start a project
            </a>
            <a
              href="#services"
              className="rounded-xl bg-primary px-5 py-2.5 font-body text-[14px] font-medium text-primary-foreground ring-1 ring-primary-foreground/40 transition-transform hover:-translate-y-0.5"
            >
              View our work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <a href="/" className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-primary" />
            <span className="font-display text-[15px] font-semibold">Bytsphere Technology</span>
          </a>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-body text-[13px] text-muted-foreground">
            <a href="mailto:hello@bytsphere.dev" className="transition-colors hover:text-foreground">
              hello@bytsphere.dev
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Careers
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              LinkedIn
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              X
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Dribbble
            </a>
          </div>
        </div>
        <p className="mt-8 font-body text-[12px] text-muted-foreground/80">
          © {new Date().getFullYear()} Bytsphere Technology. Designed in daylight, shipped in production.
        </p>
      </div>
    </footer>
  );
}
