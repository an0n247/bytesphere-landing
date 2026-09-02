import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  Minimize2,
  Maximize2,
  ExternalLink,
  PhoneCall,
  Check,
  Copy,
  ChevronRight,
  ArrowUpRight,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePreview } from "@/components/preview";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  actions?: { label: string; href?: string; action?: string }[];
}

const QUICK_PROMPTS = [
  { label: "What services do you offer?", query: "What services does Bytsphere offer?" },
  { label: "Tell me about your portfolio", query: "Can you tell me about your recent projects and case studies?" },
  { label: "How does your 4-step process work?", query: "How does your development process work?" },
  { label: "What are your timelines & pricing?", query: "What are your typical project timelines and pricing structure?" },
  { label: "How do I start a project?", query: "How can I book a call or start a project?" },
];

function generateResponse(query: string): {
  text: string;
  actions?: { label: string; href?: string; action?: string }[];
} {
  const q = query.toLowerCase();

  if (q.includes("service") || q.includes("build") || q.includes("offer") || q.includes("what do you do")) {
    return {
      text: "At Bytsphere Technology, we focus on 4 core disciplines with zero vendor hand-offs:\n\n1. **Web App Design**: Fast, responsive SaaS dashboards and customer portals.\n2. **E-Commerce Development**: High-converting headless storefronts (Shopify Plus, Edge CDN) with sub-second page loads.\n3. **UI / UX Design**: Research-led design systems, accessible components, and calm user interfaces.\n4. **Product Strategy**: Revenue-aligned roadmaps, KPIs, and Lighthouse 95+ performance optimization.",
      actions: [
        { label: "Explore Services Section", href: "#services" },
        { label: "Book Discovery Call", href: "#contact" },
      ],
    };
  }

  if (q.includes("portfolio") || q.includes("work") || q.includes("project") || q.includes("case study") || q.includes("client")) {
    return {
      text: "Here are some of our notable client success stories:\n\n• **Fieldnote Commerce**: Headless Shopify Plus rebuild with 0.8s load time & **+38% mobile conversions**.\n• **Lumenloop Analytics**: Real-time SaaS telemetry dashboard with sub-100ms interactions & **4.9/5 user rating**.\n• **Nordic Atelier**: Luxury DTC storefront with custom 3D visualizer & **+52% average order value**.\n\nWe've shipped 120+ digital products over 9 years with an average +34% conversion lift.",
      actions: [
        { label: "View Portfolio", href: "#portfolio" },
        { label: "Request Full Deck", href: "mailto:hello@bytsphere.dev" },
      ],
    };
  }

  if (q.includes("process") || q.includes("how we work") || q.includes("step") || q.includes("sprint") || q.includes("methodology")) {
    return {
      text: "We run a fast, predictable 4-step sprint with weekly staging previews:\n\n1. **Discovery & Architecture**: Mapping user journeys, technical specifications, and system blueprints.\n2. **Interface Prototyping**: Interactive Figma prototypes tested for conversion & accessibility.\n3. **High-Speed Engineering**: Pixel-perfect frontend with React, TanStack, and resilient APIs.\n4. **Launch & Scaling**: End-to-end QA, Lighthouse optimization, and analytics tracking.",
      actions: [{ label: "Learn About Our Process", href: "#process" }],
    };
  }

  if (q.includes("time") || q.includes("timeline") || q.includes("cost") || q.includes("price") || q.includes("pricing") || q.includes("quote") || q.includes("rate") || q.includes("how much")) {
    return {
      text: "Our typical project engagements:\n\n⏱️ **Timeline**: Focused sprints typically take **4 to 8 weeks** from kickoff to production deployment.\n\n💼 **Pricing**: Every build is custom-tailored based on scope, integrations, and architectural requirements. We offer fixed-price sprint packages and dedicated product engineering retainers.\n\nLet's discuss your roadmap on a short 20-minute discovery call!",
      actions: [
        { label: "Start a Project", href: "#contact" },
        { label: "Email hello@bytsphere.dev", href: "mailto:hello@bytsphere.dev" },
      ],
    };
  }

  if (q.includes("contact") || q.includes("start") || q.includes("call") || q.includes("book") || q.includes("hire") || q.includes("email")) {
    return {
      text: "We are currently accepting new client projects for **Q3 & Q4**!\n\nYou can reach out directly:\n📧 **Email**: [hello@bytsphere.dev](mailto:hello@bytsphere.dev)\n📞 **Discovery**: Fill out our project form below or schedule an introductory call.",
      actions: [
        { label: "Go to Contact Form", href: "#contact" },
        { label: "Send Email", href: "mailto:hello@bytsphere.dev" },
      ],
    };
  }

  if (q.includes("stack") || q.includes("tech") || q.includes("technology") || q.includes("react") || q.includes("tanstack")) {
    return {
      text: "Our core technology stack is engineered for peak speed, reliability, and maintainability:\n\n• **Frontend**: React 19, TypeScript, TanStack Router & Start, Tailwind CSS\n• **Backend & APIs**: Nitro, Cloudflare Workers, Node.js, GraphQL / REST\n• **Commerce**: Shopify Plus, Stripe, Headless CMS (Sanity / Contentful)\n• **Performance**: Lighthouse 95+ guarantees, Edge caching, Core Web Vitals optimization.",
      actions: [{ label: "Start a Project", href: "#contact" }],
    };
  }

  if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("greetings")) {
    return {
      text: "Hello! 👋 Welcome to Bytsphere Technology. I'm your interactive AI assistant. How can I help you today? You can ask me about our design services, recent case studies, our 4-step sprint process, or booking a call with our team.",
      actions: [
        { label: "Our Services", href: "#services" },
        { label: "Recent Portfolio", href: "#portfolio" },
        { label: "Book a Call", href: "#contact" },
      ],
    };
  }

  return {
    text: "Thanks for asking! Bytsphere designs and ships high-converting web applications and storefronts.\n\nWould you like to explore our case studies, learn about our sprint process, or speak directly with our engineering team?",
    actions: [
      { label: "Book a Discovery Call", href: "#contact" },
      { label: "Email hello@bytsphere.dev", href: "mailto:hello@bytsphere.dev" },
    ],
  };
}

