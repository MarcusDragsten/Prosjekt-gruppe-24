import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { ansatteService } from '../services/adminService.js';
import { bestillingService } from '../services/bestillingService.js';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

export class AdminStartside extends Component {
  ansatt = [];

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Administrasjonsiden</h1>
          <button type="button" class="btn" id="loggUtKnapp" onClick={this.loggUtPush}>
            Logg ut
          </button>
        </div>
        <div id="adminStartsideKnapperDiv">
          <h2>
            Velkommen {this.ansatt.fornavn} {this.ansatt.etternavn}
          </h2>
          <button
            type="button"
            id="knapperStartside"
            class="btn btn-sucess btn-lg btn-block"
            onClick={this.ansattePush}
          >
            Administere ansatte
          </button>
          <button
            type="button"
            id="knapperStartside"
            class="btn btn-sucess btn-lg btn-block"
            onClick={this.lokasjonPush}
          >
            Administere lokasjoner
          </button>
          <button
            type="button"
            id="knapperStartside"
            class="btn btn-sucess btn-lg btn-block"
            onClick={this.rapportPush}
          >
            Se inntektsrapporter
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

  ansattePush() {
    history.push('/ansatteAdmin/' + this.props.match.params.ansattId);
  }

  lokasjonPush() {
    history.push('/lokasjoner/' + this.props.match.params.ansattId);
  }

  rapportPush() {
    history.push('/rapport/' + this.props.match.params.ansattId);
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
        <div class="header w3-container" id="header">
          <h1>Administere ansatte</h1>
          <button type="button" class="btn" id="loggUtKnapp" onClick={this.return}>
            Tilbake til startsiden
          </button>
        </div>
        <div id="ansatteDiv">
          <h1>Liste over ansatte</h1>
          <i>
            <p>Klikk på en ansatt for flere valg</p>
          </i>
          <hr />
          {this.ansatte.map(ansatte => (
            <p key={ansatte.id}>
              <NavLink
                activeStyle={{ color: 'darkblue' }}
                to={'/ansatteAdmin/' + this.props.match.params.ansattId + '/' + ansatte.id}
              >
                {ansatte.fornavn} {ansatte.etternavn} - {ansatte.rolle}
              </NavLink>
            </p>
          ))}
          <button type="button" class="btn" onClick={this.new}>
            Legg til en ansatt
          </button>
        </div>
        <br />
      </div>
    );
  }

  mounted() {
    ansatteService.getAnsatte(ansatte => {
      this.ansatte = ansatte;
    });
  }

  new() {
    history.push('/nyAnsatt/' + this.props.match.params.ansattId);
  }

  return() {
    history.push('/adminStartside/' + this.props.match.params.ansattId);
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
        <p>Arbeidslokasjon: {this.ansatte.område}</p>
        <p>Rolle: {this.ansatte.rolle}</p>
        <button type="button" class="btn" onClick={this.edit}>
          Rediger valgt ansatt
        </button>
        <button type="button" class="btn" onClick={this.delete}>
          Slett valgt ansatt
        </button>
      </div>
    );
  }
  mounted() {
    ansatteService.getAnsatt(this.props.match.params.ansatteListe, ansatte => {
      this.ansatte = ansatte;
    });
  }

  edit() {
    history.push('/ansatteEdit/' + this.props.match.params.ansattId + '/' + this.props.match.params.ansatteListe);
  }

  delete() {
    var x = confirm('Er du sikker på at du vil slette denne ansatten fra databasen?');

    if (x == true) {
      ansatteService.deleteAnsatte(this.props.match.params.ansatteListe, () =>
        history.push('/ansatteAdmin/' + this.props.match.params.ansattId)
      );
      location.reload();
    }
  }
}

export class NyAnsatt extends Component {
  //Legge til flere ansatte
  fornavn = '';
  etternavn = '';
  brukernavn = '';
  passord = '';
  epost = '';
  telefon = '';
  lokasjon_id = '';
  rolle = '';

  utleveringssteder = [];

