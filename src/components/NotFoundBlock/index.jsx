import React from 'react';

import s from './NotFoundBlock.module.scss';
export const NotFoundBlock = () => {
  return (
    <div className={s.root}>
      <h1>
        <span>😞</span>
        <br />
        Not Found
      </h1>
      <p className={s.description}>Page not found</p>
    </div>
  );
};
