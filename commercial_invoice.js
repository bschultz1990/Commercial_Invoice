// https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement/insertRow
// https://snippet-generator.app/

let date = document.getElementById("form-date");
let shipDate = document.querySelectorAll(".ship-date");
let sigDate = document.getElementById("sig-date");
let sigFile = document.getElementById("sig-file");
let gridWrapper = document.getElementById("grid-wrapper");
let shipWrapper = document.getElementById("shipWrapper");
let formQty = document.getElementById("form-qty-1");
let formWeight = document.getElementById("form-weight-1");
let totalWt = document.getElementById("totalweight");
let formValue = document.getElementById("form-value-1");
let btnPlus = document.getElementById("buttonPlus");
let btnPlusShipment = document.getElementById("btnPlusShipment");
let btnMinusShipment = document.getElementById("btnMinusShipment");
let btnMinus = document.getElementById("buttonMinus");
let invisForm = document.querySelectorAll(".invis-form");

let rowCount = 1;
let shipCount = 0;

addPackage(shipWrapper);

btnMinusShipment.addEventListener("click", function (e){
    e.preventDefault();
})

btnPlusShipment.addEventListener("click", function (e){
    e.preventDefault();
    addPackage(shipWrapper);
})

function addPackage (target){
	const newShipDate = document.createElement("div");
  shipCount++;
  newShipDate.classList.add("ship-date")
  target.appendChild(newShipDate);
  
  const newShipMethod = document.createElement("input");
  newShipMethod.type = "text";
  newShipMethod.classList.add("invis-form");
  newShipMethod.classList.add("centertext");
  newShipMethod.name = "form-shipmethod";
  newShipMethod.id = `form-shipmethod-${shipCount}`;
  newShipMethod.name = "form-shipmethod";
  newShipMethod.placeholder = "Shipment Method";
  target.appendChild(newShipMethod);
  
  const newShipTracker = document.createElement("input");
  newShipTracker.type = "text";
  newShipTracker.classList.add("invis-form");
  newShipTracker.classList.add("centertext");
  newShipTracker.name = `form-tracking-${shipCount}`;
  newShipTracker.id = `form-tracking${shipCount}`;
  newShipTracker.placeholder = "Tracking #";
  target.appendChild(newShipTracker);
  
}

function addRow(target) {
    const newQty = document.createElement("input");
    newQty.type = "text";
    newQty.id = `form-qty-${rowCount}`;
    newQty.classList.add("invis-form");
    newQty.classList.add("form-qty");
    newQty.classList.add("col-qty");
    newQty.name = `form-qty-${rowCount}`;
    newQty.placeholder = "Qty.";
    newQty.addEventListener("change", totalWeight);
    // TODO: newQty.addEventListener("change", totalValue);
    target.appendChild(newQty);

    const newDesc = document.createElement("input");
    newDesc.type = "text";
    newDesc.id = `form-desc-${rowCount}`;
    newDesc.classList.add("invis-form");
    newDesc.classList.add("form-desc");
    newDesc.name = `form-desc-${rowCount}`;
    newDesc.placeholder = "Description";
    target.appendChild(newDesc);

    const newWt = document.createElement("input");
    newWt.type = "text";
    newWt.id = `form-weight-${rowCount}`;
    newWt.classList.add("invis-form");
    newWt.classList.add("form-weight");
    newWt.classList.add("col-wt");
    newWt.name = `form-weight-${rowCount}`;
    newWt.placeholder = "Wt.";
    newWt.addEventListener("change", totalWeight);
    target.appendChild(newWt);

    const newVal = document.createElement("input");
    newVal.type = "text";
    newVal.id = `form-value-${rowCount}`;
    newVal.classList.add("invis-form");
    newVal.classList.add("form-value");
    newVal.classList.add("col-val");
    newVal.name = `form-value-${rowCount}`;
    newVal.placeholder = "Value $";
    // TODO: newVal.addEventListener("change", totalValue);
    target.appendChild(newVal);
}

function addShipment() {
    
}

formQty.addEventListener("change", totalWeight); // add event listener to first qty
formWeight.addEventListener("change", totalWeight); // add event listener to first weight
// TODO: newQty.addEventListener("change", totalValue);

date.addEventListener("change", function (e) {
    e.preventDefault();
    // update dates
    shipDate.innerText = date.value;
    sigDate.innerText = date.value;
});

sigFile.addEventListener("change", function (e) {
    e.preventDefault();
    const sigImg = document.querySelector("#sig-img");
    URL.revokeObjectURL(e.target.files[0].name);
    sigImg.src = URL.createObjectURL(e.target.files[0]); // Assign source to image
    console.dir(sigImg.src);
});

btnPlus.addEventListener("click", function (e) {
    e.preventDefault();
    rowCount++;
    addRow(gridWrapper);
});

btnMinus.addEventListener("click", function (e) {
    //{{{
    e.preventDefault();

    const matchTest = gridWrapper.lastElementChild.id;
    if (new RegExp("form-value-1").test(matchTest) === false) {
        console.log("No match. Deleting row...");
        for (let i = 0; i < 4; i++) {
            gridWrapper.lastElementChild.remove();
        }
        rowCount--;
    } else {
        console.log(`Found first row. Not deleting.`);
    }
}); //}}}

function colProduct(idPrefix1, idPrefix2) {
    let rowTotals = []; // empty array

    for (let i = 1; i <= rowCount; i++) {
        rowTotals.push(multCells(i, idPrefix1, idPrefix2));
    }
    let subTotal = 0;
    return rowTotals.reduce((x, y) => x + y, subTotal);
}

function totalWeight() {
    totalWt.innerText = colProduct("form-qty", "form-weight");
}

function multCells(rowNum, idPrefix1, idPrefix2) {
    // Append rowCount to our getElementById to get a selector
    let prodArray = [];

    let selector1 = document.getElementById(idPrefix1.concat("-", rowNum));
    prodArray.push(parseFloat(selector1.value));

    let selector2 = document.getElementById(idPrefix2.concat("-", rowNum));
    prodArray.push(parseFloat(selector2.value));

    let subTotal = 1;
    return prodArray.reduce((x, y) => x * y, subTotal);
}

// function listenAdder(element, listener, fn, fnArg) {
//     for (i of element) {
//         i.addEventListener(listener, fn(fnArg));
//     }
//     return;
// }
