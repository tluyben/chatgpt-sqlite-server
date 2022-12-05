# A simple sqlite databases integration primed for gpt3(.5) / chatgpt to experiment with 


## installation 

- install node 17+, npm/yarn
- run yarn 
- yarn start  

## how to use 

- curl http://localhost:3003/api/sqlite/tables
- curl "http://localhost:3003/api/sqlite/query?q=select+Title+from+albums"

## how to use with chatgpt

- clone, configure and run https://github.com/tluyben/chatgpt-playground as described (including the chatgpt-api)
- clone, configure and run https://github.com/tluyben/nodejs-proxy
- run the the current sqlite server as described above 

- go to http://localhost:3000/ 
- prime the AI with /sqlite tables 
- now the Northwind database is known to chatgpt
- run queries like  
   - /sqlite query give me some customers
   - /sqlite query what are some territories
   - /sqlite query give me the customers belonging to terrority [ID] 

# License 

MIT 

Disclaimer: for localhost experimentation only, we accept no liability. 

Support my open source work by <a href="https://twitter.com/luyben">following me on twitter <img src="https://storage.googleapis.com/saasify-assets/twitter-logo.svg" alt="twitter" height="24px" align="center"></a>
