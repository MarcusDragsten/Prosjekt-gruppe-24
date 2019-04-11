import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { bestillingService } from '../services/bestillingService.js';
import { sykkelService } from '../services/sykkelService.js';
import { ansatteService } from '../services/adminService.js';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

export class SalgStartside extends Component {
  ansatt = [];

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Salgstartsiden</h1>
          <button type="button" class="btn" id="loggUtKnapp" onClick={this.loggUtPush}>
            Logg ut
          </button>
        </div>
        <div id="salgStartsideKnapperDiv">
          <h2>
            Velkommen {this.ansatt.fornavn} {this.ansatt.etternavn}
          </h2>
          <button
            type="button"
            id="knapperStartside"
            class="btn btn-sucess btn-lg btn-block"
            onClick={this.nyBestillingPush}
          >
            Ny Bestilling
          </button>
          <button
            type="button"
            id="knapperStartside"
            class="btn btn-sucess btn-lg btn-block"
            onClick={this.aktiveBestillingerPush}
          >
            Se aktive bestillinger
          </button>
          <button
            type="button"
            id="knapperStartside"
            class="btn btn-sucess btn-lg btn-block"
            onClick={this.bestillingHistorikkPush}
          >
            Se bestillingshistorikk
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
  nyBestillingPush() {
    history.push('/bestilling/' + this.props.match.params.ansattId);
  }
  aktiveBestillingerPush() {
    history.push('/aktiveBestillinger/' + this.props.match.params.ansattId);
  }
  bestillingHistorikkPush() {
    history.push('/bestillingHistorikk/' + this.props.match.params.ansattId);
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

  innleveringssteder = [];
  utleveringssteder = [];

  bestilling_type = '';
  kunde_epost = '';
  utleveringssted = '';
  innleveringssted = '';
  utlevering_dato = '';
  innlevering_dato = '';

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Aktive bestillinger</h1>
          <button type="button" id="loggUtKnapp" class="btn" onClick={this.return}>
            Tilbake til startsiden
          </button>
        </div>
        <h2>Tabell over alle aktive bestillinger</h2>
        <button type="button" id="toggleFiltrerKnapp" class="btn" onClick={this.toggleFiltrer}>
          Filtrer tabellen?
        </button>
        <br />
        <div id="filtrerAktiveBestillingerDiv">
          <form onSubmit={this.sok}>
            <div class="form-inline">
              <h4>Velg start- og sluttdato</h4>
              <input
                id="utlevering_dato"
                type="date"
                class="genereltInputer form-control form-control-lg"
                onChange={e => (this.utlevering_dato = event.target.value)}
                required
              />
              <input
                id="innlevering_dato"
                type="date"
                class="genereltInputer form-control form-control-lg"
                min={this.utlevering_dato}
                onChange={e => (this.innlevering_dato = event.target.value)}
                required
              />
            </div>

            <div class="form-inline">
              <h4>Filtrer med andre filtre:</h4>
              <select
                id="bestilling_type"
                class="genereltInputer form-control form-control-lg"
                onChange={e => (this.bestilling_type = event.target.value)}
              >
                <option value="" defaultValue>
                  Søk etter bestillingstype:
                </option>
                <option value="Timeutleie">Timeutleie</option>
                <option value="Dagsutleie">Dagsutleie</option>
                <option value="Helgeutleie">Helgeutleie</option>
              </select>

              <input
                type="text"
                id="kunde_epost"
                class="genereltInputer form-control form-control-lg"
                placeholder="Søk etter kundens epost:"
                onChange={e => (this.kunde_epost = event.target.value)}
              />
              <br />
              <select
                id="utleveringssted"
                class="genereltInputer form-control form-control-lg"
                onChange={e => (this.utleveringssted = event.target.value)}
              >
                <option value="" defaultValue>
                  Søk etter utleveringssted
                </option>
                {this.utleveringssteder.map(steder => (
                  <option key={steder.id}>{steder.område}</option>
                ))}
              </select>

              <select
                id="innleveringssted"
                class="genereltInputer form-control form-control-lg"
                onChange={e => (this.innleveringssted = event.target.value)}
              >
                <option value="" defaultValue>
                  Søk etter utleveringssted
                </option>
                {this.innleveringssteder.map(steder => (
                  <option key={steder.id}>{steder.område}</option>
                ))}
              </select>
            </div>
            <button type="submit" class="btn">
              Filter
            </button>
            <button type="button" class="btn" onClick={this.nullstill}>
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

    bestillingService.hentUtleveringsted(utleveringssteder => {
      this.utleveringssteder = utleveringssteder;
    });

    bestillingService.hentInnleveringsted(innleveringssteder => {
      this.innleveringssteder = innleveringssteder;
    });
  }

  return() {
    history.push('/salgStartside/' + this.props.match.params.ansattId);
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
    if (this.bestillinger == 0) {
      alert('Ingen rader matchet søket ditt');
    } else {
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
              <NavLink to={'/endreBestilling/' + this.props.match.params.ansattId + '/' + this.bestillinger[i].id}>
                {' '}
                Vis / Endre{' '}
              </NavLink>
            </td>
            <td>
              <NavLink to={'/innlevering/' + this.props.match.params.ansattId + '/' + this.bestillinger[i].id}>
                {' '}
                Lever inn{' '}
              </NavLink>
            </td>
          </tr>
        );
      }
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

  innleveringssteder = [];
  utleveringssteder = [];

  bestilling_type = '';
  kunde_epost = '';
  utleveringssted = '';
  innleveringssted = '';
  utlevering_dato = '';
  innlevering_dato = '';

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Bestillinghistorikk</h1>
          <button type="button" class="btn" id="loggUtKnapp" onClick={this.tilbake}>
            Tilbake til startsiden
          </button>
        </div>
        <h2>Tabell over alle innleverte bestillinger</h2>
        <button type="button" id="toggleFiltrerKnapp" class="btn" onClick={this.toggleFiltrer}>
          Filtrer tabellen?
        </button>
        <br />
        <div id="filtrerAktiveBestillingerDiv">
          <form onSubmit={this.sok}>
            <div class="form-inline">
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
            <div class="form-inline">
              <h4>Filtrer med andre filtre:</h4>
              <select
                id="bestilling_type"
                class="form-control form-control-lg"
                onChange={e => (this.bestilling_type = event.target.value)}
              >
                <option value="" defaultValue>
                  Søk etter bestillingstype:
                </option>
                <option value="Timeutleie">Timeutleie</option>
                <option value="Dagsutleie">Dagsutleie</option>
                <option value="Helgeutleie">Helgeutleie</option>
              </select>

              <input
                type="text"
                id="kunde_epost"
                class="form-control form-control-lg"
                placeholder="Søk etter kundens epost:"
                onChange={e => (this.kunde_epost = event.target.value)}
              />
              <br />
              <select
                id="utleveringssted"
                class="form-control form-control-lg"
                onChange={e => (this.utleveringssted = event.target.value)}
              >
                <option value="" defaultValue>
                  Velg utleveringssted
                </option>
                {this.utleveringssteder.map(steder => (
                  <option key={steder.id}>{steder.område}</option>
                ))}
              </select>

