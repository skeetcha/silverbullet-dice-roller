import { flashNotification, prompt } from "$sb/silverbullet-syscall/editor.ts";

function randInt(max: number): number {
    return Math.floor(Math.random() * max);
}

export async function roll() {
    const val = await prompt('Please enter your dice formula:', '4d6');
    const regex = new RegExp('^(\\d+)d(\\d+)([+-]\\d+)?(?:(?:(k|d)(\\d+))|(?:(kh|dl)))?$');
    const test = regex.test(val);

    if (test) {
        const vals = regex.exec(val);
        const numDice = vals === null ? undefined : parseInt(vals[1]);
        const numSides = vals === null ? undefined : parseInt(vals[2]);
        const mod = vals === null ? undefined : parseInt(vals[3]);
        const keep = vals === null ? undefined : (vals[4] === undefined ? undefined : vals[4] === 'k');
        const numKeep = vals === null ? undefined : parseInt(vals[5]);
        const keepHigh = vals === null ? undefined : (vals[6] === undefined ? undefined : vals[5] === 'kh');

        var results: number[] = [];
        const add = (a, b) => a + b;

        if ((numDice !== undefined) && (numSides !== undefined)) {
            for (var i = 0; i < numDice; i++) {
                results.push(randInt(numSides) + 1);
            }

            if ((keep === undefined) && (keepHigh === undefined)) {
                var result = results.reduce(add);

                if (mod !== undefined) {
                    result += mod;
                }

                await flashNotification('Result: ' + result.toString() + '(' + results.join(', ') + ')');
            } else if (keepHigh !== undefined) {

            } else if (keep !== undefined) {

            }
        }
    } else {
        await flashNotification(val + 'is not a valid dice formula.', 'error');
    }
}