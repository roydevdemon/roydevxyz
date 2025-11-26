export type StripAnsiOptions = {
  onlyFirst?: boolean;
};

declare function stripAnsi(input: string, options?: StripAnsiOptions): string;

export = stripAnsi;

