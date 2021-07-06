"use strict";
/*
var testObject = {
    dejimonID: 2,
    name: 'test',
    height: 123,
    weight: 321,
    type: 'Yorkshire',
    ability: 'water',
    abilityPower: 32
}

var array: Object[] = [];
array.push(testObject);

localStorage.setItem('dejiArray', JSON.stringify(array)); */
//Get all Dejimon from LocalStorage on page loadup.
var dejiServices = new DejimonServices();
if (localStorage.getItem("uniqueID") == null) {
    localStorage.setItem("uniqueID", "0");
}
else {
    DejimonServices.dejimonID = parseInt(localStorage.getItem("uniqueID") || "0");
}
function getExistingDejimon() {
    if (localStorage.getItem('dejiArray') == null) {
        return;
    }
    else {
        dejiServices.dejimonArray = JSON.parse(localStorage.getItem('dejiArray') || '{}');
        //Restore the dejimonID so that new Dejimons added after refresh continue to have unique IDs.
        if (dejiServices.dejimonArray.length == 0) {
            DejimonServices.dejimonID = 0;
        }
        else {
            DejimonServices.dejimonID = dejiServices.dejimonArray[dejiServices.dejimonArray.length - 1].dejimonID + 1;
        }
        displayDejiIndex();
    }
}
//Add rows from LocalStorage data.
function displayDejiIndex() {
    var table = document.getElementById("index-table");
    dejiServices.dejimonArray.forEach(function (deji) {
        var rowCount = table.rows.length;
        var newRow = table.insertRow(rowCount);
        newRow.classList.add("main-table-row");
        newRow.classList.add("hover-row");
        var cell_1 = newRow.insertCell(0);
        var element_1 = document.createElement("td");
        element_1.innerHTML = deji.name;
        element_1.classList.add("main-table-body-cell");
        cell_1.appendChild(element_1);
        var cell_2 = newRow.insertCell(1);
        var element_2 = document.createElement("td");
        element_2.classList.add("main-table-body-cell");
        element_2.innerHTML = deji.type.toString();
        cell_2.appendChild(element_2);
        //Append Button for More Info - TODO
        var cell_3 = newRow.insertCell(2);
        var element_3 = document.createElement("td");
        element_3.classList.add("main-table-body-cell");
        //element_3.innerHTML = 'More Info';
        var element_3_button = document.createElement("button");
        element_3_button.style.width = '100%';
        element_3_button.style.height = '100%';
        element_3_button.style.borderRadius = '0.15rem';
        element_3_button.innerHTML = 'More Info';
        element_3_button.addEventListener("click", function () {
            var id = document.getElementById("info-id");
            id.innerHTML = "ID: " + deji.dejimonID;
            var name = document.getElementById("info-name");
            name.innerHTML = "Name: " + deji.name;
            var height = document.getElementById("info-height");
            height.innerHTML = "Height: " + deji.height;
            var weight = document.getElementById("info-weight");
            weight.innerHTML = "Weight: " + deji.weight;
            var type = document.getElementById("info-type");
            type.innerHTML = "Type: " + deji.type;
            var ability = document.getElementById("info-ability");
            ability.innerHTML = "Abililty: " + deji.ability;
            var abilityPower = document.getElementById("info-abilityPower");
            abilityPower.innerHTML = "Power: " + deji.abilityPower;
            var strength = document.getElementById("info-overallStrength");
            var num = +deji.abilityPower + +deji.height + +deji.weight;
            num = +(num / 3).toFixed(2);
            strength.innerHTML = "Strength: " + num;
        });
        element_3.appendChild(element_3_button);
        cell_3.appendChild(element_3);
        //Append Button for Deleting Deji - TODO
        var cell_4 = newRow.insertCell(3);
        var element_4 = document.createElement("td");
        element_4.classList.add("main-table-body-cell");
        var element_4_button = document.createElement("button");
        element_4_button.style.width = '100%';
        element_4_button.style.height = '100%';
        element_4_button.style.borderRadius = '0.15rem';
        element_4_button.innerHTML = 'Delete';
        element_4_button.addEventListener("click", function () {
            //Remove from array, update localStorage.
            var confirm = window.confirm("Do you want to delete this Dejimon?");
            if (confirm == true) {
                var index = dejiServices.dejimonArray.indexOf(deji);
                if (index > -1) {
                    dejiServices.dejimonArray.splice(index, 1);
                }
                storeDejimon(dejiServices.dejimonArray);
                //Remove row
                //Calculate the row here in teh click
                var indexRow = newRow.rowIndex;
                table.deleteRow(indexRow);
            }
            else {
                //Do nothing.
            }
        });
        element_4.appendChild(element_4_button);
        cell_4.appendChild(element_4);
    });
}
//Change Ability Power based on what Type is dynamically.
function validAbilityCheck() {
    var dejiType = document.getElementById("dejiType");
    dejiType === null || dejiType === void 0 ? void 0 : dejiType.addEventListener('click', function () {
        var element1 = document.getElementById("water");
        var element2 = document.getElementById("ice");
        var element3 = document.getElementById("fire");
        var element4 = document.getElementById("charm");
        var element5 = document.getElementById("electric");
        switch (this.value) {
            case "Yorkshire": {
                element1.selected = true;
                element1.disabled = false;
                element2.disabled = false;
                element3.disabled = true;
                element4.disabled = true;
                element5.disabled = true;
                break;
            }
            case "Lean": {
                element3.selected = true;
                element1.disabled = true;
                element2.disabled = true;
                element3.disabled = false;
                element4.disabled = false;
                element5.disabled = true;
                break;
            }
            case "Potbelly": {
                element5.selected = true;
                element1.disabled = true;
                element2.disabled = true;
                element3.disabled = true;
                element4.disabled = true;
                element5.disabled = false;
                break;
            }
        }
    });
}
//Get the form data and return it in an array or something so that adding row function/storing dejimon functions can use it.
function getFormData() {
    var dejiIndex = document.querySelectorAll(".form-input");
    var formValues = [];
    dejiIndex.forEach(function (input) {
        formValues.push(input.value);
    });
    for (var i = 0; i < formValues.length; i++) {
        if (formValues[i] == "") {
            alert("You need to fill out all the fields of the form!");
            resetForm();
            return;
        }
    }
    if (formValues[formValues.length - 1] > 100 || formValues[formValues.length - 1] < 0) {
        alert("Ability Power must be within [0, 100]!");
        return;
    }
    return formValues;
}
function resetForm() {
    var dejiName = document.getElementById("dejiName");
    dejiName.value = '';
    var dejiHeight = document.getElementById("dejiHeight");
    dejiHeight.value = '';
    var dejiWeight = document.getElementById("dejiWeight");
    dejiWeight.value = '';
    var dejiAbilityPower = document.getElementById("dejiAbilityPower");
    dejiAbilityPower.value = '';
}
//Get all values when submit button is pressed.
function formSubmit() {
    var submitButton = document.getElementById("deji-form-submit");
    var formData = [];
    if (submitButton) {
        submitButton.addEventListener("click", function () {
            formData = getFormData();
            console.log(formData);
            //Not sure whats happening but this stops the console.log from flashing the output for only 1 second.
            event === null || event === void 0 ? void 0 : event.preventDefault();
            var newDeji = {
                dejimonID: 0,
                name: formData[0],
                height: formData[2],
                weight: formData[3],
                type: formData[1],
                ability: formData[4],
                abilityPower: formData[5]
            };
            dejiServices.add(newDeji);
            listNewDeji(newDeji);
            storeDejimon(dejiServices.dejimonArray);
            resetForm();
        });
    }
}
//Add Dejimon to the DejiIndex
function listNewDeji(deji) {
    var table = document.getElementById("index-table");
    var rowCount = table.rows.length;
    var newRow = table.insertRow(rowCount);
    newRow.classList.add("main-table-row");
    newRow.classList.add("hover-row");
    newRow.id = deji.dejimonID + "";
    var cell_1 = newRow.insertCell(0);
    var element_1 = document.createElement("td");
    element_1.innerHTML = deji.name;
    element_1.classList.add("main-table-body-cell");
    cell_1.appendChild(element_1);
    var cell_2 = newRow.insertCell(1);
    var element_2 = document.createElement("td");
    element_2.classList.add("main-table-body-cell");
    element_2.innerHTML = deji.type.toString();
    cell_2.appendChild(element_2);
    //Append Button for More Info - TODO
    var cell_3 = newRow.insertCell(2);
    var element_3 = document.createElement("td");
    element_3.classList.add("main-table-body-cell");
    var element_3_button = document.createElement("button");
    element_3_button.style.width = '100%';
    element_3_button.style.height = '100%';
    element_3_button.style.borderRadius = '0.15rem';
    element_3_button.innerHTML = 'More Info';
    element_3_button.addEventListener("click", function () {
        var id = document.getElementById("info-id");
        id.innerHTML = "ID: " + deji.dejimonID;
        var name = document.getElementById("info-name");
        name.innerHTML = "Name: " + deji.name;
        var height = document.getElementById("info-height");
        height.innerHTML = "Height: " + deji.height;
        var weight = document.getElementById("info-weight");
        weight.innerHTML = "Weight: " + deji.weight;
        var type = document.getElementById("info-type");
        type.innerHTML = "Type: " + deji.type;
        var ability = document.getElementById("info-ability");
        ability.innerHTML = "Abililty: " + deji.ability;
        var abilityPower = document.getElementById("info-abilityPower");
        abilityPower.innerHTML = "Power: " + deji.abilityPower;
        var strength = document.getElementById("info-overallStrength");
        var num = +deji.abilityPower + +deji.height + +deji.weight;
        num = +(num / 3).toFixed(2);
        strength.innerHTML = "Strength: " + num;
    });
    element_3.appendChild(element_3_button);
    cell_3.appendChild(element_3);
    //Append Button for Deleting Deji - TODO
    var cell_4 = newRow.insertCell(3);
    var element_4 = document.createElement("td");
    element_4.classList.add("main-table-body-cell");
    var element_4_button = document.createElement("button");
    element_4_button.style.width = '100%';
    element_4_button.style.height = '100%';
    element_4_button.style.borderRadius = '0.15rem';
    element_4_button.innerHTML = 'Delete';
    element_4_button.addEventListener("click", function () {
        //Remove from array, update localStorage.
        var confirm = window.confirm("Do you want to delete this Dejimon?");
        if (confirm == true) {
            var index = dejiServices.dejimonArray.indexOf(deji);
            if (index > -1) {
                dejiServices.dejimonArray.splice(index, 1);
            }
            localStorage.setItem("dejiArray", JSON.stringify(dejiServices.dejimonArray));
            //Remove row
            var indexRow = newRow.rowIndex;
            table.deleteRow(indexRow);
        }
        else {
            //Do nothing.
        }
    });
    element_4.appendChild(element_4_button);
    cell_4.appendChild(element_4);
}
//Add to LocalStorage array.
function storeDejimon(dejiArray) {
    localStorage.setItem('dejiArray', JSON.stringify(dejiArray));
}
getExistingDejimon();
validAbilityCheck();
formSubmit();
