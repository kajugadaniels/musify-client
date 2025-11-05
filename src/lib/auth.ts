import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "~/server/db";
import { Polar } from "@polar-sh/sdk";
import { env } from "~/env";
import {
    polar,
    checkout,
    portal,
    usage,
    webhooks,
} from "@polar-sh/better-auth";

const polarClient = new Polar({
    accessToken: env.POLAR_ACCESS_TOKEN,
    server: "sandbox",
});

export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        {
                            productId: "2ffa7352-f569-4caa-b3e4-3b770a91b4c6",
                            slug: "small",
                        },
                        {
                            productId: "b1f36181-b54d-4004-a503-d6167d52b447",
                            slug: "medium",
                        },
                        {
                            productId: "1b711111-d5e8-4639-ae64-96036a966dbd",
                            slug: "large",
                        },
                    ],
                    successUrl: "/",
                    authenticatedUsersOnly: true,
                }),
                portal(),
                webhooks({
                    secret: env.POLAR_WEBHOOK_SECRET,
                    onOrderPaid: async (order) => {
                        const externalCustomerId = order.data.customer.externalId;

                        if (!externalCustomerId) {
                            console.error("No external customer ID found.");
                            throw new Error("No external customer id found.");
                        }

                        const productId = order.data.productId;

                        let creditsToAdd = 0;

                        switch (productId) {
                            case "2ffa7352-f569-4caa-b3e4-3b770a91b4c6":
                                creditsToAdd = 10;
                                break;
                            case "b1f36181-b54d-4004-a503-d6167d52b447":
                                creditsToAdd = 25;
                                break;
                            case "1b711111-d5e8-4639-ae64-96036a966dbd":
                                creditsToAdd = 50;
                                break;
                        }

                        await db.user.update({
                            where: { id: externalCustomerId },
                            data: {
                                credits: {
                                    increment: creditsToAdd,
                                },
                            },
                        });
                    },
                }),
            ],
        }),
    ],
});