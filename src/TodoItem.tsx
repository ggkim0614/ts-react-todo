import { ChangeEvent, useState } from 'react';
import styled, { css } from 'styled-components';
import { Todo } from './Interfaces';
import Button from './Components/Button';
import { useDispatchContext } from './Context/ContextProvider';
import TextInput from './Components/TextInput';

interface TodoItemProps {
	todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
	const [editingMode, setEditingMode] = useState<boolean>(false);
	const [editInputValue, setEditInputValue] = useState<string>(todo.todoValue);

	const dispatch = useDispatchContext();

	const toggleTodoCompletion = (idToToggle: string) => {
		dispatch({
			type: 'TOGGLE',
			id: idToToggle,
		});
	};

	const deleteTodo = (idToDelete: string) => {
		if (window.confirm('Do you really want to delete this item?')) {
			dispatch({
				type: 'DELETE',
				id: idToDelete,
			});
		}
	};

	const handleToggleCompletion = (idToToggle: string) => {
		toggleTodoCompletion(idToToggle);
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setEditInputValue(event.target.value);
	};

	const handleEdit = (idToUpdate: string) => {
		dispatch({
			type: 'UPDATE',
			id: idToUpdate,
			newValue: editInputValue,
		});
		setEditingMode(!editingMode);
	};

	return (
		<TodoItemContainer isComplete={todo.isComplete}>
			{editingMode ? (
				<TextInput
					inputValue={editInputValue}
					onChange={handleChange}
					fullWidth={true}
				/>
			) : (
				<TodoContent
					isComplete={todo.isComplete}
					onClick={() => handleToggleCompletion(todo.id)}
				>
					{todo.todoValue}
					<Tooltip>Click to mark complete &nbsp;✅</Tooltip>
				</TodoContent>
			)}
			<span>
				<Button
					buttonText={editingMode ? 'Finish' : 'Edit'}
					buttonType={editingMode ? 'primary' : 'secondary'}
					onClick={
						editingMode
							? () => handleEdit(todo.id)
							: () => setEditingMode(!editingMode)
					}
				/>
				<Button buttonType="delete" onClick={() => deleteTodo(todo.id)} />
			</span>
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
