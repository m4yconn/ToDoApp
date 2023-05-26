import React from 'react';
import renderer from 'react-test-renderer';
import Pending from '../Pending'

test("Snapshot correto", () => {
  const tree = renderer.create(<Pending/>).toJSON();
  expect(tree).toMatchSnapshot();
});