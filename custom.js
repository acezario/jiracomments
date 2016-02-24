$(document).ready(function() {
 
	$("#result").hide();
var idForm = "#comment";
  
  $(idForm).submit(function( event ) {
    event.preventDefault();
    
    // Head and variables.
    var newLine = '\n';
    var doubleNewLine = '\n\n';
    var hr = '--' + newLine;
    var html = '';    
    
    html += 'h1. {color:#ad1b31}MTS/MTP{color}' + doubleNewLine;

    // ====== CODE
    html += 'h2. {color:#1B809E}Code Changes{color}' + doubleNewLine;
    
    // We have code changes?         
    html += '*Do we have code changes?*' + newLine;
    html += $('input[name=code_changes]:checked', idForm).val() + doubleNewLine;

    // Changes Type:
    html += '*Technology:*' + newLine;      
    var code_changes_type = $('input:checkbox[name^=code_changes_type]:checked');
    if(code_changes_type.length > 0){
      code_changes_type.each(function(){
        html += $(this).val() + newLine; 
      });
      html += newLine;
    }

    // More details:
    html += '*More Details:*' + newLine;
    html += $('textarea[name=code_more_details]', idForm).val() + doubleNewLine; 
    
    // ====== CMS CHANGES
    html += 'h2. {color:#CE4844}CMS Changes{color}' + doubleNewLine;

    // We have CMS changes?
    html += '*Do we have CMS changes?*' + newLine;
    html += $('input[name=cms_changes]:checked', idForm).val() + doubleNewLine;
    
    // Steps
    html += 'h3. Steps' + doubleNewLine;
    var array_cms_changes_steps_title = [];
    var array_cms_changes_steps_description = [];    
    $('input[name^="cms_changes_steps_title"]').each(function() {
      array_cms_changes_steps_title.push($(this).val());
    });    
    $('textarea[name^="cms_changes_steps_description"]').each(function() {
      array_cms_changes_steps_description.push($(this).val());
    });    
    $('input[name^="cms_changes_steps_title"]').each(function(index) {
      html += '*' + (index + 1) + ') ' + array_cms_changes_steps_title[index] + '*' + newLine;
      html += array_cms_changes_steps_description[index] + '*' + doubleNewLine;
    });

    // Comments
    html += 'h2. {color:#222}Comments{color}' + doubleNewLine;
    html += $('textarea[name=comments]', idForm).val() + doubleNewLine; 

    // ====== Unit Tests
    html += 'h2. {color:#AA6708}Unit Tests{color}' + doubleNewLine;
    var array_unit_tests_steps_title = [];
    var array_unit_tests_steps_description = [];
	var unit_tests_steps_steps = [];
    
    $('input[name^="unit_tests_steps_title"]').each(function() {
      array_unit_tests_steps_title.push($(this).val());
    });    
    $('textarea[name^="unit_tests_steps_description"]').each(function() {
      array_unit_tests_steps_description.push($(this).val());
    });
	$('textarea[name^="unit_tests_steps_steps"]').each(function() {
      unit_tests_steps_steps.push($(this).val());
    });      
    $('input[name^="unit_tests_steps_title"]').each(function(index) {
      html += '*' + (index + 1) + ') ' + array_unit_tests_steps_title[index] + '*' + newLine;
	  html += 'Steps :' + unit_tests_steps_steps[index] + '*' + doubleNewLine;
      html += 'Expected Results :' + array_unit_tests_steps_description[index] + '*' + doubleNewLine;
    });  
    
    // ====== Result
    $("#result").val(html);
	
	    
  });
});



function showCodeChange(){
    if(document.getElementById('codeChangeY').checked) {
		$("#codeChange").show();
	} else {
		$("#codeChange").hide();
	}
}

function showCMSChange(){
    if(document.getElementById('cms_changes_yes').checked) {
		$("#cmsSession").show();
	} else {
		$("#cmsSession").hide();
	}
}

