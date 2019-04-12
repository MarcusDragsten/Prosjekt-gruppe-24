import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { lagerService } from '../services/lagerService.js';
import { bestillingService } from '../services/bestillingService.js';
import { ansatteService } from '../services/adminService.js';
import { sykkelService } from '../services/sykkelService.js';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

export class LagerStartside extends Component {
  //Startside for bedriftens lageransatte
  ansatt = [];

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Startside - Lager</h1>
          <button type="button" id="loggUtKnapp" class="btn" onClick={this.tilbake}>
            Logg ut
          </button>
        </div>
        <div id="salgStartsideKnapperDiv">
          <h2>
            Velkommen
            <br />
            {this.ansatt.fornavn} {this.ansatt.etternavn}{' '}
          </h2>

          <button type="button" id="knapperStartside" class="btn btn-sucess btn-lg btn-block" onClick={this.sykkel}>
            Sykkel
          </button>
          <button type="button" id="knapperStartside" class="btn btn-sucess btn-lg btn-block" onClick={this.utstyr}>
            Utstyr
          </button>
          <button type="button" id="knapperStartside" class="btn btn-sucess btn-lg btn-block" onClick={this.leggTil}>
            Legg til
          </button>
        </div>
      </div>
    );
  }

  mounted() {
    ansatteService.getAnsatt(this.props.match.params.ansattId, ansatt => {
      this.ansatt = ansatt;
    });
  }
  sykkel() {
    history.push('/lagerStartsideSykkel/' + this.props.match.params.ansattId);
  }
  utstyr() {
    history.push('/lagerStartsideUtstyr/' + this.props.match.params.ansattId);
  }
  leggTil() {
    history.push('/LagerStartsideLeggTil/' + this.props.match.params.ansattId);
  }
  tilbake() {
    history.push('/');
  }
}
export class LagerStartsideSykkel extends Component {
  //Her finner lagermedarbeiderne full oversikt over bedriftens sykler

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Sykkel - Lager</h1>
          <button type="button" id="loggUtKnapp" class="btn" onClick={this.tilbake}>
            Tilbake til startsiden
          </button>
        </div>
        <div id="salgStartsideKnapperDiv">
          <h2>Oversikt over Sykler</h2>
          <button
            type="button"
            id="knapperStartside"
            class="btn btn-sucess btn-lg btn-block"
            onClick={this.oversiktUtleveringSykkel}
          >
            Skal ut i bestilling
          </button>
          <button
            type="button"
            id="knapperStartside"
            class="btn btn-sucess btn-lg btn-block"
            onClick={this.oversiktInnleveringSykkel}
          >
            Trenger transport
          </button>
          <button
            type="button"
            id="knapperStartside"
            class="btn btn-sucess btn-lg btn-block"
            onClick={this.ledigSykkel}
          >
            På Lager
          </button>
          <button
            type="button"
            id="knapperStartside"
            class="btn btn-sucess btn-lg btn-block"
            onClick={this.utleidSykkel}
          >
            Utleid
          </button>
          <button
            type="button"
            id="knapperStartside"
            class="btn btn-sucess btn-lg btn-block"
            onClick={this.reparasjonIkkeLevertSykkel}
          >
            Utilgjengelig
          </button>
        </div>
      </div>
    );
  }

  oversiktUtleveringSykkel() {
    history.push('/sykkelBestilling/' + this.props.match.params.ansattId);
  }
  oversiktInnleveringSykkel() {
    history.push('/henteSykkel/' + this.props.match.params.ansattId);
  }
  ledigSykkel() {
    history.push('/ledigSykkel/' + this.props.match.params.ansattId);
  }
  utleidSykkel() {
    history.push('/utleidSykkel/' + this.props.match.params.ansattId);
  }
  reparasjonIkkeLevertSykkel() {
    history.push('/utilgjengeligSykler/' + this.props.match.params.ansattId);
  }
  tilbake() {
    history.push('/lagerStartside/' + this.props.match.params.ansattId);
  }
}
export class LagerStartsideUtstyr extends Component {
  //Her finner lagermedarbeiderne full oversikt over bedriftens utstyr

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Utstyr - Lager</h1>
          <button type="button" id="loggUtKnapp" class="btn" onClick={this.tilbake}>
            Tilbake til startsiden
          </button>
        </div>
        <div id="salgStartsideKnapperDiv">
          <h2>Oversikt over Utstyr</h2>

          <button
            type="button"
            id="knapperStartside"
            class="btn btn-sucess btn-lg btn-block"
            onClick={this.oversiktUtleveringUtstyr}
          >
            Skal ut i bestilling
          </button>
          <button
            type="button"
            id="knapperStartside"
            class="btn btn-sucess btn-lg btn-block"
            onClick={this.oversiktInnleveringUtstyr}
          >
            Trenger transport
          </button>
          <button
            type="button"
            id="knapperStartside"
            class="btn btn-sucess btn-lg btn-block"
            onClick={this.ledigUtstyr}
          >
            På Lager
          </button>
          <button
            type="button"
            id="knapperStartside"
            class="btn btn-sucess btn-lg btn-block"
            onClick={this.utleidUtstyr}
          >
            Utleid
          </button>
          <button
            type="button"
            id="knapperStartside"
            class="btn btn-sucess btn-lg btn-block"
            onClick={this.utilgjengelig}
          >
            Utilgjengelig
          </button>
        </div>
      </div>
    );
  }
  oversiktUtleveringUtstyr() {
    history.push('/utstyrBestilling/' + this.props.match.params.ansattId);
  }
  oversiktInnleveringUtstyr() {
    history.push('/henteUtstyr/' + this.props.match.params.ansattId);
  }
  ledigUtstyr() {
    history.push('/ledigutstyr/' + this.props.match.params.ansattId);
  }
  utleidUtstyr() {
    history.push('/utleidutstyr/' + this.props.match.params.ansattId);
  }
  utilgjengelig() {
    history.push('/utilgjengeligUtstyr/' + this.props.match.params.ansattId);
  }
  tilbake() {
    history.push('/lagerStartside/' + this.props.match.params.ansattId);
  }
}
export class LagerStartsideLeggTil extends Component {
  //Her har lagermedarbeiderne mulighet til å legge til nye sykler og utstyr

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Legg Til - Lager</h1>
          <button type="button" id="loggUtKnapp" class="btn" onClick={this.tilbake}>
            Tilbake til startsiden
          </button>
        </div>
        <div id="salgStartsideKnapperDiv">
          <h2>Legg til sykler/utstyr</h2>
          <button
            type="button"
            id="knapperStartside"
            class="btn btn-sucess btn-lg btn-block"
            onClick={this.leggTilSykkel}
          >
            Legg til sykler
          </button>
          <button
            type="button"
            id="knapperStartside"
            class="btn btn-sucess btn-lg btn-block"
            onClick={this.leggTilUtstyr}
          >
            Legg til utstyr
          </button>
        </div>
      </div>
    );
  }

  leggTilSykkel() {
    history.push('/leggTilSykkel/' + this.props.match.params.ansattId);
  }
  leggTilUtstyr() {
    history.push('/leggTilUtstyr/' + this.props.match.params.ansattId);
  }
  tilbake() {
    history.push('/lagerStartside/' + this.props.match.params.ansattId);
  }
}
export class SykkelBestilling extends Component {
  //Viser oversikt over hvilke sykler som skal ut i en bestilling. Sortert slik at de øverste syklene i tabellen skal ut først.

