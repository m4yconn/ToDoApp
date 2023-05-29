import React from 'react';
import renderer from 'react-test-renderer';
import Pending from '../Pending'
import { render } from '@testing-library/react-native';

test("Snapshot correto", () => {
  const tree = renderer.create(<Pending/>).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Renderizou corretamente", () => {
  render(
    <Pending
      msg = "teste"
    />
  );
})