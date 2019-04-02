import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { ansatteService } from '../services/adminService.js';
import { bestillingService } from '../services/bestillingService.js';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

export class AdminStartside extends Component {
  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.loggUtPush}>
            Logg ut
          </button>
        </div>
        <div id="adminStartsideKnapperDiv">
          <h2>Velkommen til selgersiden</h2>
          <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.ansattePush}>
            Administere ansatte
          </button>
          <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.lokasjonPush}>
            Administere lokasjoner
          </button>
          <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.rapportPush}>
            Se rapport
          </button>
        </div>
      </div>
    );
  }
  ansattePush() {
    history.push('/ansatteAdmin/');
  }

  lokasjonPush() {
    history.push('/lokasjoner/');
  }

  rapportPush() {
    history.push('/rapport/');
  }

  loggUtPush() {
    history.push('/');
  }
}

export class AnsatteAdmin extends Component {
  // Oversikt over ansatte. Mulighet til å endre ansattinformasjon og fjerne/legge til ansatte. Hovedside for daglig leder og sekretær.  Muligens daglig leder kan endre informasjon og sekretær kan bare lese.
  ansatte = [];
  //Things to do! Bare admin(reodor) og sektretær (ludvig) har tilgang her - Bare Reodor kan legge til og endre ansatt-informasjon
  render() {
    return (
      <div>
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.loggUtPush}>
            Logg ut
          </button>
        </div>
        <div id="ansatteDiv">
          <h1>Ansatte</h1>
          <hr />
          {this.ansatte.map(ansatte => (
            <p key={ansatte.id}>
              <NavLink activeStyle={{ color: 'darkblue' }} to={'/ansatteAdmin/' + ansatte.id}>
                {ansatte.fornavn} {ansatte.etternavn} - {ansatte.rolle}
              </NavLink>
            </p>
          ))}
          <button type="button" class="btn" onClick={this.new}>
            Legg til
          </button>
          <button type="button" class="btn" onClick={this.return}>
            Tilbake
          </button>
        </div>
        <br />
      </div>
    );
  }

  mounted() {
    ansatteService.getAnsatte(ansatte => {
      this.ansatte = ansatte;
      console.log(this.ansatte);
    });
  }

  loggUtPush() {
    history.push('/');
  }

  new() {
    history.push('/new_ansatte');
  }

  return() {
    history.push('/AdminStartside/');
  }
}

export class AnsatteDetails extends Component {
  //Viser mer informasjon om ansatte
  ansatte = [];

  render() {
    if (!this.ansatte) return null;

    return (
      <div id="ansatteDetailsDiv">
        <h1>Detaljer for {this.ansatte.fornavn}</h1>
        <hr />

        <p>Fornavn: {this.ansatte.fornavn}</p>
        <p>Etternavn: {this.ansatte.etternavn}</p>
        <p>Brukernavn: {this.ansatte.brukernavn}</p>
        <p>Epost: {this.ansatte.epost}</p>
        <p>Telefon: {this.ansatte.telefon}</p>
        <p>Lokasjons ID: {this.ansatte.lokasjon_id}</p>
        <p>Rolle: {this.ansatte.rolle}</p>

        <button type="button" class="btn" onClick={this.edit}>
          Endre
        </button>
        <button type="button" class="btn" onClick={this.delete}>
          Slett
        </button>
        <button type="Add" class="btn" onClick={this.return}>
          Tilbake
        </button>
      </div>
    );
  }
  mounted() {
    ansatteService.getAnsatt(this.props.match.params.id, ansatte => {
      this.ansatte = ansatte;
    });
  }

  edit() {
    history.push('/ansatte/' + this.ansatte.id + '/edit');
  }

  delete() {
    ansatteService.deleteAnsatte(this.props.match.params.id, () => history.push('/ansatteAdmin/'));
  }
  return() {
    history.push('/ansatteAdmin/');
  }
}

export class AnsatteNew extends Component {
  //Legge til flere ansatte
  fornavn = '';
  etternavn = '';
  brukernavn = '';
  passord = '';
  epost = '';
  telefon = '';
  lokasjon_id = '';
  rolle = '';

