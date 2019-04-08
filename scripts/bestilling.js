import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { bestillingService } from '../services/bestillingService.js';
import { sykkelService } from '../services/sykkelService.js';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

export class Bestilling extends Component {
  bestilling_type = 'Velg bestillingstype';
  kunde_epost = '';
  utleveringssted = 'Velg utleveringssted';
  innleveringssted = 'Velg innleveringssted';
  utlevering_dato = '';
  utlevering_tid = '';
  innlevering_dato = '';
  innlevering_tid = '';

  utleveringssteder = [];
  innleveringssteder = [];

  dateNow = '';
  timeNow = '';

  id = [];
  epostValideringArray = [];

  sykler = [];
  syklerLedig = [];

  herre = 0;
  dame = 0;
  herreBagasje = 0;
  dameBagasje = 0;
  barn = 0;
  junior = 0;
  terreng = 0;
  elSykkel = 0;
  racer = 0;

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

  utstyr = [];
  utstyrLedig = [];

  barnesete = 0;
  hjelmBarn = 0;
  hjelmVoksne = 0;
  sykkelkurv = 0;
  sykkellås = 0;
  sykkelstativ = 0;
  sykkelvogn = 0;

  info = [];
  alternativInfo1 = '';
  alternativInfo2 = '';
  sykkelOversikt = [];
  utstyrOversikt = [];
  tabell1 = [];
  tabell2 = [];

  innlagteSykler = 0;

  kundeInfo = '';
  godKunde = [];

