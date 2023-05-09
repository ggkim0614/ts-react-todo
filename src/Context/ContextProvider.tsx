import { useContext, useReducer, createContext, Dispatch } from 'react';

type Todo = {
	id: string;
	todoValue: string;
	isComplete: boolean;
};

type Actions =
	| { type: 'CREATE'; id: string; textValue: string }
	| { type: 'TOGGLE'; id: string }
	| { type: 'DELETE'; id: string };

const initialState: Todo[] = [];

const TodoStateContext = createContext<Todo[] | undefined>(undefined);
const DispatchContext = createContext<Dispatch<Actions> | undefined>(undefined);

const Reducer = (state: Todo[], action: Actions): Todo[] => {
	switch (action.type) {
		case 'CREATE':
			return [
				...state,
				{ id: action.id, todoValue: action.textValue, isComplete: false },
			];
		case 'TOGGLE':
			return state.map((todo) =>
				action.id === todo.id ? { ...todo, isComplete: !todo.isComplete } : todo
			);
		case 'DELETE':
			return state.filter((todo) => todo.id !== action.id);
		default:
			throw new Error('Unexpected Error');
	}
};

export function ContextProvider({ children }: { children: React.ReactNode }) {
	const [todos, dispatch] = useReducer(Reducer, initialState);
	return (
		<DispatchContext.Provider value={dispatch}>
			<TodoStateContext.Provider value={todos}>
				{children}
			</TodoStateContext.Provider>
		</DispatchContext.Provider>
	);
}

export function useTodoStateContext() {
	const state = useContext(TodoStateContext);
	if (!state) throw new Error('Cannot find TodoState Provider');
	return state;
}

export function useDispatchContext() {
	const dispatch = useContext(DispatchContext);
	if (!dispatch) throw new Error('Cannot find Dispatch Provider');
	return dispatch;
}