  render() {
    return (
      <div>
        <div class="header w3-container" id="header">
          <h1>Nye ansatte</h1>
          <button type="button" class="btn" id="loggUtKnapp" onClick={this.return}>
            Tilbake
          </button>
        </div>
        <div id="nyAnsattDiv">
          <h1>Legg til en ansatt</h1>
          <hr />
          <h3>Fornavn</h3>
          <form onSubmit={this.add}>
            <input
              type="text"
              class="genereltInputer form-control form-control-lg"
              placeholder="Skriv fornavn"
              value={this.fornavn}
              onChange={e => (this.fornavn = e.target.value)}
              required
            />
            <h3>Etternavn</h3>
            <input
              type="text"
              class="genereltInputer form-control form-control-lg"
              placeholder="Skriv etternavn"
              value={this.etternavn}
              onChange={e => (this.etternavn = e.target.value)}
              required
            />
            <h3>Brukernavn</h3>
            <input
              type="text"
              class="genereltInputer form-control form-control-lg"
              placeholder="Skriv brukernavn"
              value={this.brukernavn}
              onChange={e => (this.brukernavn = e.target.value)}
              required
            />
            <h3>Passord</h3>
            <input
              type="text"
              class="genereltInputer form-control form-control-lg"
              placeholder="Skriv passord"
              value={this.passord}
              onChange={e => (this.passord = e.target.value)}
              required
            />
            <h3>Epost</h3>
            <input
              type="text"
              class="genereltInputer form-control form-control-lg"
              placeholder="Skriv epost"
              value={this.epost}
              onChange={e => (this.epost = e.target.value)}
              required
            />
            <h3>Telefonnummer</h3>
            <input
              type="number"
              class="genereltInputer form-control form-control-lg"
              placeholder="Skriv telefonnummer"
              value={this.telefon}
              onChange={e => (this.telefon = e.target.value)}
              required
            />
            <h3>Arbeidslokasjon</h3>
            <select
              class="genereltInputer form-control form-control-lg"
              onChange={e => (this.lokasjon_id = event.target.value)}
            >
              <option value="" defaultValue hidden>
                Velg hvor ansatten skal jobbe
              </option>
              {this.utleveringssteder.map(steder => (
                <option key={steder.id} value={steder.id}>
                  {steder.område}
                </option>
              ))}
            </select>
            <h3>Rolle</h3>
            <select
              name="rolle"
              class="genereltInputer form-control form-control-lg"
              value={this.rolle}
              onChange={e => (this.rolle = event.target.value)}
              required
            >
              <option value="" hidden defaultValue>
                Velg en rolle
              </option>
              <option value="Daglig leder">Daglig leder</option>
              <option value="Sekretær">Sekretær</option>
              <option value="Selger">Selger</option>
              <option value="Lager">Lager</option>
            </select>
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
    bestillingService.hentUtleveringsted(utleveringssteder => {
      this.utleveringssteder = utleveringssteder;
    });
  }

  add(e) {
    e.preventDefault();
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
        history.push('/ansatteAdmin/' + this.props.match.params.ansattId);
      }
    );
  }

  return() {
    history.push('/ansatteAdmin/' + this.props.match.params.ansattId);
  }
}

export class AnsatteEdit extends Component {
  //Redigere informasjon om ansatte
  ansatte = [];

  utleveringssteder = [];

  render() {
    return (
      <div>
        <div class="header w3-container" id="header">
          <h1>Administere ansatte</h1>
          <button type="button" class="btn" id="loggUtKnapp" onClick={this.return}>
            Tilbake
          </button>
        </div>
        <div id="ansatteEditDiv">
          <h1>Rediger informasjonen til {this.ansatte.fornavn}</h1>
          <hr />
          <h3>Fornavn</h3>
          <input
            type="text"
            class="genereltInputer form-control form-control-lg"
            placeholder="Skriv Fornavn"
            value={this.ansatte.fornavn}
            onChange={e => (this.ansatte.fornavn = e.target.value)}
          />
          <h3>Etternavn</h3>
          <input
            type="text"
            class="genereltInputer form-control form-control-lg"
            placeholder="Skriv etternavn"
            value={this.ansatte.etternavn}
            onChange={e => (this.ansatte.etternavn = e.target.value)}
          />
          <h3>Brukernavn</h3>
          <input
            type="text"
            class="genereltInputer form-control form-control-lg"
            placeholder="Skriv brukernavn"
            value={this.ansatte.brukernavn}
            onChange={e => (this.ansatte.brukernavn = e.target.value)}
          />
          <h3>Passord</h3>
          <input
            type="text"
            class="genereltInputer form-control form-control-lg"
            value={this.ansatte.passord}
            onChange={e => (this.ansatte.passord = e.target.value)}
          />
          <h3>Epost</h3>
          <input
            type="text"
            class="genereltInputer form-control form-control-lg"
            value={this.ansatte.epost}
            onChange={e => (this.ansatte.epost = e.target.value)}
          />
          <h3>Telefonnummer</h3>
          <input
            type="text"
            class="genereltInputer form-control form-control-lg"
            value={this.ansatte.telefon}
            onChange={e => (this.ansatte.telefon = e.target.value)}
          />
          <h3>Arbeidslokasjon</h3>
          <select
            class="genereltInputer form-control form-control-lg"
            value={this.ansatte.id_lokasjon}
            onChange={e => (this.ansatte.id_lokasjon = event.target.value)}
          >
            {this.utleveringssteder.map(steder => (
              <option key={steder.id} value={steder.id}>
                {steder.område}
              </option>
            ))}
          </select>
          <h3>Rolle</h3>
          <select
            class="genereltInputer form-control form-control-lg"
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
          <button type="save" class="btn" onClick={this.save}>
            Lagre
          </button>
        </div>
      </div>
    );
  }

  mounted() {
    ansatteService.getAnsatt(this.props.match.params.edit, ansatte => {
      this.ansatte = ansatte;
    });

    bestillingService.hentUtleveringsted(utleveringssteder => {
      this.utleveringssteder = utleveringssteder;
    });
  }

