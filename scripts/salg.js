import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { bestillingService } from '../services/bestillingService.js';
import { sykkelService } from '../services/sykkelService.js';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

export class SalgStartside extends Component {
  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.loggUtPush}>
            Logg ut
          </button>
        </div>
        <div id="salgStartsideKnapperDiv">
          <h2>Velkommen til selgersiden</h2>
          <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.nyBestillingPush}>
            Ny Bestilling
          </button>
          <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.endreBestillingPush}>
            Aktive bestillinger
          </button>
          <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.historikkPush}>
            Bestillingshistorikk
          </button>
        </div>
      </div>
    );
  }
  nyBestillingPush() {
    history.push('/bestilling/');
  }
  endreBestillingPush() {
    history.push('/aktiveBestillinger/');
  }
  historikkPush() {
    history.push('/bestillingHistorikk/');
  }
  loggUtPush() {
    history.push('/');
  }
}

export class AktiveBestillinger extends Component {
  // Oversikt over aktive? bestillinger
  bestillinger = [];
  tabell = [];
  ansatt = [];

  bestilling_type = '';
  kunde_epost = '';
  utleveringssted = '';
  innleveringssted = '';
  utlevering_dato = '';
  innlevering_dato = '';

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.loggUtPush}>
            Logg ut
          </button>
        </div>
        <button type="button" onClick={this.tilbake}>
          Tilbake til startsiden
        </button>
        <button type="button" id="toggleFiltrerKnapp" class="btn" onClick={this.toggleFiltrer}>
          Filtrer bestillingene?
        </button>
        <h2>Aktive bestillinger</h2>
        <div id="filtrerAktiveBestillingerDiv">
          <form onSubmit={this.sok}>
            <div class="form-inline">
              <h3>Filtrer bestillingene:</h3>
              <h4>Velg start- og sluttidspunkt</h4>
              <input
                id="utlevering_dato"
                type="date"
                class="form-control form-control-lg"
                onChange={e => (this.utlevering_dato = event.target.value)}
                required
              />
              <input
                id="innlevering_dato"
                type="date"
                class="form-control form-control-lg"
                min={this.utlevering_dato}
                onChange={e => (this.innlevering_dato = event.target.value)}
                required
              />
            </div>
            <br />
            <label for="bestilling_type">Bestillingtype:</label>
            <select
              id="bestilling_type"
              class="form-control form-control-lg"
              onChange={e => (this.bestilling_type = event.target.value)}
            >
              <option value="" selected>
                Søk etter bestillingstype:
              </option>
              <option value="Timeutleie">Timeutleie</option>
              <option value="Dagsutleie">Dagsutleie</option>
              <option value="Helgeutleie">Helgeutleie</option>
            </select>
            <label for="kunde_epost">Kundens Epost:</label>
            <input
              type="text"
              id="kunde_epost"
              class="form-control form-control-lg"
              placeholder="Søk etter kundens epost:"
              onChange={e => (this.kunde_epost = event.target.value)}
            />
            <label for="utleveringssted">Utleveringssted:</label>
            <select
              id="utleveringssted"
              class="form-control form-control-lg"
              onChange={e => (this.utleveringssted = event.target.value)}
            >
              <option value="" selected>
                Søk etter Utleveringssted:
              </option>
              <option value="Haugastøl">Haugastøl</option>
              <option value="Finse">Finse</option>
            </select>
            <label for="innleveringssted">Innleveringssted:</label>
            <select
              id="innleveringssted"
              class="form-control form-control-lg"
              onChange={e => (this.innleveringssted = event.target.value)}
            >
              <option value="" selected>
                Søk etter innleveringssted:
              </option>
              <option value="Haugastøl">Haugastøl</option>
              <option value="Finse">Finse</option>
              <option value="Flåm">Flåm</option>
              <option value="Voss">Voss</option>
              <option value="Myrdal">Myrdal</option>
            </select>
            <button type="submit" class="btn btn-sucess btn-lg btn-block">
              Søk
            </button>
            <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.nullstill}>
              Nullstill
            </button>
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
    bestillingService.hentAktiveBestillinger(bestillinger => {
      this.bestillinger = bestillinger;
      this.createTable();
    });

    bestillingService.hentAnsatt(this.props.match.params.id, ansatt => {
      this.ansatt = ansatt;
    });
  }

  tilbake() {
    history.push('/salgStartside/');
  }
  loggUtPush() {
    history.push('/');
  }

  toggleFiltrer() {
    var x = document.getElementById('filtrerAktiveBestillingerDiv');
    if (window.getComputedStyle(x).display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  createTable() {
    this.tabell = '';
    this.tabell = [];
    this.tabell.push(
      <tr>
        <th>Id</th>
        <th>Bestillingstype</th>
        <th>Kundens epost</th>
        <th>Utleveringssted</th>
        <th>Innleveringssted</th>
        <th>Utleveringstid</th>
        <th>Innleveringstid</th>
        <th>Vis / Endre Bestilling</th>
        <th>Innlevering</th>
      </tr>
    );

    for (let i = 0; i < this.bestillinger.length; i++) {
      this.tabell.push(
        <tr>
          <td>{this.bestillinger[i].id}</td>
          <td>{this.bestillinger[i].bestilling_type}</td>
          <td>{this.bestillinger[i].kunde_epost}</td>
          <td>{this.bestillinger[i].utleveringssted}</td>
          <td>{this.bestillinger[i].innleveringssted}</td>
          <td>
            {this.bestillinger[i].utlevering_dato} {this.bestillinger[i].utlevering_tid}
          </td>
          <td>
            {this.bestillinger[i].innlevering_dato} {this.bestillinger[i].innlevering_tid}
          </td>
          <td>
            <NavLink to={'/endreBestilling/' + this.bestillinger[i].id}> Vis / Endre </NavLink>
          </td>
          <td>
            <NavLink to={'/innlevering/' + this.bestillinger[i].id}> Lever inn </NavLink>
          </td>
        </tr>
      );
    }
  }

  sok(e) {
    e.preventDefault();
    if (this.bestilling_type == '') this.bestilling_type = '%';
    if (this.kunde_epost == '') this.kunde_epost = '%';
    if (this.utleveringssted == '') this.utleveringssted = '%';
    if (this.innleveringssted == '') this.innleveringssted = '%';

    bestillingService.sok(
      this.bestilling_type,
      this.kunde_epost,
      this.utleveringssted,
      this.innleveringssted,
      this.utlevering_dato,
      this.innlevering_dato,
      sok => {
        this.bestillinger = sok;
        this.createTable();
      }
    );
  }

  nullstill() {
    this.bestilling_type = '';
    this.kunde_epost = '';
    this.utleveringssted = '';
    this.innleveringssted = '';
    this.utlevering_dato = '';
    this.innlevering_dato = '';

    document.getElementById('bestilling_type').value = '';
    document.getElementById('kunde_epost').value = '';
    document.getElementById('utleveringssted').value = '';
    document.getElementById('innleveringssted').value = '';
    document.getElementById('utlevering_dato').value = '';
    document.getElementById('innlevering_dato').value = '';

    bestillingService.hentAktiveBestillinger(bestillinger => {
      this.bestillinger = bestillinger;
      this.createTable();
    });
  }
}

export class BestillingHistorikk extends Component {
  // Oversikt over aktive? bestillinger
  bestillinger = [];
  tabell = [];
  ansatt = [];

  bestilling_type = '';
  kunde_epost = '';
  utleveringssted = '';
  innleveringssted = '';
  utlevering_dato = '';
  innlevering_dato = '';

  render() {
    return (
      <div>
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.loggUtPush}>
            Logg ut
          </button>
        </div>
        <button type="button" onClick={this.tilbake}>
          Tilbake til startsiden
        </button>
        <h2>Bestillingshistorikk</h2>
        <h3>Filtrer bestillingene:</h3>
        <div>
          <form onSubmit={this.sok}>
            <div>
              <h4>Velg start- og sluttidspunkt</h4>
              <label for="utlevering_dato">Utleveringstid</label>
              <input
                id="utlevering_dato"
                type="date"
                onChange={e => (this.utlevering_dato = event.target.value)}
                required
              />
              <label for="innlevering_dato">Utleveringstid</label>
              <input
                id="innlevering_dato"
                type="date"
                min={this.utlevering_dato}
                onChange={e => (this.innlevering_dato = event.target.value)}
                required
              />
            </div>
            <br />
            <select id="bestilling_type" onChange={e => (this.bestilling_type = event.target.value)}>
              <option value="" selected>
                Søk etter bestillingstype:
              </option>
              <option value="Timeutleie">Timeutleie</option>
              <option value="Dagsutleie">Dagsutleie</option>
              <option value="Helgeutleie">Helgeutleie</option>
            </select>
            <input
              type="text"
              id="kunde_epost"
              placeholder="Søk etter kundens epost:"
              onChange={e => (this.kunde_epost = event.target.value)}
            />
            <select id="utleveringssted" onChange={e => (this.utleveringssted = event.target.value)}>
              <option value="" selected>
                Søk etter Utleveringssted:
              </option>
              <option value="Haugastøl">Haugastøl</option>
              <option value="Finse">Finse</option>
            </select>
            <select id="innleveringssted" onChange={e => (this.innleveringssted = event.target.value)}>
              <option value="" selected>
                Søk etter innleveringssted:
              </option>
              <option value="Haugastøl">Haugastøl</option>
              <option value="Finse">Finse</option>
              <option value="Flåm">Flåm</option>
              <option value="Voss">Voss</option>
              <option value="Myrdal">Myrdal</option>
            </select>
            <button type="submit">Søk</button>
            <button type="button" onClick={this.nullstill}>
              Nullstill
            </button>
          </form>
        </div>
        <br />
        <table id="customers">
          <tbody>{this.tabell}</tbody>
        </table>
      </div>
    );
  }

  mounted() {
    bestillingService.hentBestillingHistorikk(bestillinger => {
      this.bestillinger = bestillinger;
      this.createTable();
    });

    bestillingService.hentAnsatt(this.props.match.params.id, ansatt => {
      this.ansatt = ansatt;
    });
  }

  tilbake() {
    history.push('/salgStartside/');
  }
  loggUtPush() {
    history.push('/');
  }

  createTable() {
    this.tabell = '';
    this.tabell = [];
    this.tabell.push(
      <tr>
        <th>Id</th>
        <th>Bestillingstype</th>
        <th>Kundens epost</th>
        <th>Utleveringssted</th>
        <th>Innleveringssted</th>
        <th>Utleveringstid</th>
        <th>Innleveringstid</th>
        <th>Faktisk innlevering</th>
      </tr>
    );

    for (let i = 0; i < this.bestillinger.length; i++) {
      this.tabell.push(
        <tr>
          <td>{this.bestillinger[i].id}</td>
          <td>{this.bestillinger[i].bestilling_type}</td>
          <td>{this.bestillinger[i].kunde_epost}</td>
          <td>{this.bestillinger[i].utleveringssted}</td>
          <td>{this.bestillinger[i].innleveringssted}</td>
          <td>
            {this.bestillinger[i].utlevering_dato} {this.bestillinger[i].utlevering_tid}
          </td>
          <td>
            {this.bestillinger[i].innlevering_dato} {this.bestillinger[i].innlevering_tid}
          </td>
          <td>
            {this.bestillinger[i].faktiskInnlevering_dato} {this.bestillinger[i].faktiskInnlevering_tid}
          </td>
        </tr>
      );
    }
  }

  sok(e) {
    e.preventDefault();
    if (this.bestilling_type == '') this.bestilling_type = '%';
    if (this.kunde_epost == '') this.kunde_epost = '%';
    if (this.utleveringssted == '') this.utleveringssted = '%';
    if (this.innleveringssted == '') this.innleveringssted = '%';

    bestillingService.sok2(
      this.bestilling_type,
      this.kunde_epost,
      this.utleveringssted,
      this.innleveringssted,
      this.utlevering_dato,
      this.innlevering_dato,
      sok => {
        this.bestillinger = sok;
        this.createTable();
      }
    );
  }

  nullstill() {
    this.bestilling_type = '';
    this.kunde_epost = '';
    this.utleveringssted = '';
    this.innleveringssted = '';
    this.utlevering_dato = '';
    this.innlevering_dato = '';

    document.getElementById('bestilling_type').value = '';
    document.getElementById('kunde_epost').value = '';
    document.getElementById('utleveringssted').value = '';
    document.getElementById('innleveringssted').value = '';
    document.getElementById('utlevering_dato').value = '';
    document.getElementById('innlevering_dato').value = '';

    bestillingService.hentBestillingHistorikk(bestillinger => {
      this.bestillinger = bestillinger;
      this.createTable();
    });
  }
}

