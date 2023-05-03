import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { Todo } from './Interfaces';
import TodoItem from './TodoItem';
import Button from './Components/Button';
import TextInput from './Components/TextInput';

const App: React.FC = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [inputValue, setInputValue] = useState<string>('');

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const handleAddClick = () => {
		console.log('running');
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
