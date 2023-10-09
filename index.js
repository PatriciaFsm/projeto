const botaoGallery = document.querySelector(".button-gallery");
botaoGallery.addEventListener("click", mostraFotoAleatoria);

function mostraFotoAleatoria() {

    fetch("https://dog.ceo/api/breeds/image/random")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao obter imagens.");
            }
            return response.json();
        })
        .then(imagens => {
            if (!imagens || imagens.length === 0) {
                throw new Error("Os dados não estão no formato esperado");
            }
            const dataRemove = document.querySelector(".remover");
            if (dataRemove) {
                dataRemove.remove()
            }
            const result = document.querySelector("#result");
            result.style.textAlign = "center";
            const resultContainer = document.createElement("img");
            resultContainer.classList.add("remover");
            resultContainer.src = imagens.message;
            result.appendChild(resultContainer);
        })
        .catch(error => {
            console.log("Erro:", error.message)
        });
}

const botaoRacas = document.querySelector("#button-breeds");
botaoRacas.addEventListener("click", mostraRacas);

function mostraRacas() {
    fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao obter a lista.");
            }
            return response.json();
        })
        .then(breedsList => {
            if (!breedsList || breedsList.length === 0) {
                throw new Error("Os dados não estão no formato esperado");
            }
            const dataRemove = document.querySelector(".remover")
            if (dataRemove) {
                dataRemove.remove()
            }
            const result = document.querySelector("#result");
            result.style.textAlign = "left";
            const resultContainer1 = document.createElement("div");
            resultContainer1.classList.add("remover");
            result.appendChild(resultContainer1);
            for (const breed in breedsList.message) {
                const resultContainer2 = document.createElement("li");
                resultContainer2.textContent = `${breed}: ${breedsList.message[breed].join(", ")}`;
                resultContainer1.appendChild(resultContainer2);
            }
        })

        .catch(error => {
            console.log("Erro:", error.message)
        })

}

const botaoVer = document.querySelector(".button-see");
botaoVer.addEventListener("click", mostraFotoRaca)

function mostraFotoRaca() {
    const input = document.querySelector("#input-breed");
    let inputBreed = input.value;
    try {
        if (inputBreed === ""){
            throw new Error("Digite uma raça válida");
        }
    } catch (error) {
        input.placeholder = error.message
    }
    fetch(`https://dog.ceo/api/breed/${inputBreed}/images/random`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Digite uma raça válida");
            }
            return response.json();
        })
        .then(imagensBreed => {
            if (!imagensBreed || imagensBreed.length === 0) {
                throw new Error("Os dados não estão no formato esperado");
            }
            const dataRemove = document.querySelector(".remover")
            if (dataRemove) {
                dataRemove.remove()
            }
            const result = document.querySelector("#result");
            result.style.textAlign = "center";
            result.textContent = "";
            const resultContainer = document.createElement("img");
            resultContainer.classList.add("remover");
            resultContainer.src = imagensBreed.message;
            result.appendChild(resultContainer);
        })

        .catch(error => {
            console.log(error.message)
            result.textContent = error.message
        })

}