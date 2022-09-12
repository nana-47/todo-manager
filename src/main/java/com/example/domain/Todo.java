package com.example.domain;

import java.util.Date;

public class Todo {

	/** id(主キー) */
	private Integer id;
	/** TODOの内容 */
	private String todoText;
	/** TODOの優先度 */
	private Integer grade;
	/** TODOの期日 */
	private Date limitDate;
	/** TODOの完了日 */
	private Date finishDate;
	/** 並び替え用フラグ */
	private Integer selectType;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTodoText() {
		return todoText;
	}

	public void setTodoText(String todoText) {
		this.todoText = todoText;
	}

	public Integer getGrade() {
		return grade;
	}

	public void setGrade(Integer grade) {
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

	public Integer getSelectType() {
		return selectType;
	}

	public void setSelectType(Integer selectType) {
		this.selectType = selectType;
	}

	@Override
	public String toString() {
		return "Todo [id=" + id + ", todoText=" + todoText + ", grade=" + grade + ", limitDate=" + limitDate
				+ ", finishDate=" + finishDate + ", selectType=" + selectType + "]";
	}

}
