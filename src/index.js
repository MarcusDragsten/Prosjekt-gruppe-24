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
  Innlevering
} from '../scripts/salg.js';
import {
  LagerStartside,
  LedigSykkel,
  UtleidSykkel,
  LedigUtstyr,
  UtleidUtstyr,
  Reparasjoner,
  EndreReparasjoner,
  HenteSykkel,
  EndreHenteSykkel,
  LeggTilSykkel,
  LeggTilUtstyr,
  EndreSykkel,
  EndreUtstyrLager,
  SavnetSykkel,
  EndreSavnetSykkel
} from '../scripts/lager.js';
import { loginService } from './services';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Tilbake extends Component {
  render() {
    return (
      <div>
        <button type="button" onClick={this.tilbake}>
          Tilbake til login
        </button>
      </div>
    );
  }
  tilbake() {
    history.push('/');
  }
}

class Login extends Component {
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
          <form onSubmit={this.login}>
            <h3>Innlogging ansatte:</h3>
            <label for="Brukernavn">Brukernavn:</label>
            <div id="brukernavnDiv" class="input-group">
              <span class="input-group-addon">
                <i class="glyphicon glyphicon-user" />
              </span>
              <input
                type="text"
                class="form-control form-control-lg"
                id="inputBrukernavn"
                placeholder="Et brukernavn"
                onChange={e => (this.brukernavn = event.target.value)}
                required
              />
            </div>
            <label for="Passord">Passord:</label>
            <div id="passordDiv" class="input-group">
              <span class="input-group-addon">
                <i class="glyphicon glyphicon-lock" />
              </span>
              <input
                type="password"
                placeholder="*******"
                class="form-control"
                id="inputPassord"
                onChange={e => (this.passord = event.target.value)}
                required
              />
            </div>
            <button type="submit" class="btn">
              Logg inn
            </button>
          </form>
          <p>{this.feilmelding}</p>
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
          console.log(this.brukernavn + ' er innlogget!');
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
            history.push('/lagerStartside/');
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

      <Route path="/lagerStartside/" component={LagerStartside} />
      <Route path="/ledigSykkel/" component={LedigSykkel} />
      <Route path="/utleidSykkel/" component={UtleidSykkel} />
      <Route path="/ledigUtstyr/" component={LedigUtstyr} />
      <Route path="/utleidUtstyr/" component={UtleidUtstyr} />
      <Route path="/reparasjoner/" component={Reparasjoner} />
      <Route path="/reparasjoner/:id/edit" component={EndreReparasjoner} />
      <Route path="/henteSykkel/" component={HenteSykkel} />
      <Route path="/henteSykkel/:id/edit" component={EndreHenteSykkel} />
      <Route path="/leggTilSykkel/" component={LeggTilSykkel} />
      <Route path="/leggTilUtstyr/" component={LeggTilUtstyr} />
      <Route path="/redigerSykkel/:id/edit" component={EndreSykkel} />
      <Route path="/redigerUtstyr/:id/edit" component={EndreUtstyrLager} />
      <Route path="/savnetSykkel/" component={SavnetSykkel} />
      <Route path="/savnetSykkel/:id/edit" component={EndreSavnetSykkel} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