  syklerIBestilling = [];
  tabell = [];

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Sykkel - Lager</h1>
          <button type="button" id="loggUtKnapp" class="btn" onClick={this.tilbake}>
            Tilbake
          </button>
        </div>
        <h2>Oversikt over sykler som skal ut i en bestilling</h2>
        <br />
        <table id="customers" align="center">
          <tbody>{this.tabell}</tbody>
        </table>
      </div>
    );
  }

  mounted() {
    //Kjører en spørring opp mot databasen som henter sykler som har status som "Utleid" og en utleveringsdato som enda ikke har vært.
    lagerService.hentSykkelBestilling(syklerIBestilling => {
      this.syklerIBestilling = syklerIBestilling;
      this.createTable();
    });
  }
  createTable() {
    if (this.syklerIBestilling == 0) {
      alert('Det er ingen sykler som skal gjøres klar for utlevering');
      history.push('/lagerStartsideSykkel/' + this.props.match.params.ansattId);
    } else {
      this.tabell.push(
        <tr>
          <th>Bestillings ID</th>
          <th>Sykkel ID</th>
          <th>Type</th>
          <th>Modellnavn</th>
          <th>Tilhørighet</th>
          <th>Utleveringssted</th>
          <th>Utleveringssdato</th>
          <th>Utleveringstid</th>
        </tr>
      );

      for (let i = 0; i < this.syklerIBestilling.length; i++) {
        this.tabell.push(
          <tr>
            <td>{this.syklerIBestilling[i].bestilling_id}</td>
            <td>{this.syklerIBestilling[i].id}</td>
            <td>{this.syklerIBestilling[i].type}</td>
            <td>{this.syklerIBestilling[i].modellnavn}</td>
            <td>{this.syklerIBestilling[i].område}</td>
            <td>{this.syklerIBestilling[i].utleveringssted}</td>
            <td>{this.syklerIBestilling[i].utlevering_dato}</td>
            <td>{this.syklerIBestilling[i].utlevering_tid}</td>
          </tr>
        );
      }
    }
  }

  tilbake() {
    history.push('/lagerStartsideSykkel/' + this.props.match.params.ansattId);
  }
}

export class HenteSykkel extends Component {
  //Viser en oversikt over hvilke sykler som må hentes/transporteres fra bestillingens innleveringssted til lageret der sykkelen tilhører.
  sykkel = [];
  tabell6 = [];

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Sykkel - Lager</h1>
          <button type="button" id="loggUtKnapp" class="btn" onClick={this.tilbake}>
            Tilbake
          </button>
        </div>
        <h2>Oversikt over sykler som trenger transport tilbake til lager</h2>
        <br />
        <table id="customers" align="center">
          <tbody>{this.tabell6}</tbody>
        </table>
      </div>
    );
  }

  mounted() {
    //Kjører en spørring opp mot databasen som henter sykler som er i en bestilling og har innleveringssted en ikke matcher sykkelens tilhørighet.
    lagerService.henteSykkel(sykkel => {
      this.sykkel = sykkel;
      this.createTable6();
    });
  }

  createTable6() {
    if (this.sykkel == 0) {
      alert('Det er ingen sykler som trenger transport tilbake til lager');
      history.push('/lagerStartsideSykkel/' + this.props.match.params.ansattId);
    } else {
      this.tabell6.push(
        <tr>
          <th>Bestillings ID</th>
          <th>Sykkel ID</th>
          <th>Modellnavn</th>
          <th>Tilhørighet</th>
          <th>Innleveringssted</th>
          <th>Dato</th>
          <th>Tid</th>
        </tr>
      );

      for (let i = 0; i < this.sykkel.length; i++) {
        this.tabell6.push(
          <tr>
            <td>{this.sykkel[i].bestilling_id}</td>
            <td>{this.sykkel[i].id}</td>
            <td>{this.sykkel[i].modellnavn}</td>
            <td>{this.sykkel[i].område}</td>
            <td>{this.sykkel[i].innleveringssted}</td>
            <td>{this.sykkel[i].innlevering_dato}</td>
            <td>{this.sykkel[i].innlevering_tid}</td>
          </tr>
        );
      }
    }
  }

  tilbake() {
    history.push('/lagerStartsideSykkel/' + this.props.match.params.ansattId);
  }
}

export class LedigSykkel extends Component {
  //Viser en oversikt over ledige sykler på lager

  sykkelPåLager = [];
  tabell = [];
  tilhørighet = [];

