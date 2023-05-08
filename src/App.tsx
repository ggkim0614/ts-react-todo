import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { Todo } from './Interfaces';
import TodoItem from './TodoItem';
import Button from './Components/Button';
import TextInput from './Components/TextInput';
import { v4 as uuidv4 } from 'uuid';
import Chip from './Components/Chip';
import { RiReactjsLine } from 'react-icons/ri';
import { SiTypescript } from 'react-icons/si';

type ChipState = {
	incompleteItems: false;
	completeItems: false;
};

const App = () => {
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

	const toggleTodo = (idToToggle: string) => {
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

	const handleToggle = (
		stateToToggle: keyof ChipState,
		oppositeKey: keyof ChipState
	) => {
		setChipState((prev: ChipState) => ({
			...prev,
			[stateToToggle]: !chipState[stateToToggle],
			[oppositeKey]: false,
		}));
	};

	const completedTodos = todos.filter((todo) => todo.isComplete === true);

	const incompleteTodos = todos.filter((todo) => todo.isComplete !== true);

	console.log(chipState);

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
				<TodoBody>
					<Header>
						TodoList <span>built with</span>
						&nbsp;
						<RiReactjsLine
							color="#61dbfb"
							size="18"
							style={{ marginRight: '4px' }}
						/>
						React +{' '}
						<SiTypescript
							color="#007acc"
							size="18"
							style={{ marginRight: '4px' }}
						/>
						TypeScript
					</Header>
					<TodoSection>
						<CenterDiv>
							<Chip
								label="🔥 Incomplete items"
								value={chipState.incompleteItems}
								handleToggle={() =>
									handleToggle('incompleteItems', 'completeItems')
								}
							/>
							<Chip
								label="✅ Completed items"
								value={chipState.completeItems}
								handleToggle={() =>
									handleToggle('completeItems', 'incompleteItems')
								}
							/>
						</CenterDiv>
						{todos.length === 0 && <AddTodoMsg>Add todos</AddTodoMsg>}
						{chipState.incompleteItems &&
							incompleteTodos.map((todo: Todo, key: number) => {
								return (
									<TodoItem
										key={key}
										todo={todo}
										toggleTodo={toggleTodo}
										deleteTodo={deleteTodo}
									/>
								);
							})}
						{chipState.completeItems &&
							completedTodos.map((todo: Todo, key: number) => {
								return (
									<TodoItem
										key={key}
										todo={todo}
										toggleTodo={toggleTodo}
										deleteTodo={deleteTodo}
									/>
								);
							})}
						{chipState.incompleteItems === false &&
							chipState.completeItems === false &&
							todos.map((todo: Todo, key: number) => {
								return (
									<TodoItem
										key={key}
										todo={todo}
										toggleTodo={toggleTodo}
										deleteTodo={deleteTodo}
									/>
								);
							})}
					</TodoSection>
				</TodoBody>
			</CenterDiv>
		</Wrapper>
	);
};

export default App;

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

const TodoBody = styled.div`
	margin-top: 36px;
	width: 50%;
`;

const Header = styled.div`
	text-align: center;
	font-size: 24px;
	font-weight: 600;
	span {
		opacity: 0.5;
		font-weight: 400;
	}
`;

const TodoSection = styled.div`
	margin-top: 36px;
`;

const AddTodoMsg = styled.p`
	font-size: 30px;
	text-align: center;
	opacity: 0.25;
`;
