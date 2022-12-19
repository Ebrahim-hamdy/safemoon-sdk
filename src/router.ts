import { TradeType } from './constants'
import invariant from 'tiny-invariant'
import { validateAndParseAddress } from './utils'
import { CurrencyAmount, ETHER, Percent, Trade } from './entities'

/**
 * Options for producing the arguments to send call to the router.
 */
export interface TradeOptions {
  /**
   * How much the execution price is allowed to move unfavorably from the trade execution price.
   */
  allowedSlippage: Percent
  /**
   * How long the swap is valid until it expires, in seconds.
   * This will be used to produce a `deadline` parameter which is computed from when the swap call parameters
   * are generated.
   */
  ttl: number
  /**
   * The account that should receive the output of the swap.
   */
  recipient: string

  /**
   * Whether any of the tokens in the path are fee on transfer tokens, which should be handled with special methods
   */
  feeOnTransfer?: boolean

  /**
   * ETH fee for swap
   */
  ethFee?: CurrencyAmount
}

export interface SafeSwapTrade {
  amountIn: string
  amountOut: string
  path: string[]
  to: string
  deadline: string
}

/**
 * The parameters to use in the call to the Uniswap V2 Router to execute a trade.
 */
export interface SwapParameters {
  /**
   * The method to call on the Uniswap V2 Router.
   */
  methodName: string
  /**
   * The arguments to pass to the method, all hex encoded.
   */
  args: (string | string[] | SafeSwapTrade)[]
  /**
   * The amount of wei to send in hex.
   */
  value: string
}

function toHex(currencyAmount: CurrencyAmount) {
  return `0x${currencyAmount.raw.toString(16)}`
}

// const ZERO_HEX = '0x0'

/**
 * Represents the Uniswap V2 Router, and has static methods for helping execute trades.
 */
export abstract class Router {
  /**
   * Cannot be constructed.
   */
  private constructor() {}
  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trade to produce call parameters for
   * @param options options for the call parameters
   */
  public static swapCallParameters(trade: Trade, options: TradeOptions): SwapParameters {
    const etherIn = trade.inputAmount.currency === ETHER
    const etherOut = trade.outputAmount.currency === ETHER
    // the router does not support both ether in and out
    invariant(!(etherIn && etherOut), 'ETHER_IN_OUT')
    invariant(options.ttl > 0, 'TTL')
    invariant('ethFee' in options && options.ethFee?.currency === ETHER)

    const to: string = validateAndParseAddress(options.recipient)
    const amountInCurrency = trade.maximumAmountIn(options.allowedSlippage)
    const amountIn: string = toHex(amountInCurrency)
    const amountOutCurrency = trade.minimumAmountOut(options.allowedSlippage)
    const amountOut: string = toHex(amountOutCurrency)
    const path: string[] = trade.route.path.map(token => token.address)
    const deadline = `0x${(Math.floor(new Date().getTime() / 1000) + options.ttl).toString(16)}`
    // const useFeeOnTransfer = Boolean(options.feeOnTransfer)
    const ethFee = toHex(options.ethFee)

    const safeSwapTrade: SafeSwapTrade = { amountIn, amountOut, path, to, deadline }

    let methodName: string
    let args: (string | string[] | SafeSwapTrade)[]
    let value: string
    switch (trade.tradeType) {
      case TradeType.EXACT_INPUT:
        if (etherIn) {
          // methodName = useFeeOnTransfer ? 'swapExactETHForTokensSupportingFeeOnTransferTokens' : 'swapExactETHForTokens'
          // (uint amountOutMin, address[] calldata path, address to, uint deadline)
          // args = [amountOut, path, to, deadline]
          // value = amountIn
          methodName = 'swapExactETHForTokensWithFeeAmount'
          args = [safeSwapTrade, ethFee]
          value = toHex(amountInCurrency.add(options.ethFee))
        } else if (etherOut) {
          // methodName = useFeeOnTransfer ? 'swapExactTokensForETHSupportingFeeOnTransferTokens' : 'swapExactTokensForETH'
          // (uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
          // args = [amountIn, amountOut, path, to, deadline]
          // value = ZERO_HEX
          methodName = 'swapExactTokensForETHAndTipAmount'
          args = [safeSwapTrade]
          value = ethFee
        } else {
          // methodName = useFeeOnTransfer
          //   ? 'swapExactTokensForTokensSupportingFeeOnTransferTokens'
          //   : 'swapExactTokensForTokens'
          // (uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
          // args = [amountIn, amountOut, path, to, deadline]
          // value = ZERO_HEX
          methodName = 'swapExactTokensForTokensWithFeeAmount'
          args = [safeSwapTrade]
          value = ethFee
        }
        break
      case TradeType.EXACT_OUTPUT:
        // invariant(!useFeeOnTransfer, 'EXACT_OUT_FOT')
        if (etherIn) {
          // methodName = 'swapETHForExactTokens'
          // (uint amountOut, address[] calldata path, address to, uint deadline)
          // args = [amountOut, path, to, deadline]
          // value = amountIn
          methodName = 'swapETHForExactTokensWithFeeAmount'
          args = [safeSwapTrade, ethFee]
          value = toHex(amountInCurrency.add(options.ethFee))
        } else if (etherOut) {
          // methodName = 'swapTokensForExactETH'
          // (uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
          // args = [amountOut, amountIn, path, to, deadline]
          // value = ZERO_HEX

          methodName = 'swapTokensForExactETHAndFeeAmount'
          args = [safeSwapTrade]
          value = ethFee
        } else {
          // methodName = 'swapTokensForExactTokens'
          // (uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
          // args = [amountOut, amountIn, path, to, deadline]
          // value = ZERO_HEX
          methodName = 'swapTokensForExactTokensWithFeeAmount'
          args = [safeSwapTrade]
          value = ethFee
        }
        break
    }
    return {
      methodName,
      args,
      value
    }
  }
}
