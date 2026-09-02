import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { 
  ArrowRight, 
  ArrowUpRight, 
  Menu, 
  X, 
  Sparkles, 
  PhoneCall, 
  Layers, 
  ShoppingBag, 
  Zap, 
  ShieldCheck, 
  Laptop, 
  BarChart3, 
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

import heroAsset from "@/assets/bytsphere-hero.jpg.asset.json";
import testimonial1Asset from "@/assets/bytsphere-testimonial-1.jpg.asset.json";
import testimonial2Asset from "@/assets/bytsphere-testimonial-2.jpg.asset.json";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AIChatbot } from "@/components/AIChatbot";

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
    <div className="min-h-screen bg-background font-body text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Process />
        <Stats />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
      <AIChatbot />
    </div>
  );
}

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Services", href: "/#services" },
    { name: "Portfolio", href: "/#portfolio" },
    { name: "Process", href: "/#process" },
    { name: "Proof", href: "/#proof" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md transition-all">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <a href="/" className="group flex items-center gap-2.5">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/75 opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
            </span>
            <span className="font-display text-[15px] font-semibold tracking-tight transition-colors group-hover:text-primary">
              Bytsphere{" "}
              <span className="font-normal text-muted-foreground">Technology</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-7 text-[13px] font-medium text-muted-foreground lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="transition-colors hover:text-foreground hover:underline hover:underline-offset-8"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2.5 md:flex">
            <ThemeToggle />
            <a
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <PhoneCall className="size-3.5 text-primary" />
              <span>Contact Us</span>
            </a>
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-body text-[13px] font-semibold text-primary-foreground shadow-sm ring-1 ring-primary transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:brightness-105 active:translate-y-0"
            >
              <span>Start a project</span>
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <a
              href="/contact"
              className="rounded-lg bg-primary px-3 py-1.5 text-[12px] font-semibold text-primary-foreground"
            >
              Start
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="grid size-9 place-items-center rounded-lg border border-border bg-background p-1.5 text-foreground transition-colors hover:bg-muted"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-background/95 px-6 py-5 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-[14px] font-medium text-foreground transition-colors hover:bg-muted"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="size-4 text-muted-foreground" />
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-2.5 pt-3 border-t border-border">
              <ThemeToggle variant="switch" />
              <a
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-[13px] font-semibold text-primary-foreground shadow-sm"
              >
                <Sparkles className="size-4" />
                <span>Start a project</span>
              </a>
              <a
                href="mailto:hello@bytsphere.dev"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-border py-2 text-[13px] font-medium text-muted-foreground hover:text-foreground"
              >
                <span>hello@bytsphere.dev</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div className="rise">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1">
              <span className="size-2 rounded-full bg-primary" />
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-primary">
                Web app design &amp; e-commerce
              </p>
            </div>
            <h1 className="max-w-[15ch] font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance lg:text-[3.25rem]">
              Product surfaces that load fast, sell faster, and feel effortless.
            </h1>
            <p className="mt-6 max-w-[44ch] font-body text-base leading-[1.6] text-muted-foreground text-pretty">
              Bytsphere designs and ships high-converting web applications and storefronts — from the first wireframe to a production deploy.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 font-body text-[14px] font-semibold text-primary-foreground shadow-sm ring-1 ring-primary transition-all hover:-translate-y-0.5 hover:shadow-md hover:brightness-105"
              >
                <span>Book a discovery call</span>
                <ArrowRight className="size-4" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 rounded-xl bg-background px-4 py-2.5 font-body text-[14px] font-medium text-foreground ring-1 ring-border transition-all hover:-translate-y-0.5 hover:bg-muted"
              >
                <span>Explore portfolio</span>
                <ArrowUpRight className="size-4 text-muted-foreground" />
              </a>
            </div>
          </div>
          <div className="rise-d2 relative">
            <img
              src={heroAsset.url}
              alt="A laptop showing a web app dashboard and a mobile storefront floating beside it"
              className="aspect-[5/4] w-full rounded-3xl bg-muted object-cover shadow-xl ring-1 ring-border"
              width={1280}
              height={1024}
              loading="eager"
            />
            <div className="rise-d4 absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl bg-background/95 px-4 py-3 shadow-lg ring-1 ring-border backdrop-blur-sm">
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
          <p className="font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-primary">
            Expertise
          </p>
          <h2 className="mt-1 font-display text-3xl font-medium leading-tight tracking-tight text-balance">
            What we build for you
          </h2>
          <p className="mt-3 font-body text-base leading-[1.6] text-muted-foreground text-pretty">
            Four disciplines, one accountable team. No hand-offs between vendors.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <ServiceCard
            icon={<Laptop className="size-4 text-primary" />}
            title="Web App Design"
            description="Dashboards and SaaS front-ends built for speed, clarity, and retention across every breakpoint."
            delay="d1"
          />
          <ServiceCard
            icon={<ShoppingBag className="size-4 text-primary" />}
            title="E-commerce Development"
            description="Headless storefronts with sub-second page loads and checkout flows tuned for conversion."
            delay="d2"
          />
          <ServiceCard
            icon={<Layers className="size-4 text-primary" />}
            title="UI / UX Design"
            description="Research-led systems with accessible components and a coherent, calm interface language."
            delay="d3"
          />
          <ServiceCard
            icon={<BarChart3 className="size-4 text-primary" />}
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
    <div className={`group rounded-2xl bg-background p-6 ring-1 ring-border transition-all hover:ring-primary/40 hover:shadow-sm ${delayClass}`}>
      <span className="inline-grid size-9 place-items-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">{icon}</span>
      <h3 className="mt-4 font-display text-[17px] font-semibold">{title}</h3>
      <p className="mt-2 max-w-[40ch] font-body text-[14px] leading-[1.6] text-muted-foreground text-pretty">
        {description}
      </p>
    </div>
  );
}

