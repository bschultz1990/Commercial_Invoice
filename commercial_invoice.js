// https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement/insertRow
// https://snippet-generator.app/

const date = document.getElementById("form-date")
const shipDate = document.getElementById("ship-date")
const sigDate = document.getElementById("sig-date")
const sigFile = document.getElementById("sig-file")
const formQty = document.querySelectorAll(".form-qty")
const formWt = document.querySelectorAll(".form-weight")
const formVal = document.querySelectorAll(".form-value")

const invisForm = document.querySelectorAll(".invis-form")
// console.dir(invisForm){{{
// 0: Order Num
// 1: Date
// 2: Cst. Name
// 3: Cst. Address
// 4: Pkg. Count
// 5: Item Qty 1
// 6: Item Desc. 1
// 7: Item Wt. 1
// 8: Item Value 1
// 9: Shipment Method 1
// 10: Shipment Tracking 1
// 11: Sig File}}}

invisForm[1].addEventListener("change", function (e) {
	// update dates
	shipDate.innerText = date.value
	sigDate.innerText = date.value
});


invisForm[11].addEventListener("change", function (e){
	const sigImg = document.querySelector('#sig-img')
	URL.revokeObjectURL(e.target.files[0].name)
	sigImg.src = URL.createObjectURL(e.target.files[0]); // Assign source to image
	console.dir(sigImg.src)
});





	function eventAdder(multiSelector) {
	for (let i of multiSelector) {
		console.dir(i);
		i.addEventListener("change", function addValues (i){
			console.dir(parseInt(i.value));
		})
		}
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
// formSubmit.addEventListener("submit", function (e) {
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
// });