export class Innlevering extends Component {
  steder = [];
  stedStandard = '';

  dateNow = '';
  timeNow = '';

  render() {
    return (
      <div id="innleveringYtterste">
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.loggUtPush}>
            Logg ut
          </button>
        </div>
        <div id="innleveringDiv">
          Hvor er det levert inn?
          <form onSubmit={this.save}>
            <select
              class="form-control"
              id="utleveringsstedInput"
              onChange={e => (this.stedStandard = event.target.value)}
              required
            >
              <option value="" selected hidden>
                Velg utleveringssted
              </option>
              {this.steder.map(steder => (
                <option value={steder.id} key={steder.id}>
                  {steder.område}
                </option>
              ))}
            </select>
            <button type="submit" class="btn">
              Lever inn
            </button>
          </form>
        </div>
      </div>
    );
  }

  mounted() {
    bestillingService.hentInnleveringsted(steder => {
      this.steder = steder;
    });

    this.dagensDato();
  }

  save(e) {
    e.preventDefault();
    bestillingService.leverInn(this.dateNow, this.timeNow, this.props.match.params.id, leverInn => {
      bestillingService.updateSykkel(this.stedStandard, this.props.match.params.id, leverInnSykkel => {
        bestillingService.updateSykkel(this.stedStandard, this.props.match.params.id, leverInnSykkel => {
          history.push('/aktiveBestillinger/' + this.props.match.params.id);
        });
      });
    });
  }

  dagensDato() {
    this.dateNow = new Date();

    var dd = this.dateNow.getDate();
    var mm = this.dateNow.getMonth() + 1;
    var yyyy = this.dateNow.getFullYear();

    var hh = this.dateNow.getHours();
    var min = this.dateNow.getMinutes();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    if (min < 10) {
      min = '0' + min;
    }

    this.dateNow = yyyy + '-' + mm + '-' + dd;

    this.timeNow = hh + ':' + min;

    console.log(this.dateNow);
    console.log(this.timeNow);
  }

  loggUtPush() {
    history.push('/');
  }
}

