import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta: Meta<typeof Button> = {
	title: 'Button',
	component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	render: () => <Button buttonType="primary" buttonText="Primary" />,
};

export const Secondary: Story = {
	render: () => <Button buttonType="secondary" buttonText="Secondary" />,
};

export const Delete: Story = {
	render: () => <Button buttonType="delete" buttonText="Delete" />,
};
