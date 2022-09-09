package com.example.dao;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.domain.Todo;

@Mapper
public interface TodoMapper {

	/**
	 * TODO情報のインサート
	 * 
	 * @param todo
	 * @return
	 * 
	 */
	void insertTodo(Todo todo);

	/**
	 * 完了待ちTODOの一覧取得
	 * 
	 * @param
	 * @return todo
	 * 
	 */
	List<Todo> findByTodo();

	/**
	 * 完了済みTODOの一覧取得
	 * 
	 * @param
	 * @return todo
	 * 
	 */
	List<Todo> findByFinishedTodo();

	/**
	 * TODOの完了日更新
	 * 
	 * @param finishDate
	 * @return
	 * 
	 */
	void updateTodo(Integer id, Date finishDate);

	/**
	 * TODO情報の削除
	 * 
	 * @param
	 * @return
	 * 
	 */
	void deleteTodo(Integer id);

}
