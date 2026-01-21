    import React, { useMemo, useState } from "react";

    const COLORS = {
      royalBlue: "#00354B",
      electricGreen: "#65BBA9",
      gold: "#EEA320",
      coral: "#DB4140",
      charcoal: "#3E4242",
      steel: "#B2C4CB",
      bg: "#EBEBEB",
      white: "#FFFFFF",
      ink: "#0B0F12",
    };

    const BORDER = "1px solid rgba(0,0,0,0.12)";
    const R = 2;

    type Tone = "neutral" | "ok" | "warn" | "bad";

    function Pill({ text, tone = "neutral" }: { text: string; tone?: Tone }) {
      const bg =
        tone === "ok"
          ? "rgba(101,187,169,0.18)"
          : tone === "warn"
          ? "rgba(238,163,32,0.18)"
          : tone === "bad"
          ? "rgba(219,65,64,0.15)"
          : "rgba(178,196,203,0.28)";

      const color =
        tone === "ok"
          ? COLORS.royalBlue
          : tone === "bad"
          ? COLORS.coral
          : COLORS.charcoal;

      return (
        <span
          style={{
            padding: "2px 8px",
            borderRadius: R,
            border: BORDER,
            fontSize: 12,
            lineHeight: "18px",
            background: bg,
            color,
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </span>
      );
    }

    function Button({
      children,
      onClick,
      variant = "primary",
      disabled,
    }: {
      children: React.ReactNode;
      onClick?: () => void;
      variant?: "primary" | "secondary" | "success" | "danger";
      disabled?: boolean;
    }) {
      const base: React.CSSProperties = {
        borderRadius: R,
        border: BORDER,
        padding: "10px 12px",
        fontWeight: 800,
        fontSize: 13,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        userSelect: "none",
        background: COLORS.white,
        color: COLORS.royalBlue,
      };

      const style: React.CSSProperties =
        variant === "primary"
          ? {
              ...base,
              background: COLORS.royalBlue,
              color: COLORS.white,
              border: `1px solid ${COLORS.royalBlue}`,
            }
          : variant === "success"
          ? {
              ...base,
              background: COLORS.electricGreen,
              color: COLORS.royalBlue,
              border: `1px solid ${COLORS.electricGreen}`,
            }
          : variant === "danger"
          ? {
              ...base,
              background: COLORS.coral,
              color: COLORS.white,
              border: `1px solid ${COLORS.coral}`,
            }
          : base;

      return (
        <button onClick={disabled ? undefined : onClick} style={style}>
          {children}
        </button>
      );
    }

    function Field({
      label,
      value,
      placeholder,
      onChange,
      required,
      mono,
    }: {
      label: string;
      value: string;
      placeholder?: string;
      onChange: (v: string) => void;
      required?: boolean;
      mono?: boolean;
    }) {
      return (
        <div style={{ display: "grid", gap: 6 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ fontSize: 12, fontWeight: 900, color: COLORS.charcoal }}>
              {label}
            </div>
            {required ? <Pill text="Required" tone="warn" /> : null}
          </div>
          <input
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            style={{
              border: BORDER,
              borderRadius: R,
              padding: "10px 10px",
              fontSize: 13,
              outline: "none",
              background: COLORS.white,
              fontFamily: mono
                ? "ui-monospace, SFMono-Regular, Menlo, monospace"
                : "inherit",
            }}
          />
        </div>
      );
    }

    function TextArea({
      label,
      value,
      placeholder,
      onChange,
      rows = 3,
    }: {
      label: string;
      value: string;
      placeholder?: string;
      onChange: (v: string) => void;
      rows?: number;
    }) {
      return (
        <div style={{ display: "grid", gap: 6 }}>
          <div style={{ fontSize: 12, fontWeight: 900, color: COLORS.charcoal }}>
            {label}
          </div>
          <textarea
            value={value}
            placeholder={placeholder}
            rows={rows}
            onChange={(e) => onChange(e.target.value)}
            style={{
              border: BORDER,
              borderRadius: R,
              padding: "10px 10px",
              fontSize: 13,
              outline: "none",
              background: COLORS.white,
              resize: "vertical",
            }}
          />
        </div>
      );
    }

    function Card({
      title,
      right,
      children,
    }: {
      title: string;
      right?: React.ReactNode;
      children: React.ReactNode;
    }) {
      return (
        <div
          style={{
            border: BORDER,
            borderRadius: R,
            background: COLORS.white,
            boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              padding: "12px 12px",
              borderBottom: BORDER,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 1000, color: COLORS.royalBlue }}>
              {title}
            </div>
            <div>{right}</div>
          </div>
          <div style={{ padding: "12px 12px" }}>{children}</div>
        </div>
      );
    }

    function Modal({
      open,
      title,
      onClose,
      children,
      width = 880,
    }: {
      open: boolean;
      title: string;
      onClose: () => void;
      children: React.ReactNode;
      width?: number;
    }) {
      if (!open) return null;
      return (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            display: "grid",
            placeItems: "center",
            padding: 18,
            zIndex: 100,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: `min(100%, ${width}px)`,
              border: BORDER,
              borderRadius: R,
              background: COLORS.white,
              boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
            }}
          >
            <div
              style={{
                padding: "12px 12px",
                borderBottom: BORDER,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div style={{ fontWeight: 1000, color: COLORS.royalBlue }}>{title}</div>
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
            </div>
            <div style={{ padding: 12 }}>{children}</div>
          </div>
        </div>
      );
    }

    function stamp() {
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
        d.getHours()
      )}:${pad(d.getMinutes())}`;
    }

    const MOCK_CASES = [
      {
        id: "CASE-10412",
        title: "MLX90393 intermittent magnetic offset drift",
        similarity: 0.91,
        resolution:
          "Customer PCB ground return issue; recommended star-ground + RC filter on VDD.",
      },
      {
        id: "CASE-09877",
        title: "ESD induced reset on LIN interface",
        similarity: 0.86,
        resolution: "Added TVS + layout changes; verified per IEC 61000-4-2.",
      },
      {
        id: "CASE-11203",
        title: "Overtemperature false trips in thermal protection",
        similarity: 0.82,
        resolution: "Firmware threshold mismatch; aligned calibration constants.",
      },
      {
        id: "CASE-07541",
        title: "EMI coupling causing ADC jitter",
        similarity: 0.78,
        resolution: "Shielding + input RC; changed sampling phase.",
      },
      {
        id: "CASE-12111",
        title: "Package-related solder void sensitivity",
        similarity: 0.74,
        resolution: "Reflow profile update; X-ray screening guidance.",
      },
    ];

    export default function App() {
      const [tab, setTab] = useState<"Details" | "AI Insights" | "Fact Collection">(
        "Details"
      );
      const [modal, setModal] = useState<null | "missing" | "similarity" | "fae" | "payload">(null);

      const [caseRec, setCaseRec] = useState({
        caseId: "MLX-TECH-POC-00037",
        status: "New",
        priority: "High",
        customerName: "[Customer Name]",
        contact: "[Engineering Contact]",
        email: "",
        productNumber: "MLX90393",
        dateCode: "",
        packageType: "",
        quantity: "",
        affectedLot: "",
        issueTitle: "Intermittent offset drift at high EMI",
        symptom: "Observed sensor offset drift when motor PWM is enabled.",
        environment: "24V system; PWM 20kHz; ambient 85°C.",
        firmware: "",
        software: "",
        attachments: "",
      });

      const [agent, setAgent] = useState({
        a: "Idle",
        b: "Idle",
        c: "Idle",
        d: "Idle",
      });

      const [classification, setClassification] = useState({
        category: "",
        confidence: 0,
        extracted: {} as Record<string, string>,
        missing: [] as string[],
      });

      const [retrieval, setRetrieval] = useState({
        ready: false,
        cases: [] as typeof MOCK_CASES,
      });

      const [draft, setDraft] = useState({
        ready: false,
        text: "",
        safety: [] as string[],
      });

      const [log, setLog] = useState([{ t: stamp(), msg: "New technical inquiry detected in Salesforce." }]);

      const missingCritical = useMemo(() => {
        const m: string[] = [];
        if (!caseRec.email.trim()) m.push("Customer email");
        if (!caseRec.dateCode.trim()) m.push("Date code (4-digit)");
        if (!caseRec.packageType.trim()) m.push("Package type affected");
        if (!caseRec.quantity.trim()) m.push("Affected quantity");
        if (!caseRec.affectedLot.trim()) m.push("Affected lot number");
        if (!caseRec.firmware.trim()) m.push("Firmware version");
        if (!caseRec.software.trim()) m.push("Software version");
        if (!caseRec.attachments.trim()) m.push("Evidence / attachments (photos, setup, logs)");
        return m;
      }, [caseRec]);

      const completeness = useMemo(() => {
        if (!missingCritical.length) return { label: "Complete", tone: "ok" as Tone };
        if (missingCritical.length <= 3) return { label: "Minor gaps", tone: "warn" as Tone };
        return { label: "Missing critical data", tone: "bad" as Tone };
      }, [missingCritical.length]);

      const logIt = (msg: string) => setLog((x) => [{ t: stamp(), msg }, ...x]);

      const agentPill = (s: string) => (
        <Pill text={s} tone={s === "Done" ? "ok" : s === "Running" ? "warn" : "neutral"} />
      );

      function runA() {
        setAgent((a) => ({ ...a, a: "Running" }));
        logIt("Agent (a) started: intake & classification.");
        const cat =
          caseRec.issueTitle.toLowerCase().includes("emi") ||
          caseRec.symptom.toLowerCase().includes("pwm")
            ? "EMC / EMI"
            : "Functional failure";

        const conf = 0.86;
        const extracted = {
          PN: caseRec.productNumber,
          Customer: caseRec.customerName,
          Symptom: caseRec.symptom,
          Environment: caseRec.environment,
          Priority: caseRec.priority,
        };

        setTimeout(() => {
          setClassification({ category: cat, confidence: conf, extracted, missing: missingCritical });
          setAgent((a) => ({ ...a, a: "Done" }));
          setCaseRec((c) => ({ ...c, status: "In Progress" }));
          logIt(`Classified as "${cat}" (confidence ${Math.round(conf * 100)}%).`);
          if (missingCritical.length) logIt("Missing information detected; Data Completion Agent recommended.");
        }, 350);
      }

      function runD() {
        setAgent((a) => ({ ...a, d: "Running" }));
        logIt("Agent (d) started: one-click missing data request (template-driven).");
        setTimeout(() => {
          setAgent((a) => ({ ...a, d: "Done" }));
          logIt("Missing-data request prepared (mock).");
          setModal("missing");
        }, 250);
      }

      function runB() {
        setAgent((a) => ({ ...a, b: "Running" }));
        logIt("Agent (b) started: similarity retrieval (Databricks + Salesforce).");
        setTimeout(() => {
          setRetrieval({ ready: true, cases: MOCK_CASES });
          setAgent((a) => ({ ...a, b: "Done" }));
          logIt("Similarity report ready (top 5).");
        }, 450);
      }

      function runC() {
        setAgent((a) => ({ ...a, c: "Running" }));
        logIt("Agent (c) started: first response package drafting.");
        setTimeout(() => {
          const text =
            "We reviewed your description and see a strong correlation with motor PWM enabling. Based on similar historical cases, likely contributors are EMI coupling and/or ground reference shift.\n\n" +
            "Recommended next steps:\n" +
            "1) Capture VDD ripple/GND bounce and output with PWM OFF vs ON.\n" +
            "2) Share PCB layout snapshots around sensor + decoupling.\n" +
            "3) Confirm date code, package type, lot, quantity and firmware/software revisions.\n\n" +
            "Once we receive the missing production identifiers, we can narrow the hypothesis and propose a targeted verification plan.";

          setDraft({
            ready: true,
            text,
            safety: [
              "Do not commit to root cause without evidence.",
              "FAE review required before customer-facing guidance.",
            ],
          });

          setAgent((a) => ({ ...a, c: "Done" }));
          logIt("AI first response draft generated (customer-safe, caveated).");
        }, 500);
      }

      function logBack() {
        logIt("Logged back to Salesforce: updated case with summary + rationale (mock).");
        setModal("payload");
      }

      const topbar: React.CSSProperties = {
        background: COLORS.royalBlue,
        color: COLORS.white,
        padding: "10px 14px",
        borderBottom: "1px solid rgba(255,255,255,0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      };

      return (
        <div
          style={{
            minHeight: "100vh",
            background: COLORS.bg,
            fontFamily:
              "Lato, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
            color: COLORS.ink,
          }}
        >
          <style>{`@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap'); a{ color:${COLORS.royalBlue}; text-decoration: underline; }`}</style>

          <div style={topbar}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 10, height: 10, background: COLORS.electricGreen }} />
              <div style={{ fontWeight: 1000, letterSpacing: 0.3 }}>
                Salesforce • Technical Inquiry POC
              </div>
              <div style={{ opacity: 0.9, fontSize: 12 }}>
                Melexis Agentic Support (POC)
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Pill text={caseRec.status} tone={caseRec.status === "New" ? "warn" : "ok"} />
              <Pill text={caseRec.priority} tone={caseRec.priority === "High" ? "bad" : "neutral"} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr 380px", gap: 12, padding: 12 }}>
            {/* Left */}
            <div style={{ display: "grid", gap: 12 }}>
              <Card title="Agents" right={<Pill text={completeness.label} tone={completeness.tone} />}>
                <div style={{ display: "grid", gap: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                    <div style={{ fontWeight: 900, color: COLORS.charcoal }}>(a) Intake & Classification</div>
                    {agentPill(agent.a)}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                    <div style={{ fontWeight: 900, color: COLORS.charcoal }}>(b) Historical Retrieval</div>
                    {agentPill(agent.b)}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                    <div style={{ fontWeight: 900, color: COLORS.charcoal }}>(c) Reasoning & Suggestions</div>
                    {agentPill(agent.c)}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                    <div style={{ fontWeight: 900, color: COLORS.charcoal }}>(d) Data Completion</div>
                    {agentPill(agent.d)}
                  </div>
                </div>

                <div style={{ height: 10 }} />
                <div style={{ display: "grid", gap: 8 }}>
                  <Button onClick={runA}>Run Agent (a)</Button>
                  <Button variant="success" onClick={runD} disabled={!missingCritical.length}>
                    Request missing data
                  </Button>
                  <Button variant="secondary" onClick={runB} disabled={!classification.category}>
                    Retrieve similar cases
                  </Button>
                  <Button variant="secondary" onClick={runC} disabled={!retrieval.ready}>
                    Generate AI first response
                  </Button>
                  <Button variant="primary" onClick={logBack} disabled={!draft.ready}>
                    Log back to Salesforce
                  </Button>
                </div>
              </Card>

              <Card title="Audit trail" right={<Pill text={`${log.length} events`} tone="neutral" />}>
                <div style={{ maxHeight: 360, overflow: "auto", display: "grid", gap: 10 }}>
                  {log.map((e, idx) => (
                    <div key={idx} style={{ border: BORDER, borderRadius: R, padding: 10, background: "rgba(178,196,203,0.18)" }}>
                      <div style={{ fontSize: 11, color: COLORS.charcoal, opacity: 0.9 }}>{e.t}</div>
                      <div style={{ fontSize: 12, fontWeight: 700 }}>{e.msg}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Middle */}
            <div style={{ display: "grid", gap: 12 }}>
              <div style={{ border: BORDER, borderRadius: R, background: COLORS.white, padding: "12px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <div style={{ display: "grid", gap: 6 }}>
                  <div style={{ fontWeight: 1000, fontSize: 16, color: COLORS.royalBlue }}>
                    {caseRec.caseId} — {caseRec.issueTitle}
                  </div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <Pill text={`PN: ${caseRec.productNumber || "—"}`} />
                    <Pill text={`Customer: ${caseRec.customerName || "—"}`} />
                    <Pill text={classification.category ? `Category: ${classification.category}` : "Category: (not classified)"} tone={classification.category ? "ok" : "warn"} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
                  <Button variant="secondary" onClick={() => setModal("similarity")} disabled={!retrieval.ready}>
                    View similarity report
                  </Button>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Button variant={tab === "Details" ? "primary" : "secondary"} onClick={() => setTab("Details")}>
                  Details
                </Button>
                <Button variant={tab === "AI Insights" ? "primary" : "secondary"} onClick={() => setTab("AI Insights")}>
                  AI Insights
                </Button>
                <Button variant={tab === "Fact Collection" ? "primary" : "secondary"} onClick={() => setTab("Fact Collection")}>
                  Fact Collection
                </Button>
              </div>

              {tab === "Details" ? (
                <Card title="Technical inquiry form (Salesforce)" right={<Pill text="Editable" />}>
                  <div style={{ display: "grid", gap: 12 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <Field label="Customer Name" value={caseRec.customerName} onChange={(v) => setCaseRec((s) => ({ ...s, customerName: v }))} />
                      <Field label="Contact" value={caseRec.contact} onChange={(v) => setCaseRec((s) => ({ ...s, contact: v }))} />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <Field label="Customer Email" value={caseRec.email} placeholder="name@customer.com" required onChange={(v) => setCaseRec((s) => ({ ...s, email: v }))} />
                      <Field label="Product Number (PN)" value={caseRec.productNumber} mono onChange={(v) => setCaseRec((s) => ({ ...s, productNumber: v }))} />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                      <Field label="Date Code" value={caseRec.dateCode} placeholder="4-digit" required onChange={(v) => setCaseRec((s) => ({ ...s, dateCode: v }))} />
                      <Field label="Package Type affected" value={caseRec.packageType} placeholder="e.g., QFN" required onChange={(v) => setCaseRec((s) => ({ ...s, packageType: v }))} />
                      <Field label="Affected Lot No." value={caseRec.affectedLot} required onChange={(v) => setCaseRec((s) => ({ ...s, affectedLot: v }))} />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <Field label="Quantity affected" value={caseRec.quantity} required onChange={(v) => setCaseRec((s) => ({ ...s, quantity: v }))} />
                      <Field label="Evidence / Attachments" value={caseRec.attachments} required onChange={(v) => setCaseRec((s) => ({ ...s, attachments: v }))} />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <Field label="Firmware version" value={caseRec.firmware} required onChange={(v) => setCaseRec((s) => ({ ...s, firmware: v }))} />
                      <Field label="Software version" value={caseRec.software} required onChange={(v) => setCaseRec((s) => ({ ...s, software: v }))} />
                    </div>

                    <TextArea label="Symptom" value={caseRec.symptom} onChange={(v) => setCaseRec((s) => ({ ...s, symptom: v }))} rows={3} />
                    <TextArea label="Environment / setup" value={caseRec.environment} onChange={(v) => setCaseRec((s) => ({ ...s, environment: v }))} rows={3} />

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <Button onClick={runA}>Run classification</Button>
                      <Button variant="success" onClick={runD} disabled={!missingCritical.length}>
                        Request missing data
                      </Button>
                    </div>
                  </div>
                </Card>
              ) : null}

              {tab === "AI Insights" ? (
                <div style={{ display: "grid", gap: 12 }}>
                  <Card
                    title="Classification & extraction"
                    right={
                      classification.category ? (
                        <Pill text={`${classification.category} • ${Math.round(classification.confidence * 100)}%`} tone="ok" />
                      ) : (
                        <Pill text="Not run" tone="warn" />
                      )
                    }
                  >
                    <div style={{ display: "grid", gap: 10 }}>
                      <div style={{ border: BORDER, borderRadius: R, padding: 10, background: "rgba(178,196,203,0.18)" }}>
                        <div style={{ fontWeight: 1000, color: COLORS.royalBlue }}>Extracted fields</div>
                        <div style={{ marginTop: 8, fontSize: 12, display: "grid", gap: 6 }}>
                          {Object.keys(classification.extracted).length ? (
                            Object.entries(classification.extracted).map(([k, v]) => (
                              <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                                <div style={{ fontWeight: 900, color: COLORS.charcoal }}>{k}</div>
                                <div style={{ textAlign: "right" }}>{String(v)}</div>
                              </div>
                            ))
                          ) : (
                            <div style={{ color: COLORS.charcoal }}>Run Agent (a) to extract key fields.</div>
                          )}
                        </div>
                      </div>

                      <div style={{ border: BORDER, borderRadius: R, padding: 10, background: "rgba(219,65,64,0.07)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                          <div style={{ fontWeight: 1000, color: COLORS.royalBlue }}>Missing information</div>
                          {missingCritical.length ? <Pill text={`${missingCritical.length} items`} tone="bad" /> : <Pill text="None" tone="ok" />}
                        </div>
                        {missingCritical.length ? (
                          <ul style={{ margin: "10px 0 0 0", paddingLeft: 18, fontSize: 12, display: "grid", gap: 6 }}>
                            {missingCritical.map((m) => (
                              <li key={m}>{m}</li>
                            ))}
                          </ul>
                        ) : (
                          <div style={{ marginTop: 10, fontSize: 12 }}>All required data appears present.</div>
                        )}
                        <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                          <Button variant="success" onClick={runD} disabled={!missingCritical.length}>
                            One-click request missing data
                          </Button>
                          <Button variant="secondary" onClick={runB} disabled={!classification.category}>
                            Retrieve similar cases
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card title="Historical similarity (top 5)" right={retrieval.ready ? <Pill text="Ready" tone="ok" /> : <Pill text="Not run" tone="warn" />}>
                    {retrieval.ready ? (
                      <div style={{ display: "grid", gap: 8 }}>
                        {retrieval.cases.map((c) => (
                          <div key={c.id} style={{ border: BORDER, borderRadius: R, padding: 10, background: "rgba(178,196,203,0.14)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                              <div style={{ fontWeight: 1000, color: COLORS.royalBlue }}>
                                {c.id} — {c.title}
                              </div>
                              <Pill text={`${Math.round(c.similarity * 100)}%`} tone="ok" />
                            </div>
                            <div style={{ marginTop: 6, fontSize: 12, color: COLORS.charcoal }}>Prior resolution: {c.resolution}</div>
                          </div>
                        ))}
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          <Button variant="secondary" onClick={() => setModal("similarity")}>
                            Open full report
                          </Button>
                          <Button onClick={runC} disabled={!retrieval.ready}>
                            Generate first response
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ fontSize: 12, color: COLORS.charcoal }}>Run Agent (b) to generate the similarity package.</div>
                    )}
                  </Card>

                  <Card title="AI first response package" right={draft.ready ? <Pill text="Drafted" tone="ok" /> : <Pill text="Not generated" tone="warn" />}>
                    {draft.ready ? (
                      <div style={{ display: "grid", gap: 12 }}>
                        <div style={{ border: BORDER, borderRadius: R, padding: 10, background: "rgba(101,187,169,0.10)", whiteSpace: "pre-wrap", fontSize: 12, lineHeight: 1.45 }}>
                          {draft.text}
                        </div>

                        <div style={{ border: BORDER, borderRadius: R, padding: 10, background: "rgba(219,65,64,0.07)" }}>
                          <div style={{ fontWeight: 1000, color: COLORS.royalBlue }}>Safety & review</div>
                          <ul style={{ margin: "8px 0 0 0", paddingLeft: 18, fontSize: 12, display: "grid", gap: 6 }}>
                            {draft.safety.map((s) => (
                              <li key={s}>{s}</li>
                            ))}
                          </ul>
                        </div>

                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          <Button variant="secondary" onClick={() => setModal("fae")}>
                            FAE review view
                          </Button>
                          <Button variant="primary" onClick={logBack}>
                            Finalize & log
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ fontSize: 12, color: COLORS.charcoal }}>Run Agents (a) → (b) → (c) to create the full response package.</div>
                    )}
                  </Card>
                </div>
              ) : null}

              {tab === "Fact Collection" ? (
                <Card title="Fact Collection (template-driven)" right={<Pill text="Internal report" />}>
                  <div style={{ display: "grid", gap: 12, fontSize: 12, color: COLORS.charcoal }}>
                    <div>
                      This is a simplified representation of the Fact Collection Template.

                      Use <b>Request missing data</b> to generate a customer email preview.
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <Button variant="success" onClick={runD} disabled={!missingCritical.length}>
                        Preview missing-data request
                      </Button>
                      <Button variant="secondary" onClick={() => setModal("payload")}>
                        Export / attach (mock)
                      </Button>
                    </div>
                  </div>
                </Card>
              ) : null}
            </div>

            {/* Right */}
            <div style={{ display: "grid", gap: 12 }}>
              <Card title="AI recommendations" right={<Pill text="Salesforce extension" />}>
                <div style={{ display: "grid", gap: 12 }}>
                  <div style={{ fontWeight: 1000, color: COLORS.royalBlue }}>Next best action</div>
                  {!classification.category ? (
                    <div style={{ fontSize: 12, color: COLORS.charcoal }}>Run Agent (a) to classify and extract details.</div>
                  ) : missingCritical.length ? (
                    <div style={{ fontSize: 12, color: COLORS.charcoal }}>Request missing data before committing to a root cause.</div>
                  ) : !retrieval.ready ? (
                    <div style={{ fontSize: 12, color: COLORS.charcoal }}>Retrieve similar cases to ground the response.</div>
                  ) : !draft.ready ? (
                    <div style={{ fontSize: 12, color: COLORS.charcoal }}>Generate the first response package for FAE review.</div>
                  ) : (
                    <div style={{ fontSize: 12, color: COLORS.charcoal }}>Finalize with FAE approval and log back to Salesforce.</div>
                  )}

                  <div style={{ display: "grid", gap: 8 }}>
                    <Button onClick={runA}>Run intake</Button>
                    <Button variant="success" onClick={runD} disabled={!missingCritical.length}>
                      Request missing data
                    </Button>
                    <Button variant="secondary" onClick={runB} disabled={!classification.category}>
                      Similarity search
                    </Button>
                    <Button variant="secondary" onClick={runC} disabled={!retrieval.ready}>
                      Draft response
                    </Button>
                  </div>

                  <div style={{ borderTop: BORDER, paddingTop: 12, display: "grid", gap: 8 }}>
                    <div style={{ fontWeight: 1000, color: COLORS.royalBlue }}>Risk & compliance</div>
                    <div style={{ border: BORDER, borderRadius: R, padding: 10, background: "rgba(219,65,64,0.07)", fontSize: 12 }}>
                      <div style={{ fontWeight: 900 }}>Human review gate</div>
                      <div style={{ marginTop: 6, color: COLORS.charcoal }}>
                        Customer-facing answers require FAE approval. The AI draft is advisory.
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="Quick similarity snapshot" right={<Pill text="Top 5" />}>
                {retrieval.ready ? (
                  <div style={{ display: "grid", gap: 8 }}>
                    {retrieval.cases.map((c) => (
                      <div key={c.id} style={{ display: "flex", justifyContent: "space-between", gap: 10, borderBottom: "1px solid rgba(0,0,0,0.08)", paddingBottom: 8 }}>
                        <div style={{ fontSize: 12, fontWeight: 900, color: COLORS.charcoal }}>{c.id}</div>
                        <Pill text={`${Math.round(c.similarity * 100)}%`} tone="ok" />
                      </div>
                    ))}
                    <Button variant="secondary" onClick={() => setModal("similarity")}>
                      Open report
                    </Button>
                  </div>
                ) : (
                  <div style={{ fontSize: 12, color: COLORS.charcoal }}>Run similarity search to populate this panel.</div>
                )}
              </Card>
            </div>
          </div>

          <Modal open={modal === "missing"} title="One-click missing data request (preview)" onClose={() => setModal(null)} width={900}>
            <div style={{ display: "grid", gap: 12 }}>
              <div style={{ fontSize: 12, color: COLORS.charcoal }}>
                Template-driven request preview (customer email).
              </div>

              <div style={{ border: BORDER, borderRadius: R, padding: 12, background: "rgba(178,196,203,0.14)" }}>
                <div style={{ fontWeight: 1000, color: COLORS.royalBlue }}>Email draft to customer</div>
                <div style={{ marginTop: 8, whiteSpace: "pre-wrap", fontSize: 12, lineHeight: 1.45 }}>
{`Subject: ${caseRec.caseId} – Request for additional technical facts

Hello ${caseRec.contact || ""},

To progress your inquiry, we need the following items:

${(missingCritical.length ? missingCritical : ["(no missing items detected)"]).map((x) => "- " + x).join("\n")}

Thank you,
Melexis FAE (POC)`}
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Button variant="success" onClick={() => { logIt("Missing-data request sent (mock)."); setModal(null); }}>
                  Send request
                </Button>
                <Button variant="secondary" onClick={() => setModal(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          </Modal>

          <Modal open={modal === "similarity"} title="Similarity report (structured)" onClose={() => setModal(null)} width={880}>
            <div style={{ display: "grid", gap: 10 }}>
              {(retrieval.ready ? retrieval.cases : MOCK_CASES).map((c) => (
                <div key={c.id} style={{ border: BORDER, borderRadius: R, padding: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                    <div style={{ fontWeight: 1000, color: COLORS.royalBlue }}>{c.id}</div>
                    <Pill text={`Similarity ${Math.round(c.similarity * 100)}%`} tone="ok" />
                  </div>
                  <div style={{ marginTop: 6, fontSize: 12, fontWeight: 900 }}>{c.title}</div>
                  <div style={{ marginTop: 6, fontSize: 12, color: COLORS.charcoal }}>{c.resolution}</div>
                </div>
              ))}
            </div>
          </Modal>

          <Modal open={modal === "fae"} title="FAE review view (approval gate)" onClose={() => setModal(null)} width={880}>
            <div style={{ display: "grid", gap: 12 }}>
              <div style={{ fontSize: 12, color: COLORS.charcoal }}>
                FAE reviews and finalizes the AI draft before it becomes customer-facing.
              </div>
              <textarea defaultValue={draft.text} rows={12} style={{ border: BORDER, borderRadius: R, padding: 10, fontSize: 12, outline: "none" }} />
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Button variant="success" onClick={() => { logIt("FAE approved draft (mock)."); setModal(null); }}>
                  Approve
                </Button>
                <Button variant="danger" onClick={() => { logIt("FAE requested changes (mock)."); setModal(null); }}>
                  Request changes
                </Button>
              </div>
            </div>
          </Modal>

          <Modal open={modal === "payload"} title="Salesforce logging payload (mock)" onClose={() => setModal(null)} width={760}>
            <pre style={{ border: BORDER, borderRadius: R, padding: 12, background: "rgba(178,196,203,0.14)", fontSize: 12, overflow: "auto" }}>
{JSON.stringify(
  {
    caseId: caseRec.caseId,
    classification: classification.category || "(not run)",
    missingCount: missingCritical.length,
    topSimilar: (retrieval.ready ? retrieval.cases : []).slice(0, 3).map((c) => ({ id: c.id, sim: c.similarity })),
    draftReady: draft.ready,
  },
  null,
  2
)}
            </pre>
          </Modal>
        </div>
      );
    }
