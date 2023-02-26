import { Contract } from "web3-eth-contract";
import { AbiItem } from 'web3-utils';
import Web3 from 'web3';
import config from "../../config/apiConfig/config";
import tokens from "../../config/tokensInfo/tokenAddreses.json";
import contractAbi from "../../config/contractAbi/abi.json";
import log from "./logger";
import { ResponseBody, Token } from "../interfaces/responseInterfaces"

const provider: string = config.providerURI;

export const getBalances = async (address: string): Promise<ResponseBody> => {
    if (!Web3.utils.isAddress(address)) {
        log.error('invalid address');
        throw Error("address is not valid");
    }

    const web3 = new Web3(provider);
    let response:any;

    try {
        let balance: number = Number(await web3.eth.getBalance(address)) / Math.pow(10, 18);
        const result: ResponseBody = {
            nativTokenBalance: balance,
            amountTokensWithBalance: 0,
            tokens: []
        }
        for (const token of tokens) {
            const contract = new web3.eth.Contract(contractAbi as AbiItem[], token.platforms.ethereum);
            try {
                const tokenBalance = await contract.methods.balanceOf(address).call() as number;
                if (tokenBalance > 0) {
                    result.amountTokensWithBalance++;
                    const tokenData: Token = {
                        symbol: token.symbol,
                        name: token.name,
                        balance: tokenBalance,
                        address: token.platforms.ethereum
                    }
                    result.tokens.push(tokenData);
                }
            } catch (error: any) {
                log.error(`error in geting token balance in token: ${token.platforms.ethereum}\n${error.message}`);
            }
        }
        response = result as ResponseBody;
    } catch (error: any) {
        log.error("error in geting balances, check if provider uri is valid");
        throw Error(error.message);
    }
    return response;
}