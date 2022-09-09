package com.example.controller;

import java.sql.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.domain.Todo;
import com.example.service.TodoService;

@Controller
@RequestMapping("/todo")
public class TodoController {

	@Autowired
	private TodoService todoService;

	/**
	 * 
	 * 画面を表示する
	 * 
	 * @return index
	 */
	@RequestMapping("")
	public String index(Model model) {

		return "index";
	}

	/**
	 * 
	 * TODOを追加する
	 * 
	 * @return JSON
	 */
	@ResponseBody
	@RequestMapping(value = "/show", method = RequestMethod.GET)
	public Map<String, List<Todo>> show() {

		return todoService.allTodo();
	}

	/**
	 * 
	 * TODOを追加する
	 * 
	 * @return JSON
	 */
	@ResponseBody
	@RequestMapping(value = "/add", method = RequestMethod.GET)
	public Map<String, List<Todo>> addTodo(String todoText, String grade, String limitDate) {

		Todo todo = new Todo();
		todo.setTodoText(todoText);
		todo.setGrade(grade);
		Date sqlLimitDate = java.sql.Date.valueOf(limitDate);
		todo.setLimitDate(sqlLimitDate);
		Date sqlFinishDate = java.sql.Date.valueOf("9999-12-31");
		todo.setFinishDate(sqlFinishDate);

		return todoService.addTodo(todo);
	}

	/**
	 * 
	 * TODOを削除する
	 * 
	 * @return JSON
	 */
	@ResponseBody
	@RequestMapping(value = "/delete", method = RequestMethod.GET)
	public Map<String, List<Todo>> deleteTodo(Integer id) {

		return todoService.deleteTodo(id);
	}

	/**
	 * 
	 * TODOを完了にする
	 * 
	 * @return JSON
	 */
	@ResponseBody
	@RequestMapping(value = "/finish", method = RequestMethod.GET)
	public Map<String, List<Todo>> finishTodo(Integer id) {

		return todoService.finishTodo(id);
	}

}