export function AIChatbot() {
  const { isIframe } = usePreview();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [showGreetingTooltip, setShowGreetingTooltip] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (isIframe) return null;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-welcome",
      sender: "bot",
      text: "Hi there! 👋 I'm Bytsphere's AI Assistant. How can I assist you with your web app or e-commerce project today?",
      timestamp: "Just now",
      actions: [
        { label: "Explore Services", href: "#services" },
        { label: "Recent Work", href: "#portfolio" },
        { label: "Book a Call", href: "#contact" },
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setShowGreetingTooltip(false);
    }
  }, [messages, isOpen]);

  // Show friendly teaser tooltip after 4 seconds if not opened
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowGreetingTooltip(true);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Realistic response delay
    setTimeout(() => {
      const response = generateResponse(query);
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        actions: response.actions,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      if (!isOpen) {
        setHasUnread(true);
      }
    }, 550);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `msg-reset-${Date.now()}`,
        sender: "bot",
        text: "Chat cleared! How else can I help you today?",
        timestamp: "Just now",
        actions: [
          { label: "Explore Services", href: "#services" },
          { label: "Recent Work", href: "#portfolio" },
          { label: "Book a Call", href: "#contact" },
        ],
      },
    ]);
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Floating Welcome Notification Pill */}
      {showGreetingTooltip && !isOpen && (
        <div className="mb-3 mr-1 flex items-center gap-2 rounded-2xl border border-border bg-background/95 px-4 py-2.5 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/75 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          <p className="font-body text-[13px] font-medium text-foreground">
            Have a project in mind? Ask our AI 👋
          </p>
          <button
            onClick={() => setShowGreetingTooltip(false)}
            className="ml-1 text-muted-foreground hover:text-foreground"
            aria-label="Dismiss greeting"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      {/* Main Floating Action Button (FAB) */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
            setShowGreetingTooltip(false);
            setTimeout(() => inputRef.current?.focus(), 150);
          }}
          className="group relative flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-2xl ring-4 ring-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-primary/25 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
          aria-label="Open AI Support Chat"
        >
          {hasUnread && (
            <span className="absolute -top-1 -right-1 flex size-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-75" />
              <span className="relative inline-flex size-4 rounded-full bg-rose-500 text-[10px] font-bold text-white items-center justify-center">
                1
              </span>
            </span>
          )}
          <div className="relative">
            <Sparkles className="size-6 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            <span className="absolute -bottom-1 -right-1 size-2.5 rounded-full bg-emerald-400 ring-2 ring-primary" />
          </div>
        </button>
      )}

      {/* Chat Window Container */}
      {isOpen && (
        <div
          className={cn(
            "flex flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] backdrop-blur-2xl transition-all duration-300",
            isMinimized
              ? "h-16 w-80 sm:w-96"
              : "h-[560px] max-h-[82vh] w-[92vw] sm:w-[410px]"
          )}
          role="dialog"
          aria-label="Bytsphere AI Chat Assistant"
        >
          {/* Header */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-muted/40 px-4 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="relative grid size-9.5 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <Bot className="size-5" />
                <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display text-[14px] font-semibold tracking-tight text-foreground">
                    Bytsphere AI
                  </h3>
                  <span className="rounded-full bg-primary/10 px-1.5 py-0.2 font-mono text-[9px] font-semibold text-primary">
                    PRO
                  </span>
                </div>
                <p className="font-body text-[11px] text-muted-foreground">
                  Online • Typically replies instantly
                </p>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-1 text-muted-foreground">
              <button
                onClick={handleResetChat}
                className="grid size-8 place-items-center rounded-lg transition-colors hover:bg-muted hover:text-foreground"
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RotateCcw className="size-3.5" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="grid size-8 place-items-center rounded-lg transition-colors hover:bg-muted hover:text-foreground"
                title={isMinimized ? "Expand chat" : "Minimize chat"}
                aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
              >
                {isMinimized ? (
                  <Maximize2 className="size-3.5" />
                ) : (
                  <Minimize2 className="size-3.5" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="grid size-8 place-items-center rounded-lg transition-colors hover:bg-muted hover:text-foreground"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Body / Messages List */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 font-body text-[13.5px]">
                {messages.map((msg) => {
                  const isUser = msg.sender === "user";
                  return (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex flex-col gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-200",
                        isUser ? "items-end" : "items-start"
                      )}
                    >
                      <div className="flex items-end gap-2 max-w-[86%]">
                        {!isUser && (
                          <div className="grid size-6 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary mb-1">
                            <Sparkles className="size-3.5" />
                          </div>
                        )}
                        <div
                          className={cn(
                            "relative rounded-2xl px-3.5 py-2.5 leading-relaxed shadow-xs",
                            isUser
                              ? "bg-primary text-primary-foreground rounded-br-xs font-medium"
                              : "border border-border bg-muted/50 text-foreground rounded-bl-xs"
                          )}
                        >
                          <div className="whitespace-pre-wrap">{msg.text}</div>

                          {/* Interactive Action Buttons */}
                          {msg.actions && msg.actions.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-border/40">
                              {msg.actions.map((act) => (
                                <a
                                  key={act.label}
                                  href={act.href}
                                  onClick={() => {
                                    if (act.href?.startsWith("#")) {
                                      const el = document.querySelector(act.href);
                                      el?.scrollIntoView({ behavior: "smooth" });
                                    }
                                  }}
                                  className="inline-flex items-center gap-1 rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                                >
                                  <span>{act.label}</span>
                                  <ArrowUpRight className="size-3" />
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Timestamp & Copy action */}
                      <div
                        className={cn(
                          "flex items-center gap-1.5 px-1 text-[10px] text-muted-foreground/70",
                          isUser ? "mr-1 flex-row-reverse" : "ml-8"
                        )}
                      >
                        <span>{msg.timestamp}</span>
                        {!isUser && (
                          <button
                            onClick={() => handleCopyText(msg.text, msg.id)}
                            className="hover:text-foreground ml-1"
                            title="Copy message"
                          >
                            {copiedId === msg.id ? (
                              <Check className="size-3 text-emerald-500" />
                            ) : (
                              <Copy className="size-3" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Typing Animation */}
                {isTyping && (
                  <div className="flex items-center gap-2 text-muted-foreground animate-in fade-in duration-150">
                    <div className="grid size-6 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Sparkles className="size-3.5" />
                    </div>
                    <div className="flex items-center gap-1.5 rounded-2xl border border-border bg-muted/50 px-4 py-2.5 rounded-bl-xs">
                      <span className="size-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                      <span className="size-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                      <span className="size-1.5 rounded-full bg-primary animate-bounce" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompt Suggestions */}
              <div className="border-t border-border/60 bg-muted/20 px-3 py-2">
                <p className="mb-1.5 px-1 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                  <HelpCircle className="size-3" />
                  <span>Suggested Topics</span>
                </p>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {QUICK_PROMPTS.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleSendMessage(item.query)}
                      disabled={isTyping}
                      className="shrink-0 rounded-lg border border-border bg-background px-2.5 py-1 text-[11.5px] font-medium text-foreground shadow-2xs transition-all hover:bg-muted hover:border-primary/40 active:scale-95 disabled:opacity-50"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Input Footer */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2 border-t border-border bg-background p-3"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask anything about Bytsphere..."
                  disabled={isTyping}
                  className="flex-1 rounded-xl border border-border bg-muted/40 px-3.5 py-2 text-[13px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isTyping}
                  className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-all hover:brightness-105 active:scale-95 disabled:opacity-40 disabled:hover:brightness-100 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="size-4" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}
