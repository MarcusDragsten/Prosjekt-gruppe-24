import { connection } from '../src/mysql_connection';
import * as React from 'react';
import { Component } from 'react-simplified';

class LagerService extends Component {
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
  getSykkel(id, success) {
    connection.query('select * from Sykkel where id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }
  updateSykkel(sykler, success) {
    connection.query(
      'update Sykkel set status=?, lokasjon_id=?, timepris=? where id=?',
      [sykler.status, sykler.lokasjon_id, sykler.timepris, sykler.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  deleteSykkel(id, success) {
    connection.query('delete from Sykkel where id = ?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }
  getUtstyr(id, success) {
    connection.query('select * from Utstyr where id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }
  updateUtstyr(utstyr, success) {
    connection.query(
      'update Utstyr set status=?, lokasjon_id=?, pris=? where id=?',
      [utstyr.status, utstyr.pris, utstyr.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  deleteUtstyr(id, success) {
    connection.query('delete from Utstyr where id = ?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }
  sok(type, lokasjon_id, modellnavn, timepris, success) {
    connection.query(
      'SELECT * FROM Sykkel WHERE status LIKE "Ledig" AND type LIKE ? AND lokasjon_id LIKE ? AND modellnavn LIKE ? AND timepris LIKE ?',
      [type, lokasjon_id, modellnavn, timepris],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  sokUtleid(type, lokasjon_id, modellnavn, timepris, success) {
    connection.query(
      'SELECT * FROM Sykkel WHERE status LIKE "Utleid" AND type LIKE ? AND lokasjon_id LIKE ? AND modellnavn LIKE ? AND timepris LIKE ?',
      [type, lokasjon_id, modellnavn, timepris],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  sokUtstyr(type, lokasjon_id, pris, success) {
    connection.query(
      'SELECT * FROM Utstyr WHERE status LIKE "Ledig" AND type LIKE ? AND lokasjon_id LIKE ? AND pris LIKE ?',
      [type, lokasjon_id, pris],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  sokUtstyrUtleid(type, lokasjon_id, pris, success) {
    connection.query(
      'SELECT * FROM Utstyr WHERE status LIKE "Utleid" AND type LIKE ? AND lokasjon_id LIKE ? AND pris LIKE ?',
      [type, lokasjon_id, pris],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  hentSykkelPåLager(success) {
    connection.query('select * from Sykkel where status="Ledig"', (error, results) => {
      if (error) return console.error(error);
      success(results);
    });
  }

  hentUtleideSykler(success) {
    connection.query('select * from Sykkel where status="Utleid"', (error, results) => {
      if (error) return console.error(error);
      success(results);
    });
  }
  hentUtstyrPåLager(success) {
    connection.query('select * from Utstyr where status="Ledig"', (error, results) => {
      if (error) return console.error(error);
      success(results);
    });
  }
  hentUtleideUtstyr(success) {
    connection.query('select * from Utstyr where status="Utleid"', (error, results) => {
      if (error) return console.error(error);
      success(results);
    });
  }
  addUtstyr(type, lokasjon_id, beskrivelse, status, pris, success) {
    connection.query(
      'insert into Utstyr (type, lokasjon_id, beskrivelse, status, pris) values (?, ?, ?, ?, ?)',
      [type, lokasjon_id, beskrivelse, status, pris],
      (error, results) => {
        if (error) return console.error(error);

        success(results.insertId);
      }
    );
  }
  hentReparasjoner(success) {
    connection.query('select * from Sykkel where status="Reparasjon"', (error, results) => {
      if (error) return console.error(error);
      success(results);
    });
  }
  hentReparasjon(id, success) {
    connection.query('select * from Sykkel where id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  ferdigReparasjoner(sykler, success) {
    connection.query('update Sykkel set status="Ledig" where id=?', [sykler.id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  henteSykkel(success) {
    connection.query(
      'SELECT * FROM Bestilling INNER JOIN Sykkel ON Sykkel.bestilling_id = Bestilling.id WHERE Bestilling.innleveringssted <> "Haugastøl" AND Sykkel.status = "Utleid" ORDER BY Bestilling.innlevering_dato ASC',
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }
  henteSykkelId(id, success) {
    connection.query('select * from Sykkel where id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }
  ferdigHentet(sykkel, success) {
    connection.query(
      'update Sykkel set status="Ledig", bestilling_id=NULL where id=?',
      [sykkel.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
}

export let lagerService = new LagerService();
