import { ACTIONS_CORS_HEADERS, ActionGetResponse } from "@solana/actions";
import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Voting } from '@/../anchor/target/types/voting';
import { PublicKey } from '@solana/web3.js';

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

export async function POST(request: Request) {

    anchor.setProvider(anchor.AnchorProvider.env());
    const program = anchor.workspace.Voting as Program<Voting>;

    const pollIdBuffer = new anchor.BN(1).toArrayLike(Buffer, "le", 8)
    const [pollAddress] = PublicKey.findProgramAddressSync(
        [Buffer.from("poll"), pollIdBuffer],
        program.programId
    );

    let url = new URL(request.url);
    const vote = url.searchParams.get('candidate') as string;
    if (vote !== 'crunchy' && vote !== 'smooth') {
        return Response.json({error: 'You voted for the wrong candidate'}, {status:400, headers: ACTIONS_CORS_HEADERS});
    }

    const [firstCandidateAddress] = PublicKey.findProgramAddressSync(
        [pollIdBuffer, Buffer.from(url.searchParams.get('candidate') as string)],
        program.programId
    );

    const tx = await program.methods.vote(
        new anchor.BN(1),
        "smooth",
    )
    return Response.json({}, {headers: ACTIONS_CORS_HEADERS});
}