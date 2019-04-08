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
  updateSykkel(status, lokasjon, timepris, id, success) {
    connection.query(
      'update Sykkel set status=?, lokasjon_id=?, timepris=? where id=?',
      [status, lokasjon, timepris, id],
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
  updateUtstyr(status, lokasjon, pris, id, success) {
    connection.query(
      'update Utstyr set status=?, lokasjon_id=?, pris=? where id=?',
      [status, lokasjon, pris, id],
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
    connection.query(
      'SELECT Sykkel.id, Sykkel.type, Sykkel.modellnavn, Sykkel.status, Sykkel.lokasjon_id, Lokasjoner.område FROM Sykkel INNER JOIN Lokasjoner ON Sykkel.lokasjon_id = Lokasjoner.id WHERE status="Reparasjon"',
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }
  hentReparasjonerUtstyr(success) {
    connection.query(
      'SELECT Utstyr.id, Utstyr.type, Utstyr.status, Utstyr.lokasjon_id, Lokasjoner.område FROM Utstyr INNER JOIN Lokasjoner ON Utstyr.lokasjon_id = Lokasjoner.id WHERE status="Reparasjon"',
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }
  hentReparasjon(id, success) {
    connection.query('select * from Sykkel where id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }
  hentReparasjonUtstyr(id, success) {
    connection.query('select * from Utstyr where id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  ferdigReparasjoner(id, success) {
    connection.query('update Sykkel set status="Ledig" where id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }
  ferdigReparasjonerUtstyr(id, success) {
    connection.query('update Utstyr set status="Ledig" where id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }
  hentUtilgjengeligeID(id, success) {
    connection.query('select * from Sykkel where id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  tilbakeUtilgjengelige(id, success) {
    connection.query('update Sykkel set status="Ledig", bestilling_id = NULL where id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }
  tilbakeUtilgjengeligeUtstyr(id, success) {
    connection.query('update Utstyr set status="Ledig", bestilling_id = NULL where id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  slettUtilgjengelige(id, success) {
    connection.query('DELETE FROM Sykkel WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }
  slettUtilgjengeligeUtstyr(id, success) {
    connection.query('DELETE FROM Utstyr WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  henteSykkel(success) {
    connection.query(
      'SELECT Sykkel.bestilling_id, Sykkel.id, Sykkel.modellnavn, Bestilling.innleveringssted, Bestilling.innlevering_dato, Bestilling.innlevering_tid, Lokasjoner.område FROM Bestilling INNER JOIN Sykkel ON Sykkel.bestilling_id = Bestilling.id INNER JOIN Lokasjoner ON Lokasjoner.id = Sykkel.lokasjon_id WHERE Bestilling.innleveringssted <> Lokasjoner.område AND Sykkel.status = "Utleid" AND Bestilling.innlevering_dato >= CURRENT_DATE() AND Bestilling.faktiskInnlevering_dato IS NULL ORDER BY Bestilling.innlevering_dato ASC',

      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }
  henteUtstyr(success) {
    connection.query(
      'SELECT Utstyr.bestilling_id, Utstyr.id, Utstyr.type, Bestilling.innleveringssted, Bestilling.innlevering_dato, Bestilling.innlevering_tid, Lokasjoner.område FROM Bestilling INNER JOIN Utstyr ON Utstyr.bestilling_id = Bestilling.id INNER JOIN Lokasjoner ON Lokasjoner.id = Utstyr.lokasjon_id WHERE Bestilling.innleveringssted <> Lokasjoner.område AND Utstyr.status = "Utleid" AND Bestilling.innlevering_dato >= CURRENT_DATE() AND Bestilling.faktiskInnlevering_dato IS NULL ORDER BY Bestilling.innlevering_dato ASC',

      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }
  henteSykkelOversikt(success) {
    connection.query(
      'SELECT Sykkel.bestilling_id, Sykkel.id, Sykkel.modellnavn, Bestilling.innleveringssted, Bestilling.innlevering_dato, Bestilling.innlevering_tid, Lokasjoner.område FROM Bestilling INNER JOIN Sykkel ON Sykkel.bestilling_id = Bestilling.id INNER JOIN Lokasjoner ON Lokasjoner.id = Sykkel.lokasjon_id WHERE Bestilling.innleveringssted <> Lokasjoner.område AND Sykkel.status = "Utleid" AND Bestilling.innlevering_dato >= CURRENT_DATE() AND Bestilling.faktiskInnlevering_dato IS NULL ORDER BY Bestilling.innlevering_dato ASC LIMIT 3',

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
  ferdigHentet(id, success) {
    connection.query('update Sykkel set status="Ledig", bestilling_id=NULL where id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }
  hentSavnetSykkel(success) {
    connection.query(
      'SELECT Sykkel.bestilling_id, Sykkel.id, Bestilling.innleveringssted, Bestilling.innlevering_dato, Bestilling.innlevering_tid, Sykkel.modellnavn, Bestilling.kunde_epost, Lokasjoner.område FROM Sykkel INNER JOIN Bestilling ON Sykkel.bestilling_id = Bestilling.id INNER JOIN Lokasjoner ON Lokasjoner.id = Sykkel.lokasjon_id WHERE Bestilling.innlevering_dato < CURRENT_DATE() AND Bestilling.faktiskInnlevering_dato IS NULL ORDER BY Bestilling.innlevering_dato',

      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  hentLokasjon(success) {
    connection.query(
      'SELECT * FROM Lokasjoner WHERE har_lager = "Ja"',

      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  hentSykkelBestillingOversikt(success) {
    connection.query(
      'SELECT Sykkel.bestilling_id, Sykkel.id, Sykkel.type, Sykkel.modellnavn, Lokasjoner.område, Bestilling.utleveringssted, Bestilling.utlevering_dato, Bestilling.utlevering_tid FROM Sykkel INNER JOIN Bestilling ON Sykkel.bestilling_id = Bestilling.id INNER JOIN Lokasjoner ON Sykkel.lokasjon_id = Lokasjoner.id WHERE Sykkel.status = "Utleid" AND Sykkel.bestilling_id IS NOT NULL AND Bestilling.utlevering_dato >= CURRENT_DATE() ORDER BY Bestilling.utlevering_dato LIMIT 3',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  hentSykkelBestilling(success) {
    connection.query(
      'SELECT Sykkel.bestilling_id, Sykkel.id, Sykkel.type, Sykkel.modellnavn, Lokasjoner.område, Bestilling.utleveringssted, Bestilling.utlevering_dato, Bestilling.utlevering_tid FROM Sykkel INNER JOIN Bestilling ON Sykkel.bestilling_id = Bestilling.id INNER JOIN Lokasjoner ON Sykkel.lokasjon_id = Lokasjoner.id WHERE Sykkel.status = "Utleid" AND Sykkel.bestilling_id IS NOT NULL AND Bestilling.utlevering_dato >= CURRENT_DATE() ORDER BY Bestilling.utlevering_dato',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  hentSykkelBestillingUtstyr(success) {
    connection.query(
      'SELECT Utstyr.bestilling_id, Utstyr.id, Utstyr.type, Lokasjoner.område, Bestilling.utleveringssted, Bestilling.utlevering_dato, Bestilling.utlevering_tid FROM Utstyr INNER JOIN Bestilling ON Utstyr.bestilling_id = Bestilling.id INNER JOIN Lokasjoner ON Utstyr.lokasjon_id = Lokasjoner.id WHERE Utstyr.status = "Utleid" AND Utstyr.bestilling_id IS NOT NULL AND Bestilling.utlevering_dato >= CURRENT_DATE() ORDER BY Bestilling.utlevering_dato',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  gjørUtilgjengelig(success) {
    connection.query(
      'UPDATE Sykkel AS s INNER JOIN Bestilling AS b ON s.bestilling_id = b.id SET s.status = "Utilgjengelig" WHERE b.innlevering_dato < CURRENT_DATE AND b.faktiskInnlevering_dato IS NULL AND b.innlevering_dato IS NOT NULL',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  gjørUtilgjengeligUtstyr(success) {
    connection.query(
      'UPDATE Utstyr AS s INNER JOIN Bestilling AS b ON s.bestilling_id = b.id SET s.status = "Utilgjengelig" WHERE b.innlevering_dato < CURRENT_DATE AND b.faktiskInnlevering_dato IS NULL AND b.innlevering_dato IS NOT NULL',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  hentUtilgjengelig(success) {
    connection.query(
      'SELECT Sykkel.bestilling_id, Sykkel.id, Sykkel.type, Sykkel.modellnavn, Sykkel.status, Lokasjoner.område, Kunder.epost, Kunder.telefon, Bestilling.innleveringssted, Bestilling.innlevering_dato FROM Sykkel INNER JOIN Lokasjoner ON Sykkel.lokasjon_id = Lokasjoner.id INNER JOIN Bestilling ON Sykkel.bestilling_id = Bestilling.id INNER JOIN Kunder ON Bestilling.kunde_epost = Kunder.epost WHERE Sykkel.status = "Utilgjengelig" ORDER BY Bestilling.innlevering_dato',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  hentUtilgjengeligUtstyr(success) {
    connection.query(
      'SELECT Utstyr.bestilling_id, Utstyr.id, Utstyr.type, Utstyr.status, Lokasjoner.område, Kunder.epost, Kunder.telefon, Bestilling.innleveringssted, Bestilling.innlevering_dato FROM Utstyr INNER JOIN Lokasjoner ON Utstyr.lokasjon_id = Lokasjoner.id INNER JOIN Bestilling ON Utstyr.bestilling_id = Bestilling.id INNER JOIN Kunder ON Bestilling.kunde_epost = Kunder.epost WHERE Utstyr.status = "Utilgjengelig" ORDER BY Bestilling.innlevering_dato',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
}

export let lagerService = new LagerService();
