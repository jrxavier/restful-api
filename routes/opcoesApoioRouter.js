const express = require("express");
const { createApolloFetch } = require("apollo-fetch");

function routes() {
    const opcoesRouter = express.Router();
    const fetch = createApolloFetch({
        uri: "http://desis-docker02.cloud.dsv.bndes.net:4000/api"
    });
    var retorno = null;
    const query = `
      query Opcoes($vPorte: String $vParcelas: String 
         $vValorFinanciar: String $vPessoaFisica: String $vPessoaJuridica: String) {
         opcoesApoio(porte: $vPorte, parcelas: $vParcelas, valorFinanciar: $vValorFinanciar,
            pessoaFisica: $vPessoaFisica, pessoaJuridica: $vPessoaJuridica) { 
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
      }`;
    opcoesRouter.route("/opcoesApoio").get((req, res) => {
        const param = {};

        if (req.query.porte) {
            param.porte = req.query.porte;
            console.log(param.porte);
        }
        if (req.query.parcelas) {
            param.parcelas = req.query.parcelas;
            console.log(param.parcelas);
        }
        if (req.query.valorFinanciar) {
            param.valorFinanciar = req.query.valorFinanciar;
            console.log(param.valorFinanciar);
        }
        if (req.query.pessoaFisica) {
            param.pessoaFisica = req.query.pessoaFisica;
            console.log(param.pessoaFisica);
        }
        if (req.query.pessoaJuridica) {
            param.pessoaJuridica = req.query.pessoaJuridica;
            console.log(param.pessoaJuridica);
        }
        let variables = {};
        variables.vPorte = param.porte;
        variables.vParcelas = param.parcelas;
        variables.vValorFinanciar = param.valorFinanciar;
        variables.vPessoaFisica = param.pessoaFisica;
        variables.vPessoaJuridica = param.pessoaJuridica;

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
