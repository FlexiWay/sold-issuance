import { safeFetchPoolManager, safeFetchTokenManager, findPoolManagerPda, findTokenManagerPda, PoolManager, TokenManager,  createTestQuote, SetupOptions, toggleActive, setup, mint, redeem, getMerkleProof, SOLD_ISSUANCE_PROGRAM_ID } from "@builderz/sold";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { createSplAssociatedTokenProgram, createSplTokenProgram, SPL_ASSOCIATED_TOKEN_PROGRAM_ID, findAssociatedTokenPda, safeFetchToken, createAssociatedToken } from "@metaplex-foundation/mpl-toolbox"
import { toast } from "sonner";
import { TransactionBuilder } from "@metaplex-foundation/umi"
// @ts-ignore
import bs58 from "bs58";

// TODO: Move this into npm package
const bigIntToFloat = (bigIntValue: bigint, decimals: number): number => {
    return Number(bigIntValue) / Math.pow(10, decimals);
};

export const useSold = () => {
    const [loading, setLoading] = useState(false);

    const [amount, setAmount] = useState(0);
    const [tokenManager, setTokenManager] = useState<TokenManager | null>(null);
    const [poolManager, setPoolManager] = useState<PoolManager | null>(null);
    const [reset, setReset] = useState(0);
    const allowedWallets: (string | Uint8Array)[] = [];

    const [statCardData, setStatCardData] = useState<{
        totalSupply: number;
        usdcInPool: number;
        totalStaked: number;
        xSoldSupply: number;
        [key: string]: number;
    }>({
        totalSupply: 0,
        usdcInPool: 0,
        totalStaked: 0,
        xSoldSupply: 0
    });

    const wallet = useWallet();
    const { connection } = useConnection();

    const umi = createUmi(connection);
    umi.programs.add(createSplAssociatedTokenProgram());
    umi.programs.add(createSplTokenProgram());

    umi.use(walletAdapterIdentity(wallet));

    const tokenManagerPubKey = findTokenManagerPda(umi);
    const poolManagerPubKey = findPoolManagerPda(umi);

    useEffect(() => {
        const fetchState = async () => {
            setLoading(true);

            const tokenManagerAcc = await safeFetchTokenManager(umi, tokenManagerPubKey);
            const poolManagerAcc = await safeFetchPoolManager(umi, poolManagerPubKey);

            setTokenManager(tokenManagerAcc);
            setPoolManager(poolManagerAcc);

            // Stat stat cards
            tokenManagerAcc && (
                setStatCardData({
                    totalSupply: bigIntToFloat(tokenManagerAcc.totalSupply, tokenManagerAcc.mintDecimals),
                    usdcInPool: bigIntToFloat(tokenManagerAcc.totalCollateral, tokenManagerAcc.quoteMintDecimals),
                    totalStaked: 0,
                    xSoldSupply: 0
                })
            )

            setLoading(false);
        }

        if (wallet.publicKey) {
            fetchState()
        }
    }, [wallet.publicKey, reset])

    const refetch = () => {
        setReset(prev => prev + 1);
    }

    // const handleToggleActive = async () => {
    //     try {
    //         let txBuilder = new TransactionBuilder()

    //         txBuilder = txBuilder.add(toggleActive(umi, {
    //             tokenManager: tokenManagerPubKey,
    //             active: !tokenManager?.active
    //         }));

    //         console.log(txBuilder);

    //         const resToggleActive = await txBuilder.sendAndConfirm(umi, { confirm: { commitment: "confirmed" } });
    //         console.log(bs58.encode(resToggleActive.signature));

    //         toast(`${tokenManager?.active ? "Paused" : "Unpaused"}`)
    //         refetch()
    //     } catch (error) {
    //         console.error("Failed to handle toggle active:", error);
    //         toast("Failed to handle toggle active")
    //         refetch()
    //     }
    // }

const handleDepositFunds = async (e: any) => {
    e.preventDefault();
    if (!tokenManager || !poolManager) {
        throw new Error("Token manager or pool manager not found");
    }

    console.log(tokenManager.mint, tokenManager.quoteMint)

    try {
        let txBuilder = new TransactionBuilder();
        
        let baseMint = umi.eddsa.findPda(SOLD_ISSUANCE_PROGRAM_ID, [Buffer.from("mint")])
        let userBase = findAssociatedTokenPda(umi, { owner: umi.identity.publicKey, mint: baseMint[0] })
        let userQuote = findAssociatedTokenPda(umi, { owner: umi.identity.publicKey, mint: tokenManager.quoteMint })
        let vault = findAssociatedTokenPda(umi, { owner: tokenManagerPubKey[0], mint: tokenManager.quoteMint })
        
        const proof = getMerkleProof(allowedWallets, umi.identity.publicKey);

        const userBaseAtaAcc = await safeFetchToken(umi, userBase)
        const userQuoteAtaAcc = await safeFetchToken(umi, userQuote)


        const newAmount = amount * Math.pow(10, tokenManager.mintDecimals); 

        if (!userBaseAtaAcc) {
            txBuilder = txBuilder.add(createAssociatedToken(umi, {
                mint: baseMint,
                owner: umi.identity.publicKey
            }));
        }

        if (!userQuoteAtaAcc) {
            txBuilder = txBuilder.add(createAssociatedToken(umi, {
                mint: tokenManager.quoteMint,
                owner: umi.identity.publicKey
            }));
        }

        // Adjusted properties according to available ones in TokenManager
        txBuilder = txBuilder.add(mint(umi, {
            tokenManager: tokenManager.publicKey,
            mint: tokenManager.mint,
            payerMintAta: userBase,
            quoteMint: tokenManager.quoteMint,
            payerQuoteMintAta: userQuote,
            associatedTokenProgram: SPL_ASSOCIATED_TOKEN_PROGRAM_ID,
            vault: vault,
            quantity: amount ,
            proof: proof
        }));

        console.log(txBuilder);

        const resDepositFunds = await txBuilder.sendAndConfirm(umi, { send: { skipPreflight: true}, confirm: { commitment: "confirmed" } });
        console.log(bs58.encode(resDepositFunds.signature));

        toast("Deposited funds");
        refetch();
    } catch (error) {
        console.error("Failed to handle deposit action:", error);
        toast.error("Failed to handle deposit action");
        refetch();
    }
}



    const handleWithdrawFunds = async () => {
        if (!tokenManager || !poolManager) {
            throw new Error("Token manager or pool manager not found");
        }

        try {
            let txBuilder = new TransactionBuilder();
            let baseMint = umi.eddsa.findPda(SOLD_ISSUANCE_PROGRAM_ID, [Buffer.from("mint")])
            let userBase = findAssociatedTokenPda(umi, { owner: umi.identity.publicKey, mint: baseMint[0] })
            let userQuote = findAssociatedTokenPda(umi, { owner: umi.identity.publicKey, mint: tokenManager.quoteMint })
            let vault = findAssociatedTokenPda(umi, { owner: tokenManagerPubKey[0], mint: tokenManager.quoteMint })
            let proof = getMerkleProof(allowedWallets, umi.identity.publicKey);

            // Adjusted properties according to available ones in TokenManager
            txBuilder = txBuilder.add(redeem(umi, {
                tokenManager: tokenManager.publicKey,
                mint: tokenManager.mint,
                payerMintAta: userBase,
                quoteMint: tokenManager.quoteMint,
                payerQuoteMintAta: userQuote,
                associatedTokenProgram: SPL_ASSOCIATED_TOKEN_PROGRAM_ID,
                vault: vault,
                quantity: amount,
                proof: proof
            }));

            console.log(txBuilder);

            const resWithdrawFunds = await txBuilder.sendAndConfirm(umi, { confirm: { commitment: "confirmed" } });
            console.log(bs58.encode(resWithdrawFunds.signature));

            toast("Withdrawn funds");
            refetch();
            
        } catch (error) {
            console.error("Failed to handle withdraw action:", error);
            toast.error("Failed to handle withdraw action");
            refetch();
        }
    }

    return { tokenManager, poolManager, refetch, loading, statCardData, handleDepositFunds, amount, setAmount, handleWithdrawFunds };
};