  type = '%';
  lokasjon_id = '%';
  modellnavn = '%';
  timepris = '%';

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Sykkel - Lager</h1>
          <button type="button" id="loggUtKnapp" class="btn" onClick={this.tilbake}>
            Tilbake
          </button>
        </div>
        <h2>Oversikt over sykler på lager</h2>
        <button type="button" id="toggleFiltrerKnapp" class="btn" onClick={this.toggleFiltrer}>
          Filtrer
        </button>
        <br />
        <div id="filtrerRapportAnsatteDiv">
          <form onSubmit={this.sok}>
            <div class="form-inline">
              <h3>Filtrer sykler</h3>
              <input
                type="text"
                id="type"
                placeholder="Sykkeltype"
                class="form-control form-control-lg"
                onChange={e => (this.type = event.target.value)}
              />
              <input
                type="text"
                id="modellnavn"
                class="form-control form-control-lg"
                placeholder="Modellnavn"
                onChange={e => (this.modellnavn = event.target.value)}
              />
              <input
                type="number"
                id="timepris"
                class="form-control form-control-lg"
                placeholder="Timepris"
                onChange={e => (this.timepris = event.target.value)}
              />
              <select
                id="lokasjon_id"
                class="form-control form-control-lg"
                onChange={e => (this.lokasjon_id = event.target.value)}
              >
                {' '}
                <option value="" defaultValue>
                  Tilhørighet:
                </option>
                {this.tilhørighet.map(tilhørighet => (
                  <option value={tilhørighet.id} key={tilhørighet.id}>
                    {tilhørighet.område}
                  </option>
                ))}
              </select>
              <br />
              <button type="submit" class="btn">
                Søk
              </button>
              <button type="button" class="btn" onClick={this.nullstill}>
                Nullstill
              </button>
            </div>
          </form>
        </div>
        <br />
        <table id="customers" align="center">
          <tbody>{this.tabell}</tbody>
        </table>
      </div>
    );
  }

  mounted() {
    //Gjør det umulig for bruker å søke etter negative verdier
    var number = document.getElementById('timepris');
    number.onkeydown = function(e) {
      if (!((e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58) || e.keyCode == 8)) {
        return false;
      }
    };
    lagerService.hentSykkelPåLager(sykkelPåLager => {
      this.sykkelPåLager = sykkelPåLager;
    });
    lagerService.hentLokasjon(tilhørighet => {
      this.tilhørighet = tilhørighet;
      this.createtable();
    });
  }
  toggleFiltrer() {
    var x = document.getElementById('filtrerRapportAnsatteDiv');
    if (window.getComputedStyle(x).display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  createtable() {
    if (this.sykkelPåLager == 0) {
      alert('Ingen sykler matchet søket!');
    } else {
      this.tabell = '';
      this.tabell = [];
      this.tabell.push(
        <tr>
          <th>Id</th>
          <th>Modell</th>
          <th>Type</th>
          <th>Størrelse hjul</th>
          <th>Girsystem</th>
          <th>Ramme</th>
          <th>Bremse</th>
          <th>Tilhørighet</th>
          <th>Timepris</th>
          <th>Endre informasjon</th>
        </tr>
      );

      for (let i = 0; i < this.sykkelPåLager.length; i++) {
        this.tabell.push(
          <tr>
            <td>{this.sykkelPåLager[i].id}</td>
            <td>{this.sykkelPåLager[i].modellnavn}</td>
            <td>{this.sykkelPåLager[i].type}</td>
            <td>{this.sykkelPåLager[i].hjul_størrelse}</td>
            <td>{this.sykkelPåLager[i].girsystem}</td>
            <td>{this.sykkelPåLager[i].ramme}</td>
            <td>{this.sykkelPåLager[i].bremse}</td>
            <td>{this.sykkelPåLager[i].område}</td>
            <td>{this.sykkelPåLager[i].timepris}</td>
            <td>
              <NavLink to={'/redigerSykkel/' + this.props.match.params.ansattId + this.sykkelPåLager[i].id + '/edit'}>
                {' '}
                Endre{' '}
              </NavLink>
            </td>
          </tr>
        );
      }
    }
  }

  tilbake() {
    history.push('/lagerStartsideSykkel/' + this.props.match.params.ansattId);
  }
  sok(e) {
    e.preventDefault();
    if (this.sykkelPåLager.type == '') this.type = '%';
    if (this.sykkelPåLager.lokasjon_id == '') this.lokasjon_id = '%';
    if (this.sykkelPåLager.modellnavn == '') this.modellnavn = '%';
    if (this.sykkelPåLager.timepris == '') this.timepris = '%';

    lagerService.sok(this.type, this.lokasjon_id, this.modellnavn, this.timepris, sok => {
      this.sykkelPåLager = sok;
      this.createtable();
    });
  }

  nullstill(e) {
    this.type = '';
    this.lokasjon_id = '';
    this.modellnavn = '';
    this.timepris = '';

    document.getElementById('type').value = '';
    document.getElementById('lokasjon_id').value = '';
    document.getElementById('modellnavn').value = '';
    document.getElementById('timepris').value = '';

    e.preventDefault();
    if (this.type == '') this.type = '%';
    if (this.lokasjon_id == '') this.lokasjon_id = '%';
    if (this.modellnavn == '') this.modellnavn = '%';
    if (this.timepris == '') this.timepris = '%';

    lagerService.sok(this.type, this.lokasjon_id, this.modellnavn, this.timepris, sok => {
      this.sykkelPåLager = sok;
      this.createtable();
    });
  }
}

export class UtleidSykkel extends Component {
  //Viser en oversikt over utleide sykler

  sykkelUtleid = [];
  tabell = [];
  tilhørighet = [];

  type = '%';
  modellnavn = '%';
  lokasjon_id = '%';
  timepris = '%';

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Sykkel - Lager</h1>
          <button type="button" id="loggUtKnapp" class="btn" onClick={this.tilbake}>
            Tilbake
          </button>
        </div>
        <h2>Oversikt over utleide sykler</h2>
        <button type="button" id="toggleFiltrerKnapp" class="btn" onClick={this.toggleFiltrer}>
          Filtrer
        </button>
        <br />
        <div id="filtrerRapportAnsatteDiv">
          <form onSubmit={this.sokUtleid}>
            <div class="form-inline">
              <h3>Filtrer sykler</h3>
              <input
                type="text"
                id="type"
                placeholder="Sykkeltype"
                class="form-control form-control-lg"
                onChange={e => (this.type = event.target.value)}
              />
              <input
                type="text"
                class="form-control form-control-lg"
                id="modellnavn"
                placeholder="Modellnavn"
                onChange={e => (this.modellnavn = event.target.value)}
              />
              <input
                type="number"
                class="form-control form-control-lg"
                id="timepris"
                placeholder="Timepris"
                onChange={e => (this.timepris = event.target.value)}
              />
              <select
                id="lokasjon_id"
                class="form-control form-control-lg"
                onChange={e => (this.lokasjon_id = event.target.value)}
              >
                {' '}
                <option value="" defaultValue>
                  Tilhørighet
                </option>
                {this.tilhørighet.map(tilhørighet => (
                  <option value={tilhørighet.id} key={tilhørighet.id}>
                    {tilhørighet.område}
                  </option>
                ))}
              </select>
              <br />
              <button type="submit" class="btn">
                Søk
              </button>
              <button type="button" class="btn" onClick={this.nullstill}>
                Nullstill
              </button>
            </div>
          </form>
        </div>
        <br />
        <table id="customers" align="center">
          <tbody>{this.tabell}</tbody>
        </table>
      </div>
    );
  }

  mounted() {
    //Gjør det umulig for bruker å søke etter negative verdier
    var number = document.getElementById('timepris');
    number.onkeydown = function(e) {
      if (!((e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58) || e.keyCode == 8)) {
        return false;
      }
    };
    lagerService.hentUtleideSykler(sykkelUtleid => {
      this.sykkelUtleid = sykkelUtleid;
    });
    //Henter lokasjoner som er lager
    lagerService.hentLokasjon(tilhørighet => {
      this.tilhørighet = tilhørighet;
      this.createtable();
    });
  }
  toggleFiltrer() {
    var x = document.getElementById('filtrerRapportAnsatteDiv');
    if (window.getComputedStyle(x).display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  createtable() {
    if (this.sykkelUtleid == 0) {
      alert('Ingen sykler matchet søket!');
    } else {
      this.tabell = '';
      this.tabell = [];
      this.tabell.push(
        <tr>
          <th>Id</th>
          <th>Modell</th>
          <th>Type</th>
          <th>Størrelse hjul</th>
          <th>Girsystem</th>
          <th>Ramme</th>
          <th>Bremse</th>
          <th>Tilhørighet</th>
          <th>Timepris</th>
        </tr>
      );

      for (let i = 0; i < this.sykkelUtleid.length; i++) {
        this.tabell.push(
          <tr>
            <td>{this.sykkelUtleid[i].id}</td>
            <td>{this.sykkelUtleid[i].modellnavn}</td>
            <td>{this.sykkelUtleid[i].type}</td>
            <td>{this.sykkelUtleid[i].hjul_størrelse}</td>
            <td>{this.sykkelUtleid[i].girsystem}</td>
            <td>{this.sykkelUtleid[i].ramme}</td>
            <td>{this.sykkelUtleid[i].bremse}</td>
            <td>{this.sykkelUtleid[i].område}</td>
            <td>{this.sykkelUtleid[i].timepris}</td>
          </tr>
        );
      }
    }
  }
  tilbake() {
    history.push('/lagerStartsideSykkel/' + this.props.match.params.ansattId);
  }
  sokUtleid(e) {
    e.preventDefault();
    if (this.type == '') this.type = '%';
    if (this.lokasjon_id == '') this.lokasjon_id = '%';
    if (this.modellnavn == '') this.modellnavn = '%';
    if (this.timepris == '') this.timepris = '%';

    lagerService.sokUtleid(this.type, this.lokasjon_id, this.modellnavn, this.timepris, sokUtleid => {
      this.sykkelUtleid = sokUtleid;
      this.createtable();
    });
  }

  nullstill(e) {
    this.type = '';
    this.lokasjon_id = '';
    this.modellnavn = '';
    this.timepris = '';

    document.getElementById('type').value = '';
    document.getElementById('lokasjon_id').value = '';
    document.getElementById('modellnavn').value = '';
    document.getElementById('timepris').value = '';

    e.preventDefault();
    if (this.type == '') this.type = '%';
    if (this.lokasjon_id == '') this.lokasjon_id = '%';
    if (this.modellnavn == '') this.modellnavn = '%';
    if (this.timepris == '') this.timepris = '%';

    lagerService.sokUtleid(this.type, this.lokasjon_id, this.modellnavn, this.timepris, sokUtleid => {
      this.sykkelUtleid = sokUtleid;
      this.createtable();
    });
  }
}
export class UtilgjengeligeSykler extends Component {
  //Siden består av to knapper som begge får frem en tabell når de blir trykket på. Den ene tabellen viser sykler som trenger reparasjoner, mens den andre viser sykler som har vært ut i en bestilling men ikke har blitt levert tilbake i tide. Disse syklene er enten savnet eller stjålet.

  utilgjengelig = [];
  reparasjon = [];
  gjørutilgjengelig = [];
  tabell = [];

  type = '%';
  modellnavn = '%';
  status = '%';

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Sykkel - Lager</h1>
          <button type="button" id="loggUtKnapp" class="btn" onClick={this.tilbake}>
            Tilbake
          </button>
        </div>
        <h2>Oversikt over utilgjengelige sykler</h2>
        <p>
          <i>
            Utilgjengelige sykler består av sykler som trenger eventuelle reparasjoner eller har ikke blitt levert
            tilbake av kunden i tide.
          </i>
        </p>
        <br />
        <button
          type="submit"
          id="knapperStartside"
          class="btn btn-sucess btn-lg btn-block"
          onClick={this.createTableRep}
        >
          Trenger reparasjon
        </button>
        <button
          type="button"
          id="knapperStartside"
          class="btn btn-sucess btn-lg btn-block"
          onClick={this.createTableIkkeLevert}
        >
          Ikke levert tilbake
        </button>
        <br />
        <table id="customers" align="center">
          <tbody>{this.tabell}</tbody>
        </table>
      </div>
    );
  }

  mounted() {
    //Kjører en spørring som gjør om sykkelens status til "Utilgjengelig" når fristen for å levere inn sykkelen er forbi
    lagerService.gjørUtilgjengelig(gjørutilgjengelig => {
      this.gjørutilgjengelig = gjørutilgjengelig;
    });
    //Henter sykler som har en status som tilsier at de trenger reparasjoner
    lagerService.hentReparasjoner(reparasjon => {
      this.reparasjon = reparasjon;
    });
    //Henter sykler som har status "Utilgjengelig"
    lagerService.hentUtilgjengelig(utilgjengelig => {
      this.utilgjengelig = utilgjengelig;
    });
  }
  createTableRep() {
    //Tabell over sykler som trenger reparasjoner
    if (this.reparasjon == 0) {
      alert('Det er ingen sykler i denne tabellen');
    } else {
      this.tabell = '';
      this.tabell = [];
      this.tabell.push(
        <tr>
          <th>Sykkel ID</th>
          <th>Modellnavn</th>
          <th>Sykkeltype</th>
          <th>Tilhørighet</th>
          <th>Endre informasjon</th>
        </tr>
      );

      for (let i = 0; i < this.reparasjon.length; i++) {
        this.tabell.push(
          <tr>
            <td>{this.reparasjon[i].id}</td>
            <td>{this.reparasjon[i].modellnavn}</td>
            <td>{this.reparasjon[i].type}</td>
            <td>{this.reparasjon[i].område}</td>
            <td>
              <NavLink to={'/redigerSykkel/' + this.props.match.params.ansattId + this.reparasjon[i].id + '/edit'}>
                {' '}
                Endre{' '}
              </NavLink>
            </td>
          </tr>
        );
      }
    }
  }
  createTableIkkeLevert() {
    //Tabell over sykler som ikke har blitt levert tilbake i tide
    if (this.utilgjengelig == 0) {
      alert('Det er ingen sykler i denne tabellen');
    } else {
      this.tabell = '';
      this.tabell = [];
      this.tabell.push(
        <tr>
          <th>Bestillings ID</th>
          <th>Sykkel ID</th>
          <th>Modellnavn</th>
          <th>Tilhørighet</th>
          <th>Innleveringssted</th>
          <th>Innleveringsdato</th>
          <th>Kundens epost</th>
          <th>Kundens telefon</th>
          <th>Endre informasjon</th>
        </tr>
      );

      for (let i = 0; i < this.utilgjengelig.length; i++) {
        this.tabell.push(
          <tr>
            <td>{this.utilgjengelig[i].bestilling_id}</td>
            <td>{this.utilgjengelig[i].id}</td>
            <td>{this.utilgjengelig[i].modellnavn}</td>
            <td>{this.utilgjengelig[i].område}</td>
            <td>{this.utilgjengelig[i].innleveringssted}</td>
            <td>{this.utilgjengelig[i].innlevering_dato}</td>
            <td>{this.utilgjengelig[i].epost}</td>
            <td>{this.utilgjengelig[i].telefon}</td>
            <td>
              <NavLink to={'/redigerSykkel/' + this.props.match.params.ansattId + this.utilgjengelig[i].id + '/edit'}>
                {' '}
                Endre{' '}
              </NavLink>
            </td>
          </tr>
        );
      }
    }
  }
  tilbake() {
    history.push('/lagerStartsideSykkel/' + this.props.match.params.ansattId);
  }
}
export class UtstyrBestilling extends Component {
  //Viser en oversikt over utstyr som skal ut i en bestilling.