export class EndreBestilling extends Component {
  // Tar utgangspunkt i listen på startsiden. Kommer til siden som tilhører hver Bestilling
  bestillinger = null;

  syklerPerBestilling = [];
  utstyrPerBestilling = [];

  innleveringssteder = [];
  utleveringssteder = [];

  tabell1 = [];
  tabell2 = [];

  sumSykler = 0;

  render() {
    if (!this.bestillinger) return null;

    return (
      <div id="yttersteDiv">
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.loggUtPush}>
            Logg ut
          </button>
        </div>
        <button type="save" class="btn" onClick={this.tilbake}>
          Tilbake
        </button>
        <div id="endreInfoBestilling">
          <h2>Endre informasjon om bestillingen</h2>
          <hr />
          <div>
            <h3>Bestillingstype:</h3>
            <select
              type="text"
              class="form-control"
              id="bestilling_typeInput"
              value={this.bestillinger.bestilling_type}
              onChange={e => (this.bestillinger.bestilling_type = event.target.value)}
              required
            >
              <option value="Timeutleie">Timeutleier</option>
              <option value="Dagsutleie">Dagsutleie</option>
              <option value="Helgeutleie">Helgeutleie</option>
            </select>
          </div>
          <div>
            <h3>Utleveringssted:</h3>
            <select
              class="form-control"
              id="utleveringsstedInput"
              onChange={e => (this.utleveringssted = event.target.value)}
              required
            >
              <option value="" selected hidden>
                Velg utleveringssted
              </option>
              {this.utleveringssteder.map(steder => (
                <option value={steder.id} key={steder.id}>
                  {steder.område}
                </option>
              ))}
            </select>
            <h3>Innleveringssted:</h3>
            <select
              class="form-control"
              id="utleveringsstedInput"
              onChange={e => (this.innleveringssted = event.target.value)}
              required
            >
              <option value="" selected hidden>
                Velg utleveringssted
              </option>
              {this.innleveringssteder.map(steder => (
                <option value={steder.id} key={steder.id}>
                  {steder.område}
                </option>
              ))}
            </select>
          </div>
          <div class="form-inline">
            <h3>Utleveringstid:</h3>
            <input
              id="utleveringsdato"
              type="date"
              class="form-control"
              min={this.dateNow}
              value={this.bestillinger.utlevering_dato}
              onChange={e => (this.bestillinger.utlevering_dato = event.target.value)}
              required
            />
            <input
              id="utleveringstid"
              type="time"
              min="08:00"
              max="19:00"
              class="form-control"
              value={this.bestillinger.utlevering_tid}
              onChange={e => (this.bestillinger.utlevering_tid = event.target.value)}
              required
            />
          </div>
          <div class="form-inline">
            <h3>Innleveringstid</h3>
            <input
              type="date"
              class="form-control"
              min={this.utlevering_dato}
              value={this.bestillinger.innlevering_dato}
              onChange={e => (this.bestillinger.innlevering_dato = event.target.value)}
              required
            />
            <input
              type="time"
              min={this.utlevering_tid}
              max="19:00"
              class="form-control"
              value={this.bestillinger.innlevering_tid}
              onChange={e => (this.bestillinger.innlevering_tid = event.target.value)}
              required
            />
          </div>
          <div>
            <h3>Epost:</h3>
            <input
              type="text"
              id="kunde_epostInput"
              value={this.bestillinger.kunde_epost}
              class="form-control"
              onChange={e => (this.bestillinger.kunde_epost = e.target.value)}
            />
          </div>
          <br />
          <button type="save" class="btn" onClick={this.save}>
            Save
          </button>
          <button type="button" class="btn" onClick={this.delete}>
            Slett
          </button>
          <hr />
        </div>
        <div id="innholdIBestilling">
          <h2>Innholdet i bestillingen:</h2>
          <div id="syklerIbestilling">
            <h4>Oversikt over sykler i bestillingen:</h4>
            <table align="center" id="customers">
              <tbody>{this.tabell1}</tbody>
            </table>
            <button onClick={this.syklerPush}>Legg til / fjern sykler fra bestillingen</button>
          </div>
          <div id="utstyrIbestilling">
            <h4>Oversikt over utstyr i bestillingen:</h4>
            <table align="center" id="customers">
              <tbody>{this.tabell2}</tbody>
            </table>
            <button onClick={this.utstyrPush}>Legg til / fjern utstyr fra bestillingen</button>
          </div>
        </div>
        <br />
      </div>
    );
  }
  mounted() {
    bestillingService.hentBestilling(this.props.match.params.id, bestillinger => {
      this.bestillinger = bestillinger;
    });

    sykkelService.hentSyklerOversikt(this.props.match.params.id, sykkelOversikt => {
      this.syklerPerBestilling = sykkelOversikt;
      this.lagSykkelOversikt();
      console.log(this.syklerPerBestilling);
    });

    sykkelService.hentUtstyrOversikt(this.props.match.params.id, utstyrOversikt => {
      this.utstyrPerBestilling = utstyrOversikt;
      this.lagUtstyrOversikt();
      console.log(this.utstyrPerBestilling);
    });

    bestillingService.hentUtleveringsted(utleveringssteder => {
      this.utleveringssteder = utleveringssteder;
    });

    bestillingService.hentInnleveringsted(innleveringssteder => {
      this.innleveringssteder = innleveringssteder;
    });

    console.log(window.location.href);

    this.dagensDato();
  }

  save() {
    bestillingService.updateBestillinger(this.bestillinger, () => {
      history.push('/bestillinger/' + this.props.match.params.id);
    });
  }
  delete() {
    bestillingService.deleteBestillinger(this.props.match.params.id, () => {
      history.push('/bestillinger');
    });
  }

  tilbake() {
    history.push('/aktiveBestillinger/');
  }

  syklerPush() {
    history.push('/endreBestillingSykler/' + this.props.match.params.id + '/endreSykler');
  }

  utstyrPush() {
    history.push('/endreBestillingUtstyr/' + this.props.match.params.id + '/endreUtstyr');
  }
  loggUtPush() {
    history.push('/');
  }

  dagensDato() {
    this.dateNow = new Date();

    var dd = this.dateNow.getDate();
    var mm = this.dateNow.getMonth() + 1;
    var yyyy = this.dateNow.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    this.dateNow = yyyy + '-' + mm + '-' + dd;

    console.log(this.dateNow);
  }

  lagSykkelOversikt() {
    this.tabell1.push(
      <tr>
        <th>SykkelID</th>
        <th>Modell</th>
        <th>Timepris</th>
      </tr>
    );

    for (let i = 0; i < this.syklerPerBestilling.length; i++) {
      this.tabell1.push(
        <tr>
          <td>{this.syklerPerBestilling[i].id}</td>
          <td>{this.syklerPerBestilling[i].modellnavn},-</td>
          <td>{this.syklerPerBestilling[i].timepris},-</td>
        </tr>
      );
    }
  }

  lagUtstyrOversikt() {
    this.tabell2.push(
      <tr>
        <th>UtstyrID</th>
        <th>Type</th>
        <th>Pris</th>
      </tr>
    );

    for (let i = 0; i < this.utstyrPerBestilling.length; i++) {
      this.tabell2.push(
        <tr>
          <td>{this.utstyrPerBestilling[i].id}</td>
          <td>{this.utstyrPerBestilling[i].type},-</td>
          <td>{this.utstyrPerBestilling[i].pris},-</td>
        </tr>
      );
    }
  }
}