  render() {
    return (
      <div>
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.loggUtPush}>
            Logg ut
          </button>
        </div>
        <div id="nyAnsattDiv">
          <h1>Legg til ny ansatt</h1>
          <hr />
          <h3>Fornavn</h3>
          <input
            type="text"
            class="form-control"
            id="nyAnsattFornavnInput"
            value={this.fornavn}
            onChange={e => (this.fornavn = e.target.value)}
          />
          <h3>Etternavn</h3>
          <input
            type="text"
            class="form-control"
            id="nyAnsattEtternavnInput"
            value={this.etternavn}
            onChange={e => (this.etternavn = e.target.value)}
          />
          <h3>Brukernavn</h3>
          <input
            type="text"
            class="form-control"
            id="nyAnsattBrukernavnInput"
            value={this.brukernavn}
            onChange={e => (this.brukernavn = e.target.value)}
          />
          <h3>Passord</h3>
          <input
            type="text"
            class="form-control"
            id="nyAnsattPassordInput"
            value={this.passord}
            onChange={e => (this.passord = e.target.value)}
          />
          <h3>Epost</h3>
          <input
            type="text"
            class="form-control"
            id="nyAnsattEpostInput"
            value={this.epost}
            onChange={e => (this.epost = e.target.value)}
          />
          <h3>Telefonnummer</h3>
          <input
            type="text"
            class="form-control"
            id="nyAnsattTlfInput"
            value={this.telefon}
            onChange={e => (this.telefon = e.target.value)}
          />
          <h3>ID for lokasjon</h3>
          <input
            type="text"
            class="form-control"
            id="nyAnsattLokasjonInput"
            value={this.lokasjon_id}
            onChange={e => (this.lokasjon_id = e.target.value)}
          />
          <h3>Rolle</h3>
          <select
            name="rolle"
            class="form-control"
            id="nyAnsattRolleInput"
            value={this.rolle}
            onChange={e => (this.rolle = event.target.value)}
            required
          >
            <option value="Daglig leder">Daglig leder</option>
            <option value="Sekretær">Sekretær</option>
            <option value="Selger">Selger</option>
            <option value="Lager">Lager</option>
          </select>
          <br />
          <button type="Add" class="btn" onClick={this.add}>
            Legg til
          </button>
          <button type="Add" class="btn" onClick={this.return}>
            Tilbake
          </button>
        </div>
      </div>
    );
  }

  add() {
    ansatteService.addAnsatte(
      this.fornavn,
      this.etternavn,
      this.brukernavn,
      this.passord,
      this.epost,
      this.telefon,
      this.lokasjon_id,
      this.rolle,
      id => {
        history.push('/ansatteAdmin/' + id);
      }
    );
  }

  return() {
    history.push('/ansatteAdmin/');
  }

  loggUtPush() {
    history.push('/');
  }
}

export class AnsatteEdit extends Component {
  //Redigere informasjon om ansatte
  ansatte = [];

  render() {
    return (
      <div>
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.loggUtPush}>
            Logg ut
          </button>
        </div>
        <div id="ansatteEditDiv">
          <h1>Endre informasjonen til {this.ansatte.fornavn}</h1>
          <hr />
          <h3>Fornavn</h3>
          <input type="text" value={this.ansatte.fornavn} onChange={e => (this.ansatte.fornavn = e.target.value)} />
          <h3>Etternavn</h3>
          <input type="text" value={this.ansatte.etternavn} onChange={e => (this.ansatte.etternavn = e.target.value)} />
          <h3>Brukernavn</h3>
          <input
            type="text"
            value={this.ansatte.brukernavn}
            onChange={e => (this.ansatte.brukernavn = e.target.value)}
          />
          <h3>Passord</h3>
          <input type="text" value={this.ansatte.passord} onChange={e => (this.ansatte.passord = e.target.value)} />
          <h3>Epost</h3>
          <input type="text" value={this.ansatte.epost} onChange={e => (this.ansatte.epost = e.target.value)} />
          <h3>Telefonnummer</h3>
          <input type="text" value={this.ansatte.telefon} onChange={e => (this.ansatte.telefon = e.target.value)} />
          <h3>ID for lokasjon</h3>
          <input
            type="text"
            value={this.ansatte.lokasjon_id}
            onChange={e => (this.ansatte.lokasjon_id = e.target.value)}
          />
          <h3>Rolle</h3>
          <select
            name="rolle"
            value={this.ansatte.rolle}
            onChange={e => (this.ansatte.rolle = event.target.value)}
            required
          >
            <option value="Daglig leder">Daglig leder</option>
            <option value="Sekretær">Sekretær</option>
            <option value="Selger">Selger</option>
            <option value="Lager">Lager</option>
          </select>
          <br />
          <br />
          <button type="save" class="btn" onClick={this.save}>
            Save
          </button>
        </div>
      </div>
    );
  }

  mounted() {
    ansatteService.getAnsatt(this.props.match.params.id, ansatte => {
      this.ansatte = ansatte;
      console.log(this.ansatte);
    });
  }

  save() {
    ansatteService.updateAnsatte(this.ansatte, () => {
      history.push('/ansatteAdmin/' + this.props.match.params.id);
    });
  }
}

