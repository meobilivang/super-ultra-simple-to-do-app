pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim'            // Docker image for testing environment
            args '-p 3400:3400' 
        }
    }

    environment {
        CI = 'true' 
    }

    stages {
        stage('Build Project') { 
            steps {
                sh './jenkins/scripts/build.sh' 
            }
        }

        stage('Test') {
            steps {
                sh './jenkins/scripts/test.sh'
            }
        }

    }

}

