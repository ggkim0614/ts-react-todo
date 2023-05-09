import TodoList from './TodoList';
import { ContextProvider } from './Context/ContextProvider';

const App = () => {
	return (
		<ContextProvider>
			<TodoList />
		</ContextProvider>
	);
};

export default App;
