import * as ReadlineSync from 'readline-sync';

export function for_input(query: string, default_input?: string): string {
  return ReadlineSync.question(
    `${query}? (${default_input}) `,
    {defaultInput: default_input});
}

export function for_password(query: string, default_password?: string) {
  return ReadlineSync.question(`${query}? `, {
    defaultInput: default_password,
    hideEchoBack: true,
  });
}
