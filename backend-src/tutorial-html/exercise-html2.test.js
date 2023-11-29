/** @type {import('jest').Config} */
const config = {
    verbose: true,
};

let textVariable = process.argv.find(arg => arg.startsWith('--textVariable=')).split('=')[1];
textVariable = textVariable.slice(1, textVariable.length - 1) //to take out % symbols

test('Exercise 2: Similar a Word', () => {
    //console.log("dentro de la función de test: ", textVariable)
    expect(textVariable).toMatch(/<p>.*<\/p>/);
    expect(textVariable).toBe("<p>HTML tags are similar to MS Word elements</p>");
    // Your other expectations can be added here
    // For example:
    // expect(textVariable).toContain("some text");
    // expect(textVariable.length).toBeGreaterThan(5);
});


export default test;