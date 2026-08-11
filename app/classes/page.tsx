"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Calendar,
  Clock,
  MapPin,
  Award,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Users,
  ShieldCheck,
} from "lucide-react";

const courseDetails = [
  { label: "Course", value: "Intermediate First Aid + CPR C/AED" },
  { label: "Price", value: "$148 + GST" },
  { label: "Duration", value: "14 instructional hours" },
  { label: "Format", value: "Two-day in-class training" },
  { label: "Certification", value: "3 years" },
  { label: "Prerequisites", value: "None" },
  { label: "Location", value: "FAIRSAFE Training Centre – Surrey, BC" },
];

const learnItems = [
  "Emergency scene assessment and response",
  "Check, Call, Care",
  "Airway and breathing emergencies",
  "CPR for adults, children, and infants",
  "Automated External Defibrillator (AED) use",
  "Circulation emergencies",
  "Respiratory and cardiac arrest",
  "Choking",
  "Wound care and bleeding",
  "Head, neck and spinal injuries",
  "Bone, muscle and joint injuries",
  "Sudden medical emergencies",
  "Environmental emergencies",
  "Poisoning and opioid poisoning awareness",
];

const certRequirements = [
  "Attend and participate in 100% of the course",
  "Demonstrate competency in required practical skills",
  "Successfully complete required skill evaluations",
  "Achieve a minimum score of 75% on the written knowledge evaluation",
];

const policies = [
  {
    title: "Payment",
    body: "Full payment is required to reserve your seat. Course registration is confirmed once payment has been received.",
  },
  {
    title: "Cancellation & Rescheduling",
    body: "Students may transfer their registration to another available course date with at least 48 hours' notice. Cancellations made less than 48 hours before the course and no-shows are non-refundable.",
  },
  {
    title: "Late Arrivals",
    body: "Because Canadian Red Cross certification requires full course participation, late arrivals may not be permitted to continue if required instructional material has been missed.",
  },
  {
    title: "Attendance",
    body: "Participants must attend and actively participate in the entire course to qualify for certification.",
  },
  {
    title: "Course Completion",
    body: "Registration does not guarantee certification. Participants must successfully complete the required knowledge and practical evaluations.",
  },
  {
    title: "Course Changes",
    body: "FAIRSAFE reserves the right to reschedule a course when necessary, including due to instructor availability, emergencies, or insufficient enrolment. Registered participants will be offered another available date or a refund if FAIRSAFE cancels the course.",
  },
  {
    title: "Training Partner",
    body: "Canadian Red Cross training delivered at FAIRSAFE is provided in collaboration with an authorized Canadian Red Cross Training Partner.",
  },
];

const availableDates = [
  { date: "Sat–Sun, Aug 22–23, 2026", seats: 6 },
  { date: "Sat–Sun, Sep 5–6, 2026", seats: 8 },
  { date: "Sat–Sun, Sep 19–20, 2026", seats: 4 },
  { date: "Sat–Sun, Oct 3–4, 2026", seats: 8 },
  { date: "Sat–Sun, Oct 17–18, 2026", seats: 8 },
];

const PRICE = 148;
const GST_RATE = 0.05;

type Step = "info" | "calendar" | "checkout" | "confirmed";

