// permet d'enregistrer les informations du formulaire et de gerer les erreurs
document.getElementById("envoyer").addEventListener("click", () => {
    formulaire()
})

function formulaire(){
    let error = document.getElementById("error");
    let inputName = document.getElementById("prenom");
    let inputNom = document.getElementById("nom");
    let inputEmail = document.getElementById("email");
    let inputMessage = document.getElementById("message")
    checkSubmit()

    function checkSubmit() {
        
        if(checkEmpty(inputName) && checkEmpty(inputNom) && checkEmpty(inputEmail) && checkEmail(inputEmail) && checkEmpty(inputMessage)) {
            document.getElementById("envoyer").addEventListener("click", function(event){
                let contact = {
                    firstName: inputName.value,
                    lastName: inputNom.value,
                    email: inputEmail.value,
                    message: inputMessage.value,
                }
                console.log(contact)
                localStorage.setItem("contact", JSON.stringify(contact));
            })
            return true
            }else {
                return false
            }
    }

    checkForm()

    function checkEmpty(input) {
        if(input.value === "") {
            error.textContent = `${input.name} est vide`;
            error.setAttribute("class", "btn btn-danger");
            error.setAttribute("aria-label", input.name + "est vide");
            return false
        }else {
            error.textContent = ``;
            error.setAttribute("class", "")
            return true
        }
    }

    function checkEmail(input) {
        let regex = /\S+@\S+\.\S+/;
        if(!regex.test(input.value)) {
            error.textContent = `le format de l'email n'est pas correct`;
            error.setAttribute("class", "btn btn-danger");
            error.setAttribute("aria-label", "le format de l'email n'est pas correct");
            return false
        }else {
            error.textContent = ``;
            return true
        }
    }

    function checkForm() {
        document.getElementById("prenom").addEventListener('keyup', (e) => {
            checkEmpty(e.target);
            checkSubmit()
        })
        document.getElementById("nom").addEventListener('keyup', (e) => {
            checkEmpty(e.target);
            checkSubmit()
        })
        document.getElementById("email").addEventListener('keyup', (e) => {
            checkEmpty(e.target);
            checkEmail(e.target);
            checkSubmit()
        })
        document.getElementById("message").addEventListener('keyup', (e) => {
            checkEmpty(e.target);
            checkSubmit()
        })
    };
}