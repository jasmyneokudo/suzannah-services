import crypto from "crypto";
import { processBooking } from "../../../lib/processBooking";
import { useGoogleSheets } from "@/hooks/useGoogleSheets";

export async function POST(req: Request) {
  const { updateValues } = useGoogleSheets();
  try {
    console.log("🔥 PAYSTACK WEBHOOK HIT");
    const rawBody = await req.text();

    const signature = req.headers.get("x-paystack-signature");

    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
      .update(rawBody)
      .digest("hex");

    if (hash !== signature) {
      return new Response("Invalid signature", {
        status: 401,
      });
    }

    const event = JSON.parse(rawBody);

    console.log("Paystack webhook:", event);

    if (event.event !== "charge.success") {
      return Response.json({ received: true });
    }

    // Your booking data
    const clientRequest = JSON.parse(
      event.data.metadata.custom_fields[0].display_name
    );

    console.log("Client request:", event.data.metadata);

    await processBooking(clientRequest, updateValues);

    // We will put sendRequestDetails logic here

    return Response.json({ received: true });

  } catch (error) {
    console.error("Webhook error:", error);

    return Response.json(
      {
        success: false,
        error: "Webhook processing failed",
      },
      { status: 500 }
    );
  }
}