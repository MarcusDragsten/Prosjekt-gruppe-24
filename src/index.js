import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import {
  AnsatteAdmin,
  AnsatteSekretær,
  AdminStartside,
  AnsatteDetails,
  AnsatteDetailsSek,
  AdminStartsideSek,
  AnsatteNew,
  AnsatteEdit,
  Rapport,
  Lokasjoner,
  LokasjonerDetails,
  LokasjonNew,
  LokasjonEdit
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
        <div class="header w3-container w3-green">
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
            history.push('/adminStartside/');
            //Daglig leder
          }
          if (this.ansatte[i].rolle == 'Sekretær') {
            history.push('/ansatteSekretær/');
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

      <Route path="/salgStartside/:id" component={SalgStartside} />
      <Route path="/aktiveBestillinger/" component={AktiveBestillinger} />
      <Route path="/innlevering/:id/" component={Innlevering} />
      <Route path="/endreBestilling/:id" component={EndreBestilling} />
      <Route path="/bestillingHistorikk/" component={BestillingHistorikk} />
      <Route exact path="/endreBestillingSykler/:id/endreSykler" component={EndreSykler} />
      <Route exact path="/endreBestillingUtstyr/:id/endreUtstyr" component={EndreUtstyr} />
      <Route path="/bestilling/:id" component={Bestilling} />

      <Route path="/nyKunde/" component={NyKunde} />

      <Route path="/adminStartside/" component={AdminStartside} />
      <Route path="/ansatteAdmin/" component={AnsatteAdmin} />
      <Route path="/ansatteAdmin/:id" component={AnsatteDetails} />
      <Route path="/ansatteSekretær" component={AnsatteSekretær} />
      <Route path="/new_ansatte/" component={AnsatteNew} />
      <Route path="/ansatteSek/:id" component={AnsatteDetailsSek} />
      <Route path="/ansatte/:id/edit" component={AnsatteEdit} />
      <Route path="/rapport/" component={Rapport} />
      <Route path="/lokasjoner/" component={Lokasjoner} />
      <Route path="/lokasjoner/:id" component={LokasjonerDetails} />
      <Route path="/lokasjon/:id/edit" component={LokasjonEdit} />
      <Route path="/nyLokasjon/" component={LokasjonNew} />

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