  utstyrIBestilling = [];
  tabell = [];

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Utstyr - Lager</h1>
          <button type="button" id="loggUtKnapp" class="btn" onClick={this.tilbake}>
            Tilbake
          </button>
        </div>
        <h2>Oversikt over utstyr som skal ut i en bestilling</h2>
        <br />
        <table id="customers" align="center">
          <tbody>{this.tabell}</tbody>
        </table>
      </div>
    );
  }

  mounted() {
    //Kjører en spørring opp mot databasen som henter utstyr som har status som "Utleid" og en utleveringsdato som enda ikke har vært.
    lagerService.hentSykkelBestillingUtstyr(utstyrIBestilling => {
      this.utstyrIBestilling = utstyrIBestilling;
      this.createTable();
    });
  }
  createTable() {
    if (this.utstyrIBestilling == 0) {
      alert('Det er ingen utstyr som skal gjøres klar for utlevering');
      history.push('/lagerStartsideUtstyr/' + this.props.match.params.ansattId);
    } else {
      this.tabell.push(
        <tr>
          <th>Bestillings ID</th>
          <th>Utstyr ID</th>
          <th>Type</th>
          <th>Tilhørighet</th>
          <th>Utleveringssted</th>
          <th>Utleveringssdato</th>
          <th>Utleveringstid</th>
        </tr>
      );

      for (let i = 0; i < this.utstyrIBestilling.length; i++) {
        this.tabell.push(
          <tr>
            <td>{this.utstyrIBestilling[i].bestilling_id}</td>
            <td>{this.utstyrIBestilling[i].id}</td>
            <td>{this.utstyrIBestilling[i].type}</td>
            <td>{this.utstyrIBestilling[i].område}</td>
            <td>{this.utstyrIBestilling[i].utleveringssted}</td>
            <td>{this.utstyrIBestilling[i].utlevering_dato}</td>
            <td>{this.utstyrIBestilling[i].utlevering_tid}</td>
          </tr>
        );
      }
    }
  }

  tilbake() {
    history.push('/lagerStartsideUtstyr/' + this.props.match.params.ansattId);
  }
}

export class HenteUtstyr extends Component {
  //Viser en oversikt over utstyr som er ute i en bestilling og har innleveringssted et annet sted enn utstyrets tilhørighet

