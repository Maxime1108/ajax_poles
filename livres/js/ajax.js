function chargerLivres() {
    let tableBody = document.querySelector("#tableLivres tbody");
    if(tableBody.innerHTML == "" ) {
        fetch("http://localhost/ajax_poles/livres/serveur_api/liste_livres.php")
            .then(reponseHTTP => reponseHTTP.json())
            .then(livres => {
            
                livres.forEach(livre => {
                    let tr = document.createElement("tr");
                    let tdTitre = document.createElement("td");
                    let tdAuteur = document.createElement("td");
                    let tdId = document.createElement("td");
                    let tdAction = document.createElement("td");

                    tdTitre.innerHTML = livre.titre;
                    tdAuteur.innerHTML = livre.auteur;
                    tdId.innerHTML = livre.id;
                    tdAction.innerHTML = `<a href='http://localhost/ajax_poles/livres/serveur_api/fiche_livre.php?id=${livre.id}' class='btn btn-info'>fiche</a>`;

                    tr.appendChild(tdId);
                    tr.appendChild(tdTitre);
                    tr.appendChild(tdAuteur);
                    tr.appendChild(tdAction);

                    tableBody.appendChild(tr);
                })
            }).then(() => {
                liensFiches = document.querySelectorAll("td  a");
                liensFiches.forEach( (lien, indice) => {
                    lien.addEventListener("click", e => {
                        e.preventDefault();
                        /**
                         * Dans un écouteur d'évènement, quand on utilise une fonction,
                         * la variable 'this' correspond à l'objet qui déclenche l'évènement.
                         * En utilisant une fonction fléchée, this correspond à l'objet
                         * Window. Donc pour avoir l'élément qui a déclenché l'évènement,
                         * on utilise la propriété 'target' de l'objet Event.
                         */
                        fetch(e.target.href)
                        .then(response => response.json())
                        .then(livre => {
                            document.querySelector("body").innerHTML = `
                               <h2>Titre : ${livre.titre}</h2>
                               <ul class="list-group">
                                <li class="list-group-item">ID : ${livre.id}</li>
                                <li class="list-group-item">Auteur : ${livre.auteur}</li>
                               </ul>

                               <a class="btn btn-danger" href='http://localhost/ajax_poles/livres/'>Accueil</a>
                            `;
                        })
                    })
                } )
                console.log(liensFiches); 

            })
            .catch(error => {
                console.log("Erreur lors de la récupération des données : ", error);
            });
    }

}

let liensFiches;

let bouton = document.querySelector("#btCharger");
bouton.addEventListener("click", chargerLivres);