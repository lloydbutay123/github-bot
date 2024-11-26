const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const fs = require('fs/promises'); // For promise-based file handling

const FILE_PATH = './data.json';

const makeCommits = async (count) => {
    const git = simpleGit();

    for (let i = 0; i < count; i++) {
        const x = Math.floor(Math.random() * 55);
        const y = Math.floor(Math.random() * 7);

        const DATE = moment()
            .subtract(1, 'y')
            .add(1, 'd')
            .add(x, 'w')
            .add(y, 'd')
            .format();

        console.log(`Creating commit for date: ${DATE}`);

        const data = { date: DATE };

        await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2));
        await git.add(FILE_PATH);
        await git.commit(DATE, { '--date': DATE });
    }

    console.log('Pushing to remote repository...');
    await git.push();
    console.log('Push completed!');
};

makeCommits(100).catch((err) => {
    console.error('Error during commit process:', err);
});