export default function ClassesPage() {
  const [step, setStep] = useState<Step>("info");
  const [policiesOpen, setPoliciesOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);

  const gst = +(PRICE * GST_RATE).toFixed(2);
  const total = +(PRICE + gst).toFixed(2);

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setStep("confirmed");
    }, 700);
  };

  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{
          background: "#FFFFFF",
          paddingTop: 120,
          paddingBottom: 60,
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div className="section-label">First Aid Classes</div>
          <h1
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(2.4rem,5vw,4rem)",
              letterSpacing: "0.02em",
              lineHeight: 1.05,
              marginBottom: 18,
            }}
          >
            INTERMEDIATE FIRST AID
            <br />
            <span style={{ color: "#7C3AED" }}>+ CPR C/AED</span>
          </h1>
          <p
            style={{
              color: "rgba(26,10,46,0.6)",
              fontSize: "0.95rem",
              fontWeight: 700,
              letterSpacing: "0.03em",
              marginBottom: 20,
            }}
          >
            Canadian Red Cross Training &nbsp;|&nbsp; WorkSafeBC-Recognized Intermediate First Aid
          </p>
          <div
            style={{
              display: "inline-flex",
              alignItems: "baseline",
              gap: 6,
              background: "rgba(124,58,237,0.08)",
              border: "1px solid rgba(124,58,237,0.25)",
              borderRadius: 10,
              padding: "10px 24px",
              marginBottom: 24,
            }}
          >
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2rem", color: "#5B21B6" }}>
              $148
            </span>
            <span style={{ color: "rgba(26,10,46,0.6)", fontSize: "0.9rem" }}>+ GST</span>
          </div>
          <p
            style={{
              color: "rgba(26,10,46,0.65)",
              lineHeight: 1.85,
              fontSize: "1rem",
              marginBottom: 32,
            }}
          >
            Build the confidence and practical skills to respond when an emergency happens.
          </p>

          {step === "info" && (
            <button
              onClick={() => setStep("calendar")}
              style={{
                background: "#7C3AED",
                color: "white",
                border: "none",
                padding: "16px 40px",
                borderRadius: 8,
                fontSize: "0.9rem",
                fontWeight: 800,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Book Now
            </button>
          )}
        </div>
      </section>

      {step === "info" && (
        <>
          {/* ── ABOUT THE COURSE ── */}
          <section style={{ background: "#F8F5FF", padding: "70px 5%" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <p style={{ color: "rgba(26,10,46,0.7)", lineHeight: 1.85, marginBottom: 20 }}>
                FAIRSAFE offers Canadian Red Cross Intermediate First Aid + CPR C/AED training in
                Surrey, delivered in collaboration with a Canadian Red Cross Training Partner. This
                comprehensive course is designed for workers, employers, students, caregivers, and
                anyone looking for a higher level of practical first aid training.
              </p>
              <p style={{ color: "rgba(26,10,46,0.7)", lineHeight: 1.85 }}>
                The certification is recognized by{" "}
                <strong style={{ color: "#1A0A2E" }}>WorkSafeBC</strong> as an accepted Intermediate
                First Aid certification in British Columbia.
              </p>
            </div>
          </section>

          {/* ── COURSE DETAILS ── */}
          <section style={{ background: "#FFFFFF", padding: "70px 5%" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <div className="section-label">Course Details</div>
              <h2
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
                  letterSpacing: "0.02em",
                  marginBottom: 28,
                }}
              >
                WHAT'S <span style={{ color: "#7C3AED" }}>INCLUDED</span>
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
                  gap: 16,
                  marginBottom: 24,
                }}
              >
                {courseDetails.map((d) => (
                  <div
                    key={d.label}
                    className="card"
                    style={{
                      padding: "18px 22px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 800,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#7C3AED",
                      }}
                    >
                      {d.label}
                    </span>
                    <span style={{ color: "#1A0A2E", fontWeight: 600, fontSize: "0.95rem" }}>
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>
              <p
                style={{
                  color: "rgba(26,10,46,0.6)",
                  lineHeight: 1.85,
                  fontSize: "0.92rem",
                }}
              >
                CPR Level C includes CPR and emergency response skills for adults, children, and
                infants, along with AED training.
              </p>
            </div>
          </section>

          {/* ── WHAT YOU'LL LEARN ── */}
          <section style={{ background: "#F8F5FF", padding: "70px 5%" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <div className="section-label">Curriculum</div>
              <h2
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
                  letterSpacing: "0.02em",
                  marginBottom: 28,
                }}
              >
                WHAT YOU'LL <span style={{ color: "#7C3AED" }}>LEARN</span>
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                  gap: 14,
                  marginBottom: 28,
                }}
              >
                {learnItems.map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                    }}
                  >
                    <CheckCircle2 size={18} color="#7C3AED" style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ color: "rgba(26,10,46,0.75)", lineHeight: 1.6, fontSize: "0.92rem" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <p style={{ color: "rgba(26,10,46,0.6)", lineHeight: 1.85, fontSize: "0.92rem" }}>
                Training combines classroom instruction with practical, hands-on scenarios so
                participants can develop the confidence to respond effectively during real
                emergencies.
              </p>
            </div>
          </section>

          {/* ── CERTIFICATION REQUIREMENTS ── */}
          <section style={{ background: "#FFFFFF", padding: "70px 5%" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <div className="section-label">Certification</div>
              <h2
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
                  letterSpacing: "0.02em",
                  marginBottom: 20,
                }}
              >
                CERTIFICATION <span style={{ color: "#7C3AED" }}>REQUIREMENTS</span>
              </h2>
              <p style={{ color: "rgba(26,10,46,0.65)", lineHeight: 1.85, marginBottom: 20 }}>
                To successfully complete the course, participants must:
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                {certRequirements.map((r) => (
                  <li key={r} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <Award size={18} color="#7C3AED" style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ color: "rgba(26,10,46,0.75)", lineHeight: 1.6, fontSize: "0.92rem" }}>
                      {r}
                    </span>
                  </li>
                ))}
              </ul>
              <p style={{ color: "rgba(26,10,46,0.6)", lineHeight: 1.85, fontSize: "0.92rem" }}>
                Successful participants receive a digital Canadian Red Cross Intermediate First Aid
                + CPR C/AED certificate valid for three years.
              </p>
            </div>
          </section>

          {/* ── REGISTRATION & COURSE POLICIES ── */}
          <section style={{ background: "#F8F5FF", padding: "70px 5%" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <div className="section-label">Before You Register</div>
              <h2
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
                  letterSpacing: "0.02em",
                  marginBottom: 24,
                }}
              >
                REGISTRATION & <span style={{ color: "#7C3AED" }}>COURSE POLICIES</span>
              </h2>

              <button
                onClick={() => setPoliciesOpen((v) => !v)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  background: "#FFFFFF",
                  border: "1px solid rgba(124,58,237,0.25)",
                  borderRadius: 10,
                  padding: "18px 22px",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "#1A0A2E",
                }}
              >
                View Payment, Cancellation & Attendance Policies
                <ChevronDown
                  size={20}
                  color="#7C3AED"
                  style={{
                    transform: policiesOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.25s ease",
                  }}
                />
              </button>

              {policiesOpen && (
                <div
                  style={{
                    marginTop: 16,
                    background: "#FFFFFF",
                    border: "1px solid rgba(124,58,237,0.15)",
                    borderRadius: 10,
                    padding: "8px 22px",
                  }}
                >
                  {policies.map((p, i) => (
                    <div
                      key={p.title}
                      style={{
                        padding: "20px 0",
                        borderTop: i === 0 ? "none" : "1px solid rgba(26,10,46,0.08)",
                      }}
                    >
                      <h4
                        style={{
                          fontSize: "0.95rem",
                          fontWeight: 800,
                          color: "#5B21B6",
                          marginBottom: 8,
                        }}
                      >
                        {p.title}
                      </h4>
                      <p style={{ color: "rgba(26,10,46,0.65)", lineHeight: 1.75, fontSize: "0.9rem" }}>
                        {p.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* ── GROUP & WORKPLACE TRAINING ── */}
          <section style={{ background: "#FFFFFF", padding: "70px 5%" }}>
            <div
              style={{
                maxWidth: 900,
                margin: "0 auto",
                background: "#1A0A2E",
                borderRadius: 16,
                padding: "48px 40px",
                textAlign: "center",
              }}
            >
              <Users size={32} color="#B794F6" style={{ marginBottom: 16 }} />
              <h3
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: "clamp(1.6rem,3vw,2.2rem)",
                  color: "#FFFFFF",
                  letterSpacing: "0.02em",
                  marginBottom: 14,
                }}
              >
                NEED TRAINING FOR YOUR EMPLOYEES?
              </h3>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: 28, maxWidth: 560, margin: "0 auto 28px" }}>
                FAIRSAFE can arrange private group training for businesses, construction crews,
                community organizations, and other workplaces. Contact us for group scheduling and
                pricing.
              </p>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#7C3AED",
                  color: "white",
                  textDecoration: "none",
                  padding: "14px 30px",
                  borderRadius: 8,
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Contact Us <ArrowRight size={16} />
              </Link>
            </div>
          </section>

          {/* ── BOTTOM CTA ── */}
          <section style={{ background: "#F8F5FF", padding: "60px 5% 90px", textAlign: "center" }}>
            <p
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: "1.4rem",
                letterSpacing: "0.03em",
                color: "#1A0A2E",
                marginBottom: 6,
              }}
            >
              FAIRSAFE First Aid & Safety Solutions Inc.
            </p>
            <p style={{ color: "rgba(26,10,46,0.55)", fontSize: "0.9rem", marginBottom: 28 }}>
              Practical training. Fair pricing. Real-world safety.
            </p>
            <button
              onClick={() => setStep("calendar")}
              style={{
                background: "#7C3AED",
                color: "white",
                border: "none",
                padding: "16px 40px",
                borderRadius: 8,
                fontSize: "0.9rem",
                fontWeight: 800,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Book Now
            </button>
          </section>
        </>
      )}

      {/* ── CALENDAR STEP ── */}
      {step === "calendar" && (
        <section style={{ background: "#F8F5FF", padding: "60px 5% 100px" }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <button
              onClick={() => setStep("info")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "none",
                border: "none",
                color: "#7C3AED",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: "pointer",
                marginBottom: 24,
              }}
            >
              <ArrowLeft size={16} /> Back to course details
            </button>

            <div className="section-label">Step 1 of 2</div>
            <h2
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
                letterSpacing: "0.02em",
                marginBottom: 10,
              }}
            >
              SELECT A <span style={{ color: "#7C3AED" }}>CLASSROOM DATE</span>
            </h2>
            <p style={{ color: "rgba(26,10,46,0.6)", marginBottom: 32, fontSize: "0.92rem" }}>
              Intermediate First Aid + CPR C/AED — FAIRSAFE Training Centre, Surrey, BC
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {availableDates.map((d) => (
                <button
                  key={d.date}
                  onClick={() => {
                    setSelectedDate(d.date);
                    setStep("checkout");
                  }}
                  className="card"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px 24px",
                    cursor: "pointer",
                    border: "1px solid rgba(124,58,237,0.15)",
                    background: "#FFFFFF",
                    textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <Calendar size={20} color="#7C3AED" />
                    <div>
                      <div style={{ fontWeight: 700, color: "#1A0A2E", fontSize: "0.95rem" }}>
                        {d.date}
                      </div>
                      <div style={{ color: "rgba(26,10,46,0.5)", fontSize: "0.8rem" }}>
                        {d.seats} seats available
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={18} color="#7C3AED" />
                </button>
              ))}
            </div>

            <p style={{ color: "rgba(26,10,46,0.45)", fontSize: "0.82rem", marginTop: 24 }}>
              Don't see a date that works?{" "}
              <Link href="/contact" style={{ color: "#7C3AED", fontWeight: 700 }}>
                Contact us
              </Link>{" "}
              about upcoming or group sessions.
            </p>
          </div>
        </section>
      )}

      {/* ── CHECKOUT STEP ── */}
      {step === "checkout" && (
        <section style={{ background: "#F8F5FF", padding: "60px 5% 100px" }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <button
              onClick={() => setStep("calendar")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "none",
                border: "none",
                color: "#7C3AED",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: "pointer",
                marginBottom: 24,
              }}
            >
              <ArrowLeft size={16} /> Choose a different date
            </button>

            <div className="section-label">Step 2 of 2</div>
            <h2
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
                letterSpacing: "0.02em",
                marginBottom: 28,
              }}
            >
              CONFIRM YOUR <span style={{ color: "#7C3AED" }}>BOOKING</span>
            </h2>

            <div
              className="card"
              style={{
                padding: "24px 26px",
                marginBottom: 28,
                border: "1px solid rgba(124,58,237,0.15)",
                background: "#FFFFFF",
              }}
            >
              <h4 style={{ fontWeight: 800, color: "#1A0A2E", marginBottom: 14, fontSize: "1rem" }}>
                Intermediate First Aid + CPR C/AED
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(26,10,46,0.7)", fontSize: "0.88rem" }}>
                  <Calendar size={16} color="#7C3AED" /> {selectedDate}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(26,10,46,0.7)", fontSize: "0.88rem" }}>
                  <Clock size={16} color="#7C3AED" /> 14 instructional hours · Two-day in-class
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(26,10,46,0.7)", fontSize: "0.88rem" }}>
                  <MapPin size={16} color="#7C3AED" /> FAIRSAFE Training Centre – Surrey, BC
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(26,10,46,0.7)", fontSize: "0.88rem" }}>
                  <ShieldCheck size={16} color="#7C3AED" /> Canadian Red Cross · WorkSafeBC-recognized
                </div>
              </div>

              <div style={{ borderTop: "1px solid rgba(26,10,46,0.1)", paddingTop: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: "0.9rem", color: "rgba(26,10,46,0.7)" }}>
                  <span>Course fee</span>
                  <span>${PRICE.toFixed(2)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: "0.9rem", color: "rgba(26,10,46,0.7)" }}>
                  <span>GST (5%)</span>
                  <span>${gst.toFixed(2)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: "1.05rem", color: "#1A0A2E" }}>
                  <span>Total</span>
                  <span>${total.toFixed(2)} CAD</span>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleConfirm}
              className="card"
              style={{
                padding: "24px 26px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                border: "1px solid rgba(124,58,237,0.15)",
                background: "#FFFFFF",
              }}
            >
              <h4 style={{ fontWeight: 800, color: "#1A0A2E", fontSize: "0.95rem" }}>Your Details</h4>

              <input
                required
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={{
                  padding: "13px 16px",
                  borderRadius: 8,
                  border: "1px solid rgba(26,10,46,0.15)",
                  fontSize: "0.9rem",
                }}
              />
              <input
                required
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={{
                  padding: "13px 16px",
                  borderRadius: 8,
                  border: "1px solid rgba(26,10,46,0.15)",
                  fontSize: "0.9rem",
                }}
              />
              <input
                required
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                style={{
                  padding: "13px 16px",
                  borderRadius: 8,
                  border: "1px solid rgba(26,10,46,0.15)",
                  fontSize: "0.9rem",
                }}
              />

              <p style={{ color: "rgba(26,10,46,0.45)", fontSize: "0.78rem", lineHeight: 1.6 }}>
                Full payment is required to reserve your seat. Submitting this form sends a booking
                request — our team will follow up with payment instructions to confirm your seat.
              </p>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  background: "#7C3AED",
                  color: "white",
                  border: "none",
                  padding: "16px 30px",
                  borderRadius: 8,
                  fontSize: "0.9rem",
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  cursor: submitting ? "not-allowed" : "pointer",
                  opacity: submitting ? 0.7 : 1,
                }}
              >
                {submitting ? "Submitting..." : `Submit Booking Request — $${total.toFixed(2)}`}
              </button>
            </form>
          </div>
        </section>
      )}

      {/* ── CONFIRMED STEP ── */}
      {step === "confirmed" && (
        <section style={{ background: "#F8F5FF", padding: "120px 5% 140px", textAlign: "center" }}>
          <div style={{ maxWidth: 560, margin: "0 auto" }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "rgba(124,58,237,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <CheckCircle2 size={36} color="#7C3AED" />
            </div>
            <h2
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
                letterSpacing: "0.02em",
                marginBottom: 14,
              }}
            >
              BOOKING REQUEST <span style={{ color: "#7C3AED" }}>RECEIVED</span>
            </h2>
            <p style={{ color: "rgba(26,10,46,0.65)", lineHeight: 1.85, marginBottom: 8 }}>
              Thanks, {form.name || "there"} — your seat for{" "}
              <strong style={{ color: "#1A0A2E" }}>{selectedDate}</strong> is on hold.
            </p>
            <p style={{ color: "rgba(26,10,46,0.6)", lineHeight: 1.85, marginBottom: 32 }}>
              Our team will contact you shortly at {form.email} with payment instructions to
              confirm your registration.
            </p>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#7C3AED",
                color: "white",
                textDecoration: "none",
                padding: "14px 30px",
                borderRadius: 8,
                fontSize: "0.85rem",
                fontWeight: 800,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Back to Home
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
