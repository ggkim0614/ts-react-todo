// Button.stories.ts|tsx
import React, { ChangeEvent, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import TextInput from './TextInput';

const meta: Meta<typeof TextInput> = {
	title: 'TextInput',
	component: TextInput,
};

export default meta;
type Story = StoryObj<typeof TextInput>;

const TextInputWithHooks = () => {
	const [inputValue, setInputValue] = useState<string>('');

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};
	return (
		<TextInput
			inputValue={inputValue}
			placeholder="Add todo"
			onChange={handleChange}
			fullWidth={true}
		/>
	);
};

export const TextTypeInput: Story = {
	render: () => <TextInputWithHooks />,
};
