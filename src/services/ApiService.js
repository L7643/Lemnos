import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseUri = "http://localhost:8080/api";

export async function cadastrarCliente(cliente) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "POST",
            url: "/cadastro/cliente",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            data: {
                nome: cliente.name,
                cpf: cliente.cpf,
                email: cliente.email,
                senha: cliente.password
            },
            timeout: 10000,
        });

        if (response.status != 201) {
            throw new Error('Erro ao cadastrar cliente.');
        }

        return response.data;

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        }
    }
}

export async function cadastrarFuncionario(funcionario, tipoEntidade) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "POST",
            url: `/cadastro/${tipoEntidade}`,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            data: {
                nome: funcionario.nome,
                cpf: funcionario.cpf,
                telefone: funcionario.telefone,
                dataNascimento: funcionario.dataNasc,
                dataAdmissao: funcionario.dataAdmissao,
                email: funcionario.email,
                senha: funcionario.senha
            },
            timeout: 10000,
        });

        if (response.status != 201) {
            return false;
        }
        toast.success('Funcionário cadastrado com sucesso')

        return true;
    
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        }
        return false;
    }
}

export async function cadastrarFornecedor(fornecedor, tipoEntidade) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "POST",
            url: `/cadastro/${tipoEntidade}`,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            data: {
                nome: fornecedor.nome,
                cnpj: fornecedor.cnpj,
                telefone: fornecedor.telefone,
                email: fornecedor.email
            },
            timeout: 10000,
        });

        if (response.status != 201) {
            return false;
        }
        toast.success('Fornecedor cadastrado com sucesso')

        return true;

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        }
        return false;
    }
}

export async function cadastrarProduto(produto){
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "POST",
            url: `/produto`,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            data: {
                nome: produto.nome,
                valor: produto.preco,
                descricao: produto.descricao,
                desconto: produto.desconto,
                cor: produto.cor,
                modelo: produto.modelo,
                imagemPrincipal: produto.imagemPrinc,
                imagens: produto.imagens,
                categoria: produto.categoria,
                subCategoria: produto.subCategoria,
                peso: produto.peso,
                altura: produto.altura,
                comprimento: produto.comprimento,
                largura: produto.largura,
                fabricante: produto.fabricante,
                fornecedor: produto.fornecedor
            },
            timeout: 10000,
        });

        if (response.status != 201) {
            throw new Error('Erro ao cadastrar o produto.');
        }
        console.log(response.data);
        
        return response.data;

    } catch (error) {
        console.log(error.response.data.error);
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
            console.log(error)
        }
    }
}

export async function updateCliente(cliente) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "PUT",
            url: `/cliente/`,
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            data: {
                nome: cliente.nome,
                senha: cliente.senha,
            },
            params: {
                email: cliente.email
            },
            timeout: 10000,
        });
        
        if (response.status != 200 && response.status != 204) {
            return false;
        }

        return true;

    } catch (error) {
       if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        }
        return false;
    }
}

export async function updateFuncionario(funcionario) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "PUT",
            url: `/funcionario`,
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            data: {
                nome: funcionario.nome,
                telefone: funcionario.telefone,
                dataNascimento: funcionario.dataNasc,
                dataAdmissao: funcionario.dataAdmissao,
                senha: funcionario.senha
            },
            params: {
                email: funcionario.email
            },
            timeout: 10000,
        });

        if (response.status != 200 && response.status != 204) {
            return false;
        }

        return true;

    } catch (error) {
       if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        }
        return false;
    }
}

export async function updateFornecedor(fornecedor) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "PUT",
            url: `/fornecedor`,
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            data: {
                nome: fornecedor.nome,
                cnpj: fornecedor.cnpj,
                telefone: fornecedor.telefone
            },
            params: {
                email: fornecedor.email
            },
            timeout: 10000,
        });

        if (response.status != 200 && response.status != 204) {
            return false;
        }

        return true;

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        }
        return false;
    }
}

export async function updateProduto(produto, id) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "PUT",
            url: `/produto/${id}`,
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            data: {
                nome: produto.nome,
                valor: produto.preco,
                descricao: produto.descricao,
                desconto: produto.desconto,
                imagemPrincipal: produto.imagemPrinc,
                imagens: produto.imagens,
                fornecedor: produto.fornecedor
            },
            timeout: 10000,
        });

        if (response.status != 200 && response.status != 204) {
            return false;
        }

        return true;

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        }
        return false;
    }
}

export async function excluirFuncionario(email) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "DELETE",
            url: `/funcionario`,
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            params: {
                email: email
            }
        })

        if (response.status != 200) {
            return false;
        }

        return true;

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        }
        return false;
    }
}

export async function cadastrarEndereco(emailEntidade, endereco, tipoEntidade) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "POST",
            url: `/endereco`,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            data: {
                email: emailEntidade,
                cep: endereco.cep,
                numeroLogradouro: endereco.numLogradouro,
                complemento: endereco.complemento,
                entidade: tipoEntidade
            },
            timeout: 10000,
        });

        if (response.status != 201) {
            return false;
        }
        
        return true;

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        }
        return false;
    }
}

export async function updateEndereco(emailEntidade, endereco, TipoEntidade) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "PUT",
            url: "/endereco",
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            data: {
                email: emailEntidade,
                cep: endereco.cep,
                numeroLogradouro: endereco.numLogradouro,
                complemento: endereco.complemento,
                entidade: TipoEntidade
            },
            timeout: 10000,
        });

        if (response.status != 200 && response.status != 204) {
            return false;
        }
        
        return true;

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        }
        return false;
    }
}

export async function verificarCep(cep) {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.data.erro) {
            return false;
        }
        return true;
    } catch (error) {
        console.error('Erro ao verificar o CEP:', error);
        return false;
    }
}

export async function login(usuario) {  
    let token = "";
    
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "POST",
            url: "/auth/login/fav",
            headers: { 
                'Content-Type': 'application/json; charset=UTF-8'
            },
            data: {
                email: usuario.email,
                senha: usuario.senha
            },
            timeout: 10000,
        });
        token = response.data;

    } catch (error) {
        console.log(error);
    }
    
    return token;  
}