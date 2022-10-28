import profileReducer, { actions} from "./profile_reducer";
import React from 'react';
import { render, screen } from '@testing-library/react';

let state = {
  postDate: [
    { id: 1, name: 'How are you?', count: 6 },
    { id: 2, name: 'It\'s my first post', count: 8 },
    { id: 3, name: 'No bed', count: 8 }
  ],
  profile: null,
  status: '',
  isFecbg: false,
}



test('renders learn react link', () => {
  let action = actions.adPostActionCreat('it-ihor');
  let NewStata = profileReducer(state, action);
  expect(NewStata.postDate[4].name).toBe('it-ihor');
});

test('renders learn react linkE', () => {
  let action = actions.deletePost(1);
  let NewStata = profileReducer(state, action);
  expect(NewStata.postDate.length).toBe(3);
});


