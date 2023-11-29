import { useState, useEffect } from "react";
import Todo from "./Todo.tsx";

const TodoList = () => {
	const [todos, setTodos] = useState([]);
	useEffect(() => {
		fetch("https://todoapi-rsph.onrender.com/todos")
			.then((response) => response.json())
			.then((data) => {
				setTodos(data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);
	return typeof todos === "undefined" ? (
		<p>Loading...</p>
	) : (
		todos.map((todo: Todo, i) => {
			return (
				<li
					className="list-group-item text-center fs-3  mx-auto w-50"
					key={i}
				>
					<Todo todo={todo} refreshData={setTodos} key={i} />
				</li>
			);
		})
	);
};

export default TodoList;
