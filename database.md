# Modelo do Banco de Dados

## 1. Entidades

O sistema será composto por quatro tabelas principais:

- `users`
- `units`
- `tickets`
- `equipments`

## 2. Tabela `users`

Responsável por armazenar os usuários que possuem acesso ao sistema.

## 3. Tabela `units`

Responsável por armazenar as unidades/setores aos quais os equipamentos pertencem.

## 4. Tabela `tickets`

Responsável por armazenar os chamados do GLPI relacionados aos equipamentos.

## 5. Tabela `equipments`

Responsável por armazenar os equipamentos que estão sob controle da equipe de TI.

## 6. Relacionamentos

### `units` → `equipments`

Uma unidade pode possuir vários equipamentos.

### `tickets` → `equipments`

Um chamado pode estar relacionado a um ou mais equipamentos.

### `users` → `equipments`

Um usuário poderá cadastrar e gerenciar equipamentos.