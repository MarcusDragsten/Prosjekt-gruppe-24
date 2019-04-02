import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { lagerService } from '../services/lagerService.js';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

export class LagerStartside extends Component {
  render() {
    return (
      <div>
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.loggUtPush}>
            Logg ut
          </button>
        </div>
        <h1>Startside - Lager</h1>
        <br />
        <button type="button" class="button" onClick={this.ledigSykkel}>
          Sykler på lager
        </button>
        <button type="button" class="button" onClick={this.utleidSykkel}>
          Utleide sykler
        </button>
        <br />

        <button type="button" class="button" onClick={this.ledigUtstyr}>
          Utstyr på lager
        </button>
        <button type="button" class="button" onClick={this.utleidUtstyr}>
          Utleide utstyr
        </button>
        <br />

        <button type="button" class="button" onClick={this.reparasjoner}>
          Reparasjoner
        </button>
        <button type="button" class="button" onClick={this.henteSykkel}>
          Transport
        </button>
        <br />

        <button type="button" class="button" onClick={this.leggTilSykkel}>
          Legg til sykler
        </button>
        <button type="button" class="button" onClick={this.leggTilUtstyr}>
          Legg til utstyr
        </button>
      </div>
    );
  }

  leggTilSykkel() {
    history.push('/leggTilSykkel');
  }
  leggTilUtstyr() {
    history.push('/leggTilUtstyr');
  }
  ledigSykkel() {
    history.push('/ledigSykkel');
  }
  utleidSykkel() {
    history.push('/utleidSykkel');
  }
  ledigUtstyr() {
    history.push('/ledigUtstyr');
  }
  utleidUtstyr() {
    history.push('/utleidUtstyr');
  }
  reparasjoner() {
    history.push('/reparasjoner');
  }
  henteSykkel() {
    history.push('/henteSykkel');
  }
  loggUtPush() {
    history.push('/');
  }
}
export class LedigSykkel extends Component {
  sykkelPåLager = [];
  tabell1 = [];

  type = '';
  tilhørighet = '';
  lokasjon_id = '';
  modellnavn = '';
  timepris = '';

  render() {
    return (
      <div>
        <button type="Add" onClick={this.tilbake}>
          Tilbake til startsiden
        </button>
        <h2>Oversikt over sykler på lager</h2>
        <h3>Filtrer syklene:</h3>
        <div>
          <form onSubmit={this.sok}>
            <input type="text" id="type" placeholder="Sykkeltype" onChange={e => (this.type = event.target.value)} />
            <select id="lokasjon_id" onChange={e => (this.lokasjon_id = event.target.value)}>
              <option value="" selected>
                Tilhørighet:
              </option>
              <option value="1">Haugastøl</option>
              <option value="2">Finse</option>
              <option value="3">Flåm</option>
              <option value="4">Voss</option>
              <option value="5">Myrdal</option>
            </select>
            <input
              type="text"
              id="modellnavn"
              placeholder="Modellnavn"
              onChange={e => (this.modellnavn = event.target.value)}
            />
            <input
              type="number"
              id="timepris"
              placeholder="Timepris"
              onChange={e => (this.timepris = event.target.value)}
            />
            <button type="submit">Søk</button>
            <button type="button" onClick={this.nullstill}>
              Nullstill
            </button>
          </form>
        </div>
        <br />
        <table>
          <tbody>{this.tabell1}</tbody>
        </table>
      </div>
    );
  }