export class Lokasjoner extends Component {
  lokasjoner = [];

  render() {
    return (
      <div>
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.loggUtPush}>
            Logg ut
          </button>
        </div>
        <div id="lokasjonerDiv">
          <h1>Lokasjonssiden</h1>
          <hr />
          {this.lokasjoner.map(lokasjoner => (
            <p key={lokasjoner.id}>
              <NavLink activeStyle={{ color: 'darkblue' }} to={'/lokasjoner/' + lokasjoner.id}>
                {lokasjoner.område} - {lokasjoner.postkode}
              </NavLink>
            </p>
          ))}
        </div>
        <button type="button" class="btn" onClick={this.new}>
          Legg til
        </button>
        <button type="button" class="btn" onClick={this.return}>
          Tilbake
        </button>
      </div>
    );
  }
  mounted() {
    ansatteService.hentLokasjoner(lokasjoner => {
      this.lokasjoner = lokasjoner;
      console.log(this.lokasjoner);
    });
  }

  loggUtPush() {
    history.push('/');
  }

  return() {
    history.push('/AdminStartside/');
  }

  new() {
    history.push('/nyLokasjon/');
  }
}

export class LokasjonerDetails extends Component {
  //Viser mer informasjon om ansatte
  lokasjoner = [];

  render() {
    return (
      <div id="ansatteDetailsDiv">
        <h1>Detaljer for {this.lokasjoner.område}</h1>
        <hr />

        <p>Adresse: {this.lokasjoner.adresse}</p>
        <p>Postkode: {this.lokasjoner.postkode}</p>
        <p>Område: {this.lokasjoner.område}</p>
        <p>Har lokasjonen lager?: {this.lokasjoner.har_lager}</p>

        <button type="button" class="btn" onClick={this.edit}>
          Endre
        </button>
        <button type="button" class="btn" onClick={this.delete}>
          Slett
        </button>
        <button type="Add" class="btn" onClick={this.return}>
          Tilbake
        </button>
      </div>
    );
  }
  mounted() {
    ansatteService.hentLokasjon(this.props.match.params.id, lokasjoner => {
      this.lokasjoner = lokasjoner;
    });
  }

  edit() {
    history.push('/lokasjon/' + this.lokasjoner.id + '/edit');
  }

  delete() {
    ansatteService.deleteLokasjon(this.props.match.params.id, () => history.push('/lokasjoner/'));
  }
  return() {
    history.push('/lokasjoner/');
  }
}

export class LokasjonNew extends Component {
  //Legge til flere ansatte
  adresse = '';
  postkode = '';
  område = '';
  har_lager = '';

