import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { Todo } from './Interfaces';
import Button from './Components/Button';
import TextInput from './Components/TextInput';
import TodoBody from './TodoBody';
import { v4 as uuidv4 } from 'uuid';

type ChipState = {
	incompleteItems: false;
	completeItems: false;
};

const TodoList = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [inputValue, setInputValue] = useState<string>('');
	const [chipState, setChipState] = useState<ChipState>({
		incompleteItems: false,
		completeItems: false,
	});

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const uuid = uuidv4();

	const handleAddClick = () => {
		if (inputValue === '') return;

		const newTodo = { id: uuid, todoValue: inputValue, isComplete: false };
		setTodos([...todos, newTodo]);
		setInputValue('');
	};

	const toggleTodoCompletion = (idToToggle: string) => {
		setTodos(
			todos.map((todo) =>
				todo.id === idToToggle
					? { ...todo, isComplete: !todo.isComplete }
					: todo
			)
		);
	};

	const deleteTodo = (idToDelete: string) => {
		if (window.confirm('Do you really want to delete this item?')) {
			setTodos(
				todos.filter((todo) => {
					return todo.id !== idToDelete;
				})
			);
		}
	};

	const handleChipToggle = (
		stateToToggle: keyof ChipState,
		oppositeKey: keyof ChipState
	) => {
		setChipState((prev: ChipState) => ({
			...prev,
			[stateToToggle]: !chipState[stateToToggle],
			[oppositeKey]: false,
		}));
	};

	return (
		<Wrapper>
			<CenterDiv>
				<InputContainer>
					<TextInput
						inputValue={inputValue}
						placeholder="Add todo"
						onChange={handleChange}
						fullWidth={true}
					/>

					<Button
						buttonType="primary"
						onClick={handleAddClick}
						buttonText="Add todo"
					/>
				</InputContainer>
			</CenterDiv>
			<CenterDiv>
				<TodoBody
					todos={todos}
					chipState={chipState}
					handleChipToggle={handleChipToggle}
					toggleTodoCompletion={toggleTodoCompletion}
					deleteTodo={deleteTodo}
				/>
			</CenterDiv>
		</Wrapper>
	);
};

export default TodoList;

const Wrapper = styled.div`
	font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue',
		Helvetica, Arial, 'Lucida Grande', sans-serif;
	margin: 32px;
`;

const CenterDiv = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`;

const InputContainer = styled.div`
	display: flex;
	align-items: center;
`;
