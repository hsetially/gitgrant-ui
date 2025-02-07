"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2, Wallet } from "lucide-react"

interface ConnectWalletDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userId: string
}

interface WalletConnectionResponse {
  success: boolean
  message: string
  walletAddress?: string
}

export function ConnectWalletDialog({ 
  open, 
  onOpenChange,
  userId 
}: ConnectWalletDialogProps) {
  const { toast } = useToast()
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      if (typeof window.ethereum === "undefined") {
        throw new Error("Please install MetaMask to connect your wallet")
      }

      // type assertion for the response from eth_requestAccounts
      const accounts = await window.ethereum.request({ 
        method: "eth_requestAccounts" 
      }) as string[]

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found")
      }

      const walletAddress = accounts[0]

      // make API call to your backend
      const response = await fetch("/api/connect-wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress,
          userId,
        }),
      })

      const data: WalletConnectionResponse = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to connect wallet")
      }

      toast({
        title: "Wallet Connected",
        description: `Successfully connected wallet: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`,
      })
      onOpenChange(false)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Failed to connect wallet",
      })
    } finally {
      setIsConnecting(false)
    }
  }

//   const getChainDetails = async (): Promise<{ chainId: string; networkName: string }> => {
//     if (!window.ethereum) {
//       throw new Error("MetaMask is not installed")
//     }

//     const chainId = await window.ethereum.request({ 
//       method: "eth_chainId" 
//     }) as string

//     const networks: Record<string, string> = {
//       "0x1": "Ethereum Mainnet",
//       "0x5": "Goerli Testnet",
//       "0x89": "Polygon Mainnet",
//       "0x13881": "Mumbai Testnet",
//     }

//     return {
//       chainId,
//       networkName: networks[chainId] || "Unknown Network",
//     }
//   }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect Web3 Wallet</DialogTitle>
          <DialogDescription>
            Connect your Web3 wallet to receive rewards for your contributions.
            Make sure you are connected to the correct network.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-4 py-4">
          <Wallet className="h-12 w-12 text-muted-foreground" />
          <div className="text-sm text-muted-foreground">
            Supported Networks: Ethereum, Polygon
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleConnect} 
            disabled={isConnecting}
            className="min-w-[120px]"
          >
            {isConnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              "Connect Wallet"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}