import Usuarios from "../Modelo/Usuarios.js"
import Conexao from "./conexao.js";

export default class UsuariosDAO{

    async gravar(usuarios){
        if(usuarios instanceof Usuarios){
            const conexao = await Conexao();
            const sql="INSERT INTO tabelaUsuarios(cpf, nome, sobrenome, genero, dataNascimento, cep, cidade, estado) \
            VALUES(?,?,?,?,?,?,?,?)";
            const valores = [usuarios.cpf, usuarios.nome, usuarios.sobrenome, usuarios.genero, usuarios.dataNascimento, usuarios.cep, usuarios.cidade, usuarios.estado];
            const [result] = await conexao.query(sql,valores)
            usuarios.cpf = result.insertCPF;
        }
    }

    async atualizar(usuarios){
        if(usuarios instanceof Usuarios){
            const conexao = await Conexao();
            const sql="UPDATE tabelaUsuarios SET nome=?, sobrenome=?, genero=?,dataNascimento=?, cep=?, cidade=?, estado=? WHERE cpf=?";
            const valores = [usuarios.cpf, usuarios.nome, usuarios.sobrenome, usuarios.genero, usuarios.dataNascimento, usuarios.cep, usuarios.cidade, usuarios.estado ]
            await conexao.query(sql,valores)
        }
    }

    async excluir(usuarios){
        if(usuarios instanceof Usuarios){
            const conexao = await Conexao();
            const sql="DELETE FROM tabelaUsuarios \
            WHERE cpf=? ";
            const valores = [usuarios.cpf]
            await conexao.query(sql,valores)
        }
    }

    async consultar(cpf){
        const conexao = await Conexao();
        const sql = "SELECT * FROM tabelaUsuarios WHERE cpf LIKE ?";
        const valores = ['%' + cpf + '%'];
        const [rows] = await conexao.query(sql,valores);
        const listaUsuarios = [];
        for(const row of rows){
            const usuarios = new Usuarios(row['cpf'], row['nome'], row['sobrenome'],row['genero'], row['dataNascimento'], row['cep'], row['cidade'], row['estado']);
            listaUsuarios.push(usuarios);
        }
        return listaUsuarios;
    }

    async consultarnome(nome){
        const conexao = await Conexao();
        const sql = "SELECT * FROM tabelaUsuarios WHERE nome=? ";
        const valores = [nome];
        const [rows] = await conexao.query(sql,valores);
        const listaUsuarios = [];
        for(const row of rows){
            const usuarios = new Usuarios(row['cpf'], row['nome'], row['sobrenome'],row['genero'], row['dataNascimento'], row['cep'], row['cidade'], row['estado'] );
            listaUsuarios.push(usuarios);
        }
        return listaUsuarios;
    }
}