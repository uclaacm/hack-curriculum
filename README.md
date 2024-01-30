# Hack Curriculum 📚

Welcome! We are ACM Hack, a student org dedicated to creating beginner friendly software development workshops and exposing people of non-traditional tech backgrounds to CS! We put on a lot of workshop series. 

Some of our essentials:
- Hackschool: Beginner friendly web development series focusing on frontend
- Stackschool: Full stack web development series focusing on backend
- Hack Sprint: Beginner friendly mobile development series (historically we have covered React Native, iOS, and Android)
- Hack Cloud: Cloud computing series covering AWS fundamentals and general cloud computing concepts
- Tooling Series: Covering tools such as git and vim that aid in software development
- ... and more!

View our archive [here](https://hack.uclaacm.com/archive).

If you want to get in touch, join our [discord](https://discord.gg/3GSPECbCnE)!

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
