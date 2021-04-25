# NestJS

## Contexto

Este repositório tem como objetivo guardar e documentar o conhecimento adquirido ao pesquisar mais sobre [NestJS](https://nestjs.com/), inicialmente os conteúdos desse repositório serão apresentados nas reuniões de padrões internas do time no qual participo.

## Introdução

O [NestJS](https://nestjs.com/) é um framework back-end em [NodeJS](https://nodejs.org/en/), possuindo uma arquitetura robusta, eficiente e muito similar para desenvolvedores Java e C#. Além de todos os benefícios já citados, o [NestJS](https://nestjs.com/) é extremamente aberto a implementação de outros frameworks em seu projeto, componentizando e simplicando a vida dos Devs dia a dia.

## Instalação

Para criarmos nosso primeiro projeto [NestJS](https://nestjs.com/), devemos possuir a versão `10.13.0` ou posterior do [NodeJS](https://nodejs.org/en/) para prosseguir, devemos começar instalando o [NestJS](https://nestjs.com/) pelo seguinte comando:

```
$ npm i -g @nestjs/cli
```

Feito isso, devemos rodar o seguinte comando para criar nosso projeto no local desejado:

```
$ nest new nest-js-example
```

Podemos por fim, rodar nosso projeto pelo comando:

```
$ npm run start
```

Basta agora, acessar sua aplicação rodando em http://localhost:3000/, ao acessar irá visualizar a seguinte mensagem: `Hello World!`

Pronto! Está criado seu primeiro projeto [NestJS](https://nestjs.com/) :grin:

## Se aprofundando um pouco mais em NestJS

Inialmente quando criamos nosso projeto, ele é criado na seguinte estrutura:

![image](https://user-images.githubusercontent.com/47872242/116002977-818abb00-a5d2-11eb-83b2-5a550a50d1c8.png)

Vamos entender um pouco mais sobre essas classes bases do NestJS:

- **main.ts**

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

Essa é a classe App da nossa API, onde normalmente ficam as configurações globais da nossa API como portas, serviços globais, etc. Como no código acima, podemos observar que é definido o módulo principal da aplicação, item que abordaremos logo abaixo, e a porta onde a aplicação deve ser rodada.

- **app.module.ts**


```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

Esse é o módulo base da nossa aplicação, onde é informado qual será as controllers e providers do nosso módulo por meio da anotação `@Module`, é uma maneira de organizar e configurar fluxos do sistema, caso quisessemos utilizar algum util dentro de nosso serviço, adicionariamos mais um import ao `providers` como `providers: [AppService, AppUtils],`.

- **app.service.ts**

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

Esse é o serviço base construido da aplicação informado no módulo, sendo necessário utilizar a anotação `@Injectable`, configuração que informa que esse será um novo componente que pode ser injetável. Nesse serviço podemos ver nossa mensagem base ao acessar o endereço http://localhost:3000/.

- **app.controller.ts**

```typescript
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

Essa é nossa controller base da aplicação informada no módulo, sendo necessário em componentes do tipo controller a anotação `@Controller`, configuração que informa que essa será uma controller que exibe endpoints da API, sendo assim possível criar serviços HTTP por meio das anotações, como exemplo no código a anotação `@Get` que configura o endpoint chamado por nós ao acessarmos o endereço http://localhost:3000/.

Podemos ainda observar que nessa controller é utilizado o `AppService` informado em nosso modulo, que possui em seu interior o método `getHello()` que retorna o nosso Hello World!.

- **app.controller.spec.ts**

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
```

Por último, temos um teste de controller já na criação base do projeto, que garante que será retornada a mensagem `Hello World!` ao chamarmos o método `getHello()` da controller.

Feito isso! Temos um entendimento básico dos componentes presentes na criação base de um projeto NestJS, irei aprofundar meus estudos nessa mesma Api e você pode acompanhar toda a evolução e código criado consumindo a [PokeApi](https://pokeapi.co/) clonando o projeto!

