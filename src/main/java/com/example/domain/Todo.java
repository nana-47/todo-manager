package com.example.domain;

import java.util.Date;

public class Todo {

	/** id(主キー) */
	private Integer id;
	/** TODOの内容 */
	private String todo;
	/** TODOの優先度 */
	private String grade;
	/** TODOの期日 */
	private Date limitDate;
	/** TODOの完了日 */
	private Date finishDate;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTodo() {
		return todo;
	}

	public void setTodo(String todo) {
		this.todo = todo;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	public Date getLimitDate() {
		return limitDate;
	}

	public void setLimitDate(Date limitDate) {
		this.limitDate = limitDate;
	}

	public Date getFinishDate() {
		return finishDate;
	}

	public void setFinishDate(Date finishDate) {
		this.finishDate = finishDate;
	}
}
