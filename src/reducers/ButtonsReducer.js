let baseState = {
    current: null,
    pending: null,
    op: null,
    isAllClear: true,
    isCurrentResult: false
};
//add numbers
function doAddition(val1, val2) {
    return Number.parseFloat(val1) + Number.parseFloat(val2);
}
//subtract val2 from val1
function doSubtraction(val1, val2) {
    return Number.parseFloat(val1) - Number.parseFloat(val2);
}
//multiply numbers
function doMultiplication(val1, val2) {
    return Number.parseFloat(val1) * Number.parseFloat(val2);
}
//divide val1 by val2
function doDivision(val1, val2) {
    return Number.parseFloat(val1) / Number.parseFloat(val2);
}
export default function buttonsReducer(state, action) {
    switch (action.type) {
        // done
        case "number": {
            //updated state var
            let latestState;
            //are we starting a new equation?
            if (state.isCurrentResult) {
                //reset state
                latestState = structuredClone(baseState);
                //update state
                latestState.current = action.numberKey;
                latestState.isAllClear = false;
            } else {
                //not starting a new equation
                //copy current equation data
                latestState = structuredClone(state);
                //is current input zero?
                if (state.current === 0 || state.current === "0" || state.current === null) {
                    //update state
                    latestState.current = action.numberKey
                    latestState.isAllClear = false;
                } else {
                    //input isn't zero 
                    //update state
                    latestState.current = `${state.current}${action.numberKey}`
                    latestState.isAllClear = false;
                }
            }
            //return state
            return latestState;
        }
        case "decimal": {
            console.log(state);
            //updated state var
            let latestState;
            //are we starting a new equation?
            if (state.isCurrentResult) {
                //reset state
                latestState = structuredClone(baseState);
                //update state
                latestState.current = `0.${action.numberKey}`;
                latestState.isAllClear = false;
            } else {
                //not starting a new equation
                //copy current equation data
                latestState = structuredClone(state);
                //check for existing decimal
                if (!String(state.current).includes(".")) {
                    if (state.current && state.current !== 0 && state.current !== "0") {
                        latestState.current = `${state.current}.`
                    } else {
                        latestState.current = "0."
                    }
                }
            }
            //return state
            return latestState
        }
        case "modifier": {
            //copy current data
            let latestState = structuredClone(state);
            //what is the modifier type
            if (action.modifierType === "clear") {
                //are we performing an all clear?
                if (state.current === 0 || state.current === "0" || state.current === null) {
                    latestState = structuredClone(baseState);
                } else {
                    //is there pending equation data?
                    if (state.pending) {
                        latestState.current = null;
                    } else {
                        //no pending data
                        //set all clear
                        latestState = structuredClone(baseState);
                    }
                }
            } else if (action.modifierType === "sign") {
                //check for compatible value
                if (state.current !== 0 && state.current !== 0 && state.current !== null) {
                    //are we signing a result?
                    if (state.isCurrentResult) {
                        //update state
                        latestState = structuredClone(baseState);
                        latestState.pending = null;
                        latestState.current = Number.parseFloat(state.current) * -1;
                        latestState.isAllClear = false;
                        latestState.isCurrentResult = true;
                    } else {
                        //sign current
                        latestState.current = Number.parseFloat(state.current) * -1
                    }
                }
            } else if (action.modifierType === "percent") {
                if (latestState.current && latestState.current !== 0 && latestState.current !== "0") {
                    latestState.current = Number.parseFloat(state.current) * .01;
                }
            }
            //return state
            return latestState;
        }
        case "operation": {
            //updated state var
            let latestState = structuredClone(state)
            //check for something to evaluate
            if (state.current) {
                //check for pending value
                if (state.pending) {
                    //perform pending operation
                    if (state.op === "add") {
                        latestState.pending = doAddition(state.pending, state.current);
                    } else if (state.op === "subtract") {
                        latestState.pending = doSubtraction(state.pending, state.current);
                    } else if (state.op === "multiply") {
                        latestState.pending = doMultiplication(state.pending, state.current);
                    } else if (state.op === "divide") {
                        latestState.pending = doDivision(state.pending, state.current);
                    }
                } else {
                    //set current val to pending val
                    latestState.pending = state.current;
                }
                //prepare for next value
                latestState.op = action.operationType
                latestState.current = null;
                latestState.isAllClear = false;
                latestState.isCurrentResult = false;
            } else if (state.pending) {
                latestState.op = action.operationType
            }
            //return state
            return latestState
        }
        case "evaluate": {
            //updated state var
            let latestState = structuredClone(state)
            //check for current value
            if (state.current) {
                //perform pending operation
                if (state.op === "add") {
                    latestState.current = doAddition(state.pending, state.current);
                } else if (state.op === "subtract") {
                    latestState.current = doSubtraction(state.pending, state.current);
                } else if (state.op === "multiply") {
                    latestState.current = doMultiplication(state.pending, state.current);
                } else if (state.op === "divide") {
                    latestState.current = doDivision(state.pending, state.current);
                }
                //update state
                latestState.pending = null;
                latestState.isCurrentResult = true;
            }
            //return state
            return latestState;
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}
