import type { Meta, StoryObj } from '@storybook/react';
import Chip from './Chip';

const meta: Meta<typeof Chip> = {
	component: Chip,
	title: 'Chip',
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const ChipButton: Story = {
	render: () => <Chip label="label" />,
};