  render() {
    return (
      <div>
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.loggUtPush}>
            Logg ut
          </button>
        </div>
        <div id="nyLokasjonDiv">
          <h1>Legg til ny lokasjon</h1>
          <hr />
          <h3>Adresse</h3>
          <input
            type="text"
            class="form-control"
            id="nyAnsattFornavnInput"
            value={this.adresse}
            onChange={e => (this.adresse = e.target.value)}
          />
          <h3>Postkode</h3>
          <input
            type="text"
            class="form-control"
            id="nyAnsattEtternavnInput"
            value={this.postkode}
            onChange={e => (this.postkode = e.target.value)}
          />
          <h3>Område</h3>
          <input
            type="text"
            class="form-control"
            id="nyAnsattBrukernavnInput"
            value={this.område}
            onChange={e => (this.område = e.target.value)}
          />
          <h3>Har lokasjonen lager?</h3>
          <select
            class="form-control"
            id="nyAnsattRolleInput"
            value={this.har_lager}
            onChange={e => (this.har_lager = event.target.value)}
            required
          >
            <option value="Ja">Ja</option>
            <option value="Nei">Nei</option>
          </select>
          <br />
          <button type="Add" class="btn" onClick={this.add}>
            Legg til
          </button>
          <button type="Add" class="btn" onClick={this.return}>
            Tilbake
          </button>
        </div>
      </div>
    );
  }

  add() {
    ansatteService.addLokasjon(this.adresse, this.postkode, this.område, this.har_lager, id => {
      history.push('/lokasjoner/' + id);
    });
  }

  return() {
    history.push('/lokasjoner/');
  }

  loggUtPush() {
    history.push('/');
  }
}

export class LokasjonEdit extends Component {
  //Redigere informasjon om ansatte
  lokasjoner = [];

  render() {
    return (
      <div>
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.loggUtPush}>
            Logg ut
          </button>
        </div>
        <div id="ansatteEditDiv">
          <h1>Endre informasjonen til {this.lokasjoner.område}</h1>
          <hr />
          <h3>Adresse</h3>
          <input
            type="text"
            value={this.lokasjoner.adresse}
            onChange={e => (this.lokasjoner.adresse = e.target.value)}
          />
          <h3>Postkode</h3>
          <input
            type="text"
            value={this.lokasjoner.postkode}
            onChange={e => (this.lokasjoner.postkode = e.target.value)}
          />
          <h3>Område</h3>
          <input type="text" value={this.lokasjoner.område} onChange={e => (this.lokasjoner.område = e.target.value)} />
          <h3>Har lokasjonen lager?</h3>
          <select
            name="rolle"
            value={this.lokasjoner.har_lager}
            onChange={e => (this.lokasjoner.har_lager = event.target.value)}
            required
          >
            <option value="Ja">Ja</option>
            <option value="Nei">Nei</option>
          </select>
          <br />
          <br />
          <button type="save" class="btn" onClick={this.save}>
            Save
          </button>
        </div>
      </div>
    );
  }

  mounted() {
    ansatteService.hentLokasjon(this.props.match.params.id, lokasjoner => {
      this.lokasjoner = lokasjoner;
    });
  }

  save() {
    ansatteService.updateLokasjon(this.lokasjoner, () => {
      history.push('/lokasjoner/' + this.props.match.params.id);
    });
  }
}

export class Rapport extends Component {
  tabell = [];
  rapporter = [];
  totalGevinstArray = [];
  totalGevinst = [];