  utstyr = [];
  tabell = [];

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Utstyr - Lager</h1>
          <button type="button" id="loggUtKnapp" class="btn" onClick={this.tilbake}>
            Tilbake
          </button>
        </div>
        <h2>Oversikt over utstyr som trenger transport tilbake til lager</h2>
        <br />
        <table id="customers" align="center">
          <tbody>{this.tabell}</tbody>
        </table>
      </div>
    );
  }

  mounted() {
    //Kjører en spørring opp mot databasen som henter utstyr som er i en bestilling og har innleveringssted en ikke matcher utstyrets tilhørighet
    lagerService.henteUtstyr(utstyr => {
      this.utstyr = utstyr;
      this.createTable();
    });
  }

  createTable() {
    if (this.utstyr == 0) {
      alert('Det er ingen utstyr som trenger transport tilbake til lager');
      history.push('/lagerStartsideUtstyr/' + this.props.match.params.ansattId);
    } else {
      this.tabell.push(
        <tr>
          <th>Bestillings ID</th>
          <th>Utstyrs ID</th>
          <th>Tilhørighet</th>
          <th>Innleveringssted</th>
          <th>Dato</th>
          <th>Tid</th>
        </tr>
      );

      for (let i = 0; i < this.utstyr.length; i++) {
        this.tabell.push(
          <tr>
            <td>{this.utstyr[i].bestilling_id}</td>
            <td>{this.utstyr[i].id}</td>
            <td>{this.utstyr[i].område}</td>
            <td>{this.utstyr[i].innleveringssted}</td>
            <td>{this.utstyr[i].innlevering_dato}</td>
            <td>{this.utstyr[i].innlevering_tid}</td>
          </tr>
        );
      }
    }
  }

  tilbake() {
    history.push('/lagerStartsideUtstyr/' + this.props.match.params.ansattId);
  }
}

export class LedigUtstyr extends Component {
  //Viser en oversikt over ledig utstyr på lager

  utstyrPåLager = [];
  tabell = [];
  tilhørighet = [];

