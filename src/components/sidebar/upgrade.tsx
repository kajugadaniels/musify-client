"use client";

import { authClient } from "~/lib/auth-client";
import { Button } from "../ui/button";

export default function Upgrade() {
    const upgrade = async () => {
        await authClient.checkout({
            products: [
                "2ffa7352-f569-4caa-b3e4-3b770a91b4c6",
                "b1f36181-b54d-4004-a503-d6167d52b447",
                "1b711111-d5e8-4639-ae64-96036a966dbd",
            ],
        });
    };
    return (
        <Button
            variant="outline"
            size="sm"
            className="ml-2 cursor-pointer text-orange-400"
            onClick={upgrade}
        >
            Upgrade
        </Button>
    );
}