  utlevering_dato = '';
  faktiskInnlevering_dato = '';

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.loggUtPush}>
            Logg ut
          </button>
          <button type="button" id="toggleFiltrerKnapp" class="btn" onClick={this.toggleFiltrer}>
            Filtrer bestillingene?
          </button>
        </div>
        <div id="rapportTabellDiv">
          <h1>Rapportsiden</h1>
          <div id="filtrerRapporterDiv">
            <form onSubmit={this.sok}>
              <div class="form-inline">
                <h3>Filtrer rapporten:</h3>
                <h4>Velg ut- og innleveringtidspunkt</h4>
                <input
                  id="utlevering_dato"
                  type="date"
                  class="form-control form-control-lg"
                  onChange={e => (this.utlevering_dato = event.target.value)}
                  required
                />
                <input
                  id="faktiskInnlevering_dato"
                  type="date"
                  class="form-control form-control-lg"
                  min={this.utlevering_dato}
                  onChange={e => (this.faktiskInnlevering_dato = event.target.value)}
                  required
                />
              </div>
              <button type="submit" class="btn btn-sucess">
                Søk
              </button>
              <button type="button" class="btn btn-sucess" onClick={this.nullstill}>
                Nullstill
              </button>
            </form>
          </div>
          <br />
          <table id="customers" align="center">
            <tbody>{this.tabell}</tbody>
          </table>
          <div id="totalGevinstDiv">
            Totalgevinst for perioden:{' '}
            <b>
              <u>{this.totalGevinstArray[0]}</u>
            </b>
          </div>
        </div>
      </div>
    );
  }
  mounted() {
    bestillingService.hentRapport(rapport => {
      this.rapporter = rapport;
      this.createTable();
    });
  }

  loggUtPush() {
    history.push('/');
  }

  toggleFiltrer() {
    var x = document.getElementById('filtrerRapporterDiv');
    if (window.getComputedStyle(x).display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  sok(e) {
    e.preventDefault();
    bestillingService.sok3(this.utlevering_dato, this.faktiskInnlevering_dato, sok => {
      this.rapporter = sok;
      this.createTable();
    });
  }

  nullstill() {
    this.utlevering_dato = '';
    this.faktiskInnlevering_dato = '';

    document.getElementById('utlevering_dato').value = '';
    document.getElementById('faktiskInnlevering_dato').value = '';

    bestillingService.hentRapport(rapport => {
      this.rapporter = rapport;
      this.createTable();
    });
  }

  createTable() {
    this.tabell = '';
    this.tabell = [];

    this.tabell.push(
      <tr>
        <th>Id</th>
        <th>Bestillingstype</th>
        <th>Utleveringstid</th>
        <th>Innleveringstid</th>
        <th>Kundens epost</th>
        <th>Kundens navn</th>
        <th>Inntekt for bestillinga</th>
      </tr>
    );

    for (let i = 0; i < this.rapporter.length; i++) {
      this.tabell.push(
        <tr>
          <td>{this.rapporter[i].id}</td>
          <td>{this.rapporter[i].bestilling_type}</td>
          <td>
            {this.rapporter[i].utlevering_dato} {this.rapporter[i].utlevering_tid}
          </td>
          <td>
            {this.rapporter[i].faktiskInnlevering_dato} {this.rapporter[i].faktiskInnlevering_tid}
          </td>
          <td>{this.rapporter[i].epost}</td>
          <td>
            {this.rapporter[i].fornavn} {this.rapporter[i].etternavn}
          </td>
          <td>{this.rapporter[i].gevinst},-</td>
        </tr>
      );
      let tall = Number(this.rapporter[i].gevinst);
      this.totalGevinst = Number(this.totalGevinst) + tall;
    }
    this.totalGevinstArray.pop();
    this.totalGevinstArray.push(this.totalGevinst);
    this.totalGevinst = 0;
  }
}

export class Sekretærstartside extends Component {}

export class AnsatteSekretær extends Component {
  // Oversikt over ansatte. Hovedside for sekretær. Ikke mulighet til å endre informasjon/slette/legge til ansatte.
  //Things to do!!! Gi mulighet til å se bestillinger
  ansatte = [];

  render() {
    if (!this.ansatte) return null;

    return (
      <div>
        <h1>Ansatte</h1>
        <ul>
          {this.ansatte.map(ansatte => (
            <li key={ansatte.id}>
              <NavLink activeStyle={{ color: 'darkblue' }} to={'/ansatteSek/' + ansatte.id}>
                {ansatte.fornavn}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  mounted() {
    ansatteService.getAnsatte(ansatte => {
      this.ansatte = ansatte;
    });
  }
}

export class AnsatteDetailsSek extends Component {
  //Viser mer informasjon om ansatte
  //Bygger på sekretærs startside.
  ansatte = [];

  render() {
    if (!this.ansatte) return null;

    return (
      <div>
        <ul>
          <li>Fornavn: {this.ansatte.fornavn}</li>
          <li>Etternavn: {this.ansatte.etternavn}</li>
          <li>Brukernavn: {this.ansatte.brukernavn}</li>
          <li>Epost: {this.ansatte.epost}</li>
          <li>Telefon: {this.ansatte.telefon}</li>
          <li>Lokasjons ID: {this.ansatte.lokasjon_id}</li>
          <li>Rolle: {this.ansatte.rolle}</li>
        </ul>
        <button type="Add" onClick={this.return}>
          Tilbake
        </button>
      </div>
    );
  }

  mounted() {
    ansatteService.getAnsatt(this.props.match.params.id, ansatte => {
      this.ansatte = ansatte;
    });
  }

  return() {
    history.push('/ansatteSek/');
  }
}
