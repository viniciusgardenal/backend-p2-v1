import UsuariosDAO from "../Persistencia/usuariosDAO.js";
export default class Usuarios{
    #cpf;
    #nome;
    #sobrenome;
    #genero;
    #dataNascimento;
    #cep;
    #cidade;
    #estado;

    constructor(cpf, nome, sobrenome, genero, dataNascimento, cep, cidade, estado){
        this.#cpf = cpf;
        this.#nome = nome; 
        this.#sobrenome = sobrenome;
        this.#genero = genero;
        this.#dataNascimento = dataNascimento;
        this.#cep = cep;
        this.#cidade = cidade;
        this.#estado = estado;
    }

    get cpf(){
        return this.#cpf;
    }

    set cpf(novocpf){
        this.#cpf = novocpf;
    }

    get nome(){
        return this.#nome
    }

    set nome(novonome){
        this.#nome = novonome;
    }

    get sobrenome(){
        return this.#sobrenome;
    }

    set sobrenome(novosobrenome){
        this.#sobrenome = novosobrenome;
    }

    get genero(){
        return this.#genero;
    
    }
    
    set genero(novogenero){
        this.#genero = novogenero;
    }

    get dataNascimento(){
        return this.#dataNascimento;
    }

    set dataNascimento(novadataNascimento){
        this.#dataNascimento = novadataNascimento;
    }

    get cep(){
        return this.#cep;
    }

    set cep(novocep){
        this.#cep = novocep;
    }

    get cidade(){
        return this.#cidade;
    
    }
        
    set cidade(novocidade){
        this.#cidade = novocidade;
    }

    get estado(){
        return this.#estado;
    
    }
        
    set estado(novaestado){
        this.#estado = novaestado;
    }

    
    toJSON(){
        return{
            "cpf"       : this.#cpf,
            "nome"      : this.#nome,
            "sobrenome" : this.#sobrenome,
            "genero"    : this.#genero,
            "dataNascimento"   : this.#dataNascimento,
            "cep"       : this.#cep,
            "cidade"    : this.#cidade,
            "estado"    : this.#estado
        }
    }

    async gravar(){
        const usuarioDAO = new UsuariosDAO();
        this.cpf = await usuarioDAO.gravar(this);
    }

    async atualizar(){
        const usuarioDAO = new UsuariosDAO();
        await usuarioDAO.atualizar(this);
    }

    async excluir(){
        const usuarioDAO = new UsuariosDAO();
        await usuarioDAO.excluir(this);
    }

    async consultar(cpf) {
        const usuarioDAO = new UsuariosDAO();
        const usuarios = await usuarioDAO.consultar(cpf);
        return usuarios

    }

    async consultarnome(nome){
        const usuarioDAO = new UsuariosDAO();
        const usuarios = await usuarioDAO.consultarnome(nome);
        return usuarios;
    }

}