const express = require('express');
const {
   createApolloFetch
} = require('apollo-fetch');

function routes() {
   const opcoesRouter = express.Router();
   const fetch = createApolloFetch({
      uri: 'http://desis-docker02.cloud.dsv.bndes.net:4000/api'
   });
   var retorno = null;
   const query = `
      query Opcoes($vPorte: String) {
         opcoesApoio(porte: $vPorte) { 
            identificador
            titulo
            taxajurostotal
            participacaomaxima
            prazototalmaximo
            limitemaximo
            limitemaximodesc
            prazomaximo_desc
            porte
            pessoaFisica
            pessoaJuridica             
         }
      }`
   opcoesRouter.route('/opcoesApoio')
      .get((req, res) => {
         const param = {}

         if (req.query.porte) {
            param.porte = req.query.porte;
            console.log(param.porte);
         }
         let variables = {};
         variables.vPorte = param.porte;
         console.log("---> " + variables.vPorte);
         fetch({
               query,
               variables
            })
            .then(result => {
               console.log("Valor de retorno: " + result.data);
               retorno = result.data.opcoesApoio;
               return res.status(201).json(retorno);
            })
            .catch(error => {
               console.log("Error: " + error);
            });

      });

   return opcoesRouter;
}

module.exports = routes;