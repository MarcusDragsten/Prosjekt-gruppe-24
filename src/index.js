import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import {
  AnsatteAdmin,
  AnsatteSekretær,
  AdminStartside,
  SekretærStartside,
  AnsatteDetails,
  AnsatteDetailsSekretær,
  AdminStartsideSekretær,
  NyAnsatt,
  AnsatteEdit,
  Rapport,
  Lokasjoner,
  LokasjonerDetails,
  LokasjonNew,
  LokasjonEdit,
  LokasjonerSekretær,
  LokasjonerDetailsSekretær,
  RapportSekretær
} from '../scripts/admin.js';
import { Bestilling } from '../scripts/bestilling.js';
import {
  SalgStartside,
  AktiveBestillinger,
  BestillingHistorikk,
  EndreBestilling,
  EndreSykler,
  EndreUtstyr,
  NyKunde,
  KundeEdit,
  Innlevering
} from '../scripts/salg.js';
import {
  LagerStartside,
  LagerStartsideSykkel,
  LagerStartsideUtstyr,
  LagerStartsideLeggTil,
  SykkelBestilling,
  HenteSykkel,
  LedigSykkel,
  UtleidSykkel,
  UtilgjengeligeSykler,
  EndreReparasjoner,
  TilbakePåLager,
  SlettFraLager,
  UtstyrBestilling,
  HenteUtstyr,
  LedigUtstyr,
  UtleidUtstyr,
  UtilgjengeligeUtstyr,
  EndreReparasjonerUtstyr,
  TilbakePåLagerUtstyr,
  SlettFraLagerUtstyr,
  LeggTilSykkel,
  LeggTilUtstyr,
  EndreSykkel,
  EndreUtstyrLager
} from '../scripts/lager.js';
import { loginService } from './services';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Login extends Component {
  //Første siden som kommer opp når man åpner applikasjon. Man logger seg inn med brukernavn og passord og blir videre sendt til startsiden som tilsvarer ansattes rolle i bedriften.
  ansatte = [];

  brukernavn = '';
  passord = '';

  feilmelding = '';

  render() {
    return (
      <div id="yttersteDiv">
        <div class="header w3-container" id="header">
          <h1>Book & Bike</h1>
        </div>
        <div id="loginDiv">
          <div id="loginBildeDiv">
            <img src="../bilder/logo.png" id="logo" alt="Logo" />
          </div>
          <div id="loginInputDiv">
            <form onSubmit={this.login}>
              <h3>Innlogging ansatte</h3>
              <input
                type="text"
                id="inputBrukernavn"
                placeholder="brukernavn"
                onChange={e => (this.brukernavn = event.target.value)}
                required
              />
              <br />
              <input
                type="password"
                placeholder="passord"
                id="inputPassord"
                onChange={e => (this.passord = event.target.value)}
                required
              />
              <br />
              <button type="submit" id="loginKnapp">
                Logg inn
              </button>
              <p>{this.feilmelding}</p>
            </form>
          </div>
        </div>
        <div class="footer">
          <p>
            Innlogging i systemet for ansatte skjer ved bruk av ditt personlige brukernavn og passord. Ved
            innloggingsproblemer, ring 999 62 622.
            <br /> © 2019 Book & Bike All right reserved{' '}
          </p>
        </div>
      </div>
    );
  }

  mounted() {
    loginService.getAnsatte(ansatte => {
      this.ansatte = ansatte;
    });
  }

  login(e) {
    e.preventDefault();
    for (let i = 0; i < this.ansatte.length; i++) {
      if (this.brukernavn == this.ansatte[i].brukernavn) {
        if (this.passord == this.ansatte[i].passord) {
          if (this.ansatte[i].rolle == 'Daglig leder') {
            history.push('/adminStartside/' + this.ansatte[i].id);
            //Daglig leder
          }
          if (this.ansatte[i].rolle == 'Sekretær') {
            history.push('/sekretærStartside/' + this.ansatte[i].id);
            //Sekretær
          }
          if (this.ansatte[i].rolle == 'Selger') {
            history.push('/salgStartside/' + this.ansatte[i].id);
            //Selger
          }
          if (this.ansatte[i].rolle == 'Lager') {
            history.push('/lagerStartside/' + this.ansatte[i].id);
            //Lager
          }
        } else {
          this.feilmelding = 'Feil brukernavn eller passord';
        }
      } else {
        this.feilmelding = 'Feil brukernavn eller passord';
      }
    }
  }

  test() {
    history.push('/ansatte/');
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Route exact path="/" component={Login} />

      <Route path="/salgStartside/:ansattId" component={SalgStartside} />
      <Route path="/aktiveBestillinger/:ansattId" component={AktiveBestillinger} />
      <Route path="/innlevering/:ansattId/:bestillingId" component={Innlevering} />
      <Route path="/endreBestilling/:ansattId/:bestillingId" component={EndreBestilling} />
      <Route path="/bestillingHistorikk/:ansattId" component={BestillingHistorikk} />
      <Route exact path="/endreBestillingSykler/:ansattId/:bestillingId" component={EndreSykler} />
      <Route exact path="/endreBestillingUtstyr/:ansattId/:bestillingId" component={EndreUtstyr} />
      <Route path="/bestilling/:ansattId" component={Bestilling} />

      <Route path="/nyKunde/:ansattId" component={NyKunde} />
      <Route path="/kundeEdit/:ansattId/:epost" component={KundeEdit} />

      <Route path="/adminStartside/:ansattId" component={AdminStartside} />
      <Route path="/ansatteAdmin/:ansattId" component={AnsatteAdmin} />
      <Route path="/ansatteAdmin/:ansattId/:ansatteListe" component={AnsatteDetails} />
      <Route path="/sekretærStartside/:ansattId" component={SekretærStartside} />
      <Route path="/ansatteSekretær/:ansattId" component={AnsatteSekretær} />
      <Route path="/ansatteSekretær/:ansattId/:ansatteListe" component={AnsatteDetailsSekretær} />
      <Route path="/nyAnsatt/:ansattId" component={NyAnsatt} />
      <Route path="/ansatteEdit/:ansattId/:edit" component={AnsatteEdit} />
      <Route path="/rapport/:ansattId" component={Rapport} />
      <Route path="/rapportSekretær/:ansattId" component={RapportSekretær} />
      <Route path="/lokasjoner/:ansattId" component={Lokasjoner} />
      <Route path="/lokasjoner/:ansattId/:lokasjonListe" component={LokasjonerDetails} />
      <Route path="/lokasjonerSekretær/:ansattId" component={LokasjonerSekretær} />
      <Route path="/lokasjonerSekretær/:ansattId/:lokasjonListe" component={LokasjonerDetailsSekretær} />
      <Route path="/lokasjon/:ansattId/:edit" component={LokasjonEdit} />
      <Route path="/nyLokasjon/:ansattId" component={LokasjonNew} />

      <Route path="/lagerStartside/:ansattId" component={LagerStartside} />
      <Route path="/lagerStartsideSykkel/:ansattId" component={LagerStartsideSykkel} />
      <Route path="/lagerStartsideUtstyr/:ansattId" component={LagerStartsideUtstyr} />
      <Route path="/lagerStartsideLeggTil/:ansattId" component={LagerStartsideLeggTil} />

      <Route path="/ledigSykkel/:ansattId" component={LedigSykkel} />
      <Route path="/utleidSykkel/:ansattId" component={UtleidSykkel} />
      <Route path="/utilgjengeligSykler/:ansattId" component={UtilgjengeligeSykler} />
      <Route path="/reparasjoner/:ansattId:id/edit" component={EndreReparasjoner} />
      <Route path="/utilgjengeligSykler/:ansattId:id/tilbake" component={TilbakePåLager} />
      <Route path="/utilgjengeligSykler/:ansattId:id/slett" component={SlettFraLager} />
      <Route path="/sykkelBestilling/:ansattId" component={SykkelBestilling} />
      <Route path="/henteSykkel/:ansattId" component={HenteSykkel} />

      <Route path="/utilgjengeligUtstyr/:ansattId" component={UtilgjengeligeUtstyr} />
      <Route path="/reparasjonerUtstyr/:ansattId:id/edit" component={EndreReparasjonerUtstyr} />
      <Route path="/utilgjengeligUtstyr/:ansattId:id/tilbake" component={TilbakePåLagerUtstyr} />
      <Route path="/utilgjengeligUtstyr/:ansattId:id/slett" component={SlettFraLagerUtstyr} />
      <Route path="/utstyrBestilling/:ansattId" component={UtstyrBestilling} />
      <Route path="/henteUtstyr/:ansattId" component={HenteUtstyr} />
      <Route path="/ledigUtstyr/:ansattId" component={LedigUtstyr} />
      <Route path="/utleidUtstyr/:ansattId" component={UtleidUtstyr} />

      <Route path="/leggTilSykkel/:ansattId" component={LeggTilSykkel} />
      <Route path="/leggTilUtstyr/:ansattId" component={LeggTilUtstyr} />

      <Route path="/redigerSykkel/:ansattId:id/edit" component={EndreSykkel} />
      <Route path="/redigerUtstyr/:ansattId:id/edit" component={EndreUtstyrLager} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
