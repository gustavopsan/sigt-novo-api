
# API SIGT

A presente documentação tem como objetivo facilitar o entendimento da **API Transparência**, bem como direcionar a forma como cada endpoint deve ser utilizado.


## Documentação da API

### Rotas do usuário

#### Retorna todos os usuários (apenas para debug)

```http
  GET /debug/user/getusers
```

#### Cria um usuário

```http
  POST /user/createuser
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | O nome do usuário |
| `email`      | `string` | **Único**. O email do usuário |
| `password`      | `string` | A senha do usuário |
| `confirmPassword`      | `string` | A confirmação da senha |
| `role`      | `string` | O cargo do usuário |
| `churchId`      | `string` | O slug da igreja (sede, cohab ou saúde) |

#### Realiza a busca de um usuário

```http
  POST /user/find
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | O id do usuário |

#### Realiza o login do usuário

```http
  POST /user/login
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | O email do usuário |
| `password`      | `string` | A senha do usuário |

#### Checa a validade da seção do usuário

```http
  POST /user/validatesession
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `token`      | `string` | O token gerado na autenticação do usuário |


#### Atualiza os dados do usuário

```http
  POST /user/update
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | O ID do usuário retornado no login |
| `key`      | `string` | A chave que identifica qual dado será atualizado |
| `newvalue`      | `string` | O novo valor do dado do usuário |

#### Inicia uma nova thread de alteração de senha

```http
  POST /user/requestPasswordRecovery
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | O email do usuário que solicita a thread |

#### Realiza a alteração da senha do usuário

```http
  POST /user/resetPassword
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `userId`      | `string` | O ID do usuário que está alterando |
| `token`      | `string` | O token que identifica a thread de alteração de senha |
| `newPassword`      | `string` | O novo valor da senha do usuário |

#### Realiza o envio de um email ao usuário

```http
  POST /user/sendEmail
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | O e-mail do destinatário |
| `subject`      | `string` | O assunto do e-mail enviado |
| `text`      | `string` | **Opcional**. Texto plano da mensagem enviada |
| `html`      | `string` | Conteúdo em HTML da mensagem enviada |

#### Desativa conta do usuário

```http
  POST /user/deactivate
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | O ID do usuário que será desativado |

#### Checa a validade da seção do usuário

```http
  POST /user/activate
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | O ID do usuário que será reativado |

### Rotas do formulário semanal

#### Cria um novo formulário semanal

```http
  POST /form/week/create
```

| Parâmetro | Tipo      | Descrição                 |
| :-------- | :-------- | :------------------------ |
| `churchId`| `string`  | O slug da igreja (sede, cohab ou saúde) |
| `weekData`| `object`  | Os dados que indicam à semana, mês e ano do formulário |
| `creatorId`| `string`  | O ID do usuário que está criando o formulário semanal |
| `tenths`| `decimal`  | O valor de dízimos do formulário semanal |
| `offers`| `decimal`  | O valor de ofertas do formulário semanal |
| `expenses`| `array`  | O conjunto de despesas do formulário semanal |

Formato desejado de dados de entrada (somente para exemplo):

```json
{
	"churchId": "sede",
	"weekData": {
		"weekNumber": 4,
		"monthId": 0,
		"year": 2023
	},
	"creatorId": "632275c83b9807d56a5c1ae9",
	"tenths": 840.5,
	"offers": 534.40,
	"expenses": [
		{ "description": "Item 1", "value": 500.40 },
		{ "description": "item 2", "value": 499.60 }
	]
}
```

#### Retorna um formulário semanal específico

```http
  GET /form/week/load
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `formID`      | `string` | O ID do formulário semanal que será carregado |

#### Retorna um formulário semanal específico

```http
  DELETE /form/week/delete
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `formID`      | `string` | O ID do formulário semanal que será excluído |


### Rotas do formulário mensal

#### Cria um novo formulário mensal

```http
  POST /form/month/create
```

| Parâmetro | Tipo      | Descrição                 |
| :-------- | :-------- | :------------------------ |
| `churchId`| `string`  | O slug da igreja (sede, cohab ou saúde) |
| `monthData`| `object`  | Os dados que indicam o mês e ano do formulário |
| `creatorId`| `string`  | O ID do usuário que está criando o formulário semanal |
| `weekFormIds`| `array`  | O conjunto de IDs dos formulários semanais que compõem o mês em questão |

Formato desejado de dados de entrada (somente para exemplo):

```json
{
	"churchId": "sede",
	"monthData": {
		"monthId": 0,
		"year": 2023
	},
	"creatorId": "632275c83b9807d56a5c1ae9",
    	"weekFormIds": [
		"1-sem-jan2023-sede",
		"2-sem-jan2023-sede",
		"3-sem-jan2023-sede",
		"4-sem-jan2023-sede"
	]
}
```

#### Retorna um formulário mensal específico

```http
  GET /form/month/load
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `formID`      | `string` | O ID do formulário mensal que será carregado |

#### Retorna um formulário mensal específico

```http
  DELETE /form/month/delete
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `formID`      | `string` | O ID do formulário mensal que será excluído |


## Deploy

Para fazer o deploy desse projeto rode

```bash
  npm run start
```

ou

```bash
  yarn start
```


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`SECRET`: Segredo aleatório usado como chave para o `jsonwebtoken`

`FIRST_BALANCE_SEDE`: Primeiro saldo da igreja sede

`FIRST_BALANCE_COHAB`: Primeiro saldo da congregação da Cohab

`FIRST_BALANCE_SAUDE`: Primeiro saldo da congregação da Saúde

`MONGO_CONNECTION_URL`: URI de conexão com o banco de dados MongoDB