  type = '%';
  lokasjon_id = '%';
  pris = '%';

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Utstyr - Lager</h1>
          <button type="button" id="loggUtKnapp" class="btn" onClick={this.tilbake}>
            Tilbake
          </button>
        </div>
        <h2>Oversikt over utstyr på lager</h2>
        <button type="button" id="toggleFiltrerKnapp" class="btn" onClick={this.toggleFiltrer}>
          Filtrer
        </button>
        <br />
        <div id="filtrerRapportAnsatteDiv">
          <form onSubmit={this.sok}>
            <div class="form-inline">
              <h3>Filtrer utstyr</h3>
              <select id="type" class="form-control form-control-lg" onChange={e => (this.type = event.target.value)}>
                <option value="" defaultValue>
                  Utstyrstype
                </option>
                <option value="Hjelm voksne">Hjelm for voksne</option>
                <option value="Hjelm barn">Hjelm for barn</option>
                <option value="Sykkellås">Sykkellås</option>
                <option value="Barnesete">Barnesete</option>
                <option value="Sykkelkurv">Sykkelkurv</option>
                <option value="Sykkelstativ">Sykkelstativ til hund</option>
              </select>
              <select
                id="lokasjon_id"
                class="form-control form-control-lg"
                onChange={e => (this.lokasjon_id = event.target.value)}
              >
                {' '}
                <option value="" defaultValue>
                  Tilhørighet
                </option>
                {this.tilhørighet.map(tilhørighet => (
                  <option value={tilhørighet.id} key={tilhørighet.id}>
                    {tilhørighet.område}
                  </option>
                ))}
              </select>
              <input
                type="number"
                id="pris"
                class="form-control form-control-lg"
                min="0"
                placeholder="Timepris"
                onChange={e => (this.pris = event.target.value)}
              />
              <br />
              <button type="submit" class="btn">
                Søk
              </button>
              <button type="button" class="btn" onClick={this.nullstill}>
                Nullstill
              </button>
            </div>
          </form>
        </div>
        <br />
        <table id="customers" align="center">
          <tbody>{this.tabell}</tbody>
        </table>
      </div>
    );
  }

  mounted() {
    //Gjør det umulig for bruker å søke etter negative verdier
    var number = document.getElementById('pris');
    number.onkeydown = function(e) {
      if (!((e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58) || e.keyCode == 8)) {
        return false;
      }
    };
    lagerService.hentUtstyrPåLager(utstyrPåLager => {
      this.utstyrPåLager = utstyrPåLager;
    });
    //Henter lokasjoner som er lager
    lagerService.hentLokasjon(tilhørighet => {
      this.tilhørighet = tilhørighet;
      this.createtable();
    });
  }
  toggleFiltrer() {
    var x = document.getElementById('filtrerRapportAnsatteDiv');
    if (window.getComputedStyle(x).display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  createtable() {
    if (this.utstyrPåLager == 0) {
      alert('Ingen utstyr matchet søket!');
    } else {
      this.tabell = '';
      this.tabell = [];
      this.tabell.push(
        <tr>
          <th>Id</th>
          <th>Type</th>
          <th>Beskrivelse</th>
          <th>Tilhørighet</th>
          <th>Timepris</th>
          <th>Endre informasjon</th>
        </tr>
      );

      for (let i = 0; i < this.utstyrPåLager.length; i++) {
        this.tabell.push(
          <tr>
            <td>{this.utstyrPåLager[i].id}</td>
            <td>{this.utstyrPåLager[i].type}</td>
            <td>{this.utstyrPåLager[i].beskrivelse}</td>
            <td>{this.utstyrPåLager[i].område}</td>
            <td>{this.utstyrPåLager[i].pris}</td>
            <td>
              <NavLink to={'/redigerUtstyr/' + this.props.match.params.ansattId + this.utstyrPåLager[i].id + '/edit'}>
                {' '}
                Endre{' '}
              </NavLink>
            </td>
          </tr>
        );
      }
    }
  }
  tilbake() {
    history.push('/lagerStartsideUtstyr/' + this.props.match.params.ansattId);
  }
  sok(e) {
    e.preventDefault();
    if (this.type == '') this.type = '%';
    if (this.lokasjon_id == '') this.lokasjon_id = '%';
    if (this.pris == '') this.pris = '%';

    lagerService.sokUtstyr(this.type, this.lokasjon_id, this.pris, sok => {
      this.utstyrPåLager = sok;
      this.createtable();
    });
  }

  nullstill(e) {
    this.type = '';
    this.lokasjon_id = '';
    this.pris = '';

    document.getElementById('type').value = '';
    document.getElementById('lokasjon_id').value = '';
    document.getElementById('pris').value = '';

    e.preventDefault();
    if (this.type == '') this.type = '%';
    if (this.lokasjon_id == '') this.lokasjon_id = '%';
    if (this.pris == '') this.pris = '%';

    lagerService.sokUtstyr(this.type, this.lokasjon_id, this.pris, sok => {
      this.utstyrPåLager = sok;
      this.createtable();
    });
  }
}

export class UtleidUtstyr extends Component {
  //Viser en oversikt over utleid utstyr

  utstyrUtleid = [];
  tabell = [];
  tilhørighet = [];

  type = '%';
  lokasjon_id = '%';
  pris = '%';

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Utstyr - Lager</h1>
          <button type="button" id="loggUtKnapp" class="btn" onClick={this.tilbake}>
            Tilbake
          </button>
        </div>
        <h2>Oversikt over utleid utstyr</h2>
        <button type="button" id="toggleFiltrerKnapp" class="btn" onClick={this.toggleFiltrer}>
          Filtrer
        </button>
        <br />
        <div id="filtrerRapportAnsatteDiv">
          <form onSubmit={this.sok}>
            <div class="form-inline">
              <h3>Filtrer utstyr</h3>
              <select id="type" class="form-control form-control-lg" onChange={e => (this.type = event.target.value)}>
                <option value="" defaultValue>
                  Utstyrstype:
                </option>
                <option value="Hjelm voksne">Hjelm for voksne</option>
                <option value="Hjelm barn">Hjelm for barn</option>
                <option value="Sykkellås">Sykkellås</option>
                <option value="Barnesete">Barnesete</option>
                <option value="Sykkelkurv">Sykkelkurv</option>
                <option value="Sykkelstativ">Sykkelstativ til hund</option>
              </select>
              <select
                id="lokasjon_id"
                class="form-control form-control-lg"
                onChange={e => (this.lokasjon_id = event.target.value)}
              >
                {' '}
                <option value="" defaultValue>
                  Tilhørighet:
                </option>
                {this.tilhørighet.map(tilhørighet => (
                  <option value={tilhørighet.id} key={tilhørighet.id}>
                    {tilhørighet.område}
                  </option>
                ))}
              </select>
              <input
                type="number"
                class="form-control form-control-lg"
                id="pris"
                min="0"
                placeholder="Timepris"
                onChange={e => (this.pris = event.target.value)}
              />
              <br />
              <button type="submit" class="btn">
                Søk
              </button>
              <button type="button" class="btn" onClick={this.nullstill}>
                Nullstill
              </button>
            </div>
          </form>
        </div>
        <br />
        <table id="customers" align="center">
          <tbody>{this.tabell}</tbody>
        </table>
      </div>
    );
  }

  mounted() {
    //Gjør det umulig for bruker å søke etter negative verdier
    var number = document.getElementById('pris');
    number.onkeydown = function(e) {
      if (!((e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58) || e.keyCode == 8)) {
        return false;
      }
    };
    lagerService.hentUtleideUtstyr(utstyrUtleid => {
      this.utstyrUtleid = utstyrUtleid;
    });
    //Henter lokasjoner som er lager
    lagerService.hentLokasjon(tilhørighet => {
      this.tilhørighet = tilhørighet;
      this.createtable();
    });
  }

  toggleFiltrer() {
    var x = document.getElementById('filtrerRapportAnsatteDiv');
    if (window.getComputedStyle(x).display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  createtable() {
    if (this.utstyrUtleid == 0) {
      alert('Ingen utstyr matchet søket!');
    } else {
      this.tabell = '';
      this.tabell = [];
      this.tabell.push(
        <tr>
          <th>Id</th>
          <th>Type</th>
          <th>Beskrivelse</th>
          <th>Tilhørighet</th>
          <th>Timepris</th>
        </tr>
      );

      for (let i = 0; i < this.utstyrUtleid.length; i++) {
        this.tabell.push(
          <tr>
            <td>{this.utstyrUtleid[i].id}</td>
            <td>{this.utstyrUtleid[i].type}</td>
            <td>{this.utstyrUtleid[i].beskrivelse}</td>
            <td>{this.utstyrUtleid[i].område}</td>
            <td>{this.utstyrUtleid[i].pris}</td>
          </tr>
        );
      }
    }
  }
  tilbake() {
    history.push('/lagerStartsideUtstyr/' + this.props.match.params.ansattId);
  }
  sok(e) {
    e.preventDefault();
    if (this.type == '') this.type = '%';
    if (this.lokasjon_id == '') this.lokasjon_id = '%';
    if (this.pris == '') this.pris = '%';

    lagerService.sokUtstyrUtleid(this.type, this.lokasjon_id, this.pris, sok => {
      this.utstyrUtleid = sok;
      this.createtable();
    });
  }

  nullstill(e) {
    this.type = '';
    this.lokasjon_id = '';
    this.pris = '';

    document.getElementById('type').value = '';
    document.getElementById('lokasjon_id').value = '';
    document.getElementById('pris').value = '';

    e.preventDefault();
    if (this.type == '') this.type = '%';
    if (this.lokasjon_id == '') this.lokasjon_id = '%';
    if (this.pris == '') this.pris = '%';

    lagerService.sokUtstyrUtleid(this.type, this.lokasjon_id, this.pris, sok => {
      this.utstyrUtleid = sok;
      this.createtable();
    });
  }
}
export class UtilgjengeligeUtstyr extends Component {
  //Siden består av to knapper som begge får frem en tabell når de blir trykket på. Den ene tabellen viser utstyr som trenger reparasjoner, mens den andre viser utstyr som har vært ut i en bestilling men ikke har blitt levert tilbake i tide. Disse utstyrene er enten savnet eller stjålet.

  utilgjengelig = [];
  reparasjon = [];
  gjørUtilgjengeligUtstyr = [];
  tabell = [];

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Utstyr - Lager</h1>
          <button type="button" id="loggUtKnapp" class="btn" onClick={this.tilbake}>
            Tilbake
          </button>
        </div>
        <h2>Oversikt over utilgjengelige utstyr</h2>
        <p>
          <i>
            Utilgjengelige utstyr består av utstyr som trenger eventuelle reparasjoner eller har ikke blitt levert
            tilbake av kunden i tide.
          </i>
        </p>
        <br />
        <button
          type="submit"
          id="knapperStartside"
          class="btn btn-sucess btn-lg btn-block"
          onClick={this.createTableRep}
        >
          Trenger reparasjon
        </button>
        <button
          type="button"
          id="knapperStartside"
          class="btn btn-sucess btn-lg btn-block"
          onClick={this.createTableIkkeLevert}
        >
          Ikke levert tilbake
        </button>
        <br />
        <table id="customers" align="center">
          <tbody>{this.tabell}</tbody>
        </table>
      </div>
    );
  }

  mounted() {
    //Kjører en spørring som gjør om utstyrets status til "Utilgjengelig" når fristen for å levere inn utstyret er forbi
    lagerService.gjørUtilgjengeligUtstyr(gjørUtilgjengeligUtstyr => {
      this.gjørUtilgjengeligUtstyr = gjørUtilgjengeligUtstyr;
    });
    //Henter utstyr som har en status som tilsier at de trenger reparasjoner
    lagerService.hentReparasjonerUtstyr(reparasjon => {
      this.reparasjon = reparasjon;
    });
    //Henter utstyr som har status "Utilgjengelig"
    lagerService.hentUtilgjengeligUtstyr(utilgjengelig => {
      this.utilgjengelig = utilgjengelig;
    });
  }
  createTableRep() {
    //Tabell over utstyr som trenger reparasjoner
    if (this.reparasjon == 0) {
      alert('Det er ingen utstyr i denne tabellen');
    } else {
      this.tabell = '';
      this.tabell = [];
      this.tabell.push(
        <tr>
          <th>Utstyr ID</th>
          <th>Utstyrstype</th>
          <th>Tilhørighet</th>
          <th>Endre informasjon</th>
        </tr>
      );

      for (let i = 0; i < this.reparasjon.length; i++) {
        this.tabell.push(
          <tr>
            <td>{this.reparasjon[i].id}</td>
            <td>{this.reparasjon[i].type}</td>
            <td>{this.reparasjon[i].område}</td>
            <td>
              <NavLink to={'/redigerUtstyr/' + this.props.match.params.ansattId + this.reparasjon[i].id + '/edit'}>
                {' '}
                Endre{' '}
              </NavLink>
            </td>
          </tr>
        );
      }
    }
  }
  createTableIkkeLevert() {
    //Tabell over utstyr som ikke har blitt levert tilbake i tide
    if (this.utilgjengelig == 0) {
      alert('Det er ingen utstyr i denne tabellen');
    } else {
      this.tabell = '';
      this.tabell = [];
      this.tabell.push(
        <tr>
          <th>Bestillings ID</th>
          <th>Utstyrs ID</th>
          <th>Utstyrstype</th>
          <th>Tilhørighet</th>
          <th>Innleveringssted</th>
          <th>Innleveringsdato</th>
          <th>Kundens epost</th>
          <th>Kundens telefon</th>
          <th>Endre informasjon</th>
        </tr>
      );

      for (let i = 0; i < this.utilgjengelig.length; i++) {
        this.tabell.push(
          <tr>
            <td>{this.utilgjengelig[i].bestilling_id}</td>
            <td>{this.utilgjengelig[i].id}</td>
            <td>{this.utilgjengelig[i].type}</td>
            <td>{this.utilgjengelig[i].område}</td>
            <td>{this.utilgjengelig[i].innleveringssted}</td>
            <td>{this.utilgjengelig[i].innlevering_dato}</td>
            <td>{this.utilgjengelig[i].epost}</td>
            <td>{this.utilgjengelig[i].telefon}</td>
            <td>
              <NavLink to={'/redigerUtstyr/' + this.props.match.params.ansattId + this.utilgjengelig[i].id + '/edit'}>
                {' '}
                Endre{' '}
              </NavLink>
            </td>
          </tr>
        );
      }
    }
  }
  tilbake() {
    history.push('/lagerStartsideUtstyr/' + this.props.match.params.ansattId);
  }
}

