import { useAccount, useWriteContract } from 'wagmi'
// import { erc20Abi } from '../abi/erc20Abi'
import { paymentGatewayAbi } from '../ABIs/PaymentGateway.ts'
import { erc20Abi } from 'viem'
import { readContract } from '@wagmi/core'
import { config } from '../configs/config'
import { PAYMENT_GATEWAY_ADDRESS } from '../constants/tokens.ts'

export type PaymentData = {
  productName: string
  orderId: bigint
  quantity: number
}

export const useHandlePayWithToken = () => {
  const { address } = useAccount()
  const { writeContractAsync: writeAsync } = useWriteContract()

  const handlePayWithToken = async (
    tokenAddress: string,
    sellerAddress: string,
    amount: bigint,
    paymentData: {
      productName: string
      orderId: number
      quantity: number
    }
  ) => {
    console.log('transacting....');

    try {
      // 1. Check Allowance
      console.log([address!, PAYMENT_GATEWAY_ADDRESS], '[address!, PAYMENT_GATEWAY_ADDRESS]')
      const balance = await readContract(config, {
        abi: erc20Abi,
        address: tokenAddress as `0x${string}`, // erc20 token address
        functionName: 'balanceOf',
        args: [address!],
      });

      console.log(balance, 'balance IDRX');


      const result = await readContract(config, {
        abi: erc20Abi,
        address: tokenAddress as `0x${string}`, // erc20 token address
        functionName: 'allowance',
        args: [address!, PAYMENT_GATEWAY_ADDRESS],
      });
      const allowance = result as bigint;
      console.log(result, 'result');
      console.log(allowance, 'allowance');
      console.log(allowance < amount, 'allowance < amount')
      if (allowance < amount) {
        // 2. Approve Token Spending
        const responseApprove = await writeAsync({
          abi: erc20Abi,
          address: tokenAddress as `0x${string}`,  // erc20 token address
          functionName: 'approve',
          args: [PAYMENT_GATEWAY_ADDRESS, amount],
        });
        console.log(responseApprove, 'responseApprove');
      }
      await continuePaymet(sellerAddress, tokenAddress, amount, paymentData);

    } catch (error) {
      if (error instanceof Error) return console.error(error.message, 'error handlePayWithToken')
      console.error('An unknown error occurred', 'error handlePayWithToken')
    }


  }


  const continuePaymet = async (
    sellerAddress: string,
    tokenAddress: string,
    amount: bigint,
    paymentData: {
      productName: string
      orderId: number
      quantity: number
    }
  ) => {
    console.log('calling payWithToken in continuePayment')
    const resultPayment = await writeAsync({
      abi: paymentGatewayAbi,
      address: PAYMENT_GATEWAY_ADDRESS as `0x${string}`,
      functionName: 'payWithToken',
      args: [sellerAddress, tokenAddress, amount, paymentData],
    });
    console.log(resultPayment, 'resultPayment');
  }

  return { handlePayWithToken }
}