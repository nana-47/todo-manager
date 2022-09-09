package com.example.dao;

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
	Todo findByTodo();

	/**
	 * 完了済みTODOの一覧取得
	 * 
	 * @param
	 * @return todo
	 * 
	 */
	Todo findByFinishedTodo();

	/**
	 * TODOの完了日更新
	 * 
	 * @param finishDate
	 * @return
	 * 
	 */
	void updateTodo();

	/**
	 * TODO情報の削除
	 * 
	 * @param
	 * @return
	 * 
	 */
	void deleteTodo();

}