function validateForm(){
	
	var validation = true;
	
	if(!document.getElementById('cms_changes_yes').checked && !document.getElementById('cms_changes_no').checked) {
		$("#result").hide();
		$("#cmsError").show();
		$('html, body').animate({ scrollTop: 0 }, 'fast');
		validation =  false;
		
	}
	else{		
		$("#cmsError").hide();
	}
	
	if(!document.getElementById('codeChangeY').checked && !document.getElementById('codeChangeN').checked) {
		$("#codeError").show();
		$("#result").hide();
		$('html, body').animate({ scrollTop: 0 }, 'fast');
		validation =  false;
	}
	else{		
		$("#codeError").hide();
	}
	
return validation;

}

function showResult(){
	
	if(validateForm()){
		
		$("#result").show();
		$("#cmsError").hide();
		$("#cmsError").hide();
	
		var clipboard = new Clipboard('.btn');
	}
}

	
var numTestForms = 1;
function addTest(){

var id ='unitTestForm'+numTestForms;
var title = 'Test '+numTestForms;

	var newTest =unitTestTpl(id, title);
	$(newTest).appendTo('#moreTests');
	numTestForms++;
	
}


function removeTest(idR){

	$('#'+idR+'').remove();
}

function unitTestTpl(idTpl,titleTpl){
	
	var unitTestString=   
		'<div class="row" id="'+idTpl+'">'+
			'<div class="col-lg-12">'+
				'<div class="bs-callout bs-callout-warning">'+
					'<h4>'+titleTpl+'</h4>'+
						'<div class="form-group">'+
							'<label for="unit_tests_steps_title">Title </label>'+
							'<input name="unit_tests_steps_title[]" class="form-control" /> '+
						'</div>'+
						'<div class="form-group">'+
							'<label for="unit_tests_steps_steps">Steps</label>'+
							'<textarea name="unit_tests_steps_steps[]" class="form-control" rows="3"></textarea>' +
						'</div>'+
						'<div class="form-group">'+
							'<label for="unit_tests_steps_description">Expected Results</label>'+
							'<textarea name="unit_tests_steps_description[]" class="form-control" rows="3"></textarea>'+
						'</div>'+
						'<div>'+
							'<button class="btn btn-lg btn-warning" onclick="removeTest(\''+idTpl+'\')">- Test</button>'+
						'</div>'+
				'</div>'+
			'</div>'+
		'</div>';

	return unitTestString;
}

var numCmsForms = 1;
function addCms(){

var id ='cmsForm'+numCmsForms;
var title = 'Step '+numCmsForms;

	var newTest =cmsTpl(id, title);
	$(newTest).appendTo('#cmsSteps');
	numCmsForms++;
	
}


function removeCms(idCms){

	$('#'+idCms+'').remove();
}

function cmsTpl(idTpl,titleTpl){
	
	var cmsString=
		'<div class="row" id="'+idTpl+'">'+
			'<div class="col-lg-12">'+
				'<div class="bs-callout bs-callout-danger">'+
					'<h4>'+titleTpl+'</h4>'+
					'<div class="form-group">'+
						'<label for="cms_changes_steps_title">Title</label>'+
						'<input name="cms_changes_steps_title[]" class="form-control" />'+
					'</div>'+
					'<div class="form-group">'+
						'<label for="cms_changes_steps_description">Description</label>'+
						'<textarea name="cms_changes_steps_description[]" class="form-control" rows="3"></textarea>'+
					'</div>'+
					'<div>'+
							'<button class="btn btn-lg btn-warning" onclick="removeCms(\''+idTpl+'\')">- CMS </button>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>';

	return cmsString;	
	
}

function refreshForm(){
	var r = confirm("Would you like to completly refresh this form?");
	if (r == true) {
		document.getElementById('comment').reset();
	}
	
}

//Função para confirmar saída da página
window.onbeforeunload = function (e) {
    e = e || window.event;

    // For IE and Firefox prior to version 4
    if (e) {
        e.returnValue = 'Are you sure you want to leave?';
    }
    // For Safari
    return 'Are you sure you want to leave?';
};
