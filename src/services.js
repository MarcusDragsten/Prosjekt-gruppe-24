import { connection } from './mysql_connection';
import * as React from 'react';
import { Component } from 'react-simplified';

class LoginService extends Component {
  getAnsatte(success) {
    connection.query('select * from Ansatte', (error, results) => {
      if (error) return console.error(error);
      success(results);
    });
  }
  getRolle(success) {
    connection.query('select rolle from Ansatte', (error, results) => {
      if (error) return console.error(error);
      success(results);
    });
  }
}
export let loginService = new LoginService();
