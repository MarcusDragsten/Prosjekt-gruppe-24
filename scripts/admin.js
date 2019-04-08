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
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.loggUtPush}>
            Logg ut
          </button>
        </div>
        <div id="adminStartsideKnapperDiv">
          <h2>
            Velkommen til adminsiden: {this.ansatt.fornavn} {this.ansatt.etternavn}
          </h2>
          <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.ansattePush}>
            Administere ansatte
          </button>
          <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.lokasjonPush}>
            Administere lokasjoner
          </button>
          <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.rapportPush}>
            Se rapporter
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
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.loggUtPush}>
            Logg ut
          </button>
        </div>
        <button type="button" class="btn" id="tilbake" onClick={this.return}>
          Tilbake
        </button>
        <div id="ansatteDiv">
          <h1>Ansatte</h1>
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
            Legg til
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
        <p>Lokasjons ID: {this.ansatte.lokasjon_id}</p>
        <p>Rolle: {this.ansatte.rolle}</p>
        <button type="button" class="btn" onClick={this.edit}>
          Endre
        </button>
        <button type="button" class="btn" onClick={this.delete}>
          Slett
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
    history.push('/ansatteEdit/' + +this.props.match.params.ansattId + '/' + this.ansatte.id);
  }

  delete() {
    ansatteService.deleteAnsatte(this.props.match.params.ansatteListe, () =>
      history.push('/ansatteAdmin/' + this.props.match.params.ansattId)
    );
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

  render() {
    return (
      <div>
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.loggUtPush}>
            Logg ut
          </button>
        </div>
        <button type="Add" class="btn" id="tilbake" onClick={this.return}>
          Tilbake
        </button>
        <div id="nyAnsattDiv">
          <h1>Legg til ny ansatt</h1>
          <hr />
          <h3>Fornavn</h3>
          <form onSubmit={this.add}>
            <input
              type="text"
              class="form-control"
              id="nyAnsattFornavnInput"
              value={this.fornavn}
              onChange={e => (this.fornavn = e.target.value)}
              required
            />
            <h3>Etternavn</h3>
            <input
              type="text"
              class="form-control"
              id="nyAnsattEtternavnInput"
              value={this.etternavn}
              onChange={e => (this.etternavn = e.target.value)}
              required
            />
            <h3>Brukernavn</h3>
            <input
              type="text"
              class="form-control"
              id="nyAnsattBrukernavnInput"
              value={this.brukernavn}
              onChange={e => (this.brukernavn = e.target.value)}
              required
            />
            <h3>Passord</h3>
            <input
              type="text"
              class="form-control"
              id="nyAnsattPassordInput"
              value={this.passord}
              onChange={e => (this.passord = e.target.value)}
              required
            />
            <h3>Epost</h3>
            <input
              type="text"
              class="form-control"
              id="nyAnsattEpostInput"
              value={this.epost}
              onChange={e => (this.epost = e.target.value)}
              required
            />
            <h3>Telefonnummer</h3>
            <input
              type="text"
              class="form-control"
              id="nyAnsattTlfInput"
              value={this.telefon}
              onChange={e => (this.telefon = e.target.value)}
              required
            />
            <h3>ID for lokasjon</h3>
            <input
              type="text"
              class="form-control"
              id="nyAnsattLokasjonInput"
              value={this.lokasjon_id}
              onChange={e => (this.lokasjon_id = e.target.value)}
              required
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
        <button type="Add" class="btn" id="tilbake" onClick={this.return}>
          Tilbake
        </button>
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
    ansatteService.getAnsatt(this.props.match.params.edit, ansatte => {
      this.ansatte = ansatte;
      console.log(this.ansatte);
    });
  }

  loggUtPush() {
    history.push('/');
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
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.loggUtPush}>
            Logg ut
          </button>
        </div>
        <button type="button" class="btn" id="tilbake" onClick={this.return}>
          Tilbake
        </button>
        <div id="lokasjonerDiv">
          <h1>Lokasjonssiden</h1>
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
            Legg til
          </button>
        </div>
        <br />
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
    ansatteService.deleteLokasjon(this.props.match.params.lokasjonListe, () =>
      history.push('/lokasjoner/' + this.props.match.params.ansattId)
    );
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
        <button type="button" class="btn" id="tilbake" onClick={this.return}>
          Tilbake
        </button>
        <div id="nyLokasjonDiv">
          <h1>Legg til ny lokasjon</h1>
          <hr />
          <h3>Adresse</h3>
          <form onSubmit={this.add}>
            <input
              type="text"
              class="form-control"
              id="nyAnsattFornavnInput"
              value={this.adresse}
              onChange={e => (this.adresse = e.target.value)}
              required
            />
            <h3>Postkode</h3>
            <input
              type="text"
              class="form-control"
              id="nyAnsattEtternavnInput"
              value={this.postkode}
              onChange={e => (this.postkode = e.target.value)}
              required
            />
            <h3>Område</h3>
            <input
              type="text"
              class="form-control"
              id="nyAnsattBrukernavnInput"
              value={this.område}
              onChange={e => (this.område = e.target.value)}
              required
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
        <button type="button" id="tilbake" class="btn" onClick={this.return}>
          Tilbake
        </button>
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
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.loggUtPush}>
            Logg ut
          </button>
          <button type="button" id="tilbake" class="btn" onClick={this.return}>
            Tilbake
          </button>
        </div>
        <h1>Rapportsiden</h1>
        <hr />
        <div id="rapportTotalTabellDiv">
          <h2>Rapport over alle inntekter</h2>
          <button type="button" id="toggleFiltrerKnapp" class="btn" onClick={this.toggleFiltrer}>
            Filtrer bestillingene?
          </button>
          <div id="filtrerRapportTotalDiv">
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
          <h2>Rapport over alle inntekter per ansatt</h2>
          <button type="button" id="toggleFiltrerKnapp" class="btn" onClick={this.toggleFiltrer2}>
            Filtrer bestillingene?
          </button>
          <div id="filtrerRapportAnsatteDiv">
            <form onSubmit={this.sok2}>
              <div class="form-inline">
                <h3>Filtrer rapporten:</h3>
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
                  class="form-control form-control-lg"
                  onChange={e => (this.selger = event.target.value)}
                >
                  <option value="" selected>
                    Filtrer med ansatt
                  </option>
                  {this.selgere.map(selgere => (
                    <option value={selgere.id} key={selgere.id}>
                      {selgere.fornavn} {selgere.etternavn}
                    </option>
                  ))}
                </select>
              </div>
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
      console.log(this.selgere);
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
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.loggUtPush}>
            Logg ut
          </button>
        </div>
        <div id="adminStartsideKnapperDiv">
          <h2>
            Velkommen til sekretærsiden: {this.ansatt.fornavn} {this.ansatt.etternavn}
          </h2>
          <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.ansattePush}>
            Se oversikt over ansatte
          </button>
          <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.lokasjonPush}>
            Se oversikt over lokasjoner
          </button>
          <button type="button" class="btn btn-sucess btn-lg btn-block" onClick={this.rapportPush}>
            Se rapporter
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
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.loggUtPush}>
            Logg ut
          </button>
        </div>
        <button type="button" class="btn" onClick={this.return}>
          Tilbake
        </button>
        <div id="ansatteDiv">
          <h1>Ansatte</h1>
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
      console.log(this.ansatte);
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
        <p>Lokasjons ID: {this.ansatte.lokasjon_id}</p>
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
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.loggUtPush}>
            Logg ut
          </button>
        </div>
        <button type="button" class="btn" onClick={this.return}>
          Tilbake
        </button>
        <div id="lokasjonerDiv">
          <h1>Lokasjonssiden</h1>
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
        <div class="header w3-container w3-green">
          <h1>Book & Bike</h1>
          <button type="button" id="loggUtKnapp" onClick={this.loggUtPush}>
            Logg ut
          </button>
          <button type="button" id="tilbake" class="btn" onClick={this.return}>
            Tilbake
          </button>
        </div>
        <h1>Rapportsiden</h1>
        <hr />
        <div id="rapportTotalTabellDiv">
          <h2>Rapport over alle inntekter</h2>
          <button type="button" id="toggleFiltrerKnapp" class="btn" onClick={this.toggleFiltrer}>
            Filtrer bestillingene?
          </button>
          <div id="filtrerRapportTotalDiv">
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
          <h2>Rapport over alle inntekter per ansatt</h2>
          <button type="button" id="toggleFiltrerKnapp" class="btn" onClick={this.toggleFiltrer2}>
            Filtrer bestillingene?
          </button>
          <div id="filtrerRapportAnsatteDiv">
            <form onSubmit={this.sok2}>
              <div class="form-inline">
                <h3>Filtrer rapporten:</h3>
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
                  class="form-control form-control-lg"
                  onChange={e => (this.selger = event.target.value)}
                >
                  <option value="" selected>
                    Filtrer med ansatt
                  </option>
                  {this.selgere.map(selgere => (
                    <option value={selgere.id} key={selgere.id}>
                      {selgere.fornavn} {selgere.etternavn}
                    </option>
                  ))}
                </select>
              </div>
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
      console.log(this.selgere);
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
