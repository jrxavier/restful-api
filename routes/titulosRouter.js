const express = require("express");
const {
   createApolloFetch
} = require("apollo-fetch");

function routes() {
   const opcoesRouter = express.Router();
   const fetch = createApolloFetch({
      uri: "http://desis-docker02.cloud.dsv.bndes.net:4000/api"
   });
   var retorno = null;
   const query = `
      query Titulos {
         listaTitulos { 
            valor
            }
      }`;
   opcoesRouter.route("/titulos").get((req, res) => {
      const variables = {};

      fetch({
            query,
            variables
         })
         .then(result => {
            console.log("Valor de retorno: " + result.data);
            retorno = result.data.listaTitulos;
            return res.status(201).json(retorno);
         })
         .catch(error => {
            console.log("Error: " + error);
         });
   });

   return opcoesRouter;
}

module.exports = routes;