function Portfolio() {
  const projects = [
    {
      title: "Fieldnote Commerce",
      category: "Headless E-Commerce & Checkout",
      metrics: "0.8s load time • +38% mobile conversions",
      description: "Complete Shopify Plus rebuild with custom real-time inventory filtering, instant cart, and streamlined 1-step checkout.",
      tags: ["React", "Shopify Plus", "Tailwind CSS", "Edge CDN"],
    },
    {
      title: "Lumenloop Analytics",
      category: "SaaS Dashboard & Web App",
      metrics: "Sub-100ms interactions • 4.9/5 user satisfaction",
      description: "Interactive data visualization platform engineered for real-time telemetry streaming and intuitive multi-tenant workspace management.",
      tags: ["TanStack Router", "React 19", "Recharts", "TypeScript"],
    },
    {
      title: "Nordic Atelier",
      category: "Luxury Direct-to-Consumer",
      metrics: "+52% average order value • 99 Lighthouse Score",
      description: "Immersive digital storefront featuring custom 3D product visualizer, responsive lookbooks, and localized multi-currency purchasing.",
      tags: ["Headless CMS", "WebGL", "Next-Gen UI", "Stripe API"],
    },
  ];

  return (
    <section id="portfolio" className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-[48ch]">
            <p className="font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-primary">
              Selected Work
            </p>
            <h2 className="mt-1 font-display text-3xl font-medium leading-tight tracking-tight text-balance">
              Engineered for impact &amp; performance
            </h2>
            <p className="mt-3 font-body text-base leading-[1.6] text-muted-foreground text-pretty">
              Real projects where design craft directly accelerated revenue and user adoption.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-primary hover:underline hover:underline-offset-4"
          >
            <span>Request full portfolio deck</span>
            <ArrowUpRight className="size-4" />
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {projects.map((item, idx) => (
            <div
              key={item.title}
              className="group flex flex-col justify-between rounded-3xl border border-border bg-background p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 font-body text-[11px] font-semibold text-primary">
                    {item.category}
                  </span>
                  <span className="font-display text-xs font-mono text-muted-foreground">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1 font-body text-xs font-medium text-primary">
                  {item.metrics}
                </p>
                <p className="mt-3 font-body text-[13px] leading-[1.6] text-muted-foreground">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/60">
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    {
      num: "01",
      title: "Discovery & Architecture",
      desc: "We analyze your user journeys, technical constraints, and business goals to map out a clear specification and system blueprint.",
    },
    {
      num: "02",
      title: "Interface Prototyping",
      desc: "Interactive wireframes and high-fidelity prototypes tested for conversion friction, aesthetic polish, and accessibility.",
    },
    {
      num: "03",
      title: "High-Speed Engineering",
      desc: "Pixel-perfect frontend development with modern frameworks, instant loading times, and resilient API integrations.",
    },
    {
      num: "04",
      title: "Launch & Revenue Scaling",
      desc: "End-to-end QA, Lighthouse optimization, production deployment, and analytics tracking to measure lift from day one.",
    },
  ];

  return (
    <section id="process" className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-[48ch]">
          <p className="font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-primary">
            How We Work
          </p>
          <h2 className="mt-1 font-display text-3xl font-medium leading-tight tracking-tight text-balance">
            A fast, predictable 4-step sprint
          </h2>
          <p className="mt-3 font-body text-base leading-[1.6] text-muted-foreground text-pretty">
            Transparent milestones with weekly staging previews and zero guesswork.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="relative rounded-2xl border border-border bg-background p-6 transition-all hover:border-primary/30"
            >
              <span className="font-display text-3xl font-bold tracking-tight text-primary/30">
                {step.num}
              </span>
              <h3 className="mt-3 font-display text-[16px] font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 font-body text-[13px] leading-[1.6] text-muted-foreground">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section id="proof" className="border-t border-border bg-muted">
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
    <section id="testimonials" className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 max-w-[48ch]">
          <p className="font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-primary">
            Client Feedback
          </p>
          <h2 className="mt-1 font-display text-3xl font-medium leading-tight tracking-tight text-balance">
            Trusted by founders and product leaders
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <figure className="rise-d1 rounded-2xl bg-background p-7 ring-1 ring-border transition-all hover:ring-primary/40 hover:shadow-sm">
            <p className="font-body text-[15px] leading-[1.6] text-pretty">
              "Bytsphere rebuilt our storefront in six weeks. Checkouts fell from four minutes to one, and revenue followed within a month."
            </p>
            <figcaption className="mt-5 flex items-center gap-3">
              <img
                src={testimonial1Asset.url}
                alt="Mara Voss, Head of Commerce at Fieldnote"
                className="size-11 shrink-0 rounded-full bg-muted object-cover ring-2 ring-primary/20"
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
          <figure className="rise-d2 rounded-2xl bg-background p-7 ring-1 ring-border transition-all hover:ring-primary/40 hover:shadow-sm">
            <p className="font-body text-[15px] leading-[1.6] text-pretty">
              "The rare studio that treats performance and design as one discipline. Our dashboard finally feels as fast as it looks."
            </p>
            <figcaption className="mt-5 flex items-center gap-3">
              <img
                src={testimonial2Asset.url}
                alt="Devon Rae, CTO at Lumenloop"
                className="size-11 shrink-0 rounded-full bg-muted object-cover ring-2 ring-primary/20"
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
    <section id="contact" className="border-t border-border bg-muted">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="rise rounded-3xl bg-primary px-8 py-12 shadow-xl md:px-12">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold text-primary-foreground mb-4">
                <Sparkles className="size-3.5" />
                <span>Now accepting projects for Q3 &amp; Q4</span>
              </div>
              <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-balance text-primary-foreground sm:text-4xl">
                Ready to ship something that performs?
              </h2>
              <p className="mt-4 font-body text-base leading-[1.6] text-pretty text-primary-foreground/85">
                Tell us where your product is today. We&apos;ll map the path to a faster, cleaner, higher-converting build.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col shrink-0">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-background px-6 py-3 font-body text-[14px] font-semibold text-primary shadow-sm ring-1 ring-background transition-all hover:-translate-y-0.5 hover:shadow-md hover:bg-background/95"
              >
                <span>Start a project</span>
                <ArrowRight className="size-4" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary-foreground/30 bg-primary/20 px-6 py-3 font-body text-[14px] font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary-foreground/10"
              >
                <span>View our work</span>
              </a>
            </div>
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
            <a href="/#services" className="transition-colors hover:text-foreground">
              Services
            </a>
            <a href="/#portfolio" className="transition-colors hover:text-foreground">
              Portfolio
            </a>
            <a href="/#process" className="transition-colors hover:text-foreground">
              Process
            </a>
            <a href="/contact" className="transition-colors hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-border/50 pt-6 sm:flex-row sm:items-center">
          <p className="font-body text-[12px] text-muted-foreground/80">
            © {new Date().getFullYear()} Bytsphere Technology. Designed in daylight, shipped in production.
          </p>
          <div className="flex items-center gap-4 text-[12px] text-muted-foreground">
            <a href="#" className="hover:text-foreground">Twitter / X</a>
            <a href="#" className="hover:text-foreground">LinkedIn</a>
            <a href="#" className="hover:text-foreground">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

