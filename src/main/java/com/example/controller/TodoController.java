package com.example.controller;

import java.sql.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
	public String index() {

		return "index";
	}

	/**
	 * 
	 * TODOを追加する
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/add", method = RequestMethod.GET)
	public Map<String, String> addTodo(String todoText, String grade, String limitDate) {

		Todo todo = new Todo();
		todo.setTodoText(todoText);
		todo.setGrade(grade);
		Date sqlLimitDate = java.sql.Date.valueOf(limitDate);
		todo.setLimitDate(sqlLimitDate);
		Date sqlFinishDate = java.sql.Date.valueOf("9999-12-31");
		todo.setFinishDate(sqlFinishDate);

		todoService.addTodo(todo);

		Map<String, String> map = new HashMap<>();
		map.put("message", "success");
		return map;
	}

}
