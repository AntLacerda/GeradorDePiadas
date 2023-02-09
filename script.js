//Constantes de ligação e apoio ao HTML e CSS;
const jokeContainer = document.querySelector("#joke");
const btn = document.querySelector("#btn");
const url = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";

//Arrow Function responsável por requisitar a piada à API;
let getJoke = () => {
    //Gera o efeito de fade na piada;
    jokeContainer.classList.remove("fade");
    //A função fetch vai fazer o requerimento à API. Porém, a função fetch sempre nos retorna uma promise, ou seja, se executarmos o código simples, o retorno não funcionaria já que precisamos aguardar a resposta do site. Para isso poderiamos utilziar o assync e o await para transformar a função de requerimento da piada em assíncrona. Porém, o novo recurso then facilita o uso do fetch. Ela funciona da seguinte forma, assim que a promise do fetch for retornada, vai aplicar a função dentro do then;
    fetch(url).then(data => data.json()).then(item => {
        let piadaInglês = `${item.joke}`;
        tradutor(piadaInglês);
        jokeContainer.classList.add("fade");
    }); //Geralmente os retornos de APIs são sempre ilegíveis e para isso precisamos transformar ele em json para podemos utilizar seus dados. Dessa maneira, o parâmetro data vai receber o retorno da promise e com o .json vai transformar em arquivo legível;
}

//Função repsponsável por traduzir o texto produzido pela API em inglês;
function tradutor(text){
    fetch(
        `https://api.mymemory.translated.net/get?q=${text}&langpair=en|pt`
    )
        .then((res) => res.json())
        .then((data) => {
          jokeContainer.textContent = data.responseData.translatedText;
    });
}

//Adiciona o evento clique ao botão para gerar uma nova piada;
btn.addEventListener("click", getJoke);
getJoke();