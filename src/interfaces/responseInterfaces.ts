export interface ResponseBody {
    nativTokenBalance: number
    amountTokensWithBalance: number
    tokens: Token[]
}

export interface Token {
    symbol:string
    name:string
    address:string
    balance:number
}