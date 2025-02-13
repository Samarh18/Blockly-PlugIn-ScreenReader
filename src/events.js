const { initializeScreenReaderControls } = require('./screenReaderControl');
const { speak } = require('./announcer');
const blockDescriptions = require('./block_descriptions');

function initializeEventListeners(workspace) {
    // Initialize screen reader controls
    initializeScreenReaderControls();

    workspace.addChangeListener(function (event) {
        switch (event.type) {
            case Blockly.Events.BLOCK_CREATE:
                handleBlockCreate(event);
                break;
            case Blockly.Events.BLOCK_DELETE:
                handleBlockDelete(event);
                break;
            case Blockly.Events.BLOCK_CHANGE:
                handleBlockChange(event);
                break;
            case Blockly.Events.CLICK:
                handleBlockClick(event);
                break;
            case Blockly.Events.TOOLBOX_ITEM_SELECT:
                handleToolboxItemSelect(event);
                break;
            default:
                break;
        }
    });
}

function handleBlockCreate(event) {
    const block = Blockly.getMainWorkspace().getBlockById(event.blockId);
    if (block) {
        const description = getBlockDescription(block);
        console.log(`Block created: ${description}`); // Debug log
        speak(`${description} added to the workspace`);
    }
}

function handleBlockDelete(event) {
    console.log('Block deleted'); // Debug log
    speak('Block deleted from the workspace');
}

function handleBlockChange(event) {
    const block = Blockly.getMainWorkspace().getBlockById(event.blockId);
    if (block) {
        const description = getBlockDescription(block);
        console.log(`Block changed: ${description}`); // Debug log
        speak(`${description} has been changed`);
    }
}

function handleBlockClick(event) {
    const block = Blockly.getMainWorkspace().getBlockById(event.blockId);
    if (block) {
        const description = getBlockDescription(block);
        console.log(`Block clicked: ${description}`); // Debug log
        speak(`${description} selected`);
    }
}

function handleToolboxItemSelect(event) {
    const item = event.toolboxItem;
    if (item) {
        const itemType = item.type;
        const description = `Block of type ${itemType}`;
        console.log(`Toolbox item selected: ${description}`); // Debug log
        speak(`${description} selected in the toolbox`);
    } else {
        console.error('Toolbox item is undefined.');
    }
}

function getBlockDescription(block) {
    const blockType = block.type;
    const variables = Blockly.getMainWorkspace().getAllVariables().map(variable => ({
        name: variable.name,
        id: variable.getId()
    }));
    const descriptionTemplate = blockDescriptions[blockType];
    if (descriptionTemplate) {
        return descriptionTemplate(block, variables);
    }
    return `Block of type ${blockType}`;
}

module.exports = {
    initializeEventListeners
};