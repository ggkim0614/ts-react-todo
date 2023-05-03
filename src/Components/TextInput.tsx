import React from 'react';
import styled, { css } from 'styled-components';

type TextInputProps = {
	inputValue: string;
	placeholder?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	fullWidth: boolean;
};

const TextInput = ({
	inputValue,
	fullWidth,
	placeholder,
	onChange,
}: TextInputProps): JSX.Element => {
	return (
		<Input
			fullWidth={fullWidth}
			type="text"
			placeholder={placeholder ? placeholder : ''}
			onChange={onChange ? onChange : undefined}
			value={inputValue}
		></Input>
	);
};

export default TextInput;

const Input = styled.input<{ fullWidth: boolean }>`
	${({ fullWidth }) =>
		fullWidth === true
			? css`
					width: 100%;
			  `
			: css`
					width: 240px;
			  `}
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
