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
	 * TODOを表示する
	 * 
	 * @return JSON
	 */
	@ResponseBody
	@RequestMapping(value = "/show", method = RequestMethod.GET)
	public Map<String, List<Todo>> show(Integer selectType) {
		return todoService.allTodo(selectType);
	}

	/**
	 * 
	 * TODOを追加する
	 * 
	 * @return JSON
	 */
	@ResponseBody
	@RequestMapping(value = "/add", method = RequestMethod.GET)
	public Map<String, List<Todo>> addTodo(String todoText, Integer grade, String limitDate, Integer selectType) {

		Todo todo = new Todo();
		todo.setTodoText(todoText);
		todo.setGrade(grade);
		Date sqlLimitDate = java.sql.Date.valueOf(limitDate);
		todo.setLimitDate(sqlLimitDate);
		Date sqlFinishDate = java.sql.Date.valueOf("9999-12-31");
		todo.setFinishDate(sqlFinishDate);

		return todoService.addTodo(todo, selectType);
	}

	/**
	 * 
	 * TODOを削除する
	 * 
	 * @return JSON
	 */
	@ResponseBody
	@RequestMapping(value = "/delete", method = RequestMethod.GET)
	public Map<String, List<Todo>> deleteTodo(Integer id, Integer selectType) {

		return todoService.deleteTodo(id, selectType);
	}

	/**
	 * 
	 * TODOを完了にする
	 * 
	 * @return JSON
	 */
	@ResponseBody
	@RequestMapping(value = "/finish", method = RequestMethod.GET)
	public Map<String, List<Todo>> finishTodo(Integer id, Integer selectType) {

		return todoService.finishTodo(id, selectType);
	}

	/**
	 * 
	 * TODOの情報を更新する
	 * 
	 * @return JSON
	 */
	@ResponseBody
	@RequestMapping(value = "/change", method = RequestMethod.GET)
	public Map<String, List<Todo>> changeTodo(Integer id, String todoText, Integer grade, String limitDate,
			Integer selectType) {

		Date sqlLimitDate = java.sql.Date.valueOf(limitDate);

		return todoService.changeTodo(id, todoText, grade, sqlLimitDate, selectType);
	}

	/**
	 * 
	 * TODOの並べ替え
	 * 
	 * @return JSON
	 */
	@ResponseBody
	@RequestMapping(value = "/selectType", method = RequestMethod.GET)
	public Map<String, List<Todo>> selectTodo(Integer selectType) {

		return todoService.selectTodo(selectType);
	}

}
