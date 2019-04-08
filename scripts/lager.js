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
  ansatt = [];
  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container w3-green">
          <h1>Startside - Lager</h1>
          <button type="button" id="loggUtKnapp" onClick={this.tilbake}>
            Logg ut
          </button>
        </div>
        <div id="salgStartsideKnapperDiv">
          <h2>
            Velkommen
            <br />
            {this.ansatt.fornavn} {this.ansatt.etternavn}{' '}
          </h2>

          <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.sykkel}>
            Sykkel
          </button>
          <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.utstyr}>
            Utstyr
          </button>
          <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.leggTil}>
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
    history.push('/LagerStartsideLeggTilnn/' + this.props.match.params.ansattId);
  }
  tilbake() {
    history.push('/');
  }
}
export class LagerStartsideSykkel extends Component {
  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container w3-green">
          <h1>Sykkel - Lager</h1>
          <button type="button" id="loggUtKnapp" onClick={this.tilbake}>
            Tilbake til startsiden
          </button>
        </div>
        <div id="salgStartsideKnapperDiv">
          <h2>Oversikt over Sykler</h2>

          <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.oversiktUtleveringSykkel}>
            Utleveringer
          </button>
          <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.oversiktInnleveringSykkel}>
            Innleveringer
          </button>
          <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.ledigSykkel}>
            På Lager
          </button>
          <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.utleidSykkel}>
            Utleid
          </button>
          <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.reparasjonIkkeLevertSykkel}>
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
  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container w3-green">
          <h1>Ustyr - Lager</h1>
          <button type="button" id="loggUtKnapp" onClick={this.tilbake}>
            Tilbake til startsiden
          </button>
        </div>
        <div id="salgStartsideKnapperDiv">
          <h2>Oversikt over Utstyr</h2>

          <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.oversiktUtleveringUtstyr}>
            Utleveringer
          </button>
          <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.oversiktInnleveringUtstyr}>
            Innleveringer
          </button>
          <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.ledigUtstyr}>
            På Lager
          </button>
          <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.utleidUtstyr}>
            Utleid
          </button>
          <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.utilgjengelig}>
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
  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container w3-green">
          <h1>Legg Til - Lager</h1>
          <button type="button" id="loggUtKnapp" onClick={this.tilbake}>
            Tilbake til startsiden
          </button>
        </div>
        <div id="salgStartsideKnapperDiv">
          <h2>Legg til sykler/utstyr</h2>
          <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.leggTilSykkel}>
            Legg til sykler
          </button>
          <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.leggTilUtstyr}>
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
  syklerIBestilling = [];
  tabell = [];

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.tilbake}>
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
    lagerService.hentSykkelBestilling(syklerIBestilling => {
      this.syklerIBestilling = syklerIBestilling;
      this.createTable();
      console.log(this.syklerIBestilling);
    });
  }
  createTable() {
    if (this.syklerIBestilling == 0) {
      alert('Det er ingen sykler som skal gjøres klar for utlevering');
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
  sykkel = [];
  tabell6 = [];

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.tilbake}>
            Tilbake til startsiden
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
    lagerService.henteSykkel(sykkel => {
      this.sykkel = sykkel;
      console.log(this.sykkel);
      this.createTable6();
    });
  }

  createTable6() {
    if (this.sykkel == 0) {
      alert('Det er ingen sykler som trenger transport tilbake til lager');
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
  sykkelPåLager = [];
  tabell1 = [];
  tilhørighet = [];

  type = '%';
  lokasjon_id = '%';
  modellnavn = '%';
  timepris = '%';

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.tilbake}>
            Tilbake
          </button>
        </div>
        <h2>Oversikt over sykler på lager</h2>
        <button type="button" id="toggleFiltrerKnapp" class="btn" onClick={this.toggleFiltrer}>
          Filtrer
        </button>
        <div id="filtrerAktiveBestillingerDiv">
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
                <option value="" selected>
                  Tilhørighet:
                </option>
                {this.tilhørighet.map(tilhørighet => (
                  <option value={tilhørighet.id} key={tilhørighet.id}>
                    {tilhørighet.område}
                  </option>
                ))}
              </select>
              <button type="submit" class="btn btn-sucess btn-lg btn-block">
                Søk
              </button>
              <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.nullstill}>
                Nullstill
              </button>
            </div>
          </form>
        </div>
        <br />
        <table id="customers" align="center">
          <tbody>{this.tabell1}</tbody>
        </table>
      </div>
    );
  }

  mounted() {
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
      this.createTable1();
    });
  }
  toggleFiltrer() {
    var x = document.getElementById('filtrerAktiveBestillingerDiv');
    if (window.getComputedStyle(x).display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  createTable1() {
    if (this.sykkelPåLager == 0) {
      alert('Ingen sykler matchet søket!');
    } else {
      this.tabell1 = '';
      this.tabell1 = [];
      this.tabell1.push(
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
        this.tabell1.push(
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
      this.createTable1();
      console.log(this.type);
      console.log(this.lokasjon_id);
      console.log(this.modellnavn);
      console.log(this.timepris);
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
      this.createTable1();
    });
  }
}

export class UtleidSykkel extends Component {
  sykkelUtleid = [];
  tabell1 = [];
  tilhørighet = [];

  type = '%';
  modellnavn = '%';
  lokasjon_id = '%';
  timepris = '%';

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.tilbake}>
            Tilbake
          </button>
        </div>
        <h2>Oversikt over utleide sykler</h2>
        <button type="button" id="toggleFiltrerKnapp" class="btn" onClick={this.toggleFiltrer}>
          Filtrer
        </button>
        <div id="filtrerAktiveBestillingerDiv">
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
                <option value="" selected>
                  Tilhørighet:
                </option>
                {this.tilhørighet.map(tilhørighet => (
                  <option value={tilhørighet.id} key={tilhørighet.id}>
                    {tilhørighet.område}
                  </option>
                ))}
              </select>
              <button type="submit" class="btn btn-sucess btn-lg btn-block">
                Søk
              </button>
              <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.nullstill}>
                Nullstill
              </button>
            </div>
          </form>
        </div>
        <br />
        <table id="customers" align="center">
          <tbody>{this.tabell1}</tbody>
        </table>
      </div>
    );
  }

  mounted() {
    var number = document.getElementById('timepris');
    number.onkeydown = function(e) {
      if (!((e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58) || e.keyCode == 8)) {
        return false;
      }
    };
    lagerService.hentUtleideSykler(sykkelUtleid => {
      this.sykkelUtleid = sykkelUtleid;
    });
    lagerService.hentLokasjon(tilhørighet => {
      this.tilhørighet = tilhørighet;
      this.createTable1();
    });
  }
  toggleFiltrer() {
    var x = document.getElementById('filtrerAktiveBestillingerDiv');
    if (window.getComputedStyle(x).display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  createTable1() {
    if (this.sykkelUtleid == 0) {
      alert('Ingen sykler matchet søket!');
    } else {
      this.tabell1 = '';
      this.tabell1 = [];
      this.tabell1.push(
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

      for (let i = 0; i < this.sykkelUtleid.length; i++) {
        this.tabell1.push(
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
            <td>
              <NavLink to={'/redigerSykkel/' + this.props.match.params.ansattId + this.sykkelUtleid[i].id + '/edit'}>
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
  sokUtleid(e) {
    e.preventDefault();
    if (this.type == '') this.type = '%';
    if (this.lokasjon_id == '') this.lokasjon_id = '%';
    if (this.modellnavn == '') this.modellnavn = '%';
    if (this.timepris == '') this.timepris = '%';

    lagerService.sokUtleid(this.type, this.lokasjon_id, this.modellnavn, this.timepris, sokUtleid => {
      this.sykkelUtleid = sokUtleid;
      this.createTable1();
      console.log(this.type);
      console.log(this.lokasjon_id);
      console.log(this.modellnavn);
      console.log(this.timepris);
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
      this.createTable1();
    });
  }
}
export class UtilgjengeligeSykler extends Component {
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
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.tilbake}>
            Tilbake til startsiden
          </button>
        </div>
        <h2>Oversikt over utilgjengelige sykler</h2>
        <br />
        <h2>
          Utilgjengelige sykler består av sykler som trenger eventuelle reparasjoner eller har ikke blitt levert tilbake
          av kunden i tide.
        </h2>
        <button type="submit" class="btn btn-sucess btn-lg btn-block" onClick={this.createTableRep}>
          Reparasjon
        </button>
        <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.createTableIkkeLevert}>
          Ikke levert tilbake i tide
        </button>
        <br />
        <table id="customers" align="center">
          <tbody>{this.tabell}</tbody>
        </table>
      </div>
    );
  }

  mounted() {
    lagerService.gjørUtilgjengelig(gjørutilgjengelig => {
      this.gjørutilgjengelig = gjørutilgjengelig;
      console.log(this.gjørutilgjengelig);
    });
    lagerService.hentReparasjoner(reparasjon => {
      this.reparasjon = reparasjon;
      console.log(this.reparasjon);
    });
    lagerService.hentUtilgjengelig(utilgjengelig => {
      this.utilgjengelig = utilgjengelig;
      console.log(this.utilgjengelig);
    });
  }
  createTableRep() {
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
          <th>Ferdig Reparert</th>
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
              <NavLink to={'/reparasjoner/' + this.props.match.params.ansattId + this.reparasjon[i].id + '/edit'}>
                {' '}
                X{' '}
              </NavLink>
            </td>
          </tr>
        );
      }
    }
  }
  createTableIkkeLevert() {
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
          <th>Tilbake på lager</th>
          <th>Slett fra lager</th>
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
              <NavLink
                to={'/utilgjengeligSykler/' + this.props.match.params.ansattId + this.utilgjengelig[i].id + '/tilbake'}
              >
                {' '}
                X{' '}
              </NavLink>
            </td>
            <td>
              <NavLink
                to={'/utilgjengeligSykler/' + this.props.match.params.ansattId + this.utilgjengelig[i].id + '/slett'}
              >
                {' '}
                X{' '}
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
export class EndreReparasjoner extends Component {
  render() {
    return <div />;
  }

  mounted() {
    lagerService.hentReparasjon(this.props.match.params.id, hentReparasjon => {
      lagerService.ferdigReparasjoner(this.props.match.params.id, ferdigReparasjoner => {
        history.push('/utilgjengeligSykler/' + this.props.match.params.ansattId);
      });
    });
  }
}
export class TilbakePåLager extends Component {
  render() {
    return <div />;
  }

  mounted() {
    lagerService.hentUtilgjengeligeID(this.props.match.params.id, hentUtilgjengeligeID => {
      lagerService.tilbakeUtilgjengelige(this.props.match.params.id, tilbakeUtilgjengelige => {
        history.push('/utilgjengeligSykler/' + this.props.match.params.ansattId);
      });
    });
  }
}
export class SlettFraLager extends Component {
  render() {
    return <div />;
  }

  mounted() {
    lagerService.hentUtilgjengeligeID(this.props.match.params.id, hentUtilgjengeligeID => {
      lagerService.slettUtilgjengelige(this.props.match.params.id, slettUtilgjengelige => {
        history.push('/utilgjengeligSykler/' + this.props.match.params.ansattId);
      });
    });
  }
}
export class UtstyrBestilling extends Component {
  utstyrIBestilling = [];
  tabell = [];

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.tilbake}>
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
    lagerService.hentSykkelBestillingUtstyr(utstyrIBestilling => {
      this.utstyrIBestilling = utstyrIBestilling;
      this.createTable();
      console.log(this.utstyrIBestilling);
    });
  }
  createTable() {
    if (this.utstyrIBestilling == 0) {
      alert('Det er ingen utstyr som skal gjøres klar for utlevering');
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

      for (let i = 0; i < this.utstyrIBestilling.length; i++) {
        this.tabell.push(
          <tr>
            <td>{this.utstyrIBestilling[i].bestilling_id}</td>
            <td>{this.utstyrIBestilling[i].id}</td>
            <td>{this.utstyrIBestilling[i].type}</td>
            <td>{this.utstyrIBestilling[i].modellnavn}</td>
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
  utstyr = [];
  tabell6 = [];

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.tilbake}>
            Tilbake til startsiden
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
    lagerService.henteUtstyr(utstyr => {
      this.utstyr = utstyr;
      console.log(this.utstyr);
      this.createTable6();
    });
  }

  createTable6() {
    if (this.utstyr == 0) {
      alert('Det er ingen utstyr som trenger transport tilbake til lager');
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

      for (let i = 0; i < this.utstyr.length; i++) {
        this.tabell6.push(
          <tr>
            <td>{this.utstyr[i].bestilling_id}</td>
            <td>{this.utstyr[i].id}</td>
            <td>{this.utstyr[i].modellnavn}</td>
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
  utstyrPåLager = [];
  tabell1 = [];
  tilhørighet = [];

  type = '%';
  lokasjon_id = '%';
  pris = '%';

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.tilbake}>
            Tilbake
          </button>
        </div>
        <h2>Oversikt over utstyr på lager</h2>
        <button type="button" id="toggleFiltrerKnapp" class="btn" onClick={this.toggleFiltrer}>
          Filtrer
        </button>
        <div id="filtrerAktiveBestillingerDiv">
          <form onSubmit={this.sok}>
            <div class="form-inline">
              <h3>Filtrer utstyr</h3>
              <select id="type" class="form-control form-control-lg" onChange={e => (this.type = event.target.value)}>
                <option value="" selected>
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
                <option value="" selected>
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
                id="pris"
                class="form-control form-control-lg"
                placeholder="Timepris"
                onChange={e => (this.pris = event.target.value)}
              />
              <button type="submit" class="btn btn-sucess btn-lg btn-block">
                Søk
              </button>
              <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.nullstill}>
                Nullstill
              </button>
            </div>
          </form>
        </div>
        <br />
        <table id="customers" align="center">
          <tbody>{this.tabell1}</tbody>
        </table>
      </div>
    );
  }

  mounted() {
    var number = document.getElementById('pris');
    number.onkeydown = function(e) {
      if (!((e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58) || e.keyCode == 8)) {
        return false;
      }
    };
    lagerService.hentUtstyrPåLager(utstyrPåLager => {
      this.utstyrPåLager = utstyrPåLager;
    });
    lagerService.hentLokasjon(tilhørighet => {
      this.tilhørighet = tilhørighet;
      this.createTable1();
    });
  }
  toggleFiltrer() {
    var x = document.getElementById('filtrerAktiveBestillingerDiv');
    if (window.getComputedStyle(x).display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  createTable1() {
    if (this.utstyrPåLager == 0) {
      alert('Ingen utstyr matchet søket!');
    } else {
      this.tabell1 = '';
      this.tabell1 = [];
      this.tabell1.push(
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
        this.tabell1.push(
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
      this.createTable1();
      console.log(this.type);
      console.log(this.lokasjon_id);
      console.log(this.pris);
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
      this.createTable1();
    });
  }
}

export class UtleidUtstyr extends Component {
  utstyrUtleid = [];
  tabell1 = [];
  tilhørighet = [];

  type = '%';
  lokasjon_id = '%';
  pris = '%';

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.tilbake}>
            Tilbake
          </button>
        </div>
        <h2>Oversikt over utleid utstyr</h2>
        <button type="button" id="toggleFiltrerKnapp" class="btn" onClick={this.toggleFiltrer}>
          Filtrer
        </button>
        <div id="filtrerAktiveBestillingerDiv">
          <form onSubmit={this.sok}>
            <div class="form-inline">
              <h3>Filtrer utstyr</h3>
              <select id="type" class="form-control form-control-lg" onChange={e => (this.type = event.target.value)}>
                <option value="" selected>
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
                <option value="" selected>
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
                placeholder="Timepris"
                onChange={e => (this.pris = event.target.value)}
              />
              <button type="submit" class="btn btn-sucess btn-lg btn-block">
                Søk
              </button>
              <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.nullstill}>
                Nullstill
              </button>
            </div>
          </form>
        </div>
        <br />
        <table id="customers" align="center">
          <tbody>{this.tabell1}</tbody>
        </table>
      </div>
    );
  }

  mounted() {
    var number = document.getElementById('pris');
    number.onkeydown = function(e) {
      if (!((e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58) || e.keyCode == 8)) {
        return false;
      }
    };
    lagerService.hentUtleideUtstyr(utstyrUtleid => {
      this.utstyrUtleid = utstyrUtleid;
    });
    lagerService.hentLokasjon(tilhørighet => {
      this.tilhørighet = tilhørighet;
      this.createTable1();
    });
  }

  toggleFiltrer() {
    var x = document.getElementById('filtrerAktiveBestillingerDiv');
    if (window.getComputedStyle(x).display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  createTable1() {
    if (this.utstyrUtleid == 0) {
      alert('Ingen utstyr matchet søket!');
    } else {
      this.tabell1 = '';
      this.tabell1 = [];
      this.tabell1.push(
        <tr>
          <th>Id</th>
          <th>Type</th>
          <th>Beskrivelse</th>
          <th>Tilhørighet</th>
          <th>Timepris</th>
          <th>Endre informasjon</th>
        </tr>
      );

      for (let i = 0; i < this.utstyrUtleid.length; i++) {
        this.tabell1.push(
          <tr>
            <td>{this.utstyrUtleid[i].id}</td>
            <td>{this.utstyrUtleid[i].type}</td>
            <td>{this.utstyrUtleid[i].beskrivelse}</td>
            <td>{this.utstyrUtleid[i].område}</td>
            <td>{this.utstyrUtleid[i].pris}</td>
            <td>
              <NavLink to={'/redigerUtstyr/' + this.props.match.params.ansattId + this.utstyrUtleid[i].id + '/edit'}>
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

    lagerService.sokUtstyrUtleid(this.type, this.lokasjon_id, this.pris, sok => {
      this.utstyrUtleid = sok;
      this.createTable1();
      console.log(this.type);
      console.log(this.lokasjon_id);
      console.log(this.pris);
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
      this.createTable1();
    });
  }
}
export class UtilgjengeligeUtstyr extends Component {
  utilgjengelig = [];
  reparasjon = [];
  gjørUtilgjengeligUtstyr = [];
  tabell = [];

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.tilbake}>
            Tilbake til startsiden
          </button>
        </div>
        <h2>Oversikt over utilgjengelige utstyr</h2>
        <br />
        <h2>
          Utilgjengelige utstyr består av utstyr som trenger eventuelle reparasjoner eller har ikke blitt levert tilbake
          av kunden i tide.
        </h2>
        <button type="submit" class="btn btn-sucess btn-lg btn-block" onClick={this.createTableRep}>
          Reparasjon
        </button>
        <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.createTableIkkeLevert}>
          Ikke levert tilbake i tide
        </button>
        <br />
        <table id="customers" align="center">
          <tbody>{this.tabell}</tbody>
        </table>
      </div>
    );
  }

  mounted() {
    lagerService.gjørUtilgjengeligUtstyr(gjørUtilgjengeligUtstyr => {
      this.gjørUtilgjengeligUtstyr = gjørUtilgjengeligUtstyr;
      console.log(this.gjørutilgjengelig);
    });
    lagerService.hentReparasjonerUtstyr(reparasjon => {
      this.reparasjon = reparasjon;
      console.log(this.reparasjon);
    });
    lagerService.hentUtilgjengeligUtstyr(utilgjengelig => {
      this.utilgjengelig = utilgjengelig;
      console.log(this.utilgjengelig);
    });
  }
  createTableRep() {
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
          <th>Ferdig Reparert</th>
        </tr>
      );

      for (let i = 0; i < this.reparasjon.length; i++) {
        this.tabell.push(
          <tr>
            <td>{this.reparasjon[i].id}</td>
            <td>{this.reparasjon[i].type}</td>
            <td>{this.reparasjon[i].område}</td>
            <td>
              <NavLink to={'/reparasjonerUtstyr/' + this.props.match.params.ansattId + this.reparasjon[i].id + '/edit'}>
                {' '}
                X{' '}
              </NavLink>
            </td>
          </tr>
        );
      }
    }
  }
  createTableIkkeLevert() {
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
          <th>Tilbake på lager</th>
          <th>Slett fra lager</th>
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
              <NavLink
                to={'/utilgjengeligUtstyr/' + this.props.match.params.ansattId + this.utilgjengelig[i].id + '/tilbake'}
              >
                {' '}
                X{' '}
              </NavLink>
            </td>
            <td>
              <NavLink
                to={'/utilgjengeligUtstyr/' + this.props.match.params.ansattId + this.utilgjengelig[i].id + '/slett'}
              >
                {' '}
                X{' '}
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
export class EndreReparasjonerUtstyr extends Component {
  render() {
    return <div />;
  }

  mounted() {
    lagerService.hentReparasjonUtstyr(this.props.match.params.id, hentReparasjonUtstyr => {
      lagerService.ferdigReparasjonerUtstyr(this.props.match.params.id, ferdigReparasjonerUtstyr => {
        history.push('/utilgjengeligUtstyr/' + this.props.match.params.ansattId);
      });
    });
  }
}
export class TilbakePåLagerUtstyr extends Component {
  render() {
    return <div />;
  }

  mounted() {
    lagerService.hentReparasjonUtstyr(this.props.match.params.id, hentReparasjonUtstyr => {
      lagerService.tilbakeUtilgjengeligeUtstyr(this.props.match.params.id, tilbakeUtilgjengeligeUtstyr => {
        history.push('/utilgjengeligUtstyr/' + this.props.match.params.ansattId);
      });
    });
  }
}
export class SlettFraLagerUtstyr extends Component {
  render() {
    return <div />;
  }

  mounted() {
    lagerService.hentReparasjonUtstyr(this.props.match.params.id, hentReparasjonUtstyr => {
      lagerService.slettUtilgjengeligeUtstyr(this.props.match.params.id, slettUtilgjengeligeUtstyr => {
        history.push('/utilgjengeligUtstyr/' + this.props.match.params.ansattId);
      });
    });
  }
}

export class Reparasjoner extends Component {
  reparasjoner = [];
  tabell5 = [];

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.tilbake}>
            Tilbake til startsiden
          </button>
        </div>
        <h2>Oversikt over sykler som trenger reparasjon</h2>
        <br />
        <table id="customers" align="center">
          <tbody>{this.tabell5}</tbody>
        </table>
      </div>
    );
  }
  mounted() {
    lagerService.hentReparasjoner(reparasjoner => {
      this.reparasjoner = reparasjoner;
      this.createTable5();
      console.log(this.reparasjoner);
    });
  }
  createTable5() {
    this.tabell5.push(
      <tr>
        <th>ID</th>
        <th>Type</th>
        <th>Status</th>
        <th>Modellnavn</th>
        <th>Ferdig Reparert</th>
      </tr>
    );

    for (let i = 0; i < this.reparasjoner.length; i++) {
      this.tabell5.push(
        <tr>
          <td>{this.reparasjoner[i].id}</td>
          <td>{this.reparasjoner[i].type}</td>
          <td>{this.reparasjoner[i].status}</td>
          <td>{this.reparasjoner[i].modellnavn}</td>
          <td>
            <NavLink to={'/reparasjoner/' + this.props.match.params.ansattId + this.reparasjoner[i].id + '/edit'}>
              {' '}
              X{' '}
            </NavLink>
          </td>
        </tr>
      );
    }
  }

  tilbake() {
    history.push('/lagerStartside/' + this.props.match.params.ansattId);
  }
}

