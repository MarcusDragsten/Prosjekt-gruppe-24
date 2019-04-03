import { connection } from '../src/mysql_connection';
import * as React from 'react';
import { Component } from 'react-simplified';

class BestillingService extends Component {
  leggTilKunde(epost, fornavn, etternavn, telefon, success) {
    connection.query(
      'insert into Kunder values (?, ?, ?, ?)',
      [epost, fornavn, etternavn, telefon],
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }

  epostValidering(success) {
    connection.query('select epost from Kunder', (error, results) => {
      if (error) return console.error(error);
      success(results);
    });
  }

  hentUtleveringsted(success) {
    connection.query('select * from Lokasjoner where har_lager = "Ja"', (error, results) => {
      if (error) return console.error(error);
      success(results);
    });
  }

  hentInnleveringsted(success) {
    connection.query('select * from Lokasjoner', (error, results) => {
      if (error) return console.error(error);
      success(results);
    });
  }

  leggInnBestilling(
    bestilling_type,
    kunde_epost,
    utleveringssted,
    innleveringssted,
    utlevering_dato,
    utlevering_tid,
    innlevering_dato,
    innlevering_tid,
    selger,
    success
  ) {
    connection.query(
      'insert into Bestilling (bestilling_type, kunde_epost, utleveringssted, innleveringssted, utlevering_dato, utlevering_tid, innlevering_dato, innlevering_tid, selger) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        bestilling_type,
        kunde_epost,
        utleveringssted,
        innleveringssted,
        utlevering_dato,
        utlevering_tid,
        innlevering_dato,
        innlevering_tid,
        selger
      ],
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }

  hentAktiveBestillinger(success) {
    connection.query(
      'SELECT * FROM Bestilling WHERE faktiskInnlevering_dato IS NULL AND faktiskInnlevering_tid IS NULL',
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }

  hentBestillingHistorikk(success) {
    connection.query(
      'SELECT * FROM Bestilling WHERE faktiskInnlevering_dato IS NOT NULL AND faktiskInnlevering_tid IS NOT NULL',
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }

  hentTotalRapport(success) {
    connection.query(
      'SELECT Bestilling.id, bestilling_type, utlevering_dato, utlevering_tid, faktiskInnlevering_dato, faktiskInnlevering_tid, epost, fornavn, etternavn, gevinst FROM Bestilling INNER JOIN Kunder ON Bestilling.kunde_epost = Kunder.epost WHERE faktiskInnlevering_dato IS NOT NULL AND faktiskInnlevering_tid IS NOT NULL ORDER BY id',
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }

  hentAnsatteRapport(success) {
    connection.query(
      'SELECT Bestilling.id, bestilling_type, utlevering_dato, utlevering_tid, faktiskInnlevering_dato, faktiskInnlevering_tid, Kunder.epost, Ansatte.fornavn, Ansatte.etternavn, Ansatte.telefon, gevinst FROM Bestilling INNER JOIN Kunder ON Bestilling.kunde_epost = Kunder.epost INNER JOIN Ansatte ON Bestilling.selger = Ansatte.id WHERE faktiskInnlevering_dato IS NOT NULL AND faktiskInnlevering_tid IS NOT NULL ORDER BY id',
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }

  hentBestilling(id, success) {
    connection.query('select * from Bestilling where id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }
  avbrytBestilling(id, success) {
    connection.query('DELETE FROM Bestilling WHERE id=?;', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }
  avbrytBestillingSykkel(id, success) {
    connection.query('UPDATE Sykkel SET status = "Ledig", bestilling_id = NULL WHERE bestilling_id=?;', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }
  avbrytBestillingUtstyr(id, success){
    connection.query('UPDATE Utstyr SET status = "Ledig", bestilling_id = NULL WHERE bestilling_id=?;', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  hentAnsatt(id, success) {
    connection.query('select * from Ansatte where id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  hentBestillingId(success) {
    connection.query('select LAST_INSERT_ID() AS lastInsertId', (error, results) => {
      if (error) return console.error(error);
      success(results);
    });
  }
  updateBestillinger(bestillinger, success) {
    connection.query(
      'update Bestilling set bestilling_type=?, utleveringssted=?, innleveringssted=?, innlevering_dato=?, utlevering_dato=?, kunde_epost=?, utlevering_tid=?, innlevering_tid=? where id=?',
      [
        bestillinger.bestilling_type,
        bestillinger.utleveringssted,
        bestillinger.innleveringssted,
        bestillinger.innlevering_dato,
        bestillinger.utlevering_dato,
        bestillinger.kunde_epost,
        bestillinger.utlevering_tid,
        bestillinger.innlevering_tid,
        bestillinger.id
      ],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
  deleteBestillinger(id, success) {
    connection.query('delete from Bestilling where id = ?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  sok(bestilling_type, kunde_epost, utleveringssted, innleveringssted, utlevering_dato, innlevering_dato, success) {
    connection.query(
      'SELECT * FROM Bestilling WHERE bestilling_type LIKE ? AND kunde_epost LIKE ? AND utleveringssted LIKE ? AND innleveringssted LIKE ? AND utlevering_dato >= ? AND innlevering_dato <= ? AND faktiskInnlevering_tid IS NULL AND faktiskInnlevering_dato IS NULL',
      [bestilling_type, kunde_epost, utleveringssted, innleveringssted, utlevering_dato, innlevering_dato],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  sok2(bestilling_type, kunde_epost, utleveringssted, innleveringssted, utlevering_dato, innlevering_dato, success) {
    connection.query(
      'SELECT * FROM Bestilling WHERE bestilling_type LIKE ? AND kunde_epost LIKE ? AND utleveringssted LIKE ? AND innleveringssted LIKE ? AND utlevering_dato >= ? AND innlevering_dato <= ? AND faktiskInnlevering_tid IS NOT NULL AND faktiskInnlevering_dato IS NOT NULL',
      [bestilling_type, kunde_epost, utleveringssted, innleveringssted, utlevering_dato, innlevering_dato],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  sok3(utlevering_dato, faktiskInnlevering_dato, success) {
    connection.query(
      'SELECT Bestilling.id, bestilling_type, utlevering_dato, utlevering_tid, faktiskInnlevering_dato, faktiskInnlevering_tid, epost, fornavn, etternavn, gevinst FROM Bestilling INNER JOIN Kunder ON Bestilling.kunde_epost = Kunder.epost WHERE utlevering_dato >= ? AND faktiskInnlevering_dato <= ? AND faktiskInnlevering_tid IS NOT NULL AND faktiskInnlevering_dato IS NOT NULL',
      [utlevering_dato, faktiskInnlevering_dato],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  sok4(utlevering_dato, faktiskInnlevering_dato, ansatteId, success) {
    connection.query(
      'SELECT Bestilling.id, bestilling_type, utlevering_dato, utlevering_tid, faktiskInnlevering_dato, faktiskInnlevering_tid, Kunder.epost, Ansatte.fornavn, Ansatte.etternavn, Ansatte.telefon, gevinst FROM Bestilling INNER JOIN Kunder ON Bestilling.kunde_epost = Kunder.epost INNER JOIN Ansatte on Bestilling.selger = Ansatte.id WHERE utlevering_dato >= ? AND faktiskInnlevering_dato <= ? AND Ansatte.id = ? AND faktiskInnlevering_tid IS NOT NULL AND faktiskInnlevering_dato IS NOT NULL',
      [utlevering_dato, faktiskInnlevering_dato, ansatteId],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  updateInnlevering(faktiskInnlevering_dato, faktiskInnlevering_tid, id, success) {
    connection.query(
      'update Bestilling set faktiskInnlevering_dato=? , faktiskInnlevering_tid=? where id=?',
      [faktiskInnlevering_dato, faktiskInnlevering_tid, id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
  updateSykkel(id, success) {
    connection.query(
      'update Sykkel set status="Ledig", bestilling_id = NULL where bestilling_id=?',
      [id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  updateUtstyr(id, success) {
    connection.query(
      'update Utstyr set status="Ledig", bestilling_id = NULL where bestilling_id=?',
      [id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  leverInn(id, success) {
    connection.query(
      'UPDATE Bestilling set faktiskInnlevering_dato = CURRENT_DATE(), faktiskInnlevering_tid = CURRENT_TIME() WHERE id = ?',
      [id],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
}

export let bestillingService = new BestillingService();