export class EndreSykler extends Component {
  herre = 0;
  dame = 0;
  herreBagasje = 0;
  dameBagasje = 0;
  barn = 0;
  junior = 0;
  terreng = 0;
  elSykkel = 0;
  racer = 0;

  syklerLedig = [];
  syklerPerBestilling = [];

  antallValgteHerreArray = [];
  antallValgteHerre = [];
  antallValgteDameArray = [];
  antallValgteDame = [];
  antallValgteHerreBagasjeArray = [];
  antallValgteHerreBagasje = [];
  antallValgteDameBagasjeArray = [];
  antallValgteDameBagasje = [];
  antallValgteBarnArray = [];
  antallValgteBarn = [];
  antallValgteJuniorArray = [];
  antallValgteJunior = [];
  antallValgteTerrengArray = [];
  antallValgteTerreng = [];
  antallValgteElsykkelArray = [];
  antallValgteElsykkel = [];
  antallValgteRacerArray = [];
  antallValgteRacer = [];

  render() {
    return (
      <div id="endreSyklerBestilling">
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.loggUtPush}>
            Logg ut
          </button>
        </div>
        <button type="save" class="btn" onClick={this.tilbake}>
          Tilbake
        </button>
        <h1>Velg hvor mange sykler kunden vil ha:</h1>
        <div id="syklerDiv">
          <div id="ghostHybridHerreDiv" class="sykkelDiver">
            <h4>Ghost Hybrid Herre</h4>
            <hr />
            <img src="../bilder/sykkel-herre-uten.jpeg" />
            <input
              type="number"
              placeholder="Hvor mange vil du leie?"
              id="inputHybridHerre"
              class="form-control"
              min="0"
              onChange={e => (this.herre = e.target.value)}
            />
            <div class="antallValgteDiver">Antall valgte: {this.antallValgteHerreArray[0]}</div>
          </div>
          <div id="ghostHybridDameDiv" class="sykkelDiver">
            <h4>Ghost Hybrid Dame</h4>
            <hr />
            <img src="../bilder/sykkel-dame-uten.jpeg" />
            <input
              type="number"
              placeholder="Hvor mange vil du leie?"
              id="inputHybridDame"
              class="form-control"
              min="0"
              onChange={e => (this.dame = e.target.value)}
            />
            <div class="antallValgteDiver">Antall valgte: {this.antallValgteDameArray[0]}</div>
          </div>
          <div id="ghostHybridHerreBagasjeDiv" class="sykkelDiver">
            <h4>Ghost Hybrid Herre m/ Bagasjebrett</h4>
            <hr />
            <img src="../bilder/sykkel-herre.jpeg" />
            <input
              type="number"
              placeholder="Hvor mange vil du leie?"
              id="inputHybridHerreBagasje"
              class="form-control"
              min="0"
              onChange={e => (this.herreBagasje = e.target.value)}
            />
            <div class="antallValgteDiver">Antall valgte: {this.antallValgteHerreBagasjeArray[0]}</div>
          </div>
          <div id="ghostHybridDameBagasjeDiv" class="sykkelDiver">
            <h4>Ghost Hybrid Dame m/ Bagasjebrett</h4>
            <hr />
            <img src="../bilder/sykkel-dame.jpeg" />
            <input
              type="number"
              placeholder="Hvor mange vil du leie?"
              id="inputHybridDameBagasje"
              class="form-control"
              min="0"
              onChange={e => (this.dameBagasje = e.target.value)}
            />
            <div class="antallValgteDiver">Antall valgte: {this.antallValgteDameBagasjeArray[0]}</div>
          </div>
          <div id="barnesykkelDiv" class="sykkelDiver">
            <h4>Barnesykkel 20"</h4>
            <hr />
            <img src="../bilder/sykkel-barn.jpeg" />
            <input
              type="number"
              placeholder="Hvor mange vil du leie?"
              id="inputBarn"
              class="form-control"
              min="0"
              onChange={e => (this.barn = e.target.value)}
            />
            <div class="antallValgteDiver">Antall valgte: {this.antallValgteBarnArray[0]}</div>
          </div>
          <div id="juniorsykkelDiv" class="sykkelDiver">
            <h4>Juniorsykkel 24"</h4>
            <hr />
            <img src="../bilder/sykkel-junior.jpg" />
            <input
              type="number"
              placeholder="Hvor mange vil du leie?"
              id="inputJunior"
              class="form-control"
              min="0"
              onChange={e => (this.junior = e.target.value)}
            />
            <div class="antallValgteDiver">Antall valgte: {this.antallValgteJuniorArray[0]}</div>
          </div>
          <div id="ghostTerrengDiv" class="sykkelDiver">
            <h4>Ghost Terreng</h4>
            <hr />
            <img src="../bilder/sykkel-terreng.jpeg" />
            <input
              type="number"
              placeholder="Hvor mange vil du leie?"
              id="inputTerreng"
              class="form-control"
              min="0"
              onChange={e => (this.terreng = e.target.value)}
            />
            <div class="antallValgteDiver">Antall valgte: {this.antallValgteTerrengArray[0]}</div>
          </div>
          <div id="elSykkelDiv" class="sykkelDiver">
            <h4>El-sykkel</h4>
            <hr />
            <img src="../bilder/sykkel-el.jpeg" />
            <input
              type="number"
              placeholder="Hvor mange vil du leie?"
              id="inputElsykkel"
              class="form-control"
              min="0"
              onChange={e => (this.elSykkel = e.target.value)}
            />
            <div class="antallValgteDiver">Antall valgte: {this.antallValgteElsykkelArray[0]}</div>
          </div>
          <div id="racerSykkelDiv" class="sykkelDiver">
            <h4>Racersykkel</h4>
            <hr />
            <img src="../bilder/sykkel-racer.jpg" />
            <input
              type="number"
              placeholder="Hvor mange vil du leie?"
              id="inputRacer"
              class="form-control"
              min="0"
              onChange={e => (this.racer = e.target.value)}
            />
            <div class="antallValgteDiver">Antall valgte: {this.antallValgteRacerArray[0]}</div>
          </div>
        </div>
        <button type="button" class="btn" onClick={this.leggTilSykler}>
          Legg til sykler
        </button>
        <button type="button" class="btn" onClick={this.fjernSykler}>
          Fjern sykler fra bestilling
        </button>
      </div>
    );
  }
  mounted() {
    sykkelService.hvorMangeSyklerLedig(syklerLedig => {
      this.syklerLedig = syklerLedig;
      console.log(this.syklerLedig);
    });

    sykkelService.hentSyklerOversikt(this.props.match.params.id, sykkelOversikt => {
      this.syklerPerBestilling = sykkelOversikt;
      console.log(this.syklerPerBestilling);
    });

    this.hentAntall();

    console.log(window.location.href);
  }

  tilbake() {
    history.push('/endreBestilling/' + this.props.match.params.id);
  }

  hentAntall() {
    sykkelService.hvorMangeSyklerValgt(this.props.match.params.id, 'Ghost Hybrid Herre', herreValgt => {
      let tall = herreValgt;
      this.antallValgteHerre = tall[0].hvorMangeValgt;
      this.antallValgteHerreArray.pop();
      this.antallValgteHerreArray.push(this.antallValgteHerre);
    });

    sykkelService.hvorMangeSyklerValgt(this.props.match.params.id, 'Ghost Hybrid Dame', dameValgt => {
      let tall = dameValgt;
      this.antallValgteDame = tall[0].hvorMangeValgt;
      this.antallValgteDameArray.pop();
      this.antallValgteDameArray.push(this.antallValgteDame);
    });

    sykkelService.hvorMangeSyklerValgt(
      this.props.match.params.id,
      'Ghost Hybrid Herre m/ bagasjebrett',
      herreBagasjeValgt => {
        let tall = herreBagasjeValgt;
        this.antallValgteHerreBagasje = tall[0].hvorMangeValgt;
        this.antallValgteHerreBagasjeArray.pop();
        this.antallValgteHerreBagasjeArray.push(this.antallValgteHerreBagasje);
      }
    );

    sykkelService.hvorMangeSyklerValgt(
      this.props.match.params.id,
      'Ghost Hybrid Dame m/ bagasjebrett',
      dameBagasjeValgt => {
        let tall = dameBagasjeValgt;
        this.antallValgteDameBagasje = tall[0].hvorMangeValgt;
        this.antallValgteDameBagasjeArray.pop();
        this.antallValgteDameBagasjeArray.push(this.antallValgteDameBagasje);
      }
    );

    sykkelService.hvorMangeSyklerValgt(this.props.match.params.id, 'Barnesykkel', barnValgt => {
      let tall = barnValgt;
      this.antallValgteBarn = tall[0].hvorMangeValgt;
      this.antallValgteBarnArray.pop();
      this.antallValgteBarnArray.push(this.antallValgteBarn);
    });

    sykkelService.hvorMangeSyklerValgt(this.props.match.params.id, 'Juniorsykkel', juniorValgt => {
      let tall = juniorValgt;
      this.antallValgteJunior = tall[0].hvorMangeValgt;
      this.antallValgteJuniorArray.pop();
      this.antallValgteJuniorArray.push(this.antallValgteJunior);
    });

    sykkelService.hvorMangeSyklerValgt(this.props.match.params.id, 'Ghost Terreng', terrengValgt => {
      let tall = terrengValgt;
      this.antallValgteTerreng = tall[0].hvorMangeValgt;
      this.antallValgteTerrengArray.pop();
      this.antallValgteTerrengArray.push(this.antallValgteTerreng);
    });

    sykkelService.hvorMangeSyklerValgt(this.props.match.params.id, 'El-sykkel', elSykkelValgt => {
      let tall = elSykkelValgt;
      this.antallValgteElsykkel = tall[0].hvorMangeValgt;
      this.antallValgteElsykkelArray.pop();
      this.antallValgteElsykkelArray.push(this.antallValgteElsykkel);
    });

    sykkelService.hvorMangeSyklerValgt(this.props.match.params.id, 'Racersykkel', racerValgt => {
      let tall = racerValgt;
      this.antallValgteRacer = tall[0].hvorMangeValgt;
      this.antallValgteRacerArray.pop();
      this.antallValgteRacerArray.push(this.antallValgteRacer);
    });
  }

  leggTilSykler() {
    if (this.herre > 0) {
      if (this.syklerLedig[4].ant_ledige > this.herre) {
        sykkelService.leggInnSykler(this.props.match.params.id, 'Ghost Hybrid Herre', this.herre, herre => {
          sykkelService.hvorMangeSyklerValgt(this.props.match.params.id, 'Ghost Hybrid Herre', herreValgt => {
            let tall = herreValgt;
            this.antallValgteHerre = tall[0].hvorMangeValgt;
            this.antallValgteHerreArray.pop();
            this.antallValgteHerreArray.push(this.antallValgteHerre);
          });
        });
      } else {
        alert(
          'Vi har ikke nok Ghost Hybrid herre på lager for øyeblikket. Lagerstatus er ' +
            (Number(this.syklerLedig[4].ant_ledige) - 1)
        );
      }
    }

    if (this.dame > 0) {
      if (this.syklerLedig[2].ant_ledige > this.dame) {
        sykkelService.leggInnSykler(this.props.match.params.id, 'Ghost Hybrid Dame', this.dame, dame => {
          sykkelService.hvorMangeSyklerValgt(this.props.match.params.id, 'Ghost Hybrid Dame', dameValgt => {
            let tall = dameValgt;
            this.antallValgteDame = tall[0].hvorMangeValgt;
            this.antallValgteDameArray.pop();
            this.antallValgteDameArray.push(this.antallValgteDame);
          });
        });
      } else {
        alert(
          'Vi har ikke nok Ghost Hybrid dame på lager for øyeblikket. Lagerstatus er ' +
            (Number(this.syklerLedig[2].ant_ledige) - 1)
        );
      }
    }
    if (this.herreBagasje > 0) {
      if (this.syklerLedig[5].ant_ledige > this.herreBagasje) {
        sykkelService.leggInnSykler(
          this.props.match.params.id,
          'Ghost Hybrid Herre m/ bagasjebrett',
          this.herreBagasje,
          herreBagasje => {
            sykkelService.hvorMangeSyklerValgt(
              this.props.match.params.id,
              'Ghost Hybrid Herre m/ bagasjebrett',
              herreBagasjeValgt => {
                let tall = herreBagasjeValgt;
                this.antallValgteHerreBagasje = tall[0].hvorMangeValgt;
                this.antallValgteHerreBagasjeArray.pop();
                this.antallValgteHerreBagasjeArray.push(this.antallValgteHerreBagasje);
              }
            );
          }
        );
      } else {
        alert(
          'Vi har ikke nok Ghost Hybrid herre m/ bagasjebrett på lager for øyeblikket. Lagerstatus er ' +
            (Number(this.syklerLedig[5].ant_ledige) - 1)
        );
      }
    }

    if (this.dameBagasje > 0) {
      if (this.syklerLedig[3].ant_ledige > this.dameBagasje) {
        sykkelService.leggInnSykler(
          this.props.match.params.id,
          'Ghost Hybrid Dame m/ bagasjebrett',
          this.dameBagasje,
          dameBagasje => {
            sykkelService.hvorMangeSyklerValgt(
              this.props.match.params.id,
              'Ghost Hybrid Dame m/ bagasjebrett',
              dameBagasjeValgt => {
                let tall = dameBagasjeValgt;
                this.antallValgteDameBagasje = tall[0].hvorMangeValgt;
                this.antallValgteDameBagasjeArray.pop();
                this.antallValgteDameBagasjeArray.push(this.antallValgteDameBagasje);
              }
            );
          }
        );
      } else {
        alert(
          'Vi har ikke nok Ghost Hybrid dame m/ bagasjebrett på lager for øyeblikket. Lagerstatus er ' +
            (Number(this.syklerLedig[3].ant_ledige) - 1)
        );
      }
    }

    if (this.barn > 0) {
      if (this.syklerLedig[0].ant_ledige > this.barn) {
        sykkelService.leggInnSykler(this.props.match.params.id, 'Barnesykkel', this.barn, barn => {
          sykkelService.hvorMangeSyklerValgt(this.props.match.params.id, 'Barnesykkel', barnValgt => {
            let tall = barnValgt;
            this.antallValgteBarn = tall[0].hvorMangeValgt;
            this.antallValgteBarnArray.pop();
            this.antallValgteBarnArray.push(this.antallValgteBarn);
          });
        });
      } else {
        alert(
          'Vi har ikke nok barnesykler på lager for øyeblikket. Lagerstatus er ' +
            (Number(this.syklerLedig[0].ant_ledige) - 1)
        );
      }
    }

    if (this.junior > 0) {
      if (this.syklerLedig[7].ant_ledige > this.junior) {
        sykkelService.leggInnSykler(this.props.match.params.id, 'Juniorsykkel', this.junior, junior => {
          sykkelService.hvorMangeSyklerValgt(this.props.match.params.id, 'Juniorsykkel', juniorValgt => {
            let tall = juniorValgt;
            this.antallValgteJunior = tall[0].hvorMangeValgt;
            this.antallValgteJuniorArray.pop();
            this.antallValgteJuniorArray.push(this.antallValgteJunior);
          });
        });
      } else {
        alert(
          'Vi har ikke nok juniorsykler på lager for øyeblikket. Lagerstatus er ' +
            (Number(this.syklerLedig[7].ant_ledige) - 1)
        );
      }
    }

    if (this.terreng > 0) {
      if (this.syklerLedig[6].ant_ledige > this.terreng) {
        sykkelService.leggInnSykler(this.props.match.params.id, 'Ghost Terreng', this.terreng, terreng => {
          sykkelService.hvorMangeSyklerValgt(this.props.match.params.id, 'Ghost Terreng', terrengValgt => {
            let tall = terrengValgt;
            this.antallValgteTerreng = tall[0].hvorMangeValgt;
            this.antallValgteTerrengArray.pop();
            this.antallValgteTerrengArray.push(this.antallValgteTerreng);
          });
        });
      } else {
        alert(
          'Vi har ikke nok terrengsykler på lager for øyeblikket. Lagerstatus er ' +
            (Number(this.syklerLedig[6].ant_ledige) - 1)
        );
      }
    }

    if (this.elSykkel > 0) {
      if (this.syklerLedig[1].ant_ledige > this.elSykkel) {
        sykkelService.leggInnSykler(this.props.match.params.id, 'El-sykkel', this.elSykkel, elSykkel => {
          sykkelService.hvorMangeSyklerValgt(this.props.match.params.id, 'El-sykkel', elSykkelValgt => {
            let tall = elSykkelValgt;
            this.antallValgteElsykkel = tall[0].hvorMangeValgt;
            this.antallValgteElsykkelArray.pop();
            this.antallValgteElsykkelArray.push(this.antallValgteElsykkel);
          });
        });
      } else {
        alert(
          'Vi har ikke nok el-sykler på lager for øyeblikket. Lagerstatus er ' +
            (Number(this.syklerLedig[1].ant_ledige) - 1)
        );
      }
    }

    if (this.racer > 0) {
      if (this.syklerLedig[8].ant_ledige > this.racer) {
        sykkelService.leggInnSykler(this.props.match.params.id, 'Racersykkel', this.racer, racer => {
          sykkelService.hvorMangeSyklerValgt(this.props.match.params.id, 'Racersykkel', racerValgt => {
            let tall = racerValgt;
            this.antallValgteRacer = tall[0].hvorMangeValgt;
            this.antallValgteRacerArray.pop();
            this.antallValgteRacerArray.push(this.antallValgteRacer);
          });
        });
      } else {
        alert(
          'Vi har ikke nok racersykler på lager for øyeblikket. Lagerstatus er ' +
            (Number(this.syklerLedig[8].ant_ledige) - 1)
        );
      }
    }

    this.innlagteSykler =
      Number(this.racer) +
      Number(this.elSykkel) +
      Number(this.terreng) +
      Number(this.junior) +
      Number(this.barn) +
      Number(this.dameBagasje) +
      Number(this.dame) +
      Number(this.herreBagasje) +
      Number(this.herre);

    /* if (this.innlagteSykler == 0) {
      alert('Ingen sykler er lagt til');
    } else if (this.innlagteSykler > 0 && ){
      alert(this.innlagteSykler + ' sykler lagt til');
    } */

    sykkelService.hvorMangeSyklerLedig(syklerLedig => {
      this.syklerLedig = syklerLedig;
      console.log(this.syklerLedig);
    });

    document.getElementById('inputHybridHerre').value = '';
    document.getElementById('inputHybridDame').value = '';
    document.getElementById('inputHybridHerreBagasje').value = '';
    document.getElementById('inputHybridDameBagasje').value = '';
    document.getElementById('inputBarn').value = '';
    document.getElementById('inputJunior').value = '';
    document.getElementById('inputTerreng').value = '';
    document.getElementById('inputElsykkel').value = '';
    document.getElementById('inputRacer').value = '';

    this.herre = 0;
    this.dame = 0;
    this.herreBagasje = 0;
    this.dameBagasje = 0;
    this.barn = 0;
    this.junior = 0;
    this.terreng = 0;
    this.elSykkel = 0;
    this.racer = 0;
  }

  fjernSykler() {
    sykkelService.fjernSyklerFraBestilling(this.props.match.params.id, fjernSykler => {
      sykkelService.hvorMangeSyklerLedig(syklerLedig => {
        this.syklerLedig = syklerLedig;
        this.antallValgteHerreArray[0] = '';
        this.antallValgteDameArray[0] = '';
        this.antallValgteHerreBagasjeArray[0] = '';
        this.antallValgteDameBagasjeArray[0] = '';
        this.antallValgteBarnArray[0] = '';
        this.antallValgteJuniorArray[0] = '';
        this.antallValgteTerrengArray[0] = '';
        this.antallValgteElsykkelArray[0] = '';
        this.antallValgteRacerArray[0] = '';
        console.log(this.syklerLedig);
      });
    });
  }
}

