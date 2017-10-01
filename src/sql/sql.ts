import * as Tedious from 'tedious';
import * as Util from 'util';
import * as Ask from '../ask/ask';

export function ask_user_for_sql_config(template_config?: Tedious.ConnectionConfig): Tedious.ConnectionConfig {

  const config: Tedious.ConnectionConfig = {...template_config};
  config.server = Ask.for_input('SQL Server', config.server);
  config.domain = Ask.for_input('SQL User Domain', config.domain);
  config.userName = Ask.for_input('SQL User Name', config.userName);

  config.password = Ask.for_password('SQL Password', config.password);

  return config;
}

export function connect(config: Tedious.ConnectionConfig): Promise<Tedious.Connection> {
  const connection = new Tedious.Connection(config);
  return Util.promisify(connection.on.bind(connection))('connect');
}
