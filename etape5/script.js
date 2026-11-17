"use strict";
// slides 51 et 37: let et type primitif
let lignes = 0;
let total_points = 0;
//slide 45: Declaration d'une fonction
function doInsertRowTable(num, nom, prenom, point) {
    //slide 50: variable locale avec const
    //slide 76: selecteur css
    const table = document.querySelector("#table_container table");
    //slide 104:creer un element html a partir de 0
    const row = document.createElement("tr");
    row.setAttribute("class", "row");
    //slide 104
    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    const col5 = document.createElement("td");
    //slide 90: innerText
    col1.innerText = num;
    col2.innerText = nom;
    col3.innerText = prenom;
    col4.innerText = point;

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    col5.append(checkbox);
    //slide 106-107: setAttribute
    col1.setAttribute("class", "col_number");
    col2.setAttribute("class", "col_text");
    col3.setAttribute("class", "col_text");
    col4.setAttribute("class", "col_number");
    col5.setAttribute("class", "col_chbkbox");
    //slide 103: insersion dans le dom 
    row.append(col1);
    row.append(col2);
    row.append(col3);
    row.append(col4);
    row.append(col5);

    table.append(row);
}




//slide 39: classe est un objet 
class Person {
    constructor(num, nom, prenom, points) {
        this.num = num;
        this.nom = nom;
        this.prenom = prenom;
        this.points = points;
    }
}

//slide 40: tableau d'objet
let persons = [
    new Person(1, "nom-1", "prenom-1", 5),
    new Person(2, "nom-2", "prenom-2", 10),
    new Person(3, "nom-3", "prenom-3", 15)
];

init();

function init() {
    //slide 44: Boucle for..of
    for (let p of persons) {
        //slide 39: propriete d'un objet
        doInsert(p.nom, p.prenom, p.points);
    }
}

function doInsert(nom, prenom, points) {
    //slide 41: operateur combine
    lignes++;
    total_points += points;
    //slide 45: appel de fonction
    doInsertRowTable(lignes, nom, prenom, points);
    update_summary();
}
function ConsoleTableau() {
    //slide 46: fonction flechee
    //slide 47 : callback (fonction de rappel)
    console.log(persons.map(p => ({
        nom: p.nom,
        prenom: p.prenom,
        points: p.points

    })));
}

function update_summary() {
    //slide 61: retrouver element par identifiant 
    const element_lignes = document.getElementById("p1");
    const element_points = document.getElementById("p3");
    //slide 90: innerText
    element_lignes.innerText = `${lignes} ligne(s)`;
    element_points.innerText = `Total Point(s) = ${total_points}`;

//slide 17: bouton onclick
function doNewData() {
    //slide 61: retrouver element par identifiant 
    const elt_nom = document.getElementById("form_nom");
    const elt_prenom = document.getElementById("form_prenom");
    const elt_points = document.getElementById("form_points");
    //slide 86: element html est un objet
    const nom = elt_nom.value;
    const prenom = elt_prenom.value;
    //convertir le texte en nombre
    const points = parseInt(elt_points.value);
    //slide 42 : condition if...else
    if (nom === "" || prenom === "" || Number.isNaN(points)) {
        //slide 116: affiche boite d'alerte
        alert("Formulaire incomplet !");
    } else {
        doInsert(nom, prenom, points);
        //slide 38: push 
        persons.push(new Person(lignes, nom, prenom, points));
        elt_nom.value = "";
        elt_prenom.value = "";
        elt_points.value = "";
    }
}

