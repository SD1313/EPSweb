// ==UserScript==
// @name            EPSweb - Autologin
// @namespace       https://sd1313.myds.me/greasemonkey
// @version         1.0.201701011547
// @author          Stefan Dorn
// @contributor     UG-ÖEL Bamberg Land
// @description     Automatic log in for the service "EPSweb".
// @description:de  Loggt sich automatisch beim Dienst "EPSweb" ein.
// @homepage        https://sd1313.myds.me
// @icon            https://epsweb.bayern.de/favicon.ico
// @supportURL      https://sd1313.myds.me
// @match           https://epsweb.bayern.de/
// @match           https://epsweb.bayern.de/default.aspx
// @match           https://epsweb.bayern.de/Loader.aspx
// @run-at          document-end
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_deleteValue
// @noframes
// ==/UserScript==

// START_CHANGE_LOG
//
// --- version 1.0
// initial version
//
// END_OF_CHANGELOG

// Variablen deklarieren
var Zeitpunkt = new Date();
console.log('Skript gestartet: '+Zeitpunkt.toLocaleString());
var UsernameOK;
var PasswordOK;

// Funktionen
function checkData() {
  if ( GM_getValue('Username') != '' && GM_getValue('Username') != undefined) {
    UsernameOK = true;
  }
  else {
    UsernameOK = false;
  }
  if ( GM_getValue('Password') != '' && GM_getValue('Password') != undefined) {
    PasswordOK = true;
  }
  else {
    PasswordOK = false;
  }
  console.log('UsernameOK: '+UsernameOK+' PasswordOK: '+PasswordOK);
}

function deleteData() {
  GM_deleteValue('Username');
  GM_deleteValue('Password');
  alert('Die gespeicherten Daten wurden gelöscht.');
  console.log('Benutzername und Passwort wurden gelöscht.')
}

// Script starten
checkData();
if ( UsernameOK == false || PasswordOK == false )
{
  var InputUsername = prompt('Bitte Benutzername eingeben:');
  GM_setValue('Username',InputUsername);
  var InputPassword = prompt('Bitte Passwort eingeben:');
  GM_setValue('Password',InputPassword);
  console.log('Benutzername und Passwort wurden abgefragt. Benutzername: '+GM_getValue('Username'));
}
else{
  console.log('Benutzername und Passwort waren gespeichert. Benutzername: '+GM_getValue('Username'));
}

checkData();
if ( UsernameOK == true && PasswordOK == true )
{
  
  var UserField = document.getElementById('ctl00_login_U_BENUTZER');
  var PassField = document.getElementById('event_main_PORTAL_PW');

  // Benutzername
  if ( UserField != '' && UserField != undefined )
  {
    UserField.value = unescape(GM_getValue('Username'));
  }

  // Passwort
  if ( PassField != '' && PassField != undefined )
  {
    PassField.value = unescape(GM_getValue('Password'));
  }

}
else
{
 console.log('Bedingungen für Script Ausführung nicht erfüllt! Starte Löschroutine')
 deleteData();
}