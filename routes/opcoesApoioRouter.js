const express = require('express');

function routes() {
   const opcoesRouter = express.Router();
   opcoesRouter.route('/opcoesApoio')
      .get((req, res) => {
         const obj = {
            nome: 'Jose'
         };
         console.log('teste');
         return res.status(201).json(obj);
      });

   return opcoesRouter;
}

module.exports = routes;