/******************************************************************************
 * FuncoesJavascript.js                                                       *
 *                                                                            *
 * Instituição: Faculdade Assis Gurgacz                                       *    
 * Disciplina: Algoritimos e Lógica de Programação                            *  
 * Projeto: Integra Tributo                                                   *
 * Projeto de integração Summit                                               *
 *                                                                            *
 * Desenvolvedores:                                                           *
 *      Antonio Alecar Velozo                                                 *
 *      Bruno Romão                                                           *
 *      Carlos Rosa                                                           *
 *      Cassius                                                               *
 *      Lucas                                                                 *
 *      Richardison Korp                                                      *
 *                                                                            *
 * Criado em: 12/09/2021                                                      *
 *                                                                            *
 *                                                                            *
 * Contem funcoes javascript para tratativas referentes ao projeto.           *
 *                                                                            *
 *                                                                            *
 *****************************************************************************/



/**
 * Classes para dados
 */
class Endereco {
    cep = null;
    estado = null;
    cidade = null;
    bairro = null;
    logradouro = null;
    numero = null;
    complemento = null;
}
class Pessoa{
    tipoPessoa = null;
    cpfCnpj = null;
    nomeRazao = null;
    endereco = null;
    fonePrincipal = null;
    foneCelular = null;
    outrosFones = null;
    email = null;
    produtorRural = null;
    tipoMatrizFilial = null; 
    natJuriidca = null;   
    porte = null;    
    cnaePrincipal = null;
    senha = null;
    repSenha = null;        
    constructor(){
        this.endereco = new Endereco();        
    }
}


/*CLASSE CRUD LOCAL STORAGE*/

/**
 * Classe para lidar com local storage
 */
 class CrudLocalStorage {
    _LocalStorageHabilidado = false;
    constructor(){
        if (typeof localStorage !== "undefined" && localStorage !== null) {
            this._LocalStorageHabilidado = true;
        }
    }

    incluir(nome,valor){
        try {
            console.log("incluindo no local storage: " ,nome,valor);
            if (this._LocalStorageHabilidado) {
                localStorage.setItem(nome,valor);
                console.log("  incluido com sucesso");
            } else {
                console.log("  Falha: localStorage nao habilitado neste navegador!");
            }
        } catch(e) {
            console.log(e);
        }
    }

    atualizar(nome,valor){
        this.incluir(nome,valor);
    }

    excluir(nome){
        try {
            console.log("excluindo no local storage: " ,nome);
            if (this._LocalStorageHabilidado) {
                localStorage.removeItem(nome);
                console.log("  excluido com sucesso");
            } else {
                console.log("  Falha: localStorage nao habilitado neste navegador!");
            }
        } catch(e) {
            console.log(e);
        }
    }

    consultar(nome){
        if (this._LocalStorageHabilidado) {
            return localStorage.getItem(nome);
        } else {
            console.log("  Falha: localStorage nao habilitado neste navegador!");
            return null;
        }
    }
}
var crudStorage = new CrudLocalStorage();

/*FIM CLASSE CRUD LOCAL STORAGE*/




/*FUNCOES PARA STRING */

/**
 * Função que verifica se uma string tem valor atribuido
 * @param {string} string 
 * @returns {boolean}
 */
