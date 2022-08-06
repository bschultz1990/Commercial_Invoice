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
let formValue = document.getElementById("form-value-1");
let totalWt = document.getElementById("totalweight");
let btnPlus = document.getElementById("buttonPlus");
let btnPlusShipment = document.getElementById("btnPlusShipment");
let btnMinusShipment = document.getElementById("btnMinusShipment");
let btnMinus = document.getElementById("buttonMinus");
let invisForm = document.querySelectorAll(".invis-form");
let pkgCount = document.getElementById("pkgcount");
let grandTotal = document.getElementById("totalValue");
let submitButton = document.getElementById("form-submit");

let rowCount = 1;
let shipCount = 0;

let goods = {
    quantities: [],
    weights: [],
    values: [],
    // totalWeight() {
    //     for (let i = 0; i < goods.quantities.length; i++) {
    // },
    totalValue() {
        let subTotal = 0;
        return parseFloat(goods.values.reduce((x, y) => x + y, subTotal).toFixed(2));
    },
    qtyPusher() {
        // Check col-qty, col-wt, col-val.
        // If they're numbers, clear the above arrays and re-push to them.
        let totalQtys = document.querySelectorAll(".col-qty");
        // console.log(`QuerySelectorAll returned:`);
        // console.dir(totalQtys)
        goods.quantities = []; // clear the array first
        for (let i of totalQtys) {
            if (typeof i.valueAsNumber == "number") {
                goods.quantities.push(i.value);
                // console.log(`i.value = ${i.value}`)
            } else {
                alert("Please fill in all qty boxes with a number.");
            }
        }
        console.log("goods.quantities: ", goods.quantities);
    },
    wtPusher() {
        let totalWeights = document.querySelectorAll(".col-wt");
        goods.weights = [];
        for (let i of totalWeights) {
            if (typeof i.valueAsNumber == "number") {
                goods.weights.push(i.value);
            } else {
                alert("Please fill in all weight boxes with a number.");
            }
        }
        console.log("goods.weights: ", goods.weights);
    },
    valPusher() {
        let totalVals = document.querySelectorAll(".col-val");
        goods.values = [];
        for (let i of totalVals) {
            if (typeof i.valueAsNumber == "number") {
                goods.values.push(i.value);
            } else {
                alert("Please fill in all value boxes with a number.");
            }
        }
        console.log(`Goods.values: `, goods.values);
    },
};

addPackage(shipWrapper);
redOutline();

formQty.addEventListener("change", goods.qtyPusher); // add event listener to first qty
formWeight.addEventListener("change", goods.wtPusher); // add event listener to first weight
formValue.addEventListener("change", goods.valPusher); // add event listenre to first value
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
    e.preventDefault();

    const matchTest = gridWrapper.lastElementChild.id;
    if (new RegExp("form-value-1").test(matchTest) === false) {
        console.log("No match. Deleting row...");
        for (let i = 0; i < 4; i++) {
            gridWrapper.lastElementChild.remove();
        }
        rowCount--;
        goods.quantities = []; // Clear .quantities.
        goods.qtyPusher(); // rediscover remaining quantities.
        goods.wtPusher(); // rediscover remaining weights.
        goods.valPusher(); // Rediscover remaining values.
    } else {
        console.log(`Found first row. Not deleting.`);
    }
});

btnPlusShipment.addEventListener("click", function (e) {
    e.preventDefault();
    addPackage(shipWrapper);
});
btnMinusShipment.addEventListener("click", function (e) {
    e.preventDefault();
    subtractPackage(shipWrapper);
});

function addPackage(target) {
    const newShipDate = document.createElement("div");
    newShipDate.classList.add("ship-date");
    newShipDate.classList.add("centertext");
    shipDate = document.querySelectorAll(".ship-date");
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

    shipCount++;
    pkgCount.innerText = shipCount;

    updateDates();
    redOutline();
}

function subtractPackage(target) {
    if (shipCount > 1) {
        for (let i = 1; i <= 3; i++) {
            target.lastElementChild.remove();
        }
        shipCount--;
        pkgCount.innerText = shipCount;
    } else {
        console.log(`Found first row. Not deleting. ShipCount = ${shipCount}`);
    }
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
    newQty.addEventListener("change", goods.qtyPusher);
    newQty.addEventListener("change", goods.valPusher);
    newQty.addEventListener("change", goods.wtPusher);
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
    newWt.classList.add("centertext");
    newWt.name = `form-weight-${rowCount}`;
    newWt.placeholder = "Wt.";
    newWt.addEventListener("change", goods.wtPusher);
    newWt.addEventListener("change", goods.qtyPusher);
    target.appendChild(newWt);

    const newVal = document.createElement("input");
    newVal.type = "text";
    newVal.id = `form-value-${rowCount}`;
    newVal.classList.add("invis-form");
    newVal.classList.add("form-value");
    newVal.classList.add("col-val");
    newVal.name = `form-value-${rowCount}`;
    newVal.placeholder = "Value $";
    newVal.addEventListener("change", goods.valPusher);
    newVal.addEventListener("change", goods.qtyPusher);
    target.appendChild(newVal);

    redOutline();
}

function redOutline() {
    invisForm = document.querySelectorAll(".invis-form");
    for (let i of invisForm) {
        i.addEventListener("change", function () {
            if (i.value !== "") {
                i.classList.add("nooutline");
            } else {
                i.classList.remove("nooutline");
            }
        });
    }
}

function updateDates() {
    sigDate.innerText = date.value;
    shipDate = document.querySelectorAll(".ship-date");
    for (let i of shipDate) {
        i.innerText = date.value;
    }
}

// function totalWeight() {
//     totalWt.innerText = colProduct("form-qty", "form-weight");
// }

// function totalValue() {
//     grandTotal.innerText = colProduct("form-qty", "form-value");
// }

// function colProduct(idPrefix1, idPrefix2) {
//     let rowTotals = []; // empty array

//     for (let i = 1; i <= rowCount; i++) {
//         rowTotals.push(multCells(i, idPrefix1, idPrefix2));
//     }
//     let subTotal = 0;
//     return parseFloat(rowTotals.reduce((x, y) => x + y, subTotal)).toFixed(2);
// }

// function multCells(rowNum, idPrefix1, idPrefix2) {
//     // Append rowCount to our getElementById to get a selector
//     let prodArray = [];

//     let selector1 = document.getElementById(idPrefix1.concat("-", rowNum));
//     prodArray.push(parseFloat(selector1.value));

//     let selector2 = document.getElementById(idPrefix2.concat("-", rowNum));
//     prodArray.push(parseFloat(selector2.value));

//     let subTotal = 1;
//     return parseFloat(prodArray.reduce((x, y) => x * y, subTotal)).toFixed(2);
// }
