import JSBI from 'jsbi'

// exports for external consumption
export type BigintIsh = JSBI | bigint | string

export enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GÖRLI = 5,
  KOVAN = 42,
  BSC_MAINNET = 56,
  BSC_TESTNET = 97
}

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP
}

type ChainAddress = {
  [chainId in ChainId]: string
}
export const FACTORY_ADDRESS: ChainAddress = {
  [ChainId.MAINNET]: "0x26023843814cFF92B8d75311d64D1C032b8b29f2",
  [ChainId.ROPSTEN]: "0xDfD8bbA37423950bD8050C65E698610C57E55cea",
  [ChainId.RINKEBY]: "",
  [ChainId.GÖRLI]: "",
  [ChainId.KOVAN]: "",
  [ChainId.BSC_MAINNET]: "0x86A859773cf6df9C8117F20b0B950adA84e7644d",
  [ChainId.BSC_TESTNET]: "0x5F8018088bB686598a77211E611c3b9DEE558e81"
}

export const INIT_CODE_HASH: ChainAddress = {
  [ChainId.MAINNET]: "0x7fc48862bb659c6079c67f949053514afd141b7fcc1dc2b0a9474d647c51d670",
  [ChainId.ROPSTEN]: '0x8b4ce8ec78a7c1be0d482d641f59b942070725a4b7782595db30956c6d46e824',
  [ChainId.RINKEBY]: "",
  [ChainId.GÖRLI]: "",
  [ChainId.KOVAN]: "",
  [ChainId.BSC_MAINNET]: "0x7fc48862bb659c6079c67f949053514afd141b7fcc1dc2b0a9474d647c51d670",
  [ChainId.BSC_TESTNET]: '0x8b4ce8ec78a7c1be0d482d641f59b942070725a4b7782595db30956c6d46e824'
}

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const _9975 = JSBI.BigInt(9975)
export const _10000 = JSBI.BigInt(10000)

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256'
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
}