function string_tem_valor(str) {
    try {
        if (!(typeof str !== "undefined" && str !== null && str.trim().length > 0)) {
            return false;
        }
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

/*FIM FUNCOES PARA STRING*/





/*FUNCOES PARA COMPONENTES HTML */

/**
 * Funcão que seleciona um valor de um select html se existir, senão existir, inclui-o e seleciona-o
 * @param {object} select - o objeto select html 
 * @param {string} valor - o valor a ser selecionado/incluido
 * @param {string} texto - o texto a ser incluido
 */
function selecionar_ou_incluir_select(select,valor,texto) {
    if (typeof select !== "undefined" && select !== null && select.length) {
        if (!(select instanceof $)) {
            select = $(select);
        }
        if (typeof valor !== "undefined" && valor !== null) {
            texto = texto || valor;
            if (!select.find('option[value="' + valor + '"]').length) {               
                select.append('<option value="' + valor + '">' + texto + '</option>');
            }   
            select.find('option[value="' + valor + '"]').prop("selected",true);         
        }
    }
}

/*FIM FUNCOES PARA COMPONENTES HTML */





/*FUNCOES DO SISTEMA INTEGRA TRIBUTOS*/

/**
 * Funcao chamada ao selecionar tipo de pessoa, esconde e mostra os forms conforme o tipo de pessoa.
 * @param {object} obj 
 */
 function selecinou_tipo_pessoa(obj) {
    let form = $(document).find("form#form_dados");
    if (obj.value === "cpf") {        
        form.find("input#cpf_cnpj").attr("placeholder","(Cpf)");
        form.find(".especifico_cnpj").addClass("d-none"); 
        form[0].reset();       
    } else {
        form.find("input#cpf_cnpj").attr("placeholder","(Cnpj)");
        form.find(".especifico_cnpj").removeClass("d-none");
        form[0].reset();
    }
}


/**
 * Função que valida o cpf conforme regra de validação do documento.
 * @param {integer | string } cpf 
 * @returns {boolean} 
 */
 function validar_cpf(cpf){
    try {
        let valido = false;
        if (string_tem_valor(cpf)) {
            cpf = cpf + "";
            cpf = cpf.replace(/\./g,'').replace(/,/g,'').replace(/-/g,'');
            while(cpf.length < 11) {
                cpf = "0" + cpf;
            }
            cpf = cpf.split("");
            let soma = 0;
            for(let i = 10; i > 1; i--) {
                soma += cpf[10-i] * i; 
            }
            let digito1 = 11 - (soma % 11);
            if (digito1 >= 10) {
                digito1 = 0;
            }
            if (digito1 == cpf[9]) {
                soma = 0;
                for(let i = 10; i > 1; i--) {
                    soma += cpf[10-i] * (i+1); 
                }
                soma += digito1 * 2;
                let digito2 = 11 - (soma % 11);
                if (digito2 >= 10) {
                    digito2 = 0;
                }
                if (digito2 == cpf[10]) {
                    valido = true;
                }
            }
        }
        return valido;
    } catch (e) {
        console.log(e);
        return false;
    }
}


/**
 * Função que valida o cpf conforme regra de validação do documento.
 * @param {integer | string } cpf 
 * @returns {boolean} 
 */
 function validar_cnpj(cnpj){
    try {
        let valido = false;
        if (string_tem_valor(cnpj)) {
            cnpj = cnpj + "";
            cnpj = cnpj.replace(/\./g,'').replace(/,/g,'').replace(/-/g,'');
            while(cnpj.length < 14) {
                cnpj = "0" + cnpj;
            }
            cnpj = cnpj.split("");
            let soma = 0;
            for(let i = 5; i > 1; i--) {
                soma += cnpj[5-i] * i; 
            }
            for(let i = 9; i > 1; i--) {
                soma += cnpj[13-i] * i; 
            }
            let digito1 = (soma % 11);
            if (digito1 < 2) {
                digito1 = 0;
            } else {
                digito1 = 11-digito1;
            }
            console.log(digito1);
            if (digito1 == cnpj[12]) {
                soma = 0;
                for(let i = 6; i > 1; i--) {
                    soma += cnpj[6-i] * i; 
                }//21380
                for(let i = 8; i > 1; i--) {
                    soma += cnpj[13-i] * (i + 1); 
                }
                soma += digito1 * 2;
                let digito2 = (soma % 11);                
                
                if (digito2 < 2) {
                    digito2 = 0;
                } else {
                    digito2 = 11 - digito2;
                }
                console.log(digito2);
                if (digito2 == cnpj[13]) {
                    valido = true;
                }
            }
        }
        return valido;
    } catch (e) {
        console.log(e);
        return false;
    }
}


/**
 * Funcção para coletar os dados do form e amazenar em um obeto do tipo Pessoa, retornando-o.
 * @param {object} form - o formulario para coleta
 * @returns {Pessoa} - o objeto com os dados
 */
function obter_dados_pessoa_form(form){
    try {
        let dados_pessoa = new Pessoa();
        dados_pessoa.tipoPessoa = $(document).find("input[type=radio][name=radio_tp_pessoa]:checked").val();
        dados_pessoa.cpfCnpj = form.find("input#cpf_cnpj").val();
        dados_pessoa.nomeRazao = form.find("input#nome_razao").val();
        dados_pessoa.endereco.cep = form.find("input#cep").val();
        dados_pessoa.endereco.estado = form.find("select#estado").children("option:selected").val();
        dados_pessoa.endereco.cidade = form.find("select#cidade").children("option:selected").val();
        dados_pessoa.endereco.bairro = form.find("input#bairro").val();
        dados_pessoa.endereco.logradouro = form.find("input#logradouro").val();
        dados_pessoa.endereco.complemento = form.find("input#complemento").val();
        dados_pessoa.endereco.numero = form.find("input#numero").val();
        dados_pessoa.fonePrincipal = form.find("input#fone").val();
        dados_pessoa.foneCelular = form.find("input#celular").val();
        dados_pessoa.outrosFones = form.find("input#outros_fones").val();
        dados_pessoa.email = form.find("input#email").val();
        dados_pessoa.produtorRural = (form.find('input[name="radio_produtor_rural"]:checked').val() || "nao");
        dados_pessoa.tipoMatrizFilial = (form.find('input[name="radio_matriz_filial"]:checked').val() || "matriz");
        dados_pessoa.natJuriidca = form.find("select#nat_juridica").children("option:selected").val();
        dados_pessoa.porte = form.find("select#porte").children("option:selected").val();
        dados_pessoa.cnaePrincipal = form.find("select#ativ_princ").children("option:selected").val();
        dados_pessoa.senha = form.find("input#senha").val();
        dados_pessoa.repSenha = form.find("input#repsenha").val();
        return dados_pessoa;
    } catch (e){
        console.log(e);
        alert(e.message || e);
        return null;
    }
}


/**
 * Função que valida os dados coletados, retornando um array de mensagens de erro, que se vazio, 
 * indica que não ha erros.
 * @param {object} dados_pessoa - o objeto da classe Pessoa com os dados para validação
 * @returns {array} - mensagens de erro
 */
function validar_dados_pessoa(dados_pessoa){
    let mensagens_erro = [];
    try {
        if (typeof dados_pessoa !== "undefined" && dados_pessoa !== null && Object.keys(dados_pessoa).length > 0) {            
            if (!string_tem_valor(dados_pessoa.tipoPessoa)) {
                mensagens_erro.push("Tipo pessoa branco!");
            } else {
                if (dados_pessoa.tipoPessoa.toLowerCase().trim() === "cpf") {
                    if (!validar_cpf(dados_pessoa.cpfCnpj)) {
                        mensagens_erro.push("Cpf inválido!");
                    }
                } else {
                    if (!validar_cnpj(dados_pessoa.cpfCnpj)) {
                        mensagens_erro.push("Cnpj inválido!");
                    }
                }
            }
            if (!string_tem_valor(dados_pessoa.nomeRazao)) {
                mensagens_erro.push("Nome em branco!");
            } else {
                if (dados_pessoa.nomeRazao.split(" ").length <= 1) {
                    mensagens_erro.push("Nome completo deve ter mais que uma palavra!");
                }
            }
            if (!string_tem_valor(dados_pessoa.endereco.cep)) {
                mensagens_erro.push("Cep em branco!");
            }
            if (!string_tem_valor(dados_pessoa.endereco.estado)) {
                mensagens_erro.push("Estado em branco!");
            }
            if (!string_tem_valor(dados_pessoa.endereco.bairro)) {
                mensagens_erro.push("Bairro em branco!");
            }
            if (!string_tem_valor(dados_pessoa.endereco.logradouro)) {
                mensagens_erro.push("Logradouro em branco!");
            }
            if (!string_tem_valor(dados_pessoa.endereco.numero)) {
                mensagens_erro.push("Numero em branco!");
            }            
            if (!string_tem_valor(dados_pessoa.fonePrincipal)) {
                mensagens_erro.push("Telefone principal em branco!");
            }
            if (!string_tem_valor(dados_pessoa.email)) {
                mensagens_erro.push("Email em branco!");
            }
            if (dados_pessoa.tipoPessoa.toLowerCase().trim() === "cnpj") {
                if (!string_tem_valor(dados_pessoa.tipoMatrizFilial)) {
                    mensagens_erro.push("Tipo Matriz/Filial em branco!");
                }
                if (!string_tem_valor(dados_pessoa.natJuriidca)) {
                    mensagens_erro.push("Natureza Jurídica em branco!");
                }
                if (!string_tem_valor(dados_pessoa.porte)) {
                    mensagens_erro.push("Porte em branco!");
                }
                if (!string_tem_valor(dados_pessoa.cnaePrincipal)) {
                    mensagens_erro.push("Cnae Principal em branco!");
                }
            }
            if (!string_tem_valor(dados_pessoa.senha)) {
                mensagens_erro.push("Senha em branco!");
            } else {
                if (dados_pessoa.senha.length < 6) {
                    mensagens_erro.push("Senha deve ter ao menos 6 caracteres!");
                }
            }
            if (!string_tem_valor(dados_pessoa.repSenha)) {
                mensagens_erro.push("Confirmacao senha em branco!");
            } else {
                if (dados_pessoa.repSenha.length < 6) {
                    mensagens_erro.push("Confirmação de senha deve ter ao menos 6 caracteres!");
                } else {
                    if (dados_pessoa.senha !== dados_pessoa.repSenha) {
                        mensagens_erro.push("Senha e confirmação de senha não conferem!");
                    }
                }
            }
        } else {
            mensagens_erro.push("Objeto pessoa nulo");
        }
    } catch(e){
        console.log(e);
        mensagens_erro.push(e.message || e);
    }
    return mensagens_erro;
}


/**
 * Função chamada quando o cep é incluido, para valida-lo e se valido, buscar as informacoes na
 * internet para preencher os demais campos
 * @param {object} input - o input do cep
 */
 function atualizou_cep(input) {     
    try {           
        let cep = null;
        input = $(input);
        if (input.prop("tagName") === "BUTTON") {
            input = input.prev("input");
        }
        cep = input.val();
        cep = cep.replace(/[^0-9]+/g, '').trim();
        if (cep.length === 8) {
            consultar_dados_cep_internet(cep,'preencher_dados_cep_internet');
        } else {
            console.log('cep invalido', cep);
        }
        
    } catch(e){
        console.log(e);
    }
}

/**
 * Função que consulta um cep na internet e chama um calback quando retorna
 * @param {string} cep - o cep a ser consultado
 * @param {string} callback a string de callback a ser chamada quando receber a resposta da internet
 */
 function consultar_dados_cep_internet(cep,callback) {
    try {
        console.log('Pesquisando cep ' + cep + ' na internt, callback=' + callback);
        let script = document.createElement('script');
        script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=' + callback;
        document.body.appendChild(script);
    } catch(e){
        console.log(e);
    }
}

/**
 * Função que preenche os campos do formulário com dados da receita retornados em json
 * @param {json} dados - o json de dados retornados da receita
 */
function preencher_dados_cep_internet(dados){
    dados = dados || {};
    console.log(dados);    
    if (typeof dados !== "undefined" && dados != null && Object.keys(dados).length && !("erro" in dados)) {
        let form = $("form#form_dados");
        selecionar_ou_incluir_select(form.find("select#estado"),(dados.uf||""));
        selecionar_ou_incluir_select(form.find("select#cidade"),(dados.localidade||""));
        form.find("input#logradouro").val(dados.logradouro);
        form.find("input#bairro").val(dados.bairro);        
    }
}



/*FUNCOES PESSOA JURIDICA*/

/**
 * Função chamada quando o cnpj é incluido, para valida-lo e se valido, buscar as informacoes na
 * receita para preencher os demais campos
 * @param {object} input - o input do cnpj
 */
function atualizou_cnpj(input) {     
    try {   
        let tipoPessoa = $(document).find("input[type=radio][name=radio_tp_pessoa]:checked").val();
        if ((tipoPessoa || "") === "cnpj") {
            let cnpj = null;
            input = $(input);
            if (input.prop("tagName") === "BUTTON") {
                input = input.prev("input");
            }
            cnpj = input.val();
            cnpj = cnpj.replace(/[^0-9]+/g, '');
            console.log(cnpj);
            if (validar_cnpj(cnpj)) {
                consultar_dados_cnpj_receita_v1(cnpj,'preencher_dados_cnpj_receita');
            } else {
                console.log("Cnpj invalido ",cnpj);
            }
        }
    } catch(e){
        console.log(e);
    }
}


/**
 * Função que consulta um cnpj na receita e chama um calback quando retorna
 * @param {string} cnpj - o cnpj a ser consultado
 * @param {string} callback a string de callback a ser chamada quando receber a resposta da receita
 */
function consultar_dados_cnpj_receita_v1(cnpj,callback) {
    try {
        console.log('Pesquisando cnpj ' + cnpj + ' na receita, callback=' + callback);
        let script = document.createElement('script');
        script.src = 'https://www.receitaws.com.br/v1/cnpj/' + cnpj + '/?callback=' + callback;
        document.body.appendChild(script);
    } catch(e){
        console.log(e);
    }
}

/**
 * Função que preenche os campos do formulário com dados da receita retornados em json
 * @param {json} dados - o json de dados retornados da receita
 */
function preencher_dados_cnpj_receita(dados){
    dados = dados || {};
    console.log(dados);    
    if (typeof dados !== "undefined" && dados != null && Object.keys(dados).length && !("erro" in dados)) {
        let form = $("form#form_dados");
        form.find("input#nome_razao").val(dados.nome); 
        form.find("input#nome_fantasia").val(dados.fantasia);
        selecionar_ou_incluir_select(form.find("select#estado"),(dados.uf||""));
        selecionar_ou_incluir_select(form.find("select#cidade"),(dados.municipio||""));
        form.find("input#cep").val(dados.cep);
        form.find("input#bairro").val(dados.bairro);
        form.find("input#logradouro").val(dados.logradouro);
        form.find("input#numero").val(dados.numero);
        form.find("input#complemento").val(dados.complemento);
        form.find("input#email").val(dados.email);
        let fones = (dados.telefone||"").split("/");
        if (fones.length) {
            form.find("input#fone").val(fones[0]);
            if (fones.length > 1) {
                fones.shift();
                form.find("input#outrosfones").val(fones.join("/"));
            }
        }
        (form.find('input#radio_matriz_filial[value="'+(dados.tipo||"").toLowerCase()+'"]')
            ||form.find('input#radio_matriz_filial[value="matriz"]')
            ).prop("checked",true);
        selecionar_ou_incluir_select(form.find("select#nat_juridica"),(dados.natureza_juridica||""));
        selecionar_ou_incluir_select(form.find("select#porte"),(dados.porte||""));
        selecionar_ou_incluir_select(form.find("select#ativ_princ"),(dados.atividade_principal[0].code||""),(dados.atividade_principal[0].code||"") + " " + (dados.atividade_principal[0].text||""));        
    }
}


/**
 * Funcção que valida e salva os dados de cadastro de cliente pessoa fisica
 * @param {object} form 
 */
 function enviar_cadastro(form) {
    console.log("enviando cadastro...");
    try {
        form = $(form);
        let dados_pessoa = obter_dados_pessoa_form(form);
        console.log("dados obtidos: ",dados_pessoa);
        let mensagens_erro = validar_dados_pessoa(dados_pessoa);
        console.log("mensagens erro: ",mensagens_erro);
        
        if (mensagens_erro.length > 0) {
            //algum(ns) dado invalido, tem mensagens de erro
            alert(mensagens_erro.join("\n"));
        } else {
            let dados_preexisntentes = crudStorage.consultar("u" + dados_pessoa.cpfCnpj);
            if (typeof dados_preexisntentes !== "undefined" && dados_preexisntentes !== null && dados_preexisntentes.length) {
                dados_preexisntentes = JSON.parse(dados_preexisntentes);
                if (window.confirm("Cadastro já existe. Atualizar dados?")) {
                    //dados validados, inclui no banco de dados e retorna para login
                    crudStorage.atualizar("u" + dados_pessoa.cpfCnpj,JSON.stringify(dados_pessoa));
                    alert("Cadastro atualizado com sucesso!\nFaça login para confirmar sua identidade.");
                    /** tempo para conccluir gravação se demorar */
                    setTimeout(function(){window.location.href="index.html";},100);
                }
            } else {
                //dados validados, inclui no banco de dados e retorna para login
                crudStorage.incluir("u" + dados_pessoa.cpfCnpj,JSON.stringify(dados_pessoa));
                alert("Cadastro efetuado com sucesso!\nFaça login para confirmar sua identidade.");
                /** tempo para conccluir gravação se demorar */
                setTimeout(function(){window.location.href="index.html";},100);
            }            
        }
        
    } catch (e) {
        console.log(e);
        alert(e.message || e);
    }
}

/**
 * Função que verifica os dados de login
 * @param {string} login 
 * @param {string} senha 
 * @returns {boolean}
 */
function logar(login,senha) {
    try {
        console.log('verificando login...');
        let retorno = false;
        if (typeof login !== "undefined" && login !=- null && login.length > 0 
            && typeof senha !== "undefined" && senha !== null && senha.length > 0
        ) {            
            login = login.replace(/[^0-9]/g, '').trim();
            console.log('login: ' , login,senha);
            dados_pessoa = crudStorage.consultar("u" + login);
            console.log(dados_pessoa);
            if (typeof dados_pessoa !== "undefined" && dados_pessoa !== null && dados_pessoa.length) {
                dados_pessoa = JSON.parse(dados_pessoa);
                console.log("json dados pessoa", dados_pessoa);
                console.log("dados login encontrados: ", dados_pessoa);
                if (dados_pessoa.senha === senha) {
                    retorno = true;
                }                
            }
        }        
        return retorno;
    } catch (e) {
        console.log(e);
        alert(e.message || e);
        return false;
    }
}


/**
 * Funcção chamada pelo botao entrar
 */
function entrar() {
    if (logar(document.querySelector("input#login").value,document.querySelector("input#senha").value)) {
        window.location.href = "menu.html";
    } else {
        alert("Não foi possivel logar!");
    }
} 


/**
 * Função chamada pelo botão cadastrarse
 */
function cadastrar() {
    window.location.href = "cadastrar_usuario.html";
}

/*FIM FUNCOES DO SISTEMA INTEGRA TRIBUTO*/
