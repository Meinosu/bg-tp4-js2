//slide 51: mode strict
"use strict";
//slide 51: let pour les variables / slide 50: portée globale
let lignes = 0;
let total_points = 0;
let indexModif = -1;
let texteBoutonAjout = "";

//slide 45: fonction
function doInsertRowTable(num, nom, prenom, point) {

    //slide 76: querySelector avec un sélecteur CSS
    //slide 51: const pour les constantes
    const table = document.querySelector("#table_container table");

    //hors cours: document.createElement
    const row = document.createElement("tr");
    //slide 106: setAttribute
    row.setAttribute("class", "row");

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
    //slide 106: setAttribute
    checkbox.setAttribute("type", "checkbox");
    //slide 98: append()
    col5.append(checkbox);

    //slide 106: setAttribute
    col1.setAttribute("class", "col_number");
    col2.setAttribute("class", "col_text");
    col3.setAttribute("class", "col_text");
    col4.setAttribute("class", "col_number");
    col5.setAttribute("class", "col_chbkbox");

    //slide 98: append()
    row.append(col1);
    row.append(col2);
    row.append(col3);
    row.append(col4);
    row.append(col5);

    //slide 98: append()
    table.append(row);
}

//slide 39: les classes sont des objets / slide 141: utiliser des classes pour structurer les données
class Person {
    //hors cours: constructor
    constructor(num, nom, prenom, points) {
        //slide 46: this
        this.num = num;
        this.nom = nom;
        this.prenom = prenom;
        this.points = points;
    }
}

//slide 40: tableau d'objets / slide 38: tableaux
//slide 38: new Array(...)
let persons = [
    new Person(1, "nom-1", "prenom-1", 5),
    new Person(2, "nom-2", "prenom-2", 10),
    new Person(3, "nom-3", "prenom-3", 15)
];

//slide 33: le navigateur exécute le code de haut en bas (pas de main)
init();

function init() {

    //slide 61: getElementById
    const conteneurBtn = document.getElementById("container_btn");
    const btnModif = document.createElement("button");
    //slide 90: innerText
    btnModif.innerText = "Modifier";
    //slide 106: setAttribute
    btnModif.setAttribute("class", "btn-modif");
    //slide 139: addEventListener
    btnModif.addEventListener("click", modifierLigne);
    //slide 76: querySelector avec un sélecteur CSS
    const btnSupprimer = conteneurBtn.querySelector(".btn-del");
    //hors cours: insertBefore
    conteneurBtn.insertBefore(btnModif, btnSupprimer);

    //slide 44: boucle for..of
    for (let p of persons) {
        doInsert(p.nom, p.prenom, p.points);
    }

}

function doInsert(nom, prenom, points) {

    //slide 41: opérateurs (incrément)
    lignes++;
    //slide 41: opérateurs combinés
    total_points += points;
    doInsertRowTable(lignes, nom, prenom, points);
    update_summary();
}

function ConsoleTableau() {
    //slide 33: console.log
    //slide 38: map / slide 46: fonction fléchée
    console.log(persons.map(p => ({
        nom: p.nom,
        prenom: p.prenom,
        points: p.points

    })));
}

function update_summary() {
    //slide 61: getElementById
    const element_lignes = document.getElementById("p1");
    const element_points = document.getElementById("p3");

    //slide 90: innerText
    //slide 141: template string (backticks)
    element_lignes.innerText = `${lignes} ligne(s)`;
    element_points.innerText = `Total Point(s) = ${total_points}`;
}

//slide 46: valeur par défaut d'un paramètre
function estDoublon(nom, prenom, indexIgnore = -1) {
    //slide 46: return
    //hors cours: some()
    //slide 46: fonction fléchée
    return persons.some((p, i) =>
        //slide 41: opérateurs logiques
        //slide 141: === (comparaison stricte)
        //hors cours: trim() et toLowerCase()
        i !== indexIgnore &&
        p.nom.trim().toLowerCase() === nom.trim().toLowerCase() &&
        p.prenom.trim().toLowerCase() === prenom.trim().toLowerCase()
    );
}

function modifierLigne() {
    //slide 42: if
    if (lignes === 0) {
        //slide 34: alert()
        alert("Le Tableau est vide .");
        return;
    }

    //slide 76: querySelectorAll (retourne une collection)
    //hors cours: Array.from
    const rows = Array.from(document.querySelectorAll(".row"));
    const indexes = [];
    //slide 44: forEach / slide 46: fonction fléchée
    rows.forEach((row, i) => {
        //slide 76: querySelector
        //hors cours: propriété checked
        //slide 38: push
        if (row.querySelector("input[type='checkbox']").checked) indexes.push(i);
    });

    //slide 42: if
    if (indexes.length === 0) {
        //slide 34: alert()
        alert("Sélectionnez une ligne à modifier.");
        return;
    }
    if (indexes.length > 1) {
        alert("Sélectionnez une seule ligne à modifier.");
        return;
    }

    //slide 76: querySelector
    const bouton = document.querySelector("#form_container button");
    //slide 90: innerText
    if (indexModif === -1) texteBoutonAjout = bouton.innerText;

    indexModif = indexes[0];
    const p = persons[indexModif];
    //slide 61: getElementById
    //hors cours: propriété value
    document.getElementById("form_nom").value = p.nom;
    document.getElementById("form_prenom").value = p.prenom;
    document.getElementById("form_points").value = p.points;
    //slide 90: innerText
    bouton.innerText = "Enregistrer";
}

