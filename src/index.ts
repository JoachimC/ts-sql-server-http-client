import * as Tedious from 'tedious';
import * as Sql from './sql/sql';

const sql_config_defaults: Tedious.ConnectionConfig = {
  server: 'BOB',
  userName: 'joachim',
  domain: 'BOB',
};

const sql_config = Sql.ask_user_for_sql_config(sql_config_defaults);
Sql.connect(sql_config)
  .then(connection => {
    console.log(`connected to server ${sql_config.server}`);

    connection.close();
    connection.removeAllListeners();
  })
  .catch(console.error);