export class SavnetSykkel extends Component {
  savnetSykkel = [];
  reparasjoner = [];
  tabell = [];
  tabell5 = [];

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.tilbake}>
            Tilbake
          </button>
        </div>
        <h2>Oversikt over utilgjengelige sykler</h2> <br />
        <h4>Utilgjengelige sykler består av sykler som trenger reparasjon, er bortkomne eller ødelagt</h4>
        <button type="button" id="btn btn-sucess btn-lg btn-block" class="btn" onClick={this.visBortkomne}>
          Bortkomne
        </button>
        <button type="button" id="btn btn-sucess btn-lg btn-block" class="btn" onClick={this.visReparasjon}>
          Reparasjoner
        </button>
        <div id="savnettabell">
          <table id="customers" align="center">
            <tbody>{this.tabell}</tbody>
          </table>
        </div>
        <div id="reparasjontabell">
          <table id="customers" align="center">
            <tbody>{this.tabell5}</tbody>
          </table>
        </div>
      </div>
    );
  }
  mounted() {
    lagerService.hentSavnetSykkel(savnetSykkel => {
      this.savnetSykkel = savnetSykkel;
      console.log(this.savnetSykkel);
      this.createTable();
    });
    lagerService.hentReparasjoner(reparasjoner => {
      this.reparasjoner = reparasjoner;
      console.log(this.reparasjoner);
      this.createTable5();
    });
  }

  createTable() {
    this.tabell.push(
      <tr>
        <th>Bestillings ID</th>
        <th>Sykkel ID</th>
        <th>Modellnavn</th>
        <th>Epost</th>
        <th>Tilhørighet</th>
        <th>Innleveringssted</th>
        <th>Innleveringsdato</th>
        <th>Innleveringstid</th>
      </tr>
    );

    for (let i = 0; i < this.savnetSykkel.length; i++) {
      this.tabell.push(
        <tr>
          <td>{this.savnetSykkel[i].bestilling_id}</td>
          <td>{this.savnetSykkel[i].id}</td>
          <td>{this.savnetSykkel[i].modellnavn}</td>
          <td>{this.savnetSykkel[i].kunde_epost}</td>
          <td>{this.savnetSykkel[i].område}</td>
          <td>{this.savnetSykkel[i].innleveringssted}</td>
          <td>{this.savnetSykkel[i].innlevering_dato}</td>
          <td>{this.savnetSykkel[i].innlevering_tid}</td>
        </tr>
      );
    }
  }
  createTable5() {
    this.tabell5.push(
      <tr>
        <th>ID</th>
        <th>Type</th>
        <th>Status</th>
        <th>Modellnavn</th>
        <th>Ferdig Reparert</th>
      </tr>
    );

    for (let i = 0; i < this.reparasjoner.length; i++) {
      this.tabell5.push(
        <tr>
          <td>{this.reparasjoner[i].id}</td>
          <td>{this.reparasjoner[i].type}</td>
          <td>{this.reparasjoner[i].status}</td>
          <td>{this.reparasjoner[i].modellnavn}</td>
          <td>
            <NavLink to={'/reparasjoner/' + this.props.match.params.ansattId + this.reparasjoner[i].id + '/edit'}>
              {' '}
              X{' '}
            </NavLink>
          </td>
        </tr>
      );
    }
  }

  tilbake() {
    history.push('/lagerStartside/' + this.props.match.params.ansattId);
  }
}

