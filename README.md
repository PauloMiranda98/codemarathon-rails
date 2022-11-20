# Code Marathon ![Testes](https://github.com/PauloMiranda98/codemarathon-rails/actions/workflows/rubyonrails.yml/badge.svg?branch=main)


O Code Marathon é um sistema onde pessoas interessadas por Maratona de Programação e pela Olimpíada Brasileira de Informática podem aprender os conteúdos recorrentes nessas competições.

Code Marathon é um projeto open source que todos podem contribuir tanto com o sistema quanto com o conteúdo. A ideia é ser um projeto que tenha não só conteúdos próprios mas também mantenha de forma centralizada todos os conteúdos produzidos no Brasil.

## Como contribuir com conteúdo?

Para contibuir com conteúdo, basta acessar o subdiretório [/engines/code_marathon_contents](/engines/code_marathon_contents). Lá tem um README específico para quem deseja contribuir com conteúdo.

## Como contribuir no site?

O sistema foi desenvolvido em Ruby on Rails. Alguns componentes mais dinâmicos foram feitos em React.

### Configurando o sistema

Primeiro você vai precisar instalar o Ruby on Rails e o PostgreSQL.

Após isso, será necessário criar um arquivo `config/database.yml` com as credenciais do seu banco de dados.

```yml
defaults: &defaults
  adapter: postgresql
  pool: 5
  username: USERNAME_AQUI
  password: SENHA_AQUI
  host: localhost
  port: 5432

development:
  <<: *defaults
  database: codemarathon_development

test:
  <<: *defaults
  database: codemarathon_test
```

Agora, execute o `bundle install` para instalar as bibliotecas.

Por fim, basta executar o comando `./bin/dev` para subir o servidor.

Agora, se tudo deu certo, basta abrir `http://localhost:4000/` no seu navegador.
