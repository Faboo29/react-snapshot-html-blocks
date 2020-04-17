import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as data from '../data/data.json';
import Local from './Local';
import { ILocale } from '../types/content';

const localeContent = (data as any).default;

function Home() {
  return (
    <Router>
      <Switch>
        {localeContent.map((locale: ILocale, index: number) => {
          return (
            <Route key={index} path={`/${locale.lang}`}>
              <Local locale={locale} />
            </Route>
          );
        })}
      </Switch>
    </Router>
  );
}

export default Home;
