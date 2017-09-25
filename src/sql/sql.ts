import * as readlineSync from 'readline-sync';
import * as Tedious from 'tedious';
import * as util from 'util';

export function ask_user_for_sql_config(template_config: Tedious.ConnectionConfig | undefined): Tedious.ConnectionConfig {
  const question_with_default = (query: string, default_input: string | undefined) =>
    readlineSync.question(
      `${query}? (${default_input}) `,
      {defaultInput: default_input});

  const config: Tedious.ConnectionConfig = {...template_config};
  config.server = question_with_default('server', config.server);
  config.domain = question_with_default('domain', config.domain);
  config.userName = question_with_default('user name', config.userName);

  config.password = readlineSync.question('password? ', {
    defaultInput: config.password,
    hideEchoBack: true,
  });

  return config;
}

export function connect(config: Tedious.ConnectionConfig): Promise<Tedious.Connection> {
  const connection = new Tedious.Connection(config);
  return util.promisify(connection.on.bind(connection))('connect');
}