  mounted() {
    lagerService.hentSykkelPåLager(sykkelPåLager => {
      this.sykkelPåLager = sykkelPåLager;
      this.createTable1();
    });
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
        if (this.sykkelPåLager[i].lokasjon_id == 1) {
          this.tilhørighet = 'Haugastøl';
        } else if (this.sykkelPåLager[i].lokasjon_id == 2) {
          this.tilhørighet = 'Finse';
        } else if (this.sykkelPåLager[i].lokasjon_id == 3) {
          this.tilhørighet = 'Flåm';
        } else if (this.sykkelPåLager[i].lokasjon_id == 4) {
          this.tilhørighet = 'Voss';
        } else if (this.sykkelPåLager[i].lokasjon_id == 5) {
          this.tilhørighet = 'Myrdal';
        }
        this.tabell1.push(
          <tr>
            <td>{this.sykkelPåLager[i].id}</td>
            <td>{this.sykkelPåLager[i].modellnavn}</td>
            <td>{this.sykkelPåLager[i].type}</td>
            <td>{this.sykkelPåLager[i].hjul_størrelse}</td>
            <td>{this.sykkelPåLager[i].girsystem}</td>
            <td>{this.sykkelPåLager[i].ramme}</td>
            <td>{this.sykkelPåLager[i].bremse}</td>
            <td>{this.tilhørighet}</td>
            <td>{this.sykkelPåLager[i].timepris}</td>
            <td>
              <NavLink to={'/redigerSykkel/' + this.sykkelPåLager[i].id + '/edit'}> Endre </NavLink>
            </td>
          </tr>
        );
      }
    }
  }

  tilbake() {
    history.push('/lagerStartside/');
  }
  sok(e) {
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

  type = '';
  tilhørighet = '';
  modellnavn = '';
  timepris = '';

  render() {
    return (
      <div>
        <button type="Add" onClick={this.tilbake}>
          Tilbake til startsiden
        </button>
        <h2>Oversikt over utleide sykler</h2>
        <h3>Filtrer syklene:</h3>
        <div>
          <form onSubmit={this.sokUtleid}>
            <input type="text" id="type" placeholder="Sykkeltype" onChange={e => (this.type = event.target.value)} />
            <select id="lokasjon_id" onChange={e => (this.lokasjon_id = event.target.value)}>
              <option value="" selected>
                Tilhørighet:
              </option>
              <option value="1">Haugastøl</option>
              <option value="2">Finse</option>
              <option value="3">Flåm</option>
              <option value="4">Voss</option>
              <option value="5">Myrdal</option>
            </select>
            <input
              type="text"
              id="modellnavn"
              placeholder="Modellnavn"
              onChange={e => (this.modellnavn = event.target.value)}
            />
            <input
              type="number"
              id="timepris"
              placeholder="Timepris"
              onChange={e => (this.timepris = event.target.value)}
            />
            <button type="submit">Søk</button>
            <button type="button" onClick={this.nullstill}>
              Nullstill
            </button>
          </form>
        </div>
        <br />
        <table>
          <tbody>{this.tabell1}</tbody>
        </table>
      </div>
    );
  }

  mounted() {
    lagerService.hentUtleideSykler(sykkelUtleid => {
      this.sykkelUtleid = sykkelUtleid;
      this.createTable1();
    });
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

      for (let i = 0; i < this.sykkelUtleid.length; i++) {
        if (this.sykkelUtleid[i].lokasjon_id == 1) {
          this.tilhørighet = 'Haugastøl';
        } else if (this.sykkelUtleid[i].lokasjon_id == 2) {
          this.tilhørighet = 'Finse';
        } else if (this.sykkelUtleid[i].lokasjon_id == 3) {
          this.tilhørighet = 'Flåm';
        } else if (this.sykkelUtleid[i].lokasjon_id == 4) {
          this.tilhørighet = 'Voss';
        } else if (this.sykkelUtleid[i].lokasjon_id == 5) {
          this.tilhørighet = 'Myrdal';
        }
        this.tabell1.push(
          <tr>
            <td>{this.sykkelUtleid[i].id}</td>

            <td>{this.sykkelUtleid[i].modellnavn}</td>
            <td>{this.sykkelUtleid[i].type}</td>
            <td>{this.sykkelUtleid[i].hjul_størrelse}</td>
            <td>{this.sykkelUtleid[i].girsystem}</td>
            <td>{this.sykkelUtleid[i].ramme}</td>
            <td>{this.sykkelUtleid[i].bremse}</td>
            <td>{this.tilhørighet}</td>
            <td>{this.sykkelUtleid[i].timepris}</td>
            <td>
              <NavLink to={'/redigerSykkel/' + this.sykkelUtleid[i].id + '/edit'}> Endre </NavLink>
            </td>
          </tr>
        );
      }
    }
  }
  tilbake() {
    history.push('/lagerStartside/');
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
export class LedigUtstyr extends Component {
  utstyrPåLager = [];
  tabell1 = [];

  type = '';
  pris = '';
  tilhørighet = '';

  render() {
    return (
      <div>
        <button type="Add" onClick={this.tilbake}>
          Tilbake til startsiden
        </button>
        <h2>Oversikt over utstyr på lager</h2>
        <h3>Filtrer syklene:</h3>
        <div>
          <form onSubmit={this.sok}>
            <select id="type" onChange={e => (this.type = event.target.value)}>
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
            <select id="lokasjon_id" onChange={e => (this.lokasjon_id = event.target.value)}>
              <option value="" selected>
                Tilhørighet:
              </option>
              <option value="1">Haugastøl</option>
              <option value="2">Finse</option>
              <option value="3">Flåm</option>
              <option value="4">Voss</option>
              <option value="5">Myrdal</option>
            </select>
            <input type="number" id="pris" placeholder="Timepris" onChange={e => (this.pris = event.target.value)} />
            <button type="submit">Søk</button>
            <button type="button" onClick={this.nullstill}>
              Nullstill
            </button>
          </form>
        </div>
        <br />
        <table>
          <tbody>{this.tabell1}</tbody>
        </table>
      </div>
    );
  }

  mounted() {
    lagerService.hentUtstyrPåLager(utstyrPåLager => {
      this.utstyrPåLager = utstyrPåLager;
      this.createTable1();
    });
  }

  createTable1() {
    if (this.sykkelPåLager == 0) {
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
        if (this.utstyrPåLager[i].lokasjon_id == 1) {
          this.tilhørighet = 'Haugastøl';
        } else if (this.utstyrPåLager[i].lokasjon_id == 2) {
          this.tilhørighet = 'Finse';
        } else if (this.utstyrPåLager[i].lokasjon_id == 3) {
          this.tilhørighet = 'Flåm';
        } else if (this.utstyrPåLager[i].lokasjon_id == 4) {
          this.tilhørighet = 'Voss';
        } else if (this.utstyrPåLager[i].lokasjon_id == 5) {
          this.tilhørighet = 'Myrdal';
        }
        this.tabell1.push(
          <tr>
            <td>{this.utstyrPåLager[i].id}</td>
            <td>{this.utstyrPåLager[i].type}</td>
            <td>{this.utstyrPåLager[i].beskrivelse}</td>
            <td>{this.tilhørighet}</td>
            <td>{this.utstyrPåLager[i].pris}</td>
            <td>
              <NavLink to={'/redigerUtstyr/' + this.utstyrPåLager[i].id + '/edit'}> Endre </NavLink>
            </td>
          </tr>
        );
      }
    }
  }
  tilbake() {
    history.push('/lagerStartside/');
  }
  sok(e) {
    e.preventDefault();
    if (this.type == '') this.type = '%';
    if (this.lokasjon_id == '') this.lokasjon_id = '%';
    if (this.pris == '') this.pris = '%';

    lagerService.sokUtstyr(this.type, this.lokasjon_id, this.pris, sok => {
      this.utstyrPåLager = sok;
      this.createTable1();
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

  type = '';
  tilhørighet = '';
  pris = '';

  render() {
    return (
      <div>
        <button type="Add" onClick={this.tilbake}>
          Tilbake til startsiden
        </button>
        <h2>Oversikt over utleide utstyr</h2>
        <h3>Filtrer syklene:</h3>
        <div>
          <form onSubmit={this.sok}>
            <select id="type" onChange={e => (this.type = event.target.value)}>
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
            <select id="lokasjon_id" onChange={e => (this.lokasjon_id = event.target.value)}>
              <option value="" selected>
                Tilhørighet:
              </option>
              <option value="1">Haugastøl</option>
              <option value="2">Finse</option>
              <option value="3">Flåm</option>
              <option value="4">Voss</option>
              <option value="5">Myrdal</option>
            </select>
            <input type="number" id="pris" placeholder="Timepris" onChange={e => (this.pris = event.target.value)} />
            <button type="submit">Søk</button>
            <button type="button" onClick={this.nullstill}>
              Nullstill
            </button>
          </form>
        </div>
        <br />
        <table>
          <tbody>{this.tabell1}</tbody>
        </table>
      </div>
    );
  }

  mounted() {
    lagerService.hentUtleideUtstyr(utstyrUtleid => {
      this.utstyrUtleid = utstyrUtleid;
      this.createTable1();
    });
  }

  createTable1() {
    if (this.sykkelPåLager == 0) {
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
        if (this.utstyrUtleid[i].lokasjon_id == 1) {
          this.tilhørighet = 'Haugastøl';
        } else if (this.utstyrUtleid[i].lokasjon_id == 2) {
          this.tilhørighet = 'Finse';
        } else if (this.utstyrUtleid[i].lokasjon_id == 3) {
          this.tilhørighet = 'Flåm';
        } else if (this.utstyrUtleid[i].lokasjon_id == 4) {
          this.tilhørighet = 'Voss';
        } else if (this.utstyrUtleid[i].lokasjon_id == 5) {
          this.tilhørighet = 'Myrdal';
        }
        this.tabell1.push(
          <tr>
            <td>{this.utstyrUtleid[i].id}</td>
            <td>{this.utstyrUtleid[i].type}</td>
            <td>{this.utstyrUtleid[i].beskrivelse}</td>
            <td>{this.tilhørighet}</td>
            <td>{this.utstyrUtleid[i].pris}</td>
            <td>
              <NavLink to={'/redigerUtstyr/' + this.utstyrUtleid[i].id + '/edit'}> Endre </NavLink>
            </td>
          </tr>
        );
      }
    }
  }
  tilbake() {
    history.push('/lagerStartside/');
  }
  sok(e) {
    e.preventDefault();
    if (this.type == '') this.type = '%';
    if (this.lokasjon_id == '') this.lokasjon_id = '%';
    if (this.pris == '') this.pris = '%';

    lagerService.sokUtstyrUtleid(this.type, this.lokasjon_id, this.pris, sok => {
      this.utstyrUtleid = sok;
      this.createTable1();
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

export class Reparasjoner extends Component {
  reparasjoner = [];
  tabell5 = [];

  render() {
    return (
      <div>
        <h3>Oversikt over sykler som trenger reparasjon</h3>
        <table>
          <tbody>{this.tabell5}</tbody>
        </table>
        <button type="Add" onClick={this.tilbake}>
          Tilbake
        </button>
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
            <NavLink to={'/reparasjoner/' + this.reparasjoner[i].id + '/edit'}> Ferdig reparert </NavLink>
          </td>
        </tr>
      );
    }
  }

  tilbake() {
    history.push('/lagerStartside/');
  }
}

export class EndreReparasjoner extends Component {
  reparasjoner = null;

  render() {
    if (!this.reparasjoner) return null;

    return (
      <div>
        Helt sikker?
        <button type="button" onClick={this.save}>
          Ja
        </button>
      </div>
    );
  }
  mounted() {
    lagerService.hentReparasjon(this.props.match.params.id, reparasjoner => {
      this.reparasjoner = reparasjoner;
    });
  }

  save() {
    lagerService.ferdigReparasjoner(this.reparasjoner, () => {
      history.push('/reparasjoner/');
    });
  }
}

export class HenteSykkel extends Component {
  sykkel = [];
  tabell6 = [];

  render() {
    return (
      <div>
        <h3>Oversikt over sykler som trenger transport</h3>
        <table>
          <tbody>{this.tabell6}</tbody>
        </table>
        <button type="button" onClick={this.tilbake}>
          Tilbake
        </button>
      </div>
    );
  }

  mounted() {
    lagerService.henteSykkel(sykkel => {
      this.sykkel = sykkel;
      this.createTable6();
    });
  }

  createTable6() {
    this.tabell6.push(
      <tr>
        <th>Bestillings ID</th>
        <th>Sykkel ID</th>
        <th>Type</th>
        <th>Modellnavn</th>
        <th>Lokasjon</th>
        <th>Dato</th>
        <th>Tid</th>
      </tr>
    );

    for (let i = 0; i < this.sykkel.length; i++) {
      this.tabell6.push(
        <tr>
          <td>{this.sykkel[i].bestilling_id}</td>
          <td>{this.sykkel[i].id}</td>
          <td>{this.sykkel[i].type}</td>
          <td>{this.sykkel[i].modellnavn}</td>
          <td>{this.sykkel[i].innleveringssted}</td>
          <td>{this.sykkel[i].innlevering_dato}</td>
          <td>{this.sykkel[i].innlevering_tid}</td>
          <td>
            <NavLink to={'/henteSykkel/' + this.sykkel[i].id + '/edit'}>Sykkel er hentet</NavLink>
          </td>
        </tr>
      );
    }
  }
  tilbake() {
    history.push('/lagerStartside/');
  }
}
class EndreHenteSykkel extends Component {
  sykkel = null;

  render() {
    if (!this.sykkel) return null;

    return (
      <div>
        Helt sikker?
        <button type="button" onClick={this.save}>
          Ja
        </button>
      </div>
    );
  }
  mounted() {
    lagerService.henteSykkelId(this.props.match.params.id, sykkel => {
      this.sykkel = sykkel;
    });
  }

  save() {
    lagerService.ferdigHentet(this.sykkel, () => {
      history.push('/henteSykkel/');
    });
  }
}

export class LeggTilSykkel extends Component {
  status = 'Ledig';
  hjul_størrelse = '';
  girsystem = '';
  ramme = '';
  lokasjon_id = '';
  bremse = '';
  modellnavn = '';
  timepris = '';

  render() {
    if (this.modellnavn == 'Barnesykkel') {
      this.type = 'Barnesykkel';
    } else if (this.modellnavn == 'Juniorsykkel') {
      this.type = 'Juniorsykkel';
    } else if (this.modellnavn == 'El-sykkel') {
      this.type = 'El-sykkel';
    } else if (this.modellnavn == 'Ghost Terreng') {
      this.type = 'Terrengsykkel';
    } else if (this.modellnavn == 'Racersykkel') {
      this.type = 'Landeveissykkel';
    } else {
      this.type = 'Hybridsykkel';
    }
    return (
      <div>
        <ul>
          <li>
            Modellnavn:
            <select value={this.modellnavn} onChange={e => (this.modellnavn = event.target.value)} required>
              <option>Velg modellnavn</option>
              <option value="Ghost Hybrid Dame m/ bagasjebrett">Ghost Hybrid Dame med bagasjebrett</option>
              <option value="Ghost Hybrid Herre m/ bagasjebrett">Ghost Hybrid Herre med bagasjebrett</option>
              <option value="Ghost Hybrid Dame">Ghost Hybrid Dame uten bagasjebrett</option>
              <option value="Ghost Hybrid Herre">Ghost Hybrid Herre uten bagasjebrett</option>
              <option value="Barnesykkel">Ghost Barnesykkel</option>
              <option value="Juniorsykkel">Ghost Juniorsykkel</option>
              <option value="El-sykkel">Ghost El-sykkel</option>
              <option value="Ghost Terreng">Ghost Terreng</option>
              <option value="Racersykkel">Ghost Landeveissykkel</option>
            </select>
          </li>
          <li>
            Hjulstørrelse
            <input type="number" onChange={e => (this.hjul_størrelse = e.target.value)} required />
          </li>
          <li>
            Girsystem
            <select value={this.girsystem} onChange={e => (this.girsystem = event.target.value)} required>
              <option>Velg girtype</option>
              <option value="Derailleurgir">Derailleurgir</option>
              <option value="Navgir">Navgir</option>
            </select>
          </li>
          <li>
            Ramme
            <input type="text" onChange={e => (this.ramme = e.target.value)} required />
          </li>
          <li>
            Lokasjon:
            <select value={this.lokasjon_id} onChange={e => (this.lokasjon_id = event.target.value)} required>
              <option>Velg lokasjon</option>
              <option value="1">Haugastøl</option>
              <option value="2">Finse</option>
              <option value="3">Flåm</option>
              <option value="4">Voss</option>
              <option value="5">Myrdal</option>
            </select>
          </li>
          <li>
            Bremser:
            <select name="bremse" value={this.bremse} onChange={e => (this.bremse = event.target.value)} required>
              <option>Velg bremsetype</option>
              <option value="Hydraulisk Skivebrems">Hydraulisk Skivebrems</option>
              <option value="Bremsekloss">Bremsekloss</option>
            </select>
          </li>
          <li>
            Timepris
            <input type="number" onChange={e => (this.timepris = e.target.value)} required />
          </li>
        </ul>
        <button type="save" onClick={this.add}>
          Legg til
        </button>
        <button type="Add" onClick={this.tilbake}>
          Tilbake
        </button>
      </div>
    );
  }

  add() {
    lagerService.addSykkel(
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
        history.push('/lagerStartside/' + id);
      }
    );
  }

  tilbake() {
    history.push('/lagerStartside/');
  }
}

export class LeggTilUtstyr extends Component {
  type = '';
  beskrivelse = '';
  status = 'Ledig';
  pris = '';

  render() {
    return (
      <div>
        <ul>
          <li>
            Type:
            <select value={this.type} onChange={e => (this.type = event.target.value)} required>
              <option>Velg utstyrstype</option>
              <option value="Hjelm voksne">Hjelm voksne</option>
              <option value="Hjelm barn">Hjelm barn</option>
              <option value="Sykkellås">Sykkellås</option>
              <option value="Barnesete">Barnesete</option>
              <option value="Sykkelvogn">Sykkelvogn</option>
              <option value="Sykkelkurv">Sykkelkurv</option>
              <option value="Sykkelstativ">Sykkelstativ</option>
            </select>
          </li>
          <li>
            Beskrivelse:
            <input type="text" value={this.beskrivelse} onChange={e => (this.beskrivelse = e.target.value)} required />
          </li>
          <li>
            Pris:
            <input type="number" onChange={e => (this.pris = event.target.value)} required />
          </li>
        </ul>
        <button type="save" onClick={this.add}>
          Legg til
        </button>
        <button type="Add" onClick={this.tilbake}>
          Tilbake
        </button>
      </div>
    );
  }

  add() {
    lagerService.addUtstyr(this.type, this.beskrivelse, this.status, this.pris, id => {
      history.push('/lagerStartside/' + id);
    });
  }

  tilbake() {
    history.push('/lagerStartside/');
  }
}
export class EndreSykkel extends Component {
  sykler = null;

  render() {
    if (!this.sykler) return null;

    return (
      <div>
        <ul>
          <li>
            Status:
            <select value={this.sykler.status} onChange={e => (this.sykler.status = event.target.value)} required>
              <option value="Ledig">Ledig</option>
              <option value="Utleid">Utleid</option>
              <option value="Reparasjon">Til reparasjon</option>
            </select>
          </li>
          <li>
            Lokasjon:
            <select
              value={this.sykler.lokasjon_id}
              onChange={e => (this.sykler.lokasjon_id = event.target.value)}
              required
            >
              <option value="1">Haugastøl</option>
              <option value="2">Finse</option>
              <option value="3">Rallanregen</option>
              <option value="4">Holbergplassen</option>
              <option value="5">Myrdal Stasjon</option>
            </select>
          </li>
          <li>
            Timepris:
            <input
              type="number"
              value={this.sykler.timepris}
              onChange={e => (this.sykler.timepris = event.target.value)}
              required
            />
          </li>
        </ul>

        <button type="save" onClick={this.save}>
          Save
        </button>
        <button type="save" onClick={this.tilbake}>
          Tilbake
        </button>
      </div>
    );
  }
  mounted() {
    lagerService.getSykkel(this.props.match.params.id, sykkel => {
      this.sykler = sykkel;
    });
  }

  save() {
    lagerService.updateSykkel(this.sykler, () => {
      history.push('/lagerStartside/');
    });
  }
  tilbake() {
    history.push('/lagerStartside');
  }
  delete() {
    lagerService.deleteSykkel(this.props.match.params.id, () => history.push('lagerStartside'));
  }
}
export class EndreUtstyrLager extends Component {
  utstyr = null;

  render() {
    if (!this.utstyr) return null;

    return (
      <div>
        <ul>
          <li>
            Status:
            <select value={this.utstyr.status} onChange={e => (this.utstyr.status = event.target.value)} required>
              <option value="Ledig">Ledig</option>
              <option value="Utleid">Utleid</option>
              <option value="Reparasjon">Til reparasjon</option>
            </select>
          </li>
          <li>
            Timepris:
            <input
              type="number"
              value={this.utstyr.pris}
              onChange={e => (this.utstyr.pris = event.target.value)}
              required
            />
          </li>
        </ul>

        <button type="save" onClick={this.save}>
          Save
        </button>
        <button type="save" onClick={this.tilbake}>
          Tilbake
        </button>
      </div>
    );
  }
  mounted() {
    lagerService.getUtstyr(this.props.match.params.id, utstyr => {
      this.utstyr = utstyr;
    });
  }

  save() {
    lagerService.updateUtstyr(this.utstyr, () => {
      history.push('/lagerStartside/');
    });
  }
  tilbake() {
    history.push('/lagerStartside');
  }
  delete() {
    lagerService.deleteUtstyr(this.props.match.params.id, () => history.push('lagerStartside'));
  }
}