              <select
                id="innleveringssted"
                class="form-control form-control-lg"
                onChange={e => (this.innleveringssted = event.target.value)}
              >
                <option value="" defaultValue>
                  Velg utleveringssted
                </option>
                {this.innleveringssteder.map(steder => (
                  <option key={steder.id}>{steder.område}</option>
                ))}
              </select>
            </div>
            <br />
            <button type="submit" class="btn">
              Filtrer
            </button>
            <button type="button" class="btn" onClick={this.nullstill}>
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
    bestillingService.hentBestillingHistorikk(bestillinger => {
      this.bestillinger = bestillinger;
      this.createTable();
    });

    bestillingService.hentUtleveringsted(utleveringssteder => {
      this.utleveringssteder = utleveringssteder;
    });

    bestillingService.hentInnleveringsted(innleveringssteder => {
      this.innleveringssteder = innleveringssteder;
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

  tilbake() {
    history.push('/salgStartside/' + this.props.match.params.ansattId);
  }

  loggUtPush() {
    history.push('/');
  }

  createTable() {
    if (this.bestillinger == 0) {
      alert('Ingen rader matchet søket ditt');
    } else {
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
  syklerIbestilling = [];
  utstyrIbestilling = [];

  tabell1 = [];
  tabell2 = [];

  bestilling = [];

  render() {
    return (
      <div>
        <div class="header w3-container" id="header">
          <h1>Innlevering av bestilling</h1>
          <button type="button" class="btn" id="loggUtKnapp" onClick={this.return}>
            Tilbake
          </button>
        </div>
        <u>
          <h1>Innlevering for bestilling {this.bestilling.id}</h1>
        </u>
        <hr />
        <form id="leverInnForm" onSubmit={this.gåVidere}>
          <div id="innholdIBestilling">
            <h2>Innholdet i bestillingen:</h2>
            <p>
              <i>
                Gå over alt av innleverte sykler og utstyr, deretter velg om sykkelen er i god nok stand til å leveres
                inn. Om ikke, velg om sykkelen trenger reparasjon eller er forsvunnet.
              </i>
            </p>
            <div id="syklerIbestilling">
              <h3>Sykler i bestillingen:</h3>
              <table align="center" id="customers">
                <tbody>{this.tabell1}</tbody>
              </table>
            </div>
            <div id="utstyrIbestilling">
              <h4>Utstyr i bestillingen:</h4>
              <table align="center" id="customers">
                <tbody>{this.tabell2}</tbody>
              </table>
            </div>
          </div>
          <hr />
          <button type="submit" class="btn">
            Lever inn
          </button>
        </form>
      </div>
    );
  }

  mounted() {
    bestillingService.hentBestilling(this.props.match.params.bestillingId, bestilling => {
      this.bestilling = bestilling;
    });

    sykkelService.hentSyklerOversikt(this.props.match.params.bestillingId, sykkelOversikt => {
      this.syklerPerBestilling = sykkelOversikt;
      this.lagSykkelOversikt();
    });

    sykkelService.hentUtstyrOversikt(this.props.match.params.bestillingId, utstyrOversikt => {
      this.utstyrPerBestilling = utstyrOversikt;
      this.lagUtstyrOversikt();
    });
  }

  return() {
    history.push('/aktiveBestillinger/' + this.props.match.params.ansattId);
  }

  lagSykkelOversikt() {
    this.tabell1.push(
      <tr>
        <th>SykkelID</th>
        <th>Modell</th>
        <th>Velg status på syklene</th>
      </tr>
    );

    for (let i = 0; i < this.syklerPerBestilling.length; i++) {
      this.tabell1.push(
        <tr>
          <td>{this.syklerPerBestilling[i].id}</td>
          <td>{this.syklerPerBestilling[i].modellnavn},-</td>
          <td>
            <select
              class="form-control"
              id="selectInnlevering"
              onChange={e => this.endreStatusSykkel(this.syklerPerBestilling[i].id, event.target.value)}
              required
            >
              <option value="" defaultValue hidden>
                Velg status
              </option>
              <option value="Ledig">Godkjent</option>
              <option value="Reparasjon">Må til reparasjon</option>
              <option value="Utilgjengelig">Utilgjengelig</option>
            </select>
          </td>
        </tr>
      );
    }
  }

  lagUtstyrOversikt() {
    this.tabell2.push(
      <tr>
        <th>UtstyrID</th>
        <th>Type</th>
        <th>Velg status på utstyret</th>
      </tr>
    );

    for (let i = 0; i < this.utstyrPerBestilling.length; i++) {
      this.tabell2.push(
        <tr>
          <td>{this.utstyrPerBestilling[i].id}</td>
          <td>{this.utstyrPerBestilling[i].type},-</td>
          <td>
            <select
              class="form-control"
              id="selectInnlevering"
              onChange={e => this.endreStatusUtstyr(this.utstyrPerBestilling[i].id, event.target.value)}
              required
            >
              <option value="" defaultValue hidden>
                Velg status
              </option>
              <option value="Ledig">Godkjent</option>
              <option value="Reparasjon">Må til reparasjon</option>
              <option value="Utilgjengelig">Utilgjengelig</option>
            </select>
          </td>
        </tr>
      );
    }
  }

  endreStatusSykkel(id, status) {
    if (status == 'Utilgjengelig') {
      bestillingService.endreStatusSykkelInnleveringUtilgjengelig(status, id, endreStatus => {});
    } else {
      bestillingService.endreStatusSykkelInnlevering(status, id, endreStatus => {});
    }
  }

  endreStatusUtstyr(id, status) {
    if (status == 'Utilgjengelig') {
      bestillingService.endreStatusUtstyrInnleveringUtilgjengelig(status, id, endreStatus => {});
    } else {
      bestillingService.endreStatusUtstyrInnlevering(status, id, endreStatus => {});
    }
  }

  gåVidere(e) {
    e.preventDefault();
    bestillingService.leverInn(this.props.match.params.bestillingId, leverInn => {
      history.push('/aktiveBestillinger/' + this.props.match.params.ansattId);
    });
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

  ansatt = [];

  render() {
    if (!this.bestillinger) return null;

    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Redigering av bestilling</h1>
          <button type="button" class="btn" id="loggUtKnapp" onClick={this.return}>
            Tilbake
          </button>
        </div>
        <div id="endreInfoBestilling">
          <h2>Endring av bestillingen {this.bestillinger.id}</h2>
          <hr />
          <div>
            <h3>Bestillingstype:</h3>
            <select
              type="text"
              class="genereltInputer form-control form-control-lg"
              value={this.bestillinger.bestilling_type}
              onChange={e => (this.bestillinger.bestilling_type = event.target.value)}
              required
            >
              <option value="Timeutleie">Timeutleie</option>
              <option value="Dagsutleie">Dagsutleie</option>
              <option value="Helgeutleie">Helgeutleie</option>
            </select>
          </div>
          <div>
            <h3>Utleveringssted:</h3>
            <select
              class="genereltInputer form-control form-control-lg"
              onChange={e => (this.utleveringssted = event.target.value)}
              required
            >
              <option value={this.bestillinger.utleveringssted} defaultValue hidden>
                {this.bestillinger.utleveringssted}
              </option>
              {this.utleveringssteder.map(steder => (
                <option value={steder.id} key={steder.id}>
                  {steder.område}
                </option>
              ))}
            </select>
            <h3>Innleveringssted:</h3>
            <select
              class="genereltInputer form-control form-control-lg"
              onChange={e => (this.innleveringssted = event.target.value)}
              required
            >
              <option value={this.bestillinger.innleveringssted} defaultValue hidden>
                {this.bestillinger.innleveringssted}
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
              type="date"
              class="genereltInputer form-control form-control-lg"
              min={this.dateNow}
              value={this.bestillinger.utlevering_dato}
              onChange={e => (this.bestillinger.utlevering_dato = event.target.value)}
              required
            />
            <input
              type="time"
              min="08:00"
              max="19:00"
              class="genereltInputer form-control form-control-lg"
              value={this.bestillinger.utlevering_tid}
              onChange={e => (this.bestillinger.utlevering_tid = event.target.value)}
              required
            />
          </div>
          <div class="form-inline">
            <h3>Innleveringstid</h3>
            <input
              type="date"
              class="genereltInputer form-control form-control-lg"
              min={this.utlevering_dato}
              value={this.bestillinger.innlevering_dato}
              onChange={e => (this.bestillinger.innlevering_dato = event.target.value)}
              required
            />
            <input
              type="time"
              min={this.utlevering_tid}
              max="19:00"
              class="genereltInputer form-control form-control-lg"
              value={this.bestillinger.innlevering_tid}
              onChange={e => (this.bestillinger.innlevering_tid = event.target.value)}
              required
            />
          </div>
          <div>
            <h3>Epost:</h3>
            <input
              type="text"
              value={this.bestillinger.kunde_epost}
              class="genereltInputer form-control form-control-lg"
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
            <button class="btn" onClick={this.syklerPush}>
              Legg til / fjern sykler fra bestillingen
            </button>
          </div>
          <div id="utstyrIbestilling">
            <h4>Oversikt over utstyr i bestillingen:</h4>
            <table align="center" id="customers">
              <tbody>{this.tabell2}</tbody>
            </table>
            <button class="btn" onClick={this.utstyrPush}>
              Legg til / fjern utstyr fra bestillingen
            </button>
          </div>
        </div>
        <br />
      </div>
    );
  }
  mounted() {
    bestillingService.hentBestilling(this.props.match.params.bestillingId, bestillinger => {
      this.bestillinger = bestillinger;
    });

    sykkelService.hentSyklerOversikt(this.props.match.params.bestillingId, sykkelOversikt => {
      this.syklerPerBestilling = sykkelOversikt;
      this.lagSykkelOversikt();
    });

    sykkelService.hentUtstyrOversikt(this.props.match.params.bestillingId, utstyrOversikt => {
      this.utstyrPerBestilling = utstyrOversikt;
      this.lagUtstyrOversikt();
    });

    bestillingService.hentUtleveringsted(utleveringssteder => {
      this.utleveringssteder = utleveringssteder;
    });

    bestillingService.hentInnleveringsted(innleveringssteder => {
      this.innleveringssteder = innleveringssteder;
    });

    this.dagensDato();
  }

  save() {
    bestillingService.updateBestillinger(this.bestillinger, () => {
      history.push('/aktiveBestillinger/' + this.props.match.params.ansattId);
    });
  }
  delete() {
    var x = confirm('Er du sikker på at du vil slette denne bestillingen og sette alt innholdet til tilgjengelig?');

    if (x == true) {
      bestillingService.avbrytBestillingUtstyr(this.props.match.params.bestillingId, id => {
        bestillingService.avbrytBestillingSykkel(this.props.match.params.bestillingId, id => {
          bestillingService.avbrytBestilling(this.props.match.params.bestillingId, id => {
            history.push('/aktiveBestillinger/' + this.props.match.params.ansattId);
          });
        });
      });
    }
  }

  return() {
    history.push('/aktiveBestillinger/' + this.props.match.params.ansattId);
  }

  syklerPush() {
    history.push(
      '/endreBestillingSykler/' + this.props.match.params.ansattId + '/' + this.props.match.params.bestillingId
    );
  }

  utstyrPush() {
    history.push(
      '/endreBestillingUtstyr/' + this.props.match.params.ansattId + '/' + this.props.match.params.bestillingId
    );
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

  syklerValgt = [];

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
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Endring av innhold i bestilling</h1>
          <button type="button" class="btn" id="loggUtKnapp" onClick={this.return}>
            Tilbake
          </button>
        </div>
        <div id="syklerDiv">
          <h1>Velg hvor mange sykler kunden vil ha:</h1>
          <div id="ghostHybridHerreDiv" class="sykkelDiver">
            <h4>Hybridsykkel Herre</h4>
            <hr />
            <img src="../bilder/sykkel-herre-uten.jpeg" alt="Hybridsykkel Herre" />
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
            <h4>Hybridsykkel Dame</h4>
            <hr />
            <img src="../bilder/sykkel-dame-uten.jpeg" alt="Hybridsykkel Dame" />
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
            <h4>Hybridsykkel Herre m/ Bagasjebrett</h4>
            <hr />
            <img src="../bilder/sykkel-herre.jpeg" alt="Hybridsykkel Herre m/ Bagasjebrett" />
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
            <h4>Hybridsykkel Dame m/ Bagasjebrett</h4>
            <hr />
            <img src="../bilder/sykkel-dame.jpeg" alt="Hybridsykkel Dame m/ Bagasjebrett" />
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
            <h4>Barnesykkel</h4>
            <hr />
            <img src="../bilder/sykkel-barn.jpeg" alt="Barnesykkel" />
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
            <h4>Juniorsykkel</h4>
            <hr />
            <img src="../bilder/sykkel-junior.jpg" alt="Juniorsykkel" />
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
            <h4>Terrengsykkel</h4>
            <hr />
            <img src="../bilder/sykkel-terreng.jpeg" alt="Terrengsykkel" />
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
            <img src="../bilder/sykkel-el.jpeg" alt="El-sykkel" />
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
            <h4>Landeveissykkel</h4>
            <hr />
            <img src="../bilder/sykkel-racer.jpg" alt="Landeveissykkel" />
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
          <div>
            <button type="button" class="btn" onClick={this.leggTilSykler}>
              Legg til sykler
            </button>
            <button type="button" class="btn" onClick={this.fjernSykler}>
              Fjern sykler fra bestilling
            </button>
          </div>
        </div>
      </div>
    );
  }
  mounted() {
    sykkelService.hvorMangeSyklerLedig(syklerLedig => {
      this.syklerLedig = syklerLedig;
    });

    sykkelService.hentSyklerOversikt(this.props.match.params.bestillingId, sykkelOversikt => {
      this.syklerPerBestilling = sykkelOversikt;
    });

    this.hentAntall();
  }

  return() {
    history.push('/endreBestilling/' + this.props.match.params.ansattId + '/' + +this.props.match.params.bestillingId);
  }

  hentAntall() {
    sykkelService.hvorMangeSyklerValgt(this.props.match.params.bestillingId, 'Hybrid Herre', herreValgt => {
      let tall = herreValgt;
      this.antallValgteHerre = tall[0].hvorMangeValgt;
      this.antallValgteHerreArray.pop();
      this.antallValgteHerreArray.push(this.antallValgteHerre);
    });

    sykkelService.hvorMangeSyklerValgt(this.props.match.params.bestillingId, 'Hybrid Dame', dameValgt => {
      let tall = dameValgt;
      this.antallValgteDame = tall[0].hvorMangeValgt;
      this.antallValgteDameArray.pop();
      this.antallValgteDameArray.push(this.antallValgteDame);
    });

    sykkelService.hvorMangeSyklerValgt(
      this.props.match.params.bestillingId,
      'Hybrid Herre m/ bagasjebrett',
      herreBagasjeValgt => {
        let tall = herreBagasjeValgt;
        this.antallValgteHerreBagasje = tall[0].hvorMangeValgt;
        this.antallValgteHerreBagasjeArray.pop();
        this.antallValgteHerreBagasjeArray.push(this.antallValgteHerreBagasje);
      }
    );

    sykkelService.hvorMangeSyklerValgt(
      this.props.match.params.bestillingId,
      'Hybrid Dame m/ bagasjebrett',
      dameBagasjeValgt => {
        let tall = dameBagasjeValgt;
        this.antallValgteDameBagasje = tall[0].hvorMangeValgt;
        this.antallValgteDameBagasjeArray.pop();
        this.antallValgteDameBagasjeArray.push(this.antallValgteDameBagasje);
      }
    );

    sykkelService.hvorMangeSyklerValgt(this.props.match.params.bestillingId, 'Barnesykkel', barnValgt => {
      let tall = barnValgt;
      this.antallValgteBarn = tall[0].hvorMangeValgt;
      this.antallValgteBarnArray.pop();
      this.antallValgteBarnArray.push(this.antallValgteBarn);
    });

    sykkelService.hvorMangeSyklerValgt(this.props.match.params.bestillingId, 'Juniorsykkel', juniorValgt => {
      let tall = juniorValgt;
      this.antallValgteJunior = tall[0].hvorMangeValgt;
      this.antallValgteJuniorArray.pop();
      this.antallValgteJuniorArray.push(this.antallValgteJunior);
    });

    sykkelService.hvorMangeSyklerValgt(this.props.match.params.bestillingId, 'Terrengsykkel', terrengValgt => {
      let tall = terrengValgt;
      this.antallValgteTerreng = tall[0].hvorMangeValgt;
      this.antallValgteTerrengArray.pop();
      this.antallValgteTerrengArray.push(this.antallValgteTerreng);
    });

    sykkelService.hvorMangeSyklerValgt(this.props.match.params.bestillingId, 'El-sykkel', elSykkelValgt => {
      let tall = elSykkelValgt;
      this.antallValgteElsykkel = tall[0].hvorMangeValgt;
      this.antallValgteElsykkelArray.pop();
      this.antallValgteElsykkelArray.push(this.antallValgteElsykkel);
    });

    sykkelService.hvorMangeSyklerValgt(this.props.match.params.bestillingId, 'Landeveissykkel', racerValgt => {
      let tall = racerValgt;
      this.antallValgteRacer = tall[0].hvorMangeValgt;
      this.antallValgteRacerArray.pop();
      this.antallValgteRacerArray.push(this.antallValgteRacer);
    });
  }

  leggTilSykler() {
    if (this.herre > 0) {
      if (this.syklerLedig[4].ant_ledige > this.herre) {
        sykkelService.leggInnSykler(this.props.match.params.bestillingId, 'Hybrid Herre', this.herre, herre => {
          sykkelService.hvorMangeSyklerValgt(this.props.match.params.bestillingId, 'Hybrid Herre', herreValgt => {
            let tall = herreValgt;
            this.antallValgteHerre = tall[0].hvorMangeValgt;
            this.antallValgteHerreArray.pop();
            this.antallValgteHerreArray.push(this.antallValgteHerre);
          });
        });
      } else {
        alert(
          'Vi har ikke nok hybridsykler for herre på lager for øyeblikket. Lagerstatus er ' +
            (Number(this.syklerLedig[4].ant_ledige) - 1)
        );
      }
    }

    if (this.dame > 0) {
      if (this.syklerLedig[2].ant_ledige > this.dame) {
        sykkelService.leggInnSykler(this.props.match.params.bestillingId, 'Hybrid Dame', this.dame, dame => {
          sykkelService.hvorMangeSyklerValgt(this.props.match.params.bestillingId, 'Hybrid Dame', dameValgt => {
            let tall = dameValgt;
            this.antallValgteDame = tall[0].hvorMangeValgt;
            this.antallValgteDameArray.pop();
            this.antallValgteDameArray.push(this.antallValgteDame);
          });
        });
      } else {
        alert(
          'Vi har ikke nok hybridsykler for dame på lager for øyeblikket. Lagerstatus er ' +
            (Number(this.syklerLedig[2].ant_ledige) - 1)
        );
      }
    }
    if (this.herreBagasje > 0) {
      if (this.syklerLedig[5].ant_ledige > this.herreBagasje) {
        sykkelService.leggInnSykler(
          this.props.match.params.bestillingId,
          'Hybrid Herre m/bagasjebrett',
          this.herreBagasje,
          herreBagasje => {
            sykkelService.hvorMangeSyklerValgt(
              this.props.match.params.bestillingId,
              'Hybrid Herre m/bagasjebrett',
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
          'Vi har ikke nok hybridsykler for herre m/ bagasjebrett på lager for øyeblikket. Lagerstatus er ' +
            (Number(this.syklerLedig[5].ant_ledige) - 1)
        );
      }
    }

    if (this.dameBagasje > 0) {
      if (this.syklerLedig[3].ant_ledige > this.dameBagasje) {
        sykkelService.leggInnSykler(
          this.props.match.params.bestillingId,
          'Hybrid Dame m/bagasjebrett',
          this.dameBagasje,
          dameBagasje => {
            sykkelService.hvorMangeSyklerValgt(
              this.props.match.params.bestillingId,
              'Hybrid Dame m/bagasjebrett',
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
          'Vi har ikke nok hybridsykler for dame m/ bagasjebrett på lager for øyeblikket. Lagerstatus er ' +
            (Number(this.syklerLedig[3].ant_ledige) - 1)
        );
      }
    }

    if (this.barn > 0) {
      if (this.syklerLedig[0].ant_ledige > this.barn) {
        sykkelService.leggInnSykler(this.props.match.params.bestillingId, 'Barnesykkel', this.barn, barn => {
          sykkelService.hvorMangeSyklerValgt(this.props.match.params.bestillingId, 'Barnesykkel', barnValgt => {
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
        sykkelService.leggInnSykler(this.props.match.params.bestillingId, 'Juniorsykkel', this.junior, junior => {
          sykkelService.hvorMangeSyklerValgt(this.props.match.params.bestillingId, 'Juniorsykkel', juniorValgt => {
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
        sykkelService.leggInnSykler(this.props.match.params.bestillingId, 'Terrengsykkel', this.terreng, terreng => {
          sykkelService.hvorMangeSyklerValgt(this.props.match.params.bestillingId, 'Terrengsykkel', terrengValgt => {
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
        sykkelService.leggInnSykler(this.props.match.params.bestillingId, 'El-sykkel', this.elSykkel, elSykkel => {
          sykkelService.hvorMangeSyklerValgt(this.props.match.params.bestillingId, 'El-sykkel', elSykkelValgt => {
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
        sykkelService.leggInnSykler(this.props.match.params.bestillingId, 'Landeveissykkel', this.racer, racer => {
          sykkelService.hvorMangeSyklerValgt(this.props.match.params.bestillingId, 'Landeveissykkel', racerValgt => {
            let tall = racerValgt;
            this.antallValgteRacer = tall[0].hvorMangeValgt;
            this.antallValgteRacerArray.pop();
            this.antallValgteRacerArray.push(this.antallValgteRacer);
          });
        });
      } else {
        alert(
          'Vi har ikke nok landeveissykler på lager for øyeblikket. Lagerstatus er ' +
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

    sykkelService.hvorMangeSyklerLedig(syklerLedig => {
      this.syklerLedig = syklerLedig;
    });

    sykkelService.hvorMangeSykleriBestilling(this.props.match.params.bestillingId, syklerValgt => {
      this.syklerValgt = syklerValgt;
      let hvorMange = this.syklerValgt[0].hvorMangeValgt;
      alert('Det ligger nå ' + hvorMange + ' sykler i bestillingen!');
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
    sykkelService.fjernSyklerFraBestilling(this.props.match.params.bestillingId, fjernSykler => {
      alert('Sykler fjernet!');
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

  antallValgteBarneseteArray = [];
  antallValgteBarnesete = [];
  antallValgteHjelmBarnArray = [];
  antallValgteHjelmBarn = [];
  antallValgteHjelmVoksneArray = [];
  antallValgteHjelmVoksne = [];
  antallValgteSykkelkurvArray = [];
  antallValgteSykkelkurv = [];
  antallValgteSykkellåsArray = [];
  antallValgteSykkellås = [];
  antallValgteSykkelstativArray = [];
  antallValgteSykkelstativ = [];
  antallValgteSykkelvognArray = [];
  antallValgteSykkelvogn = [];

  utstyrValgt = [];

  utstyrLedig = [];

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Endring av innhold i bestilling</h1>
          <button type="button" class="btn" id="loggUtKnapp" onClick={this.return}>
            Tilbake
          </button>
        </div>
        <div id="utstyrDiv">
          <h1>Velg Utstyr</h1>
          <div id="barneseteDiv" class="utstyrDiver">
            <h4>Barnesete</h4>
            <img src="../bilder/barnesete.jpeg" alt="Barnesete" />
            <input
              type="number"
              placeholder="Hvor mange vil du leie?"
              id="inputBarnesete"
              min="0"
              onChange={e => (this.barnesete = e.target.value)}
            />
            <div class="antallValgteDiver">Antall valgte: {this.antallValgteBarneseteArray[0]}</div>
          </div>
          <div id="hjelmBarnDiv" class="utstyrDiver">
            <h4>Hjelm for barn</h4>
            <img src="../bilder/hjelm-barn.jpeg" alt="Hjelm Barn" />
            <input
              type="number"
              placeholder="Hvor mange vil du leie?"
              id="inputHjelmBarn"
              min="0"
              onChange={e => (this.hjelmBarn = e.target.value)}
            />
            <div class="antallValgteDiver">Antall valgte: {this.antallValgteHjelmBarnArray[0]}</div>
          </div>
          <div id="hjelmVoksneDiv" class="utstyrDiver">
            <h4>Hjelm for voksne</h4>
            <img src="../bilder/hjelm-voksne.jpeg" alt="Hjelm Voksne" />
            <input
              type="number"
              placeholder="Hvor mange vil du leie?"
              id="inputHjelmVoksne"
              min="0"
              onChange={e => (this.hjelmVoksne = e.target.value)}
            />
            <div class="antallValgteDiver">Antall valgte: {this.antallValgteHjelmVoksneArray[0]}</div>
          </div>
          <div id="sykkelkurvDiv" class="utstyrDiver">
            <h4>Sykkelkurv</h4>
            <img src="../bilder/sykkelkurv.jpeg" alt="Sykkelkurv" />
            <input
              type="number"
              placeholder="Hvor mange vil du leie?"
              id="inputSykkelkurv"
              min="0"
              onChange={e => (this.sykkelkurv = e.target.value)}
            />
            <div class="antallValgteDiver">Antall valgte: {this.antallValgteSykkelkurvArray[0]}</div>
          </div>
          <div id="sykkellåsDiv" class="utstyrDiver">
            <h4>Sykkellås</h4>
            <img src="../bilder/sykkellås.jpeg" alt="Sykkellås" />
            <input
              type="number"
              placeholder="Hvor mange vil du leie?"
              id="inputSykkellås"
              min="0"
              onChange={e => (this.sykkellås = e.target.value)}
            />
            <div class="antallValgteDiver">Antall valgte: {this.antallValgteSykkellåsArray[0]}</div>
          </div>
          <div id="sykkelstativDiv" class="utstyrDiver">
            <h4>Sykkelstativ</h4>
            <img src="../bilder/sykkelstativ-hund.jpeg" alt="Sykkelstativ" />
            <input
              type="number"
              placeholder="Hvor mange vil du leie?"
              id="inputSykkelstativ"
              min="0"
              onChange={e => (this.sykkelstativ = e.target.value)}
            />
            <div class="antallValgteDiver">Antall valgte: {this.antallValgteSykkelstativArray[0]}</div>
          </div>
          <div id="sykkelvogn" class="utstyrDiver">
            <h4>Sykkelvogn</h4>
            <img src="../bilder/sykkelvogn.jpeg" alt="Sykkelvogn" />
            <input
              type="number"
              placeholder="Hvor mange vil du leie?"
              id="inputSykkelvogn"
              min="0"
              onChange={e => (this.sykkelvogn = e.target.value)}
            />
            <div class="antallValgteDiver">Antall valgte: {this.antallValgteSykkelvognArray[0]}</div>
          </div>
        </div>
        <div align="center">
          <button type="button" class="btn" onClick={this.leggTilUtstyr}>
            Legg inn utstyr
          </button>
          <button type="button" class="btn" onClick={this.fjernUtstyr}>
            Fjern utstyr som er lagt inn i bestillingen
          </button>
        </div>
      </div>
    );
  }
  mounted() {
    sykkelService.hvorMyeUtstyrLedig(utstyrLedig => {
      this.utstyrLedig = utstyrLedig;
    });

    sykkelService.hentUtstyrOversikt(this.props.match.params.bestillingId, utstyrOversikt => {
      this.utstyrOversikt = utstyrOversikt;
    });

    this.hentAntall();
  }

  return() {
    history.push('/endreBestilling/' + this.props.match.params.ansattId + '/' + +this.props.match.params.bestillingId);
  }

  hentAntall() {
    sykkelService.hvorMangeUtstyrValgt(this.props.match.params.bestillingId, 'Barnesete', barneseteValgt => {
      let tall = barneseteValgt;
      this.antallValgteBarnesete = tall[0].hvorMangeValgt;
      this.antallValgteBarneseteArray.pop();
      this.antallValgteBarneseteArray.push(this.antallValgteBarnesete);
    });

    sykkelService.hvorMangeUtstyrValgt(this.props.match.params.bestillingId, 'Hjelm barn', hjelmBarnValgt => {
      let tall = hjelmBarnValgt;
      this.antallValgteHjelmBarn = tall[0].hvorMangeValgt;
      this.antallValgteHjelmBarnArray.pop();
      this.antallValgteHjelmBarnArray.push(this.antallValgteHjelmBarn);
    });

    sykkelService.hvorMangeUtstyrValgt(this.props.match.params.bestillingId, 'Hjelm voksne', hjelmVoksneValgt => {
      let tall = hjelmVoksneValgt;
      this.antallValgteHjelmVoksne = tall[0].hvorMangeValgt;
      this.antallValgteHjelmVoksneArray.pop();
      this.antallValgteHjelmVoksneArray.push(this.antallValgteHjelmVoksne);
    });

    sykkelService.hvorMangeUtstyrValgt(this.props.match.params.bestillingId, 'Sykkelkurv', sykkelkurvValgt => {
      let tall = sykkelkurvValgt;
      this.antallValgteSykkelkurv = tall[0].hvorMangeValgt;
      this.antallValgteSykkelkurvArray.pop();
      this.antallValgteSykkelkurvArray.push(this.antallValgteSykkelkurv);
    });

    sykkelService.hvorMangeUtstyrValgt(this.props.match.params.bestillingId, 'Sykkellås', sykkellåsValgt => {
      let tall = sykkellåsValgt;
      this.antallValgteSykkellås = tall[0].hvorMangeValgt;
      this.antallValgteSykkellåsArray.pop();
      this.antallValgteSykkellåsArray.push(this.antallValgteSykkellås);
    });

    sykkelService.hvorMangeUtstyrValgt(this.props.match.params.bestillingId, 'Sykkelstativ', sykkelstativValgt => {
      let tall = sykkelstativValgt;
      this.antallValgteSykkelstativ = tall[0].hvorMangeValgt;
      this.antallValgteSykkelstativArray.pop();
      this.antallValgteSykkelstativArray.push(this.antallValgteSykkelstativ);
    });

    sykkelService.hvorMangeUtstyrValgt(this.props.match.params.bestillingId, 'Sykkelvogn', sykkelvognValgt => {
      let tall = sykkelvognValgt;
      this.antallValgteSykkelvogn = tall[0].hvorMangeValgt;
      this.antallValgteSykkelvognArray.pop();
      this.antallValgteSykkelvognArray.push(this.antallValgteSykkelvogn);
    });
  }

  leggTilUtstyr() {
    if (this.barnesete > 0) {
      if (this.utstyrLedig[0].ant_ledige > this.barnesete) {
        sykkelService.leggInnUtstyr(this.props.match.params.bestillingId, 'Barnesete', this.barnesete, barnesete => {
          sykkelService.hvorMangeUtstyrValgt(this.props.match.params.bestillingId, 'Barnesete', barneseteValgt => {
            let tall = barneseteValgt;
            this.antallValgteBarnesete = tall[0].hvorMangeValgt;
            this.antallValgteBarneseteArray.pop();
            this.antallValgteBarneseteArray.push(this.antallValgteBarnesete);
          });
        });
      } else {
        alert(
          'Vi har ikke nok barneseter på lager for øyeblikket. Lagerstatus er ' +
            (Number(this.utstyrLedig[0].ant_ledige) - 1)
        );
      }
    }

    if (this.hjelmBarn > 0) {
      if (this.utstyrLedig[1].ant_ledige > this.hjelmBarn) {
        sykkelService.leggInnUtstyr(this.props.match.params.bestillingId, 'Hjelm barn', this.hjelmBarn, hjelmBarn => {
          sykkelService.hvorMangeUtstyrValgt(this.props.match.params.bestillingId, 'Hjelm barn', hjelmBarnValgt => {
            let tall = hjelmBarnValgt;
            this.antallValgteHjelmBarn = tall[0].hvorMangeValgt;
            this.antallValgteHjelmBarnArray.pop();
            this.antallValgteHjelmBarnArray.push(this.antallValgteHjelmBarn);
          });
        });
      } else {
        alert(
          'Vi har ikke nok hjelmer for barn på lager for øyeblikket. Lagerstatus er ' +
            (Number(this.utstyrLedig[1].ant_ledige) - 1)
        );
      }
    }

    if (this.hjelmVoksne > 0) {
      if (this.utstyrLedig[2].ant_ledige > this.hjelmVoksne) {
        sykkelService.leggInnUtstyr(
          this.props.match.params.bestillingId,
          'Hjelm voksne',
          this.hjelmVoksne,
          hjelmVoksne => {
            sykkelService.hvorMangeUtstyrValgt(
              this.props.match.params.bestillingId,
              'Hjelm voksne',
              hjelmVoksneValgt => {
                let tall = hjelmVoksneValgt;
                this.antallValgteHjelmVoksne = tall[0].hvorMangeValgt;
                this.antallValgteHjelmVoksneArray.pop();
                this.antallValgteHjelmVoksneArray.push(this.antallValgteHjelmVoksne);
              }
            );
          }
        );
      } else {
        alert(
          'Vi har ikke nok hjelmer for voksne på lager for øyeblikket. Lagerstatus er ' +
            (Number(this.utstyrLedig[2].ant_ledige) - 1)
        );
      }
    }

    if (this.sykkelkurv > 0) {
      if (this.utstyrLedig[3].ant_ledige > this.sykkelkurv) {
        sykkelService.leggInnUtstyr(this.props.match.params.bestillingId, 'Sykkelkurv', this.sykkelkurv, sykkelkurv => {
          sykkelService.hvorMangeUtstyrValgt(this.props.match.params.bestillingId, 'Sykkelkurv', sykkelkurvValgt => {
            let tall = sykkelkurvValgt;
            this.antallValgteSykkelkurv = tall[0].hvorMangeValgt;
            this.antallValgteSykkelkurvArray.pop();
            this.antallValgteSykkelkurvArray.push(this.antallValgteSykkelkurv);
          });
        });
      } else {
        alert(
          'Vi har ikke nok sykkelkurver på lager for øyeblikket. Lagerstatus er ' +
            (Number(this.utstyrLedig[3].ant_ledige) - 1)
        );
      }
    }

    if (this.sykkellås > 0) {
      if (this.utstyrLedig[4].ant_ledige > this.sykkellås) {
        sykkelService.leggInnUtstyr(this.props.match.params.bestillingId, 'Sykkellås', this.sykkellås, sykkellås => {
          sykkelService.hvorMangeUtstyrValgt(this.props.match.params.bestillingId, 'Sykkellås', sykkellåsValgt => {
            let tall = sykkellåsValgt;
            this.antallValgteSykkellås = tall[0].hvorMangeValgt;
            this.antallValgteSykkellåsArray.pop();
            this.antallValgteSykkellåsArray.push(this.antallValgteSykkellås);
          });
        });
      } else {
        alert(
          'Vi har ikke nok sykkellåser på lager for øyeblikket. Lagerstatus er ' +
            (Number(this.utstyrLedig[4].ant_ledige) - 1)
        );
      }
    }

    if (this.sykkelstativ > 0) {
      if (this.utstyrLedig[5].ant_ledige > this.sykkelstativ) {
        sykkelService.leggInnUtstyr(
          this.props.match.params.bestillingId,
          'Sykkelstativ',
          this.sykkelstativ,
          sykkelstativ => {
            sykkelService.hvorMangeUtstyrValgt(
              this.props.match.params.bestillingId,
              'Sykkelstativ',
              sykkelstativValgt => {
                let tall = sykkelstativValgt;
                this.antallValgteSykkelstativ = tall[0].hvorMangeValgt;
                this.antallValgteSykkelstativArray.pop();
                this.antallValgteSykkelstativArray.push(this.antallValgteSykkelstativ);
              }
            );
          }
        );
      } else {
        alert(
          'Vi har ikke nok sykkelstativ på lager for øyeblikket. Lagerstatus er ' +
            (Number(this.utstyrLedig[5].ant_ledige) - 1)
        );
      }
    }

    if (this.sykkelvogn > 0) {
      if (this.utstyrLedig[6].ant_ledige > this.sykkelvogn) {
        sykkelService.leggInnUtstyr(this.props.match.params.bestillingId, 'Sykkelvogn', this.sykkelvogn, sykkelvogn => {
          sykkelService.hvorMangeUtstyrValgt(this.props.match.params.bestillingId, 'Sykkelvogn', sykkelvognValgt => {
            let tall = sykkelvognValgt;
            this.antallValgteSykkelvogn = tall[0].hvorMangeValgt;
            this.antallValgteSykkelvognArray.pop();
            this.antallValgteSykkelvognArray.push(this.antallValgteSykkelvogn);
          });
        });
      } else {
        alert(
          'Vi har ikke nok sykkelvogner på lager for øyeblikket. Lagerstatus er ' +
            (Number(this.utstyrLedig[6].ant_ledige) - 1)
        );
      }
    }

    sykkelService.hvorMyeUtstyrLedig(utstyrLedig => {
      this.utstyrLedig = utstyrLedig;
    });

    sykkelService.hvorMyeUtstyriBestilling(this.props.match.params.bestillingId, utstyrValgt => {
      this.utstyrValgt = utstyrValgt;
      let hvorMange = this.utstyrValgt[0].hvorMangeValgt;
      alert('Det ligger nå ' + hvorMange + ' utstyr i bestillingen!');
    });

    document.getElementById('inputBarnesete').value = '';
    document.getElementById('inputHjelmBarn').value = '';
    document.getElementById('inputHjelmVoksne').value = '';
    document.getElementById('inputSykkelkurv').value = '';
    document.getElementById('inputSykkellås').value = '';
    document.getElementById('inputSykkelstativ').value = '';
    document.getElementById('inputSykkelvogn').value = '';

    this.barnesete = 0;
    this.hjelmBarn = 0;
    this.hjelmVoksne = 0;
    this.sykkelkurv = 0;
    this.sykkellås = 0;
    this.sykkelstativ = 0;
    this.sykkelvogn = 0;
  }

  fjernUtstyr() {
    sykkelService.fjernUtstyrFraBestilling(this.props.match.params.bestillingId, fjernSykler => {
      alert('Utstyr fjernet!');
      sykkelService.hvorMyeUtstyrLedig(utstyrLedig => {
        this.utstyrLedig = utstyrLedig;
        this.antallValgteBarneseteArray[0] = '';
        this.antallValgteHjelmBarnArray[0] = '';
        this.antallValgteHjelmVoksneArray[0] = '';
        this.antallValgteSykkelkurvArray[0] = '';
        this.antallValgteSykkellåsArray[0] = '';
        this.antallValgteSykkelstativArray[0] = '';
        this.antallValgteSykkelvognArray[0] = '';
      });
    });
  }
}

export class NyKunde extends Component {
  fornavn = '';
  etternavn = '';
  epost = '';
  telefon = '';

  tabell = [];

  kunder = [];

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Ny / eksisterende kunde</h1>
          <button type="button" class="btn" id="loggUtKnapp" onClick={this.return}>
            Tilbake
          </button>
        </div>
        <div id="nyKundeDiv">
          <h2>Legg til ny kunde</h2>
          <hr />
          <form onSubmit={this.leggTilKunde}>
            <h3>Fornavn:</h3>
            <input
              type="text"
              class="genereltInputer form-control form-control-lg"
              placeholder="Skriv fornavn"
              onChange={e => (this.fornavn = e.target.value)}
              required
            />
            <h3>Etternavn:</h3>
            <input
              type="text"
              class="genereltInputer form-control form-control-lg"
              placeholder="Skriv etternavn"
              onChange={e => (this.etternavn = e.target.value)}
              required
            />
            <h3>Kundens epost:</h3>
            <input
              type="text"
              class="genereltInputer form-control form-control-lg"
              placeholder=" Skriv epost"
              onChange={e => (this.epost = e.target.value)}
              required
            />
            <h3>Telefonnummer:</h3>
            <input
              type="number"
              class="genereltInputer form-control form-control-lg"
              placeholder="Skriv telefonnummer"
              onChange={e => (this.telefon = e.target.value)}
              required
            />
            <br />
            <button type="submit" class="btn">
              Legg til kunde
            </button>
          </form>
        </div>
        <hr />
        <div id="kundetabell">
          <h2>Alle eksisterende kunder</h2>
          <button type="button" id="toggleFiltrerKnapp" class="btn" onClick={this.toggleFiltrer}>
            Filtrer tabellen?
          </button>
          <br />
          <div id="filtrerKunderDiv">
            <div class="form-inline">
              <h3>Hva vil du finne kunden med?</h3>
              <input
                type="text"
                id="etternavnInput"
                class="genereltInputer form-control form-control-lg"
                placeholder="Søk etter etternavn"
                onChange={e => (this.etternavnInput = event.target.value)}
              />
              <input
                type="text"
                id="fornavnInput"
                class="genereltInputer form-control form-control-lg"
                placeholder="Søk etter fornavn"
                onChange={e => (this.fornavnInput = event.target.value)}
              />
              <input
                type="text"
                id="epostInput"
                class="genereltInputer form-control form-control-lg"
                placeholder="Søk etter epost"
                onChange={e => (this.epostInput = event.target.value)}
              />
              <input
                type="number"
                id="telefonInput"
                class="genereltInputer form-control form-control-lg"
                placeholder="Søk etter telefonnummer"
                onChange={e => (this.telefonInput = event.target.value)}
              />
            </div>
            <br />
            <button type="button" onClick={this.sok} class="btn">
              Filter
            </button>
            <button type="button" class="btn" onClick={this.nullstill}>
              Nullstill
            </button>
          </div>
          <br />
          <table id="customers" align="center">
            <tbody>{this.tabell}</tbody>
          </table>
        </div>
      </div>
    );
  }

  mounted() {
    bestillingService.hentKunder(kunder => {
      this.kunder = kunder;
      this.createTable();
    });
  }

  return() {
    history.push('/bestilling/' + this.props.match.params.ansattId);
  }

  toggleFiltrer() {
    var x = document.getElementById('filtrerKunderDiv');
    if (window.getComputedStyle(x).display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  createTable() {
    if (this.kunder == 0) {
      alert('Ingen rader matchet søket ditt');
    } else {
      this.tabell = '';
      this.tabell = [];
      this.tabell.push(
        <tr>
          <th>Etternavn</th>
          <th>Fornavn</th>
          <th>Kundens epost</th>
          <th>Telefonnummer</th>
          <th>Rediger info</th>
        </tr>
      );

      for (let i = 0; i < this.kunder.length; i++) {
        this.tabell.push(
          <tr>
            <td>{this.kunder[i].etternavn}</td>
            <td>{this.kunder[i].fornavn}</td>
            <td>{this.kunder[i].epost}</td>
            <td>{this.kunder[i].telefon}</td>
            <td>
              <NavLink to={'/kundeEdit/' + this.props.match.params.ansattId + '/' + this.kunder[i].epost}>
                {' '}
                Rediger{' '}
              </NavLink>
            </td>
          </tr>
        );
      }
    }
  }

  sok() {
    if (this.etternavnInput == '') this.etternavnInput = '%';
    if (this.fornavnInput == '') this.fornavnInput = '%';
    if (this.epostInput == '') this.epostInput = '%';
    if (this.telefonInput == '') this.telefonInput = '%';

    bestillingService.sok5(this.etternavnInput, this.fornavnInput, this.epostInput, this.telefonInput, sok => {
      this.kunder = sok;
      this.createTable();
    });
  }

  nullstill() {
    this.etternavnInput = '';
    this.fornavnInput = '';
    this.epostInput = '';
    this.telefonInput = '';

    document.getElementById('etternavnInput').value = '';
    document.getElementById('fornavnInput').value = '';
    document.getElementById('epostInput').value = '';
    document.getElementById('telefonInput').value = '';

    bestillingService.hentKunder(kunder => {
      this.kunder = kunder;
      this.createTable();
    });
  }

  leggTilKunde(e) {
    e.preventDefault();
    bestillingService.leggTilKunde(this.epost, this.fornavn, this.etternavn, this.telefon, id => {
      history.push('/bestilling/' + this.props.match.params.ansattId);
    });
  }
  loggUtPush() {
    history.push('/');
  }
}

export class KundeEdit extends Component {
  //Side der man endre informasjonen til syklene. Bytter også status
  kunde = null;

  render() {
    if (!this.kunde) return null;

    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Endre / slett kunde</h1>
          <button type="button" id="loggUtKnapp" class="btn" onClick={this.tilbake}>
            Tilbake
          </button>
        </div>
        <div id="nyAnsattDiv">
          <h2>
            Rediger {this.kunde.fornavn} {this.kunde.etternavn}?
          </h2>
          <hr />
          <h3>Epost</h3>
          <i class="material-icons" id="infoIkon" onClick={this.toggleInfo}>
            info_outline
          </i>
          <input
            type="text"
            class="genereltInputer form-control form-control-lg"
            value={this.kunde.epost}
            required
            disabled
          />
          <p id="epostNB">
            <i>
              Epost kan ved denne versjonen av applikasjon ikke bli endret. Om kunden ønsker å bruke en annen epost, lag
              en ny registrering av kunden (NB! Da vil ikke de tidligere bestillingene til kunden regnes med i henhold
              til eventueller rabatter)
            </i>
          </p>
          <h3>Fornavn</h3>
          <input
            type="text"
            class="genereltInputer form-control form-control-lg"
            value={this.kunde.fornavn}
            onChange={e => (this.kunde.fornavn = event.target.value)}
            required
          />
          <h3>Etternavn</h3>
          <input
            type="text"
            class="genereltInputer form-control form-control-lg"
            value={this.kunde.etternavn}
            onChange={e => (this.kunde.etternavn = event.target.value)}
            required
          />
          <h3>Telefon</h3>
          <input
            type="number"
            class="genereltInputer form-control form-control-lg"
            value={this.kunde.telefon}
            onChange={e => (this.kunde.telefon = event.target.value)}
            required
          />
          <br />
          <button type="button" onClick={this.save} class="btn">
            Lagre
          </button>
        </div>
      </div>
    );
  }
  mounted() {
    bestillingService.hentKunde(this.props.match.params.epost, kunde => {
      this.kunde = kunde;
    });
  }

  toggleInfo() {
    var x = document.getElementById('epostNB');
    if (window.getComputedStyle(x).display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  save(e) {
    e.preventDefault();
    bestillingService.updateKunde(
      this.kunde.fornavn,
      this.kunde.etternavn,
      this.kunde.telefon,
      this.props.match.params.epost,
      updateKunde => {
        history.push('/nyKunde/' + this.props.match.params.ansattId);
      }
    );
  }

  tilbake() {
    history.push('/nyKunde/' + this.props.match.params.ansattId);
  }
}
