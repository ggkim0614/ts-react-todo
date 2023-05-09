import styled, { css } from 'styled-components';

type ChipProps = {
	label: string;
	value: boolean;
	handleChipToggle?: () => void;
};

const Chip = ({ label, value, handleChipToggle }: ChipProps) => {
	return (
		<ChipContainer
			isActive={value}
			onClick={handleChipToggle ? handleChipToggle : undefined}
		>
			{label}
		</ChipContainer>
	);
};

export default Chip;

const ChipContainer = styled.div<{ isActive: boolean }>`
	user-select: none;
	padding: 6px 16px;
	display: inline-block;
	font-size: 14px;
	font-weight: 600;
	border-radius: 55px;
	border: 2px solid #e8e8e8;
	cursor: pointer;

	&:hover {
		border: 2px solid#387ff2;
	}

	${({ isActive }) =>
		isActive === true &&
		css`
			background: #387ff2;
			border: 2px solid #387ff2;
			color: #fff;

			&:hover {
				border: 2px solid#1d6ff1;
			}
		`}
`;
