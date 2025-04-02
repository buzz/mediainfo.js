declare namespace NodeJS {
  export interface Process {
    _original: () => Process
  }
}