export class EndreUtstyr extends Component {
  barnesete = 0;
  hjelmBarn = 0;
  hjelmVoksne = 0;
  sykkelkurv = 0;
  sykkellås = 0;
  sykkelstativ = 0;
  sykkelvogn = 0;

  utstyrLedig = [];

  render() {
    return (
      <div>
        <h1>Legg til eller fjern utstyr fra bestillingen</h1>
        <div>
          <h5>Barnesete</h5>
          <img src="asdas" />
          <input
            type="number"
            placeholder="Hvor mange vil du leie?"
            min="0"
            onChange={e => (this.barnesete = e.target.value)}
          />
          <h5>Hjelm for barn</h5>
          <img src="asdas" />
          <input
            type="number"
            placeholder="Hvor mange vil du leie?"
            min="0"
            onChange={e => (this.hjelmBarn = e.target.value)}
          />
          <h5>Hjelm for voksne</h5>
          <img src="asdas" />
          <input
            type="number"
            placeholder="Hvor mange vil du leie?"
            min="0"
            onChange={e => (this.hjelmVoksne = e.target.value)}
          />
          <h5>Sykkelkurv</h5>
          <img src="asdas" />
          <input
            type="number"
            placeholder="Hvor mange vil du leie?"
            min="0"
            onChange={e => (this.sykkelkurv = e.target.value)}
          />
          <h5>Sykkellås</h5>
          <img src="asdas" />
          <input
            type="number"
            placeholder="Hvor mange vil du leie?"
            min="0"
            onChange={e => (this.sykkellås = e.target.value)}
          />
          <h5>Sykkelstativ</h5>
          <img src="asdas" />
          <input
            type="number"
            placeholder="Hvor mange vil du leie?"
            min="0"
            onChange={e => (this.sykkelstativ = e.target.value)}
          />
          <h5>Sykkelvogn</h5>
          <img src="asdas" />
          <input
            type="number"
            placeholder="Hvor mange vil du leie?"
            min="0"
            onChange={e => (this.sykkelvogn = e.target.value)}
          />
          <button type="button" onClick={this.leggTilUtstyr}>
            Legg til utstyr
          </button>
          <button type="button" onClick={this.fjernUtstyr}>
            Fjern utstyr fra bestilling
          </button>
        </div>
      </div>
    );
  }
  mounted() {
    sykkelService.hvorMyeUtstyrLedig(utstyrLedig => {
      this.utstyrLedig = utstyrLedig;
      console.log(this.utstyrLedig);
    });
  }

