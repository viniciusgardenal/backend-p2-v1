import {Router} from "express";
import controleUsuarios from "../Controle/controleUsuarios.js"

const rotaUsuarios = new Router();
const intControle = new controleUsuarios();

rotaUsuarios.post("/", intControle.gravar)
    .put("/:cpf", intControle.atualizar)
    .delete("/:cpf", intControle.excluir)
    .get("/", intControle.consultar)
    .get("/:consultarnome", intControle.consultar);


export default rotaUsuarios;