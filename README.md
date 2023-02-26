# get-balances-api

to start project
npm init

set "PORT" and "providerURI" (there are already setted) in api config file "config\apiConfig\config.ts"
"PORT" - port on which web server will runing
"providerURI" - connecting to the blockchain node

to start web server run
"npm run start"

this will start the web server on port, which you specified in config.ts file
to get balances call "http://localhost:8083/balances/{address}" where "address" is address whose balance we want to know

set "address" in "config\jobConfig\jobConfig.ts"
"address" - address whose balance we want to know

to start job run
"npm run job"

this will start the job, and will get and save balances of the "address" which you specified in jobConfig.ts file
the result would be save in "jobImpl\fetchedData\balances.json" file
