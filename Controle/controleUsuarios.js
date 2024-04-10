import Usuarios from "../Modelo/Usuarios.js";

export default class controleUsuarios{
    
    gravar(requisicao, resposta){
        resposta.type("application/json" );
        if(requisicao.method === "POST" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const cpf   = dados.cpf;
            const nome  = dados.nome;
            const sobrenome  = dados.sobrenome;
            const genero  = dados.genero;
            const dataNascimento = dados.dataNascimento;
            const cep = dados.cep;
            const cidade = dados.cidade;
            const estado = dados.estado;

            if (cpf > 0 &&  nome && sobrenome && genero && dataNascimento && cep && cidade && estado){
                const usuarios = new Usuarios(cpf, nome, sobrenome, genero, dataNascimento, cep, cidade, estado);
                usuarios.gravar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        id: usuarios.cpf,
                        mensagem: "Usuario registrado com sucesso!"
                    });
                }).catch((erro)=>{
                    resposta.status(500).json({
                        status:false,
                        mensagem: "Não foi possível registrar o usuario." + erro.message
                    });
                });
            }
            else{
                resposta.status("400").json({
                    status:false,
                    mensagem: "Informe todos os dados necessários para cadastrar o usuario. Verifique a documentação da API."
                })
            }
        }
        else{
            resposta.status("400").json({
                status:false,
                mensagem: "Método não permitido para registrar um usuario"
            });
        }
    }

    atualizar(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method === "PUT" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const cpf   = dados.cpf;
            const nome  = dados.nome;
            const sobrenome  = dados.sobrenome;
            const genero  = dados.genero;
            const dataNascimento = dados.dataNascimento;
            const cep = dados.cep;
            const cidade = dados.cidade;
            const estado = dados.estado;

            if (cpf && nome && sobrenome && genero && dataNascimento && cep && cidade && estado){
                const usuarios = new Usuarios(cpf, nome, sobrenome, genero, dataNascimento, cep, cidade, estado);
                usuarios.atualizar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem: "Usuario atualizado com sucesso!"
                    });
                }).catch((erro)=>{
                    resposta.status(500).json({
                        status:false,
                        mensagem: "Não foi possível atualizar o Usuario." + erro.message
                     });
                });
            }
            else{
                resposta.status("400").json({
                    status:false,
                    mensagem: "Informe todos os dados necessários para cadastrar o interessado. Verifique a documentação da API."
                })
            }
        }
        else{
            resposta.status("400").json({
                status:false,
                mensagem: "Método não permitido para atualizar uma atividade. Verifique a documentação da API."
            });
        }
    }

    excluir(requisicao, resposta){
        resposta.type("application/json");

        const cpf = requisicao.params.cpf;
        if(requisicao.method === "DELETE"){

            if(cpf){
                
                    const usuarios = new Usuarios(cpf);
                    usuarios.excluir().then(()=>{
                        resposta.status(200).json({
                            status:true,
                            mensagem: "Usuario excluído com sucesso!"
                        });
                    }).catch((erro)=>{
                        resposta.status(500).json({
                            status:false,
                            mensagem: "Não foi possível excluir o usuario." + erro.message
                        });
                    });
                }
                else{
                    resposta.status("400").json({
                        status:false,
                        mensagem: "Informe o ID do Usuario para exclui-lo. Verifique a documentação da API."
                    })
                }
        }
        else{
            resposta.status("400").json({
                status:false,
                mensagem: "Método não permitido para excluir um usuario. Verifique a documentação da API."
            });
        }
    }

    consultar(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method === "GET"){
          let termoConsulta = requisicao.params.nome;
          const usuarios = new Usuarios(0);
          if (isNaN(parseInt(termoConsulta))){
            if(termoConsulta === undefined ){
              termoConsulta = '';
            }
            usuarios.consultar(termoConsulta).then((listaUsuarioss)=>{
              resposta.status(200).json(listaUsuarioss);
            }).catch((erro)=>{
              resposta.status(500).json({
                status:false,
                mensagem: "Não foi possível realizar a consulta."
              })
            })
          } else{
            usuarios.consultarnome(termoConsulta).then((listaUsuarioss)=>{
              resposta.status(200).json(listaUsuarioss);
            }).catch((erro)=>{
              resposta.status(500).json({
                status:false,
                mensagem: "Não foi possível realizar a consulta."
              })
            })
          } 
        } else{
          resposta.status("400").json({
            status:false,
            mensagem: "Método não permitido para consultar um usuario. Verifique a documentação da API."
          })
        }
      }
}