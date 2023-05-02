import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { Todo } from './Interfaces';
import TodoItem from './TodoItem';

const App: React.FC = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [inputValue, setInputValue] = useState<string>('');

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const handleAddClick = () => {
		const newTodo = { todoValue: inputValue };
		setTodos([...todos, newTodo]);
		setInputValue('');
	};

	const deleteTodo = (todoToDelete: string) => {
		setTodos(
			todos.filter((todo) => {
				return todo.todoValue !== todoToDelete;
			})
		);
	};

	return (
		<Wrapper>
			<CenterDiv>
				<InputContainer>
					<TodoInput
						type="text"
						placeholder="Add todo"
						value={inputValue}
						onChange={handleChange}
					/>
					<AddButton onClick={handleAddClick}>Add</AddButton>
				</InputContainer>
			</CenterDiv>
			<CenterDiv>
				<TodoBody>
					<Header>
						TodoList <span>built with</span> React + TypeScript
					</Header>
					<TodoSection>
						{todos.length === 0 ? (
							<AddTodoMsg>Add todos</AddTodoMsg>
						) : (
							todos.map((todo: Todo, key: number) => {
								return (
									<TodoItem key={key} todo={todo} completeTodo={deleteTodo} />
								);
							})
						)}
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
	margin: 64px;
`;

const CenterDiv = styled.div`
	display: flex;
	justify-content: center;
`;

const InputContainer = styled.div`
	display: flex;
	align-items: center;
`;

const TodoInput = styled.input`
	height: 30px;
	width: 240px;
	border-radius: 8px;
	border: 3px solid #e6e6e6;

	&:focus {
		outline: 3px solid #387ff2;
	}

	&::placeholder {
		opacity: 0.3;
		padding-left: 6px;
	}
`;

const AddButton = styled.button`
	margin-left: 12px;
	height: 36px;
	padding: 0 24px;
	color: #fff;
	background-color: #387ff2;
	font-size: 16px;
	border-radius: 8px;
	outline: 0;
	border: 0;
	transition: 0.3s;
	cursor: pointer;

	&:hover {
		background-color: #1262e3;
	}
	&:active {
		background-color: #0654d1;
	}
`;

const TodoBody = styled.div`
	margin-top: 36px;
`;

const Header = styled.div`
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
