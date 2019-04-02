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
      [utstyr.status, utstyr.lokasjon_id, utstyr.pris, utstyr.id],
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
      'SELECT Sykkel.id, modellnavn, type, hjul_størrelse, girsystem, ramme, bremse, timepris, Lokasjoner.område FROM Sykkel INNER JOIN Lokasjoner ON Lokasjoner.id = Sykkel.lokasjon_id WHERE status = "Ledig" AND type LIKE ? AND lokasjon_id LIKE ? AND modellnavn LIKE ? AND timepris LIKE ?',
      [type, lokasjon_id, modellnavn, timepris],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  sokUtleid(type, lokasjon_id, modellnavn, timepris, success) {
    connection.query(
      'SELECT Sykkel.id, modellnavn, type, hjul_størrelse, girsystem, ramme, bremse, timepris, Lokasjoner.område FROM Sykkel INNER JOIN Lokasjoner ON Lokasjoner.id = Sykkel.lokasjon_id WHERE status = "Utleid" AND type LIKE ? AND lokasjon_id LIKE ? AND modellnavn LIKE ? AND timepris LIKE ?',
      [type, lokasjon_id, modellnavn, timepris],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  sokUtstyr(type, lokasjon_id, pris, success) {
    connection.query(
      'SELECT Utstyr.id, type, beskrivelse, pris, Lokasjoner.område FROM Utstyr INNER JOIN Lokasjoner ON Lokasjoner.id = Utstyr.lokasjon_id WHERE status = "Ledig" AND type LIKE ? AND lokasjon_id LIKE ? AND pris LIKE ?',
      [type, lokasjon_id, pris],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  sokUtstyrUtleid(type, lokasjon_id, pris, success) {
    connection.query(
      'SELECT Utstyr.id, type, beskrivelse, pris, Lokasjoner.område FROM Utstyr INNER JOIN Lokasjoner ON Lokasjoner.id = Utstyr.lokasjon_id WHERE status = "Utleid" AND type LIKE ? AND lokasjon_id LIKE ? AND pris LIKE ?',
      [type, lokasjon_id, pris],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  hentSykkelPåLager(success) {
    connection.query(
      'SELECT Sykkel.id, modellnavn, type, hjul_størrelse, girsystem, ramme, bremse, timepris, Lokasjoner.område FROM Sykkel INNER JOIN Lokasjoner ON Lokasjoner.id = Sykkel.lokasjon_id WHERE status = "Ledig" ORDER BY Sykkel.id',
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }
  hentUtleideSykler(success) {
    connection.query(
      'SELECT Sykkel.id, modellnavn, type, hjul_størrelse, girsystem, ramme, bremse, timepris, Lokasjoner.område FROM Sykkel INNER JOIN Lokasjoner ON Lokasjoner.id = Sykkel.lokasjon_id WHERE status = "Utleid" ORDER BY Sykkel.id',
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }
  hentUtstyrPåLager(success) {
    connection.query(
      'SELECT Utstyr.id, type, beskrivelse, pris, Lokasjoner.område FROM Utstyr INNER JOIN Lokasjoner ON Lokasjoner.id = Utstyr.lokasjon_id WHERE status = "Ledig" ORDER BY Utstyr.id',
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }
  hentUtleideUtstyr(success) {
    connection.query(
      'SELECT Utstyr.id, type, beskrivelse, pris, Lokasjoner.område FROM Utstyr INNER JOIN Lokasjoner ON Lokasjoner.id = Utstyr.lokasjon_id WHERE status = "Utleid" ORDER BY Utstyr.id',
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
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

  henteSykkel(dato, success) {
    connection.query(
      'SELECT Sykkel.bestilling_id, Sykkel.id, Sykkel.type, Sykkel.modellnavn, Bestilling.innleveringssted, Bestilling.innlevering_dato, Bestilling.innlevering_tid FROM Bestilling INNER JOIN Sykkel ON Sykkel.bestilling_id = Bestilling.id INNER JOIN Lokasjoner ON Lokasjoner.id = Sykkel.lokasjon_id WHERE Bestilling.innleveringssted <> Lokasjoner.område AND Sykkel.status = "Utleid" AND Bestilling.innlevering_dato > ? AND Bestilling.faktiskInnlevering_dato IS NULL ORDER BY Bestilling.innlevering_dato ASC',
      [dato],
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
  hentSavnetSykkel(dato, success) {
    connection.query(
      'SELECT Sykkel.bestilling_id, Sykkel.id, Bestilling.innleveringssted, Bestilling.innlevering_dato, Bestilling.innlevering_tid, Sykkel.modellnavn, Bestilling.kunde_epost FROM Sykkel INNER JOIN Bestilling ON Sykkel.bestilling_id = Bestilling.id WHERE Bestilling.innlevering_dato < ? AND Bestilling.faktiskInnlevering_dato IS NULL ORDER BY Bestilling.innlevering_dato',
      [dato],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
}

export let lagerService = new LagerService();
