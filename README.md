# reactnative-test-app

## Aplicação React Native com Expo

Este é um exemplo de aplicação completa, com suporte temas e controles customizáveis (React Native Elements), navegação por meio de menu lateral e por pilha (React Navigation Drawer / Stack), armazenamento de dados comuns e criptografados (AsyncStorage / SecureStore), tela de login com validação de formulário (React Hook Form / Yup) e controle de permissão por usuário autenticado, requisições GET e POST para uma API remota (Axios / https://dummyjson.com/), separação em camadas, e suporte a Hooks, Components, Contexts, Providers e Services customizados.

![Screenshot](./screenshot.gif)

### Bibliotecas
- React Navigation (Stack e Drawer)
- AsyncStorage
- SecureStore
- Axios

### Debugando

Basta baixar o repositório e executar no Expo Go (não é necessário baixar o Android Studio ou o XCode para executar pelo smartphone):

```shell
git clone https://github.com/arabasso/reactnative-test-app.git
cd reactnative-test-app
npm install
npx expo start
```

### Compilando

#### Windows (Apenas Android)
```bat
git clone https://github.com/arabasso/reactnative-test-app.git
cd reactnative-test-app
npm install
npx expo prebuild
npx expo run:android --variant release
```

#### Linux (Apenas Android)
```bash
git clone https://github.com/arabasso/reactnative-test-app.git
cd reactnative-test-app
npm install
npx expo prebuild
npx expo run:android --variant release
```

#### macOS (Android)
```zsh
git clone https://github.com/arabasso/reactnative-test-app.git
cd reactnative-test-app
npm install
npx expo prebuild
npx expo run:android --variant release
```

#### macOS (iOS)
```zsh
git clone https://github.com/arabasso/reactnative-test-app.git
cd reactnative-test-app
npm install
npx expo prebuild
npx expo run:ios --configuration Release
```