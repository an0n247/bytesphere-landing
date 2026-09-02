import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  Sparkles,
  PhoneCall,
  Mail,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Send,
  MessageSquare,
  Building,
  Globe,
  DollarSign,
  Calendar,
  Check,
  Copy,
  ChevronRight,
  HelpCircle,
  Laptop,
  ShoppingBag,
  Layers,
  BarChart3,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AIChatbot } from "@/components/AIChatbot";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Bytsphere Technology" },
      {
        name: "description",
        content:
          "Start a conversation with Bytsphere Technology. Tell us about your web application or e-commerce build, and we'll map out the architectural blueprint.",
      },
      {
        property: "og:title",
        content: "Contact Us — Bytsphere Technology",
      },
      {
        property: "og:description",
        content:
          "Start a conversation with Bytsphere Technology. Tell us about your web application or e-commerce build, and we'll map out the architectural blueprint.",
      },
      { property: "og:url", content: "/contact" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const SERVICE_OPTIONS = [
  { id: "webapp", label: "Web App & SaaS Design", icon: Laptop },
  { id: "ecommerce", label: "Headless E-Commerce", icon: ShoppingBag },
  { id: "uiux", label: "UI / UX Design System", icon: Layers },
  { id: "strategy", label: "Product & Performance Strategy", icon: BarChart3 },
];

const TIMELINE_OPTIONS = [
  "Under 4 weeks",
  "4 – 8 weeks",
  "2 – 3 months",
  "Ongoing retainer",
];

const BUDGET_OPTIONS = [
  "<$10,000",
  "$10,000 – $25,000",
  "$25,000 – $50,000",
  "$50,000+",
];

const FAQS = [
  {
    question: "How quickly can our project kick off?",
    answer:
      "Most projects kick off within 5 to 7 business days following our initial discovery call and scope alignment. We only book a limited number of concurrent builds to ensure 100% focus and velocity.",
  },
  {
    question: "What deliverables will we receive at the end of the sprint?",
    answer:
      "Depending on your scope, deliverables include production-ready React / TypeScript source code, comprehensive Figma design systems with components & tokens, Lighthouse 95+ performance validation, and full deployment infrastructure setups.",
  },
  {
    question: "How do payment milestones and contracts work?",
    answer:
      "We operate with fixed-scope sprints with transparent milestones: typically 50% upon project kickoff and 50% upon final production deployment approval. Retainers are billed monthly with clear weekly progress reports.",
  },
  {
    question: "Do you offer post-launch support and iterations?",
    answer:
      "Yes! Every production build comes with a complimentary 30-day warranty window for bug fixes and tuning. We also offer monthly engineering retainers for ongoing feature rollouts and continuous optimization.",
  },
  {
    question: "Can we sign a Non-Disclosure Agreement (NDA)?",
    answer:
      "Absolutely. We are happy to execute mutual NDAs prior to reviewing proprietary product specifications, wireframes, or business logic.",
  },
];

function ContactPage() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      <ContactHeader />
      <main>
        <ContactHero />
        <ContactFormSection />
        <ContactFAQSection />
      </main>
      <ContactFooter />
      <AIChatbot />
    </div>
  );
}

function ContactHeader() {
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
          <Link to="/" className="group flex items-center gap-2.5">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/75 opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
            </span>
            <span className="font-display text-[15px] font-semibold tracking-tight transition-colors group-hover:text-primary">
              Bytsphere{" "}
              <span className="font-normal text-muted-foreground">Technology</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-7 text-[13px] font-medium text-muted-foreground lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-foreground",
                  link.name === "Contact"
                    ? "font-semibold text-primary underline underline-offset-8"
                    : "hover:underline hover:underline-offset-8"
                )}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2.5 md:flex">
            <ThemeToggle />
            <a
              href="mailto:hello@bytsphere.dev"
              className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Mail className="size-3.5 text-primary" />
              <span>hello@bytsphere.dev</span>
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-1.5 md:hidden">
            <ThemeToggle />
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

