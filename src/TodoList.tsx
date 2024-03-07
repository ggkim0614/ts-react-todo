import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import Button from './Components/Button';
import TextInput from './Components/TextInput';
import TodoBody from './TodoBody';
import { useDispatchContext } from './Context/ContextProvider';
import { v4 as uuidv4 } from 'uuid';

type ChipState = {
	incompleteItems: false;
	completeItems: false;
};

const TodoList = () => {
	const [inputValue, setInputValue] = useState<string>('');
	const [chipState, setChipState] = useState<ChipState>({
		incompleteItems: false,
		completeItems: false,
	});

	const dispatch = useDispatchContext();

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const handleAddClick = () => {
    // redirect to the main content of this project
    window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    if (inputValue === '') return

    const uuid = uuidv4()
    dispatch({
      id: uuid,
      type: 'CREATE',
      textValue: inputValue,
    })
    setInputValue('')
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
				<TodoBody chipState={chipState} handleChipToggle={handleChipToggle} />
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
