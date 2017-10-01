import * as Http from 'http';
import * as Tedious from 'tedious';
import * as Sql from './sql/sql';
import * as WebClient from './web-service-client/web-service-client';

const sql_config_defaults: Tedious.ConnectionConfig = {
  server: 'BOB',
  userName: 'joachim',
  domain: 'BOB',
};

const web_service_options: Http.RequestOptions = {
  method: 'GET',
  hostname: 'jsonplaceholder.typicode.com',
  path: '/posts',
};

const web_service_default_credentials: WebClient.BasicAuthenticationCredentials = {username: 'fish'};

const sql_config = Sql.ask_user_for_sql_config(sql_config_defaults);
const basic_credentials = WebClient.ask_for_basic_authentication(web_service_default_credentials);

Promise
  .all([Sql.connect(sql_config), WebClient.call_service(web_service_options, () => basic_credentials)])
  .then(([sql_connection, web_service_response]) => {

    console.log(`connected to server ${sql_config.server}`);
    console.log(`web service response:\n${web_service_response}`);

    sql_connection.close();
    sql_connection.removeAllListeners();
  })
  .catch(console.error);
