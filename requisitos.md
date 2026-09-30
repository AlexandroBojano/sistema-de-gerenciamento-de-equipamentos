# Requisitos do Sistema de Gerenciamento de Equipamentos

## 1. Objetivo

Quero desenvolver um sistema que permita à equipe de TI ter controle
dos seus equipamentos, incluindo o status das operações técnicas.

O sistema deverá permitir que a equipe saiba de onde é cada equipamento,
o que foi feito e o que ainda precisa ser feito. Sua principal função
será fornecer um status claro sobre a situação de cada equipamento.

O sistema foi pensado para ser utilizado em conjunto com o GLPI.
Embora o GLPI seja um sistema completo para gerenciamento de chamados,
ele não é focado no acompanhamento detalhado do estado dos equipamentos.

Dessa forma, este sistema terá como objetivo auxiliar a equipe de TI
no controle e acompanhamento dos equipamentos, mantendo uma referência
ao chamado correspondente no GLPI.

## 2. Escopo

O sistema será utilizado pela equipe de TI para controlar os
equipamentos que estão atualmente sob responsabilidade da equipe.

O sistema permitirá cadastrar, consultar, editar e acompanhar o status
dos equipamentos.

Cada equipamento terá uma referência ao chamado correspondente no GLPI,
permitindo identificar qual chamado está relacionado a cada equipamento.

O sistema não armazenará histórico de equipamentos finalizados.

O sistema não substituirá o GLPI, funcionando como uma ferramenta
complementar ao gerenciamento de chamados.

O sistema não terá diferentes níveis de permissão. Todo usuário
cadastrado terá acesso de administrador.

## 3. Usuários

O sistema será utilizado pelos técnicos da equipe de TI para cadastrar,
consultar, atualizar e finalizar equipamentos.

### 3.1 Técnico de TI

O técnico poderá:

- cadastrar equipamentos;
- consultar equipamentos;
- alterar informações;
- alterar o status;
- finalizar equipamentos;
- excluir registros.

## 4. Requisitos Funcionais

### RF01 — Cadastrar equipamento

O sistema deve permitir o cadastro de um equipamento.

### RF02 — Definir status inicial

Ao cadastrar um equipamento, o sistema deve atribuir automaticamente
o status "Recebido".

### RF03 — Consultar equipamentos

O sistema deve permitir visualizar os equipamentos atualmente sob
responsabilidade da equipe de TI.

### RF04 — Alterar status

O sistema deve permitir alterar o status de um equipamento.

### RF05 — Editar equipamento

O sistema deve permitir alterar os dados cadastrados de um equipamento.

### RF06 — Finalizar equipamento

O sistema deve permitir marcar um equipamento como "Finalizado"
quando ele for retirado.

### RF07 — Excluir equipamento finalizado

O sistema deve permitir excluir o registro de um equipamento
após sua finalização.

### RF08 — Filtrar equipamentos

O sistema deve permitir filtrar equipamentos pelo status.

### RF09 — Pesquisar equipamento

O sistema deve permitir localizar um equipamento por meio de seus dados.

### RF10 — Criar usuário

O sistema deve permitir a criação de um usuário por meio da tela
de login.

### RF11 — Autenticar usuário

O sistema deve permitir que um usuário faça login utilizando
suas credenciais.

### RF12 — Controlar acesso

O sistema deve permitir o acesso às funcionalidades somente para
usuários autenticados.

## 5. Regras de Negócio

### RN01 — Status inicial

Todo equipamento novo deve iniciar com o status "Recebido".

### RN02 — Fluxo de status

O fluxo normal do equipamento será:

Recebido → Planejado → Pendente → Pronto →
Aguardando retirada → Finalizado.

### RN03 — Equipamento finalizado

Um equipamento marcado como "Finalizado" não deve permanecer
no cadastro de equipamentos ativos após sua exclusão.

### RN04 — Sem histórico

O sistema não deve manter histórico dos equipamentos após
sua exclusão.

### RN05 — Usuário administrador

Todo usuário criado no sistema terá permissão de administrador.

## 6. Dados do Equipamento

Cada equipamento deverá possuir:

- Tipo;
- Unidade;
- Número do patrimônio;
- Número do chamado GLPI;
- Status.

## 7. Requisitos da Interface

### RI01 — Dashboard

O sistema deve apresentar um dashboard contendo a quantidade
de equipamentos por status.

### RI02 — Lista de equipamentos

O sistema deve apresentar uma lista dos equipamentos ativos.

### RI03 — Cadastro de equipamento

O sistema deve possuir uma interface para cadastro de equipamentos.

### RI04 — Alteração de status

A interface deve permitir alterar o status de um equipamento.

### RI05 — Tela de login

O sistema deve possuir uma tela para autenticação dos usuários.

### RI06 — Criação de usuário

A tela de login deve permitir a criação de novos usuários.

## 8. Requisitos Técnicos

### RT01 — Backend

O backend será desenvolvido utilizando Node.js e Express.

### RT02 — Banco de dados

O banco de dados será PostgreSQL.

### RT03 — Frontend

O frontend será desenvolvido utilizando HTML, CSS e JavaScript.

### RT04 — Comunicação

A comunicação entre frontend e backend será realizada por meio
de uma API HTTP.

### RT05 — Autenticação

O sistema deverá utilizar autenticação baseada em token.

### RT06 — Acesso autenticado

O usuário somente poderá acessar o sistema se estiver autenticado
e possuir um token válido.