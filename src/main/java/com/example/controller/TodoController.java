package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/todo")
public class TodoController {

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

}