  return() {
    history.push('/ansatteAdmin/' + this.props.match.params.ansattId);
  }

  save() {
    ansatteService.updateAnsatte(this.ansatte, () => {
      history.push('/ansatteAdmin/' + this.props.match.params.ansattId);
    });
  }
}

export class Lokasjoner extends Component {
  lokasjoner = [];

  render() {
    return (
      <div>
        <div class="header w3-container" id="header">
          <h1>Administrere lokasjoner</h1>
          <button type="button" class="btn" id="loggUtKnapp" onClick={this.return}>
            Tilbake til startsiden
          </button>
        </div>
        <div id="lokasjonerDiv">
          <h1>Liste over lokasjoner</h1>
          <i>
            <p>Klikk på en lokasjon for flere valg</p>
          </i>
          <hr />
          {this.lokasjoner.map(lokasjoner => (
            <p key={lokasjoner.id}>
              <NavLink
                activeStyle={{ color: 'darkblue' }}
                to={'/lokasjoner/' + this.props.match.params.ansattId + '/' + lokasjoner.id}
              >
                {lokasjoner.område} - {lokasjoner.postkode}
              </NavLink>
            </p>
          ))}
          <button type="button" class="btn" onClick={this.new}>
            Legg til en lokasjon
          </button>
        </div>
        <br />
      </div>
    );
  }
  mounted() {
    ansatteService.hentLokasjoner(lokasjoner => {
      this.lokasjoner = lokasjoner;
    });
  }

  return() {
    history.push('/adminStartside/' + this.props.match.params.ansattId);
  }

  new() {
    history.push('/nyLokasjon/' + this.props.match.params.ansattId);
  }
}

export class LokasjonerDetails extends Component {
  //Viser mer informasjon om ansatte
  lokasjoner = [];

  render() {
    return (
      <div id="lokasjonerDetailsDiv">
        <h2>Detaljer for {this.lokasjoner.område}</h2>
        <hr />
        <p>Adresse: {this.lokasjoner.adresse}</p>
        <p>Postkode: {this.lokasjoner.postkode}</p>
        <p>Område: {this.lokasjoner.område}</p>
        <p>Har lokasjonen lager?: {this.lokasjoner.har_lager}</p>
        <button type="button" class="btn" onClick={this.edit}>
          Rediger valgt lokasjon
        </button>
        <button type="button" class="btn" onClick={this.delete}>
          Slett valgt lokasjon
        </button>
      </div>
    );
  }
  mounted() {
    ansatteService.hentLokasjon(this.props.match.params.lokasjonListe, lokasjoner => {
      this.lokasjoner = lokasjoner;
    });
  }

  edit() {
    history.push('/lokasjon/' + this.props.match.params.ansattId + '/' + this.lokasjoner.id);
  }

  delete() {
    var x = confirm('Er du sikker på at du vil slette denne lokasjonen?');

    if (x == true) {
      ansatteService.deleteLokasjon(this.props.match.params.lokasjonListe, () =>
        history.push('/lokasjoner/' + this.props.match.params.ansattId)
      );
    }
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
        <div class="header w3-container" id="header">
          <h1>Administere lokasjoner</h1>
          <button type="button" class="btn" id="loggUtKnapp" onClick={this.return}>
            Tilbake
          </button>
        </div>
        <div id="nyLokasjonDiv">
          <h1>Legg til ny lokasjon</h1>
          <hr />
          <h3>Adresse</h3>
          <form onSubmit={this.add}>
            <input
              type="text"
              class="genereltInputer form-control form-control-lg"
              placeholder="Skriv adresse"
              value={this.adresse}
              onChange={e => (this.adresse = e.target.value)}
              required
            />
            <h3>Postkode</h3>
            <input
              type="number"
              class="genereltInputer form-control form-control-lg"
              placeholder="Skriv postkode"
              value={this.postkode}
              onChange={e => (this.postkode = e.target.value)}
              required
            />
            <h3>Område</h3>
            <input
              type="text"
              class="genereltInputer form-control form-control-lg"
              placeholder="Skriv område"
              value={this.område}
              onChange={e => (this.område = e.target.value)}
              required
            />
            <h3>Har lokasjonen lager?</h3>
            <select
              class="genereltInputer form-control form-control-lg"
              value={this.har_lager}
              onChange={e => (this.har_lager = event.target.value)}
              required
            >
              <option value="" defaultValue hidden>
                Velg et alternativ
              </option>
              <option value="Ja">Ja</option>
              <option value="Nei">Nei</option>
            </select>
            <br />
            <button type="submit" class="btn">
              Legg til
            </button>
          </form>
        </div>
      </div>
    );
  }

  add(e) {
    e.preventDefault();
    ansatteService.addLokasjon(this.adresse, this.postkode, this.område, this.har_lager, id => {
      history.push('/lokasjoner/' + this.props.match.params.ansattId);
    });
  }

  return() {
    history.push('/lokasjoner/' + this.props.match.params.ansattId);
  }
}

export class LokasjonEdit extends Component {
  //Redigere informasjon om ansatte
  lokasjoner = [];