export class LeggTilSykkel extends Component {
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
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.tilbake}>
            Tilbake til startsiden
          </button>
        </div>
        <div id="leggTilSykkelDiv">
          <form onSubmit={this.add}>
            <div class="form-inline">
              <h3>Legg til nye sykler</h3>
              <select
                value={this.type}
                class="form-control form-control-lg"
                onChange={e => (this.type = event.target.value)}
                required
              >
                <option>Velg sykkeltype</option>
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
              <br />
              <input
                type="text"
                placeholder="Modellnavn"
                class="form-control form-control-lg"
                onChange={e => (this.modellnavn = e.target.value)}
                required
              />
              <br />
              <input
                type="number"
                placeholder="Hjulstørrelse"
                class="form-control form-control-lg"
                onChange={e => (this.hjul_størrelse = e.target.value)}
                required
              />
              <br />
              <select
                value={this.girsystem}
                class="form-control form-control-lg"
                onChange={e => (this.girsystem = event.target.value)}
                required
              >
                <option>Velg girtype</option>
                <option value="Derailleurgir">Derailleurgir</option>
                <option value="Navgir">Navgir</option>
              </select>
              <br />
              <input
                type="text"
                placeholder="Ramme"
                class="form-control form-control-lg"
                onChange={e => (this.ramme = e.target.value)}
                required
              />
              <br />
              <select
                id="lokasjon_id"
                class="form-control form-control-lg"
                onChange={e => (this.lokasjon_id = event.target.value)}
              >
                {' '}
                <option value="" selected>
                  Velg tilhørighet:
                </option>
                {this.tilhørighet.map(tilhørighet => (
                  <option value={tilhørighet.id} key={tilhørighet.id}>
                    {tilhørighet.område}
                  </option>
                ))}
              </select>
              <br />
              <select
                name="bremse"
                value={this.bremse}
                class="form-control form-control-lg"
                onChange={e => (this.bremse = event.target.value)}
                required
              >
                <option>Velg bremsetype</option>
                <option value="Hydraulisk Skivebrems">Hydraulisk Skivebrems</option>
                <option value="Bremsekloss">Bremsekloss</option>
              </select>
              <br />
              <input
                type="number"
                id="number"
                min="0"
                placeholder="Timepris"
                class="form-control form-control-lg"
                onChange={e => (this.timepris = e.target.value)}
                required
              />
            </div>
            <button type="submit" class="btn btn-sucess btn-lg btn-block">
              Legg til
            </button>
          </form>
        </div>
      </div>
    );
  }
  mounted() {
    var number = document.getElementById('number');
    number.onkeydown = function(e) {
      if (!((e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58) || e.keyCode == 8)) {
        return false;
      }
    };
    bestillingService.hentUtleveringsted(tilhørighet => {
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
  tilhørighet = [];

  type = '';
  lokasjon_id = '';
  beskrivelse = '';
  status = 'Ledig';
  pris = '';

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.tilbake}>
            Tilbake til startsiden
          </button>
        </div>
        <div id="leggTilSykkelDiv">
          <form onSubmit={this.add}>
            <div class="form-inline">
              <h3>Legg til nytt utsyr</h3>
              <select
                value={this.type}
                class="form-control form-control-lg"
                onChange={e => (this.type = event.target.value)}
                required
              >
                <option>Velg utstyrstype</option>
                <option value="Hjelm voksne">Hjelm voksne</option>
                <option value="Hjelm barn">Hjelm barn</option>
                <option value="Sykkellås">Sykkellås</option>
                <option value="Barnesete">Barnesete</option>
                <option value="Sykkelvogn">Sykkelvogn</option>
                <option value="Sykkelkurv">Sykkelkurv</option>
                <option value="Sykkelstativ">Sykkelstativ</option>
              </select>
              <br />
              <select
                id="lokasjon_id"
                class="form-control form-control-lg"
                onChange={e => (this.lokasjon_id = event.target.value)}
              >
                {' '}
                <option value="" selected>
                  Velg tilhørighet:
                </option>
                {this.tilhørighet.map(tilhørighet => (
                  <option value={tilhørighet.id} key={tilhørighet.id}>
                    {tilhørighet.område}
                  </option>
                ))}
              </select>
              <br />
              <input
                type="text"
                placeholder="Beskrivelse"
                value={this.beskrivelse}
                class="form-control form-control-lg"
                onChange={e => (this.beskrivelse = e.target.value)}
                required
              />
              <br />
              <input
                type="number"
                min="0"
                id="number"
                placeholder="Timepris"
                class="form-control form-control-lg"
                onChange={e => (this.pris = event.target.value)}
                required
              />
            </div>
            <button type="submit" class="btn btn-sucess btn-lg btn-block">
              Legg til
            </button>
          </form>
        </div>
      </div>
    );
  }
  mounted() {
    var number = document.getElementById('number');
    number.onkeydown = function(e) {
      if (!((e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58) || e.keyCode == 8)) {
        return false;
      }
    };
    bestillingService.hentUtleveringsted(tilhørighet => {
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
  sykler = null;
  tilhørighet = [];

  render() {
    if (!this.sykler) return null;

    return (
      <div id="yttersteDiv">
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.tilbake}>
            Tilbake til startsiden
          </button>
        </div>
        <div id="leggTilSykkelDiv">
          <form onSubmit={this.save}>
            <div class="form-inline">
              <h3>
                {this.sykler.modellnavn} med ID-nummer {this.sykler.id}{' '}
              </h3>
              <select
                value={this.sykler.status}
                class="form-control form-control-lg"
                onChange={e => (this.sykler.status = event.target.value)}
                required
              >
                <option value="Ledig">Ledig</option>
                <option value="Utleid">Utleid</option>
                <option value="Reparasjon">Til reparasjon</option>
              </select>
              <br />
              <select
                value={this.sykler.lokasjon_id}
                class="form-control form-control-lg"
                onChange={e => (this.sykler.lokasjon_id = event.target.value)}
                required
              >
                {this.tilhørighet.map(tilhørighet => (
                  <option value={tilhørighet.id} key={tilhørighet.id}>
                    {tilhørighet.område}
                  </option>
                ))}
              </select>
              <br />
              <input
                type="number"
                class="form-control form-control-lg"
                value={this.sykler.timepris}
                onChange={e => (this.sykler.timepris = event.target.value)}
                required
              />
            </div>
            <button type="submit" class="btn btn-sucess btn-lg btn-block">
              Lagre
            </button>
            <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.delete}>
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
    bestillingService.hentUtleveringsted(tilhørighet => {
      this.tilhørighet = tilhørighet;
      console.log(this.tilhørighet);
    });
  }

  save() {
    lagerService.updateSykkel(
      this.sykler.status,
      this.sykler.lokasjon_id,
      this.sykler.timepris,
      this.props.match.params.id,
      updateSykkel => {
        history.push('/lagerStartside/' + this.props.match.params.ansattId);
      }
    );
  }
  tilbake() {
    history.push('/lagerStartside/' + this.props.match.params.ansattId);
  }
  delete() {
    lagerService.deleteSykkel(this.props.match.params.id, () =>
      history.push('/lagerStartside/' + this.props.match.params.ansattId)
    );
  }
}
export class EndreUtstyrLager extends Component {
  utstyr = null;
  tilhørighet = [];

  render() {
    if (!this.utstyr) return null;

    return (
      <div id="yttersteDiv">
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.tilbake}>
            Tilbake til startsiden
          </button>
        </div>
        <div id="leggTilSykkelDiv">
          <form onSubmit={this.save}>
            <div class="form-inline">
              <h3>
                {this.utstyr.type} med ID-nummer {this.utstyr.id}{' '}
              </h3>
              <select
                value={this.utstyr.status}
                class="form-control form-control-lg"
                onChange={e => (this.utstyr.status = event.target.value)}
                required
              >
                <option value="Ledig">Ledig</option>
                <option value="Utleid">Utleid</option>
                <option value="Reparasjon">Til reparasjon</option>
              </select>
              <br />
              <select
                value={this.utstyr.lokasjon_id}
                class="form-control form-control-lg"
                onChange={e => (this.utstyr.lokasjon_id = event.target.value)}
                required
              >
                {this.tilhørighet.map(tilhørighet => (
                  <option value={tilhørighet.id} key={tilhørighet.id}>
                    {tilhørighet.område}
                  </option>
                ))}
              </select>
              <br />
              <input
                type="number"
                class="form-control form-control-lg"
                value={this.utstyr.pris}
                onChange={e => (this.utstyr.pris = event.target.value)}
                required
              />
            </div>
            <button type="submit" class="btn btn-sucess btn-lg btn-block">
              Lagre
            </button>
            <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.delete}>
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
    bestillingService.hentUtleveringsted(tilhørighet => {
      this.tilhørighet = tilhørighet;
    });
  }

  save() {
    lagerService.updateUtstyr(
      this.utstyr.status,
      this.utstyr.lokasjon_id,
      this.utstyr.pris,
      this.props.match.params.id,
      updateUtstyr => {
        history.push('/lagerStartside/' + this.props.match.params.ansattId);
      }
    );
  }
  tilbake() {
    history.push('/lagerStartside/' + this.props.match.params.ansattId);
  }
  delete() {
    lagerService.deleteUtstyr(this.props.match.params.id, () =>
      history.push('/lagerStartside/' + this.props.match.params.ansattId)
    );
  }
}