function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-12">
        <div className="max-w-3xl rise">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1">
            <span className="size-2 rounded-full bg-primary animate-ping" />
            <p className="font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-primary">
              Start a project
            </p>
          </div>
          <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]">
            Let&apos;s build something high-converting and fast.
          </h1>
          <p className="mt-5 max-w-2xl font-body text-base leading-[1.65] text-muted-foreground text-pretty sm:text-lg">
            Have an upcoming web app redesign, headless commerce migration, or greenfield build? Share a few details below and our team will get back to you within 24 hours.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground">
            <div className="flex items-center gap-1.5 rounded-lg bg-muted/60 px-3 py-1.5 ring-1 ring-border">
              <Clock className="size-3.5 text-primary" />
              <span>24-Hour Response</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-muted/60 px-3 py-1.5 ring-1 ring-border">
              <ShieldCheck className="size-3.5 text-emerald-500" />
              <span>NDA Protected</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-muted/60 px-3 py-1.5 ring-1 ring-border">
              <CheckCircle2 className="size-3.5 text-primary" />
              <span>Fixed-Price Sprints</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactFormSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>(["webapp"]);
  const [timeline, setTimeline] = useState<string>("4 – 8 weeks");
  const [budget, setBudget] = useState<string>("$10,000 – $25,000");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@bytsphere.dev");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  return (
    <section className="border-t border-border bg-background py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_.75fr]">
          {/* Main Form Box */}
          <div className="rounded-3xl border border-border bg-background p-7 shadow-sm ring-1 ring-border sm:p-10">
            {isSubmitted ? (
              <div className="flex min-h-[440px] flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-300">
                <div className="grid size-16 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-500 ring-2 ring-emerald-500/30">
                  <Check className="size-8" />
                </div>
                <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Message Sent Successfully!
                </h2>
                <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-muted-foreground">
                  Thank you for reaching out, <span className="font-semibold text-foreground">{name}</span>. Our lead architect will review your project requirements and reply to <span className="font-semibold text-foreground">{email}</span> within 24 hours.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setMessage("");
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-muted px-4 py-2.5 font-body text-xs font-semibold text-foreground transition-colors hover:bg-muted/80"
                  >
                    Send another inquiry
                  </button>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-body text-xs font-semibold text-primary-foreground transition-all hover:brightness-105"
                  >
                    <span>Back to Homepage</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl font-semibold tracking-tight">
                    Project Details
                  </h2>
                  <p className="mt-1 font-body text-xs text-muted-foreground">
                    Select the areas you need help with and tell us about your goals.
                  </p>
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    1. Services Needed
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SERVICE_OPTIONS.map((srv) => {
                      const isSelected = selectedServices.includes(srv.id);
                      const Icon = srv.icon;
                      return (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => toggleService(srv.id)}
                          className={cn(
                            "flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all duration-200 active:scale-[0.98]",
                            isSelected
                              ? "border-primary bg-primary/5 text-foreground ring-1 ring-primary/40 shadow-xs"
                              : "border-border bg-muted/30 text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                          )}
                        >
                          <div
                            className={cn(
                              "grid size-8 shrink-0 place-items-center rounded-xl transition-colors",
                              isSelected ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground ring-1 ring-border"
                            )}
                          >
                            <Icon className="size-4" />
                          </div>
                          <span className="font-body text-[13px] font-medium">
                            {srv.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    2. Your Contact Information
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-foreground mb-1.5">
                        Your Name <span className="text-primary">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-foreground mb-1.5">
                        Work Email <span className="text-primary">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className="w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-xs font-medium text-foreground mb-1.5">
                        Company Name
                      </label>
                      <input
                        id="company"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Acme Inc."
                        className="w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="website" className="block text-xs font-medium text-foreground mb-1.5">
                        Current Website or App URL
                      </label>
                      <input
                        id="website"
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://example.com"
                        className="w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Timeline & Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">
                      3. Target Timeline
                    </label>
                    <div className="space-y-1.5">
                      {TIMELINE_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setTimeline(opt)}
                          className={cn(
                            "flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-xs font-medium transition-all",
                            timeline === opt
                              ? "border-primary bg-primary/5 text-foreground ring-1 ring-primary/30"
                              : "border-border bg-muted/20 text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <span>{opt}</span>
                          {timeline === opt && <Check className="size-3.5 text-primary" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">
                      4. Approximate Budget (USD)
                    </label>
                    <div className="space-y-1.5">
                      {BUDGET_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setBudget(opt)}
                          className={cn(
                            "flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-xs font-medium transition-all",
                            budget === opt
                              ? "border-primary bg-primary/5 text-foreground ring-1 ring-primary/30"
                              : "border-border bg-muted/20 text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <span>{opt}</span>
                          {budget === opt && <Check className="size-3.5 text-primary" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    5. Tell Us About Your Project <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your product vision, key user flows, integrations needed, or performance bottlenecks you want solved..."
                    className="w-full rounded-2xl border border-border bg-muted/30 p-3.5 text-[13px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-y"
                  />
                </div>

                {/* Submit Action */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-border">
                  <p className="text-[11px] text-muted-foreground">
                    By submitting, you agree to our confidential handling of your data.
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-primary px-7 py-3.5 font-body text-sm font-semibold text-primary-foreground shadow-md ring-1 ring-primary transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:brightness-105 active:translate-y-0 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Brief</span>
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Side Info & Direct Channels */}
          <div className="flex flex-col gap-6">
            {/* Quick Email Card */}
            <div className="rounded-3xl border border-border bg-muted/40 p-7 shadow-xs">
              <div className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Mail className="size-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                Direct Email
              </h3>
              <p className="mt-1 font-body text-xs leading-relaxed text-muted-foreground">
                Prefer to email us directly? Send your RFP, pitch deck, or wireframes to our studio inbox:
              </p>

              <div className="mt-4 flex items-center justify-between gap-2 rounded-xl border border-border bg-background p-2.5 shadow-2xs">
                <span className="font-mono text-xs font-semibold text-foreground truncate">
                  hello@bytsphere.dev
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1 rounded-lg bg-muted px-2.5 py-1 text-[11px] font-medium text-foreground transition-colors hover:bg-muted/80 shrink-0"
                  title="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="size-3 text-emerald-500" />
                      <span className="text-emerald-500 font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Strategy Call Card */}
            <div className="rounded-3xl border border-border bg-muted/40 p-7 shadow-xs">
              <div className="grid size-11 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                <PhoneCall className="size-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                20-Min Discovery Session
              </h3>
              <p className="mt-1 font-body text-xs leading-relaxed text-muted-foreground">
                Have an urgent launch timeline? Grab a slot with our lead engineer to review feasibility, stack recommendations, and estimates.
              </p>

              <a
                href="mailto:hello@bytsphere.dev?subject=Discovery%20Call%20Request"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background py-2.5 text-xs font-semibold text-foreground transition-all hover:bg-muted hover:border-primary/40"
              >
                <span>Schedule a Discovery Call</span>
                <ArrowUpRight className="size-3.5 text-muted-foreground" />
              </a>
            </div>

            {/* Studio Availability */}
            <div className="rounded-3xl border border-border bg-background p-6">
              <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Current Studio Capacity
              </h4>
              <div className="mt-3 flex items-center gap-2.5">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="font-body text-[13px] font-semibold text-foreground">
                  Accepting builds for Q3 &amp; Q4
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Operating across US Eastern, GMT, and West African time zones for seamless daily communication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactFAQSection() {
  return (
    <section className="border-t border-border bg-muted/30 py-16">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-primary">
            Got Questions?
          </p>
          <h2 className="mt-1 font-display text-3xl font-medium tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 font-body text-sm text-muted-foreground">
            Everything you need to know about working with Bytsphere.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-border bg-background p-6 sm:p-8 shadow-xs">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, idx) => (
              <AccordionItem key={faq.question} value={`item-${idx}`}>
                <AccordionTrigger className="font-display text-[15px] font-semibold text-foreground hover:no-underline hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-body text-[13.5px] leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

function ContactFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-primary" />
            <span className="font-display text-[15px] font-semibold">Bytsphere Technology</span>
          </Link>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-body text-[13px] text-muted-foreground">
            <a href="mailto:hello@bytsphere.dev" className="transition-colors hover:text-foreground">
              hello@bytsphere.dev
            </a>
            <Link to="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <a href="/#services" className="transition-colors hover:text-foreground">
              Services
            </a>
            <a href="/#portfolio" className="transition-colors hover:text-foreground">
              Portfolio
            </a>
            <a href="/#process" className="transition-colors hover:text-foreground">
              Process
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
