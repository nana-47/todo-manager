'use strict';

/*ページ読み込み時の表示*/
window.addEventListener('load', function(){
	$.ajax({
		url: 'http://localhost:8080/todo/show',
		dataType: 'json',
		async: true
	}).done(function(data) {
		/*完了待ちリスト生成メソッド*/
		addTodoList(data);
		/*完了リスト生成メソッド*/
		finishedTodoList(data);
	}).fail(function(XMLHttpRequest, textStatus, errorThrown) {
		/*error時の出力*/
		error (XMLHttpRequest, textStatus, errorThrown);
	});
});

/*TODO追加ボタン押下時のメイン挙動*/
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
			/*formの情報を空にする*/
			form.todoText.value = "";
			for (const element of document.getElementsByName('grade')){
				element.checked = false;
			};
			form.limitDate.value = "";
			
			/*完了待ちリスト生成メソッド*/
			addTodoList(data);
		}).fail(function(XMLHttpRequest, textStatus, errorThrown) {
			/*error時の出力*/
			error (XMLHttpRequest, textStatus, errorThrown);
		});
	});
});

/*error時の出力*/
function error (XMLHttpRequest, textStatus, errorThrown){
	alert('正しい結果を得られませんでした')
	console.log('XMLHttpRequest:' + XMLHttpRequest.status);
	console.log('textStatus:' + textStatus);
	console.log('errorThrown:' + errorThrown.message);
};

/*完了待ちリスト生成メソッド*/
function addTodoList (data) {
	
	const todoContainer = document.getElementById("todoList");
			
	/*一旦元のリストをリセット*/
	while(todoContainer.firstChild) {
        todoContainer.removeChild(todoContainer.firstChild);
    }

	/*todoListの内容を反映*/
    data.todoList.forEach(function (todo) {
				
		/*箇条書きを生成し、詳細を表示*/
        const todoItem = document.createElement("li");
        		
        let beforeDate = moment(todo.limitDate, "YYYY-MM-DD");
		let afterDate = beforeDate.format('YYYY-MM-DD');

		todoItem.innerHTML = `内容：<input type="text" size="30" name="todoText" value=${todo.todoText}>
            				<br>
            				優先度：
            				<input type="radio" name="grade" value="高い">高い
            				<input type="radio" name="grade" value="普通" checked>普通
            				<input type="radio" name="grade" value="低い">低い
            				<br>
            				期限：
            				<input type="date" name="limitDate" value=${afterDate}>
        					<br>`;

        todoContainer.appendChild(todoItem);
        
               	
       	const elements = document.getElementsByName('grade');

  		// 例：DBから値を取得した値をフロントに渡す
  		const oldValue = todo.grade;
  		console.log(oldValue);
  		console.log("element"+elements[0].value);
  		
		if(elements[0].value == oldValue){
			elements[0].checked = true;
			elements[1].checked = false;
			elements[2].checked = false;
			console.log("ここ来てる");
		} 
        
		/*完了ボタン要素を追加*/
		const finishButton = document.createElement("button");
        finishButton.textContent = "完了";
        finishButton.classList.add('done');
        finishButton.setAttribute('type', 'button');
        finishButton.addEventListener("click", function() {
			/*完了ボタンメソッド*/
            finishTodo(todo.id);
        });
        todoItem.appendChild(finishButton);
        
        /*更新ボタン要素を追加*/
		const changeButton = document.createElement("button");
        changeButton.textContent = "更新";
        changeButton.classList.add('change');
        changeButton.setAttribute('type', 'button');
        changeButton.addEventListener("click", function() {
			/*更新ボタンメソッド*/
            changeTodo(todo.id);
        });
        todoItem.appendChild(changeButton);
        		
        /*削除ボタン要素を追加*/
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "削除";
        deleteButton.setAttribute('type', 'button');
        deleteButton.addEventListener("click", function() {
			/*削除ボタンメソッド*/
            deleteTodo(todo.id);
        });
        todoItem.appendChild(deleteButton);
        		
        /*行間区切りの平行線要素を追加*/
        const hr = document.createElement("hr");
 		hr.classList.add('hr-style2');
        todoItem.appendChild(hr);
    });
};

/*完了リスト生成メソッド*/
function finishedTodoList (data) {
	
	const finishContainer = document.getElementById("finishList");
			
	/*一旦元のリストをリセット*/
	while(finishContainer.firstChild) {
        finishContainer.removeChild(finishContainer.firstChild);
    }

	/*todoListの内容を反映*/
    data.finishList.forEach(function (finish) {
				
		/*箇条書きを生成し、詳細を表示*/
        const finishItem = document.createElement("li");
        		
        let beforeDate = moment(finish.finishDate, "YYYY-MM-DD");
		let afterDate = beforeDate.format('YYYY年MM月DD日');

		finishItem.innerHTML = `内容:${finish.todoText}<br>
        					完了日：${afterDate}<br>`;
        finishContainer.appendChild(finishItem);
        		
        /*削除ボタン要素を追加*/
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "削除";
        deleteButton.setAttribute('type', 'button');
        deleteButton.addEventListener("click", function() {
			/*削除ボタンメソッド*/
            deleteTodo(finish.id);
        });
        finishItem.appendChild(deleteButton);
        		
        /*行間区切りの平行線要素を追加*/
        const hr = document.createElement("hr");
 		hr.classList.add('hr-style2');
        finishItem.appendChild(hr);
    });
};

/*削除ボタンメソッド*/
function deleteTodo (index){
	$.ajax({
		url: 'http://localhost:8080/todo/delete',
		dataType: 'json',
		data: {
			id:index
		},
		async: true
	}).done(function(data) {
		/*完了待ちリスト生成メソッド*/
		addTodoList(data);
		/*完了リスト生成メソッド*/
		finishedTodoList(data);
	}).fail(function(XMLHttpRequest, textStatus, errorThrown) {
		/*error時の出力*/
		error (XMLHttpRequest, textStatus, errorThrown);
	});
};

/*完了ボタンメソッド*/
function finishTodo (index){
	$.ajax({
		url: 'http://localhost:8080/todo/finish',
		dataType: 'json',
		data: {
			id:index
		},
		async: true
	}).done(function(data) {
		/*完了待ちリスト生成メソッド*/
		addTodoList(data);
		/*完了リスト生成メソッド*/
		finishedTodoList(data);
	}).fail(function(XMLHttpRequest, textStatus, errorThrown) {
		/*error時の出力*/
		error (XMLHttpRequest, textStatus, errorThrown);
	});
};