export class LeggTilSykkel extends Component {
  //Side der man legger inn sykler
  tilhørighet = [];

  status = 'Ledig';
  hjul_størrelse = '';
  girsystem = '';
  ramme = '';
  lokasjon_id = '';
  bremse = '';
  modellnavn = '';
  timepris = '';

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Legg til - Lager</h1>
          <button type="button" id="loggUtKnapp" class="btn" onClick={this.tilbake}>
            Tilbake
          </button>
        </div>
        <div id="nyAnsattDiv">
          <form onSubmit={this.add}>
            <h2>Legg til nye sykler</h2>
            <hr />
            <h3>Sykkeltype</h3>
            <select
              value={this.type}
              class="genereltInputer form-control form-control-lg"
              onChange={e => (this.type = event.target.value)}
              required
            >
              <option value="" defaultValue hidden>
                Velg sykkeltype
              </option>
              <option value="Hybrid Dame m/bagasjebrett">Hybrid Dame med bagasjebrett</option>
              <option value="Hybrid Herre m/bagasjebrett">Hybrid Herre med bagasjebrett</option>
              <option value="Hybrid Dame">Hybrid Dame uten bagasjebrett</option>
              <option value="Hybrid Herre">Hybrid Herre uten bagasjebrett</option>
              <option value="Barnesykkel">Barnesykkel</option>
              <option value="Juniorsykkel">Juniorsykkel</option>
              <option value="El-sykkel">El-sykkel</option>
              <option value="Terrengsykkel">Terrengsykkel</option>
              <option value="Landeveissykkel">Landeveissykkel</option>
            </select>
            <h3>Modellnavn</h3>
            <input
              type="text"
              placeholder="Ghost Terreng"
              class="genereltInputer form-control form-control-lg"
              onChange={e => (this.modellnavn = e.target.value)}
              required
            />
            <h3>Hjulstørrelse</h3>
            <input
              type="number"
              placeholder="24"
              class="genereltInputer form-control form-control-lg"
              onChange={e => (this.hjul_størrelse = e.target.value)}
              required
            />
            <h3>Girsystem</h3>
            <select
              value={this.girsystem}
              class="genereltInputer form-control form-control-lg"
              onChange={e => (this.girsystem = event.target.value)}
              required
            >
              <option value="" defaultValue hidden>
                Velg girsystem
              </option>
              <option value="Derailleurgir">Derailleurgir</option>
              <option value="Navgir">Navgir</option>
            </select>
            <h3>Rammematerialet</h3>
            <input
              type="text"
              placeholder="Karbon"
              class="genereltInputer form-control form-control-lg"
              onChange={e => (this.ramme = e.target.value)}
              required
            />
            <h3>Tilhørighet</h3>
            <select
              id="lokasjon_id"
              class="genereltInputer form-control form-control-lg"
              onChange={e => (this.lokasjon_id = event.target.value)}
            >
              {' '}
              <option value="" defaultValue hidden>
                Velg tilhørighet:
              </option>
              {this.tilhørighet.map(tilhørighet => (
                <option value={tilhørighet.id} key={tilhørighet.id}>
                  {tilhørighet.område}
                </option>
              ))}
            </select>
            <h3>Bremsetype</h3>
            <select
              name="bremse"
              value={this.bremse}
              class="genereltInputer form-control form-control-lg"
              onChange={e => (this.bremse = event.target.value)}
              required
            >
              <option value="" defaultValue hidden>
                Velg bremsetype
              </option>
              <option value="Hydraulisk Skivebrems">Hydraulisk Skivebrems</option>
              <option value="Bremsekloss">Bremsekloss</option>
            </select>
            <h3>Timepris</h3>
            <input
              type="number"
              id="number"
              min="0"
              placeholder="120"
              class="genereltInputer form-control form-control-lg"
              onChange={e => (this.timepris = e.target.value)}
              required
            />
            <br />
            <button type="submit" class="btn">
              Legg til
            </button>
          </form>
        </div>
      </div>
    );
  }
  mounted() {
    //Gjør det umulig for bruker å søke etter negative verdier
    var number = document.getElementById('number');
    number.onkeydown = function(e) {
      if (!((e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58) || e.keyCode == 8)) {
        return false;
      }
    };
    //Henter lokasjoner som er lager
    lagerService.hentLokasjon(tilhørighet => {
      this.tilhørighet = tilhørighet;
    });
  }

  add(e) {
    e.preventDefault();
    sykkelService.addSykkel(
      this.type,
      this.status,
      this.hjul_størrelse,
      this.girsystem,
      this.ramme,
      this.lokasjon_id,
      this.bremse,
      this.modellnavn,
      this.timepris,
      id => {
        history.push('/lagerStartsideLeggTil/' + this.props.match.params.ansattId);
      }
    );
  }

  tilbake() {
    history.push('/lagerStartsideLeggTil/' + this.props.match.params.ansattId);
  }
}

export class LeggTilUtstyr extends Component {
  //Side der man legger til utstyr
  tilhørighet = [];

