# @blockly/screen-reader [![Built on Blockly](https://tinyurl.com/built-on-blockly)](https://github.com/google/blockly)

<!--
  - TODO: Edit plugin description.
  -->

A [Blockly](https://www.npmjs.com/package/blockly) plugin that ...

## Installation

### Yarn

```
yarn add @blockly/screen-reader
```

### npm

```
npm install @blockly/screen-reader --save
```

## Usage

<!--
  - TODO: Update usage.
  -->

```js
import * as Blockly from 'blockly';
import {Plugin} from '@blockly/screen-reader';

// Inject Blockly.
const workspace = Blockly.inject('blocklyDiv', {
  toolbox: toolboxCategories,
});

// Initialize plugin.
const plugin = new Plugin(workspace);
plugin.init();
```

## API

<!--
  - TODO: describe the API.
  -->

## License

Apache 2.0
