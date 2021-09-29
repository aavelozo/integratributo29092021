"use strinct";
class FuncoesLogin{
    #_THIS = null;
    static getInstancia(){
        if (FuncoesLogin.#_THIS == null) {
            FuncoesLogin.#_THIS = new FuncoesLogin();
        }
        return FuncoesLogin.#_THIS;
    }
    criarHtmlLogin(){
        
    }
};
export {FuncoesLogin}