/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Plugin test.
 */

import * as Blockly from 'blockly';
import { toolboxCategories, createPlayground } from '@blockly/dev-tools';
import { ScreenReaderPlugin } from '../src/index';

/**
 * Create a workspace.
 * @param {HTMLElement} blocklyDiv The blockly container div.
 * @param {!Blockly.BlocklyOptions} options The Blockly options.
 * @returns {!Blockly.WorkspaceSvg} The created workspace.
 */
function createWorkspace(blocklyDiv, options) {
  const workspace = Blockly.inject(blocklyDiv, options);

  // Initialize the ScreenReaderPlugin
  const screenReaderPlugin = new ScreenReaderPlugin(workspace);
  screenReaderPlugin.init();

  return workspace;
}

document.addEventListener('DOMContentLoaded', function () {
  const defaultOptions = {
    toolbox: toolboxCategories,
  };
  createPlayground(
    document.getElementById('root'),
    createWorkspace,
    defaultOptions,
  );
});