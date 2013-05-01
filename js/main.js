// Travis Pochintesta
// VFW 1304
// Week 3
// main.js

/* Wait for DOM */
window.addEventListener("DOMContentLoaded", function() {

/* Create Variables */

	var genderType = "Unknown";
	var radios = [$("male"), $("female")]
	
	var titleList = ["--Choose A Title--", "Mr.", "Ms.", "Mrs.", "Dr.", "Sir"];
	
	var friendCheck = "no";
	var familyCheck = "no";
	var schoolCheck = "no";
	var workCheck 	= "no";
	var acquaintanceCheck = "no";
	
	var storeContact = $("submit");
	var displayContact = $("displayContact");
	var clearContacts = $("clearContacts");
	
	var errorMsg = $("errors");

/* Declare Functions */

	// Get Element from HTML
	function $(x){
		var selectElement = document.getElementById(x);
		return selectElement;
	}
	
	// Get Radio Value
	function whichRadio(){
		var radioButtons = document.forms[0].gender;
		for(i=0; i<radios.length; i++){
			if(radios[i].checked){
				genderType = radios[i].value;
			}
		}
	}
	
	// Get Checkbox Value
	function isFriend(){
		if($("catFriend").checked){
			friendCheck = $("catFriend").value;
		}else{
			friendCheck = "N/A"
		}
	}
	function isFamily(){
		if($("catFamily").checked){
			familyCheck = $("catFamily").value;
		}else{
			familyCheck = "N/A"
		}
	}
	function isSchool(){
		if($("catSchool").checked){
			schoolCheck = $("catSchool").value;
		}else{
			schoolCheck = "N/A"
		}
	}
	function isWork(){
		if($("catWork").checked){
			workCheck = $("catWork").value;
		}else{
			workCheck = "N/A"
		}
	}
	function isAcquaintance(){
		if($("catAcquaintance").checked){
			acquaintanceCheck = $("catAcquaintance").value;
		}else{
			acquaintanceCheck = "N/A"
		}
	}
	
	// Toggle Contact Input/Storage Display	
	function toggleDisplay(t){
		switch(t){
			case "on":
				$("critterForm").style.display = "none";
				$("clearContacts").style.display = "inline";
				$("displayContact").style.display = "none";
				$("addNew").style.display = "inline";
				break;
			case "off":
				$("critterForm").style.display = "block";
				$("clearContacts").style.display = "inline";
				$("displayContact").style.display = "inline";
				$("addNew").style.display = "none";
				$("items").style.display = "none";
				break;
			default:
				return false;
		}	
	} 
	
/* Create Titles */

	function makeTitles(){
		var targetForm = document.getElementsByTagName("form");
		var selectLi = $("title");
		var makeTitleList = document.createElement("select");
			makeTitleList.setAttribute("id", "titles");
		for(var i=0, j=titleList.length; i<j; i++){
			var makeTitle = document.createElement("option");
			var titleText = titleList[i];
				makeTitle.setAttribute("value", titleText);
				makeTitle.innerHTML = titleText;
				makeTitleList.appendChild(makeTitle);
		}
		selectLi.appendChild(makeTitleList);
	}
	
	makeTitles();
	
/* Collect Values */

	function saveData(keyListen){
		if(!keyListen){
			var key					= Math.floor(Math.random()*10000001);
		}else{
			key = keyListen;
		}
		whichRadio();
		isFriend();
		isFamily();
		isSchool();
		isWork();
		isAcquaintance();
		var contact					= {};
			contact.fname			= ["First Name:", $("fname").value];
			contact.lname			= ["Last Name:", $("lname").value];
			contact.phone			= ["Phone:", $("phone").value];
			contact.address			= ["Address:", $("address").value];
			contact.email			= ["Email:", $("email").value];			
		 	contact.gender			= ["Gender:", genderType];
			contact.title			= ["Title:", $("titles").value];
			contact.friend			= ["Friend", friendCheck];
			contact.family			= ["Family", familyCheck];
			contact.school			= ["School", schoolCheck];
			contact.work			= ["Work", workCheck];
			contact.acquaintance	= ["Acquaintance", acquaintanceCheck];
			contact.birthday		= ["Birthday:", $("birthday").value];
			contact.bestyrating		= ["Besty Rating:", $("bestyrating").value];
			contact.notes			= ["Notes:", $("notes").value];
		
		localStorage.setItem(key, JSON.stringify(contact));
		alert("Critter Captured!");
	}
	
/* Display Contact */

	function getContact(){
		toggleDisplay("on");
		if(localStorage.length === 0){
			alert("No critters captured yet.");
		}
		var makeContactList = document.createElement("div");
		makeContactList.setAttribute("id", "items");
		var makeContact = document.createElement("ul");
		makeContactList.appendChild(makeContact);
		document.body.appendChild(makeContactList);
		$("items").style.display = "block";
		for(var i=0, len=localStorage.length; i<len; i++){
			var addContact = document.createElement("li");
			var addLinks = document.createElement("li");
			makeContact.appendChild(addContact);
			var key = localStorage.key(i);
			var props = localStorage.getItem(key);
			var contact = JSON.parse(props);
			var addProperties = document.createElement("li");
			addContact.appendChild(addProperties);
			for(var a in contact){
				var addSubProp = document.createElement("li");
				addProperties.appendChild(addSubProp);
				var optSubText = contact[a][0]+" "+contact[a][1]; // ?
				addSubProp.innerHTML = optSubText;
				addProperties.appendChild(addLinks);
			}
			makeLinks(localStorage.key(i),addLinks);
		}
	}
	
	function makeLinks(key, addLinks){
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editLinkText = "Edit Contact";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editLinkText;
		addLinks.appendChild(editLink);
		
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteLinkText = "Delete Contact";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteLinkText;
		addLinks.appendChild(deleteLink);
	}
	
	function editItem(){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		toggleDisplay("off");
		$("fname").value = contact.fname[1];
		$("lname").value = contact.lname[1];
		$("phone").value = contact.phone[1];
		$("address").value = contact.address[1];
		$("email").value = contact.email[1];
		var radios = document.forms[0].gender;
		for(var i=0; i<radios.length; i++){
			if(radios[i].value == "Male" && contact.gender[1] == "Male"){
				radios[i].setAttribute("checked", "checked");
		}else if(radios[i].value == "Female" && contact.gender[1] == "Female"){
			radios[i].setAttribute("checked", "checked");
			}
		}
		$("titles").value = contact.title;
		if(contact.friend[1] == "Friend"){
			$(friendCheck).setAttribute("checked", "checked");
		}
		if(contact.family[1] == "Family"){
			$(familyCheck).setAttribute("checked", "checked");
		}
		if(contact.school[1] == "School"){
			$(schoolCheck).setAttribute("checked", "checked");
		}
		if(contact.work[1] == "Work"){
			$(workCheck).setAttribute("checked", "checked");
		}
		if(contact.acquaintance[1] == "Acquaintance"){
			$(acquaintanceCheck).setAttribute("checked", "checked");
		}
		$("birthday").value = contact.birthday[i];
		$("bestyrating").value = contact.bestyrating[i];
		$("notes").value = contact.notes[i];
		
		save.removeEventListener("click", storeData);
		$("submit").value = "Edit Contact";
		var editSubmit = $("submit");
		editSubmit.eventListener("click", validate);
		editSubmit.key = this.key;
	}
	
	function deleteItem(){
		var ask = confirm("Delete Contact?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Contact Deleted.");
			window.location.reload();
		}else{
			alert("Contact not deleted.");
		}
	}
	
	function validate(e){ //  I would comment out this section before submitting but the I'd have change some other functions and arguments.
		var getFname = $("fname");
		var getPhone = $("phone");
		var getEmail = $("email");
	
		errorMsg.innerHTML = ""; //  Keep getting bug that cascades line by line from this point on. "SyntaxError: At least one digit must occur after a decimal point".
		getFname.style.border = "1px solid black";
		getPhone.style.border = "1px solid black";
		getEmail.style.border = "1px solid black";
		
		var errorAry = [];
		
		if(getFname.value === ""){
			var fnameError = "Please enter a first name.";
			getfname.style.border = "1px solid red";
			errorAry.push(fnameError);			
		}
		if(getPhone.value === ""){
			var phoneError = "Please enter a phone number.";
			getPhone.style.border = "1px solid red";
			errorAry.push(phoneError);
		}		
		var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!(re.exec(getEmail.value))){
			var emailError = "Please enter a valid email address.";
			getEmail.style.border = "1px solid red";
			errorAry.push(emailError);
		}
		if(errorAry.length <= 1){
			for(var i=0, j=errorAry.length; i<j; i++){
				var text = document.createElement("li");
				text.innerHTML = errorAry[i];
				errorMsg.appendChild(text);
			}		
		e.preventDefault();
			return false;	
		}else{
			/*storeContact*/saveData(this.key);
		}
	}
	
/* Clear Local Storage */

	function clearStorage(){
		if(localStorage.length === 0){
		alert("Nothing to clear.")
	}else{
		localStorage.clear();
		alert("Critters Released!");
		window.location.reload();
		return false; // ?
		}
	}
	

/* Main Code */	
	
	storeContact.addEventListener("click", validate/*saveData*/);
	
	displayContact.addEventListener("click", getContact);
	
	clearContacts.addEventListener("click", clearStorage);
		
});
