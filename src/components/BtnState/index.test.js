import React from 'react';
import renderer from 'react-test-renderer';
import BtnState from '../BtnState'

test("Snapshot correto", () => {
  const tree = renderer.create(<BtnState/>).toJSON();
  expect(tree).toMatchSnapshot();
});