  render() {
    return (
      <div>
        <div class="header w3-container" id="header">
          <h1>Administere lokasjoner</h1>
          <button type="button" class="btn" id="loggUtKnapp" onClick={this.return}>
            Tilbake
          </button>
        </div>
        <div id="ansatteEditDiv">
          <h2>Endre informasjonen til {this.lokasjoner.område}</h2>
          <hr />
          <h3>Adresse</h3>
          <input
            type="text"
            class="genereltInputer form-control form-control-lg"
            placeholder="Skriv adressen"
            value={this.lokasjoner.adresse}
            onChange={e => (this.lokasjoner.adresse = e.target.value)}
          />
          <h3>Postkode</h3>
          <input
            type="text"
            class="genereltInputer form-control form-control-lg"
            placeholder="Skriv postkode"
            value={this.lokasjoner.postkode}
            onChange={e => (this.lokasjoner.postkode = e.target.value)}
          />
          <h3>Område</h3>
          <input
            type="text"
            class="genereltInputer form-control form-control-lg"
            value={this.lokasjoner.område}
            onChange={e => (this.lokasjoner.område = e.target.value)}
          />
          <h3>Har lokasjonen lager?</h3>
          <select
            class="genereltInputer form-control form-control-lg"
            value={this.lokasjoner.har_lager}
            onChange={e => (this.lokasjoner.har_lager = event.target.value)}
            required
          >
            <option value="Ja">Ja</option>
            <option value="Nei">Nei</option>
          </select>
          <br />
          <button type="save" class="btn" onClick={this.save}>
            Lagre
          </button>
        </div>
      </div>
    );
  }

  mounted() {
    ansatteService.hentLokasjon(this.props.match.params.edit, lokasjoner => {
      this.lokasjoner = lokasjoner;
    });
  }

  return() {
    history.push('/lokasjoner/' + this.props.match.params.ansattId);
  }

  save() {
    ansatteService.updateLokasjon(this.lokasjoner, () => {
      history.push('/lokasjoner/' + this.props.match.params.ansattId);
    });
  }
}

export class Rapport extends Component {
  tabell1 = [];
  tabell2 = [];

  totalRapport = [];
  ansatteRapport = [];

  totalGevinstArray = [];
  totalGevinst = [];
  ansatteGevinstArray = [];
  ansatteGevinst = [];
  ansattFornavnArray = [];
  ansattFornavn = [];
  ansattEtternavnArray = [];
  ansattEtternavn = [];

  utlevering_dato = '';
  faktiskInnlevering_dato = '';
  selger = '';

  utlevering_dato2 = '';
  faktiskInnlevering_dato2 = '';

  selgere = [];

