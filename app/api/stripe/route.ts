import { redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  let body = "";

  if (req.body) {
    const reader = req.body.getReader();
    let done = false;

    while (!done) {
      const { value, done: streamDone } = await reader.read();
      body += new TextDecoder("utf-8").decode(value);
      done = streamDone;
    }

    const { cartItems } = JSON.parse(body);
    // console.log(cartItems);
    const origin = req.headers.get("origin");
    // console.log(origin);

    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          {
            shipping_rate: "shr_1OMnEIL2HS0b0cyytXT2Z7FL",
          },
        ],
        line_items: cartItems.map((item: any) => {
          const img = item.image[0].asset._ref;
          const newImg = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/ms4hpjqh/production/"
            )
            .replace("-webp", ".webp");

          // console.log(newImg);

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                images: [newImg],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
            // billing_address_collection: undefined,
          };
        }),
        success_url: `${origin}/success`,
        cancel_url: `${origin}/`,
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(
        params as Stripe.Checkout.SessionCreateParams
      );

      return new Response(JSON.stringify(session), {
        status: 200,
        headers: {
          "Content-Type": "text/plain",
          // "Access-Control-Allow-Origin": "*",
        },
      });

      // return Response.redirect(session.url);

      // return redirect(session.url);
    } catch (err) {
      return new Response(JSON.stringify({ message: (err as Error).message }), {
        status: 500,
        headers: { "Content-Type": "text/plain" },
      });
    }
  }
}
