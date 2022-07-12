// https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement/insertRow
// https://snippet-generator.app/

const date = document.getElementById("form-date")
const shipDate = document.getElementById("ship-date")
const sigDate = document.getElementById("sig-date")
const sigFile = document.getElementById("sig-file")
const gridWrapper = document.getElementById("grid-wrapper")
const formQty = document.querySelectorAll(".form-qty")
const formDesc = document.querySelectorAll(".form-desc")
let formWt = document.querySelectorAll(".form-weight")
const totalWt = document.getElementById("totalweight")
const formVal = document.querySelectorAll(".form-value")
const btnPlus = document.getElementById("buttonPlus")
const btnMinus = document.getElementById("buttonMinus")
const invisForm = document.querySelectorAll(".invis-form")

let rowCount = 1


// formWt[0].addEventListener("change", function(e) {
// 	e.preventDefault();
// 		console.dir(formWt[0].value);
// })






date.addEventListener("change", function (e) {
	e.preventDefault();
	// update dates
	shipDate.innerText = date.value
	sigDate.innerText = date.value
});

sigFile.addEventListener("change", function (e){
	e.preventDefault();
	const sigImg = document.querySelector('#sig-img')
	URL.revokeObjectURL(e.target.files[0].name)
	sigImg.src = URL.createObjectURL(e.target.files[0]); // Assign source to image
	console.dir(sigImg.src)
});


btnPlus.addEventListener("click", function (e) {
	e.preventDefault();

	rowCount++
	
	const newQty = document.createElement("input")
	newQty.type = "text"
	newQty.id = `form-qty-${rowCount}`
	newQty.classList.add("invis-form")
	newQty.classList.add("form-qty")
	newQty.name = `form-qty-${rowCount}`
	newQty.placeholder = "Qty."
	// console.dir(gridWrapper)
	gridWrapper.appendChild(newQty);

	const newDesc = document.createElement("input")
	newDesc.type = "text"
	newDesc.id = `form-desc-${rowCount}`
	newDesc.classList.add("invis-form")
	newDesc.classList.add("form-desc")
	newDesc.name = `form-desc-${rowCount}`
	newDesc.placeholder = "Description"
	gridWrapper.appendChild(newDesc); // 1=desc col index

	const newWt = document.createElement("input")
	newWt.type = "text"
	newWt.id = `form-weight-${rowCount}`
	newWt.classList.add("invis-form")
	newWt.classList.add("form-weight")
	newWt.name = `form-weight-${rowCount}`
	newWt.placeholder = "Wt."
	gridWrapper.appendChild(newWt);

	const newVal = document.createElement("input")
	newVal.type = "text"
	newVal.id = `form-value-${rowCount}`
	newVal.classList.add("invis-form")
	newVal.classList.add("form-value")
	newVal.name = `form-value-${rowCount}`
	newVal.placeholder = "Value $"
	gridWrapper.appendChild(newVal)

	formWt = document.querySelectorAll(".form-weight")
	formWt[rowCount-1].addEventListener("change", {

	})
	for (const i of formWt) {
		i.addEventListener("change", function () {
			console.dir(i.value);
		})
	}

})

btnMinus.addEventListener("click", function (e){
	e.preventDefault();

	const matchTest = gridWrapper.lastElementChild.id
	if (new RegExp('form-value-1').test(matchTest) === false) {
		console.log("No match. Deleting row...");
		for (let i = 0; i < 4; i++) {
			gridWrapper.lastElementChild.remove();
		}
		rowCount--
	} else {
		console.log(`Found first row. Not deleting.`);
	}
});




function listenAdder(element, listener, fnAction, fnArg) {
	for (i of element) {
		i.addEventListener(listener, fnAction(fnArg))
	}
	return 
}







































// function addWeights() {
//     // iterate over an array. Get all the weights (index[3] of each item.)
//     let weights = [];
//     for (let line of units) {
//         weights.push(line[3]); // push weight column into its own array
//     }
//     // total the weights up
//     return (totalWeight = weights.reduce((total, i) => total + i));
// }

// // add total value:
// function addValues() {
//     let value = [];
//     for (let line of units) {
//         value.push(line[4]); // push the values onto their own array
//     }
//     return (grandValue = value.reduce((total, i) => total + i));
// }

// addWeights();

// // assign total weight;
// let shipTotalWeight = document.getElementById("totalweight");
// shipTotalWeight.innerText = totalWeight + " lbs.";

// addValues();

// // assign total value;
// let shipTotalValue = document.getElementById("totalValue");
// shipTotalValue.innerText = "$" + grandValue;

// let formPkgCount = document.getElementById("form-pkg-count");
// let orderTable = document.getElementById("orderTable");
// let formOrder = document.getElementById("form-order");
// let formDate = document.getElementById("form-date");
// let shippingTable = document.getElementById("shippingTable");
// let sigDate = document.getElementById("date");

// let toFromTable = document.getElementById("toFromTable");
// let formCstName = document.getElementById("form-cst-name");
// let formCstAddress = document.getElementById("form-cst-address");
// let shiptotable = document.getElementById("shiptotable");

// // Submit Button Magic
// const formSubmit = document.getElementById("form-submit");
// formSubmit.addEventListener("submit", function (e)) {
//     e.preventDefault(); // Don't refresh the page.

//     orderTable.rows[0].cells[1].innerText = formOrder.value;

//     // Assign dates
//     orderTable.rows[1].cells[1].innerText = formDate.value;
//     shippingTable.rows[1].cells[0].innerText = formDate.value;
//     sigDate.innerText = formDate.value;

//     // Customer name
//     toFromTable.rows[1].cells[1].innerText = formCstName.value;

//     // Customer address
//     toFromTable.rows[2].cells[1].innerText = formCstAddress.value;

//     // Package count
//     shiptotable.rows[3].cells[1].innerText = formPkgCount.valueAsNumber;

//     // Item Details
