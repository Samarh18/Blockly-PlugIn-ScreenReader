module.exports = {
    controls_if: (block) => {
        const ifInput = block.getInputTargetBlock('IF0');
        const doInput = block.getInputTargetBlock('DO0');
        const ifMessage = ifInput ? getBlockMessage(ifInput) : 'condition';
        const doMessage = doInput ? getBlockMessage(doInput) : 'statement';
        return `If ${ifMessage} then ${doMessage}`;
    },
    logic_compare: (block) => {
        const op = block.getFieldValue('OP');
        const aInput = block.getInputTargetBlock('A');
        const bInput = block.getInputTargetBlock('B');
        const aMessage = aInput ? getBlockMessage(aInput) : 'value A';
        const bMessage = bInput ? getBlockMessage(bInput) : 'value B';
        const opMessages = {
            EQ: 'equals',
            NEQ: "doesn't equal",
            LT: 'is less than',
            LTE: 'is less than or equals',
            GT: 'is greater than',
            GTE: 'is greater than or equals'
        };
        return `${aMessage} ${opMessages[op]} ${bMessage}`;
    },
    logic_operation: (block) => {
        const op = block.getFieldValue('OP');
        const aInput = block.getInputTargetBlock('A');
        const bInput = block.getInputTargetBlock('B');
        const aMessage = aInput ? getBlockMessage(aInput) : 'value A';
        const bMessage = bInput ? getBlockMessage(bInput) : 'value B';
        const opMessages = {
            AND: 'and',
            OR: 'or'
        };
        return `${aMessage} ${opMessages[op]} ${bMessage}`;
    },
    logic_negate: (block) => {
        const boolInput = block.getInputTargetBlock('BOOL');
        const boolMessage = boolInput ? getBlockMessage(boolInput) : '';
        return `Not ${boolMessage}`;
    },
    logic_boolean: (block) => {
        const boolValue = block.getFieldValue('BOOL');
        const boolMessages = {
            TRUE: 'true',
            FALSE: 'false'
        };
        return `${boolMessages[boolValue]}`;
    },
    logic_ternary: (block) => {
        const ifInput = block.getInputTargetBlock('IF');
        const thenInput = block.getInputTargetBlock('THEN');
        const elseInput = block.getInputTargetBlock('ELSE');
        const ifMessage = ifInput ? getBlockMessage(ifInput) : 'condition';
        const thenMessage = thenInput ? getBlockMessage(thenInput) : 'statement A';
        const elseMessage = elseInput ? getBlockMessage(elseInput) : 'statement B';
        return `If ${ifMessage} then ${thenMessage}, else ${elseMessage}`;
    },
    controls_repeat_ext: (block) => {
        const timesInput = block.getInputTargetBlock('TIMES');
        let timesMessage = 'NUM';
        if (timesInput && timesInput.type === 'math_number') {
            timesMessage = timesInput.getFieldValue('NUM');
        }
        const doInput = block.getInputTargetBlock('DO');
        const doMessage = doInput ? getBlockMessage(doInput) : 'statements';
        return `Repeat the following ${timesMessage} times: ${doMessage}`;
    },
    controls_whileUntil: (block) => {
        const mode = block.getFieldValue('MODE');
        const boolInput = block.getInputTargetBlock('BOOL');
        const doInput = block.getInputTargetBlock('DO');
        const boolMessage = boolInput ? getBlockMessage(boolInput) : 'condition';
        const doMessage = doInput ? getBlockMessage(doInput) : 'statements';
        const modeMessages = {
            WHILE: `While ${boolMessage} is true, repeat ${doMessage}.`,
            UNTIL: `Until ${boolMessage} is true, repeat ${doMessage}.`
        };
        return modeMessages[mode];
    },
    controls_for: (block, variables) => {
        const varId = block.getFieldValue('VAR');
        const variable = variables.find(v => v.id === varId);
        const varName = variable ? variable.name : 'variable';

        const fromInput = block.getInputTargetBlock('FROM');
        const toInput = block.getInputTargetBlock('TO');
        const byInput = block.getInputTargetBlock('BY');
        const doInput = block.getInputTargetBlock('DO');

        let fromMessage = 'start value';
        if (fromInput && fromInput.type === 'math_number') {
            fromMessage = fromInput.getFieldValue('NUM');
        }

        let toMessage = 'end value';
        if (toInput && toInput.type === 'math_number') {
            toMessage = toInput.getFieldValue('NUM');
        }

        let byMessage = 'increment';
        if (byInput && byInput.type === 'math_number') {
            byMessage = byInput.getFieldValue('NUM');
        }

        const doMessage = doInput ? getBlockMessage(doInput, variables) : 'statements';

        return `Count with ${varName} from ${fromMessage} to ${toMessage} by ${byMessage}, then ${doMessage}`;
    },
    controls_forEach: (block, variables) => {
        const varId = block.getFieldValue('VAR');
        const variable = variables.find(v => v.id === varId);
        const varName = variable ? variable.name : 'variable';

        const doInput = block.getInputTargetBlock('DO');
        const listInput = block.getInputTargetBlock('LIST');

        const listMessage = listInput ? getBlockMessage(listInput, variables) : 'list';
        const doMessage = doInput ? getBlockMessage(doInput, variables) : 'statements';

        return `For each item ${varName} in ${listMessage}, do ${doMessage}`;
    },
    math_number: (block) => {
        const numValue = block.getFieldValue('NUM');
        return `${numValue}`;
    },
    math_arithmetic: (block) => {
        const op = block.getFieldValue('OP');
        const aInput = block.getInputTargetBlock('A');
        const bInput = block.getInputTargetBlock('B');
        const aMessage = aInput ? getBlockMessage(aInput) : 'value A';
        const bMessage = bInput ? getBlockMessage(bInput) : 'value B';
        const opMessages = {
            ADD: 'add to',
            MINUS: 'minus',
            MULTIPLY: 'times',
            DIVIDE: 'divided by',
            POWER: 'to the power of'
        };
        return `${aMessage} ${opMessages[op]} ${bMessage}`;
    },
    math_single: (block) => {
        const op = block.getFieldValue('OP');
        const numInput = block.getInputTargetBlock('NUM');
        const numMessage = numInput ? getBlockMessage(numInput) : 'value';
        const opMessages = {
            ROOT: 'square root of',
            ABS: 'absolute',
            NEG: 'negative',
            LN: 'natural logarithm of',
            LOG10: 'base 10 logarithm of',
            EXP: 'e to the power of',
            POW10: '10 to the power of'
        };
        return `${opMessages[op]} ${numMessage}`;
    },
    math_trig: (block) => {
        const op = block.getFieldValue('OP');
        const numInput = block.getInputTargetBlock('NUM');
        const numMessage = numInput ? getBlockMessage(numInput) : 'value';
        const opMessages = {
            SIN: 'sine',
            COS: 'cosine',
            TAN: 'tangent',
            ASIN: 'asine',
            ACOS: 'acosine',
            ATAN: 'atangent'
        };
        return `${opMessages[op]} ${numMessage}`;
    },
    math_constant: (block) => {
        const constant = block.getFieldValue('CONSTANT');
        const constantMessages = {
            PI: 'pi',
            E: 'e',
            GOLDEN_RATIO: 'golden ratio',
            SQRT2: 'square root of 2',
            SQRT1_2: 'square root of half',
            INFINITY: 'infinity'
        };
        return `${constantMessages[constant]}`;
    },
    math_number_property: (block) => {
        const property = block.getFieldValue('PROPERTY');
        const numberInput = block.getInputTargetBlock('NUMBER_TO_CHECK');
        const numberMessage = numberInput ? getBlockMessage(numberInput) : 'value';
        const propertyMessages = {
            EVEN: 'is even',
            ODD: 'is odd',
            PRIME: 'is prime',
            WHOLE: 'is whole',
            POSITIVE: 'is positive',
            NEGATIVE: 'is negative',
            DIVISIBLE_BY: 'is divisible by'
        };
        if (property === 'DIVISIBLE_BY') {
            const divisorInput = block.getInputTargetBlock('DIVISOR');
            const divisorMessage = divisorInput ? getBlockMessage(divisorInput) : 'value B';
            return `${numberMessage} ${propertyMessages[property]} ${divisorMessage}`;
        }
        return `${numberMessage} ${propertyMessages[property]}`;
    },
    math_round: (block) => {
        const op = block.getFieldValue('OP');
        const numInput = block.getInputTargetBlock('NUM');
        const numMessage = numInput ? getBlockMessage(numInput) : 'value';
        const opMessages = {
            ROUND: 'round',
            ROUNDUP: 'round up',
            ROUNDDOWN: 'round down'
        };
        return `${opMessages[op]} ${numMessage}`;
    },
    math_on_list: (block) => {
        const op = block.getFieldValue('OP');
        const listInput = block.getInputTargetBlock('LIST');
        const listMessage = listInput ? getBlockMessage(listInput) : 'list';
        const opMessages = {
            SUM: 'sum of',
            MIN: 'minimum of',
            MAX: 'maximum of',
            AVERAGE: 'average of',
            MEDIAN: 'median of',
            MODE: 'modes of',
            STD_DEV: 'standard deviation of',
            RANDOM: 'random item of'
        };
        return `${opMessages[op]} ${listMessage}`;
    },
    math_modulo: (block) => {
        const dividendInput = block.getInputTargetBlock('DIVIDEND');
        const divisorInput = block.getInputTargetBlock('DIVISOR');
        const dividendMessage = dividendInput ? getBlockMessage(dividendInput) : 'value A';
        const divisorMessage = divisorInput ? getBlockMessage(divisorInput) : 'value B';
        return `remainder of ${dividendMessage} divided by ${divisorMessage}`;
    },
    math_constrain: (block) => {
        const valueInput = block.getInputTargetBlock('VALUE');
        const lowInput = block.getInputTargetBlock('LOW');
        const highInput = block.getInputTargetBlock('HIGH');
        const valueMessage = valueInput ? getBlockMessage(valueInput) : 'value';
        const lowMessage = lowInput ? getBlockMessage(lowInput) : 'value A';
        const highMessage = highInput ? getBlockMessage(highInput) : 'value B';
        return `Constrain ${valueMessage} between ${lowMessage} and ${highMessage}`;
    },
    math_random_int: (block) => {
        const fromInput = block.getInputTargetBlock('FROM');
        const toInput = block.getInputTargetBlock('TO');
        const fromMessage = fromInput ? getBlockMessage(fromInput) : 'value A';
        const toMessage = toInput ? getBlockMessage(toInput) : 'value B';
        return `Random integer from ${fromMessage} to ${toMessage}`;
    },
    math_random_float: () => {
        return 'random fraction';
    },
    math_atan2: (block) => {
        const xInput = block.getInputTargetBlock('X');
        const yInput = block.getInputTargetBlock('Y');
        const xMessage = xInput ? getBlockMessage(xInput) : 'X';
        const yMessage = yInput ? getBlockMessage(yInput) : 'Y';
        return `Arctangent of point (${xMessage}, ${yMessage})`;
    },

    // Text Blocks
    text: (block) => {
        const text = block.getFieldValue('TEXT') || '';
        return text === '' ? 'text' : text;
    },
    text_join: (block) => {
        const add0Input = block.getInputTargetBlock('ADD0');
        const add1Input = block.getInputTargetBlock('ADD1');
        const add0Message = add0Input ? getBlockMessage(add0Input) : 'text A';
        const add1Message = add1Input ? getBlockMessage(add1Input) : 'text B';
        return `Join: ${add0Message}, and: ${add1Message}`;
    },
    text_append: (block, variables) => {
        const varId = block.getFieldValue('VAR');
        const variable = variables.find(v => v.id === varId);
        const varName = variable ? variable.name : 'variable';
        const textMessage = block.getInputTargetBlock('TEXT');
        return `To ${varName}, append text ${textMessage}`;
    },
    text_length: (block) => {
        const valueInput = block.getInputTargetBlock('VALUE');
        const valueMessage = valueInput ? getBlockMessage(valueInput) : 'text';
        return `Length of ${valueMessage}`;
    },
    text_isEmpty: (block) => {
        const valueInput = block.getInputTargetBlock('VALUE');
        const valueMessage = valueInput ? getBlockMessage(valueInput) : 'text';
        return `Is ${valueMessage} empty`;
    },
    text_indexOf: (block, variables) => {
        const end = block.getFieldValue('END');
        const valueInput = block.getInputTargetBlock('VALUE');
        const findInput = block.getInputTargetBlock('FIND');

        let valueMessage = 'text';
        if (valueInput && valueInput.type === 'variables_get') {
            const varId = valueInput.getFieldValue('VAR');
            const variable = variables.find(v => v.id === varId);
            valueMessage = variable ? variable.name : 'text';
        }

        const findMessage = findInput ? getBlockMessage(findInput) : 'text';
        const endMessage = end === 'FIRST' ? 'first' : 'last';
        return `In text ${valueMessage}, find ${endMessage} occurrence of text ${findMessage}`;
    },
    text_charAt: (block, variables) => {
        const where = block.getFieldValue('WHERE');
        const valueInput = block.getInputTargetBlock('VALUE');
        const atInput = block.getInputTargetBlock('AT');

        let valueMessage = 'text';
        if (valueInput && valueInput.type === 'variables_get') {
            const varId = valueInput.getFieldValue('VAR');
            const variable = variables.find(v => v.id === varId);
            valueMessage = variable ? variable.name : 'text';
        } else if (valueInput) {
            valueMessage = getBlockMessage(valueInput);
        }

        const atMessage = atInput ? getBlockMessage(atInput) : ' ';
        const whereMessages = {
            FROM_START: `letter number ${atMessage}`,
            FROM_END: `letter number ${atMessage} from the end`,
            FIRST: 'first letter',
            LAST: 'last letter',
            RANDOM: 'random letter'
        };
        return `In text ${valueMessage} get ${whereMessages[where]}`;
    },
    text_getSubstring: (block, variables) => {
        const where1 = block.getFieldValue('WHERE1');
        const where2 = block.getFieldValue('WHERE2');
        const stringInput = block.getInputTargetBlock('STRING');
        const at1Input = block.getInputTargetBlock('AT1');
        const at2Input = block.getInputTargetBlock('AT2');

        let stringMessage = 'text';
        if (stringInput && stringInput.type === 'variables_get') {
            const varId = stringInput.getFieldValue('VAR');
            const variable = variables.find(v => v.id === varId);
            stringMessage = variable ? variable.name : 'text';
        } else if (stringInput) {
            stringMessage = getBlockMessage(stringInput);
        }

        const at1Message = at1Input ? getBlockMessage(at1Input) : 'number';
        const at2Message = at2Input ? getBlockMessage(at2Input) : 'number';
        const whereMessages = {
            FROM_START: `letter ${at1Message}`,
            FROM_END: `letter ${at1Message} from the end`,
            FIRST: 'first letter',
            LAST: 'last letter'
        };
        return `In text ${stringMessage} get substring from ${whereMessages[where1]} to ${whereMessages[where2]}`;
    },
    text_changeCase: (block) => {
        const caseValue = block.getFieldValue('CASE');
        const textInput = block.getInputTargetBlock('TEXT');
        const textMessage = textInput ? getBlockMessage(textInput) : 'text';
        const caseMessages = {
            UPPERCASE: 'uppercase',
            LOWERCASE: 'lowercase',
            TITLECASE: 'title case'
        };
        return `To ${caseMessages[caseValue]} ${textMessage}`;
    },
    text_trim: (block) => {
        const mode = block.getFieldValue('MODE');
        const textInput = block.getInputTargetBlock('TEXT');
        const textMessage = textInput ? getBlockMessage(textInput) : 'text';
        const modeMessages = {
            BOTH: 'both sides',
            LEFT: 'left side',
            RIGHT: 'right side'
        };
        return `Trim spaces from ${modeMessages[mode]} of: ${textMessage}`;
    },
    text_count: (block) => {
        const subInput = block.getInputTargetBlock('SUB');
        const textInput = block.getInputTargetBlock('TEXT');
        const subMessage = subInput ? getBlockMessage(subInput) : '';
        const textMessage = textInput ? getBlockMessage(textInput) : '';
        return `Count ${subMessage}, in ${textMessage}`;
    },
    text_replace: (block) => {
        const fromInput = block.getInputTargetBlock('FROM');
        const toInput = block.getInputTargetBlock('TO');
        const textInput = block.getInputTargetBlock('TEXT');
        const fromMessage = fromInput ? getBlockMessage(fromInput) : 'text A';
        const toMessage = toInput ? getBlockMessage(toInput) : 'text B';
        const textMessage = textInput ? getBlockMessage(textInput) : 'text C';
        return `Replace ${fromMessage}, with ${toMessage}, in ${textMessage}`;
    },
    text_reverse: (block) => {
        const textInput = block.getInputTargetBlock('TEXT');
        const textMessage = textInput ? getBlockMessage(textInput) : 'text';
        return `Reverse ${textMessage}`;
    },
    text_print: (block) => {
        const textInput = block.getInputTargetBlock('TEXT');
        const textMessage = textInput ? getBlockMessage(textInput) : 'text';
        return `Print ${textMessage}`;
    },
    text_prompt_ext: (block) => {
        const type = block.getFieldValue('TYPE');
        const textInput = block.getInputTargetBlock('TEXT');
        const textMessage = textInput ? getBlockMessage(textInput) : 'message text';
        const typeMessages = {
            TEXT: 'text',
            NUMBER: 'number'
        };
        return `Prompt for ${typeMessages[type]} with message ${textMessage}`;
    }

};

function getBlockMessage(block, variables) {
    const blockType = block.type;
    const descriptionTemplate = module.exports[blockType];
    if (descriptionTemplate) {
        return descriptionTemplate(block, variables);
    }
    return `Block of type ${blockType}`;
}