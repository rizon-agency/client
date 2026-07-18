export class AppRedirect extends Error {
  public to: string | URL;

  public constructor(input: { to: string | URL }) {
    super();

    this.to = input.to;
  }
}
