/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

"use strict";

document.addEventListener("DOMContentLoaded", function() {
    var states = document.getElementsByName("state")[0];
    var i;
    for(i = 0; i < usStates.length; i++){
    	var current = usStates[i];
    	var temp = document.createElement("option");
    	temp.textContent = current.name;
    	temp.value = current.code;
    	states.appendChild(temp);
    }

    var occu = document.getElementsByName("occupation")[0];
	occu.addEventListener("change", function(){
		var selected = occu.options[occu.selectedIndex].value;
		var occuOther = document.getElementsByName("occupationOther")[0];
		if(selected == "other"){
			occuOther.style.display = 'block';
		}else{
			occuOther.style.display = 'none';
		}
	});

	var cancButton = document.getElementById('cancelButton');
    cancButton.addEventListener('click', function(){
        if(window.confirm('Are you sure?')) {
            window.location = 'https://www.google.com';
        }
    });

    try{
    	document.getElementById('signup').addEventListener('submit', onSubmit);
	}catch(e){
		alert("validation failed: " + e);
	}
});



function onSubmit(evt) {
    evt.returnValue = validateForm(this);
    if (!evt.returnValue && evt.preventDefault) {
        evt.preventDefault();
    }
    return evt.returnValue;
}

function validateForm(form) {
    var requiredFields = ['firstName','lastName','address1','city','state','zip','birthdate'];

    var idx;
    var formValid = true;
    for(idx = 0; idx < requiredFields.length; idx++){
    	formValid &= validateRequiredField(form.elements[requiredFields[idx]]);
    }

    return formValid;
}

function validateRequiredField(field) {
	var valid = false;
	if(field.type == 'text'){
		if (field.name == 'zip') {
			var zipRegExp = new RegExp('^\\d{5}$');
			valid = zipRegExp.test(field.value);
		}else{
    		var value = field.value.trim();
   			valid = value.length > 0;
   		}
	}
	if(field.name == 'state'){
		valid = field.options[field.selectedIndex].value != "";
	}
	if(field.type == 'date'){
		valid = moment().diff(field.value, 'years') >= 13;
	}

	if(!valid){
		field.style.border = "1px solid #FF0000";
   	}else {
   		field.style.border = "none";
    }
    
    return valid;
}

