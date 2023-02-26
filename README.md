# get-balances-api

To start project run:
"npm install". 

Set "PORT" and "providerURI" (there are already setted) in api config file "config\apiConfig\config.ts". 
"PORT" - port on which web server will runing.
"providerURI" - connecting to the blockchain node.

To start web server run: 
"npm run start".

This will start the web server on port, which you specified in "config.ts" file. 
To get balances call "http://localhost:8083/balances/{address}" where "address" is address whose balance we want to know. 

Set "address" in "config\jobConfig\jobConfig.ts". 
"address" - address whose balance we want to know.

To start job run: 
"npm run job".

This will start the job, and will get and save balances of the "address" which you specified in jobConfig.ts file. 
The result would be save in "jobImpl\fetchedData\balances.json" file.