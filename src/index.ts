import * as readlineSync from 'readline-sync';
import * as Tedious from 'tedious';

const default_config: Tedious.ConnectionConfig = {
  server: 'BOB',
  userName: 'joachim',
  domain: 'BOB',
};

function connect_sql(config: Tedious.ConnectionConfig): void {
  const connection = new Tedious.Connection(config);

  connection.on('connect', err => {
    if (err) {
      console.log(err.toString());
    }
    console.log('connected');
    process.exit();
  });
}

const question_with_default = (query: string, default_input: string | undefined) =>
  readlineSync.question(
    `${query}? (${default_input}) `,
    {defaultInput: default_input});

default_config.server = question_with_default('server', default_config.server);
default_config.domain = question_with_default('domain', default_config.domain);
default_config.userName = question_with_default('user name', default_config.userName);

default_config.password = readlineSync.question(
  'password? ', {
    defaultInput: default_config.password,
    hideEchoBack: true,
  });

connect_sql(default_config);
