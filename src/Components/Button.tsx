import React from 'react';
import styled, { css } from 'styled-components';

type ButtonProps = {
	buttonType: string;
	buttonText: string;
	onClick?: () => void;
};

const Button = ({
	buttonText,
	buttonType,
	onClick,
}: ButtonProps): JSX.Element => {
	return (
		<ButtonContainer
			onClick={onClick ? onClick : undefined}
			buttonType={buttonType}
		>
			{buttonText}
		</ButtonContainer>
	);
};

export default Button;

const ButtonContainer = styled.button<{ buttonType: string }>`
	margin-left: 12px;
	font-size: 16px;
	border-radius: 8px;
	outline: 0;
	border: 0;
	transition: 0.3s;
	cursor: pointer;

	${({ buttonType }) =>
		buttonType === 'primary' &&
		css`
			padding: 12px 24px;
			color: #fff;
			background-color: #387ff2;
			border: 3px solid #387ff2;
			&:hover {
				background-color: #1262e3;
			}
			&:active {
				background-color: #0654d1;
			}
		`}

	${({ buttonType }) =>
		buttonType === 'secondary' &&
		css`
			padding: 12px 24px;
			color: #333333;
			border: 3px solid #e9e9e9;
			background-color: #ffffff;
			&:hover {
				background-color: #eaeaea;
			}
			&:active {
				background-color: #dedede;
			}
		`}

	${({ buttonType }) =>
		buttonType === 'delete' &&
		css`
			padding: 12px 24px;
			font-size: 14px;
			color: #666666;
			background-color: #d7d7d7;
			border: 3px solid #d7d7d7;
			&:hover {
				color: #fff;
				background-color: #d13d64;
				border: 3px solid #d13d64;
			}
			&:active {
				color: #fff;
				background-color: #c5204c;
			}
		`}
`;
