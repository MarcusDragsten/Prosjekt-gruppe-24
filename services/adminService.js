import { connection } from '../src/mysql_connection';
import * as React from 'react';
import { Component } from 'react-simplified';

class AnsatteService {
  getAnsatte(success) {
    connection.query('select * from Ansatte', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getSelgere(success) {
    connection.query('select * from Ansatte where rolle="Selger"', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getSelger(id, success) {
    connection.query(
      'select fornavn, etternavn from Ansatte where rolle="Selger" and id = ?',
      [id],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  getAnsatt(id, success) {
    connection.query(
      'select Ansatte.id, Ansatte.passord, Ansatte.fornavn, Ansatte.etternavn, Ansatte.brukernavn, Ansatte.epost, Ansatte.telefon, Ansatte.rolle, Lokasjoner.id, Lokasjoner.område from Ansatte inner join Lokasjoner on Ansatte.lokasjon_id = Lokasjoner.id where Ansatte.id = ?',
      [id],
      (error, results) => {
        if (error) return console.error(error);

        success(results[0]);
      }
    );
  }

  addAnsatte(fornavn, etternavn, brukernavn, passord, epost, telefon, lokasjon_id, rolle, success) {
    connection.query(
      'insert into Ansatte (fornavn, etternavn, brukernavn, passord, epost, telefon, lokasjon_id, rolle) values (?, ?, ?, ?, ?, ?, ?, ?)',
      [fornavn, etternavn, brukernavn, passord, epost, telefon, lokasjon_id, rolle],
      (error, results) => {
        if (error) return console.error(error);

        success(results.insertId);
      }
    );
  }

  updateAnsatte(ansatte, success) {
    connection.query(
      'update Ansatte set fornavn=?, etternavn=?, brukernavn=?, passord=?, epost=?, telefon=?, lokasjon_id=?, rolle=? where id=?',
      [
        ansatte.fornavn,
        ansatte.etternavn,
        ansatte.brukernavn,
        ansatte.passord,
        ansatte.epost,
        ansatte.telefon,
        ansatte.id,
        ansatte.rolle,
        ansatte.id
      ],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  deleteAnsatte(id, success) {
    connection.query('delete from Ansatte where id = ?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  hentLokasjoner(success) {
    connection.query('select * from Lokasjoner', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  hentLokasjon(id, success) {
    connection.query('select * from Lokasjoner where id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  deleteLokasjon(id, success) {
    connection.query('delete from Lokasjoner where id = ?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  addLokasjon(adresse, postkode, område, har_lager, success) {
    connection.query(
      'insert into Lokasjoner (adresse, postkode, område, har_lager) values (?, ?, ?, ?)',
      [adresse, postkode, område, har_lager],
      (error, results) => {
        if (error) return console.error(error);

        success(results.insertId);
      }
    );
  }

  updateLokasjon(lokasjoner, success) {
    connection.query(
      'update Lokasjoner set adresse=?, postkode=?, område=?, har_lager=? where id=?',
      [lokasjoner.adresse, lokasjoner.postkode, lokasjoner.område, lokasjoner.har_lager, lokasjoner.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
}

export let ansatteService = new AnsatteService();
