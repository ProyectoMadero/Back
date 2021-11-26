const scanner = require('sonarqube-scanner');

scanner(
    {
        serverUrl : 'https://sonarqube.mycompany.com',
        token : "019d1e2e04eefdcd0caee1468f39a45e69d33d3f",
        options: {
        'sonar.projectName': 'MB',
        'sonar.projectDescription': 'Description for "My App" project...',
        'sonar.sources': 'components',
        }
    },
    () => process.exit()
)