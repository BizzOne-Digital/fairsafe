import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const PRICE_CAD = 148;
const GST_RATE = 0.05;

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json(
      { error: "Payments are not configured yet." },
      { status: 500 }
    );
  }

  const stripe = new Stripe(secretKey);

  const { classDate, name, email, phone } = await req.json();

  if (!classDate || !name || !email) {
    return NextResponse.json(
      { error: "Missing required booking details." },
      { status: 400 }
    );
  }

  const totalCents = Math.round(PRICE_CAD * (1 + GST_RATE) * 100);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: "cad",
          unit_amount: totalCents,
          product_data: {
            name: "Intermediate First Aid + CPR C/AED",
            description: `Class date: ${classDate} — includes GST. FAIRSAFE Training Centre, Surrey, BC.`,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      classDate,
      name,
      phone: phone || "",
    },
    success_url: `${siteUrl}/classes/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/classes`,
  });

  return NextResponse.json({ url: session.url });
}
