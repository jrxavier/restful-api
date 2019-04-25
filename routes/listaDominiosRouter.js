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
      query Dominios($vIdentificador: String) {
         listaDominios(identificador: $vIdentificador) { 
            identificador
            descricao
            tipo
            ativo
            ordem
            valores {
              identificador
              descricao
            }
         }
      }`;
   opcoesRouter.route("/listaDominios").get((req, res) => {
      const param = {};

      if (req.query.identificador) {
         param.identificador = req.query.identificador;
         console.log(param.porte);
      }

      let variables = {};
      variables.vIdentificador = param.identificador;

      fetch({
            query,
            variables
         })
         .then(result => {
            console.log("Valor de retorno: " + result.data);
            retorno = result.data.listaDominios;
            return res.status(201).json(retorno);
         })
         .catch(error => {
            console.log("Error: " + error);
         });
   });

   return opcoesRouter;
}

module.exports = routes;