  leggTilUtstyr() {
    if (this.barnesete > 0) {
      if (this.utstyrLedig[0].ant_ledige > this.barnesete) {
        sykkelService.updateBarnesete(this.props.match.params.id, this.barnesete, barnesete => {});
      } else {
        alert(
          'Vi har ikke nok barneseter på lager for øyeblikket. Lagerstatus er ' +
            (Number(this.utstyrLedig[0].ant_ledige) - 1)
        );
      }
    }

    if (this.hjelmBarn > 0) {
      if (this.utstyrLedig[1].ant_ledige > this.hjelmBarn) {
        sykkelService.updateHjelmBarn(this.props.match.params.id, this.hjelmBarn, hjelmBarn => {});
      } else {
        alert(
          'Vi har ikke nok hjelmer for barn på lager for øyeblikket. Lagerstatus er ' +
            (Number(this.utstyrLedig[1].ant_ledige) - 1)
        );
      }
    }

    if (this.hjelmVoksne > 0) {
      if (this.utstyrLedig[2].ant_ledige > this.hjelmVoksne) {
        sykkelService.updateHjelmVoksne(this.props.match.params.id, this.hjelmVoksne, hjelmVoksne => {});
      } else {
        alert(
          'Vi har ikke nok hjelmer for voksne på lager for øyeblikket. Lagerstatus er ' +
            (Number(this.utstyrLedig[2].ant_ledige) - 1)
        );
      }
    }

    if (this.sykkelkurv > 0) {
      if (this.utstyrLedig[3].ant_ledige > this.sykkelkurv) {
        sykkelService.updateSykkelkurv(this.props.match.params.id, this.sykkelkurv, sykkelkurv => {});
      } else {
        alert(
          'Vi har ikke nok sykkelkurver på lager for øyeblikket. Lagerstatus er ' +
            (Number(this.utstyrLedig[3].ant_ledige) - 1)
        );
      }
    }

    if (this.sykkellås > 0) {
      if (this.utstyrLedig[4].ant_ledige > this.sykkellås) {
        sykkelService.updateSykkellås(this.props.match.params.id, this.sykkellås, sykkellås => {});
      } else {
        alert(
          'Vi har ikke nok sykkellåser på lager for øyeblikket. Lagerstatus er ' +
            (Number(this.utstyrLedig[4].ant_ledige) - 1)
        );
      }
    }

    if (this.sykkelstativ > 0) {
      if (this.utstyrLedig[5].ant_ledige > this.sykkelstativ) {
        sykkelService.updateSykkelstativ(this.props.match.params.id, this.sykkelstativ, sykkelstativ => {});
      } else {
        alert(
          'Vi har ikke nok sykkelstativ på lager for øyeblikket. Lagerstatus er ' +
            (Number(this.utstyrLedig[5].ant_ledige) - 1)
        );
      }
    }

    if (this.sykkelvogn > 0) {
      if (this.utstyrLedig[6].ant_ledige > this.sykkelvogn) {
        sykkelService.updateSykkelvogn(this.props.match.params.id, this.sykkelvogn, sykkelvogn => {});
      } else {
        alert(
          'Vi har ikke nok sykkelvogner på lager for øyeblikket. Lagerstatus er ' +
            (Number(this.utstyrLedig[6].ant_ledige) - 1)
        );
      }
    }
    history.push('/endreBestilling/' + this.props.match.params.id);
  }
  fjernUtstyr() {
    sykkelService.fjernUtstyrFraBestilling(this.props.match.params.id, fjernSykler => {
      history.push('/endreBestilling/' + this.props.match.params.id);
      console.log(this.sykkelOversikt);
    });
  }
}

