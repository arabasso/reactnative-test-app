# reactnative-test-app

## Aplicação React Native com Expo

Este é um exemplo de aplicação completa, com suporte temas e controles customizáveis (React Native Elements), navegação por meio de menu lateral e por pilha (React Navigation Drawer / Stack), armazenamento de dados comuns e criptografados (AsyncStorage / SecureStore), tela de login com validação de formulário (React Hook Form / Yup) e controle de permissão por usuário autenticado usando tokens JWT com expiração (e atualização do token expirado), requisições GET e POST para uma API remota (Axios / https://dummyjson.com/), separação em camadas, e suporte a Hooks, Components, Contexts, Providers e Services customizados.

![Screenshot](./screenshot.gif)

### Bibliotecas
- React Navigation (Stack e Drawer)
- AsyncStorage
- SecureStore
- Axios

### Clonando e Instalando

```shell
git clone https://github.com/arabasso/reactnative-test-app.git
cd reactnative-test-app
npm install
```

### Debugando

Basta executar no Expo Go (não é necessário baixar o Android Studio ou o XCode para executar pelo smartphone):

```shell
npx expo start
```

#### Android (Smartphone ou Emulador)

Precisa do SDK do Android para executar:

```shell
npx expo start --android
```

#### iOS (Smartphone ou Emulador)

Precisa do SDK do iPhone para executar:

```shell
npx expo start --ios
```

### Compilando e Instalando no Smartphone (precisa estar conectado pelo cabo USB) ou Emulador (precisa do SDK instalado)

É necessário gerar o prebuild para poder compilar:

```shell
npx expo prebuild
```

#### Android (Windows, Linux e macOS)
```bat
npx expo run:android --variant release
```

#### iOS (macOS)
```zsh
npx expo run:ios --configuration Release
```
