'use strict';

$(function(){
	$(document).on('click', '#add-btn', function() {
		
		const form = document.forms.addForm;
		
		$.ajax({
			url: 'http://localhost:8080/todo/add',
			dataType: 'json',
			data: {
				todoText:form.todoText.value,
				grade:form.grade.value,
				limitDate:form.limitDate.value
			},
			async: true
		}).done(function(data) {
			form.todoText.value = "";
			for (const element of document.getElementsByName('grade')){
				element.checked = false;
			};
			form.limitDate.value = "";
			console.log(data.message);
		}).fail(function(XMLHttpRequest, textStatus, errorThrown) {
			alert('正しい結果を得られませんでした')
			console.log('XMLHttpRequest:' + XMLHttpRequest.status);
			console.log('textStatus:' + textStatus);
			console.log('errorThrown:' + errorThrown.message);
		});
	});
});
