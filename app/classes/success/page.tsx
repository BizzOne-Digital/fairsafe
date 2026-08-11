import Link from "next/link";
import Stripe from "stripe";
import { CheckCircle2, XCircle } from "lucide-react";

export const metadata = { title: "Booking Confirmed – FAIRSAFE First Aid & Safety Solutions" };
export const dynamic = "force-dynamic";

async function getSession(sessionId: string) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return null;

  const stripe = new Stripe(secretKey);

  try {
    return await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return null;
  }
}

export default async function ClassesSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const session = session_id ? await getSession(session_id) : null;
  const paid = session?.payment_status === "paid";

  return (
    <section style={{ background: "#F8F5FF", padding: "140px 5% 140px", textAlign: "center" }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: paid ? "rgba(124,58,237,0.12)" : "rgba(220,38,38,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          {paid ? (
            <CheckCircle2 size={36} color="#7C3AED" />
          ) : (
            <XCircle size={36} color="#DC2626" />
          )}
        </div>

        <h1
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
            letterSpacing: "0.02em",
            marginBottom: 14,
          }}
        >
          {paid ? (
            <>
              PAYMENT <span style={{ color: "#7C3AED" }}>CONFIRMED</span>
            </>
          ) : (
            "PAYMENT NOT CONFIRMED"
          )}
        </h1>

        {paid ? (
          <>
            <p style={{ color: "rgba(26,10,46,0.65)", lineHeight: 1.85, marginBottom: 8 }}>
              Thanks, {session?.metadata?.name || "there"} — your seat for{" "}
              <strong style={{ color: "#1A0A2E" }}>{session?.metadata?.classDate}</strong> is
              confirmed.
            </p>
            <p style={{ color: "rgba(26,10,46,0.6)", lineHeight: 1.85, marginBottom: 32 }}>
              A receipt has been sent to {session?.customer_email}. Our team will follow up with
              location and prep details before your course date.
            </p>
          </>
        ) : (
          <p style={{ color: "rgba(26,10,46,0.6)", lineHeight: 1.85, marginBottom: 32 }}>
            We couldn't confirm this payment. If you were charged, contact us and we'll sort it out
            — otherwise, please try booking again.
          </p>
        )}

        <Link
          href={paid ? "/" : "/classes"}
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
          {paid ? "Back to Home" : "Try Again"}
        </Link>
      </div>
    </section>
  );
}
