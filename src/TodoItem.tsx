import React from 'react';
import styled from 'styled-components';
import { Todo } from './Interfaces';
import Button from './Components/Button';

interface TodoItemProps {
	todo: Todo;
	completeTodo(idToDelete: number): void;
}

const TodoItem = ({ todo, completeTodo }: TodoItemProps): JSX.Element => {
	return (
		<TodoItemContainer>
			<TodoContent>{todo.todoValue}</TodoContent>
			<Button
				buttonType="delete"
				buttonText="Delete"
				onClick={() => completeTodo(todo.id)}
			/>
		</TodoItemContainer>
	);
};

export default TodoItem;

const TodoItemContainer = styled.div`
	padding: 16px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: 3px solid #e8e8e8;
	border-radius: 15px;
	margin-bottom: 12px;
`;

const TodoContent = styled.div`
	font-size: 20px;
`;
