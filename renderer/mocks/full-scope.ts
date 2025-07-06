import { ScopeInterface } from "../@types/scope";

const scopeListMock: ScopeInterface[] = [
  {
    id: 1,
    commands: [],
    directory: '',
    description: 'Descrição do escopo 01',
    name: 'Escopo 01'
  },
  {
    id: 2,
    commands: [
      {
        id_command: 1,
        description: '',
        isRunning: false,
        name: 'Teste de Ping Infinito',
        command: 'ping google.com -t',
        output: 'Saida teste comando 01'
      },
      {
        id_command: 2,
        description: 'Descrição rápida sobre o comando 02',
        isRunning: false,
        name: 'Comando 02',
        command: 'echo "Comando 02"',
        output: ''
      },
      {
        id_command: 3,
        description: '',
        isRunning: false,
        name: 'Comando 03',
        command: 'echo "Comando 03"',
        output: ''
      }
    ],
    description: '',
    directory: '',
    name: 'Escopo 02'
  },
  {
    id: 3,
    commands: [],
    description: 'Descrição do escopo 03',
    directory: '',
    name: 'Escopo 03'
  },
  {
    id: 4,
    commands: [],
    description: 'Descrição do escopo 04',
    directory: '',
    name: 'Escopo 04'
  },
  {
    id: 5,
    commands: [],
    description: 'Descrição do escopo 05',
    directory: '',
    name: 'Escopo 05'
  },
]

export default scopeListMock
