import AddTodo from "./Components/AddTodo";
import TodoList from "./Components/TodoList";

function App() {
	return (
		<>
			<h1 className="p-3 text-center">Cose da fare</h1>
			<AddTodo />
			<TodoList />
		</>
	);
}

export default App;
