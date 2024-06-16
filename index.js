const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const fs = require('fs/promises'); // For promise-based file handling

const FILE_PATH = './data.json';

const makeCommit = async (n) => {
    const git = simpleGit();

    // Stop recursion when no commits are left
    if (n === 0) {
        console.log('Pushing to remote repository...');
        await git.push();
        console.log('Push completed!');
        return;
    }

    // Generate random values
    const x = Math.floor(Math.random() * 55); // Random integer between 0 and 54
    const y = Math.floor(Math.random() * 7);  // Random integer between 0 and 6

    // Calculate date
    const DATE = moment()
        .subtract(1, 'y') // Subtract 1 year
        .add(1, 'd')      // Add 1 day
        .add(x, 'w')      // Add random weeks
        .add(y, 'd')      // Add random days
        .format();        // Format date

    console.log(`Creating commit for date: ${DATE}`);

    const data = { date: DATE };

    // Write to JSON file
    await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2));

    // Stage the file and commit with a date
    await git.add(FILE_PATH);
    await git.commit(DATE, { '--date': DATE });

    // Recursive call for the next commit
    await makeCommit(n - 1);
};

// Start the commit process
makeCommit(100).catch((err) => {
    console.error('Error during commit process:', err);
});
