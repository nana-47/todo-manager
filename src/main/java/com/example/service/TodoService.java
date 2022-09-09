package com.example.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.TodoMapper;
import com.example.domain.Todo;

@Transactional
@Service
public class TodoService {

	@Autowired
	private TodoMapper todoMapper;

	/**
	 * TODO情報の一覧を取得
	 * 
	 * @param
	 * @return todoMap
	 */
	public Map<String, List<Todo>> allTodo() {

		List<Todo> todoList = todoMapper.findByTodo();
		List<Todo> finishList = todoMapper.findByFinishedTodo();

		Map<String, List<Todo>> todoMap = new HashMap<>();
		todoMap.put("todoList", todoList);
		todoMap.put("finishList", finishList);
		return todoMap;
	}

	/**
	 * TODO情報の追加と最新のTODOリストを返す
	 * 
	 * @param todo
	 * @return todoMap
	 */
	public Map<String, List<Todo>> addTodo(Todo todo) {

		todoMapper.insertTodo(todo);

		List<Todo> todoList = todoMapper.findByTodo();

		Map<String, List<Todo>> todoMap = new HashMap<>();
		todoMap.put("todoList", todoList);
		return todoMap;
	}

	/**
	 * 該当TODOの削除
	 * 
	 * @param
	 * @return todoMap
	 */
	public Map<String, List<Todo>> deleteTodo(Integer id) {

		todoMapper.deleteTodo(id);

		List<Todo> todoList = todoMapper.findByTodo();
		List<Todo> finishList = todoMapper.findByFinishedTodo();

		Map<String, List<Todo>> todoMap = new HashMap<>();
		todoMap.put("todoList", todoList);
		todoMap.put("finishList", finishList);
		return todoMap;
	}


	/**
	 * 該当TODOを完了にする
	 * 
	 * @param
	 * @return todoMap
	 */
	public Map<String, List<Todo>> finishTodo(Integer id) {

		Date date = new Date();

		todoMapper.updateTodo(id, date);

		List<Todo> todoList = todoMapper.findByTodo();
		List<Todo> finishList = todoMapper.findByFinishedTodo();

		Map<String, List<Todo>> todoMap = new HashMap<>();
		todoMap.put("todoList", todoList);
		todoMap.put("finishList", finishList);
		return todoMap;
	}
}
