import React from 'react';
import styled from 'styled-components';
import { Todo } from './Interfaces';

interface TodoItemProps {
	todo: Todo;
	completeTodo(todoToDelete: string): void;
}

const TodoItem = ({ todo, completeTodo }: TodoItemProps) => {
	return (
		<TodoItemContainer>
			<TodoContent>{todo.todoValue}</TodoContent>
			<DeleteButton onClick={() => completeTodo(todo.todoValue)}>
				Delete
			</DeleteButton>
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

const DeleteButton = styled.button`
	padding: 8px 12px;
	font-size: 14px;
	font-weight: 600;
	color: #fff;
	background-color: #9c9c9c;
	border-radius: 8px;
	outline: 0;
	border: 0;
	transition: 0.3s;
	cursor: pointer;

	&:hover {
		background-color: #d13d64;
	}
`;
