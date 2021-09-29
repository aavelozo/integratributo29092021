/**
 * Classe com a finalidade de disponibilizar funções de criação de componentes html, atravez de código
 * javascript, com a prerrogativa de padronizar o html gerado.
 * 
 * Principal metodo: criarElemento
 * 
 * @class ComponentesHtml - classe SINGLETON
 * @example compHtml.criarElemento({tag:"div",parent:document.body}); //compHtml = instancia desta classe
 * @author Antonio Alencar Velozo
 * @created 17/09/2021
 * @version 1.0
 * @todo desenvolver novos metodos para padronizar criacao de componentes que tragam as classes padrao do 
 *       bootstrap.
 * 
 * 
 * @see Definição de Classes com a palavra Class não funcionam em navegador Internet Explorer, conforme MDN.
 */

class ComponentesHtml{

    /*Propridades privadas (#)*/
    static #_THIS = null;//singleton
    #props_elegiveis = [        
        "checked",
        "class",
        "id",
        "name",
        "onclick",
        "onkeyup",
        "onsubmit",
        "placeholder",
        "required",                        
        "src",
        "style",
        "title",
        "type",
        "value"            
    ];
    #tags_fechamento_simples = ["br","img","input"];    
    #sepn1 = '_N1,1N_';
    #posicao_padrao_inclusao = 'beforeend'

    /*constructor*/
    constructor(){}    


    /*Metodo para obter a instancia. Utilizar este metodo em forma estatica para obter a instancia 
    * singleton da classe (var instancia = ComponentesHtml.getInstancia())*/
    static getInstancia(){
        if (ComponentesHtml.#_THIS === null) {
            ComponentesHtml.#_THIS = new ComponentesHtml();
        }
        return ComponentesHtml.#_THIS;
    }







    /*INICIO BLOCO DE POLIFILLS E UTILITADES GERAIS*

    /**
     * Retorna o tipo do elemento passado como parametro. Adicionalmente e diferentemente do typeof normal,
     * verifica se eh do tipo array.
     * @param {variant} value - o elemento
     * @returns {string} - o tipo encontrado
     */
     #typeof(value){
        let r = typeof value;
        if (Array.isArray(value) || value instanceof NodeList || value instanceof Array) {
            r = "array";
        }
        return r;
    }

    /**
     * Checa se um valor eh numerico
     * @param {variant} valor 
     * @returns 
     */
    #isNumber(valor){
        try {
            valor = valor - 0;
            if (valor >= 0 || valor <= 0 ) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }
    /*checa de um array de falores, o primeiro que nao seja undefined e retorna-o. 
      adicionalmente, checa se o elemento é nulo .Esta funcao é um hotfix para o operador unario || do 
      javascript a fim de corrigir o "bug" quando ao invez de o valor for undefined, for false ou 0, pois
      esse operador unario ignoraria isso. Nas utilizacoes do operador unario || que não envolvem booleanos 
      ou que não se queira checar se nulo sera considerado é desnecessário utilizar essa funcao .
      @param arr_valores : array - o array de valores a serem checados, a ordem sera do primeiro para o ultimo
      @check_null : boolean = true - checa se o valor é nulo, se for, continua procurando (
          para ignorar esta checagem, chamar a funcao com esse parametro como false (padrao = true)
      )
    */
      #first_valid(arr_valores,check_null) {
        try {
            if (typeof arr_valores !== "undefined") {
                check_null = check_null === false ? false : true;
                if (arr_valores !== null) {            
                    if (this.#typeof(arr_valores) === "array") {
                        let q = arr_valores.length;                
                        if (check_null) {
                            for (let i = 0; i < q; i++) {
                                if (typeof arr_valores[i] !== "undefined" && arr_valores[i] !== null) {
                                    return arr_valores[i];
                                };
                            }
                        } else {
                            for (let i = 0; i < q; i++) {
                                if (typeof arr_valores[i] !== "undefined") {
                                    return arr_valores[i];
                                }
                            }
                        }
                    } 
                } 
            }            
            return null;
        }catch(e){
            console.log(e);            
            alert(e.message || e);            
            return null;
        }
    }    
    /*FIM BLOCO DE POLIFILLS E UTILITADES GERAIS*










    /*INICIO BLOCO DE METODOS PRIVADOS DA CLASSE (#)*/
    /**
     * Coloca em params.props as propriedades que vieram como filhas diretas de params (ex. params.id),
     * para que sejam devidamente encontradas pela funcao que atribiu as propriedades em objeto.
     * @param {object} params - o objeto com parametros da criação
     */
    #prepararPropriedadesElemento(params) {
        try {
            params = params || {};
            /*keys que vem fora de params.props mas sao elegiveis a propriedades html*/
            params.props = params.props || [];
            let keys = Object.keys(params);
            for(let i in keys) {
                if (this.#props_elegiveis.indexOf(keys[i]) > -1) {
                    if (params[keys[i]] !== null && params[keys[i]] !== "null") {
                        params.props.push({
                            prop:keys[i],
                            value:params[keys[i]]
                        });
                    }
                }
            };
        } catch(e) {
            console.log(e);
            alert(e.message||e);
        }
    }
    
    /**
     * Atribiu as propriedades html ao elemento em criacao (string) ou ja criado (object).
     * @param {string | object} elemento - o elemento ao qual se deve atribuir as propriedades
     * @param {array of object} arrProps - o array com as propriedades, vindo de params.props
     * @returns {string | object} o proprio elemento concatenado | atribuido
     */
    #atribuirPropriedadesElemento(elemento,arrProps){
        try {
            if (this.#typeof(arrProps) === "array" && arrProps !== null && arrProps.length) {
                if (typeof elemento === "string") {
                    for(let i in arrProps) {
                        if (typeof arrProps[i] === "object" && arrProps[i] !== null 
                            && typeof arrProps[i].prop !== "undefined" && arrProps[i].value !== null
                        ) {
                            elemento += " " + arrProps[i].prop + '=' + (arrProps[i].value || '');
                        }
                    }
                } else if (typeof elemento === "object") {
                    if (elemento !== null) {
                        if (elemento instanceof ($ || null)) {
                            for(let i in arrProps) {
                                if (typeof arrProps[i] === "object" && arrProps[i] !== null 
                                    && typeof arrProps[i].prop !== "undefined" && arrProps[i].value !== null
                                ) {
                                    elemento.attr(arrProps[i].prop,(arrProps[i].value || ''));
                                }
                            }
                        } else {
                            for(let i in arrProps) {
                                if (typeof arrProps[i] === "object" && arrProps[i] !== null 
                                    && typeof arrProps[i].prop !== "undefined" && arrProps[i].value !== null
                                ) {
                                    elemento.setAttribute(arrProps[i].prop,(arrProps[i].value || ''));
                                }
                            }
                        }
                    }
                }
            }
        } catch(e) {
            console.log(e);
            alert(e.message || e);
        }
        return elemento;
    }
    /*FIM BLOCO DE METODOS PRIVADOS DA CLASSE (#)*/










    /*INICIO BLOCO FUNCOES PUBLICAS DA CLASSE*/

    /**
     * Obtem o ultimo elemento html incluido conforme params.posicao
     * @param {object} params - o mesmo params da criacao do elemento ou que contenha pelo menos seu .parent
     * @returns {object} - o elemento encontrado
     */
     obterUltimoAdicionado(params) {
        try {
            let retorno = null;
            if (typeof params.parent === "object") {                       
                switch((params.posicao || this.#posicao_padrao_inclusao).trim().toLowerCase()) {
                    case "beforeend":
                        retorno = (params.parent.lastChild || params.parent[0].lastChild);
                        break;
                    case "afterbegin":
                        retorno = (params.parent.firstChild || params.parent[0].firstChild);
                        break;
                    case "afterend":
                        retorno = (params.parent.nextSibling || params.parent[0].nextSibling);
                        break;
                    case "beforebegin":
                        retorno = (params.parent.prevSibling || params.parent[0].prevSibling);
                        break;
                    default:
                        throw 'Posicao nao esperada: ' + (params.posicao ||this.#posicao_padrao_inclusao);
                        break;                        
                }
            }  
            return retorno;              
        } catch(e) {
            console.log(e);
            alert(e.message || e);
            return null;
        }
    }
    /*FIM BLOCO FUNCOES PUBLICAS DA CLASSE*/







    /*INICIO BLOCO FUNCOES PRINCIPAIS DA CLASSE*/
    /**
     * Principal função da classe, ela que efetivamente cria o elemento conforme parametros passados.
     * @param {string | object} params - os paramtros para criacao ou a tag 
     * @returns {string | object} - o elemento criado 
     */
    criarElemento(params){
        try {
            let retorno = '';

            params = params || {};
            if (typeof params === "string") {
                params = {tag:params};
            }

            /*checagens/atribuicoes de valores padrao*/
            params.retornar_como = params.retornar_como || params.retornarcomo || 'string';
            params.demaisprops = params.demaisprops || params.demaispropiedades || params.demaiscampos || "";
            params.content = params.content || params.conteudo || params.text || '';
            params.content_apos = this.#first_valid([params.content_apos,false]); 
            params.props = params.props || [];
            this.#prepararPropriedadesElemento(params);

            /*se a tag existir, configura um elemento html a ser criado*/
            if (typeof params.tag !== "undefined") {
                if (["string","text","texto"].indexOf(params.retornar_como.toLowerCase().trim()) !== -1) {
                    retorno += '<' + params.tag;
                    retorno = this.#atribuirPropriedadesElemento(retorno,params.props);
                    if (this.#tags_fechamento_simples.indexOf(params.tag) > -1) {
                        retorno += '/>';
                    } else {
                        retorno += '>';
                        if (!params.content_apos) {
                            retorno += params.content ;
                        }
                        retorno += '</' + params.tag +'>';
                    }
                    if (typeof params.parent === "object" && params.parent !== null) {
                        if (params.parent instanceof ($ || null)) {
                            params.parent[0].insertAdjacentHTML(params.posicao || this.#posicao_padrao_inclusao, retorno);
                        } else {
                            params.parent.insertAdjacentHTML(params.posicao || this.#posicao_padrao_inclusao, retorno);
                        }
                        retorno = this.obterUltimoAdicionado(params);
                        if (this.#typeof(params.sub) === "array") {                            
                            params.sub.parent = retorno;
                            this.criarElemento(params.sub);
                        }
                    } else if (this.#typeof(params.sub) === "array") {    
                        params.sub.retornar_como = "texto";
                        params.sub.parent = null;
                        retorno = retorno.substr(0,Math.max(retorno.lastIndexOf('</'),retorno.lastIndexOf('/>')));                        
                        retorno += this.criarElemento(params.sub);
                        if (this.#tags_fechamento_simples.indexOf(params.tag) > -1) {
                            retorno += '/>';
                        } else {
                            if (params.content_apos) {
                                retorno += params.content ;
                            }
                            retorno += '</'+ params.tag +'>';
                        }
                    }
                } else {
                    retorno = document.createElement(params.tag);
                    this.#atribuirPropriedadesElemento(retorno,params.props);
                    if (!params.content_apos) {
                        retorno.innerHTML += params.content ;
                    }
                    if (typeof params.parent === "object") {
                        params.parent.insertAdjacentElement(params.posicao || this.#posicao_padrao_inclusao,retorno);                        
                    }
                    if (this.#typeof(params.sub) === "array") {                            
                        params.sub.parent = retorno;
                        this.criarElemento(params.sub);
                        if (params.content_apos) {
                            retorno.innerHTML += params.content ;
                        }
                    }
                } 
            } else {

                /*se a tag nao existir e se params for array ou params.sub for array, 
                então é um array de elementos/subelementos, então recursa*/
                if (this.#typeof(params.sub) === "array") {
                    params.sub.retornar_como = params.retornar_como;
                    params.sub.parent = params.parent;
                    retorno = this.criarElemento(params.sub);
                } else if (["array","object"].indexOf(this.#typeof(params))>-1) {
                    for(let ind in params) {
                        if (this.#isNumber(ind) && this.#typeof(params[ind]) === "object") {
                            params[ind].retornar_como = params[ind].retornar_como || params.retornar_como;
                            params[ind].parent = params[ind].parent || params.parent;
                            if (["string","text","texto"].indexOf(params[ind].retornar_como) !== -1 
                                && (typeof params[ind].parent === "undefined" || ((params[ind].parent || null) === null))
                            ) {
                                retorno += this.criarElemento(params[ind]);
                            } else {
                                retorno = this.criarElemento(params[ind]);
                            }
                        }
                    }
                }
            }
            return retorno;
        } catch (e) {
            console.log(e);
            alert(e.message || e);
            return null;
        }
    }

    /*Fim BLOCO FUNCOES PRINCIPAIS DA CLASSE*/
}

//variavel global que disponibiliza uma instancia dessa classe
var compHtml = ComponentesHtml.getInstancia();


/*Alguns exemplos de uso

document.body.insertAdjacentElement("afterbegin",compHtml.criarElemento("div"));

compHtml.criarElemento({tag:"div",parent:document.body});

compHtml.criarElemento({
    tag:"div",
    parent:document.body,
    id:"div1",
    name:"nome_div1",
    class:"classe_div1",
    props:[
        {
            prop:"data-bs-toggle",
            value:"toggle"            
        },
        {
            prop:"aria-expanded",
            value:false
        }
    ],
    sub:[
        {
            tag:"button",
            id:"button1",
            onclick:"alert('clicado')"
        },
        {
            tag:"nav",
            sub:[
                {
                    tag:"a",
                    sub:[
                        {
                            tag:"link",
                            props:[
                                {
                                    prop:"href",
                                    value:"#"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
*/