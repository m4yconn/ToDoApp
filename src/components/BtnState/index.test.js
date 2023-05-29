import React from 'react';
import renderer from 'react-test-renderer';
import BtnState from '../BtnState'
import { fireEvent, render } from '@testing-library/react-native';

test("Snapshot correto", () => {
  const tree = renderer.create(<BtnState/>).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Renderizou corretamente", () => {
  render(
    <BtnState
      color = "red"
      text = "teste"
      onPress = {() => {console.log("sucess")}}
    />
  );
})

test("Exibiu o texto correto", () => {
  const {getByText} = render(
    <BtnState
      color = "red"
      text = "testando texto"
      onPress = {() => {console.log("sucess")}}
    />
  );

  expect(getByText("testando texto")).toBeTruthy();
})

test("OnPress funcionando", () =>{
  let a = 0;

  const {getByText} = render(
    <BtnState
      color = "red"
      text = "testando onpress"
      onPress = {() => {a = 20}}
    />
  )
  const btn = getByText("testando onpress")
  fireEvent.press(btn);

  expect(a).toBe(20);
})