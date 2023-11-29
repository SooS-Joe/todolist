import { useState } from "react";

interface Todo {
	_id?: string;
	text: string;
	done: boolean;
}

interface Props {
	todo: Todo;
	refreshData: (data: []) => void;
}

const Todo = ({ todo, refreshData }: Props) => {
	const [edit, setEdit] = useState(false);
	const [text, setText] = useState(todo.text);
	let done = todo.done;
	function deleteTodo() {
		fetch(`https://todoapi-rsph.onrender.com/todos`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id: todo._id })
		})
			.then((response) => response.json())
			.then((data) => {
				refreshData(data);
			})
			.catch((error) => {
				console.error(error);
			});
	}
	function updateTodo() {
		fetch(`https://todoapi-rsph.onrender.com/todos`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: todo._id,
				text: text,
				done: done
			})
		})
			.then((response) => response.json())
			.then((data) => {
				refreshData(data);
				console.log("todo updated to " + done);
			})
			.catch((error) => {
				console.error(error);
			});
	}
	return (
		<>
			<div className="input-group">
				<div className="input-group-text fs-3">
					<input
						className="form-check-input mt-0"
						type="checkbox"
						aria-label="Done"
						defaultChecked={done}
						onChange={async (e) => {
							done = e.target.checked;
							updateTodo();
						}}
					/>
				</div>
				<input
					type="text"
					className={`form-control ${
						done && "text-decoration-line-through"
					}`}
					defaultValue={todo.text}
					readOnly={!edit}
					onChange={(e) => {
						setText(e.target.value);
					}}
				/>
				<button
					type="button"
					className={`btn btn-outline-${
						edit ? "primary" : "warning"
					}`}
					data-bs-dismiss="alert"
					onClick={() => {
						if (edit) updateTodo();
						setEdit(!edit);
					}}
					aria-label="Edit"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24"
						viewBox="0 -960 960 960"
						width="24"
					>
						{edit ? (
							<path
								xmlns="http://www.w3.org/2000/svg"
								d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"
							/>
						) : (
							<path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
						)}
					</svg>
				</button>
				<button
					type="button"
					className="btn btn-outline-danger"
					data-bs-dismiss="alert"
					onClick={deleteTodo}
					aria-label="Delete"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24"
						viewBox="0 -960 960 960"
						width="24"
					>
						<path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
					</svg>
				</button>
			</div>
		</>
	);
};

export default Todo;