  selgerNavn = [];

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Inntektsrapporter</h1>
          <button type="button" id="loggUtKnapp" class="btn" onClick={this.return}>
            Tilbake til startsiden
          </button>
        </div>
        <h2>Rapport over alle inntekter:</h2>
        <i>
          <p>En rapport som viser inntekter for alle innleverte bestillinger</p>
        </i>
        <div id="rapportTotalTabellDiv">
          <button type="button" id="toggleFiltrerKnapp" class="btn" onClick={this.toggleFiltrer}>
            Filtrere tabellen?
          </button>
          <div id="filtrerRapportTotalDiv">
            <form onSubmit={this.sok}>
              <div class="form-inline">
                <h3>Filtrer her:</h3>
                <h4>Velg ut- og innleveringsdato</h4>
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
              <br />
              <button type="submit" class="btn btn-sucess">
                Filtrer
              </button>
              <button type="button" class="btn btn-sucess" onClick={this.nullstill}>
                Nullstill
              </button>
            </form>
          </div>
          <br />
          <br />
          <div>
            <table id="customers" align="center">
              <tbody>{this.tabell1}</tbody>
            </table>
            <div class="gevinstDiver">
              Totalgevinst i perioden:{' '}
              <b>
                <u>{this.totalGevinstArray[0]}</u>
              </b>
            </div>
            <br />
            <hr />
          </div>
        </div>
        <div id="rapportAnsatteTabellDiv">
          <h2>Rapport over alle inntekter per selger:</h2>
          <i>
            <p>En rapport som viser inntekter for alle innleverte bestillinger per selger</p>
          </i>
          <button type="button" id="toggleFiltrerKnapp" class="btn" onClick={this.toggleFiltrer2}>
            Filtrere tabellen?
          </button>
          <div id="filtrerRapportAnsatteDiv">
            <form onSubmit={this.sok2}>
              <div class="form-inline">
                <h3>Filtrer her:</h3>
                <h4>Velg ut- og innleveringsdato</h4>
                <input
                  id="utlevering_dato2"
                  type="date"
                  class="form-control form-control-lg"
                  onChange={e => (this.utlevering_dato2 = event.target.value)}
                  required
                />
                <input
                  id="faktiskInnlevering_dato2"
                  type="date"
                  class="form-control form-control-lg"
                  min={this.utlevering_dato2}
                  onChange={e => (this.faktiskInnlevering_dato2 = event.target.value)}
                  required
                />
              </div>
              <br />
              <div>
                <select
                  id="ansattInput"
                  class="genereltInputer form-control form-control-lg"
                  onChange={e => (this.selger = event.target.value)}
                >
                  <option value="" defaultValue>
                    Filtrer med ansatt
                  </option>
                  {this.selgere.map(selgere => (
                    <option value={selgere.id} key={selgere.id}>
                      {selgere.fornavn} {selgere.etternavn}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <button type="submit" class="btn btn-sucess">
                Filtrer
              </button>
              <button type="button" class="btn btn-sucess" onClick={this.nullstill2}>
                Nullstill
              </button>
            </form>
          </div>
          <br />
          <br />
          <div>
            <table id="customers" align="center">
              <tbody>{this.tabell2}</tbody>
            </table>
            <div class="gevinstDiver">
              Totalgevinst i perioden for {this.ansattFornavnArray[0]} {this.ansattEtternavnArray[0]}:{' '}
              <b>
                <u>{this.ansatteGevinstArray[0]}</u>
              </b>
            </div>
            <br />
          </div>
        </div>
      </div>
    );
  }
  mounted() {
    bestillingService.hentTotalRapport(rapport => {
      this.totalRapport = rapport;
      this.createTable1();
    });

    bestillingService.hentAnsatteRapport(rapport => {
      this.ansatteRapport = rapport;
      this.createTable2();
    });

    ansatteService.getSelgere(selgere => {
      this.selgere = selgere;
    });
  }

  return() {
    history.push('/adminStartside/' + this.props.match.params.ansattId);
  }

  loggUtPush() {
    history.push('/');
  }

  toggleFiltrer() {
    var x = document.getElementById('filtrerRapportTotalDiv');
    if (window.getComputedStyle(x).display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  toggleFiltrer2() {
    var x = document.getElementById('filtrerRapportAnsatteDiv');
    if (window.getComputedStyle(x).display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  sok(e) {
    e.preventDefault();
    bestillingService.sok3(this.utlevering_dato, this.faktiskInnlevering_dato, sok => {
      this.totalRapport = sok;
      this.createTable1();
    });
  }

  sok2(e) {
    e.preventDefault();
    bestillingService.sok4(this.utlevering_dato2, this.faktiskInnlevering_dato2, this.selger, sok => {
      this.ansatteRapport = sok;
      this.createTable2();

      ansatteService.getSelger(this.selger, finnNavn => {
        this.selgerNavn = finnNavn;
        this.ansattFornavnArray.pop();
        this.ansattFornavnArray.push(this.selgerNavn[0].fornavn);

        this.ansattEtternavnArray.pop();
        this.ansattEtternavnArray.push(this.selgerNavn[0].etternavn);
      });
    });
  }

  nullstill() {
    this.utlevering_dato = '';
    this.faktiskInnlevering_dato = '';

    document.getElementById('utlevering_dato').value = '';
    document.getElementById('faktiskInnlevering_dato').value = '';

    bestillingService.hentTotalRapport(rapport => {
      this.totalRapport = rapport;
      this.createTable1();
    });
  }

  nullstill2() {
    this.utlevering_dato2 = '';
    this.faktiskInnlevering_dato2 = '';

    document.getElementById('utlevering_dato2').value = '';
    document.getElementById('faktiskInnlevering_dato2').value = '';
    document.getElementById('ansattInput').value = '';

    bestillingService.hentAnsatteRapport(rapport => {
      this.ansatteRapport = rapport;
      this.createTable2();
    });

    this.ansattFornavnArray[0] = '';
    this.ansattEtternavnArray[0] = '';
  }

  createTable1() {
    this.tabell1 = '';
    this.tabell1 = [];

    this.tabell1.push(
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

    for (let i = 0; i < this.totalRapport.length; i++) {
      this.tabell1.push(
        <tr>
          <td>{this.totalRapport[i].id}</td>
          <td>{this.totalRapport[i].bestilling_type}</td>
          <td>
            {this.totalRapport[i].utlevering_dato} {this.totalRapport[i].utlevering_tid}
          </td>
          <td>
            {this.totalRapport[i].faktiskInnlevering_dato} {this.totalRapport[i].faktiskInnlevering_tid}
          </td>
          <td>{this.totalRapport[i].epost}</td>
          <td>
            {this.totalRapport[i].fornavn} {this.totalRapport[i].etternavn}
          </td>
          <td>{this.totalRapport[i].gevinst},-</td>
        </tr>
      );
      let tall = Number(this.totalRapport[i].gevinst);
      this.totalGevinst = Number(this.totalGevinst) + tall;
    }
    this.totalGevinstArray.pop();
    this.totalGevinstArray.push(this.totalGevinst);
    this.totalGevinst = 0;
  }

  createTable2() {
    this.tabell2 = '';
    this.tabell2 = [];

    this.tabell2.push(
      <tr>
        <th>Id</th>
        <th>Bestillingstype</th>
        <th>Utleveringstid</th>
        <th>Innleveringstid</th>
        <th>Kundens epost</th>
        <th>Ansattes navn</th>
        <th>Ansattes telefon</th>
        <th>Inntekt for bestillinga</th>
      </tr>
    );

    for (let i = 0; i < this.ansatteRapport.length; i++) {
      this.tabell2.push(
        <tr>
          <td>{this.ansatteRapport[i].id}</td>
          <td>{this.ansatteRapport[i].bestilling_type}</td>
          <td>
            {this.ansatteRapport[i].utlevering_dato} {this.ansatteRapport[i].utlevering_tid}
          </td>
          <td>
            {this.ansatteRapport[i].faktiskInnlevering_dato} {this.ansatteRapport[i].faktiskInnlevering_tid}
          </td>
          <td>{this.ansatteRapport[i].epost}</td>
          <td>
            {this.ansatteRapport[i].fornavn} {this.ansatteRapport[i].etternavn}
          </td>
          <td>{this.ansatteRapport[i].telefon}</td>
          <td>{this.ansatteRapport[i].gevinst},-</td>
        </tr>
      );
      let tall = Number(this.ansatteRapport[i].gevinst);
      this.ansatteGevinst = Number(this.ansatteGevinst) + tall;
    }
    this.ansatteGevinstArray.pop();
    this.ansatteGevinstArray.push(this.ansatteGevinst);
    this.ansatteGevinst = 0;
  }
}

export class SekretærStartside extends Component {
  ansatt = [];

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Sekretærsiden</h1>
          <button type="button" id="loggUtKnapp" class="btn" onClick={this.loggUtPush}>
            Logg ut
          </button>
        </div>
        <div id="adminStartsideKnapperDiv">
          <h2>
            Velkommen {this.ansatt.fornavn} {this.ansatt.etternavn}
          </h2>
          <button
            type="button"
            id="knapperStartside"
            class="btn btn-sucess btn-lg btn-block"
            onClick={this.ansattePush}
          >
            Se oversikt over ansatte
          </button>
          <button
            type="button"
            id="knapperStartside"
            class="btn btn-sucess btn-lg btn-block"
            onClick={this.lokasjonPush}
          >
            Se oversikt over lokasjoner
          </button>
          <button
            type="button"
            id="knapperStartside"
            class="btn btn-sucess btn-lg btn-block"
            onClick={this.rapportPush}
          >
            Se inntektsrapporter
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

  ansattePush() {
    history.push('/ansatteSekretær/' + this.props.match.params.ansattId);
  }

  lokasjonPush() {
    history.push('/lokasjonerSekretær/' + this.props.match.params.ansattId);
  }

  rapportPush() {
    history.push('/rapportSekretær/' + this.props.match.params.ansattId);
  }

  loggUtPush() {
    history.push('/');
  }
}

export class AnsatteSekretær extends Component {
  ansatte = [];

  render() {
    return (
      <div>
        <div class="header w3-container" id="header">
          <h1>Oversikt over ansatte</h1>
          <button type="button" class="btn" id="loggUtKnapp" onClick={this.return}>
            Tilbake til startsiden
          </button>
        </div>
        <div id="ansatteDiv">
          <h1>Liste over ansatte</h1>
          <i>
            <p>Klikk på en ansatt for mer informasjon</p>
          </i>
          <hr />
          {this.ansatte.map(ansatte => (
            <p key={ansatte.id}>
              <NavLink
                activeStyle={{ color: 'darkblue' }}
                to={'/ansatteSekretær/' + this.props.match.params.ansattId + '/' + ansatte.id}
              >
                {ansatte.fornavn} {ansatte.etternavn} - {ansatte.rolle}
              </NavLink>
            </p>
          ))}
        </div>
        <br />
      </div>
    );
  }

  mounted() {
    ansatteService.getAnsatte(ansatte => {
      this.ansatte = ansatte;
    });
  }

  loggUtPush() {
    history.push('/');
  }

  return() {
    history.push('/sekretærStartside/' + this.props.match.params.ansattId);
  }
}

export class AnsatteDetailsSekretær extends Component {
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
        <p>Arbeidslokasjon: {this.ansatte.område}</p>
        <p>Rolle: {this.ansatte.rolle}</p>
      </div>
    );
  }
  mounted() {
    ansatteService.getAnsatt(this.props.match.params.ansatteListe, ansatte => {
      this.ansatte = ansatte;
    });
  }
}

export class LokasjonerSekretær extends Component {
  lokasjoner = [];

  render() {
    return (
      <div>
        <div class="header w3-container" id="header">
          <h1>Oversikt over lokasjoner</h1>
          <button type="button" id="loggUtKnapp" class="btn" onClick={this.return}>
            Tilbake til startsiden
          </button>
        </div>
        <div id="lokasjonerDiv">
          <h1>Liste over lokasjoner</h1>
          <i>
            <p>Klikk på en lokasjon for mer informasjon</p>
          </i>
          <hr />
          {this.lokasjoner.map(lokasjoner => (
            <p key={lokasjoner.id}>
              <NavLink
                activeStyle={{ color: 'darkblue' }}
                to={'/lokasjonerSekretær/' + this.props.match.params.ansattId + '/' + lokasjoner.id}
              >
                {lokasjoner.område} - {lokasjoner.postkode}
              </NavLink>
            </p>
          ))}
        </div>
        <br />
      </div>
    );
  }
  mounted() {
    ansatteService.hentLokasjoner(lokasjoner => {
      this.lokasjoner = lokasjoner;
    });
  }

  loggUtPush() {
    history.push('/');
  }

  return() {
    history.push('/sekretærStartside/' + this.props.match.params.ansattId);
  }
}

export class LokasjonerDetailsSekretær extends Component {
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
      </div>
    );
  }
  mounted() {
    ansatteService.hentLokasjon(this.props.match.params.lokasjonListe, lokasjoner => {
      this.lokasjoner = lokasjoner;
    });
  }
}

export class RapportSekretær extends Component {
  tabell1 = [];
  tabell2 = [];

  totalRapport = [];
  ansatteRapport = [];

  totalGevinstArray = [];
  totalGevinst = [];
  ansatteGevinstArray = [];
  ansatteGevinst = [];
  ansattFornavnArray = [];
  ansattFornavn = [];
  ansattEtternavnArray = [];
  ansattEtternavn = [];

  utlevering_dato = '';
  faktiskInnlevering_dato = '';
  selger = '';

  utlevering_dato2 = '';
  faktiskInnlevering_dato2 = '';

  selgere = [];

  selgerNavn = [];

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Inntektsrapporter</h1>
          <button type="button" class="btn" id="loggUtKnapp" onClick={this.return}>
            Tilbake til startsiden
          </button>
        </div>
        <div id="rapportTotalTabellDiv">
          <h2>Rapport over alle inntekter</h2>
          <i>
            <p>En rapport som viser inntekter for alle innleverte bestillinger</p>
          </i>
          <button type="button" id="toggleFiltrerKnapp" class="btn" onClick={this.toggleFiltrer}>
            Filtrer rapporten?
          </button>
          <div id="filtrerRapportTotalDiv">
            <form onSubmit={this.sok}>
              <div class="form-inline">
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
              <br />
              <button type="submit" class="btn btn-sucess">
                Søk
              </button>
              <button type="button" class="btn btn-sucess" onClick={this.nullstill}>
                Nullstill
              </button>
            </form>
          </div>
          <br />
          <br />
          <div>
            <table id="customers" align="center">
              <tbody>{this.tabell1}</tbody>
            </table>
            <div class="gevinstDiver">
              Totalgevinst i perioden:{' '}
              <b>
                <u>{this.totalGevinstArray[0]}</u>
              </b>
            </div>
            <br />
            <hr />
          </div>
        </div>
        <div id="rapportAnsatteTabellDiv">
          <h2>Rapport over alle inntekter per selger:</h2>
          <i>
            <p>En rapport som viser inntekter for alle innleverte bestillinger per selger</p>
          </i>
          <button type="button" id="toggleFiltrerKnapp" class="btn" onClick={this.toggleFiltrer2}>
            Filtrer rapporten?
          </button>
          <div id="filtrerRapportAnsatteDiv">
            <form onSubmit={this.sok2}>
              <div class="form-inline">
                <h4>Velg ut- og innleveringtidspunkt</h4>
                <input
                  id="utlevering_dato2"
                  type="date"
                  class="form-control form-control-lg"
                  onChange={e => (this.utlevering_dato2 = event.target.value)}
                  required
                />
                <input
                  id="faktiskInnlevering_dato2"
                  type="date"
                  class="form-control form-control-lg"
                  min={this.utlevering_dato2}
                  onChange={e => (this.faktiskInnlevering_dato2 = event.target.value)}
                  required
                />
              </div>
              <br />
              <div>
                <select
                  id="ansattInput"
                  class="genereltInputer form-control form-control-lg"
                  onChange={e => (this.selger = event.target.value)}
                >
                  <option value="" defaultValue>
                    Filtrer med ansatt
                  </option>
                  {this.selgere.map(selgere => (
                    <option value={selgere.id} key={selgere.id}>
                      {selgere.fornavn} {selgere.etternavn}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <button type="submit" class="btn btn-sucess">
                Søk
              </button>
              <button type="button" class="btn btn-sucess" onClick={this.nullstill2}>
                Nullstill
              </button>
            </form>
          </div>
          <br />
          <br />
          <div>
            <table id="customers" align="center">
              <tbody>{this.tabell2}</tbody>
            </table>
            <div class="gevinstDiver">
              Totalgevinst i perioden for {this.ansattFornavnArray[0]} {this.ansattEtternavnArray[0]}:{' '}
              <b>
                <u>{this.ansatteGevinstArray[0]}</u>
              </b>
            </div>
            <br />
          </div>
        </div>
      </div>
    );
  }
  mounted() {
    bestillingService.hentTotalRapport(rapport => {
      this.totalRapport = rapport;
      this.createTable1();
    });

    bestillingService.hentAnsatteRapport(rapport => {
      this.ansatteRapport = rapport;
      this.createTable2();
    });

    ansatteService.getSelgere(selgere => {
      this.selgere = selgere;
    });
  }

  return() {
    history.push('/sekretærStartside/' + this.props.match.params.ansattId);
  }

  loggUtPush() {
    history.push('/');
  }

  toggleFiltrer() {
    var x = document.getElementById('filtrerRapportTotalDiv');
    if (window.getComputedStyle(x).display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  toggleFiltrer2() {
    var x = document.getElementById('filtrerRapportAnsatteDiv');
    if (window.getComputedStyle(x).display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  sok(e) {
    e.preventDefault();
    bestillingService.sok3(this.utlevering_dato, this.faktiskInnlevering_dato, sok => {
      this.totalRapport = sok;
      this.createTable1();
    });
  }

  sok2(e) {
    e.preventDefault();
    bestillingService.sok4(this.utlevering_dato2, this.faktiskInnlevering_dato2, this.selger, sok => {
      this.ansatteRapport = sok;
      this.createTable2();

      ansatteService.getSelger(this.selger, finnNavn => {
        this.selgerNavn = finnNavn;
        this.ansattFornavnArray.pop();
        this.ansattFornavnArray.push(this.selgerNavn[0].fornavn);

        this.ansattEtternavnArray.pop();
        this.ansattEtternavnArray.push(this.selgerNavn[0].etternavn);
      });
    });
  }

  nullstill() {
    this.utlevering_dato = '';
    this.faktiskInnlevering_dato = '';

    document.getElementById('utlevering_dato').value = '';
    document.getElementById('faktiskInnlevering_dato').value = '';

    bestillingService.hentTotalRapport(rapport => {
      this.totalRapport = rapport;
      this.createTable1();
    });
  }

  nullstill2() {
    this.utlevering_dato2 = '';
    this.faktiskInnlevering_dato2 = '';

    document.getElementById('utlevering_dato2').value = '';
    document.getElementById('faktiskInnlevering_dato2').value = '';
    document.getElementById('ansattInput').value = '';

    bestillingService.hentAnsatteRapport(rapport => {
      this.ansatteRapport = rapport;
      this.createTable2();
    });

    this.ansattFornavnArray[0] = '';
    this.ansattEtternavnArray[0] = '';
  }

  createTable1() {
    this.tabell1 = '';
    this.tabell1 = [];

    this.tabell1.push(
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

    for (let i = 0; i < this.totalRapport.length; i++) {
      this.tabell1.push(
        <tr>
          <td>{this.totalRapport[i].id}</td>
          <td>{this.totalRapport[i].bestilling_type}</td>
          <td>
            {this.totalRapport[i].utlevering_dato} {this.totalRapport[i].utlevering_tid}
          </td>
          <td>
            {this.totalRapport[i].faktiskInnlevering_dato} {this.totalRapport[i].faktiskInnlevering_tid}
          </td>
          <td>{this.totalRapport[i].epost}</td>
          <td>
            {this.totalRapport[i].fornavn} {this.totalRapport[i].etternavn}
          </td>
          <td>{this.totalRapport[i].gevinst},-</td>
        </tr>
      );
      let tall = Number(this.totalRapport[i].gevinst);
      this.totalGevinst = Number(this.totalGevinst) + tall;
    }
    this.totalGevinstArray.pop();
    this.totalGevinstArray.push(this.totalGevinst);
    this.totalGevinst = 0;
  }

  createTable2() {
    this.tabell2 = '';
    this.tabell2 = [];

    this.tabell2.push(
      <tr>
        <th>Id</th>
        <th>Bestillingstype</th>
        <th>Utleveringstid</th>
        <th>Innleveringstid</th>
        <th>Kundens epost</th>
        <th>Ansattes navn</th>
        <th>Ansattes telefon</th>
        <th>Inntekt for bestillinga</th>
      </tr>
    );

    for (let i = 0; i < this.ansatteRapport.length; i++) {
      this.tabell2.push(
        <tr>
          <td>{this.ansatteRapport[i].id}</td>
          <td>{this.ansatteRapport[i].bestilling_type}</td>
          <td>
            {this.ansatteRapport[i].utlevering_dato} {this.ansatteRapport[i].utlevering_tid}
          </td>
          <td>
            {this.ansatteRapport[i].faktiskInnlevering_dato} {this.ansatteRapport[i].faktiskInnlevering_tid}
          </td>
          <td>{this.ansatteRapport[i].epost}</td>
          <td>
            {this.ansatteRapport[i].fornavn} {this.ansatteRapport[i].etternavn}
          </td>
          <td>{this.ansatteRapport[i].telefon}</td>
          <td>{this.ansatteRapport[i].gevinst},-</td>
        </tr>
      );
      let tall = Number(this.ansatteRapport[i].gevinst);
      this.ansatteGevinst = Number(this.ansatteGevinst) + tall;
    }
    this.ansatteGevinstArray.pop();
    this.ansatteGevinstArray.push(this.ansatteGevinst);
    this.ansatteGevinst = 0;
  }
}
