import { useState } from "react";

const AddTodo = () => {
	const [text, setText] = useState("");
	function addTodo() {
		fetch(`https://todoapi-rsph.onrender.com/todos`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ text: text, done: false })
		})
			.then(() => {
				window.location.reload();
			})
			.catch((error) => {
				console.error(error);
			});
	}
	return (
		<>
			<div className="text-center input-group mb-3 mx-auto w-50">
				<input
					type="text"
					className="form-control"
					placeholder="Aggiungi un punto"
					id="todoName"
					onChange={(e) => {
						setText(e.target.value);
					}}
					required
				/>
				<button className="btn btn-outline-primary" onClick={addTodo}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24"
						viewBox="0 -960 960 960"
						width="24"
					>
						<path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
					</svg>
				</button>
			</div>
		</>
	);
};

export default AddTodo;
