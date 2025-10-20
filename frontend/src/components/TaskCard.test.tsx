
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import TaskCard from './TaskCard';

// Mock de @dnd-kit/sortable hook omdat deze een DndContext provider vereist.
// Voor deze unit test focussen we alleen op het renderen van de content.
vi.mock('@dnd-kit/sortable', () => ({
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: vi.fn(),
    transform: null,
    transition: null,
  }),
}));

// Mock de @dnd-kit/utilities omdat de component deze gebruikt voor CSS transformaties.
vi.mock('@dnd-kit/utilities', () => ({
  CSS: {
    Transform: {
      toString: () => '', // Geef een lege string terug voor de stijl
    },
  },
}));


describe('TaskCard Component', () => {

  it('should render the task title and description', () => {
    // 1. Definieer een mock 'task' object
    const mockTask = {
      id: 123,
      title: 'Een unieke testtitel',
      description: 'Een specifieke testbeschrijving voor deze testcase.',
      status: 'TODO',
    };

    // 2. Render de TaskCard component met de mock data
    render(<TaskCard task={mockTask} />);

    // 3. Verifieer dat de titel en beschrijving op het scherm verschijnen
    const titleElement = screen.getByText('Een unieke testtitel');
    const descriptionElement = screen.getByText('Een specifieke testbeschrijving voor deze testcase.');

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

});
