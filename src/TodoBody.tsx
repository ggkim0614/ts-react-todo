import styled from 'styled-components';
import Chip from './Components/Chip';
import TodoItem from './TodoItem';
import { RiReactjsLine } from 'react-icons/ri';
import { SiTypescript } from 'react-icons/si';
import { Todo } from './Interfaces';
import { useTodoStateContext } from './Context/ContextProvider';

type ChipState = {
	incompleteItems: false;
	completeItems: false;
};

type TodoBodyProps = {
	chipState: { incompleteItems: boolean; completeItems: boolean };
	handleChipToggle: (
		itemToToggle: keyof ChipState,
		itemToMakeFalse: keyof ChipState
	) => void;
};

const TodoBody = ({ chipState, handleChipToggle }: TodoBodyProps) => {
	const todos: Todo[] = useTodoStateContext();

	const completedTodos = todos.filter((todo) => todo.isComplete === true);

	const incompleteTodos = todos.filter((todo) => todo.isComplete !== true);

	return (
		<TodoBodyContainer>
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
						handleChipToggle={() =>
							handleChipToggle('incompleteItems', 'completeItems')
						}
					/>
					<Chip
						label="✅ Completed items"
						value={chipState.completeItems}
						handleChipToggle={() =>
							handleChipToggle('completeItems', 'incompleteItems')
						}
					/>
				</CenterDiv>
				{todos.length === 0 && <AddTodoMsg>Add todos</AddTodoMsg>}
				{chipState.incompleteItems &&
					incompleteTodos.map((todo: Todo, key: number) => {
						return <TodoItem key={key} todo={todo} />;
					})}
				{chipState.completeItems &&
					completedTodos.map((todo: Todo, key: number) => {
						return <TodoItem key={key} todo={todo} />;
					})}
				{chipState.incompleteItems === false &&
					chipState.completeItems === false &&
					todos.map((todo: Todo, key: number) => {
						return <TodoItem key={key} todo={todo} />;
					})}
			</TodoSection>
		</TodoBodyContainer>
	);
};

export default TodoBody;

const CenterDiv = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`;

const TodoBodyContainer = styled.div`
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
