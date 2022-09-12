'use strict';

/*ページ読み込み時の表示*/
window.addEventListener('load', function(){
	const selectType = document.getElementById('selector')
	$.ajax({
		url: 'http://localhost:8080/todo/show',
		dataType: 'json',
		data: {
				selectType:selectType.value
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
});

/*TODO追加ボタン押下時のメイン挙動*/
$(function(){
	$(document).on('click', '#add-btn', function() {
		
		const form = document.forms.addForm;
		const selectType = document.getElementById('selector')
		
		$.ajax({
			url: 'http://localhost:8080/todo/add',
			dataType: 'json',
			data: {
				todoText:form.todoText.value,
				grade:form.grade.value,
				limitDate:form.limitDate.value,
				selectType:selectType.value
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

/*並べ替え切り替え時の挙動*/
$(function(){
	$(document).on('change', '#selector', function() {
		
		const selectType = document.getElementById('selector')
		$.ajax({
			url: 'http://localhost:8080/todo/selectType',
			dataType: 'json',
			data: {
				selectType:selectType.value
			},
			async: true
		}).done(function(data) {
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
        
        /*DBに保存された日時を整形*/		
		var date = new Date(todo.limitDate);
		date = date.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
		date=new Date(date);
		let beforeDate = moment(date, "YYYY-MM-DD");
		let afterDate = beforeDate.format('YYYY-MM-DD');

		todoItem.innerHTML = `
							内容：<input type="text" size="30" id="${todo.id}TodoText" name="todoText" value=${todo.todoText}>
            				<br>
            				優先度：
            				<input type="radio" name="${todo.id}grade" value=1>高い
            				<input type="radio" name="${todo.id}grade" value=2>普通
            				<input type="radio" name="${todo.id}grade" value=3>低い
            				<br>
            				期限：
            				<input type="date" id="${todo.id}LimitDate" name="limitDate" value=${afterDate}>
        					<br>
        					`;

        todoContainer.appendChild(todoItem);
        
        /*DB登録済みの優先度を初期値としてセット*/
       	const elements = document.getElementsByName(todo.id+'grade');
  		const oldValue = todo.grade;
		
		switch (oldValue){
  			case 1:
    			elements[0].checked = true;
    			break;
  			case 2:
				elements[1].checked = true;
    			break;
    		case 3:
				elements[2].checked = true;
    			break;
    	};
        
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
        
        /*DBに保存された日時を整形*/		
		var date = new Date(finish.finishDate);
		date = date.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
		date=new Date(date);
		let beforeDate = moment(date, "YYYY-MM-DD");
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
	
	const selectType = document.getElementById('selector')
	$.ajax({
		url: 'http://localhost:8080/todo/delete',
		dataType: 'json',
		data: {
			id:index,
			selectType:selectType.value
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
	
	const selectType = document.getElementById('selector')
	$.ajax({
		url: 'http://localhost:8080/todo/finish',
		dataType: 'json',
		data: {
			id:index,
			selectType:selectType.value
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

/*更新ボタンメソッド*/
function changeTodo (index){
	
	const todoText = document.getElementById(index + 'TodoText');
	for (const elements of document.getElementsByName(index + 'grade')) {
		if (elements.checked) {
			var grade = elements.value;
			break;
		}
	}
	const limitDate = document.getElementById(index + 'LimitDate');
	const selectType = document.getElementById('selector')

	$.ajax({
		url: 'http://localhost:8080/todo/change',
		dataType: 'json',
		data: {
			id:index,
			todoText:todoText.value,
			grade:grade,
			limitDate:limitDate.value,
			selectType:selectType.value
		},
		async: true
	}).done(function(data) {
		/*完了待ちリスト生成メソッド*/
		addTodoList(data);
	}).fail(function(XMLHttpRequest, textStatus, errorThrown) {
		/*error時の出力*/
		error (XMLHttpRequest, textStatus, errorThrown);
	});
};
