
import express from 'express'
import sql from 'mssql'
import { sqlConfig } from './server.js';

const pool = new sql.ConnectionPool(sqlConfig)
await pool.connect();
const routes = express.Router()

routes.get('/', async (req, res)=>{
   try{
        const { recordset } =  await pool.query`select * from Chamadas`
        return res.status(200).json(recordset)
   }
   catch(error){
        return res.status(501).json('ops...algo deu errado')
   }
})

routes.get('/chamado/:id', async (req, res)=>{
    try{
         const { id } =  req.params;
         const { recordset } =  await pool.query`select * from Chamadas where idChamada=${id}`
         return res.status(200).json(recordset)
    }
    catch(error){
         return res.status(501).json('ops...algo deu errado')
    }
 })

routes.post('/chamado/novo', async (req, res)=>{
    try{
        const { idChamada, descricao, nomeCliente, data} = req.body;
        await pool.query`insert into Chamadas values(${idChamada},${descricao},${nomeCliente},${data})`
        return res.status(201).json(`ok`)
    }
    catch(error){
        return res.status(501).json('erro ao inserir produto...')
    }
})
export default routes



// routes.put('/produto/:id', async (req, res) =>{
//     try{
//         const { id } = req.params
//         const { descricao, preco } = req.body

//         await pool.query `update Produtos set descricao = ${descricao}, preco = ${preco} where id = ${id}`
//         return res.status(201).json('atualizado')

//     } catch(error) {
//         console.log(er)
//         return res.status(501).json('Algo deu errado ao atualizar')
//     }
// })

// routes.delete('/produto/:id', async (req, res)=>{
//     try{
//         const { id } = req.params

//         await pool.query `delete from Produtos where id = ${id}`
//         return res.status(201).json('deletado!')
//     }
//     catch(error){
//         return res.status(501).json('Algo deu errado ao excluir')
//     }
// })



