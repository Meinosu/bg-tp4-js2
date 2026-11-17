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

