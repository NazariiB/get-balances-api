import fetch from 'node-fetch';
import fs from 'fs';
import schedule from 'node-schedule';
import jobConfig from '../config/jobConfig/jobConfig';
import config from '../config/apiConfig/config';
import dayjs from "dayjs";
import log from '../src/utils/logger';

const address: string = jobConfig.address;
const port: number = config.PORT;

const url = `http://localhost:${port}/balances/${address}`;
const outputFile = "./jobImpl/fetchedData/balances.json";

async function fetchAndWriteData() {
    try {
        const response = await fetch(url);
        const data: any = {};
        data.date = dayjs().format("YYYY-MM-DD HH:mm:ss");
        data.response = await response.json();
        fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
        log.info(`Data written to ${outputFile}`);
    } catch (error) {
        log.error(`Error fetching data: ${error}`);
    }
}

schedule.scheduleJob('*/1 * * * *', fetchAndWriteData);