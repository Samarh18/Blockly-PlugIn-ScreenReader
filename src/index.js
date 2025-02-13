/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// TODO: Edit plugin overview.
/**
 * @fileoverview Plugin overview.
 */
import * as Blockly from 'blockly/core';
import { initializeEventListeners } from './events';

// TODO: Rename plugin and edit plugin description.
/**
 * Plugin description.
 */
export class ScreenReaderPlugin {
  /**
   * Constructor for ScreenReaderPlugin.
   * @param {!Blockly.WorkspaceSvg} workspace The workspace that the plugin will
   *     be added to.
   */
  constructor(workspace) {
    /**
     * The workspace.
     * @type {!Blockly.WorkspaceSvg}
     * @protected
     */
    this.workspace = workspace;
  }

  /**
   * Initialize the plugin.
   */
  init() {
    initializeEventListeners(this.workspace);
  }
}