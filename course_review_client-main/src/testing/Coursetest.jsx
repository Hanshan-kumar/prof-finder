import { render, screen } from '@testing-library/react';
import CourseList from './CourseList'; // Import the CourseList component
import { Provider } from 'react-redux';
import { store } from './store'; // Your Redux store

test('renders courses correctly', () => {
  render(
    <Provider store={store}>
      <CourseList />
    </Provider>
  );
  
  // Check if course names are rendered
  expect(screen.getByText(/course name/i)).toBeInTheDocument(); // Replace with an actual course name
});
