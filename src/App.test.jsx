import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ReaderRoute } from './App';
import * as router from 'react-router-dom';

// Mock the components imported in App.jsx
vi.mock('./components/shared/Dashboard.jsx', () => ({
  default: () => <div>Dashboard</div>,
}));
vi.mock('./components/shared/Evolution.jsx', () => ({
  default: () => <div>Evolution</div>,
}));
vi.mock('./components/Settings/Settings.jsx', () => ({
  default: () => <div>Settings</div>,
}));
vi.mock('./components/Reader/Reader.jsx', () => ({
  default: ({ onPractice }) => (
    <button onClick={() => onPractice(['word1'])}>Practice</button>
  ),
}));
vi.mock('./components/Builder/Builder.jsx', () => ({
  default: () => <div>Builder</div>,
}));
vi.mock('./components/Flashcard/Flashcard.jsx', () => ({
  default: () => <div>Flashcard</div>,
}));
vi.mock('./components/Vocabulary/Vocabulary.jsx', () => ({
  default: () => <div>Vocabulary</div>,
}));
vi.mock('./components/shared/AppLayout.jsx', () => ({
  default: () => <div>AppLayout</div>,
}));

// Mock the stores
vi.mock('./store/useWordStore.js', () => ({
  useWordStore: () => ({ words: [] }),
}));
vi.mock('./store/useProgressStore.js', () => ({
  useProgressStore: () => ({ syncWordStatusTotals: vi.fn() }),
}));

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('ReaderRoute', () => {
  it('navigates to /practice with selected words when onPractice is called', () => {
    const navigate = vi.fn();
    vi.mocked(router.useNavigate).mockReturnValue(navigate);

    render(<ReaderRoute />);

    const practiceButton = screen.getByText('Practice');
    fireEvent.click(practiceButton);

    expect(navigate).toHaveBeenCalledWith('/practice', {
      state: { words: ['word1'] },
    });
  });
});
