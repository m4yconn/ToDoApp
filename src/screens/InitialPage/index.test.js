import React from 'react';
import renderer from 'react-test-renderer';
import InitialPage from '../InitialPage'

test("Renderizou corretamente", () => {
  const tree = renderer.create(<InitialPage/>).toJSON();
  expect(tree).toMatchSnapshot();
});