  type = '';
  lokasjon_id = '';
  beskrivelse = '';
  status = 'Ledig';
  pris = '';

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Legg til - Lager</h1>
          <button type="button" id="loggUtKnapp" class="btn" onClick={this.tilbake}>
            Tilbake
          </button>
        </div>
        <div id="nyAnsattDiv">
          <form onSubmit={this.add}>
            <h2>Legg til nytt utsyr</h2>
            <hr />
            <h3>Utstyrstype</h3>
            <select
              value={this.type}
              class="genereltInputer form-control form-control-lg"
              onChange={e => (this.type = event.target.value)}
              required
            >
              <option value="" defaultValue hidden>
                Velg utstyrstype
              </option>
              <option value="Hjelm voksne">Hjelm voksne</option>
              <option value="Hjelm barn">Hjelm barn</option>
              <option value="Sykkellås">Sykkellås</option>
              <option value="Barnesete">Barnesete</option>
              <option value="Sykkelvogn">Sykkelvogn</option>
              <option value="Sykkelkurv">Sykkelkurv</option>
              <option value="Sykkelstativ">Sykkelstativ</option>
            </select>
            <h3>Tilhørighet</h3>
            <select
              id="lokasjon_id"
              class="genereltInputer form-control form-control-lg"
              onChange={e => (this.lokasjon_id = event.target.value)}
            >
              {' '}
              <option value="" defaultValue hidden>
                Velg tilhørighet
              </option>
              {this.tilhørighet.map(tilhørighet => (
                <option value={tilhørighet.id} key={tilhørighet.id}>
                  {tilhørighet.område}
                </option>
              ))}
            </select>
            <h3>Beskrivelse</h3>
            <input
              type="text"
              placeholder="Kodelås i stål"
              value={this.beskrivelse}
              class="genereltInputer form-control form-control-lg"
              onChange={e => (this.beskrivelse = e.target.value)}
              required
            />
            <h3>Pris for leie</h3>
            <input
              type="number"
              min="0"
              id="number"
              placeholder="65"
              class="genereltInputer form-control form-control-lg"
              onChange={e => (this.pris = event.target.value)}
              required
            />
            <br />
            <button type="submit" class="btn">
              Legg til
            </button>
          </form>
        </div>
      </div>
    );
  }
  mounted() {
    //Gjør det umulig for bruker å søke etter negative verdier
    var number = document.getElementById('number');
    number.onkeydown = function(e) {
      if (!((e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58) || e.keyCode == 8)) {
        return false;
      }
    };
    //Henter lokasjoner som er lager
    lagerService.hentLokasjon(tilhørighet => {
      this.tilhørighet = tilhørighet;
    });
  }

  add(e) {
    e.preventDefault();
    lagerService.addUtstyr(this.type, this.lokasjon_id, this.beskrivelse, this.status, this.pris, id => {
      history.push('/lagerStartsideLeggTil/' + this.props.match.params.ansattId);
    });
  }

  tilbake() {
    history.push('/lagerStartsideLeggTil/' + this.props.match.params.ansattId);
  }
}
export class EndreSykkel extends Component {
  //Side der man endre informasjonen til syklene. Bytter også status
  sykler = null;
  tilhørighet = [];

  render() {
    if (!this.sykler) return null;

    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Sykkel - Lager</h1>
          <button type="button" id="loggUtKnapp" class="btn" onClick={this.tilbake}>
            Tilbake
          </button>
        </div>
        <div id="nyAnsattDiv">
          <form onSubmit={this.save}>
            <h2>
              {this.sykler.modellnavn} med ID-nummer {this.sykler.id}{' '}
            </h2>
            <hr />
            <h3>Status</h3>
            <select
              value={this.sykler.status}
              class="genereltInputer form-control form-control-lg"
              onChange={e => (this.sykler.status = event.target.value)}
              required
            >
              <option value="Ledig">Ledig</option>
              <option value="Reparasjon">Reparasjon</option>
              <option value="Utilgjengelig">Utilgjengelig</option>
            </select>
            <h3>Tilhørighet</h3>
            <select
              value={this.sykler.lokasjon_id}
              class="genereltInputer form-control form-control-lg"
              onChange={e => (this.sykler.lokasjon_id = event.target.value)}
              required
            >
              {this.tilhørighet.map(tilhørighet => (
                <option value={tilhørighet.id} key={tilhørighet.id}>
                  {tilhørighet.område}
                </option>
              ))}
            </select>
            <h3>Timepris</h3>
            <input
              type="number"
              class="genereltInputer form-control form-control-lg"
              value={this.sykler.timepris}
              onChange={e => (this.sykler.timepris = event.target.value)}
              required
            />

            <br />
            <button type="submit" class="btn">
              Lagre
            </button>
            <button type="button" class="btn" onClick={this.delete}>
              Slett
            </button>
          </form>
        </div>
      </div>
    );
  }
  mounted() {
    lagerService.getSykkel(this.props.match.params.id, sykler => {
      this.sykler = sykler;
    });
    lagerService.hentLokasjon(tilhørighet => {
      this.tilhørighet = tilhørighet;
    });
  }

  save(e) {
    e.preventDefault();
    lagerService.updateSykkel(
      this.sykler.status,
      this.sykler.lokasjon_id,
      this.sykler.timepris,
      this.props.match.params.id,
      updateSykkel => {
        history.push('/lagerStartsideSykkel/' + this.props.match.params.ansattId);
      }
    );
  }
  tilbake() {
    history.push('/lagerStartsideSykkel/' + this.props.match.params.ansattId);
  }
  delete() {
    var r = confirm('Er du sikker på at du ønsker å fjerne denne sykkelen fra lageret?');
    if (r == true) {
      lagerService.deleteSykkel(this.props.match.params.id, () =>
        history.push('/lagerStartsideSykkel/' + this.props.match.params.ansattId)
      );
    }
  }
}
export class EndreUtstyrLager extends Component {
  //Side der man endre informasjonen til utstyr. Bytter også status
  utstyr = null;
  tilhørighet = [];

  render() {
    if (!this.utstyr) return null;

    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Utstyr - Lager</h1>
          <button type="button" id="loggUtKnapp" class="btn" onClick={this.tilbake}>
            Tilbake
          </button>
        </div>
        <div id="nyAnsattDiv">
          <form onSubmit={this.save}>
            <h2>
              {this.utstyr.type} med ID-nummer {this.utstyr.id}{' '}
            </h2>
            <hr />
            <h3>Status</h3>
            <select
              value={this.utstyr.status}
              class="genereltInputer form-control form-control-lg"
              onChange={e => (this.utstyr.status = event.target.value)}
              required
            >
              <option value="Ledig">Ledig</option>
              <option value="Reparasjon">Til reparasjon</option>
              <option value="Utilgjengelig">Utilgjengelig</option>
            </select>
            <h3>Tilhørighet</h3>
            <select
              value={this.utstyr.lokasjon_id}
              class="genereltInputer form-control form-control-lg"
              onChange={e => (this.utstyr.lokasjon_id = event.target.value)}
              required
            >
              {this.tilhørighet.map(tilhørighet => (
                <option value={tilhørighet.id} key={tilhørighet.id}>
                  {tilhørighet.område}
                </option>
              ))}
            </select>
            <h3>Timepris</h3>
            <input
              type="number"
              class="genereltInputer form-control form-control-lg"
              value={this.utstyr.pris}
              onChange={e => (this.utstyr.pris = event.target.value)}
              required
            />
            <br />
            <button type="submit" class="btn">
              Lagre
            </button>
            <button type="button" class="btn" onClick={this.delete}>
              Slett
            </button>
          </form>
        </div>
      </div>
    );
  }
  mounted() {
    lagerService.getUtstyr(this.props.match.params.id, utstyr => {
      this.utstyr = utstyr;
    });
    lagerService.hentLokasjon(tilhørighet => {
      this.tilhørighet = tilhørighet;
    });
  }

  save(e) {
    e.preventDefault();
    lagerService.updateUtstyr(
      this.utstyr.status,
      this.utstyr.lokasjon_id,
      this.utstyr.pris,
      this.props.match.params.id,
      updateUtstyr => {
        history.push('/lagerStartsideUtstyr/' + this.props.match.params.ansattId);
      }
    );
  }
  tilbake() {
    history.push('/lagerStartsideUtstyr/' + this.props.match.params.ansattId);
  }
  delete() {
    var r = confirm('Er du sikker på at du ønsker å fjerne dette utstyret fra lageret?');
    if (r == true) {
      lagerService.deleteUtstyr(this.props.match.params.id, () =>
        history.push('/lagerStartsideUtstyr/' + this.props.match.params.ansattId)
      );
    }
  }
}