  sumSykler = 0;
  sumUtstyr = 0;
  sumTotalt = 0;

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Bestillingsiden</h1>
        </div>
        <div id="nyBestilling" class="form-group">
          <h1>Fyll inn bestillingskjema for kunden</h1>
          <hr />
          <div id="nyKundeTekst">
            <label for="nyKundeKnapp">Er det en ny kunde?</label>{' '}
            <button type="button" class="btn" id="nyKundeKnapp" onClick={this.nyKundePush}>
              Klikk her
            </button>
          </div>
          <form onSubmit={this.wrapper1}>
            <h3>Bestillingstype:</h3>
            <select
              class="form-control"
              id="bestilling_typeInput"
              value={this.bestilling_type}
              onChange={e => (this.bestilling_type = event.target.value)}
              required
            >
              <option value="" selected hidden>
                Velg bestillingstype
              </option>
              <option value="Timeutleie">Timeutleie</option>
              <option value="Dagsutleie">Dagsutleie</option>
              <option value="Helgeutleie">Helgeutleie</option>
            </select>
            <h3>Utleveringssted:</h3>
            <select
              class="form-control"
              id="utleveringsstedInput"
              value={this.utleveringssted}
              onChange={e => (this.utleveringssted = event.target.value)}
              required
            >
              <option value="" selected hidden>
                Velg utleveringssted
              </option>
              {this.utleveringssteder.map(utleveringssteder => (
                <option key={utleveringssteder.id}>{utleveringssteder.område}</option>
              ))}
            </select>
            <h3>Innleveringssted:</h3>
            <select
              class="form-control"
              id="innleveringsstedInput"
              value={this.innleveringssted}
              onChange={e => (this.innleveringssted = event.target.value)}
              required
            >
              <option value="" selected hidden>
                Velg innleveringssted
              </option>
              {this.innleveringssteder.map(innleveringssteder => (
                <option key={innleveringssteder.id}>{innleveringssteder.område}</option>
              ))}
            </select>
            <h3>Utleveringstid:</h3>
            <div class="form-inline">
              <input
                class="form-control"
                id="utlevering_datoInput"
                type="date"
                min={this.dateNow}
                onChange={e => (this.utlevering_dato = event.target.value)}
                required
              />
              <input
                class="form-control"
                id="utlevering_tidInput"
                type="time"
                min="08:00"
                max="19:00"
                onChange={e => (this.utlevering_tid = event.target.value)}
                required
              />
            </div>
            <h3>Innleveringstid:</h3>
            <div class="form-inline">
              <input
                class="form-control"
                id="innlevering_datoInput"
                type="date"
                min={this.utlevering_dato}
                onChange={e => (this.innlevering_dato = event.target.value)}
                required
              />
              <input
                class="form-control"
                id="innlevering_tidInput"
                type="time"
                min={this.utlevering_tid}
                max="19:00"
                onChange={e => (this.innlevering_tid = event.target.value)}
                required
              />
            </div>
            <h3>En eksisterende kundes epost:</h3>
            <input
              class="form-control"
              id="kunde_epostInput"
              type="text"
              placeholder="Kundens epost"
              onChange={e => {
                this.kunde_epost = event.target.value;
                this.epostValidering(e);
              }}
              required
            />
            <br />
            <button type="submit" class="btn" id="velgUtstyrKnapp">
              Gå videre
            </button>
            <button type="button" id="avbrytBestilling" class="btn" onClick={this.return}>
              Avbryt Bestilling
            </button>
          </form>
        </div>
        <div id="velgSykkel">
          <h1>Velg hvor mange sykler kunden vil ha:</h1>
          <i>
            <p>
              Velg ønsket antall sykler per type som kunden ønsker. Deretter klikk "Legg inn sykler i bestilling".
              Deretter gå videre til valg av utstyr
            </p>
          </i>
          <div id="syklerDiv">
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
              <img src="../bilder/sykkel-herre.jpeg" alt="Hybridsykkel Herre m/Bagasjebrett" />
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
              <img src="../bilder/sykkel-dame.jpeg" alt="Hybridsykkel Dame m/Bagasjebrett" />
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
          </div>
          <button type="button" id="leggInnSyklerKnapp" class="btn" onClick={this.leggInnValgteSykler}>
            Legg inn sykler i bestillingen
          </button>
          <button type="button" id="fjernSyklerKnapp" class="btn" onClick={this.fjernSyklerFraBestilling}>
            Fjern sykler som er lagt inn i bestillingen
          </button>
          <br />
          <button type="button" id="hentOversiktKnapp" class="btn" onClick={this.hentSyklerOversikt}>
            Gå videre
          </button>
          <button type="button" id="avbrytBestillingSykkel" class="btn" onClick={this.avbrytBestillingSykkel}>
            Avbryt bestilling
          </button>
        </div>
        <div id="velgUtstyr">
          <h1>Velg Utstyr</h1>
          <div id="utstyrDiv">
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
          <button type="button" class="btn" onClick={this.wrapper3}>
            Legg inn utstyr
          </button>
          <button type="button" class="btn" onClick={this.fjernUtstyrFraBestilling}>
            Fjern utstyr som er lagt inn i bestillingen
          </button>
          <br />
          <button type="button" class="btn" id="lagOversiktKnapp" onClick={this.lagOversikt}>
            Gå videre
          </button>
          <button type="button" id="avbrytBestillingUtstyr" class="btn" onClick={this.avbrytBestillingUtstyr}>
            Avbryt Bestilling
          </button>
        </div>
        <div id="bestillingOversikt">
          <h1>Bestillingoversikt</h1>
          <hr />
          <div id="bestillingInfoDiv">{this.info[0]}</div>
          <hr />
          <h3>Sykler i bestillingen:</h3>
          <table id="customers" align="center">
            <tbody>{this.tabell1}</tbody>
          </table>
          <p>{this.alternativInfo1}</p>
          <p>
            Sum å betale for sykler: <u>{this.sumSykler}</u>
          </p>
          <hr />
          <h3>Utstyr i bestillingen:</h3>
          <table id="customers" align="center">
            <tbody>{this.tabell2}</tbody>
          </table>
          <p>{this.alternativInfo2}</p>
          <p>
            Sum å betale for utstyr: <u>{this.sumUtstyr}</u>
          </p>
          <hr />
          <br />
          <p>
            En bestillingsbekreftelse er sendt til: <b>{this.kunde_epost}</b>
          </p>
          <p>
            Sum totalt for orderen:{' '}
            <b>
              <u>{this.sumTotalt}</u>
            </b>
          </p>
          <button type="button" class="btn" onClick={this.return}>
            Tilbake til startsiden
          </button>
          <br />
          <br />
        </div>
      </div>
    );
  }

  mounted() {
    document.getElementById('leggInnSyklerKnapp').disabled = true;
    document.getElementById('fjernSyklerKnapp').disabled = true;
    document.getElementById('hentOversiktKnapp').disabled = true;

    bestillingService.hentUtleveringsted(utleveringssteder => {
      this.utleveringssteder = utleveringssteder;
    });

    bestillingService.hentInnleveringsted(innleveringssteder => {
      this.innleveringssteder = innleveringssteder;
    });

    sykkelService.hentSykler(sykler => {
      this.sykler = sykler;
    });

    sykkelService.hvorMangeSyklerLedig(syklerLedig => {
      this.syklerLedig = syklerLedig;
      console.log(this.syklerLedig);
    });

    sykkelService.hentUtstyr(utstyr => {
      this.utstyr = utstyr;
    });

    sykkelService.hvorMyeUtstyrLedig(utstyrLedig => {
      this.utstyrLedig = utstyrLedig;
      console.log(this.utstyrLedig);
    });

    bestillingService.epostValidering(kunde_epost => {
      this.epostValideringArray = kunde_epost;
      console.log(this.epostValideringArray);
    });

    this.dagensDato();
  }

  nyKundePush() {
    history.push('/nyKunde/' + this.props.match.params.ansattId);
    // Pusher til et form som skal legge til en ny kunde
  }

  loggUtPush() {
    history.push('/');
  }

  return() {
    history.push('/salgStartside/' + this.props.match.params.ansattId);
  }

  avbrytBestilling() {
    history.push('/salgStartside/' + this.props.match.params.ansattId);
  }

  avbrytBestillingSykkel() {
    bestillingService.avbrytBestillingSykkel(this.id[0].lastInsertId, id => {
      bestillingService.avbrytBestilling(this.id[0].lastInsertId, id => {
        history.push('/salgStartside/' + this.props.match.params.ansattId);
      });
    });
  }
  avbrytBestillingUtstyr() {
    bestillingService.avbrytBestillingUtstyr(this.id[0].lastInsertId, id => {
      bestillingService.avbrytBestillingSykkel(this.id[0].lastInsertId, id => {
        bestillingService.avbrytBestilling(this.id[0].lastInsertId, id => {
          history.push('/salgStartside/' + this.props.match.params.ansattId);
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

    this.dateNow = yyyy + '-' + mm + '-' + dd;

    this.timeNow = hh + '.' + min;

    console.log(this.dateNow);
    console.log(this.timeNow);
  }

  epostValidering() {
    for (let i = 0; i < this.epostValideringArray.length; i++) {
      if (this.kunde_epost == this.epostValideringArray[i].epost) {
        document.getElementById('kunde_epostInput').style.backgroundColor = 'green';
        document.getElementById('kunde_epostInput').style.color = 'white';
        document.getElementById('velgUtstyrKnapp').disabled = false;
        break;
      } else {
        document.getElementById('kunde_epostInput').style.backgroundColor = 'red';
        document.getElementById('kunde_epostInput').style.color = 'white';
        document.getElementById('velgUtstyrKnapp').disabled = true;
      }
    }
  }

  leggInnBestilling() {
    bestillingService.leggInnBestilling(
      this.bestilling_type,
      this.kunde_epost,
      this.utleveringssted,
      this.innleveringssted,
      this.utlevering_dato,
      this.utlevering_tid,
      this.innlevering_dato,
      this.innlevering_tid,
      this.props.match.params.ansattId,
      id => {
        console.log(this.utlevering_dato);
      }
    );
  }

  hentBestillingId() {
    bestillingService.hentBestillingId(id => {
      this.id = id;
      console.log(this.id);
      document.getElementById('leggInnSyklerKnapp').disabled = false;
    });
  }

  visSykkel() {
    var x = document.getElementById('velgSykkel');
    if (window.getComputedStyle(x).display === 'none') {
      x.style.display = 'block';
    }
    document.getElementById('nyBestilling').style.display = 'none';
  }

  visUtstyr() {
    var y = document.getElementById('velgUtstyr');
    if (window.getComputedStyle(y).display === 'none') {
      y.style.display = 'block';
    }
    document.getElementById('velgSykkel').style.display = 'none';
  }

  visOrdreOversikt() {
    var z = document.getElementById('bestillingOversikt');
    if (window.getComputedStyle(z).display === 'none') {
      z.style.display = 'block';
    }
    document.getElementById('velgUtstyr').style.display = 'none';
  }

  leggInnValgteSykler() {
    if (this.herre > 0) {
      if (this.syklerLedig[4].ant_ledige > this.herre) {
        sykkelService.leggInnSykler(this.id[0].lastInsertId, 'Hybrid Herre', this.herre, herre => {
          sykkelService.hvorMangeSyklerValgt(this.id[0].lastInsertId, 'Hybrid Herre', herreValgt => {
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
        sykkelService.leggInnSykler(this.id[0].lastInsertId, 'Hybrid Dame', this.dame, dame => {
          sykkelService.hvorMangeSyklerValgt(this.id[0].lastInsertId, 'Hybrid Dame', dameValgt => {
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
          this.id[0].lastInsertId,
          'Hybrid Herre m/bagasjebrett',
          this.herreBagasje,
          herreBagasje => {
            sykkelService.hvorMangeSyklerValgt(
              this.id[0].lastInsertId,
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
          this.id[0].lastInsertId,
          'Hybrid Dame m/bagasjebrett',
          this.dameBagasje,
          dameBagasje => {
            sykkelService.hvorMangeSyklerValgt(
              this.id[0].lastInsertId,
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
        sykkelService.leggInnSykler(this.id[0].lastInsertId, 'Barnesykkel', this.barn, barn => {
          sykkelService.hvorMangeSyklerValgt(this.id[0].lastInsertId, 'Barnesykkel', barnValgt => {
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
        sykkelService.leggInnSykler(this.id[0].lastInsertId, 'Juniorsykkel', this.junior, junior => {
          sykkelService.hvorMangeSyklerValgt(this.id[0].lastInsertId, 'Juniorsykkel', juniorValgt => {
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
        sykkelService.leggInnSykler(this.id[0].lastInsertId, 'Terrengsykkel', this.terreng, terreng => {
          sykkelService.hvorMangeSyklerValgt(this.id[0].lastInsertId, 'Terrengsykkel', terrengValgt => {
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
        sykkelService.leggInnSykler(this.id[0].lastInsertId, 'El-sykkel', this.elSykkel, elSykkel => {
          sykkelService.hvorMangeSyklerValgt(this.id[0].lastInsertId, 'El-sykkel', elSykkelValgt => {
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
        sykkelService.leggInnSykler(this.id[0].lastInsertId, 'Landeveissykkel', this.racer, racer => {
          sykkelService.hvorMangeSyklerValgt(this.id[0].lastInsertId, 'Landeveissykkel', racerValgt => {
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

    document.getElementById('hentOversiktKnapp').disabled = false;
    document.getElementById('fjernSyklerKnapp').disabled = false;
  }

  fjernSyklerFraBestilling() {
    sykkelService.fjernSyklerFraBestilling(this.id[0].lastInsertId, fjernSykler => {
      document.getElementById('hentOversiktKnapp').disabled = true;
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

  leggInnValgtUtstyr() {
    if (this.barnesete > 0) {
      if (this.utstyrLedig[0].ant_ledige > this.barnesete) {
        sykkelService.leggInnUtstyr(this.id[0].lastInsertId, 'Barnesete', this.barnesete, barnesete => {
          sykkelService.hvorMangeUtstyrValgt(this.id[0].lastInsertId, 'Barnesete', barneseteValgt => {
            let tall = barneseteValgt;
            console.log(tall);
            this.antallValgteBarnesete = tall[0].hvorMangeValgt;
            console.log(tall[0].hvorMangeValgt);
            this.antallValgteBarneseteArray.pop();
            this.antallValgteBarneseteArray.push(this.antallValgteBarnesete);
            console.log(this.antallValgteBarneseteArray[0]);
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
        sykkelService.leggInnUtstyr(this.id[0].lastInsertId, 'Hjelm barn', this.hjelmBarn, hjelmBarn => {
          sykkelService.hvorMangeUtstyrValgt(this.id[0].lastInsertId, 'Hjelm barn', hjelmBarnValgt => {
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
        sykkelService.leggInnUtstyr(this.id[0].lastInsertId, 'Hjelm voksne', this.hjelmVoksne, hjelmVoksne => {
          sykkelService.hvorMangeUtstyrValgt(this.id[0].lastInsertId, 'Hjelm voksne', hjelmVoksneValgt => {
            let tall = hjelmVoksneValgt;
            this.antallValgteHjelmVoksne = tall[0].hvorMangeValgt;
            this.antallValgteHjelmVoksneArray.pop();
            this.antallValgteHjelmVoksneArray.push(this.antallValgteHjelmVoksne);
          });
        });
      } else {
        alert(
          'Vi har ikke nok hjelmer for voksne på lager for øyeblikket. Lagerstatus er ' +
            (Number(this.utstyrLedig[2].ant_ledige) - 1)
        );
      }
    }

    if (this.sykkelkurv > 0) {
      if (this.utstyrLedig[3].ant_ledige > this.sykkelkurv) {
        sykkelService.leggInnUtstyr(this.id[0].lastInsertId, 'Sykkelkurv', this.sykkelkurv, sykkelkurv => {
          sykkelService.hvorMangeUtstyrValgt(this.id[0].lastInsertId, 'Sykkelkurv', sykkelkurvValgt => {
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
        sykkelService.leggInnUtstyr(this.id[0].lastInsertId, 'Sykkellås', this.sykkellås, sykkellås => {
          sykkelService.hvorMangeUtstyrValgt(this.id[0].lastInsertId, 'Sykkellås', sykkellåsValgt => {
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
        sykkelService.leggInnUtstyr(this.id[0].lastInsertId, 'Sykkelstativ', this.sykkelstativ, sykkelstativ => {
          sykkelService.hvorMangeUtstyrValgt(this.id[0].lastInsertId, 'Sykkelstativ', sykkelstativValgt => {
            let tall = sykkelstativValgt;
            this.antallValgteSykkelstativ = tall[0].hvorMangeValgt;
            this.antallValgteSykkelstativArray.pop();
            this.antallValgteSykkelstativArray.push(this.antallValgteSykkelstativ);
          });
        });
      } else {
        alert(
          'Vi har ikke nok sykkelstativ på lager for øyeblikket. Lagerstatus er ' +
            (Number(this.utstyrLedig[5].ant_ledige) - 1)
        );
      }
    }

    if (this.sykkelvogn > 0) {
      if (this.utstyrLedig[6].ant_ledige > this.sykkelvogn) {
        sykkelService.leggInnUtstyr(this.id[0].lastInsertId, 'Sykkelvogn', this.sykkelvogn, sykkelvogn => {
          sykkelService.hvorMangeUtstyrValgt(this.id[0].lastInsertId, 'Sykkelvogn', sykkelvognValgt => {
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
      console.log(this.utstyrLedig);
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

  fjernUtstyrFraBestilling() {
    sykkelService.fjernUtstyrFraBestilling(this.id[0].lastInsertId, fjernUtstyr => {
      sykkelService.hvorMyeUtstyrLedig(utstyrLedig => {
        this.utstyrLedig = utstyrLedig;
        this.antallValgteBarneseteArray[0] = '';
        this.antallValgteHjelmBarnArray[0] = '';
        this.antallValgteHjelmVoksneArray[0] = '';
        this.antallValgteSykkelkurvArray[0] = '';
        this.antallValgteSykkellåsArray[0] = '';
        this.antallValgteSykkelstativArray[0] = '';
        this.antallValgteSykkelvognArray[0] = '';
        console.log(this.utstyrLedig);
      });
    });
  }

  hentSyklerOversikt() {
    sykkelService.hentSyklerOversikt(this.id[0].lastInsertId, sykkelOversikt => {
      this.sykkelOversikt = sykkelOversikt;
      this.visUtstyr();
      console.log(this.sykkelOversikt);
    });
  }

  hentGodeKunder() {
    sykkelService.hentGodeKunder(this.kunde_epost, godKunde => {
      this.godKunde = godKunde;
      console.log(this.godKunde);
    });
  }

  lagSykkelOversikt() {
    let date1 = new Date(this.utlevering_dato + ' ' + this.utlevering_tid);
    let date2 = new Date(this.innlevering_dato + ' ' + this.innlevering_tid);

    let timer = Math.abs(Math.round((date2 - date1) / 36e5));

    let dager = Math.abs(Math.round((date2 - date1) / 36e5) / 12);

    if (this.sykkelOversikt.length == 0) {
      this.alternativInfo1 = 'Du har ikke lagt inn noen sykler i bestillingen';
    } else {
      this.tabell1.push(
        <tr>
          <th>Modell</th>
          <th>
            Pris for <i>{this.sykkelOversikt[0].bestilling_type}</i>
          </th>
          <th>Eventuell rabatt</th>
        </tr>
      );

      if (this.sykkelOversikt[0].bestilling_type == 'Timeutleie') {
        if (this.innlagteSykler >= 5 && this.godKunde[0].god_kunde >= 5) {
          for (let i = 0; i < this.sykkelOversikt.length; i++) {
            this.tabell1.push(
              <tr>
                <td>{this.sykkelOversikt[i].modellnavn}</td>
                <td>{this.sykkelOversikt[i].timepris * timer * 0.8},-</td>
                <td>Du sparer: {this.sykkelOversikt[i].timepris * timer * 0.2},-</td>
              </tr>
            );
            let tall = this.sykkelOversikt[i].timepris * timer * 0.8;

            this.sumSykler = this.sumSykler + tall;
          }
          this.kundeInfo =
            'Du har vært kunde hos oss lenge og har lagt inn ' +
            this.godKunde[0].god_kunde +
            ' bestillinger. I tillegg har du lagt inn en ordre med ' +
            this.innlagteSykler +
            ' sykler. Derfor fortjener du en heftig rabatt på 20%!';
        } else if (this.innlagteSykler >= 5) {
          for (let i = 0; i < this.sykkelOversikt.length; i++) {
            this.tabell1.push(
              <tr>
                <td>{this.sykkelOversikt[i].modellnavn}</td>
                <td>{this.sykkelOversikt[i].timepris * timer * 0.9},-</td>
                <td>Du sparer: {this.sykkelOversikt[i].timepris * timer * 0.1},-</td>
              </tr>
            );
            let tall = this.sykkelOversikt[i].timepris * timer * 0.9;

            this.sumSykler = this.sumSykler + tall;
          }
          this.kundeInfo =
            'Du har lagt inn en ordre med ' +
            this.innlagteSykler +
            ' sykler. Dette regnes som en gruppebestilling, og derfor fortjener du en rabatt på 10%.';
        } else if (this.godKunde[0].god_kunde >= 5) {
          for (let i = 0; i < this.sykkelOversikt.length; i++) {
            this.tabell1.push(
              <tr>
                <td>{this.sykkelOversikt[i].modellnavn}</td>
                <td>{this.sykkelOversikt[i].timepris * timer * 0.9},-</td>
                <td>Du sparer: {this.sykkelOversikt[i].timepris * timer * 0.1},-</td>
              </tr>
            );
            let tall = this.sykkelOversikt[i].timepris * timer * 0.9;

            this.sumSykler = this.sumSykler + tall;
          }
          this.kundeInfo =
            'Du har vært kunde hos oss lenge og lagt inn ' +
            this.godKunde[0].god_kunde +
            ' bestillinger. Derfor fortjenter du 10% rabatt.';
        } else {
          for (let i = 0; i < this.sykkelOversikt.length; i++) {
            this.tabell1.push(
              <tr>
                <td>{this.sykkelOversikt[i].modellnavn}</td>
                <td>{this.sykkelOversikt[i].timepris * timer},-</td>
                <td>Ingen rabatt</td>
              </tr>
            );
            let tall = this.sykkelOversikt[i].timepris * timer;

            this.sumSykler = this.sumSykler + tall;
          }
          this.kundeInfo = 'Ingen øvrige rabatter gjelder din ordre.';
        }
      } else if (this.sykkelOversikt[0].bestilling_type == 'Dagsutleie') {
        if (this.innlagteSykler >= 5 && this.godKunde[0].god_kunde >= 5) {
          for (let i = 0; i < this.sykkelOversikt.length; i++) {
            this.tabell1.push(
              <tr>
                <td>{this.sykkelOversikt[i].modellnavn}</td>
                <td>{this.sykkelOversikt[i].timepris * dager * 0.75},-</td>
                <td>
                  Du sparer: {this.sykkelOversikt[i].timepris * dager * 0.2},- og{' '}
                  {this.sykkelOversikt[i].timepris * dager * 0.05},- for Dagsutleie
                </td>
              </tr>
            );
            let tall = this.sykkelOversikt[i].timepris * dager * 0.75;

            this.sumSykler = this.sumSykler + tall;
          }
          this.kundeInfo =
            'Du har vært kunde hos oss lenge og har lagt inn ' +
            this.godKunde[0].god_kunde +
            ' bestillinger. I tillegg har du lagt inn en ordre med ' +
            this.innlagteSykler +
            ' sykler. Derfor fortjener du en heftig rabatt på 20%!';
        } else if (this.innlagteSykler >= 5) {
          for (let i = 0; i < this.sykkelOversikt.length; i++) {
            this.tabell1.push(
              <tr>
                <td>{this.sykkelOversikt[i].modellnavn}</td>
                <td>{this.sykkelOversikt[i].timepris * dager * 0.85},-</td>
                <td>
                  Du sparer: {this.sykkelOversikt[i].timepris * dager * 0.1},- og{' '}
                  {this.sykkelOversikt[i].timepris * dager * 0.05},- for Dagsutleie
                </td>
              </tr>
            );
            let tall = this.sykkelOversikt[i].timepris * dager * 0.85;

            this.sumSykler = this.sumSykler + tall;
          }
          this.kundeInfo =
            'Du har lagt inn en ordre med ' +
            this.innlagteSykler +
            ' sykler. Dette regnes som en gruppebestilling, og derfor fortjener du en rabatt på 10%.';
        } else if (this.godKunde[0].god_kunde >= 5) {
          for (let i = 0; i < this.sykkelOversikt.length; i++) {
            this.tabell1.push(
              <tr>
                <td>{this.sykkelOversikt[i].modellnavn}</td>
                <td>{this.sykkelOversikt[i].timepris * dager * 0.85},-</td>
                <td>
                  Du sparer: {this.sykkelOversikt[i].timepris * dager * 0.1},- og{' '}
                  {this.sykkelOversikt[i].timepris * dager * 0.05},- for Dagsutleie
                </td>
              </tr>
            );
            let tall = this.sykkelOversikt[i].timepris * dager * 0.85;

            this.sumSykler = this.sumSykler + tall;
          }
          this.kundeInfo =
            'Du har vært kunde hos oss lenge og lagt inn ' +
            this.godKunde[0].god_kunde +
            ' bestillinger. Derfor fortjenter du 10% rabatt.';
        } else {
          for (let i = 0; i < this.sykkelOversikt.length; i++) {
            this.tabell1.push(
              <tr>
                <td>{this.sykkelOversikt[i].modellnavn}</td>
                <td>{this.sykkelOversikt[i].timepris * dager},-</td>
                <td>Du sparer: {this.sykkelOversikt[i].timepris * dager * 0.95},- for Dagsutleie</td>
              </tr>
            );
            let tall = this.sykkelOversikt[i].timepris * dager;

            this.sumSykler = this.sumSykler + tall;
          }
          this.kundeInfo = 'Ingen øvrige rabatter gjelder din ordre.';
        }
      } else if (this.sykkelOversikt[0].bestilling_type == 'Helgeutleie') {
        if (this.innlagteSykler >= 5 && this.godKunde[0].god_kunde >= 5) {
          for (let i = 0; i < this.sykkelOversikt.length; i++) {
            this.tabell1.push(
              <tr>
                <td>{this.sykkelOversikt[i].modellnavn}</td>
                <td>{this.sykkelOversikt[i].timepris * dager * 0.7},-</td>
                <td>
                  Du sparer: {this.sykkelOversikt[i].timepris * dager * 0.2},- og{' '}
                  {this.sykkelOversikt[i].timepris * dager * 0.1},- for Helgeutleie
                </td>
              </tr>
            );
            let tall = this.sykkelOversikt[i].timepris * dager * 0.7;

            this.sumSykler = this.sumSykler + tall;
          }
          this.kundeInfo =
            'Du har vært kunde hos oss lenge og har lagt inn ' +
            this.godKunde[0].god_kunde +
            ' bestillinger. I tillegg har du lagt inn en ordre med ' +
            this.innlagteSykler +
            ' sykler. Derfor fortjener du en heftig rabatt på 20%!';
        } else if (this.innlagteSykler >= 5) {
          for (let i = 0; i < this.sykkelOversikt.length; i++) {
            this.tabell1.push(
              <tr>
                <td>{this.sykkelOversikt[i].modellnavn}</td>
                <td>{this.sykkelOversikt[i].timepris * dager * 0.8},-</td>
                <td>
                  Du sparer: {this.sykkelOversikt[i].timepris * dager * 0.1},- og{' '}
                  {this.sykkelOversikt[i].timepris * dager * 0.1},- for Helgeutleie
                </td>
              </tr>
            );
            let tall = this.sykkelOversikt[i].timepris * dager * 0.8;

            this.sumSykler = this.sumSykler + tall;
          }
          this.kundeInfo =
            'Du har lagt inn en ordre med ' +
            this.innlagteSykler +
            ' sykler. Dette regnes som en gruppebestilling, og derfor fortjener du en rabatt på 10%.';
        } else if (this.godKunde[0].god_kunde >= 5) {
          for (let i = 0; i < this.sykkelOversikt.length; i++) {
            this.tabell1.push(
              <tr>
                <td>{this.sykkelOversikt[i].modellnavn}</td>
                <td>{this.sykkelOversikt[i].timepris * dager * 0.8},-</td>
                <td>
                  Du sparer: {this.sykkelOversikt[i].timepris * dager * 0.1},- og{' '}
                  {this.sykkelOversikt[i].timepris * dager * 0.1},- for Helgeutleie
                </td>
              </tr>
            );
            let tall = this.sykkelOversikt[i].timepris * dager * 0.8;

            this.sumSykler = this.sumSykler + tall;
          }
          this.kundeInfo =
            'Du har vært kunde hos oss lenge og lagt inn ' +
            this.godKunde[0].god_kunde +
            ' bestillinger. Derfor fortjenter du 10% rabatt.';
        } else {
          for (let i = 0; i < this.sykkelOversikt.length; i++) {
            this.tabell1.push(
              <tr>
                <td>{this.sykkelOversikt[i].modellnavn}</td>
                <td>{this.sykkelOversikt[i].timepris * dager},-</td>
                <td>Du sparer: {this.sykkelOversikt[i].timepris * dager * 0.9},- for Helgeutleie</td>
              </tr>
            );
            let tall = this.sykkelOversikt[i].timepris * dager;

            this.sumSykler = this.sumSykler + tall;
          }
          this.kundeInfo = 'Ingen øvrige rabatter gjelder din ordre.';
        }
      }
    }
  }

  hentUtstyrOversikt() {
    sykkelService.hentUtstyrOversikt(this.id[0].lastInsertId, utstyrOversikt => {
      this.utstyrOversikt = utstyrOversikt;

      console.log(this.utstyrOversikt);
    });
  }

  leggInnGevinst() {
    sykkelService.leggInnGevinst(this.sumTotalt, this.id[0].lastInsertId, gevinst => {});
  }

  lagUtstyrOversikt() {
    if (this.utstyrOversikt.length == 0) {
      this.alternativInfo2 = 'Du har ikke lagt inn noe utstyr i bestillingen.';
      this.sumTotalt = this.sumSykler + this.sumUtstyr;
      this.leggInnGevinst();
    } else {
      this.tabell2.push(
        <tr>
          <th>Type</th>
          <th>Pris for leie</th>
        </tr>
      );

      for (let i = 0; i < this.utstyrOversikt.length; i++) {
        this.tabell2.push(
          <tr>
            <td>{this.utstyrOversikt[i].type}</td>
            <td>{this.utstyrOversikt[i].pris},-</td>
          </tr>
        );

        let tall = this.utstyrOversikt[i].pris;

        this.sumUtstyr = this.sumUtstyr + tall;
      }

      this.sumTotalt = this.sumSykler + this.sumUtstyr;
      console.log(this.sumTotalt);
      this.leggInnGevinst();
    }
  }

  lagBestillingInfoId() {
    this.info.push(
      <div>
        <h2>Takk for bestillingen!</h2>
        <p>
          Orderen din er mottatt og bekreftet med ordrenummeret: <b>{this.id[0].lastInsertId}</b>
        </p>
        <p>Din ordre gjelder perioden:</p>
        <p>
          <b>Fra: </b>
          {this.utlevering_dato} {this.utlevering_tid} <b> Til: </b>
          {this.innlevering_dato} {this.innlevering_tid}
        </p>
        <p>{this.kundeInfo}</p>
      </div>
    );
    console.log(this.info);
  }

  wrapper1(e) {
    e.preventDefault();
    this.leggInnBestilling();
    this.hentBestillingId();
    this.hentGodeKunder();
    this.visSykkel();
  }

  wrapper3() {
    for (let i = 0; i < this.sykkelOversikt.length; i++) {
      if (this.sykkelkurv > 0 && this.sykkelOversikt[i].type != 'Hybrid Herre m/bagasjebrett') {
        if (this.sykkelkurv > 0 && this.sykkelOversikt[i].type != 'Hybrid Dame m/bagasjebrett') {
          var x = confirm(
            'OBS! Du har valgt sykkelkurv som utstyr med en/flere sykler som ikke støtter dette. Vil du fremdeles bestille sykkelkurv?'
          );

          if (x == true) {
            this.leggInnValgtUtstyr();
            this.hentUtstyrOversikt();
          }
          break;
        } else {
          this.leggInnValgtUtstyr();
          this.hentUtstyrOversikt();
        }
      } else if (this.sykkelkurv > 0 && this.sykkelOversikt[i].type != 'Hybrid Dame m/bagasjebrett') {
        if (this.sykkelkurv > 0 && this.sykkelOversikt[i].type != 'Hybrid Herre m/bagasjebrett') {
          var y = confirm(
            'OBS! Du har valgt sykkelkurv som utstyr med en/flere sykler som ikke støtter dette. Vil du fremdeles bestille sykkelkurv?'
          );

          if (y == true) {
            this.leggInnValgtUtstyr();
            this.hentUtstyrOversikt();
          }
          break;
        } else {
          this.leggInnValgtUtstyr();
          this.hentUtstyrOversikt();
        }
      } else if (this.barnesete > 0 && this.sykkelOversikt[i].type != 'Hybrid Herre m/bagasjebrett') {
        if (this.barnesete > 0 && this.sykkelOversikt[i].type != 'Hybrid Dame m/bagasjebrett') {
          var z = confirm(
            'OBS! Du har valgt barnesete som utstyr med en/flere sykler som ikke støtter dette. Vil du fremdeles bestille barnesete?'
          );

          if (z == true) {
            this.leggInnValgtUtstyr();
            this.hentUtstyrOversikt();
          }
          break;
        } else {
          this.leggInnValgtUtstyr();
          this.hentUtstyrOversikt();
        }
      } else if (this.barnesete > 0 && this.sykkelOversikt[i].type != 'Hybrid Dame m/bagasjebrett') {
        if (this.barnesete > 0 && this.sykkelOversikt[i].type != 'Hybrid Herre m/bagasjebrett') {
          var r = confirm(
            'OBS! Du har valgt barnesete som utstyr med en/flere sykler som ikke støtter dette. Vil du fremdeles bestille barnesete?'
          );

          if (r == true) {
            this.leggInnValgtUtstyr();
            this.hentUtstyrOversikt();
          }
          break;
        } else {
          this.leggInnValgtUtstyr();
          this.hentUtstyrOversikt();
        }
      } else {
        this.leggInnValgtUtstyr();
        this.hentUtstyrOversikt();
      }
    }
  }

  lagOversikt() {
    this.visOrdreOversikt();
    this.lagSykkelOversikt();
    this.lagUtstyrOversikt();
    this.lagBestillingInfoId();
  }
}
