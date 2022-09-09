package com.example.service;

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
	 * TODO情報の追加と最新のTODOリストを返す
	 * 
	 * @param todo
	 * @return todoMap
	 */
	public void addTodo(Todo todo) {
		todoMapper.insertTodo(todo);
	}
}
