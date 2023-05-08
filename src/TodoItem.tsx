import styled, { css } from 'styled-components';
import { Todo } from './Interfaces';
import Button from './Components/Button';

interface TodoItemProps {
	todo: Todo;
	deleteTodo(idToDelete: string): void;
	toggleTodo(idToToggle: string): void;
}

const TodoItem = ({
	todo,
	deleteTodo,
	toggleTodo,
}: TodoItemProps): JSX.Element => {
	const handleClick = (idToToggle: string) => {
		toggleTodo(idToToggle);
	};
	return (
		<TodoItemContainer isComplete={todo.isComplete}>
			<TodoContent
				isComplete={todo.isComplete}
				onClick={() => handleClick(todo.id)}
			>
				{todo.todoValue}
				<Tooltip>Click to mark complete &nbsp;✅</Tooltip>
			</TodoContent>

			<Button buttonType="delete" onClick={() => deleteTodo(todo.id)} />
		</TodoItemContainer>
	);
};

export default TodoItem;

const TodoItemContainer = styled.div<{ isComplete: boolean }>`
	user-select: none;
	position: relative;
	padding: 8px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: 3px solid #e8e8e8;
	border-radius: 15px;
	margin-top: 12px;

	${({ isComplete }) =>
		isComplete === true &&
		css`
			opacity: 0.5;
		`}
`;

const Tooltip = styled.span`
	position: absolute;
	padding: 8px 12px;
	background-color: #282828;
	transform-origin: right;
	font-size: 12px;
	font-weight: 600;
	color: #fff;
	border-radius: 8px;
	z-index: 10;
	left: -185px;
	bottom: 10px;
	transform: scale(0);
	transition: 0.15s;
	transition-property: all;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
`;

const TodoContent = styled.div<{ isComplete: boolean }>`
	display: flex;
	flex-grow: 1;
	font-size: 20px;

	cursor: pointer;

	${({ isComplete }) =>
		isComplete === true
			? css`
					text-decoration: line-through;
			  `
			: css`
					&:hover {
						${Tooltip} {
							transform: scale(1);
						}
					}
			  `}
`;