function annulerModification() {
    if (indexModif === -1) return;
    indexModif = -1;
    //slide 61: getElementById
    //hors cours: propriété value
    document.getElementById("form_nom").value = "";
    document.getElementById("form_prenom").value = "";
    document.getElementById("form_points").value = "";
    //slide 76: querySelector / slide 90: innerText
    document.querySelector("#form_container button").innerText = texteBoutonAjout;
}

function doNewData() {
    //slide 61: getElementById
    const elt_nom = document.getElementById("form_nom");
    const elt_prenom = document.getElementById("form_prenom");
    const elt_points = document.getElementById("form_points");

    //hors cours: propriété value
    const nom = elt_nom.value;
    const prenom = elt_prenom.value;
    //hors cours: parseInt
    const points = parseInt(elt_points.value);

    //slide 42: if...else
    //hors cours: Number.isNaN
    if (nom === "" || prenom === "" || Number.isNaN(points)) {
        //slide 34: alert()
        alert("Formulaire incomplet !");
    } else if (estDoublon(nom, prenom, indexModif)) {
        alert("Cette personne existe déjà !");
    } else if (indexModif !== -1) {
        const p = persons[indexModif];
        //slide 76: querySelectorAll
        const row = document.querySelectorAll(".row")[indexModif];

        //slide 41: opérateurs combinés
        total_points += points - p.points;
        p.nom = nom;
        p.prenom = prenom;
        p.points = points;

        //hors cours: cells
        //slide 90: innerText
        row.cells[1].innerText = nom;
        row.cells[2].innerText = prenom;
        row.cells[3].innerText = points;

        update_summary();
        annulerModification();
        //slide 76: querySelectorAll / slide 44: forEach / slide 46: fonction fléchée
        document.querySelectorAll("input[type='checkbox']").forEach(cb => cb.checked = false);
    } else {
        doInsert(nom, prenom, points);
        //slide 38: push
        persons.push(new Person(lignes, nom, prenom, points));
        elt_nom.value = "";
        elt_prenom.value = "";
        elt_points.value = "";
    }
}

function deleteRow() {
    //slide 42: if
    if (lignes === 0) {
        //slide 34: alert()
        alert("Le Tableau est vide .");
        return;
    }

    //slide 76: querySelectorAll
    const checkboxes = document.querySelectorAll("#table_container table input[type='checkbox']:checked");

    if (checkboxes.length === 0) {
        alert("Sélectionnez au moins une lignes.");
        return;
    }

    //hors cours: confirm()
    if (!confirm("Désirez vous supprimer les lignes sélectionnées?")) {
        return;
    }

    annulerModification();

    //slide 76: querySelectorAll
    const rows = document.querySelectorAll(".row");
    const aSupprimer = [];
    //slide 44: forEach / slide 46: fonction fléchée
    rows.forEach((row, index) => {
        //slide 76: querySelector
        if (row.querySelector("input[type='checkbox']").checked) {
            //hors cours: parseInt et cells
            //slide 90: innerText / slide 41: opérateurs combinés
            total_points -= parseInt(row.cells[3].innerText);
            //slide 41: décrément
            lignes--;
            //slide 38: push
            aSupprimer.push(index);
            //slide 99: remove()
            row.remove();
        }
    });
    //slide 38: filter / slide 38: includes / slide 46: fonction fléchée
    persons = persons.filter((p, i) => !aSupprimer.includes(i));
    update_summary();
}

function trierParPoints() {
    if (persons.length === 0) {
        alert("Le tableau est vide.");
        return;
    }
    annulerModification();
    //hors cours: sort()
    //slide 46: fonction fléchée
    persons.sort((a, b) => b.points - a.points);
    //slide 76: querySelector
    const table = document.querySelector("#table_container table");
    //slide 76: querySelectorAll
    const rows = table.querySelectorAll(".row");
    //slide 44: forEach / slide 99: remove()
    rows.forEach(row => row.remove());

    lignes = 0;
    total_points = 0;

    //slide 44: boucle for..of
    for (let p of persons) {
        doInsert(p.nom, p.prenom, p.points);
    }
    update_summary();
    //slide 76: querySelectorAll
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    //slide 44: forEach
    checkboxes.forEach(cb => cb.checked = false);
}
