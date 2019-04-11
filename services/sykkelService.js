import { connection } from '../src/mysql_connection';
import * as React from 'react';
import { Component } from 'react-simplified';

class SykkelService extends Component {
  hentSykler(success) {
    connection.query('select * from Sykkel', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  hvorMangeSyklerLedig(success) {
    connection.query(
      'select type, count (status) as ant_ledige from Sykkel where status="Ledig" group by type',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  hentUtstyr(success) {
    connection.query('select * from Utstyr', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  hvorMyeUtstyrLedig(success) {
    connection.query(
      'select type, count (status) as ant_ledige from Utstyr where status="Ledig" group by type',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  hvorMangeSyklerValgt(bestilling_id, type, success) {
    connection.query(
      'select count (bestilling_id) as hvorMangeValgt from Sykkel where bestilling_id = ? and type = ?',
      [bestilling_id, type],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  hvorMangeSykleriBestilling(bestilling_id, success) {
    connection.query(
      'select count (bestilling_id) as hvorMangeValgt from Sykkel where bestilling_id = ?',
      [bestilling_id],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  hvorMyeUtstyriBestilling(bestilling_id, success) {
    connection.query(
      'select count (bestilling_id) as hvorMangeValgt from Utstyr where bestilling_id = ?',
      [bestilling_id],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  leggInnSykler(id, type, hvorMange, success) {
    connection.query(
      'UPDATE Sykkel SET status="Utleid", bestilling_id=? WHERE type=? AND status="Ledig" LIMIT ?',
      [id, type, Number(hvorMange)],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  hvorMangeUtstyrValgt(bestilling_id, type, success) {
    connection.query(
      'select count (bestilling_id) as hvorMangeValgt from Utstyr where bestilling_id = ? and type = ?',
      [bestilling_id, type],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  leggInnUtstyr(id, type, hvorMange, success) {
    connection.query(
      'UPDATE Utstyr SET status="Utleid", bestilling_id=? WHERE type=? AND status="Ledig" LIMIT ?',
      [id, type, Number(hvorMange)],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  hentSyklerOversikt(bestilling_id, success) {
    connection.query(
      'SELECT Sykkel.id, modellnavn, type, bestilling_type, timepris FROM Sykkel INNER JOIN Bestilling ON Bestilling.id = Sykkel.bestilling_id WHERE bestilling_id=?',
      [bestilling_id],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  hentUtstyrOversikt(bestilling_id, success) {
    connection.query(
      'SELECT Utstyr.id, type, bestilling_type, pris FROM Utstyr INNER JOIN Bestilling ON Bestilling.id = Utstyr.bestilling_id WHERE bestilling_id=?',
      [bestilling_id],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  addSykkel(type, status, hjul_størrelse, girsystem, ramme, lokasjon_id, bremse, modellnavn, timepris, success) {
    connection.query(
      'insert into Sykkel (type, status, hjul_størrelse, girsystem, ramme, lokasjon_id, bremse, modellnavn, timepris) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [type, status, hjul_størrelse, girsystem, ramme, lokasjon_id, bremse, modellnavn, timepris],
      (error, results) => {
        if (error) return console.error(error);

        success(results.insertId);
      }
    );
  }

  fjernSyklerFraBestilling(id, success) {
    connection.query(
      'UPDATE Sykkel SET status="Ledig", bestilling_id=null WHERE bestilling_id=?',
      [id],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  fjernUtstyrFraBestilling(id, success) {
    connection.query(
      'UPDATE Utstyr SET status="Ledig", bestilling_id=null WHERE bestilling_id=?',
      [id],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  hentGodeKunder(kunde_epost, success) {
    connection.query(
      'SELECT COUNT(kunde_epost) AS god_kunde FROM Bestilling WHERE kunde_epost=?',
      [kunde_epost],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  leggInnGevinst(gevinst, id, success) {
    connection.query('UPDATE Bestilling SET gevinst = ? WHERE id = ?', [gevinst, id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

export let sykkelService = new SykkelService();
