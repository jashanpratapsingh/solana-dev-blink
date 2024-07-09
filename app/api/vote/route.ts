import { ActionGetResponse } from "@solana/actions";

export const OPTIONS = GET;

export async function GET(request: Request) {
    const response:ActionGetResponse = {
        icon: "https://media.istockphoto.com/id/178862205/photo/peanut-butter.jpg?s=612x612&w=0&k=20&c=jNDZZ-2ExpjWpFSRYiWUWRhuj6beu9dq04AMini_zxs=",
        title: 'Voting',
        description: 'Vote for your favourite peanut butter',
        label: 'Vote',
        links: {
            actions: [{
                href: 'http://localhost:3000/api/vote?candidate=smooth' || 'https://solana-blink-one.vercel.app',
                label: 'Vote Crunchy',
            },
            {
                href: 'http://localhost:3000/api/vote?candidate=smooth' || 'https://solana-blink-one.vercel.app',
                label: 'Vote Smooth',
            }
            ]
        }
    };
    return Response.json(response, {headers: {'Access-Control-Allow-Origin': '*'}});
}