export class NyKunde extends Component {
  fornavn = '';
  etternavn = '';
  epost = '';
  telefon = '';

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.loggUtPush}>
            Logg ut
          </button>
        </div>
        <button onClick={this.tilbake} class="btn">
          Tilbake
        </button>
        <div id="nyKundeDiv">
          <h1>Legg til ny kunde</h1>
          <hr />
          <form onSubmit={this.leggTilKunde}>
            <h4>Fornavn:</h4>
            <input
              type="text"
              id="kundeFornavnInput"
              class="form-control"
              onChange={e => (this.fornavn = e.target.value)}
              required
            />
            <h4>Etternavn:</h4>
            <input
              type="text"
              id="kundeEtternavnInput"
              class="form-control"
              onChange={e => (this.etternavn = e.target.value)}
              required
            />
            <h4>Kundens epost:</h4>
            <input
              type="text"
              id="kundeEpostInput"
              class="form-control"
              onChange={e => (this.epost = e.target.value)}
              required
            />
            <h4>Telefonnummer:</h4>
            <input
              type="number"
              id="kundeTlfInput"
              class="form-control"
              onChange={e => (this.telefon = e.target.value)}
              required
            />
            <br />
            <button type="submit" class="btn">
              Legg til kunde
            </button>
          </form>
        </div>
      </div>
    );
  }

  tilbake() {
    history.push('/bestilling/');
  }

  leggTilKunde() {
    kundeService.leggTilKunde(this.epost, this.fornavn, this.etternavn, this.telefon, id => {
      history.push('/bestilling/');
    });
  }
  loggUtPush() {
    history.push('/');
  }
}
