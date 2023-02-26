import express from "express";
import config from "../config/apiConfig/config";
import { getBalances } from "./utils/getBalances";
import log from "./utils/logger";

const port = config.PORT;
const app = express();

app.use(express.json())

app.get('/balances/:address', async (req, res) => {
    const address: string = req.params.address;
    
    log.info(`get /balances with address: ${address}`)

    try {
        const balances = await getBalances(address);
        res.send(balances);
    } catch(error:any) {
        if(error.message.includes("address is not valid"))
            return res.status(400).send(`Error:${error.message}`);
        res.status(500).send(error.message);
    }
})

app.listen(port, () => {
    log.info(`server started, http://localhost:${port}`);
})